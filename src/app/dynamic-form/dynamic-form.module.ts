import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ],
  exports: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  // when a component should be created dynamically, Angular needs to know, so that it
  // can expose the component factories
  // => use 'entryComponents' to manifest compontents (bekannt machen)
  entryComponents: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
  ]
})
export class DynamicFormModule { }
