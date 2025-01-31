import { Module } from '@nestjs/common';
import { OtpTokenService } from './otp-token.service';
import { OtpTokenController } from './otp-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpToken, OtpTokenSchema } from './schemas/otp-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OtpToken.name,
        schema: OtpTokenSchema,
      },
    ])
  ],
  controllers: [OtpTokenController],
  providers: [OtpTokenService],
})
export class OtpTokenModule {}
