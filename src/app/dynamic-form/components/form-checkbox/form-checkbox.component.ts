import { Component } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.less']
})
export class FormCheckboxComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}

  get controls() {
    return (this.group.get(this.config.name) as FormArray).controls;
  }
}
