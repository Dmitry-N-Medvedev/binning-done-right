import { z as create_anchor, k as pop, F as attr, B as escape_text, j as bind_props, G as ensure_array_like, H as stringify, I as escape, A as slot, g as push } from './index-q-XdH9cF.js';

let Jobs$1 = class Jobs {
  state = /* @__PURE__ */ new Map();
  add(fileObject = null) {
    if (fileObject === null) {
      throw new ReferenceError("fileObject is undefined");
    }
    const id = crypto.randomUUID();
    const job = {
      id,
      file: fileObject,
      progress: { recordsTotal: 0, recordsProcessed: 0 },
      extra: {
        numOfChunksToUpload: 0,
        numOfUploadedChunks: 0
      },
      channelName: "RM_WS_HUG_Std [m/s]"
    };
    this.state = structuredClone(this.state).set(job.id, job);
    return id;
  }
  updateNumberOfChunksToUpload(jobId = null, numOfChunks = 0) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }
    if (numOfChunks === 0) {
      throw new RangeError(`numOfChunks should not equal ${numOfChunks}`);
    }
    const job = this.state.get(jobId);
    job.extra.numOfChunksToUpload = numOfChunks;
    const newState = structuredClone(this.state);
    newState.set(jobId, job);
    this.state = newState;
  }
  updateNewChunkUploaded(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }
    const newState = structuredClone(this.state);
    const job = newState.get(jobId);
    job.extra.numOfUploadedChunks = job.extra.numOfUploadedChunks + 1;
    newState.set(jobId, job);
    this.state = newState;
  }
  update(jobId = null, payload = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    if (payload === null) {
      throw new ReferenceError("payload is undefined");
    }
    if (this.state.has(jobId) === false) {
      throw new ReferenceError(`a job with ${jobId} has not been found`);
    }
    const job = this.state.get(jobId);
    const updatedJob = { ...job, ...payload };
    console.log({ job, updatedJob });
    const newState = structuredClone(this.state);
    newState.set(jobId, updatedJob);
    this.state = newState;
  }
};
const JobsStore = new Jobs$1();
function DeleteIcon($$payload, $$props) {
  push(true);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.615 20q-.67 0-1.143-.472Q6 19.056 6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.152q-.463.463-1.153.463zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.23 0 .423-.192q.192-.193.192-.423zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"></path></svg>`;
  pop();
}
function FileLoader($$payload, $$props) {
  push(true);
  let {
    /**
     * @type {function}
    */
    onFile
  } = $$props;
  let FileObject = null;
  let fileLoaderInputId = `fl:${crypto.randomUUID()}`;
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div class="file-loader svelte-20m2b1"><div class="load-button-container svelte-20m2b1">${anchor}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<button class="svelte-20m2b1"><label${attr("for", fileLoaderInputId, false)} class="svelte-20m2b1">select</label></button> <input${attr("id", fileLoaderInputId, false)} type="file" accept=".csv" class="file-input svelte-20m2b1">`;
  }
  $$payload.out += `${anchor}</div> <div class="file-name-container svelte-20m2b1">${escape_text(FileObject?.name)}</div> <button${attr(
    "class",
    `delete-file-button svelte-20m2b1 ${stringify([
      ""
    ].filter(Boolean).join(" "))}`,
    false
  )}>${anchor_1}`;
  DeleteIcon($$payload);
  $$payload.out += `${anchor_1}</button></div>`;
  bind_props($$props, { onFile });
  pop();
}
const Analyses = Object.freeze([
  "min",
  "max",
  "avg",
  "sum",
  "mean",
  "median"
]);
const fakeNetworkLatency$1 = () => new Promise((resolve) => {
  const timeOut = () => Math.trunc(Math.random() * 100) + 100;
  const t = setTimeout(
    () => {
      clearTimeout(t);
      resolve();
    },
    timeOut()
  );
});
const NUM_OF_BINNING_RESULTS_PER_JOB = 15;
const genJob = async function* () {
  for (let i = 0; i < NUM_OF_BINNING_RESULTS_PER_JOB; i += 1) {
    const binLowerBoundary = Math.random();
    const binUpperBoundary = Math.random() + binLowerBoundary;
    const binCenter = (binLowerBoundary + binUpperBoundary) / 2;
    const binningResult = {
      id: i,
      binLowerBoundary,
      binUpperBoundary,
      binCenter,
      analyses: /* @__PURE__ */ new Map()
    };
    for (const fieldName of Analyses) {
      binningResult.analyses.set(fieldName, 0);
    }
    yield binningResult;
  }
};
let BinningResults$1 = class BinningResults {
  #internalState = /* @__PURE__ */ new Map();
  #activeJobId = null;
  state = /* @__PURE__ */ new Map();
  #refreshState() {
    if (this.#activeJobId === null) {
      return;
    }
    const newState = structuredClone(this.#internalState.get(this.#activeJobId));
    this.state = newState;
  }
  activateJobId(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    this.#activeJobId = jobId;
    this.#refreshState();
  }
  async #generateFakeStatistics(jobId = null, binningId = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    if (binningId === null) {
      throw new ReferenceError("binningId is undefined");
    }
    if (this.#internalState.has(jobId) === false) {
      throw new ReferenceError(`a job w/ ${jobId} does not exist`);
    }
    const job = this.#internalState.get(jobId);
    const binningResult = job.get(binningId);
    for await (const field of Analyses) {
      await fakeNetworkLatency$1();
      binningResult.analyses.set(field, Math.random());
      job.set(binningId, binningResult);
      this.#internalState.set(job, job);
      this.#refreshState();
    }
  }
  async #generateFakeJobResults(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    const jobGenerator = genJob();
    for await (const binningResult of jobGenerator) {
      await fakeNetworkLatency$1();
      const job = this.#internalState.get(jobId);
      job.set(binningResult.id, structuredClone(binningResult));
      this.#internalState.set(jobId, job);
      this.#refreshState();
      this.#generateFakeStatistics(jobId, binningResult.id);
    }
  }
  registerJob(jobId = null) {
    if (jobId === null) {
      throw new ReferenceError("jobId is undefined");
    }
    this.#internalState.set(jobId, /* @__PURE__ */ new Map());
    this.#generateFakeJobResults(jobId);
  }
};
const BinningResultsStore = new BinningResults$1();
function JobComponent($$payload, $$props) {
  push(true);
  let {
    /**
     * @type {Object}
    */
    job
  } = $$props;
  let numOfUploadedChunks = job?.extra?.numOfUploadedChunks;
  $$payload.out += `<fieldset${attr("id", `job:${stringify(job.id)}`, false)}${attr("class", `job-component svelte-12yat8e ${stringify([""].filter(Boolean).join(" "))}`, false)}><legend class="svelte-12yat8e">${escape_text(job.id)}</legend> <div class="source-data-file svelte-12yat8e">${escape_text(job.file.name)}</div> <div class="records-info svelte-12yat8e">${escape(job.progress.recordsProcessed)}/${escape(job.progress.recordsTotal)}</div> <div class="channel svelte-12yat8e">${escape_text(job.channelName)}</div> <progress class="progress svelte-12yat8e"${attr("max", job.progress.recordsTotal, false)}${attr("value", job.progress.recordsProcessed, false)} aria-label="job progress"></progress> <progress class="upload svelte-12yat8e"${attr("max", job.extra.numOfChunksToUpload, false)}${attr("value", numOfUploadedChunks, false)} aria-label="job progress"></progress></fieldset>`;
  bind_props($$props, { job });
  pop();
}
function Jobs2($$payload, $$props) {
  push(true);
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(JobsStore.state.values());
  $$payload.out += `<div class="jobs-component svelte-4b7hzj"><h2 class="jobs-caption svelte-4b7hzj">jobs</h2> <div class="jobs-list svelte-4b7hzj">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const job = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<input${attr("id", `radio:${stringify(job.id)}`, false)} type="radio" class="radio-input svelte-4b7hzj" name="jobs"${attr("data-job-id", job.id, false)}> <label class="job-container svelte-4b7hzj"${attr("for", `radio:${stringify(job.id)}`, false)}>${anchor_2}`;
    JobComponent($$payload, { job });
    $$payload.out += `${anchor_2}</label>${anchor_1}`;
  }
  $$payload.out += `${anchor}</div></div>`;
  pop();
}
function Table($$payload, $$props) {
  push(true);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div class="table svelte-19xaif0">${anchor}`;
  slot($$payload, $$props.$$slots?.["table-rows"], { class: "table-rows" }, null);
  $$payload.out += `${anchor}</div>`;
  pop();
}
function MinMaxBoundary($$payload, $$props) {
  push(true);
  let { isM = false, isN = false } = $$props;
  $$payload.out += `<div class="min-max svelte-5cvxqg"><div class="min-max-a svelte-5cvxqg">a</div> <div${attr("class", `min-max-m svelte-5cvxqg ${stringify([isM ? "isM" : ""].filter(Boolean).join(" "))}`, false)}>m</div> <div${attr("class", `min-max-n svelte-5cvxqg ${stringify([isN ? "isN" : ""].filter(Boolean).join(" "))}`, false)}>n</div></div>`;
  bind_props($$props, { isM, isN });
  pop();
}
function HorizontalCenter($$payload, $$props) {
  push(true);
  let { width = "24", height = "24" } = $$props;
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg"${attr("width", width, false)}${attr("height", height, false)} viewBox="0 0 24 24"><path fill="currentColor" d="m5.005 15.995l4-4l-4-4v3h-3v2h3zm14-5v-3l-4 4l4 4v-3h3v-2h-2.072zm-8 7h2v3h-2zm0-5h2v3h-2zm0-5h2v3h-2zm0-5h2v3h-2z"></path></svg>`;
  bind_props($$props, { width, height });
  pop();
}
function MultiValueCell($$payload, $$props) {
  push(true);
  let {
    /**
     * @type {Map | null}
    */
    dataObject = null,
    /**
     * @type {function}
    */
    format = (key, value) => {
      throw new ReferenceError("formatter is undefined");
    }
  } = $$props;
  const anchor = create_anchor($$payload);
  $$payload.out += `<div class="multi-value-cell svelte-1mybsko">${anchor}`;
  if (dataObject) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(dataObject.entries());
    $$payload.out += `${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const $$item = each_array[$$index];
      const [key, value] = $$item;
      const anchor_2 = create_anchor($$payload);
      $$payload.out += `${anchor_2}<div${attr("class", `multi-value-cell-value ${stringify(key)} svelte-1mybsko`, false)}><div class="val svelte-1mybsko">${escape_text(format(key, value))}</div> <div class="val-label svelte-1mybsko">${escape_text(key)}</div></div>${anchor_2}`;
    }
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<div class="empty-values svelte-1mybsko">empty</div>`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { dataObject, format });
  pop();
}
const toFixed = (n = 0, f = 2) => {
  return Number.parseFloat(n).toFixed(f);
};
const formatNumber = (key = null, value = null) => {
  switch (key) {
    case "avg":
    case "mean":
    case "sum":
    case "min":
    case "max": {
      return toFixed(Number.parseFloat(value), 5);
    }
    case "median": {
      return toFixed(Number.parseFloat(value), 2);
    }
    default: {
      throw new TypeError(`unknown key: ${key}`);
    }
  }
};
function BinningResults2($$payload, $$props) {
  push(true);
  let itemsMap = BinningResultsStore.state;
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Table($$payload, {
    $$slots: {
      "table-rows": ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        const anchor_2 = create_anchor($$payload2);
        const anchor_3 = create_anchor($$payload2);
        const anchor_4 = create_anchor($$payload2);
        const each_array = ensure_array_like(itemsMap?.values());
        $$payload2.out += `<div slot="table-rows" class="table-rows svelte-1l0kt81"><div class="binning-result svelte-1l0kt81"><div class="bin-id svelte-1l0kt81">bin</div> <div class="bin-lower-boundary svelte-1l0kt81">${anchor_1}`;
        MinMaxBoundary($$payload2, { isN: true });
        $$payload2.out += `${anchor_1}</div> <div class="bin-upper-boundary svelte-1l0kt81">${anchor_2}`;
        MinMaxBoundary($$payload2, { isM: true });
        $$payload2.out += `${anchor_2}</div> <div class="bin-center svelte-1l0kt81">${anchor_3}`;
        HorizontalCenter($$payload2, { width: "2.5rem", height: "2.5rem" });
        $$payload2.out += `${anchor_3}</div> <div class="bin-analyses svelte-1l0kt81">analyses</div></div> ${anchor_4}`;
        for (let $$index = 0; $$index < each_array.length; $$index++) {
          const binningResult = each_array[$$index];
          const anchor_5 = create_anchor($$payload2);
          const anchor_6 = create_anchor($$payload2);
          $$payload2.out += `${anchor_5}<div${attr("id", binningResult.id, false)} class="binning-result svelte-1l0kt81"><div class="bin-id svelte-1l0kt81">${escape_text(binningResult.id)}</div> <div class="bin-lower-boundary svelte-1l0kt81">${escape_text(toFixed(binningResult.binLowerBoundary, 3))}</div> <div class="bin-upper-boundary svelte-1l0kt81">${escape_text(toFixed(binningResult.binUpperBoundary, 3))}</div> <div class="bin-center svelte-1l0kt81">${escape_text(toFixed(binningResult.binCenter))}</div> <div class="bin-analyses svelte-1l0kt81">${anchor_6}`;
          MultiValueCell($$payload2, {
            dataObject: binningResult.analyses,
            format: formatNumber
          });
          $$payload2.out += `${anchor_6}</div></div>${anchor_5}`;
        }
        $$payload2.out += `${anchor_4}</div>`;
      }
    }
  });
  $$payload.out += `${anchor}`;
  pop();
}
function BinningChart($$payload, $$props) {
  push(true);
  $$payload.out += `<div class="binning-chart-component svelte-1450qui"><h1>binning chart</h1></div>`;
  pop();
}
class DataColumn {
  state = [];
  constructor() {
    const result = [];
    for (let i = 0; i < 100; i += 1) {
      const isBelowZero = Math.random() < 0.5;
      const absValue = Math.random();
      const value = {
        id: i,
        value: isBelowZero ? 0 - absValue : absValue,
        bin: 0
      };
      result.push(value);
    }
    this.state = structuredClone(result);
  }
}
const DataColumnStore = new DataColumn();
function Number$1($$payload, $$props) {
  push(true);
  let { n = NaN } = $$props;
  let isNegative = n < 0;
  let isZero = n === 0;
  let N = toFixed(Math.abs(n), 4);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div class="number svelte-k4qzsr"></div> ${anchor}`;
  if (isNegative) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<span${attr("class", `number svelte-k4qzsr ${stringify([isNegative ? "isNegative" : ""].filter(Boolean).join(" "))}`, false)}>${escape_text(N)}</span>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    if (isZero) {
      $$payload.out += "<!--ssr:if:true-->";
      $$payload.out += `<span${attr("class", `number svelte-k4qzsr ${stringify([isZero ? "isZero" : ""].filter(Boolean).join(" "))}`, false)}>${escape_text(N)}</span>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      $$payload.out += `<span class="number svelte-k4qzsr">${escape_text(N)}</span>`;
    }
    $$payload.out += `${anchor_1}`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { n });
  pop();
}
function DataFieldComponent($$payload, $$props) {
  push(true);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Table($$payload, {
    $$slots: {
      "table-rows": ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        const each_array = ensure_array_like(DataColumnStore.state);
        $$payload2.out += `<div slot="table-rows" class="table-rows svelte-h4j3xk"><div class="table-row svelte-h4j3xk"><div class="id svelte-h4j3xk">id</div> <div class="value svelte-h4j3xk">value</div> <div class="bin svelte-h4j3xk">bin</div></div> ${anchor_1}`;
        for (let $$index = 0; $$index < each_array.length; $$index++) {
          const $$item = each_array[$$index];
          const { id, value, bin } = $$item;
          const anchor_2 = create_anchor($$payload2);
          const anchor_3 = create_anchor($$payload2);
          $$payload2.out += `${anchor_2}<div class="table-row svelte-h4j3xk"><div class="id svelte-h4j3xk">${escape_text(id)}</div> <div class="value svelte-h4j3xk">${anchor_3}`;
          Number$1($$payload2, { n: value });
          $$payload2.out += `${anchor_3}</div> <div class="bin svelte-h4j3xk">${escape_text(bin)}</div></div>${anchor_2}`;
        }
        $$payload2.out += `${anchor_1}</div>`;
      }
    }
  });
  $$payload.out += `${anchor}`;
  pop();
}
const NETWORK_FRAME_SIZE = 1500;
const fakeNetworkLatency = () => new Promise((resolve) => {
  const timeOut = () => Math.random() * 10 + 1;
  const t = setTimeout(
    () => {
      clearTimeout(t);
      resolve();
    },
    timeOut()
  );
});
const uploadFile = async (fileObject, jobId) => {
  JobsStore.updateNumberOfChunksToUpload(jobId, Math.trunc(fileObject.size / NETWORK_FRAME_SIZE));
  const genReadChunks = async function* () {
    const fileStreamReader = new ReadableStreamBYOBReader(fileObject.stream());
    while (true) {
      const view = new Uint8Array(NETWORK_FRAME_SIZE);
      const { done, value } = await fileStreamReader.read(view);
      await fakeNetworkLatency();
      if (done === false) {
        yield { done, value };
      } else {
        return;
      }
    }
  };
  crypto.randomUUID();
  const chunkGenerator = genReadChunks();
  for await (const { done, value } of chunkGenerator) {
    await sendChunk(jobId);
  }
  return Promise.resolve;
};
const sendChunk = async (jobId, frame, tx, done) => {
  JobsStore.updateNewChunkUploaded(jobId);
  return Promise.resolve;
};
const fakeJobResults = async (fileObject = null) => {
  if (fileObject === null) {
    throw new ReferenceError("fileObject is undefined");
  }
  if (fileObject instanceof File === false) {
    throw new TypeError("fileObject is not a File");
  }
  const jobId = JobsStore.add(fileObject);
  await uploadFile(fileObject, jobId);
  BinningResultsStore.registerJob(jobId);
};
function _page($$payload, $$props) {
  push(true);
  const handleUploadFileRequest = async (e = null) => {
    const {
      type = null,
      /**
       * @type {File}
      */
      payload = null
    } = e;
    crypto.randomUUID();
    if (typeof type === "undefined" || type === null) {
      throw new TypeError("undefined event type", e);
    }
    if (type !== "file") {
      throw new TypeError('not of the "file" type');
    }
    fakeJobResults(payload);
  };
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  const anchor_4 = create_anchor($$payload);
  $$payload.out += `<article class="svelte-18uclki"><section class="file-loader-container svelte-18uclki">${anchor}`;
  FileLoader($$payload, { onFile: handleUploadFileRequest });
  $$payload.out += `${anchor}</section> <section class="jobs-container svelte-18uclki">${anchor_1}`;
  Jobs2($$payload);
  $$payload.out += `${anchor_1}</section> <section class="field-data-container svelte-18uclki"><div class="section-caption svelte-18uclki">wind shear rm</div> <div class="section-content svelte-18uclki">${anchor_2}`;
  DataFieldComponent($$payload);
  $$payload.out += `${anchor_2}</div></section> <section class="job-results-container svelte-18uclki"><div class="section-caption svelte-18uclki">binning results</div> <div class="section-content svelte-18uclki">${anchor_3}`;
  BinningResults2($$payload);
  $$payload.out += `${anchor_3}</div></section> <section class="binning-chart-container svelte-18uclki">${anchor_4}`;
  BinningChart($$payload);
  $$payload.out += `${anchor_4}</section></article>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-xyep8dLM.js.map
