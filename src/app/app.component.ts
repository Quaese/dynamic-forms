import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { charValidator } from './dynamic-form/validators/char.validator';
import { selectValidator } from './dynamic-form/validators/select.validator';

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

  // default css classes for form control/field groups
  classes = {
    wrapper: 'form-group row',
    label: 'col-sm-2 col-form-label',
    inner: 'col-sm-10',
    control: 'form-control'
  };
  // configuration array form control/field groups
  config = [
    {
      type: 'input',
      name: 'name',
      label: 'Full name',
      placeholder: 'Enter your name',
      // disabled: '',
      value: 'Hoasd',
      validation: [
        Validators.required,
        Validators.minLength(2), charValidator
      ],
      classes: {...this.classes}
    },
    {
      type: 'select',
      name: 'nick',
      label: 'Favorite nick name',
      options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
      defaulSelected: '0',
      placeholder: 'Select an option',
      // value: '2',
      validation: [
        Validators.required,
        selectValidator('0')  // use value from defaultSelected
      ],
      classes: {
        ...this.classes,
        control: 'form-control form-control-lg'
      }
    },
    {
      type: 'textarea',
      name: 'comment',
      label: 'Your comment',
      placeholder: 'Enter your comment here.',
      readonly: '',
      value: 'Initial value',
      classes: {...this.classes}
    },
    {
      type: 'button',
      name: 'submit',
      label: 'Submit'
    },
    {
      type: 'buttonbar',
      name: 'buttonbar_01',
      label: 'Buttonbar',
      buttons: [
        {
          type: 'button',
          name: 'buttonbar_reset',
          label: 'Reset',
          action: 'reset',
          classes: 'btn'
        },
        {
          type: 'button',
          name: 'buttonbar_submit',
          label: 'Submit',
          action: 'submit',
          classes: 'btn btn-primary',
          canDisable: true
        }
      ]
    },
    {
      type: 'inputgroup',
      name: 'inputgroup_01',
      label: 'Inputgroup',
      classes: 'form-row',
      controls: [
        {
          type: 'input',
          name: 'zipcode',
          label: 'Zipcode',
          placeholder: 'Enter zipcode',
          validation: [
            Validators.required,
          ],
          classes: {
            wrapper: 'form-group',
            label: 'col-sm-2 col-form-label',
            inner: 'col-sm-10',
            control: 'form-control'
          }
        },
        {
          type: 'input',
          name: 'city',
          label: 'City',
          placeholder: 'Enter city',
          validation: [
            Validators.required,
          ],
          classes: {
            wrapper: 'form-group',
            label: 'col-sm-2 col-form-label',
            inner: 'col-sm-10',
            control: 'form-control'
          }
        }
      ]
    },
    {
      type: 'inputgroup',
      name: 'inputgroup_02',
      label: 'Inputgroup',
      classes: 'form-row',
      controls: [
        {
          type: 'input',
          name: 'street',
          label: 'Street',
          placeholder: 'Enter street',
          validation: [
            Validators.required,
          ],
          classes: {
            wrapper: 'form-group',
            label: 'col-sm-2 col-form-label',
            inner: 'col-sm-10',
            control: 'form-control'
          }
        }
      ]
    },
    {
      type: 'controlgroup',
      name: 'controlgroup_01',
      label: 'Controlgroup',
      classes: 'form-row',
      controls: [
        {
          type: 'input',
          name: 'controlgroup_control_01',
          label: 'controlgroup_control_01',
          placeholder: 'Enter controlgroup_control_01',
          validation: [
            Validators.required,
          ],
          classes: {
            wrapper: 'form-group',
            label: 'col-sm-2 col-form-label',
            inner: 'col-sm-10',
            control: 'form-control'
          }
        },
        {
          type: 'select',
          name: 'controlgroup_control_02',
          label: 'controlgroup_control_02',
          placeholder: 'Enter controlgroup_control_02',
          options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
          defaulSelected: '0',
          validation: [
            Validators.required,
            selectValidator('0')  // use value from defaultSelected
          ],
          classes: {
            wrapper: 'form-group',
            label: 'col-sm-2 col-form-label',
            inner: 'col-sm-10',
            control: 'form-control'
          }
        }
      ]
    }
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    let previousValid = this.form.valid;

    // subscribe to changes$ method from DynamicFormComponent
    this.changeSubscription = this.form.changes$.subscribe(() => {
      // if the valid value of the form changed
      if (previousValid !== this.form.valid) {
        // call setDisabled method from DynamicFormComponent to enable/disable the submit/buttonbar button
        this.form.setDisabled('submit', previousValid);
        this.form.setDisabled('buttonbar_01', previousValid);
        // set new status of form
        previousValid = this.form.valid;
      }
    });

    this.form.setDisabled('submit', true);
    this.form.setDisabled('buttonbar_01', true);
    // this.form.setValue('name', 'Quaese');

    // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
    // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
    this.changeDetectorRef.detectChanges();
  }

  hSubmit(formValues) {
    console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid);
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }
}
