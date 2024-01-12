<script>
  let {
    /**
     * @type {Object}
    */
    job,
  } = $props();

  let isFocused = $state(false);
  let numOfUploadedChunks = $derived(job?.extra?.numOfUploadedChunks);
</script>

<style>
  .job-component {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      'source-data-file records-info channel'
      'progress progress progress'
      'upload upload upload'
    ;
    gap: var(--gap);
    padding: var(--gap);
    border-color: var(--main-background-color);

    pointer-events: none;
  }

  legend {
    font-size: 1rem;
    padding: 0 var(--gap);
    color: var(--theme-light_gray);
  }

  .source-data-file {
    grid-area: source-data-file;
    justify-content: start;
    font-size: 1.25rem;
  }

  .records-info {
    grid-area: records-info;
    font-feature-settings: "frac" 1, "tnum" 1, "zero" 1;
    font-size: 2rem;
  }

  .channel {
    grid-area: channel;
    font-size: 1.3rem;
  }

  :is(.source-data-file, .records-info, .channel, .progress, .upload) {
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  :is(.source-data-file, .records-info, .channel) {
    padding: var(--gap);
  }
  
  :is(.records-info, .channel) {
    justify-content: end;
  }

  .progress[value] {
    grid-area: progress;
  }
  
  .upload[value] {
    grid-area: upload;
  }

  .progress[value],
  .upload[value] {
    height: 0.5rem;
    width: 100%;
    -webkit-appearance: none;
  }

  .progress[value]::-webkit-progress-inner-element,
  .upload[value]::-webkit-progress-inner-element {
    border: 1px solid var(--progress-inner-border-color);
  }

  .progress[value]::-webkit-progress-bar,
  .upload[value]::-webkit-progress-bar {
    background-color: var(--progress-value-background);
    padding: 2px;
  }

  .progress[value]::-webkit-progress-value {
    background-color: var(--progress-value-color);
  }

  .upload[value]::-webkit-progress-value {
    background-color: var(--theme-red);
  }

  .isFocused {
    background-color: var(--theme-green);
  }
</style>

<fieldset id="job:{job.id}" class="job-component" class:isFocused>
  <legend>{job.id}</legend>
  <div class="source-data-file">{job.file.name}</div>
  <div class="records-info">{job.progress.recordsProcessed}/{job.progress.recordsTotal}</div>
  <div class="channel">{job.channelName}</div>
  <progress class="progress" max={job.progress.recordsTotal} value="{job.progress.recordsProcessed}" aria-label="job progress"></progress>
  <progress class="upload" max={job.extra.numOfChunksToUpload} value="{numOfUploadedChunks}" aria-label="job progress"></progress>
</fieldset>