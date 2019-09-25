import { Injectable } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { defer, of, zip, Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  firstStepData$ = this.qps.select(state => [state.firstName, state.age]);
  secondStepData$ = this.qps.select(state => state.country);
  thirdStepData$ = this.qps.select(state => state.date);

  stepValidations = [
    null,
    [this.firstStepData$],
    [this.firstStepData$, this.secondStepData$]
  ];

  constructor(private qps: QueryParamsStore) { }

  getValidStream(index: number): Observable<boolean> {
    const currentStepValidations = this.stepValidations[index];
    if (!currentStepValidations) { return of(true); }
    return zip(...currentStepValidations).pipe(
      map(res => res.reduce((acc, val) => acc && ![].concat(val).map(itm => !!itm).includes(false), true))
    );
  }
}
