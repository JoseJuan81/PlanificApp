<template>
  <div class="detail-container">
    <form class="pb-32">
      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
        >
          <h3 class="task-form-section-title">Actividad</h3>
        </button>
        <fieldset class="mb-4 px-4">
          <InputField
            invisible
            autocomplete="off"
            class="task-name"
            ref="taskName"
            :validation="$v.task.name.$invalid"
            placeholder="nombre de la actividad"
            v-model="task.name"
          >
            <span v-if="!$v.task.name.$required">título requerido</span>
          </InputField>
        </fieldset>
      </div>

      <div role="presupuesto" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="sectionActivator('hideBudgetContainer', 'budgetInput.inputField')"
        >
          <div class="w-full flex items-center justify-between">
            <h3 class="task-form-section-title">Presupuesto</h3>
            <span class="text-gray-medium">{{task.budget}}</span>
          </div>
        </button>
        <div
          data-cy="check-list-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideBudgetContainer },
          ]"
        >
          <form class="mb-4" autocomplete="off">
            <fieldset>
              <InputField
                placeholder="Monto presupuesto"
                :validation="false"
                ref="budgetInput"
                v-model.number="task.budget"
              />
            </fieldset>
          </form>
        </div>
      </div>

      <div role="gastos" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="sectionActivator('hideExpenseListContainer', 'expenseAmount.inputField')"
        >
          <div class="w-full flex items-center justify-between">
            <h3 class="task-form-section-title">Gastos</h3>
            <span class="text-gray-medium">{{totalExpense}}</span>
          </div>
        </button>
        <div
          data-cy="check-list-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideExpenseListContainer },
          ]"
        >
          <form class="mb-4">
            <div class="flex items-center justify-between">
              <fieldset class="expense-amount">
                <InputField
                  :validation="false"
                  v-model.number="expense.amount"
                  ref="expenseAmount"
                />
              </fieldset>
              <fieldset class="flex-auto">
                <InputField
                  invisible
                  placeholder="Nombre gasto"
                  :validation="false"
                  v-model="expense.title"
                  @press-enter="addExpense"
                />
              </fieldset>
              <button
                type="button"
                class="btn-mini-icon mr-0 focus:outline-none"
                @click="addExpense"
              >
                <DlAddIcon class="fill-gray-base hover:fill-success-dark" />
              </button>
            </div>
          </form>
          <ul>
            <li
              v-for="(expense, exIndex) in task.expenses"
              :key="exIndex"
              class="flex justify-between items-center"
            >
            <h3 class="font-bold text-2xl text-warning-dark">{{expense.amount}}</h3>
            <h4 class="ml-4">{{expense.title}}</h4>
            <div class="flex items-center justify-end my-2">
              <button type="button" class="btn-mini-icon">
                <DlDetailsIcon class="fill-gray-base hover:fill-primary-medium" />
              </button>
              <button
                type="button"
                class="btn-mini-icon mr-0 focus:outline-none"
                @click="deleteExpense(exIndex)"
              >
                <DlCloseIcon class="fill-gray-base hover:fill-error-dark" />
              </button>
            </div>
            </li>
          </ul>
        </div>
      </div>

      <div role="checklist" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="sectionActivator('hideCheckListContainer', 'checkListTitle.checkListTitle')"
        >
          <div class="flex items-center justify-between w-full">
            <h3 class="task-form-section-title">Check List</h3>
            <span v-if="checkListSummary.total" class="text-gray-medium">
              <span>{{checkListSummary.done}}</span>
              <span>/</span>
              <span>{{checkListSummary.total}}</span>
            </span>
          </div>
        </button>
        <div
          data-cy="check-list-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideCheckListContainer },
          ]"
        >
          <CheckList
            class="check-list-component"
            placeholder="Agrega un actividad"
            prop="title"
            ref="checkListTitle"
            v-model="task.checkList"
          >
            <template v-slot:check-item="{ item }">
              <DlCheckIcon
                :class="[item.done ? 'fill-success-base' : 'fill-gray-base']"
              />
            </template>
            <template v-slot:remove-item>
              <DlCloseIcon class="fill-error-medium hover:fill-error-dark" />
            </template>
          </CheckList>
        </div>
      </div>

      <div role="subactividades" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideSubTaskContainer = !hideSubTaskContainer"
        >
          <h3 class="task-form-section-title">Sub Actividades</h3>
        </button>
        <div
          data-cy="sub-task-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideSubTaskContainer },
          ]"
        >
          <fieldset class="mb-4 mt-2">
            <SelectorField
              label="Actividades:"
              placeholder="seleccionar"
              item-text="name"
              item-value="id"
              :validation="false"
              :options="flatListTasks"
              v-model="task.subTasks"
            ></SelectorField>
          </fieldset>
        </div>
      </div>

      <div role="asignar-actividad" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideAsignedContainer = !hideAsignedContainer"
        >
          <div class="w-full flex items-center justify-between">
            <h3 class="task-form-section-title">Asignar actividad</h3>
            <small>Avatar de usuarios</small>
          </div>
        </button>
        <div
          data-cy="asigned-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideAsignedContainer },
          ]"
        >
          <fieldset class="mb-4 mt-2">
            <SelectorField
              label="Colaboradores:"
              item-text="name"
              item-value="name"
              :validation="false"
              :options="[{ name: 'Churry' }, { name: 'ñeñe' }]"
              v-model="task.asigned"
            ></SelectorField>
          </fieldset>
        </div>
      </div>

      <div role="tiempo-ejecución" class="collapsing-wrapper">
        <button
          data-cy="duration-container"
          class="collapsing-activator"
          type="button"
          @click="sectionActivator('hideTimeDefinition', 'taskDuration.duration.inputField')"
        >
          <h3 class="task-form-section-title">Tiempo de ejecución</h3>
        </button>
        <div
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideTimeDefinition },
          ]"
        >
          <TaskDuration ref="taskDuration" v-model="task.time"/>
        </div>
      </div>

      <div role="etiquetas" class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="sectionActivator('hideLabelsContainer', 'etiquetas.input')"
        >
          <h3 class="task-form-section-title">Etiquetas</h3>
        </button>
        <div
          data-cy="labels-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideLabelsContainer },
          ]"
        >
          <fieldset class="mb-4">
            <LabelsField
              ref="etiquetas"
              placeholder="Etiquetas..."
              v-model="task.labels"
            />
          </fieldset>
        </div>
      </div>

      <div role="actividades-relacionadas" class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideRelatedTaskContainer = !hideRelatedTaskContainer"
        >
          <h3 class="task-form-section-title">Actividades Relacionadas</h3>
        </button>
        <div
          data-cy="related-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideRelatedTaskContainer },
          ]"
        >
          <ul class="mb-4">
            <li
              v-for="(related, indexRe) in task.relatedTasks"
              :key="indexRe"
            >{{related.name}}</li>
          </ul>
        </div>
      </div>

      <div role="comentarios" class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="sectionActivator('hideCommetsContainer', 'comments.textarea')"
        >
          <h3 class="task-form-section-title">Comentarios</h3>
        </button>
        <div
          data-cy="commets-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideCommetsContainer },
          ]"
        >
          <fieldset class="mb-4">
            <TextAreaField ref="comments" v-model="task.comments"/>
          </fieldset>
        </div>
      </div>
    </form>
    <section class="bg-white flex justify-center align-center absolute bottom-0 right-0 left-0 p-8">
      <button
        type="button"
        class="btn btn-error mx-4"
        @click="onCancel"
      >Cancelar</button>
      <button
        type="button"
        class="btn btn-primary mx-4"
        :disabled="$v.$invalid"
        @click="saveTaskData"
      >Guardar</button>
    </section>
  </div>
</template>
<script>
import {
  compose, equality, filter, getPropertysValue, isEmpty, map, reduce, setNewProperty,
} from 'functionallibrary';
import { mapState } from 'vuex';
import { required, requiredIf } from 'vuelidate/lib/validators';
import CheckList from '@/components/common/CheckList.vue';
import DlAddIcon from '@/components/Icons/dl-add-icon.vue';
import DlCheckIcon from '@/components/Icons/dl-check-icon.vue';
import DlCloseIcon from '@/components/Icons/dl-close-icon.vue';
import DlDetailsIcon from '@/components/Icons/dl-details-icon.vue';
import InputField from '@/components/common/InputField.vue';
import LabelsField from '@/components/common/LabelsField.vue';
import SelectorField from '@/components/common/SelectorField.vue';
import TaskDuration from '@/components/common/TaskDuration.vue';
import TextAreaField from '@/components/common/TextAreaField.vue';
import { absDate, autoFocus } from '@/helpers';

function mounted() {
  this.loadData();
  this.setTask();
  autoFocus(this, 'taskName.inputField');
}

function loadData() {
  this.$store.dispatch('Task/flatList');
}

function setTask() {
  const { id } = this.$route.params;
  this.isEditing = Boolean(id);
  if (this.isEditing) {
    this.task = this.editingTask;
  }
}

function addExpense() {
  if (this.expense.amount && this.expense.title) {
    this.task.expenses = [].concat(this.task.expenses, { ...this.expense });
    this.cleanExpenseObject();
    autoFocus(this, 'expenseAmount.inputField');
  }
}

function cleanExpenseObject() {
  this.expense = { amount: 0, title: '' };
}

function checkListSummary() {
  const checkList = getPropertysValue('checkList', this.task) || [];
  const done = equality('done', true);
  const onlyCheckDone = filter(done, checkList);
  return {
    total: this.task.checkList.length,
    done: onlyCheckDone.length || 0,
  };
}

function deleteExpense(index) {
  this.task.expenses.splice(index, 1);
}

function totalExpense() {
  const expenses = getPropertysValue('expenses', this.task);
  if (isEmpty(expenses)) {
    return 0;
  }
  const sum = (acc, exp) => acc + exp.amount;
  return reduce(sum, 0, expenses);
}

function onCancel() {
  this.$router.push({ name: 'tree-list' });
}

function updateTask() {
  this.$store.dispatch('Task/update', this.task);
  this.$router.push({ name: 'new-hierarchy-task' });
}

function saveTask() {
  const modifyingTask = compose(
    this.taskDateTransformation,
    this.relatedTasksTransformation,
  );
  const newTask = modifyingTask(this.task);
  this.$store.dispatch('Task/save', newTask);
}

function saveTaskData() {
  if (this.isEditing) {
    this.updateTask();
  } else {
    this.saveTask();
  }
  this.task = { ...this.emptyTask };
}

function taskDateTransformation(task) {
  const { time: { endDate, initDate } } = task;
  const formatingDates = compose(
    setNewProperty('endDate', absDate(endDate)),
    setNewProperty('initDate', absDate(initDate)),
  );
  const newTime = formatingDates(task.time);
  return setNewProperty('time', newTime, task);
}

function relatedTasksTransformation(task) {
  const relatedTasksArr = getPropertysValue('relatedTasks', task);
  const relatedTaskObj = (r) => ({
    condition: r.condition,
    taskId: r.taskId,
  });
  const newRelatedTasksArr = map(relatedTaskObj, relatedTasksArr);
  return setNewProperty('relatedTasks', newRelatedTasksArr, task);
}

function routeChange() {
  this.setTask();
}

function sectionActivator(flagSection, ref) {
  this[flagSection] = !this[flagSection];
  if (!this[flagSection]) {
    this.$nextTick(
      autoFocus(this, ref),
    );
  }
}

function validations() {
  return {
    task: {
      name: { required },
      time: {
        endDate: {
          required: requiredIf(() => this.task.time.duration || this.task.time.initDate),
        },
        duration: {
          required: requiredIf(() => this.task.time.endDate || this.task.time.initDate),
        },
        initDate: {
          required: requiredIf(() => this.task.time.duration || this.task.time.endDate),
        },
      },
    },
  };
}

function data() {
  return {
    expense: {
      amount: 0,
      title: '',
    },
    isEditing: false,
    hideAsignedContainer: true,
    hideBudgetContainer: true,
    hideCheckListContainer: true,
    hideCommetsContainer: true,
    hideExpenseListContainer: true,
    hideLabelsContainer: true,
    hideRelatedTaskContainer: true,
    hideSubTaskContainer: true,
    hideTimeDefinition: true,
    task: {
      asigned: '',
      budget: 0,
      checkList: [],
      comments: '',
      expenses: [],
      labels: [],
      name: '',
      relatedTasks: [{
        condition: '',
        taskId: '',
        name: '',
      }],
      time: {
        endDate: '',
        duration: 0,
        initDate: '',
      },
      subTasks: [],
    },
  };
}

export default {
  name: 'Detail',
  components: {
    CheckList,
    DlAddIcon,
    DlCloseIcon,
    DlCheckIcon,
    DlDetailsIcon,
    InputField,
    LabelsField,
    SelectorField,
    TaskDuration,
    TextAreaField,
  },
  computed: {
    ...mapState('Task', {
      emptyTask: (state) => state.newTaskDefault,
      flatListTasks: (state) => state.flatList,
      editingTask: (state) => state.detail,
    }),
    checkListSummary,
    totalExpense,
  },
  data,
  methods: {
    addExpense,
    cleanExpenseObject,
    deleteExpense,
    loadData,
    onCancel,
    relatedTasksTransformation,
    saveTask,
    saveTaskData,
    sectionActivator,
    setTask,
    taskDateTransformation,
    updateTask,
  },
  mounted,
  validations,
  watch: {
    '$route.fullPath': routeChange,
  },
};
</script>
<style lang="scss">
.collapsing-wrapper {
  @apply border-b border-solid border-gray-light;

  .collapsing-activator {
    @apply flex justify-between;
    @apply w-full;
    @apply p-4;

    &:focus {
      @apply outline-none;
    }
    &:hover {
      @apply bg-primary-lightest;
    }
  }
}
.detail-container {
  @apply pt-4;
  @apply text-left text-xl;
  @apply overflow-y-auto;
  max-height: calc(100vh - 10rem);
}
.collapsing-container {
  @apply duration-300;
  @apply overflow-auto;
  @apply px-4;
  max-height: 30rem;
}
.collapsing-container-collapsed {
  max-height: 0;
}

.check-list-component {
  @apply mb-4;
  .progress-bar {
    @apply mb-4;
    .advance-rect {
      @apply fill-success-base;
      @apply duration-500;
    }
    .total-rect {
      @apply fill-gray-light;
    }
  }
  .add-item-input {
    @apply w-full;
    @apply mb-4;

    &:focus {
      @apply outline-none;
      @apply border-b border-solid border-primary-light;
    }
  }
  ul {
    .check-item {
      @apply grid items-center gap-4;
      grid-template-columns: 1.75rem 1fr 1.75rem;
      button {
        @apply w-6 h-6;
      }
      .text-area {
        @apply h-12;
        @apply leading-12;
      }
    }
  }
}

.task-name {
  .invisible-input {
    @apply text-2xl font-normal text-gray-base;

    &:focus {
      @apply bg-$white;
    }
  }
}

.expense-amount {
  flex: 1 1 30%;
}

.task-form-section-title {
  @apply font-normal text-primary-dark whitespace-no-wrap;
}

</style>
