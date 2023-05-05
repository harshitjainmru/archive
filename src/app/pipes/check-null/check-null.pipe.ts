import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {
    constructor() {
    }

    // returns '-' if value is null in the dataSource
    transform(value: any, customRetun: any = null): any {
        return (value !== undefined && value !== null) ? value : (customRetun ? customRetun : ' - ');
    }

}
