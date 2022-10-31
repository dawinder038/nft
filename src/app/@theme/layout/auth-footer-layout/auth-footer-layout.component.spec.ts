import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFooterLayoutComponent } from './auth-footer-layout.component';

describe('AuthFooterLayoutComponent', () => {
  let component: AuthFooterLayoutComponent;
  let fixture: ComponentFixture<AuthFooterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFooterLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
