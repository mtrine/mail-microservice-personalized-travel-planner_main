import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';

@Processor('notification-queue')
@Injectable()
export class NotificationProcessor {
    constructor(
        private readonly mailService: MailService
    ) { }
    @Process()
    async handleNotification(job: Job) {
        const { userId, message, scheduledAt,options } = job.data;
        console.log(`Sending notification to user ${userId}: ${message} at ${scheduledAt}`);

        // Ở đây bạn có thể gửi email hoặc push notification
        try {
            await this.mailService.sendMail('tranminhtri1023@gmail.com', {
                tripName: options.tripName,
                user_name: options.userName,
                start_date: options.startDate,
                end_date: options.endDate
            }, 'notification-template', 'Notification');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
// options: {
//     tripId: trip._id,
//     tripName: dto.name,
//     userName: user?.user_name || '',
//     startDate: dto.start_date,
//     endDate: dto.end_date
// },