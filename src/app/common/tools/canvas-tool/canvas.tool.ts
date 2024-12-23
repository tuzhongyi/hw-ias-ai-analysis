import { CanvasPointTool } from './canvas-point.tool'
import { CanvasPolygonTool } from './canvas-polygon.tool'
import { CanvasRectangleTool } from './canvas-rectangle.tool'

export class CanvasTool {
  static point = new CanvasPointTool()
  static polygon = new CanvasPolygonTool(this.point)
  static rectangle = new CanvasRectangleTool()
}
