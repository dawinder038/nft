import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModalsComponent } from './home-modals.component';

describe('HomeModalsComponent', () => {
  let component: HomeModalsComponent;
  let fixture: ComponentFixture<HomeModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
