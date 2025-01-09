declare namespace AMap {
  //#region ImageLayer显示的范围
  /**
   *
   * @interface ImageLayerOptions
   */
  interface ImageLayerOptions {
    /**
     * ImageLayer显示的范围
     *
     * @type {Bounds}
     * @memberof ImageLayerOptions
     */
    bounds: Bounds;
    /**
     * 需要显示的Image的Url
     *
     * @type {string}
     * @memberof ImageLayerOptions
     */
    url: string;
    /**
     * 图层的透明度，[0,1]
     *
     * @type {number}
     * @memberof ImageLayerOptions
     */
    opacity: number;
    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof ImageLayerOptions
     */
    visible: boolean;
    /**
     * 图层所属的地图对象
     *
     * @type {Map}
     * @memberof ImageLayerOptions
     */
    map: Map;
    /**
     * 层级，缺省为12
     *
     * @type {number}
     * @memberof ImageLayerOptions
     */
    zIndex: number;
    /**
     * 设置可见级别，[最小级别，最大级别]
     *
     * @type {[number, number]}
     * @memberof ImageLayerOptions
     */
    zooms: [number, number];
  }
  /**
   * 图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放。
   *
   * @class ImageLayer
   */
  class ImageLayer {
    /**
     * 构造一个ImageLayer图层对象，需要提供一个Image的url，以及它覆盖的Bounds。Image的内容会根据Bounds大小显示
     * Creates an instance of ImageLayer.
     * @param {ImageLayerOptions} opts
     * @memberof ImageLayer
     */
    constructor(opts: ImageLayerOptions);
    /**
     * 设置图层所属的地图对象，传入null时从当前地图移除
     *
     * @param {(Map | null)} map
     * @memberof ImageLayer
     */
    setMap(map: Map | null): void;
    /**
     * 返回图层所属的地图对象
     *
     * @returns {Map}
     * @memberof ImageLayer
     */
    getMap(): Map;
    /**
     * 返回ImageLayer显示的范围
     *
     * @returns {Bounds}
     * @memberof ImageLayer
     */
    getBounds(): Bounds;
    /**
     * 设置ImageLayer显示的范围
     *
     * @param {Bounds} bounds
     * @memberof ImageLayer
     */
    setBounds(bounds: Bounds): void;
    /**
     * 显示
     *
     * @memberof ImageLayer
     */
    show(): void;
    /**
     * 隐藏
     *
     * @memberof ImageLayer
     */
    hide(): void;
    /**
     * 设置层级
     *
     * @param {number} zindex
     * @memberof ImageLayer
     */
    setzIndex(zindex: number): void;
    /**
     * 获取层级
     *
     * @returns {number}
     * @memberof ImageLayer
     */
    getzIndex(): number;
    /**
     * 返回Image对象
     *
     * @returns {HTMLCanvasElement}
     * @memberof ImageLayer
     */
    getElement(): HTMLCanvasElement;
    /**
     * 修改Image的Url
     *
     * @param {string} url
     * @memberof ImageLayer
     */
    setImageUrl(url: string): void;
    /**
     * 返回Image的Url
     *
     * @returns {string}
     * @memberof ImageLayer
     */
    getImageUrl(): string;
  }

  //#endregion
  //#region MassMarks

  /**
   *
   * @interface MassMarksOptions
   */
  interface MassMarksOptions {
    /**
     * 图层叠加的顺序值，0表示最底层。默认zIndex：5
     *
     * @type {number}
     * @memberof MassMarksOptions
     */
    zIndex?: number;
    /**
     * 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
     *
     * @type {number}
     * @memberof MassMarksOptions
     */
    opacity?: number;
    /**
     * 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；
     *
     * @type {[number, number]}
     * @memberof MassMarksOptions
     */
    zooms?: [number, number];
    /**
     * 在移动设备上，取值范围为[3-19]
     * 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，
     *
     * @type {string}
     * @memberof MassMarksOptions
     */
    cursor?: string;
    /**
     * Opera不支持自定义cursor
     * 表示是否在拖拽缩放过程中实时重绘，默认true，建议超过10000的时候设置false
     *
     * @type {boolean}
     * @memberof MassMarksOptions
     */
    alwaysRender?: boolean;
    /**
     * 用于设置点的样式，当点样式一致时传入StyleObject即可；当需要展示多种点样式时，
     * 传入StyleObject的数组，此时需要为Data中每个元素指定 style字段为该元素要显示
     * 的样式在StyleObject数组中的索引
     *
     * @type {(StyleObjectOptions | Array<StyleObjectOptions>)}
     * @memberof MassMarksOptions
     */
    style: StyleObjectOptions | Array<StyleObjectOptions>;
  }

  /**
   *
   * @interface StyleObjectOptions
   */
  interface StyleObjectOptions {
    /**
     * 必填参数，图标显示位置偏移量，以图标的左上角为基准点（0,0）点，例如：anchor:new AMap.Pixel(5,5)
     *
     * @type {Pixel}
     * @memberof StyleObjectOptions
     */
    anchor: Pixel;
    /**
     * 必填参数,图标的地址
     *
     * @type {string}
     * @memberof StyleObjectOptions
     */
    url: string;
    /**
     * 必填参数，图标的尺寸；例如：size:new AMap.Size(11,11)
     *
     * @type {Size}
     * @memberof StyleObjectOptions
     */
    size: Size;
    /**
     * 旋转角度
     *
     * @type {number}
     * @memberof StyleObjectOptions
     */
    rotation?: number;
  }

  /**
   *
   * @interface MassMarkData
   */
  interface MassMarkData {
    /**
     *
     * @type {number[]}
     * @memberof MassMarkData
     */
    lnglat: number[];
    /**
     *
     * @type {string}
     * @memberof MassMarkData
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof MassMarkData
     */
    id: string;
    /**
     *
     * @type {number}
     * @memberof MassMarkData
     */
    style: number;
  }

  /**
   * 创建海量点类。datas为点对象的数组，点对象为包含经纬度lnglat属性的Object，opts为点与点集合的绘制样式。
   * 例data: [{lnglat: [116.405285, 39.904989], name: i,id:1},{}, …]或url串，支持从服务器直接取数据
   *
   * @class MassMarks
   * @extends {(EventHandle<"complete" | "click" | "dblclick" | "mouseout" | "mouseup" | "mousedown" | "touchstart" | "touchend">)}
   */
  class MassMarks extends EventHandle<
    | 'complete'
    | 'click'
    | 'dblclick'
    | 'mouseover'
    | 'mouseout'
    | 'mouseup'
    | 'mousedown'
    | 'touchstart'
    | 'touchend'
  > {
    /**
     * Creates an instance of MassMarks.
     * @param {Array<MassMarkData>} data
     * @param {MassMarksOptions} opts
     * @memberof MassMarks
     */
    constructor(data: Array<MassMarkData>, opts: MassMarksOptions);
    /**
     * 设置显示MassMark的地图对象
     *
     * @param {Map} map
     * @memberof MassMarks
     */
    setMap(map: Map): void;
    /**
     * 获取Marker所在地图对象
     *
     * @returns {Map}
     * @memberof MassMarks
     */
    getMap(): Map;
    /**
     * 设置MassMark的显示样式
     *
     * @param {(StyleObjectOptions | Array<StyleObjectOptions>)} opts
     * @memberof MassMarks
     */
    setStyle(opts: StyleObjectOptions | Array<StyleObjectOptions>): void;
    /**
     * 获取MassMark的显示样式，数据结构同setStyle中的属性一致
     *
     * @returns {StyleObjectOptions}
     * @memberof MassMarks
     */
    getStyle(): StyleObjectOptions;
    /**
     * 设置MassMark展现的数据集，数据集格式为：, data: Array 坐标数据集. 例：data: [{lnglat: [116.405285, 39.904989], name: i,id:1},{}, …],{}, …]}
     *
     * @param {Array<MassMarkData>} data
     * @memberof MassMarks
     */
    setData(data: Array<MassMarkData>): void;
    /**
     * 输出MassMark的数据集，数据结构同setDatas中的数据集
     *
     * @returns {MassMarkData}
     * @memberof MassMarks
     */
    getData(): MassMarkData;
    /**
     * 显示海量点图层
     *
     * @memberof MassMarks
     */
    show(): void;
    /**
     * 隐藏海量点图层
     *
     * @memberof MassMarks
     */
    hide(): void;
    /**
     * 清除海量点
     *
     * @memberof MassMarks
     */
    clear(): void;
  }

  //#endregion

  //#region LabelsLayer
  /**
   * LabelsLayer 类是用于承载 LabelMarker 对象的图层。
   *
   * @interface LabelsLayerOptions
   */
  interface LabelsLayerOptions {
    /**
     *
     * @type {number[]}
     * @memberof LabelsLayerOptions
     */
    zooms?: number[];
    /**
     * 图层是否可见
     *
     * @type {boolean}
     * @memberof LabelsLayerOptions
     */
    visible?: boolean;
    /**
     * 图层的层级
     *
     * @type {number}
     * @memberof LabelsLayerOptions
     */
    zIndex?: number;
    /**
     * 图层的透明度
     *
     * @type {number}
     * @memberof LabelsLayerOptions
     */
    opacity?: number;
    /**
     * 是否开启碰撞检测，默认为 true
     * （自v1.4.15 新增）
     *
     * @type {boolean}
     * @memberof LabelsLayerOptions
     */
    collision?: boolean;
    /**
     * 是否开启标注淡入动画，默认为 true
     * （自v1.4.15 新增）
     *
     * @type {boolean}
     * @memberof LabelsLayerOptions
     */
    animation?: boolean;
    allowCollision?: boolean;
  }
  /**
   *
   * @class LabelsLayer
   * @extends {(EventHandle<"clear" | "show" | "hide">)}
   */
  class LabelsLayer extends EventHandle<'clear' | 'show' | 'hide'> {
    /**
     * 构造一个标注图层对象，通过LabelsLayerOptions设置图层属性
     * Creates an instance of LabelsLayer.
     * @param {LabelsLayerOptions} opts
     * @memberof LabelsLayer
     */
    constructor(opts: LabelsLayerOptions);
    /**
     * 获取该图层是否支持碰撞检测 （自v1.4.15 新增）
     *
     * @returns {boolean}
     * @memberof LabelsLayer
     */
    getCollision(): boolean;
    /**
     * 设置该图层是否支持碰撞检测
     *
     * @param {boolean} collision
     * @memberof LabelsLayer
     */
    setCollision(collision: boolean): void;
    /**
     * 获取该图层透明度
     *
     * @returns {number}
     * @memberof LabelsLayer
     */
    getOpacity(): number;
    /**
     * 设置该图层透明度
     *
     * @param {number} opacity
     * @memberof LabelsLayer
     */
    setOpacity(opacity: number): void;
    /**
     * 获取该图层叠加层级
     *
     * @returns {number}
     * @memberof LabelsLayer
     */
    getzIndex(): number;
    /**
     * 设置该图层叠加层级
     *
     * @param {number} zIndex
     * @memberof LabelsLayer
     */
    setzIndex(zIndex: number): void;
    /**
     * 获取该图层标注是否开启淡入动画
     *
     * @returns {boolean}
     * @memberof LabelsLayer
     */
    getAnimation(): boolean;
    /**
     * 设置该图层标注是否开启淡入动画
     *
     * @param {boolean} animation
     * @memberof LabelsLayer
     */
    setAnimation(animation: boolean): void;
    /**
     * 获取该图层显示级别
     *
     * @returns {Array<number>}
     * @memberof LabelsLayer
     */
    getZooms(): Array<number>;
    /**
     * 设置该图层显示级别
     *
     * @param {Array<number>} zooms
     * @memberof LabelsLayer
     */
    setZooms(zooms: Array<number>): void;
    /**
     * 图层中添加 LabelMarker
     *
     * @param {(LabelMarker | LabelMarker[])} args
     * @memberof LabelsLayer
     */
    add(args: LabelMarker | LabelMarker[]): void;
    /**
     * 图层中移除 LabelMarker
     *
     * @param {(LabelMarker | LabelMarker[])} args
     * @memberof LabelsLayer
     */
    remove(args: LabelMarker | LabelMarker[]): void;
    /**
     * 清空图层
     *
     * @memberof LabelsLayer
     */
    clear(): void;
    /**
     * 显示图层
     *
     * @memberof LabelsLayer
     */
    show(): void;
    /**
     * 隐藏图层
     *
     * @memberof LabelsLayer
     */
    hide(): void;
  }

  //#endregion
}
