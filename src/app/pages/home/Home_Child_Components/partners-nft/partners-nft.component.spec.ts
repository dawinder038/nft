import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersNftComponent } from './partners-nft.component';

describe('PartnersNftComponent', () => {
  let component: PartnersNftComponent;
  let fixture: ComponentFixture<PartnersNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
