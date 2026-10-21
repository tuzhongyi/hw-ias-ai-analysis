import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadControlComponent } from '../../../../../common/components/upload-control/upload-control.component';
import {
  FileReadType,
  UploadControlFile,
} from '../../../../../common/components/upload-control/upload-control.model';
import { WindowConfirmComponent } from '../../../../../common/components/window-confirm/window-confirm.component';
import { Division } from '../../../../../common/data-core/models/arm/division/division.model';
import { WindowComponent } from '../../../share/window/component/window.component';
import { ManagementDivisionBusiness } from '../business/management-division.business';
import { ManagementDivisionTableArgs } from '../business/management-division.model';
import { ManagementDivisionSource } from '../business/management-division.source';
import { ManagementDivisionDetailsComponent } from '../management-division-details/management-division-details.component';
import { ManagementDivisionTableComponent } from '../management-division-table/management-division-table.component';
import { ManagementDivisionManagerWindow } from './management-division-manager.window';

@Component({
  selector: 'ias-management-division-manager',
  imports: [
    CommonModule,
    FormsModule,
    WindowComponent,
    WindowConfirmComponent,
    UploadControlComponent,
    ManagementDivisionTableComponent,
    ManagementDivisionDetailsComponent,
  ],
  templateUrl: './management-division-manager.component.html',
  styleUrl: './management-division-manager.component.less',
  providers: [ManagementDivisionBusiness, ManagementDivisionSource],
})
export class ManagementDivisionManagerComponent {
  constructor(
    public source: ManagementDivisionSource,
    private business: ManagementDivisionBusiness,
    private toastr: ToastrService,
  ) {}
  window = new ManagementDivisionManagerWindow();

  table = {
    /** 勾选的区划，进入文件夹 / 查找 / 刷新时清空 */
    selecteds: [] as Division[],
    /** 查询条件，由查找 / 导航 / 刷新触发加载 */
    args: {} as ManagementDivisionTableArgs,
    load: new EventEmitter<ManagementDivisionTableArgs>(),

    on: {
      search: () => {
        this.table.selecteds = [];
        let name = this.table.args.name?.trim() ?? '';
        this.table.args.name = name || undefined;
        this.search.active = !!name;
        this.table.load.emit(this.table.args);
      },
      open: (data: Division) => {
        this.path.on.navigate(data);
      },
      details: (data: Division) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };

  /** 搜索状态，路径栏显示为“当前节点”中的搜索结果 */
  search = {
    active: false,
  };

  /* ---------- 目录导航 ---------- */

  path = {
    /** 进入过的路径快照，供返回使用 */
    history: [] as { folder?: Division; nodes: Division[] }[],
    /** 当前文件夹，空表示根目录 */
    folder: undefined as Division | undefined,
    /** 根目录到当前文件夹的完整路径，随导航维护，不再反查全量数据 */
    nodes: [] as Division[],
    on: {
      back: () => {
        if (this.search.active) {
          this.manager.exitSearch();
          return;
        }
        let previous = this.path.history.pop();
        if (!previous) return;
        this.manager.setFolder(previous.folder, previous.nodes);
      },

      up: () => {
        if (this.search.active) {
          this.manager.exitSearch();
          return;
        }
        if (!this.path.folder) return;
        if (this.path.nodes.length > 1) {
          this.path.on.navigate(this.path.nodes[this.path.nodes.length - 2]);
        } else {
          this.path.on.navigate(undefined);
        }
      },
      root: () => {
        this.path.on.navigate(undefined);
      },
      folder: (node: Division) => {
        this.path.on.navigate(node);
      },
      navigate: (folder?: Division) => {
        let same =
          (folder?.Id || undefined) === (this.path.folder?.Id || undefined);
        if (same && !this.search.active) return;

        if (this.search.active) {
          this.manager.clearSearch();
        }
        if (!same) {
          this.path.history.push({
            folder: this.path.folder,
            nodes: this.path.nodes,
          });
        }

        /* 路径上的节点直接截断；表格里打开的是当前文件夹的下级，追加到末尾 */
        let index = folder
          ? this.path.nodes.findIndex((x) => x.Id === folder.Id)
          : -1;
        let nodes: Division[];
        if (!folder) {
          nodes = [];
        } else if (index >= 0) {
          nodes = this.path.nodes.slice(0, index + 1);
        } else {
          nodes = [...this.path.nodes, folder];
        }
        this.manager.setFolder(folder, nodes);
      },
    },
  };

  file = {
    upload: {
      accept: '*.*',
      type: FileReadType.ArrayBuffer,
      name: '导入',
      loading: false,
      do: (file: UploadControlFile) => {
        this.toastr.success('开始上传文件，请稍候...');
        this.file.upload.loading = true;
        this.business
          .upload(file.data as ArrayBuffer, (value: number) => {
            this.file.upload.name = `${value.toFixed(0)}%`;
          })
          .then(() => {
            this.toastr.success('上传成功');
            this.manager.reload();
          })
          .catch((error) => {
            console.error(error);
            this.toastr.error('上传失败');
          })
          .finally(() => {
            this.file.upload.loading = false;
            this.file.upload.name = '导入';
          });
      },
    },
  };

  manager = {
    on: {
      add: () => {
        this.window.details.data = undefined;
        this.window.details.show = true;
      },
    },
    details: {
      change: () => {
        this.manager.reload();
        this.window.details.show = false;
      },
    },
    remove: {
      confirm: {
        open: () => {
          if (this.table.selecteds.length === 0) return;
          this.window.confirm.data = [...this.table.selecteds];
          this.window.confirm.show = true;
        },
        ok: () => {
          let datas = this.window.confirm.data;
          if (!datas || datas.length === 0) return;

          this.business.delete(datas).then((count) => {
            if (count === datas.length) {
              this.toastr.success('操作成功');
            } else {
              this.toastr.error('部分区划删除失败');
            }
            this.window.confirm.show = false;
            this.table.selecteds = [];
            this.manager.reload();
          });
        },
        cancel: () => {
          this.window.confirm.show = false;
        },
      },
    },

    /** 退出搜索，回到当前文件夹 */
    exitSearch: () => {
      this.manager.clearSearch();
      this.manager.setFolder(this.path.folder, this.path.nodes);
    },

    clearSearch: () => {
      this.search.active = false;
      this.table.args.name = undefined;
    },

    setFolder: (folder?: Division, nodes: Division[] = []) => {
      this.path.folder = folder;
      this.path.nodes = nodes;
      /* 进入文件夹后清空选中项 */
      this.table.selecteds = [];
      this.table.args.parent = folder;
      this.table.load.emit(this.table.args);
    },
    reload: () => {
      /* 清缓存保证下次打开区划树时拿到最新数据，当前路径仍由导航状态直接维护 */
      this.business.clear();
      this.manager.setFolder(this.path.folder, this.path.nodes);
    },
  };
}
