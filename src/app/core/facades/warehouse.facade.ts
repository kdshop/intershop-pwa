import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { NavigationCategory } from 'ish-core/models/navigation-category/navigation-category.model';
import { WAREHOUSE_PATH } from 'ish-core/routing/warehouse/warehouse.route';
import { getWarehouses, loadWarehouses } from 'ish-core/store/content/warehouse';

@Injectable({ providedIn: 'root' })
export class WarehouseFacade {
  ourWarehouses$ = this.store.pipe(select(getWarehouses));

  constructor(private store: Store) {}

  static navigationWarehouse(): Observable<NavigationCategory> {
    return of({
      uniqueId: WAREHOUSE_PATH,
      name: 'WAREHOUSES',
      url: WAREHOUSE_PATH,
      hasChildren: false,
    });
  }

  loadWarehouses(): void {
    this.store.dispatch(loadWarehouses());
  }
}
