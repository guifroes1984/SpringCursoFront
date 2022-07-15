import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCursosComponent } from './consultar-cursos.component';

describe('ConsultarCursosComponent', () => {
  let component: ConsultarCursosComponent;
  let fixture: ComponentFixture<ConsultarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
