<script>
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
    console.log({ fileInput });

    if (fileInput) {
      fileInput.value = "";
    }
  }

  $effect(() => {
    if (selectedFiles) {
      FileObject = selectedFiles?.item(0);
      isDeleteButtonVisible = true;
    }
  });

  $effect(() => {
    console.log({ isDeleteButtonVisible, FileObject, selectedFiles });
  });
</script>
<style>
  .file-loader {
    display: grid;
    grid-template-areas:
      'button-container file-name-container'
      'progress progress'
    ;
    grid-template-columns: auto minmax(500px, 1fr);
    grid-template-rows: 1fr auto;
    margin: 0 auto;
    padding: var(--gap) calc(var(--gap) * 2);
    gap: var(--gap);
    background-color: var(--theme-black);
  }

  .button-container {
    grid-area: button-container;
  }

  .button-container label {
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

  .button-container button {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    align-items: center;
  }

  .button-container > .file-input {
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

  .button-container,
  .file-name-container,
  .progress {
    display: flex;
    align-items: center;
  }

  .file-name-container {
    grid-area: file-name-container;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    grid-template-areas:
      'file-name delete-file-button'
    ;
    gap: var(--gap);
  }

  .file-name-container > .file-name {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
  }

  .file-name-container > .delete-file-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-red);
    border: none;
    color: var(--theme-white);
    visibility: hidden;
  }

  .isDeleteButtonVisible {
    visibility: visible !important;
  }

</style>

<div class="file-loader">
  <div class="button-container">
    <button>
      <label for="file-loader">
        load
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
  <div class="file-name-container">
    <div class="file-name">{FileObject?.name}</div>
    <button class="delete-file-button" class:isDeleteButtonVisible onclick={handleDeleteFileClick}>del</button>
  </div>
  <progress class="progress" max="100" value="{progressValue}" aria-label="upload progress"></progress>
</div>