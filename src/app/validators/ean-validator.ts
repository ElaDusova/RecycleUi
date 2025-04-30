import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validEAN13(control: AbstractControl): ValidationErrors | null {
  const ean = control.value;

  if (!/^\d{13}$/.test(ean)) return null; // neřešíme pattern, to dělá HTML

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(ean[i], 10);
    sum += (i % 2 === 0) ? digit : digit * 3;
  }

  const calculatedCheck = (10 - (sum % 10)) % 10;
  const actualCheck = parseInt(ean[12], 10);

  return calculatedCheck === actualCheck ? null : { invalidChecksum: true };
}
