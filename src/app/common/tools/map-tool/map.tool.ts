export class MapTool {
  private static radians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  private static degrees(radians: number): number {
    return radians * (180 / Math.PI)
  }

  static direction(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const φ1 = this.radians(lat1)
    const φ2 = this.radians(lat2)
    const Δλ = this.radians(lon2 - lon1)

    const y = Math.sin(Δλ) * Math.cos(φ2)
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
    let θ = Math.atan2(y, x)

    θ = this.degrees(θ)
    return (θ + 360) % 360 // 确保结果在 0 到 360 度之间
  }

  static distance(point1: number[], point2: number[]): number {
    const [x1, y1] = point1
    const [x2, y2] = point2
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  }

  static closest(points: number[][], target: number[]): number[] | null {
    if (points.length === 0) return null

    let closestPoint = points[0]
    let minDistance = this.distance(points[0], target)

    for (let i = 1; i < points.length; i++) {
      const distance = this.distance(points[i], target)
      if (distance < minDistance) {
        closestPoint = points[i]
        minDistance = distance
      }
    }

    return closestPoint
  }
}
