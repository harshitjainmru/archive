export const FormUtils = {
  parse(value: any): any {
    const newValueInstance = Object.assign({}, value);
    (function isEmpty(data: any): boolean {
      if (typeof data === "object" && data !== null) {
        if (Array.isArray(data)) {
         data.forEach((item: any, index: number) => {
            if (isEmpty(item) || item === null) {
              data.splice(index, 1);
            }
          });
        } else {
          const keys = Object.keys(data);
          keys.forEach((key) => {
            if (isEmpty(data[key])) {
              delete data[key];
            }
          });
        }
      }
      return data === null || data === undefined || data === "";
    })(newValueInstance);
    return newValueInstance;
  },
};
