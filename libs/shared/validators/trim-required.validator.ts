import { FormControl } from '@angular/forms';

export function trimRequiredValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { trimRequired: true };
}
