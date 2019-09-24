import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProp',
  pure: true
})
export class GetPropPipe implements PipeTransform {

  transform(value: any, key: string): any {
    return (value || [])[key];
  }

}
