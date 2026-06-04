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
  assert(await evaluate("document.querySelector('h1')?.textContent") === "Practice one clear move at a time.", "Start screen did not render.");

  await evaluate(`(() => {
    const values = {
      title: "Smoke Test Journey",
      primaryPatternChoice: "custom",
      primaryPatternCustom: "reacting automatically",
      triggersChoice: "custom",
      triggersCustom: "unexpected feedback",
      thoughtsChoice: "custom",
      thoughtsCustom: "I must defend myself",
      emotionsChoice: "custom",
      emotionsCustom: "tension",
      behaviorsChoice: "custom",
      behaviorsCustom: "arguing",
      futureResponseChoice: "custom",
      futureResponseCustom: "pause and listen",
      statement: "I am changing my automatic reaction.",
      firstDeclarationChoice: "custom",
      firstDeclarationCustom: "reacting automatically",
      duration: "15",
      practiceTime: "07:30"
    };
    const form = document.querySelector("#preparationForm");
    for (const [name, value] of Object.entries(values)) form.elements[name].value = value;
    form.requestSubmit();
  })()`);
  await wait(250);
  assert(await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney.currentDay") === 1, "Preparation did not create the journey.");
  assert(await evaluate("document.querySelector('h1')?.textContent") === "The Habit of Being Yourself", "The journey skipped the Introduction.");

  for (let lesson = 1; lesson <= 10; lesson += 1) {
    await evaluate(`(() => {
      const form = document.querySelector("#foundationForm");
      form.elements.reflection.value = "Foundation reflection ${lesson}";
      form.elements.reviewed.checked = true;
      form.elements.foundationActionCue.value = "when the old pattern appears";
      form.elements.foundationActionResponse.value = "pause and choose one grounded action";
      form.elements.foundationActionMinimum.value = "pause for three seconds";
      form.elements.foundationActionProof.value = "write one sentence";
      form.requestSubmit();
    })()`);
    await wait(80);
    await evaluate(`(() => {
      const form = document.querySelector("#actionFollowUpForm");
      if (!form) return;
      form.elements.outcome.value = "minimum";
      form.elements.note.value = "I paused for three seconds.";
      form.requestSubmit();
    })()`);
    await wait(80);
  }

  const afterFoundations = await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney");
  assert(afterFoundations.foundationsComplete === true, "Foundations did not complete.");
  assert(afterFoundations.foundationRecords.length === 10, "Foundation reflections were not preserved.");
  assert(afterFoundations.foundationRecords.every((record) => record.actionContract?.proof), "Foundation action contracts were not preserved.");
  assert(afterFoundations.foundationRecords.every((record) => record.actionFollowUp?.outcome), "Foundation One Move follow-through was not preserved.");
  assert(await evaluate("document.querySelector('h1')?.textContent") === "Prepare the space", "Week One did not unlock after Chapter 9.");

  await evaluate(`(() => {
    document.querySelector("#reflection").value = "This should remain blocked.";
    document.querySelector("#dailyActionCue").value = "feedback";
    document.querySelector("#dailyActionResponse").value = "pause and listen";
    document.querySelector("#dailyActionMinimum").value = "take one breath";
    document.querySelector("#dailyActionProof").value = "write one sentence";
    document.querySelector("#dailyPracticeForm").requestSubmit();
  })()`);
  await wait(100);
  assert((await evaluate("document.querySelector('.toast')?.textContent")).includes("Complete the meditation"), "Daily completion was not blocked before meditation.");

  for (let day = 1; day <= 7; day += 1) {
    await evaluate(`(() => {
      document.querySelector("#declaration").value = "reacting automatically";
      document.querySelector("#reflection").value = "Reflection for day ${day}";
      document.querySelector("#dailyActionCue").value = "feedback";
      document.querySelector("#dailyActionResponse").value = "pause and listen";
      document.querySelector("#dailyActionMinimum").value = "take one breath";
      document.querySelector("#dailyActionProof").value = "write one sentence";
      document.querySelector("#evidence").value = "I noticed a choice.";
      document.querySelector("[data-action='timer-start']").click();
      document.querySelector("[data-action='timer-finish']").click();
      document.querySelector("#dailyPracticeForm").requestSubmit();
    })()`);
    await wait(120);
    await evaluate(`(() => {
      const form = document.querySelector("#actionFollowUpForm");
      if (!form) return;
      form.elements.outcome.value = "completed";
      form.elements.note.value = "I chose the new response.";
      form.requestSubmit();
    })()`);
    await wait(80);
  }

  const afterWeek = await evaluate("JSON.parse(localStorage.getItem('new-self-practice-state-v1')).activeJourney");
  assert(afterWeek.records.length === 7, "Seven daily records were not preserved.");
  assert(afterWeek.records.every((record) => record.actionContract?.proof), "Daily One Move contracts were not preserved.");
  assert(afterWeek.records.every((record) => record.actionFollowUp?.outcome), "Daily One Move follow-through was not preserved.");
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

  console.log("SMOKE_TEST_OK: guided setup, ordered Foundations, precise One Moves, enforced follow-through, meditation gate, 7-day sequence, weekly repeat, preservation, and Settings override/jump");
} finally {
  socket.close();
  edge.kill();
}
