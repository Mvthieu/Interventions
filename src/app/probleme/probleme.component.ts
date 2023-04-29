import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { VerifierMaxCaracteresValidator } from '../shared/longueur-maximum/longueur-maximum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  probleme: IProbleme;
  constructor(
    private fb: FormBuilder,
    private typeproblemeService: TypeproblemeService,
    private problemeService: ProblemeService,
    private route: Router
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
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
      notification: ['pasnotification'],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: [''],
      dateProbleme: [{value: Date(), disabled: true}]
    });

    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value));
  }
  appliquerNotifications(typeNotification: string): void {
    
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielConfirmationControl = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    telephoneControl.clearValidators();
    telephoneControl.reset('');
    telephoneControl.disable();

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();
    courrielGroupControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    
    if (typeNotification === 'messageTexte') {
      telephoneControl.setValidators([
        Validators.required,
        Validators.pattern('\\d{10}'),
      ]);
      telephoneControl.enable();
    }
    if (typeNotification === 'courriel') {
      courrielConfirmationControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);
      
      courrielConfirmationControl.enable();
      courrielControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);
      
      courrielControl.enable();
      courrielGroupControl.setValidators(
        Validators.compose([emailMatcherValidator.courrielDifferents])
      );
      
      courrielGroupControl.enable();
    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        // Courriel est dans un groupe alors que this.probleme n'a pas de groupe.  Il faut le transférer explicitement.
         if(this.problemeForm.get('courrielGroup.courriel').value != '')
        {
          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        }
        this.problemeService.saveProbleme(this.probleme)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
          })
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }
}