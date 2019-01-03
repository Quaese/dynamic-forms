import { Directive, Input, ViewContainerRef, OnInit, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from './../models/field-config.interface';

import { FormSelectComponent } from './../components/form-select/form-select.component';
import { FormInputComponent } from './../components/form-input/form-input.component';
import { FormButtonComponent } from './../components/form-button/form-button.component';

// map components to form field types
const components = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent
};

@Directive({
  // attribute directive (structural directive)
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  private component: ComponentRef<any>;

  constructor(
    // resolves the component factories that Angular has created for each component
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const component = components[this.config.type];
    // get the factory for the component
    const factory = this.componentFactoryResolver.resolveComponentFactory<any>(component);

    // create component by using ViewContainerRef to create the component
    this.component = this.viewContainerRef.createComponent(factory);
    // pass the needed properties to the component (using .instance property)
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
