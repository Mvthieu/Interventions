import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { VerifierMaxCaracteresValidator } from '../shared/longueur-maximum/longueur-maximum.component';
import { ITypeProbleme } from './probleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private typeproblemeService: TypeproblemeService
  ) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: [
        '',
        [
          VerifierCaracteresValidator.longueurMinimum(1),
          VerifierMaxCaracteresValidator.longueurMaximum(50),
          Validators.required,
        ],
      ],
      noProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }
  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielConfirmationControl = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    telephoneControl.clearValidators();
    telephoneControl.reset('');
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    if (typeNotification === 'ParTelephone') {
      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();
    }
    if (typeNotification === 'ParCourriel') {
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();
    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
  save(): void {}
}
