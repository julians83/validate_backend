import { PartialType } from '@nestjs/mapped-types';
import { CreateIdentityVerificationDto } from './create-identity-verification.dto';

export class UpdateIdentityVerificationDto extends PartialType(CreateIdentityVerificationDto) {}
