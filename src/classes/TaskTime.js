import {
  addDays, differenceInDays, format, subDays,
} from 'date-fns';

class TaskTime {
  constructor(time, localTime) {
    this.endDateLocked = false;
    this.endingDate = time ? time.endDate : '';
    this.initDateLocked = false;
    this.initialDate = time ? time.initDate : '';
    this.taskDuration = time ? time.duration : 0;
    this.withHours = !!localTime;
  }

  get endDate() {
    if (this.endingDate) {
      return TaskTime.formatDate.call(this, this.endingDate);
    }
    return null;
  }

  get duration() {
    return this.taskDuration;
  }

  get initDate() {
    if (this.initialDate) {
      return TaskTime.formatDate.call(this, this.initialDate);
    }
    return null;
  }

  /**
   * @param {Date} date - Fecha en formato yyyy-mm-dd
  */
  static absTime(date) {
    const [y, m, d] = date.split('-');
    const Y = Number(y);
    const M = Number(m) - 1;
    const D = Number(d);
    const now = new Date(Date.now());
    const h = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const g = new Date(Y, M, D, h, min, sec);
    return g;
  }

  static formatDate(date, especFormat) {
    const formatLocal = "yyyy-MM-dd'T'HH:mm";
    const noHoursDate = 'yyyy-MM-dd';
    let formating = this.withHours ? formatLocal : noHoursDate;
    formating = especFormat || formating;
    return format(new Date(date), formating);
  }

  static isAbsDate(date) {
    const reg = /[0-9]T[0-9]/g.test(date);
    return reg || date instanceof Date;
  }

  static isDecimal(number) {
    const isNumber = typeof number === 'number';
    const [int, dec] = isNumber ? String(number).split('.') : number.split('.');
    console.log(int, dec);
  }

  setDuration(val) {
    this.taskDuration = Number(val) || 0;
    const {
      endingDate, initialDate, initDateLocked, endDateLocked,
    } = this;
    /**
     * Si Fecha inicial está bloqueada y existe
     * y si fecha final está desbloqueada, actualizo fecha final
     */
    if (initDateLocked && initialDate && !endDateLocked) {
      this.updateEndDate();
    /**
     * Si fecha final está bloqueada y existe
     * y si fecha inicial está desbloqueada, calculo fecha inicial
     */
    } else if (endDateLocked && endingDate && !initDateLocked) {
      this.updateInitDate();
    /**
     * Si ambas fechas existen pero están desbloqueadas, actualizo fecha final
     */
    } else if (endingDate && initialDate) {
      this.updateEndDate();
    }
  }

  setEndDate(date) {
    this.endingDate = TaskTime.isAbsDate(date) ? new Date(date) : TaskTime.absTime(date);
    /**
     * Si la fecha inicial existe y está bloqueada, actualizo duración
     */
    if (this.initialDate && this.initDateLocked) {
      this.updateDuration();
    /**
     * Si Fecha inicial existe y la duración no, calculo duración
     */
    } else if (this.initialDate && !this.duration) {
      this.updateDuration();
    /**
     * Si la fecha inicial existe la actualizo
     */
    } else if (this.initialDate) {
      this.updateInitDate();
    }
  }

  setDateTimeLocal(flag) {
    this.withHours = flag;
  }

  setInitDate(date) {
    this.initialDate = TaskTime.isAbsDate(date) ? new Date(date) : TaskTime.absTime(date);
    /**
     * Si la fecha final existe y está bloqueada, actualizo duración
     */
    if (this.endingDate && this.endDateLocked) {
      this.updateDuration();
      /**
       * Si Fecha final existe y la duración no, calculo duración
       */
    } else if (this.endingDate && !this.duration) {
      this.updateDuration();
    /**
     * Si la fecha final existe la actualizo
     */
    } else if (this.endingDate) {
      this.updateEndDate();
    }
  }

  setLockInitDate(flagLock) {
    this.initDateLocked = flagLock;
  }

  setLockEndDate(flagLock) {
    this.endDateLocked = flagLock;
  }

  updateDuration() {
    if (this.initialDate && this.endingDate) {
      const initialDate = this.withHours ? this.initialDate : TaskTime.formatDate(this.initialDate);
      const endingDate = this.withHours ? this.endingDate : TaskTime.formatDate(this.endingDate);
      const diff = differenceInDays(new Date(endingDate), new Date(initialDate));
      this.setDuration(diff);
    }
  }

  updateEndDate() {
    const eDate = addDays(this.initialDate, this.duration);
    this.endingDate = eDate;
  }

  updateInitDate() {
    const iDate = subDays(this.endingDate, this.duration);
    this.initialDate = iDate;
  }
}
export default TaskTime;
