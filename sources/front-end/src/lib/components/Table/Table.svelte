<style>
  .table {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'table-caption'
      'table-header-row'
      'table-rows'
    ;
    /* gap: var(--gap); */
    height: 100%;

    color: var(--table-color);
    background-color: var(--table-background-color);
  }

  .table-caption {
    grid-area: table-caption;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--table-caption-color);
    background-color: var(--table-caption-background-color);
  }

  .table-header-row {
    grid-area: table-header-row;

    color: var(--table-header-row-color);
    background-color: var(--table-header-row-background-color);
  }

  .table-rows {
    grid-area: table-rows;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: var(--gap);
    overflow-y: auto;

    color: var(--table-rows-color);
    background-color: var(--table-rows-background-color);
  }
</style>

<div class="table">
  <h2 class="table-caption">
    <slot name="table-caption" />
  </h2>
  <div class="table-header-row">
    <slot name="table-header-row" />
  </div>
  <div class="table-rows">
    <slot name="table-rows" />
  </div>
</div>