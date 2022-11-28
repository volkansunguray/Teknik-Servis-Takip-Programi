import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisKayitComponent } from './servis-kayit.component';

describe('ServisKayitComponent', () => {
  let component: ServisKayitComponent;
  let fixture: ComponentFixture<ServisKayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServisKayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServisKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
