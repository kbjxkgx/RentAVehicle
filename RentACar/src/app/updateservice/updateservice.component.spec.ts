import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateserviceComponent } from './updateservice.component';

describe('UpdateserviceComponent', () => {
  let component: UpdateserviceComponent;
  let fixture: ComponentFixture<UpdateserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
