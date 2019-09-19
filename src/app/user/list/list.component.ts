import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from 'src/app/shared/interfaces';
import { map, filter, first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { pageSizes } from 'src/app/shared/constatns/page-size';
import { QueryParamsStore } from 'query-params-store';
import { Router } from '@angular/router';
import { multiValueHandler } from 'src/app/shared/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  pageSizes = pageSizes;
  displayedColumns: string[] = ['name', 'username', 'email'];

  isLoading$ = this.userService.isLoading$;
  userListDataSource$ = this.userService.list$.pipe(filter(val => !!val), map(({ users }) => new MatTableDataSource<IUser>(users)));
  totalUsersCount$ = this.userService.list$.pipe(map(({ totalCount }) => totalCount));

  selectedPageSize$ = this.qps.select('pageSize');
  currentPage$ = this.qps.select('page');
  currentFilter$ = this.qps.select('filter');
  currentSort$ = this.qps.select('sort');

  constructor(private userService: UserService, private qps: QueryParamsStore, private router: Router) { }

  pageChangeHandler({ pageSize, pageIndex }) {
    this.router.navigate([], {
      queryParams: {
        pageSize,
        page: pageIndex === 0 ? undefined : ++pageIndex
      },
      queryParamsHandling: 'merge'
    });
  }

  sortChangeHandler({ active, direction }) {
    this.qps.select('sort').pipe(
      first()
    ).subscribe(sort => {
      sort = multiValueHandler(sort, active, direction);
      this.router.navigate([], {
        queryParams: { sort },
        queryParamsHandling: 'merge'
      });
    });
  }
}
