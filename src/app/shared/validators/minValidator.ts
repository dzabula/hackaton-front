import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Sinhroni validator koji proverava da li je vrednost veća od 10
export function minValueValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || isNaN(value)) {
      return null; // Vrednost je nevalidna, ali to nije greška ovog validatora
    }
    
    if (value < minValue) {
      return { minValue: true }; // Greška ako je vrednost manja od minimuma
    }
    
    return null; // Nema greške
  };
}
