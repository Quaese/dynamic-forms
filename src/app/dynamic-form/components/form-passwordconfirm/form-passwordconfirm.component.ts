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

  passwordGroup: FormGroup;

  constructor() {
  }

  get pwGroup() {
    return (this.group.controls[this.config.name] as FormGroup).controls;
  }

  ngOnInit() {
    console.log('pwGroup: ', this.pwGroup);
    this.passwordGroup = this.group.get(this.config.name) as FormGroup;

    this.config.controls.forEach((subControl) => {
      this[subControl.name] = this.passwordGroup.get(subControl.name);
    });

    // console.log('form-confirmation.ts: ', this.passwordGroup.controls);
    // const str = 'test';
    // this[str] = 'hoalla';
    // console.log('....', this.password);
  }
}
