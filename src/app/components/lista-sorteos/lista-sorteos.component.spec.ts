import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSorteosComponent } from './lista-sorteos.component';

describe('ListaSorteosComponent', () => {
  let component: ListaSorteosComponent;
  let fixture: ComponentFixture<ListaSorteosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSorteosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSorteosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
