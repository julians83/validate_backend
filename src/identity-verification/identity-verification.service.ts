import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateIdentityVerificationDto } from './dto/create-identity-verification.dto';

@Injectable()
export class IdentityValidateService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('IdentityValidate_API_URL');
    this.apiKey = this.configService.get<string>('IdentityValidate_API_KEY');
  }

  async validateDocument(
    country: string,
    document_type: string,
    accountId?: string,
    type: string = 'document-validation',
  ) {
    const data: CreateIdentityVerificationDto = {
      country,
      document_type,
      accountId,
      type,
      user_authorized: true,
    };

    try {
      const response = await axios.post(`${this.apiUrl}/validations`, data, {
        headers: {
          'Truora-API-Key': this.apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error en IdentityValidateService:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException(
        'Error al procesar la validación de documento',
      );
    }
  }

  async uploadDocumentImage(url: string, imageBuffer: Buffer) {
    try {
      await axios.put(url, imageBuffer, {
        headers: {
          'Truora-API-Key': this.apiKey,
          'Content-Type': 'image/jpeg',
        },
      });
    } catch (error) {
      console.error(
        'Error uploading document image:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException('Error uploading document image');
    }
  }
}
