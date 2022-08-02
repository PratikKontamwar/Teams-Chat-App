import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderBarComponent } from './app-header-bar.component';

describe('AppHeaderBarComponent', () => {
  let component: AppHeaderBarComponent;
  let fixture: ComponentFixture<AppHeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
