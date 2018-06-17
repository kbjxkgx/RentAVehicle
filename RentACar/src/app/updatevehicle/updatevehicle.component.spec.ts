import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevehicleComponent } from './updatevehicle.component';

describe('UpdatevehicleComponent', () => {
  let component: UpdatevehicleComponent;
  let fixture: ComponentFixture<UpdatevehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatevehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatevehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
