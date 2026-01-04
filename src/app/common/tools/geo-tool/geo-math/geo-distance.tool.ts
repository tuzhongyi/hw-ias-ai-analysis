export class GeoMathDistanceTool {
  /**
   * 计算两个经纬度坐标之间的距离（使用Haversine公式）
   * @param {[number,number]} point1 - 第一个点
   * @param {[number,number]} point2 - 第二个点
   * @returns {number} 距离
   */
  calculate(point1: [number, number], point2: [number, number]) {
    // 将十进制度数转换为弧度
    const toRadians = (degree: number) => degree * (Math.PI / 180);

    const R = 6371; // 地球半径，单位千米
    const dLat = toRadians(point2[1] - point1[1]);
    const dLng = toRadians(point2[0] - point1[0]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(point1[1])) *
        Math.cos(toRadians(point2[1])) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c; // 距离，单位千米

    return Math.round(distance * 1000);
  }
}
