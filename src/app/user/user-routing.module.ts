import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IQueryParamsStoreRoutes } from 'query-params-store';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';
import { pageSizes } from '../shared/constatns/page-size';

const routes: IQueryParamsStoreRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
    resolve: {
      list: ListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      queryParamsConfig: {
        defaultValues: { // TODO: Rename defaultValues property to something more meaningful like state
          page: 1,
          pageSize: {
            typeConvertor: Number,
            allowedValues: pageSizes,
            multi: false,
            value: 10
          },
          filter: {
            typeConvertor: String,
            separator: ';',
            value: '',
            multi: true
          },
          sort: {
            typeConvertor: String,
            separator: ';',
            value: '',
            multi: true
          },
          showFilter: false,
          edit: {
            value: null,
            typeConvertor: Number,
            multi: false
          }
        },
        removeUnknown: true
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
