import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class NftFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    return value.filter((x: any) => x._id != args[0]);
  }
}
