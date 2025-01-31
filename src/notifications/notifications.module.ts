import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { NotificationRepository } from './notifications.repo';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from './notification.processor';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },  
    ]),
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService,NotificationRepository, NotificationProcessor],
})
export class NotificationsModule {}
