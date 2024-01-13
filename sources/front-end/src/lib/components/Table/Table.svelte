<style>
  .table {
    --table-caption-font-size: 4rem;
    --table-caption-font-weight: 900;
    --table-caption-text-transform: uppercase;
    --table-caption-font-variation-settings: "wght" 900, "opsz" 32;

    --table-header-row-font-size: 2rem;
    --table-header-row-font-weight: 900;
    --table-header-row-text-transform: uppercase;
    --table-header-row-font-variation-settings: "wght" 900, "opsz" 32;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'table-rows'
    ;
    /* gap: var(--gap); */
    height: 100%;

    color: var(--table-color);
    background-color: var(--table-background-color);
    overflow-y: auto;
  }

  .table-rows {
    grid-area: table-rows;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    /* gap: var(--gap); */
    overflow-y: auto;

    color: var(--table-rows-color);
    background-color: var(--table-rows-background-color);
  }

  :global(.table-rows > :first-child) {
    --height: 6rem;

    position: sticky;
    top: 0;
    z-index: 1;
    min-height: var(--height);
    max-height: var(--height);
    height: var(--height);
  
    background-color: var(--theme-black);
    pointer-events: none;
  }

  :global(.table-rows > :first-child > div) {
    background-color: var(--main-background-color);
    font-variation-settings: var(--table-header-row-font-variation-settings);
    color: var(--theme-green);
    text-transform: var(--table-header-row-text-transform);
  }
  
  :global(.table-rows > :not(:first-child) > div) {
    background-color: var(--theme-dark_gray);
  }


  :global(.table-rows > :not(:first-child):hover),
  :global(.table-rows > :not(:first-child):hover > div)
  {
    color: var(--theme-black);
    background-color: var(--theme-green);
  }

  :global(.table-rows > div) {
    min-height: 4rem;
  }
</style>

<div class="table">
  <slot name="table-rows" class="table-rows" />
</div>