import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-inputgroup',
  templateUrl: './form-inputgroup.component.html',
  styleUrls: ['./form-inputgroup.component.less']
})
export class FormInputgroupComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}

  get groupControls() {
    return (<FormGroup>this.group.controls[this.config.name]).controls;
  }
  get formGroup() {
    return <FormGroup>this.group.get(this.config.name);
  }

  ngOnInit() {
    // write subcontrol on this reference (e.g. this.password = AbstractControl)
    this.config.controls.forEach((subControl) => {
      this[subControl.name] = this.formGroup.get(subControl.name);
    });
  }
}
