import { Polygon } from '../../../data-core/models/arm/polygon.model'
import { Size } from '../../../data-core/models/arm/size.model'
import { CanvasPointTool } from './canvas-point.tool'

export class CanvasPolygonTool {
  constructor(private point: CanvasPointTool) {}

  to = {
    html: (data: Polygon, size: Size) => {
      let result = new Polygon()
      result.Coordinates = []
      for (let i = 0; i < data.Coordinates.length; i++) {
        const item = data.Coordinates[i]
        let point = this.point.to.html(item, size)
        result.Coordinates.push(point)
      }
      return result
    },
  }

  from = {
    html: (data: Polygon, size: Size) => {
      let result = new Polygon()
      result.Coordinates = []
      for (let i = 0; i < data.Coordinates.length; i++) {
        const item = data.Coordinates[i]
        let point = this.point.from.html(item, size)
        result.Coordinates.push(point)
      }
      return result
    },
  }
}
