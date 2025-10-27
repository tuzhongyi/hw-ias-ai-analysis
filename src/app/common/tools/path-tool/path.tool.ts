import { ConfigPath } from './config.path';
import { PathImageTool } from './path-image.tool';

export class PathTool {
  static image = new PathImageTool();
  static config = new ConfigPath();
}
