import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IQueryParamsStoreRoutes } from 'query-params-store';
import { WizardActivate } from './guards/wizard.activate';
import { WizardDeactivate } from './guards/wizard.deactivate';
import { WizardComponent } from './wizard/wizard.component';


const routes: IQueryParamsStoreRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      queryParamsConfig: {
        defaultValues: {
          collapse: {
            typeConvertor: Boolean,
            multi: true,
            value: 0,
            length: 6,
            removeInvalid: true
          }
        },
        removeUnknown: true
      }
    }
  },
  {
    path: 'wizard',
    pathMatch: 'full',
    redirectTo: 'wizard/1',
  },
  {
    path: 'wizard/:step',
    component: WizardComponent,
    canActivate: [WizardActivate],
    canDeactivate: [WizardDeactivate],
    data: {
      allowedSteps: [1, 2, 3],
      queryParamsConfig: {
        defaultValues: {
          firstName: {
            value: null,
            typeConvertor: String,
            multi: false
          },
          age: {
            value: null,
            typeConvertor: Number,
            multi: false
          },
          country: {
            value: null,
            typeConvertor: Number,
            multi: false
          },
          date: {
            value: null,
            typeConvertor: Number,
            multi: false
          }
        }
      }
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
