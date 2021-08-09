import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ApiService, unpackEnvelope } from 'ish-core/services/api/api.service';
import { Warehouse } from 'ish-core/models/warehouse/warehouse.model';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  constructor(private apiService: ApiService) {}

  getWarehouse(): Observable<Warehouse[]> {
    return this.apiService.get('our-warehouses').pipe(unpackEnvelope<Warehouse>('data'), first());
  }
}
