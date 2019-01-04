/*
 * Call with a component, e.g.:
 *
 *    import { Component, ViewChild, AfterViewInit } from '@angular/core';
 *
 *    import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';
 *
 *    @Component({
 *      selector: 'app-root',
 *      template: `
 *        <div class="app">
 *          <dynamic-form [config]="config" (submit)="hSubmit($event)></dynamic-form>
 *        </div>
 *        {{ form.valid }}
 *        {{ form.value | json }}
 *      `,
 *      styleUrls: ['./app.component.less']
 *    })
 *    export class AppComponent implements AfterViewInit {
 *      @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
 *
 *      title = 'dynamic-forms';
 *
 *      config = [
 *        {
 *          type: 'input',
 *          name: 'name',
 *          label: 'Full name',
 *          placeholder: 'Enter your name'
 *        },
 *        {
 *          type: 'select',
 *          name: 'nick',
 *          label: 'Favorite nick name',
 *          options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
 *          placeholder: 'Enter an option'
 *        },
 *        {
 *          type: 'button',
 *          name: 'submit',
 *          label: 'Submit'
 *        }
 *      ];
 *
 *      ngAfterViewInit() {
 *        console.log('AfterViewInit (app.component): ', this.form.valid);
 *      }
 *
 *      hSubmit(formValues) {
 *        console.log(formValues);
 *      }
 *    }
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
  get controls() { return this.config.filter(({type}) => type !== 'button');}
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
