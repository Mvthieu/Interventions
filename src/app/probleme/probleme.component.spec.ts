import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

 describe('ProblemeComponent', () => {
   let component: ProblemeComponent;
   let fixture: ComponentFixture<ProblemeComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
     })
     .compileComponents();

     fixture = TestBed.createComponent(ProblemeComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  it('champ prenom invalide avec 2 caractères', ()=> {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(2));
    let errors = prenom.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('champ prenom valide avec 3 caractères', ()=> {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(3));
    let errors = prenom.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('champ prenom valide avec 200 caractères', ()=> {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('a'.repeat(200));
    let errors = prenom.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it('champ prenom invalide avec aucune valeur', ()=> {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue('');
    let errors = prenom.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('champ prenom valide avec 10 espaces', ()=> {
    let prenom = component.problemeForm.get('prenom');
    prenom.setValue(' '.repeat(10));
    let errors = prenom.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
});
