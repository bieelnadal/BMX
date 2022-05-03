import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVentasAdminComponent } from './historial-ventas-admin.component';

describe('HistorialVentasAdminComponent', () => {
  let component: HistorialVentasAdminComponent;
  let fixture: ComponentFixture<HistorialVentasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialVentasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialVentasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
