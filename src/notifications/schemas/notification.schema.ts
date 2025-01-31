import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Notification {
    @Prop(
        {
            required: true,
            ref:"User",
        }
    )
    userId: string;

    @Prop(
        {
            required: true,
        }
    )
    message:string  

    @Prop(
        {
            required: true,
        }
    )
    scheduledAt: Date;

    @Prop({
        type: Object,
        default: {},
    })
    options: { [key: string]: string | number };
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);