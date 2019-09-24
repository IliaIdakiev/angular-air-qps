import { Component } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  collapsables$: Observable<boolean[]> = this.qps.select('collapse');

  constructor(private qps: QueryParamsStore, private router: Router) { }

  clickHandler(idx: number) {
    this.collapsables$.pipe(
      first(),
      map(collapsables =>
        parseInt([...collapsables.slice(0, idx), !collapsables[idx], ...collapsables.slice(idx + 1)].map(i => +i).reverse().join(''), 2)
      )
    ).subscribe(collapse => {
      this.router.navigate([], {
        queryParams: { collapse },
        queryParamsHandling: 'merge'
      });
    });
  }
}
