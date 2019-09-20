import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
// import { NgForm } from '@angular/forms';
// import { map, first, skip, ignoreElements } from 'rxjs/operators';
// import { asyncScheduler, Subscription } from 'rxjs';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {

  // @ViewChild('form', { static: false, read: NgForm }) set form(form: NgForm) {
  //   if (!form) { return; }
  //   asyncScheduler.schedule(() => {
  //     if (this.subscripton) { this.subscripton.unsubscribe(); }
  //     this.subscripton = form.valueChanges.pipe(
  //       map(() => form.value),
  //     ).subscribe(val => {
  //       console.log(val);
  //     });
  //   });
  // }

  // subscripton: Subscription;
  entity$ = this.userService.entity$;
  isLoading$ = this.userService.isEntiyLoading$;

  constructor(private router: Router, private userService: UserService) { }


  close() {
    this.router.navigate([], { queryParams: { edit: undefined }, queryParamsHandling: 'merge' });
  }
}
