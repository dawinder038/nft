import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCryptoComponent } from './deposit-crypto.component';

describe('DepositCryptoComponent', () => {
  let component: DepositCryptoComponent;
  let fixture: ComponentFixture<DepositCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
