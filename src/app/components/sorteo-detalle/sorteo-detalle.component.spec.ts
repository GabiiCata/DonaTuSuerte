import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoDetalleComponent } from './sorteo-detalle.component';

describe('SorteoDetalleComponent', () => {
  let component: SorteoDetalleComponent;
  let fixture: ComponentFixture<SorteoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
