<script>
  import {
    createDataFileStructure,
  } from '$lib/structures/createDataFileStructure.js';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  let {
    /**
     * @type {function}
    */
    onFile,
  } = $props();
  let progressValue = $state(0);
  /**
   * @type {FileList | undefined }
   */
  let selectedFiles = $state();
  /**
   * @type {File | undefined | null}
   */
  let FileObject = $state();
  let isDeleteButtonVisible = $state(false);
  let fileInput = $state();

  const handleDeleteFileClick = () => {
    if (fileInput) {
      fileInput.value = "";
    }

    FileObject = null;
  }

  const uploadFileObject = () => {
    console.log('uploadFileObject', FileObject);
  }

  const selectFile = () => {
    console.log('selectFile');
  }

  $effect(() => {
    if (typeof selectedFiles === 'undefined') {
      return;
    }

    if (selectedFiles === null) {
      return;
    }

    if ((selectedFiles instanceof FileList) === false) {
      return;
    }

    if (selectedFiles.length === 0) {
      return;
    }

    FileObject = selectedFiles.item(0);
  });

  $effect(() => {
    const dataFileStructure = createDataFileStructure(FileObject);

    onFile(dataFileStructure);
  });

  $effect(() => {
    isDeleteButtonVisible = FileObject instanceof File;
  });
</script>

<style>
  .file-loader {
    display: grid;
    grid-template-areas:
      'load-button-container file-name-container delete-file-container'
      'progress progress progress'
    ;
    grid-template-columns: auto minmax(500px, 1fr) auto;
    grid-template-rows: 1fr auto;
    margin: 0 auto;
    padding: calc(var(--gap) * 2) calc(var(--gap) * 2) var(--gap);
    gap: var(--gap);
    background-color: var(--theme-black);
    border-radius: var(--gap);
  }

  .load-button-container {
    grid-area: load-button-container;
  }

  .load-button-container label {
    display: flex;
    color: var(--main-background-color);
    cursor: pointer;
    border-radius: calc(var(--gap) / 2);
    flex: 1 0 auto;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

    font-size: 1rem;
    line-height: 2rem;
  }

  .load-button-container button {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: center;
  }

  .load-button-container > .file-input {
    display: none;
  }

  .progress[value] {
    grid-area: progress;
    height: 0.3rem;
    width: 100%;

    -webkit-appearance: none;
  }

  .progress[value]::-webkit-progress-bar {
    background-color: var(--main-background-color);
  }

  .progress[value]::-webkit-progress-value {
    background-color: var(--theme-green);
  }

  .load-button-container,
  .file-name-container,
  .progress {
    display: flex;
    align-items: center;
  }

  .file-name-container {
    grid-area: file-name-container;
    display: flex;
    justify-content: end;
    gap: var(--gap);
  }

  .delete-file-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-red);
    border: none;
    color: var(--theme-black);
    visibility: hidden;
  }

  .isDeleteButtonVisible {
    visibility: visible !important;
  }

</style>

<div class="file-loader">
  <div class="load-button-container">
    <button onclick={ FileObject ? uploadFileObject : selectFile }>
      <label for="file-loader">
        { FileObject ? 'upload' : 'select' }
      </label>
    </button>
    <input
      id="file-loader"
      type="file"
      accept=".csv"
      class="file-input"
      bind:files={selectedFiles}
      bind:this={fileInput}
    />
  </div>
  <div class="file-name-container">{FileObject?.name}</div>
  <button class="delete-file-button" class:isDeleteButtonVisible onclick={handleDeleteFileClick}>
    <DeleteIcon />
  </button>
  <progress class="progress" max="100" value="{progressValue}" aria-label="upload progress"></progress>
</div>