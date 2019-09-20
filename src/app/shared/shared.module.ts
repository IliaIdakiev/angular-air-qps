import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule, MatButtonModule, MatIconModule } from '@angular/material';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { TableFilterDirective } from './table-filter.directive';
import { TableSortDirective } from './table-sort.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    ListFilterComponent,
    TableFilterDirective,
    TableSortDirective
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
    TableSortDirective
  ]
})
export class SharedModule { }
