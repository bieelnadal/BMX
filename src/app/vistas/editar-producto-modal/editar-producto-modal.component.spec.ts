import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoModalComponent } from './editar-producto-modal.component';

describe('EditarProductoModalComponent', () => {
  let component: EditarProductoModalComponent;
  let fixture: ComponentFixture<EditarProductoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProductoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
