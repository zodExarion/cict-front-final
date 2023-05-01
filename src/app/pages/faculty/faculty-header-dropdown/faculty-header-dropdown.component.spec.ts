import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyHeaderDropdownComponent } from './faculty-header-dropdown.component';

describe('FacultyHeaderDropdownComponent', () => {
  let component: FacultyHeaderDropdownComponent;
  let fixture: ComponentFixture<FacultyHeaderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyHeaderDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyHeaderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
