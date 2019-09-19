import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, mapTo, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { QueryParamsStore } from 'query-params-store';
import { comparer } from 'src/app/shared/utils';

@Injectable()
export class ListResolver implements Resolve<Observable<boolean>> {

  constructor(private userService: UserService, private qps: QueryParamsStore) { }

  prevSpf = null;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.qps.select(({ page, filter, sort, pageSize }) => ({ page, filter, sort, pageSize })).pipe(
      tap(spf => {
        if (comparer(this.prevSpf, spf)) { return; }
        this.prevSpf = spf;
        this.userService.loadAll(spf);
      }),
      first(),
      mapTo(true)
    );
  }
}
