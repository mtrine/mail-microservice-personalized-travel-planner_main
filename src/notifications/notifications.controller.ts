import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';


@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('schedule_notification')
  async handleScheduledNotification(@Payload() data: CreateNotificationDto) {
    return this.notificationsService.scheduleNotification(data);
  }

  
}
