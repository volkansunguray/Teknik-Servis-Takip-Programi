import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnasayfaComponent } from './anasayfa.component';

describe('AnasayfaComponent', () => {
  let component: AnasayfaComponent;
  let fixture: ComponentFixture<AnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnasayfaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
