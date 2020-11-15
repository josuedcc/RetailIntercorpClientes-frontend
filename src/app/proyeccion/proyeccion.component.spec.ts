import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyeccionComponent } from './proyeccion.component';

describe('ProyeccionComponent', () => {
  let component: ProyeccionComponent;
  let fixture: ComponentFixture<ProyeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
