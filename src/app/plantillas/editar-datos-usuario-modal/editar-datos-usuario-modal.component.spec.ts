import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatosUsuarioModalComponent } from './editar-datos-usuario-modal.component';

describe('EditarDatosUsuarioModalComponent', () => {
  let component: EditarDatosUsuarioModalComponent;
  let fixture: ComponentFixture<EditarDatosUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDatosUsuarioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDatosUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
