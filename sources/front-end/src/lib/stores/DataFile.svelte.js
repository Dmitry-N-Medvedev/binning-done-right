class DataFile {
  state = $state(new Map());

  /**
   * 
   * @param {File} fileObject 
   */
  setFile(fileObject = null) {
    console.log(`${this.constructor.name}.setFile`, fileObject);

    if (this.state.has(fileObject.name) === true) {
      console.debug(`the file with the ${fileObject.name} name has already been registered`);
    }

    this.state.set(fileObject.name, fileObject);
  }
}

export const DataFileStore = new DataFile();