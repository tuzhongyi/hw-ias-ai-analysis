declare namespace AMap {
    namespace Lights {
        class AmbientLight {
            constructor(color: number[], intensity: number);
            // 修改光照的颜色。color用来描述光照的颜色，为一个三个元素的数组，
            // 每个元素代表RGB的三个分量，每个分量的取值范围[0,1]；
            setColor(color: number[]): void;

            // 修改光照的强度，intensity用来描述光照强度，取值范围[0,1]；
            setIntensity(intensity: number): void;
        }
        class DirectionLight {
            constructor(direction: number[], color: number[], intensity: number);
            // 修改光照的颜色。color用来描述光照的颜色，为一个三个元素的数组，
            // 每个元素代表RGB的三个分量，每个分量的取值范围[0,1]；
            setColor(color: number[]): void;
            // 修改光照的强度，intensity用来描述光照强度，取值范围[0,1]；
            setIntensity(intensity: number): void;
            // 修改光照的照射方向
            setDirection(direction: number[]): void;
        }
    }
    namespace Object3D {
        // 描述Points的几何信息的对象，只读，修改其属性来描述Points的几何信息
        interface PointsGeometry {
            // 一维数组，每三个元素描述一个顶点的xyz信息，只可修改元素，不可直接赋值	
            vertices: Array<number>;
            // "一维数组，每四个元素描述一个顶点颜色的RGBA分量信息，所有分量取值范围[0,1]，
            // 只可修改元素的值，不可直接赋值"	
            vertexColors: Array<number>;
            // 一维数组，每一个元素描述一个点的大小	
            pointSizes: Array<number>;
            // "一维数组，每四个元素描述一个点的有效区域，纹理、颜色、边框等样式将仅在此有效区域内生效
            // 四个元素分别代表left、top、width、height与Size的比值，取值范围[0,1]
            // 不设置的时候有效区域为整个点的正方形范围。"	
            pointAreas: Array<number>;
            // 一维数组，每四个元素描述一个圆点有效区域的左上角和右下角的纹理坐标信息	
            vertexUVs: Array<number>;
            // "一维数组，每个元素描述一个点的纹理索引信息，多纹理时使用，取值范围[0-7]。
            // 单纹理或者无纹理时不需要设值。只可修改元素，不可直接赋值"	
            textureIndices: Array<number>;
        }
        // 描述Points的几何信息的对象，只读，修改其属性来描述Points的几何信息
        interface RoundPointsGeometry {
            // 一维数组，每三个元素描述一个顶点的xyz信息，只可修改元素，不可直接赋值	
            vertices: Array<number>;
            // "一维数组，每四个元素描述一个顶点颜色的RGBA分量信息，所有分量取值范围[0,1]，
            // 只可修改元素的值，不可直接赋值"	
            vertexColors: Array<number>;

            // 一维数组，每一个元素描述一个点的大小	
            pointSizes: Array<number>;
            // 一维数组，每四个元素描述一个圆点的左上角和右下角的纹理坐标信息	
            vertexUVs: Array<number>;
            // "一维数组，每个元素描述一个点的纹理索引信息，多纹理时使用，取值范围[0-7]。
            // 单纹理或者无纹理时不需要设值。只可修改元素，不可直接赋值"	
            textureIndices(): Array<number>;


        }
        // 点阵，用于创建一堆点，基于webgl的POINT图元绘制
        class Points extends Object3D {
            // 创建一个Points对象，可展示一组方点
            constructor();
            // 描述Points的几何信息的对象，只读，修改其属性来描述Points的几何信息	
            geometry: PointsGeometry
            // 给点设置纹理贴图，数组中可以放入图片url和canvas对象，宽高需要为 2的n次方 乘 2的m次方	
            textures: Array<string>
            // 当修改了geometry信息或者textures之后设置为true，同时调用本实例的reDraw方法使修改生效	
            needUpdate: boolean;
            // 表示是否使用了透明颜色，并进行颜色混合	
            transparent: boolean;
            // 表示绘制当前对象时是否需要开启深度检测	
            DEPTH_TEST: boolean;
            // 点的边框颜色，诸如 [0.6, 0.8, 1, 1]的rgba数组格式	
            borderColor: Array<number> | string;
            // 点的边框宽度，单位px	
            borderWeight: Number;
        }


        // 点阵，用于创建一堆圆点，基于webgl的POINT图元绘制
        class RoundPoints extends Object3D {
            // 创建一个RoundPoints对象，可展示一组圆点
            constructor();
            // 描述Points的几何信息的对象，只读，修改其属性来描述Points的几何信息	
            geometry: RoundPointsGeometry;
            // 给点设置纹理贴图，数组中可以放入图片url和canvas对象，宽高需要为 2的n次方 乘 2的m次方	
            textures: Array<any>;
            // 当修改了geometry信息或者textures之后设置为true，同时调用本实例的reDraw方法使修改生效	
            needUpdate: boolean;
            // 表示是否使用了透明颜色，并进行颜色混合	
            transparent: boolean;
            // 表示绘制当前对象时是否需要开启深度检测	
            DEPTH_TEST: boolean;
            // 点的边框颜色，诸如 [0.6, 0.8, 1, 1]的rgba数组格式	
            borderColor: Array<number> | string;
            // 点的边框宽度，单位px	
            borderWeight: number;
        }

        class Mesh extends Object3D {
            // 描述mesh的几何信息的对象，只读，修改其属性来描述mesh的几何信息	
            geometry: MeshGeometry
            // 给Mesh设置纹理贴图，数组中可以放入图片url和canvas对象，宽高需要为 2的n次方 乘 2的m次方	
            textures: Array<any>
            // 当修改了geometry信息或者textures之后设置为true，同时调用本实例的reDraw方法使修改生效	
            needUpdate: Boolean
            // 表示是否使用了透明颜色，并进行颜色混合	
            transparent: Boolean
            // 表示绘制当前对象时是否需要开启深度检测	
            DEPTH_TEST: Boolean
           

            backOrFront: 'back' | 'front' | 'both'

        }

    }



    class Object3D extends Overlay {
        map: Map;
        zIndex: number;
        opacity: number;

         // 当修改了geometry信息或者textures之后设置needUpdate为true，同时调用该方法使修改生效	
         reDraw(): void;
    }


    class Object3DLayer {
        // 用于获取该图层内的所有Object3D对象，只读，请勿修改
        objects: Object3D[];
        // 添加一个Object3D实例到图层
        add(object3d: Object3D): void;
        // 从图层删除一个Object3D实例
        remove(object3d: Object3D): void;
        // 清楚所有Object3D实例
        clear(): void;
        // 重绘，在修改了Object3D实例的数据属性，或者地图的光照信息之后调用，可使变更生效。	
        reDraw(): void;

    }

    interface Map3DOptions {

        // 在MapOptions中设置地图的倾角，0-83	
        pitch?: number;

        // 在MapOptions中设置地图的最大倾角	
        maxPitch?: number;
        // 在MapOptions中设置地图的旋转角度	
        rotation?: number;
    }

    class Map3D extends EventHandle<"complete" | "click" | "dblclick" | "mapmove" | "hotspotclick" | "hotspotover" | "hotspotout" | "movestart" | "moveend" | "zoomchange" | "zoomstart" | "zoomend" | "mousemove" | "mousewheel" | "mouseover" | "mouseout" | "mouseup" | "mousedown" | "rightclick" | "dragstart" | "dragging" | "dragend" | "resize" | "touchstart" | "touchmove" | "touchend">{

        // "在MapOptions中设置，可选值有'3D'、'2D'，缺省为'2D'，
        // 设置为3D时将在webgl环境满足条件的的浏览器中显示为三维地图"	
        viewMode: '3D' | '2D';

        // 在MapOptions中设置地图的倾角，0-83	
        pitch: number;
        // 在MapOptions中设置地图的最大倾角	
        maxPitch: number;
        // 在MapOptions中设置地图的旋转角度	
        rotation: number;
        // "用于设置地图的默认环境光源，仅会作用于MeshAcceptLights和Prism和室内地图，
        // 需在Map初始化之后设置，如
        // map.AmbientLight = new AMap.Lights.AmbientLight([1,1,1],0.4);"	
        AmbientLight: Lights.AmbientLight;

        // "用于设置地图的平行光源，仅会作用于MeshAcceptLights和Prism和室内地图，
        // 需在Map初始化之后设置，如：
        // map.DirectionLight = new AMap.Lights.DirectionLight([1,0,1],[1,1,1],0.6);"	
        DirectionLight: Lights.DirectionLight;

        // 获取当前地图的实际视图模式，地图显示为3D是返回'3D'，否则返会'2D'	
        getViewMode_(): string;
        // 用于拾取，获取多个Object3DLayer中处于屏幕某个位置下的的Object3D对象或集合。	
        // pixel为屏幕像素坐标的AMap.Pixel对象；		
        // layers为Object3DLayer的数组，可缺省，缺省时将在所有Object3DLayer中进行拾取；		
        // all为Bool型，表示是否返回所有图层中被拾取到的对象，true的时候将返回拾取到的每个Object3DLayer处于最前面的Object3D对象；缺省为false，将只返回所有图层中处于最前面的Object3D对象的信息。每个信息中包括如下字段：		
        // {		
        // object://被拾取到的Object3D对象		
        // index://射线穿透的三角形面在当前mesh所有面上的索引		
        // point://被拾取到的对象和拾取射线的交叉点的3D坐标		
        // distance://交叉点距透视原点的距离		
        // }		
        getObject3DByContainerPos(pixel: Pixel, layers: Object3DLayer[], all: boolean): Array<getObject3DByContainerPosResult>
        // 将经纬度转换为三维坐标系下的xy坐标	
        lngLatToGeodeticCoord(lnglat: LngLat): Pixel
        // 将三维坐标系下的xy坐标转换为经纬度	
        geodeticCoordToLngLat(pixel: Pixel): LngLat
    }

    interface getObject3DByContainerPosResult {//被拾取到的Object3D对象		
        object: Object3D;
        //射线穿透的三角形面在当前mesh所有面上的索引		
        index: number;
        //被拾取到的对象和拾取射线的交叉点的3D坐标		
        point: Array<number>
        //交叉点距透视原点的距离	
        distance: number
    }

    interface MeshGeometry {
        // 一维数据，每三个元素描述一个顶点的xyz信息，只可修改元素，不可直接赋值	
        vertices: Array<number>;
        // 一维数据，每四个元素描述一个顶点颜色的RGBA分量信息，所有分量取值范围[0,1]，只可修改元素的值，不可直接赋值	
        vertexColors: Array<number>;
        // 一维数据，每两个元素描述一个顶点的纹理坐标信息，纹理坐标以图片左上角为原点。只可修改元素，不可直接赋值	
        vertexUVs: Array<number>;
        // 一维数据，每三个元素描述一个面的信息，每个元素分别为构成面的顶点的索引值，如不想使用ELEMENT_ARRAY_BUFFER方式，可不设值，此时其他数组按面依次设值即可。 只可修改元素，不可直接赋值	
        faces: Array<number>;
        // 一维数据，每个元素描述一个顶点的纹理索引信息，多纹理时使用，取值范围[0-7]。单纹理或者无纹理时不需要设值。只可修改元素，不可直接赋值	
        textureIndices: Array<number>;


    }

}