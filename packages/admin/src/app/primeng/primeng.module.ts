import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    CardModule,
    TableModule,
  ],
})
export class PrimengModule {}
