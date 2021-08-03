import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { NavigationCategory } from 'ish-core/models/navigation-category/navigation-category.model';
import { WAREHOUSE_PATH } from 'ish-core/routing/warehouse/warehouse.route';
import { ApiService, unpackEnvelope } from 'ish-core/services/api/api.service';
import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseFacade {
  ourWarehouses$ = new ReplaySubject<Warehouse[]>(1);

  constructor(private apiService: ApiService) {
    // This could be easy changed to store implementation if module ever grew.
    this.apiService
      .get('our-warehouses')
      .pipe(unpackEnvelope<Warehouse>('data'), first())
      .subscribe(this.ourWarehouses$);
  }

  static navigationWarehouse(): Observable<NavigationCategory> {
    return of({
      uniqueId: WAREHOUSE_PATH,
      name: 'WAREHOUSES',
      url: WAREHOUSE_PATH,
      hasChildren: false,
    });
  }
}
