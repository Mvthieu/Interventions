import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';
import { EMPTY } from 'rxjs';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [TypeproblemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 champ prenom invalide avec 2 caractères', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(2));
    let errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
  });
  it('#2 champ prenom valide avec 3 caractères', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(3));
    let errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeFalsy();
  });
  it('#3 champ prenom valide avec 200 caractères', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(200));
    let errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeFalsy();
  });
  it('#4 champ prenom invalide avec aucune valeur', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('');
    let errors = prenom.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#5 champ prenom invalide avec 10 espaces', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue(' '.repeat(10));
    let errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
  });
  it('#6 champ prenom invalide avec 2 espaces et 1 caractères', () => {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue(' '.repeat(2) + 'a');
    let errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTruthy();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual('');
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('AucuneNotification');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTruthy();
  });
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTruthy();
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeFalsy();
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeFalsy();
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('pasuncourriel');
    let errors =  zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    zoneCourriel.setValue('');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourrielConfirmation.setValue('unCourriel@gmail.com')
    let courrielGroup =component.problemeForm.get('courrielGroup');
    expect(courrielGroup.invalid).toBeTrue();
  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    zoneCourriel.setValue('unCourriel@gmail.com');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourrielConfirmation.setValue('')
    let courrielGroup =component.problemeForm.get('courrielGroup');
    expect(courrielGroup.invalid).toBeTrue();
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    zoneCourriel.setValue('unCourriel@gmail.com');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourrielConfirmation.setValue('unAutre@gmail.com')
    let courrielGroup =component.problemeForm.get('courrielGroup');
    expect(courrielGroup.invalid).toBeTrue();
  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    zoneCourriel.setValue('uncourriel@gmail.com');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourrielConfirmation.setValue('uncourriel@gmail.com');
    let courrielGroup =component.problemeForm.get('courrielGroup');
    expect(courrielGroup.valid).toBeTrue();
  });
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    expect(zoneTelephone.enabled).toBeTrue();
  });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    expect(zoneCourriel.disabled).toBeTrue();
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zoneCourrielConfirmation.disabled).toBeTrue();
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    zoneTelephone.setValue("");
    expect(zoneTelephone.invalid).toBeTrue();
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    zoneTelephone.setValue("caracteres");
    expect(zoneTelephone.invalid).toBeTrue();
  });
  it('34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    zoneTelephone.setValue("1".repeat(9));
    expect(zoneTelephone.invalid).toBeTrue();
  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    zoneTelephone.setValue("1".repeat(11));
    expect(zoneTelephone.invalid).toBeTrue();
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zoneTelephone = component.problemeForm.get('telephone');
    zoneTelephone.setValue("1".repeat(10));
    expect(zoneTelephone.valid).toBeTrue();
  });
});
