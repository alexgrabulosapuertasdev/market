import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    CardModule,
    StyleClassModule,
    TableModule,
  ],
})
export class PrimengModule {}
