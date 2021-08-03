import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWarehousesComponent } from './our-warehouses.component';

describe('OurWarehousesComponent', () => {
  let component: OurWarehousesComponent;
  let fixture: ComponentFixture<OurWarehousesComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurWarehousesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurWarehousesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
