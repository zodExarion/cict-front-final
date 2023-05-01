import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCheckerComponent } from './layout-checker.component';

describe('LayoutCheckerComponent', () => {
  let component: LayoutCheckerComponent;
  let fixture: ComponentFixture<LayoutCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
