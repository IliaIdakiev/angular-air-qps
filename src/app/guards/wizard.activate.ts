import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { WizardService } from '../wizard.service';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable()
export class WizardActivate implements CanActivate {

  constructor(private router: Router, private wizardService: WizardService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedSteps: number[] = route.data.allowedSteps;
    const currentStep = +route.params.step;

    if (!currentStep || !allowedSteps.includes(currentStep)) {
      this.router.navigate(['wizard', 1], { queryParamsHandling: 'preserve' });
      return of(false);
    }

    return this.wizardService.getValidStream(currentStep - 1).pipe(
      first(),
      tap(isValid => {
        if (isValid) { return; }
        this.router.navigate(['wizard', currentStep - 1], { queryParamsHandling: 'preserve' });
      })
    );
  }
}
