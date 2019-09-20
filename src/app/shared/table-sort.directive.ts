import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { multiValueParser } from './utils';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTableSort]',
  exportAs: 'appTableSort'
})
export class TableSortDirective implements OnDestroy {

  subscription: Subscription;
  value: any;

  constructor(private elementRef: ElementRef, private qps: QueryParamsStore) {
    const name = this.elementRef.nativeElement.getAttribute('mat-sort-header');
    this.subscription = this.qps.select('sort').pipe(map(multiValueParser)).subscribe(sort => {
      const itemIndex = sort.keys.indexOf(name);
      this.value = sort.vals[itemIndex] || null;
    });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
