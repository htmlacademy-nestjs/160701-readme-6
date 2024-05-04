import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileVaultConfigModule, getMongooseOptions } from '@project/config';
import { FileUploaderModule } from '@project/file-uploader';

@Module({
  imports: [
    FileVaultConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
