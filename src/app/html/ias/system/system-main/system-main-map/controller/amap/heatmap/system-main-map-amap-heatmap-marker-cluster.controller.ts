export class SystemMainMapAMapHeatmapMarkerClusterController {
  constructor(private map: AMap.Map, private radius: number) {}

  cluster?: AMap.MarkerClusterer;
  private display = true;

  private render = {
    cluster: (context: any) => {
      // 聚合中点个数
      var clusterCount = context.count;
      var div = document.createElement('div');

      div.className = 'heatmap-cluster-marker';

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
      context.marker.setOffset(new AMap.Pixel(10 / 2, -10 / 2));
      context.marker.setContent(div);
    },
    marker: (context: any) => {
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
    },
    load: (show: boolean) => {
      if (!this.cluster) return;
      let elements = document.querySelectorAll('.heatmap-cluster-marker');
      elements.forEach((e) => {
        (e as HTMLElement).style.display = show ? 'block' : 'none';
      });
    },
  };

  load(positions: [number, number][]) {
    let points = positions.map((x) => {
      return { weight: 1, lnglat: x };
    });
    this.cluster = new AMap.MarkerClusterer(this.map, points, {
      maxZoom: 20,
      gridSize: this.radius, // 聚合网格像素大小
      renderClusterMarker: this.render.cluster, // 自定义聚合点样式
      renderMarker: this.render.marker, // 自定义非聚合点样式
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
    this.render.load(true);
  }
  hide() {
    this.display = false;
    this.render.load(false);
  }
}
