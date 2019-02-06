import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-passwordconfirm',
  templateUrl: './form-passwordconfirm.component.html',
  styleUrls: ['./form-passwordconfirm.component.less']
})
export class FormPasswordconfirmComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  get groupControls() {
    return (this.group.controls[this.config.name] as FormGroup).controls;
  }
  get passwordGroup() {
    return this.group.get(this.config.name) as FormGroup;
  }

  ngOnInit() {
    // write subcontrol on this reference (e.g. this.password = AbstractControl)
    this.config.controls.forEach((subControl) => {
      this[subControl.name] = this.passwordGroup.get(subControl.name);
    });
  }
}
