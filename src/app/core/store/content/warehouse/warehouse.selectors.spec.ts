import { TestBed } from '@angular/core/testing';

import { CoreStoreModule } from 'ish-core/store/core/core-store.module';
import { StoreWithSnapshots, provideStoreSnapshots } from 'ish-core/utils/dev/ngrx-testing';

import { loadWarehouses } from './warehouse.actions';
import { getWarehouseLoading } from './warehouse.selectors';

describe('Warehouse Selectors', () => {
  let store$: StoreWithSnapshots;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreStoreModule.forTesting(['warehouse'])],
      providers: [provideStoreSnapshots()],
    });

    store$ = TestBed.inject(StoreWithSnapshots);
  });

  describe('initial state', () => {
    it('should not be loading when in initial state', () => {
      expect(getWarehouseLoading(store$.state)).toBeFalse();
    });
  });

  describe('loadWarehouse', () => {
    const action = loadWarehouses();

    beforeEach(() => {
      store$.dispatch(action);
    });

    it('should set loading to true', () => {
      expect(getWarehouseLoading(store$.state)).toBeTrue();
    });
  });
});
