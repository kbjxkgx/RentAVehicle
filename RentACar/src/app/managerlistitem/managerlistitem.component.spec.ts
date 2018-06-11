import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerlistitemComponent } from './managerlistitem.component';

describe('ManagerlistitemComponent', () => {
  let component: ManagerlistitemComponent;
  let fixture: ComponentFixture<ManagerlistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerlistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
