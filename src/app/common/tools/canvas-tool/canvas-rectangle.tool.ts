import { Point } from '../../../data-core/models/arm/point.model'
import { Rectangle } from '../../../data-core/models/arm/rectangle.model'
import { Size } from '../../../data-core/models/arm/size.model'

export class CanvasRectangleTool {
  to = {
    html: (data: Rectangle, size: Size) => {
      let result = new Rectangle()
      result.Left = data.Left * size.Width
      result.Top = data.Top * size.Height
      result.Width = data.Width * size.Width
      result.Height = data.Height * size.Height
      return result
    },
  }

  from = {
    html: (data: Rectangle, size: Size) => {
      let result = new Rectangle()
      result.Left = data.Left / size.Width
      result.Top = data.Top / size.Height
      result.Width = data.Width / size.Width
      result.Height = data.Height / size.Height
      return result
    },
  }

  private cross(p1: Point, p2: Point, p: Point) {
    return (p2.X - p1.X) * (p.Y - p1.Y) - (p.X - p1.X) * (p2.Y - p1.Y)
  }
  //判断点p是否在p1p2p3p4的正方形内
  isin(area: Rectangle, p: Point) {
    let p1 = new Point()
    p1.X = area.Left
    p1.Y = area.Top
    let p2 = new Point()
    p2.X = area.Left + area.Width
    p2.Y = area.Top
    let p3 = new Point()
    p3.X = area.Left + area.Width
    p3.Y = area.Top + area.Height
    let p4 = new Point()
    p4.X = area.Left
    p4.Y = area.Top + area.Height
    let isPointIn =
      this.cross(p1, p2, p) * this.cross(p3, p4, p) >= 0 &&
      this.cross(p2, p3, p) * this.cross(p4, p1, p) >= 0
    return isPointIn
  }
}
