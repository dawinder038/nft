import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturenewsComponent } from './featurenews.component';

describe('FeaturenewsComponent', () => {
  let component: FeaturenewsComponent;
  let fixture: ComponentFixture<FeaturenewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturenewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
