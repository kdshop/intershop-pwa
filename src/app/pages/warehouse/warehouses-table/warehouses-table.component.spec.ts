import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesTableComponent } from './warehouses-table.component';

describe('WarehouseTableComponent', () => {
  let component: WarehousesTableComponent;
  let fixture: ComponentFixture<WarehousesTableComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehousesTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesTableComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
