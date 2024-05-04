import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FileVaultConfig } from '@project/config';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY/MM/DD';

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename
    );
  }

  private getSubUploadDirectoryPath(): string {
    const path = dayjs().format(this.DATE_FORMAT).split('/');

    return join(...path);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);

      const destinationFile = this.getDestinationFilePath(
        `${filename}.${fileExtension}`
      );

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch (error: any) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
