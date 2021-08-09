import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { WarehouseFacade } from 'ish-core/facades/warehouse.facade';

@Component({
  selector: 'ish-our-warehouses',
  templateUrl: './our-warehouses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurWarehousesComponent implements OnInit {
  warehouses$ = this.warehouseFacade.ourWarehouses$;

  constructor(private warehouseFacade: WarehouseFacade) {}

  ngOnInit(): void {
    this.warehouseFacade.loadWarehouses();
  }
}
