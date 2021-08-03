import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';

@Component({
  selector: 'ish-warehouse-table',
  templateUrl: './warehouses-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehousesTableComponent {
  @Input() warehouses!: Warehouse[];

  // I can't omit parameter
  // @ts-ignore
  // tslint:disable-next-line: no-unused
  trackByKey(index: number, wh: Warehouse) {
    return wh.id;
  }
}
