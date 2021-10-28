import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealProfileComponent } from './real-profile.component';

describe('RealProfileComponent', () => {
  let component: RealProfileComponent;
  let fixture: ComponentFixture<RealProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
