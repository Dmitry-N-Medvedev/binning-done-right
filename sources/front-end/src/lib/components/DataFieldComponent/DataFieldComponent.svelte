<script>
  import {
    DataColumnStore,
  } from '$lib/stores/DataColumnStore.svelte.js';
  import Table from '$lib/components/Table/Table.svelte';
</script>

<style>
  .table-rows {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    pointer-events: auto;
    gap: var(--gap);
  }

  .table-header-row,
  .table-row {
    display: grid;
    grid-template-columns: 8rem 1fr 8rem;
    grid-template-areas:
      'id value bin'
    ;
    gap: var(--gap);
    padding: var(--gap);
    cursor: pointer;
  }

  .table-row:hover {
    background-color: var(--theme-green);
    color: var(--theme-black);
  }

  .id {
    grid-area: id;
  }

  .value {
    grid-area: value;
  }

  .bin {
    grid-area: bin;
  }

  :is(.id, .value, .bin) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<Table>
  <span slot="table-caption" class="table-caption">Wind Shear RM</span>
  <div slot="table-header-row" class="table-header-row">
    <div class="id">id</div>
    <div class="value">value</div>
    <div class="bin">bin</div>
  </div>
  <div slot="table-rows" class="table-rows">
    {#each DataColumnStore.state as { id, value, bin }(id)}
      <div class="table-row">
        <div class="id">{id}</div>
        <div class="value">{value}</div>
        <div class="bin">{bin}</div>
      </div>
    {/each}
  </div>
</Table>