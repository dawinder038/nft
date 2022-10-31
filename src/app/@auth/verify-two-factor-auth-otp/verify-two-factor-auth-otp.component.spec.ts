import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTwoFactorAuthOtpComponent } from './verify-two-factor-auth-otp.component';

describe('VerifyTwoFactorAuthOtpComponent', () => {
  let component: VerifyTwoFactorAuthOtpComponent;
  let fixture: ComponentFixture<VerifyTwoFactorAuthOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyTwoFactorAuthOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTwoFactorAuthOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
