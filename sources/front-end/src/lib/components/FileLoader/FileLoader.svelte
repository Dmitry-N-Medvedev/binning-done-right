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
  let progressMax = $state(0);
  let progressCompleted = $derived(progressValue >= progressMax);
  /**
   * @type {FileList | undefined | null }
   */
  let selectedFiles = $state(null);
  /**
   * @type {File | undefined | null}
   */
  let FileObject = $state(null);
  let isDeleteButtonVisible = $state(false);
  let fileInput = $state();

  let fileLoaderInputId = $state(`fl:${crypto.randomUUID()}`);

  const handleDeleteFileClick = () => {
    clearFileInput();

    FileObject = null;
  }

  const clearFileInput = () => {
    if (fileInput) {
      fileInput.value = "";
    }

    FileObject = null;
    selectedFiles = null;
  };

  const fakeTimer = () => new Promise((resolve) => {
    setTimeout(resolve, Math.trunc(Math.random() * 1000));
  });

  async function* fakeUploadProgress(start = 0, end = 0, step = 0) {
    let value = start;

    for (let i = start; i <= end; i += step) {
      await fakeTimer();
      value += step;
      yield value;
    }
  }

  const uploadFileObject = async() => {
    if (!FileObject) {
      throw new ReferenceError('FileObject is undefined');
    }

    const dataFileStructure = createDataFileStructure(FileObject);

    // const step = progressMax / Math.trunc(Math.random() * 10);
    // for await (const value of fakeUploadProgress(0, progressMax, step)) {
    //   progressValue = Math.trunc(value);
    // }

    await onFile(dataFileStructure);

    clearFileInput();
  }

  $effect(() => {
    if (fileInput) {
      fileLoaderInputId = `fl:${crypto.randomUUID()}`;
    }
  });

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
    progressMax = FileObject?.size;
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
    grid-template-rows: 1fr 0;
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
    /* border-radius: calc(var(--gap) / 2); */
    border: none;
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

    pointer-events: auto;
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

    pointer-events: auto;
  }

  .isDeleteButtonVisible {
    visibility: visible !important;
  }

  .progressCompleted {
    filter: opacity(0.0);
  }
</style>

<div class="file-loader">
  <div class="load-button-container">
    {#if FileObject}
        <button onclick={uploadFileObject}>upload</button>
      {:else}
        <button>
          <label for={fileLoaderInputId}>select</label>
        </button>
        <input
          id={fileLoaderInputId}
          type="file"
          accept=".csv"
          class="file-input"
          bind:files={selectedFiles}
          bind:this={fileInput}
        />
    {/if}
  </div>
  <div class="file-name-container">{FileObject?.name }</div>
  <button class="delete-file-button" class:isDeleteButtonVisible onclick={handleDeleteFileClick}>
    <DeleteIcon />
  </button>
  <!-- <progress class="progress" class:progressCompleted max={progressMax} value={progressValue} aria-label="upload progress"></progress> -->
</div>