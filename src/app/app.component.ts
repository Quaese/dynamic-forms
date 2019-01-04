import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // enables the possibility to get access to the instance of DyamicFormComponent like this.form.valid
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  private changeSubscription: Subscription;

  config = [
    {
      type: 'input',
      name: 'name',
      label: 'Full name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(2)]
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

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

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

    // run disable routine on first render
    this.form.setDisabled('submit', true);
    //this.form.setValue('name', 'Quaese');

    // change
    this.cdRef.detectChanges();
  }

  hSubmit(formValues) {
    console.log(formValues);
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }
}
