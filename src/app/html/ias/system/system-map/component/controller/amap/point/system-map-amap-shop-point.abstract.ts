import { EventEmitter } from '@angular/core';
import { IGisPointModel } from '../../../../../../../../common/data-core/models/model.interface';
import { SystemMapAMapConfig } from '../system-map-amap.config';
import { SystemMapAMapConverter } from '../system-map-amap.converter';

export abstract class SystemAMapShopPointAbstract {
  event = {
    move: new EventEmitter<IGisPointModel | undefined>(),
  };
  protected abstract style: {
    radius: number;
    unit: string;
    color: string;
    borderWidth: number;
    blurWidth: number;
  };
  constructor(
    private container: Loca.Container,
    zooms: [number, number] = SystemMapAMapConfig.point.zooms
  ) {
    this.layer = this.init(zooms);
  }
  private converter = new SystemMapAMapConverter();
  private layer: Loca.PointLayer;
  private over?: IGisPointModel;

  private init(zooms?: [number, number]) {
    let layer = new Loca.PointLayer({
      blend: 'normal',
      zooms: zooms,
    });
    return layer;
  }

  load(datas: IGisPointModel[], opts?: { zooms?: [number, number] }) {
    if (opts) {
      if (opts.zooms) {
        this.layer.setZooms(opts.zooms);
      }
    }
    let geo = this.converter.geo.point(datas);
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.container.add(this.layer);
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    let point = this.layer.queryFeature(position);
    if (point) {
      this.over = point.properties as IGisPointModel;
      this.event.move.emit(this.over);
    } else {
      if (this.over) {
        this.over = undefined;
        this.event.move.emit();
      }
    }
  }
}
