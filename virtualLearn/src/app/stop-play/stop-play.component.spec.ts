import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPlayComponent } from './stop-play.component';

describe('StopPlayComponent', () => {
  let component: StopPlayComponent;
  let fixture: ComponentFixture<StopPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
