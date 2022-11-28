import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisListeComponent } from './servis-liste.component';

describe('ServisListeComponent', () => {
  let component: ServisListeComponent;
  let fixture: ComponentFixture<ServisListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServisListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServisListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
