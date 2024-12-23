/**
 * 0 or 'hour' for the hour view
 * 1 or 'day' for the day view
 * 2 or 'month' for month view (the default)
 * 3 or 'year' for the 12-month overview
 * 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.
 */
export enum DateTimePickerView {
  /** 0 or 'hour' for the hour view */
  hour = 0,
  /** 1 or 'day' for the day view */
  day = 1,
  /** 2 or 'month' for month view (the default) */
  month = 2,
  /** 3 or 'year' for the 12-month overview */
  year = 3,
  /** 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers. */
  decade = 4,
}

export class DateTimePickerConfig {
  constructor(
    opts: {
      view?: DateTimePickerView
      week?: boolean
      format?: string
    } = {}
  ) {
    if (opts.format) {
      this.format = opts.format
    }
    if (opts.view !== undefined) {
      this.view = opts.view
    }
    if (opts.week !== undefined) {
      this.week = opts.week
    }
  }
  view: DateTimePickerView = DateTimePickerView.month
  week = false
  format = 'yyyy-MM-dd'
}
