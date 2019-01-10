import { ValidatorFn } from "@angular/forms";


export interface FieldConfig {
    name: string;
    type: string;

    controls?: FieldConfig[],
    disabled?: boolean;
    label?: string;
    options?: string[];
    placeholder?: string;
    validation?: ValidatorFn[];
    value?: any;
}
