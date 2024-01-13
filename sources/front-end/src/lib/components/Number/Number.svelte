<script>
  import {
    toFixed,
  } from '$lib/helpers/toFixed.js';

  let {
    n = NaN,
  } = $props();

  let isNegative = $derived(n < 0);
  let isZero = $derived(n === 0);
  let N = $derived(toFixed(Math.abs(n), 4));
</script>

<style>
  .number {
    --dash: "\2013";

    display: contents;

    background-color: brown;
  }

  .isNegative::before {
    content: var(--dash);
    position: absolute;
    left: 5rem;
  }
</style>

<div class="number">

</div>

{#if isNegative}
  <span class="number" class:isNegative>{N}</span>
  {:else if isZero}
  <span class="number" class:isZero>{N}</span>
  {:else}
  <span class="number">{N}</span>
{/if}