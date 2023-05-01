import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyHistoryComponent } from './key-history.component';

describe('KeyHistoryComponent', () => {
  let component: KeyHistoryComponent;
  let fixture: ComponentFixture<KeyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
