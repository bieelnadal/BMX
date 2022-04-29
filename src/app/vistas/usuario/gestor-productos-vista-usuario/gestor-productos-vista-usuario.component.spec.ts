/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestorProductosVistaUsuarioComponent } from './gestor-productos-vista-usuario.component';

describe('GestorProductosVistaUsuarioComponent', () => {
  let component: GestorProductosVistaUsuarioComponent;
  let fixture: ComponentFixture<GestorProductosVistaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorProductosVistaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorProductosVistaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
