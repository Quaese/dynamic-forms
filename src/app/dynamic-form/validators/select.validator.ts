import { AbstractControl, ValidatorFn } from "@angular/forms";

// wrapper to hand over arguments to validator function
// @defaultSelected: default value that cannot be selected as valid option
export function selectValidator(defaulSelected?: string): ValidatorFn{

  // returns the validator function
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = control.value !== (defaulSelected || '0');

    // return null for valid values, an error object otherwise
    return valid ? null : { defaulSelected: { valid: false, value: control.value }};
  }
}
