import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDireccionModalComponent } from './editar-direccion-modal.component';

describe('EditarDireccionModalComponent', () => {
  let component: EditarDireccionModalComponent;
  let fixture: ComponentFixture<EditarDireccionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDireccionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDireccionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
