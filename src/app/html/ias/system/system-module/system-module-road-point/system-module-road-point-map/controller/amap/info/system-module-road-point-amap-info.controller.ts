// import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
// import { ComponentTool } from '../../../../../../../../../common/tools/component-tool/component.tool';
// import { SystemModuleRoadPointMapInfoComponent } from '../../../../system-module-road-point-map-info/system-module-road-point-map-info.component';

// export class SystemModuleRoadPointAMapInfoController {
//   constructor(private map: AMap.Map, private tool: ComponentTool) {
//     this.marker = this.init();
//   }

//   private marker: AMap.Marker;

//   private init() {
//     return new AMap.Marker({
//       anchor: 'bottom-center',
//       offset: [0, -30],
//     });
//   }

//   add(data: RoadObject) {
//     if (data.Location) {
//       let content = this.get.html(data);
//       this.marker.setContent(content);

//       let position = [
//         data.Location.GCJ02.Longitude,
//         data.Location.GCJ02.Latitude,
//       ] as [number, number];

//       this.marker.setPosition(position);
//       this.marker.
//       this.map.add(this.marker);
//     }
//     return undefined;
//   }

//   remove() {
//     this.map.remove(this.marker);
//   }

//   private get = {
//     html: (data: RoadObject) => {
//       let component = this.tool.create(SystemModuleRoadPointMapInfoComponent, {
//         data: data,
//       });
//       let html = this.tool.get.html(component);
//       return html.firstElementChild as HTMLElement;
//     },
//   };
// }
