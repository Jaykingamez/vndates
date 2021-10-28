import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeProfileComponent } from './fake-profile.component';

describe('FakeProfileComponent', () => {
  let component: FakeProfileComponent;
  let fixture: ComponentFixture<FakeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
