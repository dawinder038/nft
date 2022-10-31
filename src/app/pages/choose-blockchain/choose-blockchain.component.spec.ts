import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBlockchainComponent } from './choose-blockchain.component';

describe('ChooseBlockchainComponent', () => {
  let component: ChooseBlockchainComponent;
  let fixture: ComponentFixture<ChooseBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBlockchainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
