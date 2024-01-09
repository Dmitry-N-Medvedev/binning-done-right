class DataFile {
  state = $state();

  /**
   * 
   * @param {File} fileObject 
   */
  setFile(fileObject = null) {
    this.state = fileObject;
  }
}

export const DataFileStore = new DataFile();