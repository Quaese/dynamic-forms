import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../../models/field-config.interface';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent {
  config: FieldConfig;
  group: FormGroup;

  constructor() { }
}
