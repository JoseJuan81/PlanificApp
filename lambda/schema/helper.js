import { Model } from 'mongoose';
import { forEach } from 'functionallibrary';

/**
 * @param {Model} model - Mongoose model
 * @param {string[]} pathArray - Arreglo de ids
 */
export const multipleRequestsByIds = (model, pathArray) => {
    const requests = [];
    forEach(
        (p) => requests.push(model.findById(p)),
        pathArray,
    )
    return requests;
}