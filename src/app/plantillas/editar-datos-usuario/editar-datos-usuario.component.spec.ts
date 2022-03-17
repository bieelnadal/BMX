import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatosUsuarioComponent } from './editar-datos-usuario.component';

describe('EditarDatosUsuarioComponent', () => {
  let component: EditarDatosUsuarioComponent;
  let fixture: ComponentFixture<EditarDatosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDatosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
