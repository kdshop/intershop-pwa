import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';

import { loadWarehouses, loadWarehouseFail, loadWarehouseSuccess } from './warehouse.actions';
import { WarehouseService } from 'ish-core/services/warehouse/warehouse.service';
import { mapErrorToAction } from 'ish-core/utils/operators';
import { getWarehousesLoaded } from 'ish-core/store/content/warehouse/warehouse.selectors';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';

@Injectable()
export class WarehouseEffects {
  constructor(private actions$: Actions, private warehouseService: WarehouseService, private store: Store) {}

  loadWarehouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWarehouses),
      withLatestFrom(this.store.select(getWarehousesLoaded)),
      concatMap(([, loaded]) =>
        loaded
          ? EMPTY
          : this.warehouseService.getWarehouse().pipe(map(warehouses => loadWarehouseSuccess({ warehouses })))
      ),
      mapErrorToAction(loadWarehouseFail)
    )
  );
}
