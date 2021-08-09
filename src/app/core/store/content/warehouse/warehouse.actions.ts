import { createAction } from '@ngrx/store';

import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';
import { httpError, payload } from 'ish-core/utils/ngrx-creators';

export const loadWarehouses = createAction('[Warehouse] Load Warehouse');

export const loadWarehouseFail = createAction('[Warehouse] Load Entrypoint Fail', httpError());

export const loadWarehouseSuccess = createAction(
  '[Warehouse] Load Warehouse Success',
  payload<{ warehouses: Warehouse[] }>()
);
