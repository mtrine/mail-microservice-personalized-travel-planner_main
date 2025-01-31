import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema(
    {
        timestamps: true,
    }
)
export class OtpToken {
    @Prop(
        {
            required: true,
        }
    )
    email: string;

    @Prop(
        {
            required: true,
        }
    )
    otp_code: string;

    @Prop(
        {
            required: true,
        }
    )
    expiry_time: Date;  

    @Prop(
        {
            required: true,
            default: false,
        }
    )
    verified: boolean;
}

export const OtpTokenSchema = SchemaFactory.createForClass(OtpToken);