export class GarbageManagementMapAMapHeatmapMarkerClusterController {
  constructor(private map: AMap.Map) {}

  cluster?: AMap.MarkerClusterer;

  load(positions: [number, number][]) {
    // var render = function (context: any) {
    //   var div = document.createElement('div');
    //   // 聚合点配色
    //   div.style.backgroundColor = 'rgba(0,0,0,0)';
    //   let size = '10px';
    //   div.style.width = size + 'px';
    //   div.style.height = size + 'px';
    //   div.innerHTML = context.count;
    //   div.style.lineHeight = size + 'px';

    //   div.style.color = '#ffffff';
    //   div.style.fontSize = '12px';
    //   div.style.textAlign = 'center';
    //   context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    //   context.marker.setContent(div);
    // };
    // var marker = function (context: any) {
    //   var content =
    //     '<div style="background-color: rgba(255,255,178,.0); height: 18px; width: 18px; border: 1px solid rgba(255,255,178,1); border-radius: 12px; box-shadow: rgba(0, 0, 0, 1) 0px 0px 3px;"></div>';
    //   var offset = new AMap.Pixel(-9, -9);
    //   context.marker.setContent(content);
    //   context.marker.setOffset(offset);
    // };

    var _renderClusterMarker = function (context: any) {
      // 聚合中点个数
      var clusterCount = context.count;
      var div = document.createElement('div');

      div.style.backgroundColor = 'rgba(0,0,0,0)';

      div.style.width = div.style.height = '10px';

      div.innerHTML = context.count;
      div.style.lineHeight = '10px';
      div.style.color = '#ffffff';
      div.style.fontSize = '12px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-10 / 2, -10 / 2));
      context.marker.setContent(div);
    };
    var _renderMarker = function (context: any) {
      var content = `
        <div style="
          display:none;
          background-color: rgba(35,227,83,.1); 
          height: 18px; 
          width: 18px; 
          border: 1px solid rgba(35,227,83,.1); 
          border-radius: 12px; ">
        </div>
      `;
      var offset = new AMap.Pixel(-9, -9);
      context.marker.setContent(content);
      context.marker.setOffset(offset);
    };

    let points = positions.map((x) => {
      return { weight: 1, lnglat: x };
    });
    this.cluster = new AMap.MarkerClusterer(this.map, points, {
      maxZoom: 20,
      gridSize: 20, // 聚合网格像素大小
      renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
      renderMarker: _renderMarker, // 自定义非聚合点样式
    });
  }
}
