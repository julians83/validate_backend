import { Module } from '@nestjs/common';
import { IdentityValidateController } from './identity-verification.controller';
import { IdentityValidateService } from './identity-verification.service';

@Module({
  controllers: [IdentityValidateController],
  providers: [IdentityValidateService],
})
export class IdentityVerificationModule {}
