import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInventoryBoardComponent } from './key-inventory-board.component';

describe('KeyInventoryBoardComponent', () => {
  let component: KeyInventoryBoardComponent;
  let fixture: ComponentFixture<KeyInventoryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyInventoryBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyInventoryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
