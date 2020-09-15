<template>
  <form data-cy="time-container">
    <fieldset class="mb-4">
      <div class="flex items-center justify-end">
        <label for="chk">Fecha con hora</label>
        <input data-cy="withHoursChk" type="checkbox" id="chk" class="ml-4" v-model="hours">
      </div>
    </fieldset>
    <fieldset class="mb-4">
      <InputField
        data-cy="duration"
        type="number"
        label="Duración"
        :disabled="isLockedEndDate && isLockedInitDate"
        :validation="false"
        :value="value.duration"
        @input="updatingDuration"
      ></InputField>
    </fieldset>
    <fieldset class="mb-4">
      <div class="flex items-end">
        <InputField
          data-cy="initDate"
          class="flex-grow"
          :validation="false"
          :type="dateType"
          label="Fecha Inicio"
          :value="value.initDate"
          @input="updatingInitDate"
        ></InputField>
        <div>
          <button
            data-cy="initDateLockBtn"
            type="button"
            class="btn-mini-icon focus:outline-none mb-4"
            @click="lockDate('initDate')"
          >
            <LockIcon
              :class="[
                isLockedInitDate ? 'fill-success-dark' : 'fill-gray-light hover:fill-gray-medium',
              ]" />
          </button>
        </div>
      </div>
    </fieldset>
    <fieldset class="mb-4">
      <div class="flex items-end">
        <InputField
          data-cy="endDate"
          class="flex-grow"
          :validation="false"
          :type="dateType"
          label="Fecha Fin"
          :value="value.endDate"
          @input="updatingEndDate"
        ></InputField>
        <div class="flex items-baseline">
          <button
            data-cy="endDateLockBtn"
            type="button"
            class="btn-mini-icon focus:outline-none mb-4"
            @click="lockDate('endDate')"
          >
            <LockIcon
              :class="[
                isLockedEndDate ? 'fill-success-dark' : 'fill-gray-light hover:fill-gray-medium',
              ]" />
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>
<script>
import InputField from '@/components/common/InputField.vue';
import TaskTimeInstance from '@/classes/TaskTime';
import LockIcon from '@/components/Icons/dl-lock-icon.vue';

const TaskTime = new TaskTimeInstance();

function sendValue() {
  const { duration, initDate, endDate } = TaskTime;
  this.$emit('input', { duration, initDate, endDate });
}

function updatingDuration(val) {
  TaskTime.setDuration(val);
  this.sendValue();
}

function updatingInitDate(val) {
  TaskTime.setInitDate(val);
  this.sendValue();
}

function updatingEndDate(val) {
  TaskTime.setEndDate(val);
  this.sendValue();
}

function dateType() {
  TaskTime.setDateTimeLocal(this.hours);
  return this.hours ? 'datetime-local' : 'date';
}

function lockDate(typeDate) {
  if (typeDate === 'initDate') {
    this.initDateLocked = !this.initDateLocked;
    TaskTime.setLockInitDate(this.initDateLocked);
  } else if (typeDate === 'endDate') {
    this.endDateLocked = !this.endDateLocked;
    TaskTime.setLockEndDate(this.endDateLocked);
  }
}

function isLockedInitDate() {
  return this.initDateLocked;
}

function isLockedEndDate() {
  return this.endDateLocked;
}

function data() {
  return {
    hours: false,
    endDateLocked: false,
    initDateLocked: false,
  };
}

export default {
  name: 'TaskDuration',
  components: {
    InputField,
    LockIcon,
  },
  computed: {
    dateType,
    isLockedEndDate,
    isLockedInitDate,
  },
  data,
  methods: {
    updatingDuration,
    updatingEndDate,
    updatingInitDate,
    sendValue,
    lockDate,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
