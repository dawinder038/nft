import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestFeatureComponent } from './suggest-feature.component';

describe('SuggestFeatureComponent', () => {
  let component: SuggestFeatureComponent;
  let fixture: ComponentFixture<SuggestFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
