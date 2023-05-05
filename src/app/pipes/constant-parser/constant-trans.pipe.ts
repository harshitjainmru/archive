import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'constantTrans'
})
export class ConstantTransPipe implements PipeTransform {




  transform(data: any, type: string): any {
    if (data) {
      switch (type) {
        case 'LOWER':
          return `${data.toLowerCase()}`;
        case 'CAP':
          return `${data.toUpperCase()}`;
        case 'PAY':
          return this.getPayTypeValue(data);
        default:
          return null;
      }
    }
  }

  getPayTypeValue(job) {
    let paid;
    if (job.payForWorker == 1) {
      const min = job?.payHourlyRange?.min;
      const max = job?.payHourlyRange?.max;
      paid = `$${min || 0}-$${max || 0}`
    } else {
      const fix = job?.payFixed;
      paid = fix ? `$${fix}` : 'NA'
    }
    return paid;
  }

}
