export class CreateIdentityVerificationDto {
  type: string;
  country: string;
  document_type: string;
  accountId?: string;
  user_authorized: boolean;
}
