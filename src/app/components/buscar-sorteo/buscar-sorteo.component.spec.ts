import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSorteoComponent } from './buscar-sorteo.component';

describe('BuscarSorteoComponent', () => {
  let component: BuscarSorteoComponent;
  let fixture: ComponentFixture<BuscarSorteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarSorteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarSorteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
