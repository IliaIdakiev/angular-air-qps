import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';

import { QueryParamsStoreModule } from 'query-params-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
} from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { WizardActivate } from './guards/wizard.activate';
import { WizardDeactivate } from './guards/wizard.deactivate';
import { WizardComponent } from './wizard/wizard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WizardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    QueryParamsStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    WizardActivate,
    WizardDeactivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
