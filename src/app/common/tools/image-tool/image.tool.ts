export class ImageTool {
  static svg = {
    /**
     * 生成 SVG 字符串（图片使用绝对 URL）
     * 适用于可以解析相对路径的场景（如直接插入 DOM）
     */
    string: (
      imgUrl: string,
      text: string,
      args: { size: { width: number; height: number }; color: string },
    ): string => {
      if (!imgUrl) throw new Error('图片地址不能为空');
      if (
        !args ||
        !args.size ||
        !args.size.width ||
        !args.size.height ||
        !args.color
      ) {
        throw new Error('args 参数缺少 size(width/height) 或 color');
      }
      const { width, height } = args.size;
      const { color } = args;
      if (width <= 0 || height <= 0) throw new Error('宽高必须大于0');

      const fontSize = Math.min(width, height) / 4;

      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image width="${width}" height="${height}" href="${imgUrl}" preserveAspectRatio="xMidYMid slice"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="${color}"
    font-size="${fontSize}"
    font-weight="bold"
  >${text}</text>
</svg>`;
    },

    /**
     * 生成可直接使用的 data URI（图片以 base64 内嵌，不依赖外部路径）
     */
    url: async (
      imgUrl: string,
      text: string,
      args: { size: { width: number; height: number }; color: string },
    ): Promise<string> => {
      // 将外部图片转为 base64 内嵌，避免 data URI 中相对路径无法解析
      let base64 = await ImageTool.toBase64(imgUrl);
      let str = ImageTool.svg.string(base64, text, args);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`;
    },
  };

  /** 加载图片并转为 base64 data URI */
  static toBase64(url: string): Promise<string> {
    return fetch(url)
      .then((r) => r.blob())
      .then(
        (b) =>
          new Promise<string>((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(b);
          }),
      );
  }
}
