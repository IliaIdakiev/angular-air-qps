import { Component, ViewChild, OnDestroy } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { Router, ActivatedRoute } from '@angular/router';
import { map, first, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Subject, Subscription, asyncScheduler, defer } from 'rxjs';
import { comparer } from '../shared/utils';
import { WizardService } from '../wizard.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnDestroy {
  isAlive$: Subject<void> = new Subject<void>();
  subs: Subscription[] = [null, null, null];

  step$ = this.activatedRoute.params.pipe(map(params => +params.step));
  firstName$ = this.qps.select('firstName');
  age$ = this.qps.select('age');
  country$ = this.qps.select('country');
  date$ = this.qps.select('date').pipe(map((val: number) => val ? new Date(val) : val));

  secondStepValidation$ = defer(() => this.wizardService.getValidStream(1));
  thirdStepValidation$ = defer(() => this.wizardService.getValidStream(2));

  @ViewChild('firstStep', { static: true }) set firstStep(form: NgForm) {
    this.stepFormHandler(form, 0);
  }
  @ViewChild('secondStep', { static: true }) set secondStep(form: NgForm) {
    this.stepFormHandler(form, 1);
  }
  @ViewChild('thirdStep', { static: true }) set thirdStep(form: NgForm) {
    this.stepFormHandler(form, 2);
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private qps: QueryParamsStore,
    private wizardService: WizardService
  ) { }

  stepFormHandler = (form: NgForm, index: number) => {
    if (!form) { return; }
    if (this.subs[index]) { this.subs[index].unsubscribe(); }
    asyncScheduler.schedule(() => {
      this.subs[index] = form.valueChanges.pipe(
        takeUntil(this.isAlive$),
        debounceTime(300),
        distinctUntilChanged(comparer)
      ).subscribe(formValue => {
        if (formValue.date) {
          formValue = { ...formValue, date: formValue.date.valueOf() };
        }
        this.router.navigate([], { queryParams: formValue, queryParamsHandling: 'merge' });
      });
    });
  }

  setStep(page: number) {
    this.router.navigate(['wizard', page], { queryParamsHandling: 'preserve' });
  }

  nextStep() {
    this.step$.pipe(first()).subscribe(step => {
      this.setStep(step + 1);
    });
  }

  prevStep() {
    this.step$.pipe(first()).subscribe(step => {
      this.setStep(step - 1);
    });
  }

  ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}
