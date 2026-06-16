export class ImageTool {
  svg(
    imgUrl: string,
    text: string,
    args: { size: { width: number; height: number }; color: string },
  ): string {
    // 参数合法性校验
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

    // 字号取宽高较小值自适应
    const fontSize = Math.min(width, height) / 4;

    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <!-- 底层背景图，铺满画布居中裁剪 -->
  <image width="${width}" height="${height}" href="${imgUrl}" preserveAspectRatio="xMidYMid slice"/>
  <!-- 居中文字，颜色由外部传入 -->
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    fill="${color}"
    font-size="${fontSize}"
    font-weight="bold"
    stroke="#000"
    stroke-width="1
  >${text}</text>
</svg>`;

    return svgStr;
  }
}
