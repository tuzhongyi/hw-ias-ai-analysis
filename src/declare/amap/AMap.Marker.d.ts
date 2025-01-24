declare namespace AMap {
  /** MarkerOptions **/
  interface MarkerOptions extends OverlayOptions {
    /**要显示该marker的地图对象**/
    map?: Map;

    /**点标记在地图上显示的位置, 默认为地图中心点**/
    position?: LngLat | number[];
    anchor?: string;
    /**点标记显示位置偏移量, 默认值为Pixel(-10, -34)。Marker指定position后, 默认以marker左上角位置为基准点, 对准所给定的position位置, 若需使marker指定位置对准在position处, 需根据marker的尺寸设置一定的偏移量。**/
    offset?: Pixel | number[];

    /**需在点标记中显示的图标。可以是一个本地图标地址, 或者Icon对象。有合法的content内容时, 此属性无效**/
    icon?: string | Icon;

    /**点标记显示内容, 可以是HTML要素字符串或者HTML DOM对象。content有效时, icon属性将被覆盖**/
    content?: string | any;

    /**鼠标点击时marker是否置顶, 默认false , 不置顶
     * (自v1.3 新增)**/
    topWhenClick?: boolean;

    /**是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false**/
    bubble?: boolean;

    /**设置点标记是否可拖拽移动, 默认为false**/
    draggable?: boolean;

    /**设置拖拽点标记时是否开启点标记离开地图的效果**/
    raiseOnDrag?: boolean;

    /**指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor**/
    cursor?: string;

    /**点标记是否可见, 默认为true**/
    visible?: boolean;

    /**点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100**/
    zIndex?: number;

    /**点标记的旋转角度, 广泛用于改变车辆行驶方向 注: angle属性是使用CSS3来实现的, 支持IE9及以上版本**/
    angle?: number;

    /**是否自动旋转。点标记在使用moveAlong动画时, 路径方向若有变化, 点标记是否自动调整角度, 默认为false。广泛用于自动调节车辆行驶方向。 IE8以下不支持旋转, autoRotation属性无效**/
    autoRotation?: boolean;

    /**点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果**/
    animation?: string;

    /**点标记阴影, 不设置该属性则点标记无阴影**/
    shadow?: Icon;

    /**鼠标滑过点标记时的文字提示, 不设置则鼠标滑过点标无文字提示**/
    title?: string;

    /**点标记是否可点击**/
    clickable?: boolean;

    /**设置Marker的可点击区域, 在定义的区域内可触发Marker的鼠标点击事件**/
    shape?: MarkerShape;

    /**用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    extData?: any;

    /**添加文本标注, content为文本标注的内容, offset为偏移量, 左上角为偏移量为(0, 0)**/
    label?: { content: string; offset?: Pixel; direction?: string };
  }

  interface MarkerLabel {
    content?: string;
    direction?: string;
    offset?: Pixel;
  }

  /** Marker类 **/
  class Marker extends Overlay {
    /**构造一个点标记对象, 通过MarkerOptions设置点标记对象的属性**/
    constructor(opt: MarkerOptions);
    /**唤起高德地图客户端标注页其中Object里面包含有{ name: string, name属性 必要参数 position:
     * LngLat 坐标点 }**/
    markOnAMAP(obj: any): void;

    /**获取Marker偏移量
     * (自v1.3 新增)**/
    getOffset(): Pixel;

    /**设置Marker偏移量
     * (自v1.3 新增)**/
    setOffset(offset: Pixel): void;
    setAnchor(anchor: string): void;
    /**设置点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果**/
    setAnimation(animate: string): void;

    /**获取点标记的动画效果类型**/
    getAnimation(): string;

    /**设置点标记是支持鼠标单击事件**/
    setClickable(clickable: boolean): void;

    /**获取点标记是否支持鼠标单击事件**/
    getClickable(): boolean;

    /**获取点标记的位置**/
    getPosition(): LngLat;

    /**设置点标记位置**/
    setPosition(lnglat: LngLat | number[]): void;

    /**设置点标记的旋转角度**/
    setAngle(angle: number): void;

    /**设置点标记文本标签内容相关示例**/
    setLabel(label?: any): void;

    /**获取点标记文本标签内容**/
    getLabel(): any;

    /**获取点标记的旋转角度**/
    getAngle(): number;

    /**设置点标记的叠加顺序, 默认最先添加的点标记在最底层**/
    setzIndex(index: number): void;

    /**获取点标记的叠加顺序**/
    getzIndex(): number;

    /**设置点标记的显示图标。 参数image可传入string、Icon两种类型的值。
     * 若为string(图片url), 表示点标记以指定图片形式显示；若为Icon, 表示点标记以Icon对象形式显示**/
    setIcon(content: string | Icon | any): void;

    /**当点标记未自定义图标时, 获取Icon内容**/
    getIcon(): string | Icon;

    /**设置点标记对象是否可拖拽移动**/
    setDraggable(draggable: boolean): void;

    /**获取点标记对象是否可拖拽移动**/
    getDraggable(): boolean;

    /**点标记隐藏**/
    hide(): void;

    /**点标记显示**/
    show(): void;

    /**设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置**/
    setCursor(Cursor: any): string;

    /**设置点标记显示内容, 可以是HTML要素字符串或者HTML DOM对象**/
    setContent(html: string | HTMLDivElement): void;

    /**获取点标记内容**/
    getContent(): string;

    /**以指定的速度, 点标记沿指定的路径移动。参数path为路径坐标串；speed为指定速度, 单位: 千米/小时； 回调函数f为变化曲线函数, 缺省为function(k){return k}；参数circlable表明是否循环执行动画, 默认为false**/
    moveAlong(
      path: Array<any>,
      speed: number,
      f?: Function,
      circlable?: boolean
    ): void;

    /**以给定速度移动点标记到指定位置。参数lnglat为指定位置, 必设；speed为指定速度, 单位: 千米/小时；回调函数f为变化曲线函数, 缺省为function(k){return k}。**/
    moveTo(lnglat: LngLat, speed: number, f: Function): void;

    /**点标记停止动画**/
    stopMove(): void;

    /**暂定点标记的动画效果**/
    pauseMove(): void;

    /**重新开始点标记的动画效果**/
    resumeMove(): void;

    /**为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null)**/
    setMap(map: Map): void;

    /**获取Marker所在地图对象**/
    getMap(): Map;

    /**鼠标滑过点标时的文字提示**/
    setTitle(title: string): void;

    /**获取点标记的文字提示**/
    getTitle(): string;

    /**地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶**/
    setTop(isTop: boolean): void;

    /****/
    getTop(): boolean;

    /**为marker设置阴影效果**/
    setShadow(icon: Icon): void;

    /**获取marker的阴影图标**/
    getShadow(): Icon;

    /**设置marker的可点击区域**/
    setShape(shape: MarkerShape): void;

    /**获取marker的可点击区域**/
    getShape(): MarkerShape;

    /**设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    setExtData(ext: any): void;

    /**获取用户自定义属性**/
    getExtData(): any;
  }

  /** MarkerShapeOptions **/
  interface MarkerShapeOptions {
    /**可点击区域组成元素数组, 存放图形的像素坐标等信息, 该数组元素由type决定: - circle: coords格式为 [x1, y1, r], x1, y1为圆心像素坐标, r为圆半径 - poly: coords格式为 [x1, y1, x2, y2 … xn, yn], 各x, y表示多边形边界像素坐标 - rect: coords格式为 [x1, y1, x2, y2], x1, y1为矩形左上角像素坐标, x2, y2为矩形右下角像素坐标 Markshape的像素坐标是指相对于marker的左上角的像素坐标偏移量**/
    coords?: Array<number>;

    /**可点击区域类型, 可选值: - circle: 圆形 - poly: 多边形 - rect: 矩形**/
    type?: string;
  }

  /** MarkerShape **/
  class MarkerShape {
    /**构造一个Marker可点击区域对象, 通过MarkerShapeOptions设置可点击区域属性**/
    constructor(opt: MarkerShapeOptions);
  }

  /** IconOptions **/
  interface IconOptions {
    /**图标尺寸, 默认值(36, 36)**/
    size?: Size;

    /**图标取图偏移量。当image中指定了一个大图时, 可通过size和imageOffset配合, 显示图标的指定范围**/
    imageOffset?: Pixel;

    /**图标的取图地址。默认为蓝色图钉图片**/
    image?: string;

    /**图标所用图片大小, 根据所设置的大小拉伸或压缩图片, 等同于CSS中的background-size属性。可用于实现高清屏的高清效果**/
    imageSize?: Size;
  }

  /** MarkerShape **/
  class Icon {
    image: string;
    /**构造点覆盖物图标, 通过IconOptions设置图标属性**/
    constructor(opt: IconOptions);
    /**获取图标图片大小**/
    getImageSize(): Size;

    /**设置图标图片大小**/
    setImageSize(size: Size): void;
    id?: string;
  }

  /** ElasticMarkerOptions **/
  interface ElasticMarkerOptions {
    /**多个不同样式的数组, 每个样式形如:
     *{
     * icon: {
     * img: './a, png',
     * size: [16, 16], //图标的原始大小
     * ancher: [8, 16], //锚点, 图标原始大小下锚点所处的位置, 相对左上角
     * imageOffset: [360, 340],
     * //可缺省, 当使用精灵图时可用, 标示图标在整个图片中左上角的位置
     * imageSize: [512, 512],
     * //可缺省, 当使用精灵图时可用, 整张图片的大小
     * fitZoom: 14, //最合适的级别, 在此级别下显示为原始大小
     * scaleFactor: 2, //地图放大一级的缩放比例系数
     * maxScale: 2, //最大放大比例
     * minScale: 1//最小放大比例
     * },
     * label: {
     * content: '标记1', //文本内容
     * position: 'BM', //文本位置相对于图标的基准点,
     * //BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、
     * //左侧中央、右侧中央、左上角、顶部中央、右上角。
     * //缺省时代表相对图标的锚点位置
     * offset: [-35, 0], //相对position的偏移量
     * minZoom: 15//label的最小显示级别
     * }
     *}**/
    styles?: Array<any>;

    /**表示地图级别与styles中样式对应关系的映射, 如: {
     * 14: 0,
     * 15: 0,
     * 16: 1,
     * 17: 1,
     * 18: 1,
     * 19: 1,
     * 20: 1
     * } 表示14到15级使用styles中的第0个样式, 16-20级使用第二个样式**/
    zoomStyleMapping?: any;

    /**要显示该标记的地图对象**/
    map?: Map;

    /**点标记在地图上显示的位置, 默认为地图中心点**/
    position?: LngLat;

    /**鼠标点击时marker是否置顶, 默认false , 不置顶
     * (自v1.3 新增)**/
    topWhenClick?: boolean;

    /**是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false**/
    bubble?: boolean;

    /**设置点标记是否可拖拽移动, 默认为false**/
    draggable?: boolean;

    /**指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor**/
    cursor?: string;

    /**点标记是否可见, 默认为true**/
    visible?: boolean;

    /**点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100**/
    zIndex?: number;

    /**点标记是否可点击**/
    clickable?: boolean;

    /**用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    extData?: any;
  }

  /** 灵活点标记, 一种可以随着地图级别变化而改变图标和大小的点标记, 插件类。查看示例 **/
  class ElasticMarker {
    /**构造一个灵活点标记对象, 通过ElasticMarkerOptions设置点标记对象的属性**/
    constructor(opt: ElasticMarkerOptions);
    /**唤起高德地图客户端标注页其中Object里面包含有{ name: string, name属性 必要参数 position:
     * LngLat 坐标点 }**/
    markOnAMAP(obj: any): void;

    /**设置点标记是支持鼠标单击事件**/
    setClickable(clickable: boolean): void;

    /**获取点标记是否支持鼠标单击事件**/
    getClickable(): boolean;

    /**获取点标记的位置**/
    getPosition(): LngLat;

    /**设置点标记位置**/
    setPosition(lnglat: LngLat): void;

    /**设置点标记的叠加顺序, 默认最先添加的点标记在最底层**/
    setzIndex(index: number): void;

    /**获取点标记的叠加顺序**/
    getzIndex(): number;

    /**设置点标记对象是否可拖拽移动**/
    setDraggable(draggable: boolean): void;

    /**获取点标记对象是否可拖拽移动**/
    getDraggable(): boolean;

    /**点标记隐藏**/
    hide(): void;

    /**点标记显示**/
    show(): void;

    /**设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置**/
    setCursor(Cursor: any): string;

    /**为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null)**/
    setMap(map: Map): void;

    /**获取Marker所在地图对象**/
    getMap(): Map;

    /**鼠标滑过点标时的文字提示**/
    setTitle(title: string): void;

    /**获取点标记的文字提示**/
    getTitle(): string;

    /**地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶**/
    setTop(isTop: boolean): void;

    /****/
    getTop(): boolean;

    /**设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    setExtData(ext: any): void;

    /**获取用户自定义属性**/
    getExtData(): any;
  }

  /** TextOptions **/
  interface TextOptions {
    style?: any;
    // 图标锚点。 可选值： 'top-left'| 'top-center'| 'top-right'| 'middle-left'| 'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right' 。默认值：'top-left'
    anchor?: string;
    /**标记显示的文本内容**/
    text?: string;

    /**横向位置, 'left' 'right', 'center'可选**/
    textAlign?: string;

    /**纵向位置, 'top' 'middle', 'bottom'可选**/
    verticalAlign?: string;

    /**要显示该标记的地图对象**/
    map?: Map;

    /**点标记在地图上显示的位置, 默认为地图中心点**/
    position?: LngLat | number[];

    /**点标记显示位置偏移量, 默认值为Pixel(-10, -34)。Marker指定position后, 默认以marker左上角位置为基准点, 对准所给定的position位置, 若需使marker指定位置对准在position处, 需根据marker的尺寸设置一定的偏移量。**/
    offset?: Pixel;

    /**鼠标点击时是否置顶, 默认false , 不置顶**/
    topWhenClick?: boolean;

    /**是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * 默认值: false**/
    bubble?: boolean;

    /**设置点标记是否可拖拽移动, 默认为false**/
    draggable?: boolean;

    /**设置拖拽点标记时是否开启点标记离开地图的效果**/
    raiseOnDrag?: boolean;

    /**指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor**/
    cursor?: string;

    /**点标记是否可见, 默认为true**/
    visible?: boolean;

    /**点标记的叠加顺序。地图上存在多个点标记叠加时, 通过该属性使级别较高的点标记在上层显示 默认zIndex: 100**/
    zIndex?: number;

    /**点标记的旋转角度, 广泛用于改变车辆行驶方向 注: angle属性是使用CSS3来实现的, 支持IE9及以上版本**/
    angle?: number;

    /**是否自动旋转。点标记在使用moveAlong动画时, 路径方向若有变化, 点标记是否自动调整角度, 默认为false。广泛用于自动调节车辆行驶方向。 IE8以下不支持旋转, autoRotation属性无效**/
    autoRotation?: boolean;

    /**点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果**/
    animation?: string;

    /**点标记阴影, 不设置该属性则点标记无阴影**/
    shadow?: Icon;

    /**鼠标滑过点标记时的文字提示, 不设置则鼠标滑过点标无文字提示**/
    title?: string;

    /**点标记是否可点击**/
    clickable?: boolean;

    /**用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    extData?: any;
  }

  /** 纯文本标记, 继承自Marker, 具有Marker的大部分属性、方法和事件(v1.4.2新增) **/
  class Text {
    /**构造一个点标记对象, 通过TextOptions设置点标记对象的属性**/
    constructor(opt: TextOptions);
    /**获取文本内容**/
    getText(): string;

    /**修改文本内容**/
    setText(string: any): void;

    /**设置文本样式, Object同css样式表, 如: {'background-color': 'red'}**/
    setStyle(Object: any): void;

    /**唤起高德地图客户端标注页其中Object里面包含有{ name: string, name属性 必要参数 position:
     * LngLat 坐标点 }**/
    markOnAMAP(obj: any): void;

    /**获取偏移量**/
    getOffset(): Pixel;

    /**设置偏移量**/
    setOffset(offset: Pixel): void;

    /**设置点标记的动画效果, 默认值: “AMAP_ANIMATION_NONE”
     * 可选值:
     * “AMAP_ANIMATION_NONE”, 无动画效果
     * “AMAP_ANIMATION_DROP”, 点标掉落效果
     * “AMAP_ANIMATION_BOUNCE”, 点标弹跳效果**/
    setAnimation(animate: string): void;

    /**获取点标记的动画效果类型**/
    getAnimation(): string;

    /**设置点标记是支持鼠标单击事件**/
    setClickable(clickable: boolean): void;

    /**获取点标记是否支持鼠标单击事件**/
    getClickable(): boolean;

    /**获取点标记的位置**/
    getPosition(): LngLat;

    /**设置点标记位置**/
    setPosition(lnglat: LngLat): void;

    /**设置点标记的旋转角度**/
    setAngle(angle: number): void;

    /**获取点标记的旋转角度**/
    getAngle(): number;

    /**设置点标记的叠加顺序, 默认最先添加的点标记在最底层**/
    setzIndex(index: number): void;

    /**获取点标记的叠加顺序**/
    getzIndex(): number;

    /**设置点标记对象是否可拖拽移动**/
    setDraggable(draggable: boolean): void;

    /**获取点标记对象是否可拖拽移动**/
    getDraggable(): boolean;

    /**点标记隐藏**/
    hide(): void;

    /**点标记显示**/
    show(): void;

    /**设置鼠标悬停时的光标。 参数cur可为CSS标注中的光标样式, 如:
     * setCursor(“pointer”)等；或者自定义的光标样式, 如:
     * setCursor("url('http: //http://webapi.amap.com/images/0.png') , pointer")
     * 注: 当浏览器不支持css2, url值不起作用, 鼠标样式就按pointer来设置**/
    setCursor(Cursor: any): string;

    /**以指定的速度, 点标记沿指定的路径移动。参数path为路径坐标串；speed为指定速度, 单位: 千米/小时； 回调函数f为变化曲线函数, 缺省为function(k){return k}；参数circlable表明是否循环执行动画, 默认为false**/
    moveAlong(
      path: Array<any>,
      speed: number,
      f: Function,
      circlable: boolean
    ): void;

    /**以给定速度移动点标记到指定位置。参数lnglat为指定位置, 必设；speed为指定速度, 单位: 千米/小时；回调函数f为变化曲线函数, 缺省为function(k){return k}。**/
    moveTo(lnglat: LngLat, speed: number, f: Function): void;

    /**点标记停止动画**/
    stopMove(): void;

    /**暂定点标记的动画效果**/
    pauseMove(): void;

    /**重新开始点标记的动画效果**/
    resumeMove(): void;

    /**为Marker指定目标显示地图。当参数值取null时, 地图上移除当前Marker: setMap(null)**/
    setMap(map: Map): void;

    /**获取Marker所在地图对象**/
    getMap(): Map;

    /**鼠标滑过点标时的文字提示**/
    setTitle(title: string): void;

    /**获取点标记的文字提示**/
    getTitle(): string;

    /**地图上有多个marker时, 当isTop为true时, marker将显示在最前面；当为false时, marker取消置顶**/
    setTop(isTop: boolean): void;

    /****/
    getTop(): boolean;

    /**设置阴影效果**/
    setShadow(icon: Icon): void;

    /**获取阴影图标**/
    getShadow(): Icon;

    /**设置用户自定义属性, 支持JavaScript API任意数据类型, 如Marker的id等**/
    setExtData(ext: any): void;

    /**获取用户自定义属性**/
    getExtData(): any;
  }

  /** PolylineOptions **/
  interface PolylineOptions extends OverlayOptions {
    /**要显示该polyline的地图对象**/
    map?: Map;

    /**折线覆盖物的叠加顺序。默认叠加顺序, 先添加的线在底层, 后添加的线在上层。通过该属性可调整叠加顺序, 使级别较高的折线覆盖物在上层显示 默认zIndex: 50**/
    zIndex?: number;

    /**是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * (自v1.3 新增) 默认值: false**/
    bubble?: boolean;

    /**指定鼠标悬停时的鼠标样式, 自定义cursor, IE仅支持cur/ani/ico格式, Opera不支持自定义cursor**/
    cursor?: string;

    /**是否绘制成大地线, 默认false相关示例**/
    geodesic?: boolean;

    /**线条是否带描边, 默认false**/
    isOutline?: boolean;

    /**描边的宽度, 默认为1**/
    borderWeight?: number;

    /**线条描边颜色, 此项仅在isOutline为true时有效, 默认: #000000**/
    outlineColor?: string;

    /**折线的节点坐标数组**/
    path?: Array<any>;

    /**线条颜色, 使用16进制颜色代码赋值。默认值为#006600**/
    strokeColor?: string;

    /**线条透明度, 取值范围[0, 1], 0表示完全透明, 1表示不透明。默认为0.9**/
    strokeOpacity?: number;

    /**线条宽度, 单位: 像素**/
    strokeWeight?: number;

    /**线样式, 实线: solid, 虚线: dashed**/
    strokeStyle?: string;

    /**勾勒形状轮廓的虚线和间隙的样式, 此属性在strokeStyle 为dashed 时有效, 此属性在ie9+浏览器有效 取值:
     * 实线: [0, 0, 0] 虚线: [10, 10] , [10, 10] 表示10个像素的实线和10个像素的空白(如此反复)组成的虚线 点画线: [10, 2, 10], [10, 2, 10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 (如此反复)组成的虚线**/
    strokeDasharray?: Array<any>;

    /**折线拐点的绘制样式, 默认值为'miter'尖角, 其他可选值: 'round'圆角、'bevel'斜角**/
    lineJoin?: string;

    /**折线两端线帽的绘制样式, 默认值为'butt'无头, 其他可选值: 'round'圆头、'square'方头**/
    lineCap?: string;

    /**设置折线是否可拖拽移动, 默认为false**/
    draggable?: boolean;

    /**用户自定义属性, 支持JavaScript API任意数据类型, 如Polyline的id等**/
    extData?: any;

    /**是否延路径显示白色方向箭头, 默认false。Canvas绘制时有效, 建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头(自V1.4.0版本参数效果变更)**/
    showDir?: boolean;
  }

  /** Polyline类 **/
  class Polyline extends Overlay {
    /**构造折线对象, 通过PolylineOptions指定折线样式**/
    constructor(opt: PolylineOptions);
    /**设置组成该折线的节点数组**/
    setPath(path: Array<any>): void;

    /**获取折线路径的节点数组。其中lat和lng是经纬度参数。**/
    getPath(): Array<any>;

    /**修改折线属性(包括路径的节点、线样式、是否绘制大地线等。属性详情参看PolylineOptions列表)**/
    setOptions(opt: PolylineOptions): void;

    /**获取线的属性**/
    getOptions(): any;

    /**获取折线的总长度(单位: 米)**/
    getLength(): number;

    /**获取当前折线的矩形范围对象**/
    getBounds(): Bounds;

    /**地图上隐藏指定折线**/
    hide(): void;

    /**地图上显示指定折线**/
    show(): void;

    /**设置折线所在的地图。参数map即为目标地图, 参数为null时, 在地图上移除当前折线**/
    setMap(map: Map): void;

    /**设置用户自定义属性, 支持JavaScript API任意数据类型, 如Polyline的id等**/
    setExtData(ext: any): void;

    /**获取用户自定义属性**/
    getExtData(): any;
  }

  interface PolygonOptions extends OverlayOptions {
    // 要显示该polygon的地图对象
    map?: Map;
    // 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
    // 默认zIndex：10
    zIndex?: number;
    // 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，数组元素为多边形轮廓线的节点坐标数组
    // “环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理
    path?: Array<LngLat> | Array<Array<LngLat>>;
    // 是否将覆盖物的鼠标或touch等事件冒泡到地图上 （自v1.3 新增）
    // 默认值：false
    bubble?: boolean;
    // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur / ani / ico格式，Opera不支持自定义cursor
    cursor?: string;
    // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    strokeColor?: string;
    // 轮廓线透明度，取值范围[0, 1]，0表示完全透明，1表示不透明。默认为0.9
    strokeOpacity?: number;
    // 轮廓线宽度
    strokeWeight?: number;
    // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
    fillColor?: string;
    // 多边形填充透明度，取值范围[0, 1]，0表示完全透明，1表示不透明。默认为0.9
    fillOpacity?: number;
    // 设置多边形是否可拖拽移动，默认为false
    draggable?: boolean;
    // 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
    extData?: any;
    // 轮廓线样式，实线?: solid，虚线?: dashed
    strokeStyle?: string;
    // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9 + 浏览器有效 取值：
    // 实线：[0, 0, 0]
    // 虚线：[10, 10]，[10, 10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
    // 点画线：[10, 2, 10]，[10, 2, 10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
    strokeDasharray?: Array<number> | Array<Array<number>>;
  }

  class Polygon extends Overlay {
    constructor(opt: PolygonOptions);
    // 设置多边形轮廓线节点数组，当为“环”多边形时，path为二维数组，数组元素为多边形轮廓线的节点坐标数组
    setPath(path: Array<LngLat> | Array<Array<LngLat>>): void;
    // 获取多边形轮廓线节点数组。其中lat和lng是经纬度参数。
    getPath(): Array<LngLat>;
    // 修改多边形属性（样式风格，包括组成多边形轮廓线的节点、轮廓线样式等。属性详情参看PolygonOptions列表）
    setOptions(opt: PolygonOptions): void;
    // 获取多边形的属性
    getOptions(): object;
    // 获取当前多边形的矩形范围对象。 （自v1.2 新增）
    getBounds(): Bounds;
    // 获取多边形的面积（单位：平方米） （自v1.1 新增）
    getArea(): number;
    // 隐藏多边形
    hide(): void;
    // 显示多边形
    show(): void;
    // 在指定地图上显示当前的多边形。参数取值为null时，在地图上移除当前多边形 （自v1.2 新增）
    setMap(map: Map): void;
    // 设置用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
    setExtData(ext: any): void;
    // 获取用户自定义属性
    getExtData(): any;
    // 判断指定点坐标是否在多边形范围内
    contains(point: LngLat): boolean;
  }

  // GeoJSON类，继承自OverLayGroup，可实现GeoJSON对象与OverlayGroup的相互转换，(v1.4.2新增)
  interface GeoJSONOptions {
    // 要加载的标准GeoJSON对象
    geoJSON: object;
    // 指定点要素的绘制方式，缺省时为Marker的默认样式。
    // geojson为当前要素对应的GeoJSON对象，lnglat为对应的点的位置
    getMarker?: Function; //(geojson: object, lnglat: AMap.LngLat): AMap.Marker;
    // 指定线要素的绘制方式，缺省时为Polyline的默认样式。
    // geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
    getPolyline?: Function; //(geojson: object, lnglats: AMap.LngLat[]): AMap.Polyline;
    // 指定面要素的绘制方式，缺省时为Polygon的默认样式。
    // geojson为当前要素对应的GeoJSON对象，lnglats为对应的面的路径
    getPolygon?: Function; //(geojson: object, lnglats: AMap.LngLat[]): AMap.Polygon
  }

  // OverlayGroup类用来包装其它覆盖物类的实例，对实例集合做整体操作，避免开发者对多个需要设置同样属性的覆盖物实例做循环处理。同时只要对OverlayGroup执行过setMap方法后，新添加到该OverlayGroup中的覆盖物会自动将其map属性修改到该group对应的map，此外从group中移除该覆盖物时，也会将该覆盖物从group对应的map中移除。
  // 目前OverlayGroup支持Marker, Polygon, Polyline, Circle, Rectangle, Ellipse 和 BezierCurve。
  class OverlayGroup {
    // 添加单个覆盖物到集合中，不支持添加重复的覆盖物
    addOverlay(overlay: Overlay): void;
    // 添加覆盖物数组到集合中，不支持添加重复的覆盖物
    addOverlays(overlays: Array<Overlay>): void;
    // 返回当前集合中所有的覆盖物
    getOverlays(): Array<Overlay>;
    // 判断传入的覆盖物实例是否在集合中
    hasOverlay(overlay: Overlay): boolean;
    // 从集合中删除传入的覆盖物实例
    removeOverlay(overlay: Overlay): void;
    // 从集合中删除传入的覆盖物实例数组
    removeOverlays(overlays: Array<Overlay>): void;
    // 清空集合
    clearOverlays(): void;
    // 对集合中的覆盖物做迭代操作，其中iterator的函数定义是：
    // function(overlay, index, collections)，相关含义如下：
    // overlay: 当前迭代到的覆盖物
    // index: 该覆盖物在集合中的序列号(从0开始)
    // collections: 所有覆盖物实例
    eachOverlay(iterator: Function): void;
    // 指定集合中里覆盖物的显示地图
    setMap(map: Map): boolean;
    // 修改覆盖物属性(包括线样式、样色等等)
    setOptions(opt: OverlayOptions): void;
    // 在地图上显示集合中覆盖物
    show(): void;
    // 在地图上隐藏集合中覆盖物
    hide(): void;
  }
  // GeoJSON类，继承自OverLayGroup，可实现GeoJSON对象与OverlayGroup的相互转换，(v1.4.2新增)
  class GeoJSON extends OverlayGroup {
    // 创建一个GeoJSON对象，ops为初始构造参数
    constructor(ops: GeoJSONOptions);

    // 加载新的GeoJSON对象，转化为覆盖物，旧的覆盖物将移除
    importData(object: object): void;
    // 将当前对象包含的覆盖物转换为GeoJSON对象
    toGeoJSON(): object;
    // 添加一个覆盖物，如需要在转成GeoJSON的时候将某些信息带给对应GeoJSON对象的properties属性中，可以将信息添加到覆盖物的extData的_geoJsonProperties字段中，如:
    //     var marker = new AMap.Marker({
    //           position:[116,39],
    //           extData:{_geoJsonProperties:{
    //                        name:'marker1',
    //                        icon:'xx.png',
    //                        }
    //                   }，
    //           });
    //     geojson.addOverlay(marker);
    addOverlay(overlay: Overlay): void;
    // 添加多个覆盖物，说明同addOverlay
    addOverlays(overlays: Array<Overlay>): void;
    // 获取所有覆盖物
    getOverlays(): Array<Overlay>;
    // 是否包含某个覆盖物
    hasOverlay(overlay: Overlay): boolean;
    // 移除一个覆盖物
    removeOverlay(overlay: Overlay): void;
    // 移除多个覆盖物
    removeOverlays(overlays: Array<Overlay>): void;
    // 清空覆盖物
    clearOverlays(): void;
    // 遍历覆盖物
    eachOverlay(iterator: Function): void;
    // 设置地图
    setMap(map: Map): boolean;
    // 显示所有覆盖物
    show(): void;
    // 隐藏所有覆盖物
    hide(): void;
  }

  interface ContextMenuOptions {
    isCustom?: boolean;
    // 右键菜单显示的位置 （自v1.2 废弃）
    position?: LngLat;
    // 右键菜单内容（针对自定义菜单时，添加菜单内容及功能。可以是HTML要素字符串或者HTML DOM对象。）
    content?: string | HTMLElement;
    // 右键菜单宽度 （自v1.2 废弃）
    width?: number;
  }
  // 右键菜单对象
  class ContextMenu extends EventHandle<'open' | 'close'> {
    // 构造一个右键菜单对象
    constructor(opt?: ContextMenuOptions);
    // 右键菜单中添加菜单项。参数text: 菜单显示内容；fn：该菜单下需进行的操作；num：当前菜单项在右键菜单中的排序位置，以0开始
    addItem(text: string, fn: Function, num: number): void;
    // 删除一个菜单项
    removeItem(text: string, fn: Function): void;
    // 在地图的指定位置打开右键菜单。
    open(map: Map, position: LngLat): void;
    // 关闭右键菜单
    close(): void;
  }

  //#region LabelMarker

  interface LabelMarkerOptions {
    // 标注的位置
    position?: string | Array<number> | LngLat;
    // 标注显示级别范围， 可选值：[3,20]
    zooms?: Array<number>;
    // 标注透明度
    opacity?: number;
    // 标注叠加顺序
    zIndex?: number;

    // 用于避让优先级，数字越大优先级越高，默认值为 1
    rank?: number;

    // 该标注的名称，用于标识，非用于显示
    name?: string;

    title?: string;

    // 配置标注中的图标，Object 取值请参见下方 LabelMarkerIconOptions
    icon?: LabelMarkerIconOptions;
    // 配置标注中的文字，Object 取值请参见下方 LabelMarkerTextOptions
    text?: LabelMarkerTextOptions;
    extData?: any;
  }
  interface LabelMarkerIconOptions {
    // 图标地址
    image?: string;
    // 图标大小，默认值：[36, 36]
    size?: Size | number[];
    // 图标所用图片偏移量
    clipOrigin?: Array<number> | Pixel;
    // 图标锚点。 可选值： 'top-left'| 'top-center'| 'top-right'| 'middle-left'| 'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right' 。默认值：'top-left'
    anchor?: string;
    // 高清屏支持，默认值： true
    retina?: boolean;
  }
  interface LabelMarkerTextOptions {
    // 文字内容
    content?: string;
    // 相对于图标的方位。 可选值： 'top' 'right' 'bottom' 'left' 'center' 。默认值：'top'
    direction?: string;
    // 相对 direction 的位置偏移
    offset?: Array<number> | Pixel;
    // 文字显示范围，可选值：[3,20]
    zooms?: Array<number>;
    // 文字样式，Object 取值见下方 StyleOptions
    style?: LabelMarkerTextStyleOptions;
  }
  interface LabelMarkerTextStyleOptions {
    // 文字大小，默认值：12
    fontSize?: number;
    // 文字字体 （2D）
    fontFamily?: string;
    // 文字粗细。 可选值： 'normal'| 'lighter'| 'bold' 。默认值：'normal'	（2D）
    fontWeight?: string;
    // 文字颜色
    fillColor?: string;
    // 文字描边颜色
    strokeColor?: string;
    // 文字描边宽度，注：只有描边颜色没有描边宽度时，默认描边宽度为 1
    strokeWidth?: number;
    // 文字 padding 支持以下几种格式：'5' | '5 10' | '5 10 20' | '5 10 5 10' | [5] | [5, 10] | [5, 10, 5] | [5, 10, 5, 10] 默认值为 [3, 3, 3, 3]
    padding?: string | Array<number>;
    // 文字背景颜色
    backgroundColor?: string;
  }

  type LabelMarkerEventArgs = {
    type: any;
    target: any;
    data: any;
    lnglat: LngLat;
    pixel: Pixel;
  };

  class LabelMarker extends EventHandle<
    | 'dblclick'
    | 'click'
    | 'rightclick'
    | 'mouseover'
    | 'mousemove'
    | 'mouseout'
    | 'mousedown'
    | 'mouseup'
    | 'touchstart'
    | 'touchend'
  > {
    constructor(opts: LabelMarkerOptions);
    id: string;
    // 取标注位置
    getPosition(): LngLat;
    // 设置标注位置
    setPosition(position: LngLat | Array<number> | string): void;
    // 获取标注 name 字段
    getName(): string;

    // 设置标注 name 字段
    setName(name: string): void;

    // 获取 LabelMarker 的叠加顺序
    getzIndex(): number;

    // 设置 LabelMarker 的叠加顺序
    setzIndex(zIndex: number): void;

    // 获取显示级别范围
    getZooms(): Array<number>;
    // 设置显示级别范围
    setZooms(zooms: Array<number>): void;
    // 获取透明度
    getOpacity(): number;
    // 设置透明度
    setOpacity(opacity: number): void;
    // 获取该标注的避让优先级
    getRank(): number;

    // 设置该标注的避让优先级
    setRank(rank: number): void;

    // 获得文字样式和内容
    getText(): TextOptions;

    // 设置文字样式和内容
    setText(text: TextOptions): void;
    // 获取图标样式
    getIcon(): LabelMarkerIconOptions;
    // 设置图标样式
    setIcon(icon: LabelMarkerIconOptions): void;
    // 获取该标注是否可见
    getVisible(): boolean;

    // 是否置顶该标注
    setTop(isTop: boolean): void;

    // 获取该标注用户自定义数据
    getExtData(): any;

    // 设置该标注用户自定义数据，可为任意类型
    setExtData(data: any): void;

    // 获取该标注的所有属性
    getOptions(): LabelMarkerOptions;

    // 显示标注
    show(): void;

    // 隐藏标注
    hide(): void;
  }
  interface CircleMarkerOptions {
    center?: LngLatNum;
    radius?: number;
    zIndex?: number;
    bubble?: boolean;
    cursor?: string;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    draggable?: boolean;
    extData?: object;
  }
  class CircleMarker extends Overlay {
    constructor(opts: CircleMarkerOptions);
    hide(): void;
    show(): void;
    setRadius(radius: number): void;
    getRadius(): number;
    getCenter(): LngLatNum;
    contains(point: any): boolean;
    setMap(map: Map | null): void;
  }
  interface CircleOptions {
    map?: Map;
    center?: LngLatNum;
    radius?: number;
    zIndex?: number;
    bubble?: boolean;
    cursor?: string;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    strokeDasharray?: number[];
    fillColor?: string;
    fillOpacity?: number;
    draggable?: boolean;
    extData?: object;
    noSelect?: boolean;
    borderWeight?: number;
    strokeStyle?: string;
  }
  class Circle extends Overlay {
    constructor(opts?: CircleOptions);
    hide(): void;
    show(): void;
    setRadius(radius: number): void;
    setCenter(value: LngLatNum): void;
    getRadius(): number;
    getCenter(): LngLatNum;
    contains(point: any): boolean;
    setMap(map: Map | null): void;
  }

  //#endregion
}
