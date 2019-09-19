import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { multiValueHandler, multiValueParser } from './utils';
import { MatInput } from '@angular/material';

@Directive({
  selector: '[appTableFilter]',
  exportAs: 'appTableFilter'
})
export class TableFilterDirective {

  get name() {
    return this.elementRef.nativeElement.name;
  }

  value: any;

  constructor(
    private qps: QueryParamsStore,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.qps.select('filter').pipe(map(multiValueParser)).subscribe(filter => {
      const itemIndex = filter.keys.indexOf(this.name);
      this.value = filter.vals[itemIndex] || null;
    });
  }

  clear() {
    this.qps.select('filter').pipe(first()).subscribe(filter => {
      filter = multiValueHandler(filter, this.name, '');
      this.router.navigate([], {
        queryParams: { filter },
        queryParamsHandling: 'merge'
      });
    });
  }

}
