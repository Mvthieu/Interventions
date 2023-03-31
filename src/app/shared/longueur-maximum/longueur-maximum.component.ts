import { AbstractControl, ValidatorFn } from "@angular/forms";

export class VerifierMaxCaracteresValidator {

    static longueurMaximum(max: number): ValidatorFn {
        return (valeurZone: AbstractControl): { [key: string]: boolean } | null => {
            // Vérifier s'il y a une valeur et si oui sa longueur est égale ou supérieure à min
             if (valeurZone.value && valeurZone.value.trim().length <= max) {
                return null;  // succès.  Tout est valide.
            }
            return { 'nbreCaracteresNonConforme': true }; // erreur.  Valeur nulle ou longueur non conforme        
        };
    }
}