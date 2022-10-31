import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterSignupComponent } from './creater-signup.component';

describe('CreaterSignupComponent', () => {
  let component: CreaterSignupComponent;
  let fixture: ComponentFixture<CreaterSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaterSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
