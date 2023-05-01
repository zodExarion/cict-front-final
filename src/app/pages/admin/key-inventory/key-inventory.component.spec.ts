import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInventoryComponent } from './key-inventory.component';

describe('KeyInventoryComponent', () => {
  let component: KeyInventoryComponent;
  let fixture: ComponentFixture<KeyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
