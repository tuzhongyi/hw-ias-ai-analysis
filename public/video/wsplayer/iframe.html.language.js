class Language {
  static PlayerState (state) {
    switch (state) {
      case 0:
        return "准备";
      case 1:
        return "正在播放";
      case 2:
        return "暂停";
      case 3:
        return "慢放";
      case 4:
        return "快进";
      case 5:
        return "结束";
      case 6:
        return "开场";
      case 7:
        return "结尾";
      case 8:
        return "单帧进";
      case 255:
        return "已关闭";
      default:
        return "未知";
    }
  }
}