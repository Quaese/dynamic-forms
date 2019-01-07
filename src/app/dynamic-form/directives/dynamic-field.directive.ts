import { Directive, Input, ViewContainerRef, OnInit, ComponentRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from './../models/field.interface';
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
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  private component: ComponentRef<Field>;

  constructor(
    // resolves the component factories that Angular has created for each component
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    // if type is not defined in components object
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to us an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }

    // get the factory for the component
    const factory = this.componentFactoryResolver.resolveComponentFactory<Field>(components[this.config.type]);

    // create component by using ViewContainerRef to create the component
    this.component = this.viewContainerRef.createComponent(factory);
    // pass the needed properties to the component (using .instance property)
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
