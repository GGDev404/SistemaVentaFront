import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySuccesComponent } from './pay-succes.component';

describe('PaySuccesComponent', () => {
  let component: PaySuccesComponent;
  let fixture: ComponentFixture<PaySuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaySuccesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaySuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
