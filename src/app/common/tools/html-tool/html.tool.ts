import { HtmlScreenTool } from './html-screen.tool';
import { HtmlScrollTool } from './html-scroll.tool';

export class HtmlTool {
  static screen = new HtmlScreenTool();
  static scroll = new HtmlScrollTool();
}
