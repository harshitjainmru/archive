import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';
import { MEDIAFORMATS } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  bucket: S3;
  constructor(private loaderService: LoaderService) {
    this.bucket = new S3({
      accessKeyId: environment.config.AWS_ACCESS_KEY,
      secretAccessKey: environment.config.AWS_SECRET_KEY,
      region: environment.config.AWS_REGION,
    });
  }

  // This will use for file upload
  async uploadFile(fileToUpload: File, loader = true) {
    console.log(fileToUpload);
    try {
      const extension = MEDIAFORMATS.find(
        (list) => list.mimetype === fileToUpload.type
      ).extension;
      let fileName = `${
        fileToUpload.name.split('.')[0] + new Date().getTime()
      }${extension ? extension : 'png'}`;
      const params = {
        Bucket: environment.config.AWS_BUCKET,
        Key: fileName,
        Body: fileToUpload,
        ACL: 'public-read',
        ContentType: fileToUpload.type ?? '',
      };
      if (loader) this.loaderService.loader.next(true);
      let self = this;
      return new Promise((resolve, reject) => {
        this.bucket
          .upload(params, function (err, data) {
            if (err) {
              if (loader) self.loaderService.loader.next(false);
              reject(err);
              return false;
            } else {
              if (loader) {
                self.loaderService.loader.next(false);
              }
              resolve(data);
            }
          })
          .on('httpUploadProgress', (progress) => {});
      });
    } catch (err) {
      if (loader) {
        this.loaderService.loader.next(false);
      }
    }
  }

  // This will upload multiple files
  async uploadMultipleFiles(files) {
    try {
      this.loaderService.loader.next(true);
      const data = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < files.length; i++) {
        data.push(this.uploadFile(files[i], false));
      }
      const result = await Promise.all(data);
      this.loaderService.loader.next(false);
      return Promise.resolve(result);
    } catch (err) {
      this.loaderService.loader.next(false);
      return Promise.reject(err);
    }
  }
}
