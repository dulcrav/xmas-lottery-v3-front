import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsWishesComponent } from './kids-wishes.component';

describe('KidsWishesComponent', () => {
  let component: KidsWishesComponent;
  let fixture: ComponentFixture<KidsWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsWishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
