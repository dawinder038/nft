import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftOwnedSuccessComponent } from './nft-owned-success.component';

describe('NftOwnedSuccessComponent', () => {
  let component: NftOwnedSuccessComponent;
  let fixture: ComponentFixture<NftOwnedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftOwnedSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftOwnedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
