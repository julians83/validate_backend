import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityVerificationModule } from './identity-verification/identity-verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IdentityVerificationModule,
  ],
})
export class AppModule {}
