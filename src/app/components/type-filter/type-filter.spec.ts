import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFilter } from './type-filter';

describe('TypeFilter', () => {
  let component: TypeFilter;
  let fixture: ComponentFixture<TypeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
