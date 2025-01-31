import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Notification } from "./schemas/notification.schema";
import { Model } from "mongoose";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationRepository{
    constructor(
        @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>
    ) {}

    async createNotification(dto: CreateNotificationDto) {
        const newNotification = new this.notificationModel({
           userId: dto.userId,
           message: dto.message,
           options: dto.options,
           scheduledAt: dto.scheduledAt 
        });

        return await newNotification.save();
    }

    async deleteNotification(id: string) {
        
    }
}