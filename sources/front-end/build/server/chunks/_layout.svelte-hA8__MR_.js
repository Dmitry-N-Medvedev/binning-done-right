import { z as create_anchor, A as slot, k as pop, g as push } from './index-q-XdH9cF.js';
import './client-_MkdHwD5.js';
import './exports-mq_1S73-.js';

function Header($$payload, $$props) {
  push(true);
  $$payload.out += `<header class="svelte-1wwxkre"><h1 class="svelte-1wwxkre">binning</h1></header>`;
  pop();
}
function Footer($$payload, $$props) {
  push(true);
  $$payload.out += `<footer class="svelte-x9kloy"><h3 class="svelte-x9kloy">Enercon Open Source</h3></footer>`;
  pop();
}
function _layout($$payload, $$props) {
  push(true);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  $$payload.out += `<div class="layout-root svelte-1wi0bue">${anchor}`;
  Header($$payload);
  $$payload.out += `${anchor} <main class="svelte-1wi0bue">${anchor_1}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_1}</main> ${anchor_2}`;
  Footer($$payload);
  $$payload.out += `${anchor_2}</div>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-hA8__MR_.js.map
