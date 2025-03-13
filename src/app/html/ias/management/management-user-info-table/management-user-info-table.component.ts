import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../common/data-core/models/user/user.model';
import { Language } from '../../../../common/tools/language';
import { ManagementUserInfoTableBusiness } from './management-user-info-table.business';
import { ManagementUserInfoTableItem } from './management-user-info-table.model';

@Component({
  selector: 'ias-management-user-info-table',
  imports: [CommonModule],
  templateUrl: './management-user-info-table.component.html',
  styleUrl: './management-user-info-table.component.less',
  providers: [ManagementUserInfoTableBusiness],
})
export class ManagementUserInfoTableComponent implements OnInit {
  @Input('load') loadevent?: EventEmitter<void>;
  @Input() selecteds: User[] = [];
  @Output() selectedsChange = new EventEmitter<User[]>();
  @Output() modify = new EventEmitter<User>();
  constructor(private business: ManagementUserInfoTableBusiness) {}

  widths = [
    '65px',
    '60px',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    '100px',
  ];
  datas: ManagementUserInfoTableItem[] = [];
  Language = Language;

  ngOnInit(): void {
    this.load();
    if (this.loadevent) {
      this.loadevent.subscribe(() => {
        this.load();
      });
    }
  }

  private load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }

  select = {
    all: () => {
      if (this.selecteds.length === this.datas.length) {
        this.selecteds = [];
      } else {
        this.selecteds = [...this.datas];
      }
      this.selectedsChange.emit(this.selecteds);
    },
    item: (item: ManagementUserInfoTableItem) => {
      let index = this.selecteds.findIndex((x) => x === item);
      if (index >= 0) {
        this.selecteds.splice(index, 1);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    },
  };

  onmodify(item: ManagementUserInfoTableItem, e: Event) {
    this.modify.emit(item);

    if (this.selecteds.includes(item)) {
      e.stopPropagation();
    }
  }
}
