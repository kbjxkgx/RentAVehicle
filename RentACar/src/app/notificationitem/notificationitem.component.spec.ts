import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationitemComponent } from './notificationitem.component';

describe('NotificationitemComponent', () => {
  let component: NotificationitemComponent;
  let fixture: ComponentFixture<NotificationitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
