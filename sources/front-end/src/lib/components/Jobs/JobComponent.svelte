<script>
  let {
    jobId = '',
    sourceFileName = '',
    recordsProcessed = 0,
    recordsTotal = 0,
    channelName = '',
    isFocused = false,
  } = $props();
</script>

<style>
  .job-component {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      'source-data-file records-info channel'
      'progress progress progress'
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

  :is(.source-data-file, .records-info, .channel, .progress) {
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
    height: 0.5rem;
    width: 100%;
    -webkit-appearance: none;
  }

  .progress[value]::-webkit-progress-inner-element {
    border: 1px solid var(--progress-inner-border-color);
  }

  .progress[value]::-webkit-progress-bar {
    background-color: var(--progress-value-background);
    padding: 2px;
  }

  .progress[value]::-webkit-progress-value {
    background-color: var(--progress-value-color);
  }

  .isFocused {
    background-color: var(--theme-green);
  }
</style>

<fieldset class="job-component" class:isFocused>
  <legend>{jobId}</legend>
  <div class="source-data-file">{sourceFileName}</div>
  <div class="records-info">{recordsProcessed}/{recordsTotal}</div>
  <div class="channel">{channelName}</div>
  <progress class="progress" max={recordsTotal} value="{recordsProcessed}" aria-label="job progress"></progress>
</fieldset>