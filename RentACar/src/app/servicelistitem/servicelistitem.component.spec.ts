import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicelistitemComponent } from './servicelistitem.component';

describe('ServicelistitemComponent', () => {
  let component: ServicelistitemComponent;
  let fixture: ComponentFixture<ServicelistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicelistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicelistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
