import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideSmallComponent } from './ride-small.component';

describe('RideSmallComponent', () => {
  let component: RideSmallComponent;
  let fixture: ComponentFixture<RideSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
