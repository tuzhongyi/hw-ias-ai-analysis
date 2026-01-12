export class AMapTool {
  static get = {
    center: (
      map: AMap.Map,
      target: [number, number], // 目标坐标
      offset: AMap.Pixel
    ) => {
      const size = map.getSize();
      const basePx = new AMap.Pixel(size.width / 2, size.height / 2);

      // 1️⃣ 先拿到目标点在当前视图中的像素位置
      const targetPx = map.lngLatToContainer(target);

      // 2️⃣ 计算：地图中心需要移动多少像素
      const dx = targetPx.getX() + offset.getX() - basePx.getX();
      const dy = targetPx.getY() + offset.getY() - basePx.getY();

      // 3️⃣ 当前中心点像素
      const centerPx = new AMap.Pixel(size.width / 2, size.height / 2);

      // 4️⃣ 新中心点像素 = 当前中心像素 + 偏移量
      const newCenterPx = new AMap.Pixel(
        centerPx.getX() + dx,
        centerPx.getY() + dy
      );

      // 5️⃣ 像素 → 经纬度
      let center = map.containerToLngLat(newCenterPx);

      return center;
    },
  };

  static set = {
    center: (map: AMap.Map, target: [number, number], offset: AMap.Pixel) => {
      map.setCenter(target);

      requestAnimationFrame(() => {
        const finalCenter = AMapTool.get.center(map, target, offset);
        map.panTo(finalCenter);
      });
    },
  };
}
