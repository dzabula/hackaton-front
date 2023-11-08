import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDate'
})
export class FormatDate implements PipeTransform {

    transform(value: string, format: string = 'yyyy-MM-dd'): string {
      const datePipe: DatePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, format);
      return formattedDate || value;
    }

}
