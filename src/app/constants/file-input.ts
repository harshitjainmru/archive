import { invalidImageError, invalidFileSize } from "./messages";
import { MAX_IMAGE_SIZE ,IMAGE_FORMAT} from './constant';
import { CUSTOM_HANDLE_ERROR } from './enums';

const readFile = (file: File) => {

  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (imgsrc: any) => {
          resolve({ file: file, url: imgsrc.target.result, type: file.name.substr(file.name.lastIndexOf('.') + 1) })
      };
  })
}
export const onSelectFile = async (event, accept = IMAGE_FORMAT, maxSize = MAX_IMAGE_SIZE): Promise<any[]> => {

  if (event.target.files && event.target.files.length) {
      for (let file of event.target.files) {
          if (accept && accept.split(',').indexOf(file.type) === -1) {
              return Promise.reject({ type: CUSTOM_HANDLE_ERROR.FILE_TYPE });
          }
          if (maxSize && maxSize < ((file.size / 1024) / 1024)) {
              return Promise.reject({ type: CUSTOM_HANDLE_ERROR.FILE_SIZE });
          }
      }
      let files = [];
      for (let i = 0; i < event.target.files.length; i++) {
          files.push(readFile(event.target.files[i]));
      }
      return Promise.all(files);
  }
}