import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaSubastaComponent } from './plantilla-subasta.component';

describe('PlantillaSubastaComponent', () => {
  let component: PlantillaSubastaComponent;
  let fixture: ComponentFixture<PlantillaSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaSubastaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
