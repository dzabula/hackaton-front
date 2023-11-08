import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MoneyFormat'
})
export class MoneyFormat implements PipeTransform {

  transform(value: any): any {
    const formatted = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    return formatted.replace(/,/g, '.');
  }

}
