/**
 * 兜底工具：只有「没人接手」的时候才执行。
 *
 * 典型场景：地图取不到路网数据时，用当前用户所属城市兜底；
 * 但只要还有别的数据（商铺 / 设备 / 部件 / 区域 / 路段 …）接管了视野，
 * 就不该再把地图跳到城市去。
 *
 * 会接管的一方每次定位视野时调 claim()，兜底的一方调 fallback()，
 * 等 hold 毫秒后仍没人 claim 才执行 action。
 */
export class LastResortTool {
  /** 等多久算「没人接手了」——比其它数据的首个请求晚一点即可 */
  static hold = 500;

  private value = false;

  get claimed() {
    return this.value;
  }

  /** 有人接手了 → 兜底作废（一旦 claim 就不会再变回 false） */
  claim() {
    this.value = true;
  }

  /** 等 hold 毫秒，期间没人 claim 才执行 action */
  fallback(action: () => void, hold = LastResortTool.hold) {
    setTimeout(() => {
      if (this.value) {
        return;
      }
      action();
    }, hold);
  }
}
