import { isEmpty } from 'functionallibrary';

/**
 * Al desplegar sessión el cursor se posiciona en el campo
 * @param {VueInstance} contex - intancia de vue
 * @param {string} ref - referencia del elemento al que se hará focus
 */
export const autoFocus = (context, refs) => {
  if (isEmpty(refs)) {
    throw new Error('En autoFocus: refs debe existir y ser string');
  }

  if (typeof refs !== 'string') {
    throw new Error('En autoFocus: refs debe ser de tipo string');
  }

  const [ref, ...otherRefs] = refs.split('.');
  const el = context.$refs[ref];
  if (
    el instanceof HTMLInputElement
    || el instanceof HTMLSelectElement
    || el instanceof HTMLTextAreaElement
  ) {
    el.focus();
    return false;
  }

  autoFocus(el, otherRefs.join('.'));
  return false;
};

export const autoTab = () => {};

/**
 * @param {string} stringDate - fecha a ser convertida (yyyy-mm-dd)
 */
export const absDate = (stringDate) => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const [year, month, day] = stringDate.split('-');
  return new Date(year, month - 1, day, hours, minutes, seconds);
};
