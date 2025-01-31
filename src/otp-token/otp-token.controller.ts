import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OtpTokenService } from './otp-token.service';
import { CreateOtpTokenDto } from './dto/create-otp-token.dto';
import { UpdateOtpTokenDto } from './dto/update-otp-token.dto';

@Controller()
export class OtpTokenController {
  constructor(private readonly otpTokenService: OtpTokenService) {}

  @MessagePattern('createOtpToken')
  create(@Payload() createOtpTokenDto: CreateOtpTokenDto) {
    return this.otpTokenService.create(createOtpTokenDto);
  }

  @MessagePattern('findAllOtpToken')
  findAll() {
    return this.otpTokenService.findAll();
  }

  @MessagePattern('findOneOtpToken')
  findOne(@Payload() id: number) {
    return this.otpTokenService.findOne(id);
  }

  @MessagePattern('updateOtpToken')
  update(@Payload() updateOtpTokenDto: UpdateOtpTokenDto) {
    return this.otpTokenService.update(updateOtpTokenDto.id, updateOtpTokenDto);
  }

  @MessagePattern('removeOtpToken')
  remove(@Payload() id: number) {
    return this.otpTokenService.remove(id);
  }
}
