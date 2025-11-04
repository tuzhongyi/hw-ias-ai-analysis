import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AMapInputTipItem } from '../../../../../../../../common/helper/map/amap.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

@Component({
  selector: 'ias-system-task-file-details-map-panel-search-result-item',
  imports: [CommonModule],
  templateUrl:
    './system-task-file-details-map-panel-search-result-item.component.html',
  styleUrl:
    './system-task-file-details-map-panel-search-result-item.component.less',
})
export class SystemTaskFileDetailsMapPanelSearchResultItemComponent {
  @Input() data?: AMapInputTipItem;
  @Input() position?: [number, number];
  @Input() selected: boolean = false;
  @Output() copied = new EventEmitter<[number, number]>();

  constructor(private toastr: ToastrService) {}

  get distance() {
    if (this.data && this.data.location && this.position) {
      let distance = GeoTool.point.distance(this.data.location, this.position);
      if (isNaN(distance)) {
        return undefined;
      }
      return distance;
      // if (distance < 1000) {
      //   return `${distance.toFixed(0)} 米`;
      // } else {
      //   return `${(distance / 1000).toFixed(2)} 公里`;
      // }
    }
    return undefined;
  }

  convert = {
    location: (position: [number, number]) => {
      let wgs84 = GeoTool.point.convert.gcj02.to.wgs84(
        position[0],
        position[1]
      );
      return wgs84.join(',');
    },
    road: (address: string) => {
      let index = address.indexOf('路');
      return address.substring(0, index + 1);
    },
    data: (data: AMapInputTipItem) => {
      let array: string[] = [];
      let name = data.name;
      let subname = '';
      let picture = '';
      let address = data.address || '';
      let road = address ? this.convert.road(address) : '';
      let date = formatDate(new Date(), 'yyyy.MM.dd', 'en');
      let location = data.location ? this.convert.location(data.location) : '';
      let district = data.district || '';

      array.push(name);
      array.push(subname);
      array.push(picture);
      array.push(road);
      array.push(road);
      array.push(address);
      array.push(date);
      array.push(location);
      array.push(`${district}${address}`);

      let tab = '	';
      return array.join(tab);
    },
  };

  on = {
    copy: () => {
      if (this.data) {
        let text = this.convert.data(this.data);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then((res) => {
            this.toastr.success('复制成功');
            this.copied.emit(this.data?.location);
          });
        } else {
          let input = document.createElement('input');
          input.value = text;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          this.toastr.success('复制成功');
          document.body.removeChild(input);
          this.copied.emit(this.data.location);
        }
      }
    },
  };
}
