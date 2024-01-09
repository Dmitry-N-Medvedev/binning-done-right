/**
  * @typedef DataFileStructure
  * @type {Object}
  * @property {string} type
  * @property {File | null | undefined} payload
*/

/**
 * @param {File} fileObject 
 * @returns {DataFileStructure}
 */
export const createDataFileStructure = (fileObject = null) => ({
  type: 'file',
  payload: fileObject,
}); 