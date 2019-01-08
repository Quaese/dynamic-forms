/*
 * Call with a component, e.g.:
 *
 *   import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
 *   import { Validators } from '@angular/forms';
 *   import { Subscription } from 'rxjs';
 *
 *   import { charValidator } from './dynamic-form/validators/char.validator';
 *
 *   import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
 *
 *   @Component({
 *     selector: 'app-root',
 *     templateUrl: './app.component.html',
 *     styleUrls: ['./app.component.less']
 *   })
 *   export class AppComponent implements AfterViewInit, OnDestroy {
 *     // enables the possibility to get access to the instance of DyamicFormComponent like this.form.valid
 *     // not safe to use before AfterViewInit hook
 *     @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
 *
 *     private changeSubscription: Subscription;
 *
 *     // default css classes for form control/field groups
 *     classes = {
 *       wrapper: 'form-group row',
 *       label: 'col-sm-2 col-form-label',
 *       inner: 'col-sm-10',
 *       control: 'form-control'
 *     };
 *     // configuration array form control/field groups
 *     config = [
 *       {
 *         type: 'input',
 *         name: 'name',
 *         label: 'Full name',
 *         placeholder: 'Enter your name',
 *         // disabled: '',
 *         value: 'Hoasd',
 *         validation: [
 *           Validators.required,
 *           Validators.minLength(2), charValidator
 *         ],
 *         classes: {...this.classes}
 *       },
 *       {
 *         type: 'select',
 *         name: 'nick',
 *         label: 'Favorite nick name',
 *         options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *         placeholder: 'Select an option',
 *         value: '2',
 *         validation: [Validators.required],
 *         classes: {
 *           ...this.classes,
 *           control: 'form-control form-control-lg'
 *         }
 *       },
 *       {
 *         type: 'textarea',
 *         name: 'comment',
 *         label: 'Your comment',
 *         placeholder: 'Enter your comment here.',
 *         readonly: '',
 *         value: 'Initial value',
 *         classes: {...this.classes}
 *       },
 *       {
 *         type: 'button',
 *         name: 'submit',
 *         label: 'Submit'
 *       }
 *     ];
 *
 *     constructor(
 *       private changeDetectorRef: ChangeDetectorRef
 *     ) {}
 *
 *     ngAfterViewInit() {
 *       let previousValid = this.form.valid;
 *
 *       // subscribe to changes$ method from DynamicFormComponent
 *       this.changeSubscription = this.form.changes$.subscribe(() => {
 *         // if the valid value of the form changed
 *         if (previousValid !== this.form.valid) {
 *           // call setDisabled method from DynamicFormComponent to enable/disable the submit button
 *           this.form.setDisabled('submit', previousValid);
 *           // set new status of form
 *           previousValid = this.form.valid;
 *         }
 *       });
 *
 *       // avoid 'ExpressionChangedAfterItHasBeenCheckedError' error
 *       // (more see: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
 *       this.changeDetectorRef.detectChanges();
 *     }
 *
 *     hSubmit(formValues) {
 *       console.log('hSubmit (app.component): ', formValues, ' - ', this.form.valid);
 *     }
 *
 *     ngOnDestroy() {
 *       this.changeSubscription.unsubscribe();
 *     }
 *   }
 *
 */


import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  // Getter
  get controls() { return this.config.filter(({type}) => !/button|buttonbar/.test(type));}
  get valid() { return this.form.valid }
  get value() { return this.form.value }
  get changes$() { return this.form.valueChanges }  // returns an Observable

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      // get all controls from the config array (except buttons)
      const controls = Object.keys(this.form.controls);
      // get array containing control names only
      const configControls = this.controls.map((item) => item.name);

      console.log('controls (dynamic-form.component): ', controls);
      console.log('configControls (dynamic-form.component): ', configControls);

      controls
        .filter((control) => !configControls.includes(control))     // get all controls which are not included in the config
        .forEach((control) => this.form.removeControl(control));    // remove all not included controls from form

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});

    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));

    return group;
  }

  createControl(config: FieldConfig) {
    const {disabled, validation, value} = config;

    return this.fb.control({disabled, value}, validation);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

  hSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // trigger/emit event for parent component (hand over value via getter)
    this.submit.emit(this.value);
  }
}
