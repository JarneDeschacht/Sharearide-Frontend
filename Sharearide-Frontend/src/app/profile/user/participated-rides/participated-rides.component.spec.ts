import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedRidesComponent } from './participated-rides.component';

describe('ParticipatedRidesComponent', () => {
  let component: ParticipatedRidesComponent;
  let fixture: ComponentFixture<ParticipatedRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatedRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
