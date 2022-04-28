/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestorVentasComponent } from './gestor-ventas.component';

describe('GestorVentasComponent', () => {
  let component: GestorVentasComponent;
  let fixture: ComponentFixture<GestorVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
