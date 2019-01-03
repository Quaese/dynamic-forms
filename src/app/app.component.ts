import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { DynamicFormComponent } from './dynamic-form/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  title = 'dynamic-forms';

  config = [
    {
      type: 'input',
      name: 'name',
      label: 'Full name',
      placeholder: 'Enter your name'
    },
    {
      type: 'select',
      name: 'nick',
      label: 'Favorite nick name',
      options: ['Hoasd', 'Hans Wuasd', 'Werner Winzig'],
      placeholder: 'Enter an option'
    },
    {
      type: 'button',
      name: 'submit',
      label: 'Submit'
    }
  ];

  ngAfterViewInit() {
    console.log('AfterViewInit (app.component): ', this.form.valid);
  }

  hSubmit(formValues) {
    console.log(formValues);
  }
}
