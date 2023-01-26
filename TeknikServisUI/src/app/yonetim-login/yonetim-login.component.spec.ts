import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetimLoginComponent } from './yonetim-login.component';

describe('YonetimLoginComponent', () => {
  let component: YonetimLoginComponent;
  let fixture: ComponentFixture<YonetimLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetimLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetimLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
