import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule, MatButtonModule, MatIconModule } from '@angular/material';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { TableFilterDirective } from './table-filter.directive';
import { TableSortDirective } from './table-sort.directive';
import { GetPropPipe } from './get-prop.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    ListFilterComponent,
    TableFilterDirective,
    TableSortDirective,
    GetPropPipe
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    LoaderComponent,
    ListFilterComponent,
    TableFilterDirective,
    TableSortDirective,
    GetPropPipe
  ]
})
export class SharedModule { }
