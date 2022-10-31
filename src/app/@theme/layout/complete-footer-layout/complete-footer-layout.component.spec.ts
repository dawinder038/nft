import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFooterLayoutComponent } from './complete-footer-layout.component';

describe('CompleteFooterLayoutComponent', () => {
  let component: CompleteFooterLayoutComponent;
  let fixture: ComponentFixture<CompleteFooterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteFooterLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteFooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
