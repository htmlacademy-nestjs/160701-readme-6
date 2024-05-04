import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderFactory } from './file-uploader.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ]),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = String(
          configService.get<string>('application.uploadDirectory')
        );
        const serveRoot = String(
          configService.get<string>('application.serveRoot')
        ); //TODO: Убрать String, почему приходит массив?

        return [
          {
            rootPath,
            serveRoot: `/${serveRoot}`,
            serveStaticOptions: {
              fallthrough: false,
              maxAge: 0,
            },
          },
        ];
      },
    }),
  ],
  providers: [
    FileUploaderService,
    FileUploaderRepository,
    FileUploaderFactory,
  ],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
