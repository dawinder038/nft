import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftingCustomerComponent } from './gifting-customer.component';

describe('GiftingCustomerComponent', () => {
  let component: GiftingCustomerComponent;
  let fixture: ComponentFixture<GiftingCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiftingCustomerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
