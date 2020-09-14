import { round } from 'functionallibrary';
import {
  addDays, differenceInDays, format, subDays, getTime,
} from 'date-fns';

const twoDecimals = round(2);

class TaskTime {
  constructor(time, localTime) {
    this.endDateLocked = false;
    this.endingDate = time ? time.endDate : '';
    this.endingIsDirty = false;
    this.initDateLocked = false;
    this.initialDate = time ? time.initDate : '';
    this.initIsDirty = false;
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

  /**
   * @param {date} end - Fecha final en formato global
   * @param {date} start - Fecha inicio en formato global
   */
  static exacDifferenceInDays(end, start) {
    const endInMiliseconds = getTime(end);
    const startInMiliseconds = getTime(start);
    const diffInMiliseconds = endInMiliseconds - startInMiliseconds;
    const daysAbs = diffInMiliseconds / (1000 * 3600 * 24);
    return twoDecimals(daysAbs);
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

  static roundedDifferenceInDays(endingDate, initialDate) {
    return differenceInDays(new Date(endingDate), new Date(initialDate));
  }

  setDuration(val) {
    this.taskDuration = Number(val) || 0;
    const {
      endingDate, initialDate, initDateLocked, endDateLocked, initIsDirty,
    } = this;
    /**
     * Si Fecha inicial está bloqueada y existe
     * y si fecha final está desbloqueada, actualizo fecha final
     */
    if (initDateLocked && initialDate && !endDateLocked) {
      this.updateEndDate();
    /**
     * Si fecha final está bloqueada y existe
     * y si fecha inicial está desbloqueada y limpia, calculo fecha inicial
     */
    } else if (endDateLocked && endingDate && !initDateLocked && !initIsDirty) {
      this.updateInitDate();
    /**
     * Si ambas fechas existen pero están desbloqueadas
     * y fecha inicial está limpia, actualizo fecha final
     */
    } else if (endingDate && initialDate && !initIsDirty) {
      this.updateEndDate();
    }
  }

  setEndDate(date) {
    this.endingDate = TaskTime.isAbsDate(date) ? new Date(date) : TaskTime.absTime(date);
    /**
     * Si la fecha inicial existe y está bloqueada, actualizo duración
     */
    if (this.initialDate && this.initDateLocked) {
      this.calculateDuration();
    /**
     * Si Fecha inicial existe y la duración no, calculo duración
     */
    } else if (this.initialDate && !this.duration) {
      this.calculateDuration();
    /**
     * Si la fecha inicial existe la actualizo
     */
    } else if (this.initialDate || !this.initialDate) {
      this.updateInitDate();
    }
  }

  setDateTimeLocal(flag) {
    this.withHours = flag;
  }

  setInitDate(date) {
    this.initIsDirty = true;
    this.initialDate = TaskTime.isAbsDate(date) ? new Date(date) : TaskTime.absTime(date);
    /**
     * Si la fecha final existe y está bloqueada, actualizo duración
     */
    if (this.endingDate && this.endDateLocked) {
      this.calculateDuration();
      /**
       * Si Fecha final existe y la duración no, calculo duración
       */
    } else if (this.endingDate && !this.duration) {
      this.calculateDuration();
    /**
     * Si la fecha final existe la actualizo o
     * si la duración existe y la fecha fin no, la actualizo
     */
    } else if (this.endingDate || (this.duration && !this.endingDate)) {
      this.updateEndDate();
    }
    this.initIsDirty = false;
  }

  setLockInitDate(flagLock) {
    this.initDateLocked = flagLock;
  }

  setLockEndDate(flagLock) {
    this.endDateLocked = flagLock;
  }

  calculateDuration() {
    if (this.initialDate && this.endingDate) {
      const initialDate = this.withHours ? this.initialDate : TaskTime.formatDate(this.initialDate);
      const endingDate = this.withHours ? this.endingDate : TaskTime.formatDate(this.endingDate);
      const diff = this.withHours
        ? TaskTime.exacDifferenceInDays(endingDate, initialDate)
        : TaskTime.roundedDifferenceInDays(endingDate, initialDate);
      this.setDuration(diff);
    }
  }

  updateEndDate() {
    if (this.withHours) {
      const durationInMilisecond = this.duration * 24 * 3600 * 1000;
      this.endingDate = getTime(this.initialDate) + durationInMilisecond;
    } else {
      this.endingDate = addDays(this.initialDate, this.duration);
    }
  }

  updateInitDate() {
    if (this.withHours) {
      const durationInMilisecond = this.duration * 24 * 3600 * 1000;
      this.initialDate = getTime(this.endingDate) - durationInMilisecond;
    } else {
      this.initialDate = subDays(this.endingDate, this.duration);
    }
  }
}
export default TaskTime;
