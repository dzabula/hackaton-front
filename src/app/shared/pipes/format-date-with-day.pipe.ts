import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDateWithDay'
})
export class FormatDateWithDay implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
