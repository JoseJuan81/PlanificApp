<template>
  <div class="detail-container">
    <form class="pb-32">
      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
        >
          <h3 class="font-bold text-primary-dark">Actividad</h3>
        </button>
        <fieldset class="mb-4 px-4">
          <InputField
            invisible
            autocomplete="off"
            class="task-name"
            :validation="$v.task.title.$invalid"
            placeholder="nombre de la actividad"
            v-model="task.title"
          >
            <span v-if="!$v.task.title.$required">título requerido</span>
          </InputField>
        </fieldset>
      </div>

      <div role="presupuesto" class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideBudgetContainer = !hideBudgetContainer"
        >
          <div class="w-full flex items-center justify-between">
            <h3 class="font-bold text-primary-dark">Presupuesto</h3>
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
          @click="hideExpenseListContainer = !hideExpenseListContainer"
        >
          <div class="w-full flex items-center justify-between">
            <h3 class="font-bold text-primary-dark">Gastos</h3>
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
          @click="hideCheckListContainer = !hideCheckListContainer"
        >
          <div class="flex items-center justify-between w-full">
            <h3 class="font-bold text-primary-dark">Check List</h3>
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
            prop="content"
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
          <h3 class="font-bold text-primary-dark">Sub Actividades</h3>
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
              :validation="false"
              label="Actividades:"
              :options="['carro', 'moto']"
              v-model="task.subtasks"
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
            <h3 class="font-bold text-primary-dark">Asignar actividad</h3>
            <div>Avatar de usuarios</div>
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
          @click="hideTimeDefinition = !hideTimeDefinition"
        >
          <h3 class="font-bold text-primary-dark">Tiempo de ejecución</h3>
        </button>
        <div
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideTimeDefinition },
          ]"
        >
          <TaskDuration v-model="task.time"/>
        </div>
      </div>

      <div role="etiquetas" class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideLabelsContainer = !hideLabelsContainer"
        >
          <h3 class="font-bold text-primary-dark">Etiquetas</h3>
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
          <h3 class="font-bold text-primary-dark">Actividades Relacionadas</h3>
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
              v-for="(related, indexRe) in task.related"
              :key="indexRe"
            >{{related}}</li>
          </ul>
        </div>
      </div>

      <div role="comentarios" class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideCommetsContainer = !hideCommetsContainer"
        >
          <h3 class="font-bold text-primary-dark">Comentarios</h3>
        </button>
        <div
          data-cy="commets-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideCommetsContainer },
          ]"
        >
          <fieldset class="mb-4">
            <TextAreaField v-model="task.commets"/>
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
        @click="saveTask"
      >Guardar</button>
    </section>
  </div>
</template>
<script>
import { equality, filter } from 'functionallibrary';
import { mapState } from 'vuex';
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
import { required, requiredIf } from 'vuelidate/lib/validators';

function created() {
  const { id } = this.$route.params;
  this.isEditing = Boolean(id);
  this.task = this.isEditing ? this.editingTask : this.task;
}

function addExpense() {
  if (this.expense.amount && this.expense.title) {
    this.task.expenses = [].concat(this.task.expenses, { ...this.expense });
    this.cleanExpenseObject();
    this.$refs.expenseAmount.$refs.inputField.focus();
  }
}

function cleanExpenseObject() {
  this.expense = { amount: 0, title: '' };
}

function checkListSummary() {
  const done = equality('done', true);
  const onlyDone = filter(done);
  return {
    total: this.task.checkList.length,
    done: onlyDone(this.task.checkList).length,
  };
}

function deleteExpense(index) {
  this.task.expenses.splice(index, 1);
}

function totalExpense() {
  return this.task.expenses.reduce((acc, exp) => acc + exp.amount, 0);
}

function onCancel() {
  this.$router.push({ name: 'tree-list' });
}

function saveTask() {
  this.$store.dispatch('HierarchyTask/save', this.task);
  this.task = { ...this.emptyTask };
}

function validations() {
  return {
    task: {
      title: { required },
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
      related: [],
      time: {
        endDate: '',
        duration: 0,
        initDate: '',
      },
      title: '',
      subtasks: [],
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
    ...mapState('HierarchyTask', {
      emptyTask: (state) => state.newTaskDefault,
      editingTask: (state) => state.detail,
    }),
    checkListSummary,
    totalExpense,
  },
  created,
  data,
  methods: {
    addExpense,
    cleanExpenseObject,
    deleteExpense,
    onCancel,
    saveTask,
  },
  validations,
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
  @apply overflow-hidden;
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
    @apply text-2xl font-bold text-gray-base;

    &:focus {
      @apply bg-$white;
    }
  }
}

.expense-amount {
  flex: 1 1 30%;
}

</style>
