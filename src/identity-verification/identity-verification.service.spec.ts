import { Test, TestingModule } from '@nestjs/testing';
import { IdentityValidateService } from './identity-verification.service';

describe('IdentityVerificationService', () => {
  let service: IdentityValidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentityValidateService],
    }).compile();

    service = module.get<IdentityValidateService>(IdentityValidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
