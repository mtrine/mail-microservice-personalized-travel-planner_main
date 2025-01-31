import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './notifications.repo';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        @InjectQueue('notification-queue') private notificationQueue: Queue,
    ) { }

    async createNotification(createNotificationDto: CreateNotificationDto) {
        return await this.notificationRepository.createNotification(createNotificationDto);
    }

    async scheduleNotification(createNotificationDto: CreateNotificationDto) {
        // Lưu vào database
        const notification = await this.createNotification(createNotificationDto);
        
        // Thêm vào queue để gửi đúng thời gian
        await this.notificationQueue.add(notification, {
          delay: new Date(createNotificationDto.scheduledAt).getTime() - Date.now(), // Tính thời gian chờ
          attempts: 3, // Nếu lỗi thì thử lại tối đa 3 lần
        });
    
        return notification;
      }
}
