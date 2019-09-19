import { Component, Input, QueryList, ContentChildren, ElementRef, OnDestroy } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { first, map, debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, Subscription, merge, fromEvent } from 'rxjs';
import { MatInput } from '@angular/material';
import { comparer, multiValueHandler } from '../utils';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnDestroy {

  @Input() name: string;

  @ContentChildren(MatInput, { descendants: true, read: ElementRef }) set inputs(inputs: QueryList<ElementRef<HTMLInputElement>>) {
    if (this.changeSubscription) { this.changeSubscription.unsubscribe(); this.changeSubscription = null; }
    this.changeSubscription = merge(
      ...(inputs && inputs.toArray() || []).map(item => fromEvent(item.nativeElement, 'keyup').pipe(
        debounceTime(500),
        map(({ target }) => ({ name: (target as HTMLInputElement).name, value: (target as HTMLInputElement).value || undefined })),
        distinctUntilChanged((prev, curr) => comparer(prev, curr)),
        withLatestFrom(this.qps.select('filter'))
      ))
    ).subscribe(([{ name, value }, filter]) => {
      filter = multiValueHandler(filter, name, value);
      this.router.navigate([], {
        queryParams: { filter },
        queryParamsHandling: 'merge'
      });
    });
  }

  changeSubscription: Subscription;
  visible$ = defer(() => this.qps.select(this.name));

  constructor(private qps: QueryParamsStore, private router: Router) { }

  toggle() {
    this.qps.select(this.name).pipe(first()).subscribe(val => {
      this.router.navigate([], {
        queryParams: { [this.name]: !val || undefined },
        queryParamsHandling: 'merge'
      });
    });
  }

  ngOnDestroy() {
    if (this.changeSubscription) { this.changeSubscription.unsubscribe(); }
  }
}
