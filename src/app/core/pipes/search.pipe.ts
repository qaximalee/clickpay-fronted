import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, value: any): any {    
    if (value === undefined || value === '' || value === null) return items;
    return items.filter((item: any) => item.productSerialNumber.toString().includes(value));
  }
}
