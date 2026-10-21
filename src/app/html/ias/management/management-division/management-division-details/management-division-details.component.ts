import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArmDivisionType } from '../../../../../common/data-core/enums/division/divison-type.enum';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { SelectDivisionTreeComponent } from '../../../share/select/select-division-tree/select-division-tree.component';
import { ManagementDivisionBusiness } from '../business/management-division.business';
import { ManagementDivisionSource } from '../business/management-division.source';

@Component({
  selector: 'ias-management-division-details',
  imports: [CommonModule, FormsModule, SelectDivisionTreeComponent],
  templateUrl: './management-division-details.component.html',
  styleUrl: './management-division-details.component.less',
  providers: [ManagementDivisionBusiness, ManagementDivisionSource],
})
export class ManagementDivisionDetailsComponent implements OnInit, OnChanges {
  /** 要查看/编辑的区划，新增时是 manager 组装的新对象 */
  @Input('data') _source?: Division;
  @Input() parent?: Division;

  @Output() ok = new EventEmitter<Division>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public source: ManagementDivisionSource,
    private business: ManagementDivisionBusiness,
    private toastr: ToastrService,
  ) {}

  data = this.init();
  Language = Language;
  Type = ArmDivisionType;

  ngOnInit(): void {
    if (this._source) {
      this.data = Object.assign(this.data, this._source);
    } else if (this.parent) {
      this.data.DivisionType = this.parent.DivisionType + 1;
    } else {
    }

    console.log(this.data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.parent(changes['parent']);
  }

  private change = {
    parent: (change: SimpleChange) => {
      if (change) {
        if (this.parent) {
          this.data.DivisionType = this.parent.DivisionType + 1;
        }
      }
    },
  };

  private init() {
    let data = new Division();
    data.IsLeaf = true;
    data.DivisionType = ArmDivisionType.City;
    return data;
  }

  private get check() {
    if (!this.data.Name || !this.data.Name.trim()) {
      this.toastr.warning('请输入区划名称');
      return false;
    }
    return true;
  }

  on = {
    /** 区划类型跟随上级：上级类型 + 1，最高到网格 */
    type: (parent?: Division) => {
      if (!parent) return;
      let type = (parent.DivisionType ?? ArmDivisionType.Province) + 1;
      this.data.DivisionType = Math.min(
        type,
        ArmDivisionType.GridCell,
      ) as ArmDivisionType;
    },
    parent: (parent?: Division) => {
      this.parent = parent;
      this.data.ParentId = parent?.Id;
      if (parent) {
        this.on.type(parent);
      } else {
        /* 清空上级即为根节点下的区划 */
        this.data.DivisionType = ArmDivisionType.Province;
      }
    },
    ok: () => {
      if (!this.check) return;

      let promise: Promise<Division>;
      if (this.data.Id) {
        promise = this.business.update(this.data);
      } else {
        promise = this.business.create(this.data);
      }
      promise
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit(x);
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error('操作失败');
        });
    },

    cancel: () => {
      this.cancel.emit();
    },
  };
}
