import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule,
  MatSortModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';
import { SharedModule } from '../shared/shared.module';
import { EntityComponent } from './entity/entity.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    EntityComponent
  ],
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
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    ListResolver
  ],
  entryComponents: [
    EntityComponent
  ]
})
export class UserModule { }
