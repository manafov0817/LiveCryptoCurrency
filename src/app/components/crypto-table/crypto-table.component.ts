import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CryptoTableService } from '../../services/crypto-table/crypto-table.service';
import { CommonModule } from '@angular/common';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableEvent } from '../../models/TableEvent.model';
import { CryptoTableOptions } from '../../utils/CryptoTableOptions';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [AsyncPipe, TableModule, CommonModule, DropdownModule, FormsModule],  
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
})
export class CryptoTableComponent {
  readonly cryptoTableOptions = new CryptoTableOptions();
  tableEvent = new TableEvent('USD', 0, 5);

  constructor(private cryptoTableService: CryptoTableService) {
    this.cryptoTableService.setProductIds(this.tableEvent);
  }

  prices$ = this.cryptoTableService.priceTicker$;

  loadData(event: TableLazyLoadEvent) {
    this.tableEvent.skip = event.first != undefined ? event.first : 0;
    this.tableEvent.take = event.rows != undefined ? event.rows : 0;
    this.cryptoTableService.setProductIds(this.tableEvent);
  }

  currencyChanged(event: DropdownChangeEvent): void {
    this.tableEvent.currency = event.value;
    this.cryptoTableService.setProductIds(this.tableEvent);
  }
}
