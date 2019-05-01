import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedRidesComponent } from './offered-rides.component';

describe('OfferedRidesComponent', () => {
  let component: OfferedRidesComponent;
  let fixture: ComponentFixture<OfferedRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
