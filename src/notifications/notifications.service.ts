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
        console.log('Scheduled At:', createNotificationDto.scheduledAt);
        console.log('Current Time:', new Date());

        // Kiểm tra nếu scheduledAt nhỏ hơn hiện tại thì đặt lại thời gian hợp lý
        const scheduledTime = new Date(createNotificationDto.scheduledAt).getTime();
        const currentTime = Date.now();
        const timeDelay = scheduledTime - currentTime;

        console.log('timeDelay:', timeDelay); // Kiểm tra giá trị

        if (timeDelay <= 0) {
            console.error('⚠️ scheduledAt phải lớn hơn thời gian hiện tại!');
            throw new Error('scheduledAt phải là một thời gian trong tương lai.');
        }
        // Lưu vào database
        const notification = await this.createNotification(createNotificationDto);

        // Thêm vào queue để gửi đúng thời gian
        await this.notificationQueue.add(notification, {
            delay: timeDelay, // Tính thời gian chờ
            attempts: 3, // Nếu lỗi thì thử lại tối đa 3 lần
        });

        return notification;
    }
}
