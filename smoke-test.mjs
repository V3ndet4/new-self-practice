import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9334;
const profile = join(tmpdir(), `new-self-practice-smoke-${Date.now()}`);
const edge = spawn(edgePath, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank"
], { stdio: "ignore" });

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const target = targets.find((item) => item.type === "page");
      if (target) return target;
    } catch {
      // Edge is still starting.
    }
    await wait(150);
  }
  throw new Error("Edge remote debugging did not start.");
}

const target = await getTarget();
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const exceptions = [];
let messageId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown") {
    exceptions.push(message.params.exceptionDetails.text);
  }
});

await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Page.navigate", { url: "http://127.0.0.1:4174/" });
  await wait(800);
  assert(await evaluate("document.querySelector('h1')?.textContent") === "Practice becoming someone new.", "Start screen did not render.");

  await evaluate(`(() => {
    const values = {
      title: "Smoke Test Journey",
      primaryPattern: "reacting automatically",
      triggers: "unexpected feedback",
      thoughts: "I must defend myself",
      emotions: "tension",
      behaviors: "arguing",
      futureResponse: "pause and listen",
      statement: "I am changing my automatic reaction.",
      firstDeclaration: "reacting automatically",
      duration: "15",
      practiceTime: "07:30"
    };
    const form = document.querySelector("#preparationForm");
    for (const [name, value] of Object.entries(values)) form.elements[name].value = value;
    form.requestSubmit();
  })()`);
  await wait(250);
  assert(await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney.currentDay") === 1, "Preparation did not create the journey.");

  await evaluate(`(() => {
    document.querySelector("#reflection").value = "This should remain blocked.";
    document.querySelector("#dailyPracticeForm").requestSubmit();
  })()`);
  await wait(100);
  assert((await evaluate("document.querySelector('.toast')?.textContent")).includes("Complete the meditation"), "Daily completion was not blocked before meditation.");

  for (let day = 1; day <= 7; day += 1) {
    await evaluate(`(() => {
      document.querySelector("#declaration").value = "reacting automatically";
      document.querySelector("#reflection").value = "Reflection for day ${day}";
      document.querySelector("#trigger").value = "feedback";
      document.querySelector("#newResponse").value = "pause and listen";
      document.querySelector("#evidence").value = "I noticed a choice.";
      document.querySelector("[data-action='timer-start']").click();
      document.querySelector("[data-action='timer-finish']").click();
      document.querySelector("#dailyPracticeForm").requestSubmit();
    })()`);
    await wait(120);
  }

  const afterWeek = await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney");
  assert(afterWeek.records.length === 7, "Seven daily records were not preserved.");
  assert(afterWeek.needsReview === true, "Weekly review did not unlock after seven days.");

  await evaluate(`(() => {
    const form = document.querySelector("#weeklyReviewForm");
    form.elements.win.value = "I noticed more choice.";
    form.elements.recurring.value = "Defensiveness remained familiar.";
    form.elements.weakening.value = "I paused before reacting.";
    form.elements.nextIntention.value = "Practice the pause.";
    form.querySelector("button[value='repeat']").click();
  })()`);
  await wait(180);
  const afterRepeat = await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney");
  assert(afterRepeat.currentCycle === 2, "Repeat did not start a new cycle.");
  assert(afterRepeat.records.length === 7 && afterRepeat.reviews.length === 1, "Repeat erased preserved entries.");

  await evaluate(`(() => {
    [...document.querySelectorAll("[data-view]")].find((item) => item.dataset.view === "settings").click();
    const form = document.querySelector("#progressionForm");
    form.elements.flexibleProgression.checked = true;
    form.requestSubmit();
  })()`);
  await wait(120);
  assert(await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).settings.flexibleProgression") === true, "Flexible Progression override did not save.");

  await evaluate(`(() => {
    [...document.querySelectorAll("[data-view]")].find((item) => item.dataset.view === "journey").click();
    document.querySelector("[data-action='jump-day'][data-week='4'][data-day='7']").click();
  })()`);
  await wait(120);
  const afterJump = await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney");
  assert(afterJump.currentWeek === 4 && afterJump.currentDay === 7, "Flexible Progression did not allow an explicit future-day jump.");
  assert(exceptions.length === 0, `Browser exceptions: ${exceptions.join("; ")}`);

  console.log("SMOKE_TEST_OK: preparation, meditation gate, 7-day sequence, weekly repeat, preservation, and Settings override/jump");
} finally {
  socket.close();
  edge.kill();
}
