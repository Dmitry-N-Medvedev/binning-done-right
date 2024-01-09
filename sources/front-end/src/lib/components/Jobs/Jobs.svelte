<script>
  import JobComponent from "./JobComponent.svelte";
  import { JobsStore } from "$lib/stores/Jobs.svelte.js";

  /**
   * @param e {Event}
   */
  const setChecked = (e) => {
    console.log(e.target);

    const {
      target: {
        dataset: {
          id,
        }
      }
    } = e;
  };

  $effect(() => {
    console.log(JobsStore.state);
  });
</script>

<style>
  .jobs-component {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'jobs-caption'
      'jobs-list'
    ;
    gap: var(--gap);
    height: 100%;
    background-color: var(--theme-black);
  }


  .jobs-caption {
    grid-area: jobs-caption;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main-background-color);
  }

  .jobs-list {
    grid-area: jobs-list;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: var(--gap);
    margin: 0;
    /* padding: 0 var(--gap); */

    overflow-y: auto;
  }

  .jobs-list input[type="radio"] {
    display: none;
  }

  .jobs-list > .job-container {
    --progress-inner-border-color: var(--theme-black);
    --progress-value-background: var(--theme-black);
    --progress-value-color: var(--theme-green);

    cursor: pointer;
    padding: var(--gap);
    color: var(--theme-darkest_white);
  }

  .radio-input:checked + .job-container {
    --progress-inner-border-color: var(--theme-black);
    --progress-value-background: var(--theme-green);
    --progress-value-color: var(--theme-black);

    background-color: var(--theme-green);
    color: var(--theme-black);
  }
</style>

<div class="jobs-component">
  <h2 class="jobs-caption">jobs</h2>
  <div class="jobs-list">
    {#each JobsStore.state.values() as job(job.id)}
      <input id="radio:{job.id}" type="radio" class="radio-input" name="jobs" />
      <label class="job-container" id={job.id} for="radio:{job.id}">
        <JobComponent
          jobId={job.id}
          sourceFileName={job.sourceFileName}
          recordsProcessed={job.progress.recordsProcessed}
          recordsTotal={job.progress.recordsTotal}
          channelName={job.channelName}
          isFocused={job.checked}
        />
      </label>
    {/each}
  </div>
</div>