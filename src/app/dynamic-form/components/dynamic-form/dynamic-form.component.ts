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


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit {
    @Input()
    config: FieldConfig[] = [];

    @Output()
    submit: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    // Getter
    get controls() { return this.config.filter(({type}) => type !== 'button'); }
    get changes() { return this.form.valueChanges }
    get valid() { return this.form.valid }
    get value() { return this.form.value }

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});

        this.config.forEach(control => group.addControl(control.name, this.createControl(control)));

        return group;
    }

    createControl(config: FieldConfig) {
        const {disabled, validation, value} = config;

        return this.fb.control({disabled, value}, validation);
    }

    hSubmit(event: Event) {
      event.preventDefault();
      event.stopPropagation();

      // trigger/emit event for parent component (hand over value via getter)
      this.submit.emit(this.value);
    }
}
