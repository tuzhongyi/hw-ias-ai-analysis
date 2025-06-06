export class HtmlScreenTool {
  ratio = {
    height: (value: number) => {
      return `${screen.height * value}px`;
    },
  };

  get(width: number, ratio: number) {}

  has = {
    head: {
      from: {
        width: (width: number, ratio: number, head: number) => {
          let height = width / ratio;
          return `${height + head}px`;
        },
        height: (hegiht: number, ratio: number, head: number) => {
          let width = (hegiht - head) * ratio;
          return `${width}px`;
        },
      },
    },
  };
}
