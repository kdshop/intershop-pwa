import { createReducer, on } from '@ngrx/store';
import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';

import { setLoadingOn } from 'ish-core/utils/ngrx-creators';

import { loadWarehouses, loadWarehouseSuccess } from './warehouse.actions';

export interface WarehouseState {
  warehouses: Warehouse[];
}

const initialState: WarehouseState = {
  warehouses: [],
};

export const warehouseReducer = createReducer(
  initialState,
  on(loadWarehouseSuccess, (state, { payload: { warehouses } }) => ({ ...state, warehouses })),
  setLoadingOn(loadWarehouses)
);
