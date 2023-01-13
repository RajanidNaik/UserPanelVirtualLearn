import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTestComponent } from './cancel-test.component';

describe('CancelTestComponent', () => {
  let component: CancelTestComponent;
  let fixture: ComponentFixture<CancelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
