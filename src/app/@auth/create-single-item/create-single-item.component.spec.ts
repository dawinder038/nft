import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleItemComponent } from './create-single-item.component';

describe('CreateSingleItemComponent', () => {
  let component: CreateSingleItemComponent;
  let fixture: ComponentFixture<CreateSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSingleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
