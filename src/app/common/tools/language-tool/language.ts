import { ShopStatisticStatus } from '../../../html/ias/system/system-task/system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { ResultLabelType } from '../../data-core/enums/analysis/result-label-type.enum';
import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum';
import { DeviceProtocolType } from '../../data-core/enums/device-protocol-type.enum';
import { FrpInfoState } from '../../data-core/enums/frp-info/frp-info-state.enum';
import { IOState } from '../../data-core/enums/io/io-state.enum';
import { LensType } from '../../data-core/enums/lens-type.enum';
import { ProcessState } from '../../data-core/enums/process-state.enum';
import { ProxyChannelState } from '../../data-core/enums/proxy-channel-state.enum';
import { CoverState } from '../../data-core/enums/robot/cover-state.enum';
import { MajorType } from '../../data-core/enums/robot/major-type.enum';
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model';
import { RobotBatteryState } from '../../data-core/enums/robot/robot-battery-state.enum';
import { CanType } from '../../data-core/enums/robot/robot-can-type.model';
import { RobotState } from '../../data-core/enums/robot/robot-state.enum';

export class Language {
  static Year = 'yyyy年';
  static Month = 'MM月';
  static Day = 'dd日';

  static yyyy = 'yyyy';
  static MM = 'MM';
  static dd = 'dd';

  static HH = "HH'";
  static mm = 'mm';
  static ss = 'ss';

  static HHmmss = `${this.HH}:${this.mm}:${this.ss}`;
  static HHmm = `${this.HH}:${this.mm}`;
  static HHmm_ = `${this.HHmm}'`;

  static yyyyMMdd = `${this.yyyy}-${this.MM}-${this.dd}`;
  static yyyyMMddHHmmss = `${this.yyyyMMdd} ${this.HHmmss}`;
  static yyyyMMddHHmm = `${this.yyyyMMdd} ${this.HHmm_}`;

  static YearMonthDay = `${this.Year}${this.Month}${this.Day}`;
  static MonthDay = `${this.Month}${this.Day}`;

  static YearMonthDayHHmmss = `${this.YearMonthDay} ${this.HHmmss}`;
  static MonthDayHHmmss = `${this.MonthDay} ${this.HHmmss}`;

  static ChannelPositionNo(value?: number, def = '未知') {
    if (value === undefined) return def;
    if (1 <= value && value <= 10) {
      return '舱外';
    } else if (11 <= value && value <= 20) {
      return '舱内';
    } else if (21 <= value && value <= 30) {
      return '红外';
    } else {
      return def;
    }
  }

  static ProxyChannelState(value?: ProxyChannelState, def = '未知') {
    switch (value) {
      case ProxyChannelState.Locked:
        return '用户锁定';
      case ProxyChannelState.Offline:
        return '离线';
      case ProxyChannelState.Online:
        return '在线';
      default:
        return def;
    }
  }
  static DeviceProtocolType(value?: DeviceProtocolType, def = '未知') {
    switch (value) {
      case DeviceProtocolType.Howell8000:
        return DeviceProtocolType.Howell8000;
      case DeviceProtocolType.Onvif:
        return DeviceProtocolType.Onvif;

      default:
        return def;
    }
  }
  static MeshNodeType(type?: MeshNodeType, def = '未知') {
    switch (type) {
      case MeshNodeType.ChargingPort:
        return '充电口';
      case MeshNodeType.DropPort:
        return '投放口';
      case MeshNodeType.MagneticPin:
        return '磁钉';
      case MeshNodeType.StorePort:
        return '存放口';
      case MeshNodeType.Other:
        return '其他';
      default:
        return def;
    }
  }

  static CanType(type?: CanType, def = '未知') {
    switch (type) {
      case CanType.Dry:
        return '干垃圾';
      case CanType.Wet:
        return '湿垃圾';
      case CanType.Recycle:
        return '可回收垃圾';
      case CanType.Hazard:
        return '有害垃圾';

      default:
        return def;
    }
  }
  static RobotBatteryState(value?: RobotBatteryState, def = '未知') {
    switch (value) {
      case RobotBatteryState.Normal:
        return '正常';
      case RobotBatteryState.Charging:
        return '充电中';
      case RobotBatteryState.Unable:
        return '无法充电';
      case RobotBatteryState.UnderVoltage:
        return '欠压、亏电';

      default:
        return def;
    }
  }
  static RobotState(value?: RobotState, def = '未知') {
    switch (value) {
      case RobotState.None:
        return '正常';
      case RobotState.Busy:
        return '繁忙';
      case RobotState.Charging:
        return '充电';
      case RobotState.LoBAT:
        return '低电量';
      case RobotState.Error:
        return '故障';
      case RobotState.Upgrading:
        return '升级中';
      case RobotState.Offline:
        return '信号丢失';
      default:
        return def;
    }
  }

  static CalibrationAreaType(value?: CalibrationAreaType, def = '未知') {
    switch (value) {
      case CalibrationAreaType.Ground:
        return '地面区域';
      case CalibrationAreaType.DropPort:
        return '投放口';
      case CalibrationAreaType.StorePort:
        return '存桶区';
      default:
        return def;
    }
  }
  static CameraAIModelDTOModelType(value?: number, def = '未知') {
    switch (value) {
      case 1:
        return '检测数据';
      case 2:
        return '分类数据';
      default:
        return def;
    }
  }
  static CoverState(value?: CoverState, def = '未知') {
    switch (value) {
      case CoverState.Opened:
        return '打开';
      case CoverState.Closed:
        return '关闭';
      case CoverState.HalfOpen:
        return '半开';

      default:
        return def;
    }
  }

  static StreamType(value?: number, def = '未知') {
    switch (value) {
      case 1:
        return '主码流';
      case 2:
        return '子码流';
      default:
        return def;
    }
  }
  static DeviceType(value?: number, def = '未知') {
    switch (value) {
      case 1:
        return '摄像机';
      default:
        return def;
    }
  }
  static ProcessState(state?: ProcessState, def = '未知') {
    switch (state) {
      case ProcessState.R:
        return '运行中';
      case ProcessState.D:
        return '不可中断睡眠';
      case ProcessState.S:
        return '可中断睡眠';
      case ProcessState.T:
        return '已停止';
      case ProcessState.Z:
        return '僵尸';
      default:
        return def;
    }
  }
  static LensType(type?: LensType, def = '未知') {
    switch (type) {
      case LensType.M28:
        return '2.8 毫米';
      case LensType.M40:
        return '4.0 毫米';

      default:
        return def;
    }
  }

  static MajorType(value?: MajorType, def = '未知') {
    switch (value) {
      case MajorType.Alarm:
        return '报警';
      case MajorType.Operation:
        return '操作';
      case MajorType.Error:
        return '异常';
      case MajorType.Info:
        return '信息';
      default:
        return def;
    }
  }

  static Time(time: number = 0, unit: 'second' | 'minute' = 'second') {
    if (time === 0) return '';
    if (unit === 'second') {
      return this.TimeFromSecond(time);
    } else {
      return this.TimeFromMinute(time);
    }
  }

  private static TimeFromSecond(time?: number) {
    if (time === undefined) return undefined;
    let day = Math.floor(time / 60 / 60 / 24);
    let _time = time - day * 60 * 60 * 24;
    let hour = Math.floor(_time / 60 / 60);
    _time -= hour * 60 * 60;
    let minute = Math.floor(_time / 60);
    _time -= minute * 60;
    let second = Math.floor(_time);
    if (time < 60) {
      return second.toString().padStart(2, '0') + '秒';
    }
    if (time < 60 * 60) {
      return (
        minute.toString().padStart(2, '0') +
        '分钟' +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      );
    }
    if (time < 60 * 60 * 24) {
      return (
        hour.toString().padStart(2, '0') +
        '小时' +
        (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      );
    }
    return (
      day +
      '天' +
      (hour ? hour.toString().padStart(2, '0') + '小时' : '') +
      (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
      (second ? second.toString().padStart(2, '0') + '秒' : '')
    );
  }

  private static TimeFromMinute(time?: number) {
    if (time === undefined) return undefined;
    let day = Math.floor(time / 60 / 24);
    let _time = time - day * 60 * 24;
    let hour = Math.floor(_time / 60);
    _time -= hour * 60;
    let minute = Math.ceil(_time);
    if (time < 60) {
      return minute + '分钟';
    }
    if (time < 60 * 24) {
      return hour + '小时' + (minute ? minute + '分钟' : '');
    }
    return (
      day + '天' + (hour ? hour + '小时' : '') + (minute ? minute + '分钟' : '')
    );
  }

  static YesOrNo(bool?: boolean, def = '未知') {
    switch (bool) {
      case true:
        return '是';
      case false:
        return '否';
      default:
        return def;
    }
  }

  static Uploaded(bool?: boolean, def = '未知') {
    switch (bool) {
      case true:
        return '已上传';
      case false:
        return '未上传';
      default:
        return def;
    }
  }

  static OnlineStatus(status?: number) {
    switch (status) {
      case 0:
        return '在线';
      case 1:
        return '离线';

      default:
        return undefined;
    }
  }
  static OpenOrClose(status?: number) {
    switch (status) {
      case 0:
        return '关闭';
      case 1:
        return '开启';

      default:
        return undefined;
    }
  }
  static NetworkProtocol(value: number) {
    switch (value) {
      case 0:
        return 'TCP';
      case 1:
        return 'UDP';
      default:
        return '';
    }
  }

  static FrpInfoState(value: FrpInfoState, def = '未知') {
    switch (value) {
      case FrpInfoState.offline:
        return '未连接';
      case FrpInfoState.online:
        return '已连接';
      case FrpInfoState.error:
        return '无法连接服务器';
      case FrpInfoState.exist:
        return '指定映射名称已存在';
      default:
        return def;
    }
  }
  static IOState(state?: IOState, def = '未知') {
    switch (state) {
      case IOState.Low:
        return '低电平';
      case IOState.High:
        return '高电平';
      default:
        return def;
    }
  }

  static Enabled(value?: boolean, def = '未知') {
    switch (value) {
      case true:
        return '启用';
      case false:
        return '未启用';
      default:
        return def;
    }
  }

  static Size(value?: number) {
    if (value === undefined) return '未知';
    let _value = value / 1024;
    if (_value < 1) {
      return `${value.toFixed(2)}byte`;
    }
    _value = _value / 1024;
    if (_value < 1) {
      return `${(Math.round((value / 1024) * 100) / 100).toFixed(2)}KB`;
    }
    _value = _value / 1024;
    if (_value < 1) {
      return `${(Math.round((value / 1024 / 1024) * 100) / 100).toFixed(2)}MB`;
    }
    _value = _value / 1024;
    if (_value < 1) {
      return `${(Math.round((value / 1024 / 1024 / 1024) * 100) / 100).toFixed(
        2
      )}GB`;
    }
    _value = _value / 1024;
    if (_value < 1) {
      return `${(
        Math.round((value / 1024 / 1024 / 1024 / 1024) * 100) / 100
      ).toFixed(2)}TB`;
    }
    return `${value.toFixed(2)}byte`;
  }
  static SourceType(value?: number, def = '未知') {
    switch (value) {
      case 0:
        return '视频文件';
      default:
        return def;
    }
  }

  static ResultLabelType(value?: ResultLabelType, def = '未知') {
    switch (value) {
      case ResultLabelType.Unlabeled:
        return '未标注';
      case ResultLabelType.Correct:
        return '正确';
      case ResultLabelType.Incorrect:
        return '错误';
      case ResultLabelType.Illegible:
        return '难以辨认';
      case ResultLabelType.Incomplete:
        return '不完整';
      default:
        return def;
    }
  }

  static AssociationType(value?: number, def = '未知') {
    switch (value) {
      case 1:
        return '误报';
      case 2:
        return '消失';
      case 3:
        return '停业或装修';
      case 4:
        return '恢复营业';
      case 5:
        return '新增屏蔽';
      case 6:
        return '子招牌合并';
      default:
        return def;
    }
  }
  static ShopStatisticStatus(value?: ShopStatisticStatus, def = '未知') {
    switch (value) {
      case ShopStatisticStatus.detected:
        return '已关联';
      case ShopStatisticStatus.discover:
        return '新发现';
      case ShopStatisticStatus.misinfo:
        return '误报/屏蔽';
      default:
        return def;
    }
  }
}
