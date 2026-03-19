export class SystemStatisticRoadObjectMapStateItem {
  color = { R: 255, G: 255, B: 255 };
  name = '';
  value = 0;
  icon = '';
  type!: number;
}

export class SystemStatisticRoadObjectMapStateColor {
  constructor(private selected: boolean) {}
  color = {
    R: 255,
    G: 255,
    B: 255,
  };
  get border() {
    return `rgba(${this.color.R},${this.color.G},${this.color.B},${
      this.selected ? 1 : 0.25
    })`;
  }
  get background() {
    return this.selected
      ? `rgba(${this.color.R},${this.color.G},${this.color.B},0.094)`
      : '';
  }
  none = 'none';
  get shadow() {
    let value = `rgba(${this.color.R},${this.color.G},${this.color.B},0.19) 0px 0px 16px, rgba(${this.color.R},${this.color.G},${this.color.B},0.063) 0px 0px 10px inset`;

    return value;
    // return this.selected
    //   ? `rgba(${this.color.R}
    //     ,${this.color.G}
    //     ,${this.color.B}
    //     ,0.19
    //     ,) 0px 0px 16px, rgba(
    //     ${this.color.R}
    //     ,${this.color.G}
    //     ,${this.color.B}
    //     ,0.063) 0px 0px 10px inset`
    //   : 'none';
  }

  get line() {
    return {
      background: `rgba(${this.color.R},${this.color.G},${this.color.B},1)`,
      shadow: `rgba(${this.color.R},${this.color.G},${this.color.B},0.533) 0px 0px 6px`,
    };
  }

  get icon() {
    return {
      background: `rgba(${this.color.R},${this.color.G},${this.color.B},${
        this.selected ? 0.2 : 0.133
      })`,
      text: `rgba(${this.color.R},${this.color.G},${this.color.B},1)`,
    };
  }
  get name() {
    return `rgba(${this.color.R},${this.color.G},${this.color.B},0.6)`;
  }
  get value() {
    return `rgba(${this.color.R},${this.color.G},${this.color.B},1)`;
  }
}
