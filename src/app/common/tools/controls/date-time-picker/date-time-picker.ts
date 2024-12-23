import { DateTimePickerView } from './date-time-picker.model'
declare var $: any
export class DateTimePicker {
  private ele: HTMLInputElement
  format = 'yyyy-MM-dd'

  // @Input('changeDate') changeDate: (val: any) => void;
  startView: DateTimePickerView = DateTimePickerView.month
  minView: DateTimePickerView = DateTimePickerView.month
  week: boolean = false

  private _date: Date = new Date()
  public get date(): Date {
    return this._date
  }

  public set date(v: Date) {
    this._date = v
    if (this.dateChange) {
      this.dateChange(v)
    }
  }

  dateChange?: (date: Date) => void

  changing = false

  constructor(e: HTMLInputElement) {
    this.ele = e
  }

  init(opts?: {
    startView: number
    minView: number
    format: string
    value: Date
    week?: boolean
  }) {
    let startView = this.startView
    let minView = this.minView
    let format = this.format
    let value = this.date
    let week = this.week

    if (opts) {
      startView = opts.startView
      minView = opts.minView
      format = opts.format
      value = opts.value
      week = opts.week ?? false
    } else {
    }

    $(this.ele).val('')
    $(this.ele).datetimepicker('remove').off('changeDate').off('show')
    if (week) {
      $(this.ele)
        .datetimepicker({
          format: format,
          weekStart: 1,
          autoclose: true,
          startView: startView,
          minView: minView,
          language: 'zh-CN',
          forceParse: false,
          initialDate: value,
        })
        .on('changeDate', (ev: { date: Date }) => {
          this.date = ev.date
          this.changing = true
          const week_ = this.OneWeekDate(ev.date)
          $(this.ele).val(
            `${week_.monday.format('yyyy年MM月dd日')} 至 ${week_.sunday.format(
              'yyyy年MM月dd日'
            )}`
          )
        })
        .on('show', (ev: { date: any }) => {
          const dayDom = $('.datetimepicker-days')
          dayDom.find('.week-tr').removeClass('week-tr')
          dayDom.addClass('week')
          var tbody = dayDom.find('tbody'),
            trs = tbody.find('tr'),
            d = ev.date.format('dd')
          d = parseInt(d) + '' //console.log(d);

          $(trs).each(function (index: number, element: any) {
            var tds = $(element).children()
            $(tds).each(function (i: number, el: any) {
              if (
                $(el).hasClass('old') == false &&
                $(el).hasClass('new') == false &&
                $(el).text() == d
              ) {
                $(el).parent().addClass('week-tr')
              }
            })
          })
        })
      const week_ = this.OneWeekDate(new Date(value))
      $(this.ele).val(
        `${week_.monday.format('yyyy年MM月dd日')} 至 ${week_.sunday.format(
          'yyyy年MM月dd日'
        )}`
      )
    } else {
      $(this.ele)
        .datetimepicker({
          format: format,
          weekStart: 1,
          autoclose: true,
          startView: startView,
          minView: minView,
          language: 'zh-CN',
          forceParse: false,
          initialDate: value,
        })
        .on('changeDate', (ev: { date: Date | undefined }) => {
          if (ev.date) {
            this.date = ev.date
          }
          this.changing = true
        })
        .on('show', (ev: any) => {
          const dayDom = $('.datetimepicker-days')
          dayDom.find('.week-tr').removeClass('week-tr')
        })
      $(this.ele).val(value.format(this.format))
    }
  }

  OneWeekDate(now: Date) {
    var week = now.getDay() //获取时间的星期数
    var minus = week ? week - 1 : 6
    var monday = new Date(now)
    monday.setDate(now.getDate() - minus) //获取minus天前的日期
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    return {
      monday: monday,
      sunday: sunday,
    }
  }
}
