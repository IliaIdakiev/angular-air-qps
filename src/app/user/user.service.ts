import { Injectable } from '@angular/core';
import { IQueryData, IUser } from '../shared/interfaces';
import { apiQueryBuilder } from '../shared/utils';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  list$: ReplaySubject<{ users: IUser[]; totalCount: number; }> = new ReplaySubject(1);
  entity$: ReplaySubject<IUser> = new ReplaySubject(1);
  isListLoading$: ReplaySubject<boolean> = new ReplaySubject(1);
  isEntiyLoading$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private http: HttpClient) {
    this.list$.next(null);
    this.isListLoading$.next(false);
  }

  loadAll(data: IQueryData) {
    const query = apiQueryBuilder(data);
    this.isListLoading$.next(true);
    return this.http.get<IUser[]>(
      `https://jsonplaceholder.typicode.com/users${query}`, { observe: 'response' }).pipe(
        map(res => ({ users: res.body, totalCount: +res.headers.get('x-total-count') })),
        tap(() => this.isListLoading$.next(false))
      ).subscribe(d => { this.list$.next(d); });
  }

  loadOne(id: number) {
    this.isEntiyLoading$.next(true);
    return this.http.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${id}`).pipe(
        tap(() => this.isEntiyLoading$.next(false)),
      ).subscribe(d => { this.entity$.next(d); });
  }
}
