import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OurWarehousesComponent } from './our-warehouses/our-warehouses.component';
import { WarehousesTableComponent } from './warehouses-table/warehouses-table.component';

const routes: Routes = [
  {
    path: '',
    component: OurWarehousesComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [OurWarehousesComponent, WarehousesTableComponent],
})
export class WarehouseModule {}
