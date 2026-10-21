import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { ManagementUserGroupTableBusiness } from './management-user-group-table.business';
import { ManagementUserGroupTableItem } from './management-user-group-table.model';

@Component({
  selector: 'ias-management-user-group-table',
  imports: [CommonModule],
  templateUrl: './management-user-group-table.component.html',
  styleUrl: './management-user-group-table.component.less',
  providers: [ManagementUserGroupTableBusiness],
})
export class ManagementUserGroupTableComponent implements OnInit {
  @Input('load') loadevent?: EventEmitter<void>;
  @Input() selecteds: UserGroup[] = [];
  @Output() selectedsChange = new EventEmitter<UserGroup[]>();
  @Output() modify = new EventEmitter<UserGroup>();
  constructor(private business: ManagementUserGroupTableBusiness) {}

  widths = ['65px', '60px', '20%', 'auto', '100px'];
  datas: ManagementUserGroupTableItem[] = [];

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
    item: (item: ManagementUserGroupTableItem) => {
      let index = this.selecteds.findIndex((x) => x === item);
      if (index >= 0) {
        this.selecteds.splice(index, 1);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    },
  };

  onmodify(item: ManagementUserGroupTableItem, e: Event) {
    this.modify.emit(item);

    this.selecteds = [item];
    this.selectedsChange.emit(this.selecteds);

    if (this.selecteds.includes(item)) {
      e.stopPropagation();
    }
  }
}
