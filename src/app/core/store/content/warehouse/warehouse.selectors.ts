import { createSelector } from '@ngrx/store';

import { getContentState } from 'ish-core/store/content/content-store';

const getWarehouseState = createSelector(getContentState, state => state.warehouse);

export const getWarehouses = createSelector(getWarehouseState, state => state.warehouses);

export const getWarehousesLoaded = createSelector(getWarehouseState, state => Boolean(state.warehouses.length));
