<script>
	import 'inter-ui/inter-variable.css';
	// import { env } from '$env/dynamic/public';

  $effect(() => {});
</script>

<style>
  .layout-root {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'main'
      'footer'
    ;
    gap: 1rem;
  

    height: 100svh;
    min-height: 100svh;
    max-height: 100svh;
  }

  header {
    grid-area: header;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
  }

  main {
    grid-area: main;
    overflow: hidden;
  }

  footer {
    grid-area: footer;
    bottom: 0;
  }

  header, footer {
    position: sticky;
  }
</style>

<div class="layout-root">
  <div>header</div>
  <main>
	  <slot />
  </main>
  <footer>footer</footer>
</div>