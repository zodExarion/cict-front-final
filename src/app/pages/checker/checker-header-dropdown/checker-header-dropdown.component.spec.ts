import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerHeaderDropdownComponent } from './checker-header-dropdown.component';

describe('CheckerHeaderDropdownComponent', () => {
  let component: CheckerHeaderDropdownComponent;
  let fixture: ComponentFixture<CheckerHeaderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerHeaderDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckerHeaderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
