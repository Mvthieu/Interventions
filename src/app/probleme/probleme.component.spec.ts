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
});
