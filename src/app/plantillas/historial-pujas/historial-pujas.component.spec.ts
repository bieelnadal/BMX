import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPujasComponent } from './historial-pujas.component';

describe('HistorialPujasComponent', () => {
  let component: HistorialPujasComponent;
  let fixture: ComponentFixture<HistorialPujasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPujasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPujasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
