export class SystemMainMapAMapHeatmapMarkerClusterController {
  constructor(private map: AMap.Map) {}

  cluster?: AMap.MarkerClusterer;
  private display = true;

  load(positions: [number, number][]) {
    // var _renderClusterMarker = function (context: any) {
    //   // 聚合中点个数
    //   var clusterCount = context.count;
    //   var div = document.createElement('div');

    //   div.style.backgroundColor = 'rgba(0,0,0,0)';

    //   div.style.width = div.style.height = '10px';

    //   div.innerHTML = context.count;
    //   div.style.lineHeight = '10px';
    //   div.style.color = '#ffffff';
    //   div.style.fontSize = '12px';
    //   div.style.textAlign = 'center';
    //   context.marker.setOffset(new AMap.Pixel(-10 / 2, -10 / 2));
    //   context.marker.setContent(div);
    // };
    let _renderClusterMarker = (context: any) => {
      // 聚合中点个数
      var clusterCount = context.count;
      var div = document.createElement('div');

      if (!this.display) {
        div.style.display = 'none';
      }

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

  clear() {
    if (this.cluster) {
      this.map.remove(this.cluster);
      this.cluster.setMap();
      this.cluster = undefined;
    }
  }

  show() {
    this.display = true;
    let zoom = this.map.getZoom();
    this.map.setZoom(zoom + 0.1);
    this.map.setZoom(zoom);
  }
  hide() {
    this.display = false;
    let zoom = this.map.getZoom();
    this.map.setZoom(zoom + 0.1);
    this.map.setZoom(zoom);
  }
}
