import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { first, mapTo, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { QueryParamsStore } from 'query-params-store';
import { comparer } from 'src/app/shared/utils';

@Injectable()
export class ListResolver implements Resolve<Observable<boolean[]>> {

  constructor(private userService: UserService, private qps: QueryParamsStore) { }

  prevSpf = null;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const spf$ = this.qps.select(({ page, filter, sort, pageSize }) => ({ page, filter, sort, pageSize })).pipe(
      tap(spf => {
        if (comparer(this.prevSpf, spf)) { return; }
        this.prevSpf = spf;
        this.userService.loadAll(spf);
      }),
      first(),
      mapTo(true)
    );

    const entity$ = this.qps.select('edit').pipe(
      tap(id => {
        if (!id) { return; }
        this.userService.loadOne(id);
      }),
      first(),
      mapTo(true)
    );

    return zip(spf$, entity$);
  }
}
