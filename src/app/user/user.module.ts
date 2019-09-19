import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule,
  MatSortModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ListResolver
  ]
})
export class UserModule { }
