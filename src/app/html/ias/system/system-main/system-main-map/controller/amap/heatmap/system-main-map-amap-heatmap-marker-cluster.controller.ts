export class SystemMainMapAMapHeatmapMarkerClusterController {
  constructor(private map: AMap.Map, private radius: number) {}

  cluster?: AMap.MarkerClusterer;
  private display = true;

  private render = {
    content: (count: number) => {
      var div = document.createElement('div');

      div.className = 'heatmap-cluster-marker';

      if (!this.display) {
        div.style.display = 'none';
      }

      div.style.backgroundColor = 'rgba(0,0,0,0)';

      div.style.width = div.style.height = '10px';

      div.innerHTML = `${count}`;
      div.style.lineHeight = '10px';
      div.style.color = '#ffffff';
      div.style.fontSize = '12px';
      div.style.textAlign = 'center';
      return div;
    },
    cluster: (context: any) => {
      let div = this.render.content(context.count);
      context.marker.setContent(div);
      context.marker.setOffset(new AMap.Pixel(-10 / 2, -10 / 2));
    },
    marker: (context: any) => {
      let div = this.render.content(1);
      context.marker.setContent(div);
      context.marker.setOffset(new AMap.Pixel(-10 / 2, -10 / 2));
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
