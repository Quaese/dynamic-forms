import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
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
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormButtonComponent,
  ]
})
export class DynamicFormModule { }
