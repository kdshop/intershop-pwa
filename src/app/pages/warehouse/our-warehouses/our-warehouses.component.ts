import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WarehouseFacade } from 'ish-core/facades/warehouse.facade';

@Component({
  selector: 'ish-our-warehouses',
  templateUrl: './our-warehouses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurWarehousesComponent {
  constructor(private warehouseFacade: WarehouseFacade) {}
  warehouses$ = this.warehouseFacade.ourWarehouses$;
}
