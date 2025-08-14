import { HtmlTool } from '../html-tool/html.tool';

export class SizeWindowTool {
  full = {
    width: '99%',
    height: '99%',
  };

  large = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.85,
      16 / 9,
      60
    ),
    height: '85%',
  };
  middle = {
    width: '56%',
    height: '80%',
  };
  simple = {
    width: '500px',
    height: 'auto',
  };

  video = {
    path: {
      width: `${screen.availWidth * 0.85}px`,
      height: HtmlTool.screen.has.head.from.width(
        screen.availWidth * 0.85,
        16 / 9,
        -200
      ),
    },
  };
}
