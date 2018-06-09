import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlistitemComponent } from './carlistitem.component';

describe('CarlistitemComponent', () => {
  let component: CarlistitemComponent;
  let fixture: ComponentFixture<CarlistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarlistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
