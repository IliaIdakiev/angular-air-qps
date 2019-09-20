import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from 'src/app/shared/interfaces';
import { map, filter, first, takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { pageSizes } from 'src/app/shared/constatns/page-size';
import { QueryParamsStore } from 'query-params-store';
import { Router } from '@angular/router';
import { multiValueHandler } from 'src/app/shared/utils';
import { Subject } from 'rxjs';
import { EntityComponent } from '../entity/entity.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {

  pageSizes = pageSizes;
  displayedColumns: string[] = ['name', 'username', 'email', 'actions'];

  isLoading$ = this.userService.isListLoading$;
  userListDataSource$ = this.userService.list$.pipe(filter(val => !!val), map(({ users }) => new MatTableDataSource<IUser>(users)));
  totalUsersCount$ = this.userService.list$.pipe(map(({ totalCount }) => totalCount));

  selectedPageSize$ = this.qps.select('pageSize');
  currentPage$ = this.qps.select('page');
  currentFilter$ = this.qps.select('filter');
  currentSort$ = this.qps.select('sort');

  isAlive$: Subject<void> = new Subject<void>();
  dialogRef: MatDialogRef<EntityComponent>;

  constructor(
    private userService: UserService,
    private qps: QueryParamsStore,
    private router: Router,
    private dialogService: MatDialog
  ) {
    this.qps.select('edit').pipe(takeUntil(this.isAlive$), map(val => !!val)).subscribe(shouldOpenDialog => {
      if (shouldOpenDialog) {
        this.dialogRef = this.dialogService.open(EntityComponent, {
          disableClose: true,
          width: '400px',
          height: '500px'
        });
      } else if (this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }

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
      sort = multiValueHandler(sort, active, direction === 'asc' ? null : direction);
      this.router.navigate([], {
        queryParams: { sort },
        queryParamsHandling: 'merge'
      });
    });
  }

  ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}
