import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetimPanelComponent } from './yonetim-panel.component';

describe('YonetimPanelComponent', () => {
  let component: YonetimPanelComponent;
  let fixture: ComponentFixture<YonetimPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetimPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetimPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
