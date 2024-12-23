import { Point } from '../../../data-core/models/arm/point.model'
import { Size } from '../../../data-core/models/arm/size.model'

export class CanvasPointTool {
  to = {
    html: (point: Point, size: Size) => {
      let result = new Point()
      result.X = Math.round(point.X * size.Width)
      result.Y = Math.round(point.Y * size.Height)
      return result
    },
  }

  from = {
    html: (data: Point, size: Size) => {
      let result = new Point()
      result.X = Math.round(data.X / size.Width)
      result.Y = Math.round(data.Y / size.Height)
      return result
    },
  }
}
