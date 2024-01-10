<script>
  let {
    /**
     * @type {Map | null}
    */
    dataObject = null,
    /**
     * @type {function}
    */
    format = (key, value) => {
      throw new ReferenceError('formatter is undefined');
    },
  } = $props();

  let items = $state();

  $effect(() => {
    if (dataObject === null) {
      return;
    }

    if (dataObject instanceof Map) {
      items = dataObject.entries();
    } else {
      throw new TypeError('dataObject must be a Map');
    }
  });
</script>

<style>
  .multi-value-cell {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .multi-value-cell-value {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 0;
    grid-template-areas:
      'val'
      'val-label'
    ;
    justify-content: center;
  }

  .val {
    grid-area: val;
  }

  .val-label {
    grid-area: val-label;
    position: absolute;
    bottom: -0.8rem;
    font-size: 1rem;
    visibility: var(--visibility-on-hover);
    width: 100%;
  }

  :is(.val, .val-label) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="multi-value-cell">
  {#if dataObject}
    {#each dataObject.entries() as [key, value](key)}
      <div class="multi-value-cell-value">
        <div class="val">
          {format(key, value)}
        </div>
        <div class="val-label">{key}</div>
      </div>
    {/each}
  {:else}
    <div class="empty-values">empty</div>
  {/if}
</div>