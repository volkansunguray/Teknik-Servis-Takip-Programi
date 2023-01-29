import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetimKayitComponent } from './yonetim-kayit.component';

describe('YonetimKayitComponent', () => {
  let component: YonetimKayitComponent;
  let fixture: ComponentFixture<YonetimKayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetimKayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetimKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
