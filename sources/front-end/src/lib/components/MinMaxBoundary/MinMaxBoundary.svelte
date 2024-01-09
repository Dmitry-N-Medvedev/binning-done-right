<script>
  let {
    isM = false,
    isN = false,
  } = $props();
</script>

<style>
  .min-max {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'a m'
      'a n'
    ;
    gap: var(--gap);
  }

  .min-max-a {
    grid-area: a;
    font-size: 2.0rem;
    align-items: center;
    color: var(--theme-gray);
    justify-content: end;
  }

  .min-max-m {
    grid-area: m;
    font-feature-settings: "subs" 1;
  }

  .min-max-n {
    grid-area: n;
    font-feature-settings: "sups" 1;
  }

  :is(.min-max-a, .min-max-m, .min-max-n) {
    display: flex;
  }

  :is(.min-max-m, .min-max-n) {
    justify-content: start;
    font-size: 3rem;
    line-height: 2.6rem;
    color: var(--theme-gray);
  }

  :is(.isN, .isM) {
    color: var(--theme-white);
  }
</style>

<div class="min-max">
  <div class="min-max-a">a</div>
  <div class="min-max-m" class:isM>m</div>
  <div class="min-max-n" class:isN>n</div>
</div>