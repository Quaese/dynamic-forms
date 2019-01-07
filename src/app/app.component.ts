import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { charValidator } from './dynamic-form/validators/char.validator';

import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // enables the possibility to get access to the instance of DyamicFormComponent like this.form.valid
  // not safe to use before AfterViewInit hook
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  private changeSubscription: Subscription;

  config = [
    {
      type: 'input',
      name: 'name',
      label: 'Full name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(2), charValidator]
    },
    {
      type: 'select',
      name: 'nick',
      label: 'Favorite nick name',
      options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      type: 'button',
      name: 'submit',
      label: 'Submit'
    }
  ];

  ngAfterViewInit() {
    console.log('AfterViewInit (app.component): ', this.form.valid);

    let previousValid = this.form.valid;

    // subscribe to changes$ method from DynamicFormComponent
    this.changeSubscription = this.form.changes$.subscribe(() => {
      // if the valid value of the form changed
      if (previousValid !== this.form.valid) {
        // call setDisabled method from DynamicFormComponent to enable/disable the submit button
        this.form.setDisabled('submit', previousValid);
        // set new status of form
        previousValid = this.form.valid;
      }
    });

    // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
    // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
    //
    // alternative solution: use ChangeDetectorRef.detectChanges() => but this will force rerendering of all child components
    // constructor(private changeDetectorRef: ChangeDetectorRef) {}
    // ngAfterViewInit() {this.changeDetectorRef.detectChanges();}
    Promise.resolve(null).then(() => {
      // run disable routine on first render
      this.form.setDisabled('submit', true);
      this.form.setValue('name', 'Quaese');
    });
  }

  hSubmit(formValues) {
    console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid);
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }
}
