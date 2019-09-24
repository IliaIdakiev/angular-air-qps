import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { WizardService } from '../wizard.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class WizardDeactivate implements CanDeactivate<HomeComponent> {

  constructor(private wizardService: WizardService, private router: Router) { }

  canDeactivate(
    component: HomeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) {
    if (!nextState.url.includes('wizard')) { return of(true); }

    const data = /\/wizard\/(\d)/.exec(nextState.url);
    const [, nextStep] = data || [null, '1'];
    return this.wizardService.getValidStream(+nextStep - 1).pipe(first());
  }

}
