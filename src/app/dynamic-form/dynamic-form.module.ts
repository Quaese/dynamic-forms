import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './directives/dynamic-field.directive';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormButtonbarComponent } from './components/form-buttonbar/form-buttonbar.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormButtonbarComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
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
  // => use 'entryComponents' to declare/manifest compontents (bekannt machen)
  entryComponents: [
    FormButtonComponent,
    FormButtonbarComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
  ]
})
export class DynamicFormModule { }
