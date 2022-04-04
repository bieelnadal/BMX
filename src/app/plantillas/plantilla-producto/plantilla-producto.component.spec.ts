import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaProductoComponent } from './plantilla-producto.component';

describe('PlantillaProductoComponent', () => {
  let component: PlantillaProductoComponent;
  let fixture: ComponentFixture<PlantillaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
