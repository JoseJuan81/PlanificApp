<template>
  <div class="detail-container">
    <div v-if="isEdit">
      <h2 class="mb-4 text-2xl text-center">Título de actividad</h2>
      <h3>Estado: <span>En Progreso</span></h3>
      <h3>Balance: <output>123.45</output></h3>
      <h3>Gastado: <output>120</output></h3>
      <h3>Progreso: <output>12/14</output></h3>
    </div>
    <form class="mt-4">

      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
        >
          <h3 class="font-bold text-primary-base">Título de actividad</h3>
        </button>
        <fieldset class="mb-4 px-4">
          <InputField
            :validation="true"
            v-model="task.title"
          >
            título requerido
          </InputField>
        </fieldset>
      </div>

      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideAsignedContainer = !hideAsignedContainer"
        >
          <h3 class="font-bold text-primary-base">Asignar actividad</h3>
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

      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideSubTaskContainer = !hideSubTaskContainer"
        >
          <h3 class="font-bold text-primary-base">Sub Actividades</h3>
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

      <div class="collapsing-wrapper">
        <button
          type="button"
          class="collapsing-activator"
          @click="hideCheckListContainer = !hideCheckListContainer"
        >
          <h3 class="font-bold text-primary-base">Check List</h3>
        </button>
        <div
          data-cy="check-list-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideCheckListContainer },
          ]"
        >
          <ul class="mb-4">
            <li
              v-for="(check, indexCh) in task.checkList"
              :key="indexCh"
            >{{check}}</li>
          </ul>
        </div>
      </div>

      <div class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideTimeDefinition = !hideTimeDefinition"
        >
          <h3 class="font-bold text-primary-base">Tiempo de ejecución</h3>
        </button>
        <div
          data-cy="time-container"
          :class="[
            'collapsing-container',
            { 'collapsing-container-collapsed': hideTimeDefinition },
          ]"
        >
          <fieldset class="mb-4">
            <InputField
              :validation="false"
              type="number"
              label="Duración"
              v-model="task.duration"
            ></InputField>
          </fieldset>
          <fieldset class="mb-4">
            <InputField
              :validation="false"
              type="date"
              label="Fecha Inicio"
              v-model="task.initDate"
            ></InputField>
          </fieldset>
          <fieldset class="mb-4">
            <InputField
              :validation="false"
              type="date"
              label="Fecha Fin"
              v-model="task.endDate"
            ></InputField>
          </fieldset>
        </div>
      </div>

      <div class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideLabelsContainer = !hideLabelsContainer"
        >
          <h3 class="font-bold text-primary-base">Etiquetas</h3>
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

      <div class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideRelatedTaskContainer = !hideRelatedTaskContainer"
        >
          <h3 class="font-bold text-primary-base">Actividades Relacionadas</h3>
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

      <div class="collapsing-wrapper">
        <button
          class="collapsing-activator"
          type="button"
          @click="hideCommetsContainer = !hideCommetsContainer"
        >
          <h3 class="font-bold text-primary-base">Comentarios</h3>
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
    <section>
      <h4>Enlaces</h4>
      <ul>
        <li>Enlace 1</li>
        <li>Enlace 2</li>
        <li>Enlace 3</li>
        <li>Enlace 4</li>
      </ul>
    </section>
  </div>
</template>
<script>
import InputField from '@/components/common/InputField.vue';
import SelectorField from '@/components/common/SelectorField.vue';
import LabelsField from '@/components/common/LabelsField.vue';
import TextAreaField from '@/components/common/TextAreaField.vue';

function data() {
  return {
    isEdit: false,
    hideAsignedContainer: true,
    hideCheckListContainer: true,
    hideCommetsContainer: true,
    hideLabelsContainer: true,
    hideRelatedTaskContainer: true,
    hideSubTaskContainer: true,
    hideTimeDefinition: true,
    task: {
      asigned: '',
      checkList: [
        'checkList 1',
        'checkList 2',
        'checkList 3',
      ],
      comments: '',
      duration: 3,
      endDate: '',
      labels: [],
      initDate: '',
      related: [
        'Actividad 1',
        'Actividad 2',
        'Actividad 3',
        'Actividad 4',
      ],
      title: 'Limpiar el baño',
      subtasks: [],
    },
  };
}

export default {
  name: 'Detail',
  components: {
    InputField,
    LabelsField,
    SelectorField,
    TextAreaField,
  },
  data,
};
</script>
<style lang="scss" scoped>
.collapsing-wrapper {
  @apply border-b border-solid border-gray-base;

  .collapsing-activator {
    @apply flex justify-between;
    @apply w-full;
    @apply p-4;

    &:focus {
      @apply outline-none;
    }
    &:hover {
      @apply bg-primary-light;
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
</style>
