import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectibleItemComponent } from './create-collectible-item.component';

describe('CreateCollectibleItemComponent', () => {
  let component: CreateCollectibleItemComponent;
  let fixture: ComponentFixture<CreateCollectibleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCollectibleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollectibleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
