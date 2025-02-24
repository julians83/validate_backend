import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdentityValidateService } from './identity-verification.service';

@Controller('identity-validate')
export class IdentityValidateController {
  constructor(
    private readonly identityValidateService: IdentityValidateService,
  ) {}

  @Post('validate-document')
  async validateDocument(
    @Body()
    body: {
      country: string;
      document_type: string;
      accountId: string;
      type: string;
    },
  ) {
    const { country, document_type, accountId, type } = body;
    return this.identityValidateService.validateDocument(
      country,
      document_type,
      accountId,
      type,
    );
  }

  @Put('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body() body: { url: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { url } = body;
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }
    if (!url) {
      throw new BadRequestException('No se ha proporcionado ninguna URL');
    }
    try {
      await this.identityValidateService.uploadDocumentImage(url, file.buffer);
      return { message: 'Imagen subida exitosamente' };
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      throw new InternalServerErrorException('Error al subir la imagen');
    }
  }

  @Get('validations/:validationId')
  async getValidations(@Param('validationId') validationId: string) {
    return this.identityValidateService.getValidations(validationId);
  }
}
