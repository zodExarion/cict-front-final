import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerKeyInventoryComponent } from './checker-key-inventory.component';

describe('CheckerKeyInventoryComponent', () => {
  let component: CheckerKeyInventoryComponent;
  let fixture: ComponentFixture<CheckerKeyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerKeyInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckerKeyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
