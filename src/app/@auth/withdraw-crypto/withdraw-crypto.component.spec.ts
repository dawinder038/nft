import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCryptoComponent } from './withdraw-crypto.component';

describe('WithdrawCryptoComponent', () => {
  let component: WithdrawCryptoComponent;
  let fixture: ComponentFixture<WithdrawCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
