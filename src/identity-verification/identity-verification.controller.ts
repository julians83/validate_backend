import {
  BadRequestException,
  Body,
  Controller,
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

  @Put('upload-front')
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
    console.log('url:', url);
    console.log('file:', file);
    try {
      await this.identityValidateService.uploadDocumentImage(url, file.buffer);
      return { message: 'Imagen subida exitosamente' };
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
      throw new InternalServerErrorException('Error al subir la imagen');
    }
  }

  @Put('upload-back/:url')
  @UseInterceptors(FileInterceptor('back'))
  async uploadBackImage(
    @Param('url') url: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new InternalServerErrorException('No back image uploaded');
    }

    try {
      await this.identityValidateService.uploadDocumentImage(url, file.buffer);
      return { message: 'Back image uploaded successfully' };
    } catch (error) {
      console.error('Error in uploadBackImage:', error.message);
      throw new InternalServerErrorException('Failed to upload back image');
    }
  }
}
