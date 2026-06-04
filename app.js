"use strict";

const APP_VERSION = "v0.1.0";
const STORAGE_KEY = "new-self-practice-state-v1";
const DECLARATION_PREFIX = "Universal consciousness with me and all around me, I have been";
const DECLARATION_SUFFIX = "and I truly want to change that from this limited state of being.";
const app = document.getElementById("app");

const ICONS = {
  today: "◉",
  journey: "◇",
  journal: "▤",
  growth: "↗",
  guide: "⌁",
  settings: "⚙"
};

const WEEK_CONTENT = [
  {
    week: 1,
    title: "Open the Door",
    shortTitle: "Induction",
    page: "Chapter 10 and Appendices A-B, pages 253-259 and 325-330",
    focus: "Settle beyond the familiar environment, body, and sense of time.",
    why: "This week establishes the repeatable entry practice that every later week builds upon.",
    practiceSteps: [
      "Settle into your chosen practice space and let the outside environment wait.",
      "Move attention slowly through the body without trying to change what you notice.",
      "Notice the space around the body and allow attention to become broader.",
      "Return gently whenever familiar thoughts or physical restlessness pull you away."
    ],
    daily: [
      ["Prepare the space", "What helped your body understand that it was time to become still?", "Notice one environmental cue that usually puts you on autopilot."],
      ["Notice the body", "Where did your body hold the familiar emotional state today?", "Pause once today and observe the body before reacting."],
      ["Broaden attention", "What changed when your attention moved beyond one thought or sensation?", "Practice widening attention during one ordinary moment."],
      ["Stay with discomfort", "What resistance appeared when you stopped following the familiar routine?", "Name resistance as training instead of a reason to quit."],
      ["Return without judgment", "How did you return after your attention wandered?", "Use one distraction as a cue to return to intention."],
      ["Recognize stillness", "What did a quieter internal state feel like today?", "Create one minute of stillness before an automatic behavior."],
      ["Integrate the induction", "Which part of induction now feels most natural, and which needs another cycle?", "Protect your practice time as evidence of the new self."]
    ]
  },
  {
    week: 2,
    title: "Prune Away the Old Pattern",
    shortTitle: "Recognize and Release",
    page: "Chapter 11, pages 260-277",
    focus: "Recognize the old self, declare the pattern honestly, and practice releasing control.",
    why: "A pattern becomes changeable when it is seen clearly instead of performed automatically.",
    practiceSteps: [
      "Begin with the induction you practiced in Week One.",
      "Recognize the thoughts, feelings, and behaviors connected to the old identity.",
      "Admit the pattern without punishment and speak your Change Declaration.",
      "Release the need to solve the whole pattern during this one practice."
    ],
    daily: [
      ["Recognize the thought", "Which repeated thought most clearly belongs to the old pattern?", "Label the thought when it appears without arguing with it."],
      ["Recognize the emotion", "Which familiar emotion keeps the old identity feeling real?", "Notice the emotion in the body before giving it a story."],
      ["Recognize the behavior", "What automatic action keeps repeating the old state?", "Delay the automatic behavior long enough to make a choice."],
      ["Admit without hiding", "What became easier to see when you stopped defending the pattern?", "Tell yourself the truth privately and without shame."],
      ["Declare change", "What made today's declaration feel honest and specific?", "Repeat the declaration when the old pattern becomes active."],
      ["Practice surrender", "What would it mean to release the need to control the outcome?", "Let one uncertainty remain unresolved while you choose your state."],
      ["See the whole pattern", "How do the thought, emotion, and behavior reinforce one another?", "Catch the pattern at its earliest visible point."]
    ]
  },
  {
    week: 3,
    title: "Dismantle the Old Memory",
    shortTitle: "Observe and Redirect",
    page: "Chapter 12, pages 278-290",
    focus: "Observe the old program in real time, remind yourself of your intention, and redirect.",
    why: "Repeated interruption weakens the practiced connection between trigger and automatic response.",
    practiceSteps: [
      "Begin with induction, recognition, declaration, and release.",
      "Observe the old self as if you are studying a familiar program.",
      "Remind yourself who you no longer choose to be.",
      "Redirect attention, thought, and behavior toward a deliberate response."
    ],
    daily: [
      ["Observe the trigger", "What happened immediately before the old state became active?", "Treat the trigger as a reminder to become conscious."],
      ["Observe the sequence", "What is the exact order from trigger to thought to emotion to action?", "Interrupt the sequence one step earlier than yesterday."],
      ["Remember the choice", "Which short reminder helped you stop identifying with the old response?", "Use a clear internal cue: This is the old pattern."],
      ["Redirect the body", "How did changing posture, breath, or movement affect the reaction?", "Move the body differently before choosing your response."],
      ["Redirect attention", "Where can attention go that supports the person you are becoming?", "Withdraw attention from one familiar mental rehearsal."],
      ["Redirect behavior", "What small new action contradicted the old identity today?", "Choose one visible behavior the old self would not choose."],
      ["Strengthen interruption", "Where is the space between trigger and response becoming easier to find?", "Use that space deliberately at least once today."]
    ]
  },
  {
    week: 4,
    title: "Create the New Mind",
    shortTitle: "Create and Rehearse",
    page: "Chapter 13, pages 291-309",
    focus: "Define, feel, and mentally rehearse the thoughts and actions of the new self.",
    why: "The practice becomes forward-looking: attention is given to the identity and responses the user intends to embody.",
    practiceSteps: [
      "Move through the prior weeks' induction, recognition, declaration, release, observation, and redirection.",
      "Choose a clear quality or response that belongs to the new self.",
      "Mentally rehearse how that new self thinks and behaves in a real situation.",
      "Practice feeling the meaning of that choice before the outside situation changes."
    ],
    daily: [
      ["Define the new response", "What would the new self choose in the situation you rehearsed?", "Write one response clearly enough to practice."],
      ["Think as the new self", "Which thought belongs to your intended identity?", "Replace one old rehearsal with a deliberate new one."],
      ["Feel the new state", "Which elevated or expansive feeling supports your new response?", "Return to that feeling before one ordinary decision."],
      ["Rehearse a trigger", "How did the new self move through a familiar trigger?", "Mentally rehearse before entering a likely trigger."],
      ["Rehearse behavior", "What specific action makes the new identity visible?", "Perform one small action as evidence, not performance."],
      ["Live transparently", "Where did your inner intention and outer behavior match today?", "Let one interaction reflect the work you practiced."],
      ["Integrate the new self", "What evidence shows that a different response is becoming available?", "Choose the next identity pattern you want to strengthen."]
    ]
  }
];

const GUIDE_SECTIONS = [
  ["Preparation", "Chapter 9, pages 242-252", "Clarify why you are practicing, protect a consistent setting and time, and learn the process in manageable steps."],
  ["Week One: Induction", "Chapter 10 and Appendices A-B, pages 253-259 and 325-330", "Practice settling attention beyond familiar environmental and bodily cues."],
  ["Week Two: Recognizing, Declaring, and Surrendering", "Chapter 11, pages 260-277", "Identify the old identity pattern honestly and practice loosening attachment to it."],
  ["Week Three: Observing, Reminding, and Redirecting", "Chapter 12, pages 278-290", "Catch the old program in real time and deliberately redirect your response."],
  ["Week Four: Creating and Rehearsing", "Chapter 13, pages 291-309", "Rehearse the thoughts, feelings, and actions of the person you intend to become."],
  ["Living the Practice", "Chapter 14, pages 310-320", "Use daily life as the place where inner practice becomes visible evidence."]
];

const DEFAULT_STATE = {
  version: 1,
  activeJourney: null,
  archives: [],
  journal: [],
  settings: {
    duration: 15,
    spokenGuidance: true,
    flexibleProgression: false,
    dailyReminder: "07:30",
    eveningReminder: "20:30",
    remindersEnabled: false,
    journalQuery: ""
  }
};

let state = loadState();
let activeView = state.activeJourney ? "today" : "journey";
let practiceSession = createPracticeSession();
let timerInterval = null;
let reminderTimers = [];

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || parsed.version !== 1) return structuredClone(DEFAULT_STATE);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      archives: Array.isArray(parsed.archives) ? parsed.archives : [],
      journal: Array.isArray(parsed.journal) ? parsed.journal : []
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createPracticeSession() {
  const seconds = Number(state?.settings?.duration || 15) * 60;
  return { journeyId: "", week: 0, cycle: 0, day: 0, total: seconds, remaining: seconds, running: false, complete: false, started: false };
}

function resetPracticeSession() {
  clearInterval(timerInterval);
  timerInterval = null;
  window.speechSynthesis?.cancel();
  practiceSession = createPracticeSession();
}

function currentWeek() {
  return WEEK_CONTENT[(state.activeJourney?.currentWeek || 1) - 1] || WEEK_CONTENT[0];
}

function currentDayContent() {
  const week = currentWeek();
  return week.daily[(state.activeJourney?.currentDay || 1) - 1] || week.daily[0];
}

function recordKey(week, cycle, day) {
  return `${week}-${cycle}-${day}`;
}

function getRecords(journey = state.activeJourney) {
  return Array.isArray(journey?.records) ? journey.records : [];
}

function getRecord(journey, week, cycle, day) {
  return getRecords(journey).find((item) => item.week === week && item.cycle === cycle && item.day === day);
}

function weekRecords(journey, week, cycle) {
  return getRecords(journey).filter((item) => item.week === week && item.cycle === cycle);
}

function previousDeclarations() {
  const declarations = [];
  for (const journey of [state.activeJourney, ...state.archives].filter(Boolean)) {
    for (const record of getRecords(journey)) {
      if (record.declaration && !declarations.includes(record.declaration)) declarations.push(record.declaration);
    }
  }
  return declarations.slice(-20).reverse();
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function average(values) {
  if (!values.length) return 0;
  return Math.round((values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length) * 10) / 10;
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function render() {
  if (!state.activeJourney) {
    renderStart();
    return;
  }

  app.className = "app-shell";
  const renderer = {
    today: renderToday,
    journey: renderJourney,
    journal: renderJournal,
    growth: renderGrowth,
    guide: renderGuide,
    settings: renderSettings
  }[activeView] || renderToday;

  app.innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">N</div>
          <div>
            <p class="brand-title">New Self Practice</p>
            <p class="brand-subtitle">${APP_VERSION}</p>
          </div>
        </div>
        <nav class="nav" aria-label="Main navigation">
          ${navButton("today", "Today")}
          ${navButton("journey", "Journey")}
          ${navButton("journal", "Journal")}
          ${navButton("growth", "Growth")}
          ${navButton("guide", "Book Guide")}
          ${navButton("settings", "Settings")}
        </nav>
        <p class="sidebar-note">Private by default. Reflections and progress remain on this device unless you export an encrypted backup.</p>
      </aside>
      <main class="main"><div class="page">${renderer()}</div></main>
    </div>
  `;
  updateTimerDisplay();
}

function navButton(view, label) {
  return `<button class="nav-button ${activeView === view ? "active" : ""}" type="button" data-view="${view}"><span>${ICONS[view]}</span><span>${label}</span></button>`;
}

function renderStart() {
  const archiveMarkup = state.archives.length ? `
    <section class="panel">
      <p class="eyebrow">Completed journeys</p>
      <h2>Your prior work remains available</h2>
      ${state.archives.map((journey) => `
        <article class="entry">
          <div class="meta-row"><span class="pill">${escapeHTML(formatDate(journey.completedAt))}</span><span class="pill gold">${getRecords(journey).length} practice days</span></div>
          <h3>${escapeHTML(journey.title)}</h3>
          <p>${escapeHTML(journey.statement)}</p>
          <button class="button secondary" type="button" data-action="view-archive" data-journey-id="${escapeHTML(journey.id)}">View preserved entries</button>
        </article>
      `).join("")}
    </section>
  ` : "";

  app.className = "app-shell";
  app.innerHTML = `
    <main class="main">
      <div class="page">
        <section class="hero">
          <p class="eyebrow">New Self Practice</p>
          <h1>Practice becoming someone new.</h1>
          <p class="lead">A private four-week companion for changing one familiar habit or identity pattern through daily meditation, honest declaration, and real-life rehearsal.</p>
          <div class="hero-proof">
            <span class="pill">One active journey</span>
            <span class="pill">Seven days per week</span>
            <span class="pill">Private on your device</span>
            <span class="pill">Progress preserved</span>
          </div>
        </section>

        <section class="panel" style="margin-top:18px;">
          <p class="eyebrow">Preparation</p>
          <h2>Choose the one pattern this journey will change.</h2>
          <p class="lead">Be specific enough to recognize the pattern in real life. You can revise these answers later without losing prior entries.</p>
          <form id="preparationForm" class="form">
            <div class="field">
              <label for="title">Journey name</label>
              <input id="title" name="title" required maxlength="80" placeholder="Becoming calm under criticism">
            </div>
            <div class="field">
              <label for="primaryPattern">Primary habit or identity pattern</label>
              <textarea id="primaryPattern" name="primaryPattern" required placeholder="I withdraw, become defensive, and replay criticism for hours."></textarea>
            </div>
            <div class="grid two">
              <div class="field"><label for="triggers">Common triggers</label><textarea id="triggers" name="triggers" required placeholder="Feedback, feeling misunderstood, raised voices"></textarea></div>
              <div class="field"><label for="thoughts">Recurring thoughts</label><textarea id="thoughts" name="thoughts" required placeholder="They do not respect me. I am failing."></textarea></div>
              <div class="field"><label for="emotions">Familiar emotions</label><textarea id="emotions" name="emotions" required placeholder="Defensiveness, shame, anger"></textarea></div>
              <div class="field"><label for="behaviors">Automatic behaviors</label><textarea id="behaviors" name="behaviors" required placeholder="Shutting down, arguing, avoiding"></textarea></div>
            </div>
            <div class="field">
              <label for="futureResponse">Desired future-self response</label>
              <textarea id="futureResponse" name="futureResponse" required placeholder="I stay present, listen clearly, and respond after choosing what is useful."></textarea>
            </div>
            <div class="field">
              <label for="statement">Journey statement</label>
              <input id="statement" name="statement" required maxlength="180" placeholder="I am changing my habit of withdrawing when I feel criticized.">
            </div>
            <div class="field">
              <label for="firstDeclaration">First Change Declaration</label>
              <input id="firstDeclaration" name="firstDeclaration" required maxlength="180" placeholder="reacting defensively when I feel criticized">
              <div class="declaration"><p>${DECLARATION_PREFIX} <strong>______</strong>, ${DECLARATION_SUFFIX}</p></div>
            </div>
            <div class="grid two">
              <div class="field">
                <label for="duration">Preferred meditation duration</label>
                <select id="duration" name="duration">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>
              <div class="field">
                <label for="practiceTime">Preferred practice time</label>
                <input id="practiceTime" name="practiceTime" type="time" value="${escapeHTML(state.settings.dailyReminder)}">
              </div>
            </div>
            <button class="button gold" type="submit">Begin Week One</button>
          </form>
        </section>
        ${archiveMarkup}
        <p class="small">Independent personal-growth companion. Keep the book available for the referenced chapters. This app is not medical or mental-health treatment.</p>
      </div>
    </main>
  `;
}

function renderToday() {
  const journey = state.activeJourney;
  if (journey.needsReview) return renderWeeklyReview();

  const week = currentWeek();
  const daily = currentDayContent();
  const completed = weekRecords(journey, journey.currentWeek, journey.currentCycle).length;
  const prior = previousDeclarations();
  const defaultDeclaration = prior[0] || journey.firstDeclaration;
  ensurePracticeSessionMatchesCurrentDay();

  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Week ${journey.currentWeek} · Cycle ${journey.currentCycle} · Day ${journey.currentDay}</p>
        <h1>${escapeHTML(daily[0])}</h1>
        <p class="lead">${escapeHTML(week.focus)}</p>
      </div>
      <div class="card stat">
        <span class="small">This cycle</span>
        <strong>${completed}/7</strong>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round((completed / 7) * 100)}%"></div></div>
      </div>
    </header>

    <section class="panel">
      <div class="meta-row"><span class="pill gold">${escapeHTML(week.shortTitle)}</span><span class="pill">${escapeHTML(week.page)}</span></div>
      <h2 style="margin-top:12px;">Why this practice matters</h2>
      <p>${escapeHTML(week.why)}</p>
    </section>

    <form id="dailyPracticeForm" class="form">
      <section class="panel">
        <p class="eyebrow">Required · Change Declaration</p>
        <h2>Name what you are ready to change today.</h2>
        <div class="field">
          <label for="declaration">Complete the declaration</label>
          <input id="declaration" name="declaration" list="declarationSuggestions" required maxlength="180" value="${escapeHTML(defaultDeclaration)}">
          <datalist id="declarationSuggestions">${prior.map((item) => `<option value="${escapeHTML(item)}"></option>`).join("")}</datalist>
        </div>
        <div class="declaration"><p>${DECLARATION_PREFIX} <strong id="declarationPreview">${escapeHTML(defaultDeclaration || "______")}</strong>, ${DECLARATION_SUFFIX}</p></div>
        <div class="field" style="margin-top:16px;">
          <label for="intensityBefore">How strong does this pattern feel before practice? <span id="beforeValue">5</span>/10</label>
          <input id="intensityBefore" name="intensityBefore" type="range" min="1" max="10" value="5">
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Required · Meditation</p>
        <h2>${state.settings.duration}-minute ${state.settings.spokenGuidance ? "guided" : "silent"} practice</h2>
        <div class="grid two">
          <div>
            <ol class="step-list">${week.practiceSteps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
            <div class="notice" style="margin-top:16px;">Use the referenced book section for the full source practice. Guidance here is an original companion summary.</div>
          </div>
          <div class="card timer">
            <div>
              <div class="timer-time" id="timerTime">${formatSeconds(practiceSession.remaining)}</div>
              <p class="small" id="timerStatus">${practiceSession.complete ? "Practice complete" : practiceSession.running ? "Practice in progress" : "Ready when you are"}</p>
              <div class="actions" style="justify-content:center;">
                <button class="button" type="button" data-action="timer-start">${practiceSession.started ? "Resume" : "Start practice"}</button>
                <button class="button secondary" type="button" data-action="timer-pause">Pause</button>
                <button class="button secondary" type="button" data-action="timer-finish" ${practiceSession.started ? "" : "disabled"}>Finish practice</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Required · Reflection</p>
        <h2>${escapeHTML(daily[1])}</h2>
        <div class="field"><label for="reflection">Short reflection</label><textarea id="reflection" name="reflection" required placeholder="Write what you noticed without judging it."></textarea></div>
        <div class="field">
          <label for="intensityAfter">How strong does the pattern feel after practice? <span id="afterValue">5</span>/10</label>
          <input id="intensityAfter" name="intensityAfter" type="range" min="1" max="10" value="5">
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Optional · Real-life evidence</p>
        <h2>${escapeHTML(daily[2])}</h2>
        <div class="grid two">
          <div class="field"><label for="trigger">Trigger noticed</label><textarea id="trigger" name="trigger" placeholder="What activated the familiar pattern?"></textarea></div>
          <div class="field"><label for="newResponse">New-self response</label><textarea id="newResponse" name="newResponse" placeholder="${escapeHTML(journey.futureResponse)}"></textarea></div>
        </div>
        <div class="field"><label for="evidence">Evidence of change</label><textarea id="evidence" name="evidence" placeholder="Where did you interrupt, redirect, or choose differently?"></textarea></div>
      </section>

      <button class="button gold" type="submit">Complete Day ${journey.currentDay}</button>
    </form>
  `;
}

function renderWeeklyReview() {
  const journey = state.activeJourney;
  const week = currentWeek();
  const records = weekRecords(journey, journey.currentWeek, journey.currentCycle);
  const startAverage = average(records.map((item) => item.intensityBefore));
  const endAverage = average(records.map((item) => item.intensityAfter));
  const evidenceCount = records.filter((item) => item.evidence).length;
  const canAdvance = records.length >= 7;
  const finishLabel = journey.currentWeek === 4 ? "Complete journey" : `Advance to Week ${journey.currentWeek + 1}`;

  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Week ${journey.currentWeek} · Cycle ${journey.currentCycle} complete</p>
        <h1>Review before moving forward.</h1>
        <p class="lead">Your entries remain preserved whether you advance or repeat this week.</p>
      </div>
      <div class="card stat"><span class="small">Average intensity shift</span><strong>${startAverage} → ${endAverage}</strong><span class="small">${evidenceCount} evidence entries</span></div>
    </header>
    <section class="panel">
      <div class="meta-row"><span class="pill gold">${escapeHTML(week.title)}</span><span class="pill">${records.length}/7 days complete</span></div>
      <form id="weeklyReviewForm" class="form" style="margin-top:18px;">
        <div class="field"><label for="win">What changed or became clearer?</label><textarea id="win" name="win" required></textarea></div>
        <div class="field"><label for="recurring">Which old pattern remained most familiar?</label><textarea id="recurring" name="recurring" required></textarea></div>
        <div class="field"><label for="weakening">What evidence suggests the pattern is weakening?</label><textarea id="weakening" name="weakening" required></textarea></div>
        <div class="field"><label for="nextIntention">What will you practice next?</label><textarea id="nextIntention" name="nextIntention" required></textarea></div>
        <div class="actions">
          <button class="button secondary" type="submit" name="choice" value="repeat">Repeat this week</button>
          <button class="button gold" type="submit" name="choice" value="advance" ${canAdvance ? "" : "disabled"}>${finishLabel}</button>
        </div>
      </form>
    </section>
  `;
}

function renderJourney() {
  const journey = state.activeJourney;
  const completed = getRecords(journey).length;
  const totalMinimum = 28;
  const progress = Math.min(100, Math.round((completed / totalMinimum) * 100));
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">One active journey</p>
        <h1>${escapeHTML(journey.title)}</h1>
        <p class="lead">${escapeHTML(journey.statement)}</p>
      </div>
      <div class="card stat"><span class="small">Minimum journey progress</span><strong>${progress}%</strong><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div></div>
    </header>

    <section class="panel">
      <div class="week-map">
        ${WEEK_CONTENT.map((week) => renderWeekCard(week, journey)).join("")}
      </div>
      ${state.settings.flexibleProgression ? `<div class="notice danger" style="margin-top:18px;">Flexible Progression is enabled. Selecting an unfinished day changes the active position and can skip required sequence.</div>` : ""}
    </section>

    <section class="grid two">
      <article class="panel">
        <p class="eyebrow">Old self under observation</p>
        <h2>${escapeHTML(journey.primaryPattern)}</h2>
        <p><strong>Triggers:</strong> ${escapeHTML(journey.triggers)}</p>
        <p><strong>Thoughts:</strong> ${escapeHTML(journey.thoughts)}</p>
        <p><strong>Emotions:</strong> ${escapeHTML(journey.emotions)}</p>
        <p><strong>Behaviors:</strong> ${escapeHTML(journey.behaviors)}</p>
      </article>
      <article class="panel">
        <p class="eyebrow">New self being rehearsed</p>
        <h2>Desired response</h2>
        <p>${escapeHTML(journey.futureResponse)}</p>
        <h3>First declaration</h3>
        <p>${escapeHTML(journey.firstDeclaration)}</p>
        <button class="button secondary" type="button" data-action="edit-preparation">Edit preparation</button>
      </article>
    </section>
  `;
}

function renderWeekCard(week, journey) {
  const cycles = Math.max(1, ...getRecords(journey).filter((item) => item.week === week.week).map((item) => item.cycle));
  const cycle = week.week === journey.currentWeek ? journey.currentCycle : cycles;
  const isActive = week.week === journey.currentWeek;
  return `
    <article class="week-card ${isActive ? "active" : ""}">
      <p class="eyebrow">Week ${week.week} · Cycle ${cycle}</p>
      <h3>${escapeHTML(week.shortTitle)}</h3>
      <p class="small">${escapeHTML(week.focus)}</p>
      <div class="day-dots">
        ${Array.from({ length: 7 }, (_, index) => renderDayDot(journey, week.week, cycle, index + 1)).join("")}
      </div>
    </article>
  `;
}

function renderDayDot(journey, week, cycle, day) {
  const record = getRecord(journey, week, cycle, day);
  const current = week === journey.currentWeek && cycle === journey.currentCycle && day === journey.currentDay && !journey.needsReview;
  const available = Boolean(record || current || state.settings.flexibleProgression);
  const classes = [record ? "complete" : "", current ? "current" : "", available ? "" : "locked"].filter(Boolean).join(" ");
  if (!available) return `<span class="day-dot ${classes}" title="Complete earlier days first">${day}</span>`;
  return `<button class="day-dot ${classes}" type="button" data-action="${record ? "view-record" : "jump-day"}" data-week="${week}" data-cycle="${cycle}" data-day="${day}" title="${record ? "View completed entry" : "Make this the active day"}">${day}</button>`;
}

function renderJournal() {
  const query = state.settings.journalQuery.trim().toLowerCase();
  const journeys = [state.activeJourney, ...state.archives].filter(Boolean);
  const entries = journeys.flatMap((journey) => getRecords(journey).map((record) => ({ journey, record })))
    .filter(({ journey, record }) => !query || JSON.stringify({ journey: journey.title, ...record }).toLowerCase().includes(query))
    .sort((a, b) => new Date(b.record.completedAt) - new Date(a.record.completedAt));
  const reviews = journeys.flatMap((journey) => (journey.reviews || []).map((review) => ({ journey, review })))
    .sort((a, b) => new Date(b.review.completedAt) - new Date(a.review.completedAt));

  return `
    <header class="topbar">
      <div><p class="eyebrow">Preserved entries</p><h1>Return to what you noticed.</h1><p class="lead">Search declarations, triggers, reflections, and evidence across every cycle and completed journey.</p></div>
      <div class="card stat"><span class="small">Practice entries</span><strong>${entries.length}</strong><span class="small">${reviews.length} weekly reviews</span></div>
    </header>
    <section class="panel">
      <form id="journalSearchForm" class="actions">
        <input name="query" value="${escapeHTML(state.settings.journalQuery)}" placeholder="Search preserved entries" style="flex:1; min-width:220px;">
        <button class="button secondary" type="submit">Search</button>
        <button class="button secondary" type="button" data-action="clear-search">Clear</button>
      </form>
    </section>
    <section class="panel">
      <h2>Daily practice entries</h2>
      ${entries.length ? entries.map(({ journey, record }) => renderJournalEntry(journey, record)).join("") : `<div class="empty">No entries match this search.</div>`}
    </section>
    <section class="panel">
      <h2>Weekly reviews</h2>
      ${reviews.length ? reviews.map(({ journey, review }) => `
        <article class="entry">
          <div class="meta-row"><span class="pill">${escapeHTML(journey.title)}</span><span class="pill gold">Week ${review.week} · Cycle ${review.cycle}</span><span class="small">${escapeHTML(formatDate(review.completedAt))}</span></div>
          <p><strong>Change:</strong> ${escapeHTML(review.win)}</p>
          <p><strong>Still familiar:</strong> ${escapeHTML(review.recurring)}</p>
          <p><strong>Weakening evidence:</strong> ${escapeHTML(review.weakening)}</p>
          <p><strong>Next intention:</strong> ${escapeHTML(review.nextIntention)}</p>
        </article>
      `).join("") : `<div class="empty">Weekly reviews appear after completing seven practice days.</div>`}
    </section>
  `;
}

function renderJournalEntry(journey, record) {
  return `
    <article class="entry" id="entry-${escapeHTML(record.id)}">
      <div class="meta-row"><span class="pill">${escapeHTML(journey.title)}</span><span class="pill gold">Week ${record.week} · Cycle ${record.cycle} · Day ${record.day}</span><span class="small">${escapeHTML(formatDate(record.completedAt))}</span></div>
      <h3>${escapeHTML(record.dayTitle)}</h3>
      <p><strong>Declaration:</strong> ${escapeHTML(record.declaration)}</p>
      <p><strong>Reflection:</strong> ${escapeHTML(record.reflection)}</p>
      ${record.trigger ? `<p><strong>Trigger:</strong> ${escapeHTML(record.trigger)}</p>` : ""}
      ${record.newResponse ? `<p><strong>New-self response:</strong> ${escapeHTML(record.newResponse)}</p>` : ""}
      ${record.evidence ? `<p><strong>Evidence:</strong> ${escapeHTML(record.evidence)}</p>` : ""}
      <p class="small">Pattern intensity: ${record.intensityBefore}/10 before → ${record.intensityAfter}/10 after · ${record.duration} minute practice</p>
    </article>
  `;
}

function renderGrowth() {
  const journeys = [state.activeJourney, ...state.archives].filter(Boolean);
  const records = journeys.flatMap((journey) => getRecords(journey));
  const declarations = declarationStats(records);
  const evidenceCount = records.filter((item) => item.evidence).length;
  const averageBefore = average(records.map((item) => item.intensityBefore));
  const averageAfter = average(records.map((item) => item.intensityAfter));
  const cycles = cycleStats(state.activeJourney);

  return `
    <header class="topbar">
      <div><p class="eyebrow">Growth comparisons</p><h1>Measure practice, not perfection.</h1><p class="lead">Compare recurring declarations, intensity shifts, and evidence across cycles without erasing earlier work.</p></div>
      <div class="card stat"><span class="small">Average pattern intensity</span><strong>${averageBefore} → ${averageAfter}</strong><span class="small">before and after practice</span></div>
    </header>
    <section class="grid three">
      <div class="card stat"><span class="small">Completed days</span><strong>${records.length}</strong><span class="small">across all journeys</span></div>
      <div class="card stat"><span class="small">Evidence entries</span><strong>${evidenceCount}</strong><span class="small">real-life changed responses</span></div>
      <div class="card stat"><span class="small">Completed journeys</span><strong>${state.archives.length}</strong><span class="small">preserved for review</span></div>
    </section>
    <section class="grid two" style="margin-top:18px;">
      <article class="panel">
        <h2>Recurring declarations</h2>
        ${declarations.length ? declarations.map((item) => `
          <div class="entry"><div class="meta-row"><span class="pill gold">${item.count} days</span><span class="pill">${item.evidence} evidence entries</span></div><p>${escapeHTML(item.text)}</p><p class="small">Average intensity ${item.before} → ${item.after}</p></div>
        `).join("") : `<div class="empty">Complete daily practices to compare declarations.</div>`}
      </article>
      <article class="panel">
        <h2>Cycle comparison</h2>
        ${cycles.length ? cycles.map((cycle) => `
          <div class="entry"><div class="meta-row"><span class="pill gold">Week ${cycle.week} · Cycle ${cycle.cycle}</span><span class="pill">${cycle.days}/7 days</span></div><p>${cycle.before} → ${cycle.after} average intensity</p><p class="small">${cycle.evidence} evidence entries</p></div>
        `).join("") : `<div class="empty">Cycle comparisons appear as you practice.</div>`}
      </article>
    </section>
  `;
}

function declarationStats(records) {
  const grouped = new Map();
  for (const record of records) {
    const key = record.declaration.trim().toLowerCase();
    const existing = grouped.get(key) || { text: record.declaration, records: [] };
    existing.records.push(record);
    grouped.set(key, existing);
  }
  return [...grouped.values()].map((item) => ({
    text: item.text,
    count: item.records.length,
    evidence: item.records.filter((record) => record.evidence).length,
    before: average(item.records.map((record) => record.intensityBefore)),
    after: average(item.records.map((record) => record.intensityAfter))
  })).sort((a, b) => b.count - a.count);
}

function cycleStats(journey) {
  if (!journey) return [];
  const groups = new Map();
  for (const record of getRecords(journey)) {
    const key = `${record.week}-${record.cycle}`;
    const group = groups.get(key) || { week: record.week, cycle: record.cycle, records: [] };
    group.records.push(record);
    groups.set(key, group);
  }
  return [...groups.values()].map((group) => ({
    week: group.week,
    cycle: group.cycle,
    days: group.records.length,
    before: average(group.records.map((record) => record.intensityBefore)),
    after: average(group.records.map((record) => record.intensityAfter)),
    evidence: group.records.filter((record) => record.evidence).length
  })).sort((a, b) => a.week - b.week || a.cycle - b.cycle);
}

function renderGuide() {
  return `
    <header class="topbar">
      <div><p class="eyebrow">Book Guide</p><h1>Keep the source close.</h1><p class="lead">Short companion explanations and page references help you return to the full book when a practice needs more depth.</p></div>
      <div class="card"><span class="pill gold">Independent companion</span><p class="small" style="margin-top:10px;">This guide paraphrases the process and does not replace the book's full teaching or scripts.</p></div>
    </header>
    <section class="panel">
      <div class="timeline">
        ${GUIDE_SECTIONS.map(([title, pages, note]) => `
          <article class="timeline-item"><div><span class="pill gold">${escapeHTML(pages)}</span></div><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(note)}</p></div></article>
        `).join("")}
      </div>
    </section>
    <section class="panel">
      <h2>How the app uses the process</h2>
      <ul class="plain-list">
        <li>Week One establishes induction, then each later week keeps it and adds the next steps.</li>
        <li>The daily Change Declaration makes the old pattern specific enough to recognize and revisit.</li>
        <li>Daily reflections record what happened internally; optional evidence records what changed in real life.</li>
        <li>Repeating a week creates a new cycle so growth can be compared instead of erased.</li>
      </ul>
    </section>
  `;
}

function renderSettings() {
  const settings = state.settings;
  return `
    <header class="topbar">
      <div><p class="eyebrow">Settings</p><h1>Shape the practice without losing the sequence.</h1><p class="lead">Preferences stay on this device and are included in encrypted backups.</p></div>
    </header>
    <section class="grid two">
      <article class="panel">
        <h2>Practice preferences</h2>
        <form id="settingsForm" class="form">
          <div class="field"><label for="settingsDuration">Meditation duration</label><select id="settingsDuration" name="duration">
            ${[15, 30, 45].map((value) => `<option value="${value}" ${settings.duration === value ? "selected" : ""}>${value} minutes</option>`).join("")}
          </select></div>
          <label class="check-row"><input type="checkbox" name="spokenGuidance" ${settings.spokenGuidance ? "checked" : ""}> Use browser-spoken guidance when practice begins</label>
          <label class="check-row"><input type="checkbox" name="remindersEnabled" ${settings.remindersEnabled ? "checked" : ""}> Show local reminders while the app is open</label>
          <div class="grid two">
            <div class="field"><label for="dailyReminder">Morning</label><input id="dailyReminder" name="dailyReminder" type="time" value="${escapeHTML(settings.dailyReminder)}"></div>
            <div class="field"><label for="eveningReminder">Evening</label><input id="eveningReminder" name="eveningReminder" type="time" value="${escapeHTML(settings.eveningReminder)}"></div>
          </div>
          <button class="button" type="submit">Save preferences</button>
        </form>
      </article>
      <article class="panel">
        <h2>Progression override</h2>
        <div class="notice danger"><strong>Sequential progression is recommended.</strong><br>Flexible Progression allows unfinished days and weeks to be skipped. Completed entries are never deleted.</div>
        <form id="progressionForm" style="margin-top:16px;">
          <label class="check-row"><input type="checkbox" name="flexibleProgression" ${settings.flexibleProgression ? "checked" : ""}> Allow flexible progression and day skipping</label>
          <button class="button secondary" type="submit" style="margin-top:14px;">Save progression setting</button>
        </form>
      </article>
    </section>
    <section class="grid two">
      <article class="panel">
        <h2>Encrypted backup</h2>
        <p class="small">The password is never stored. Losing it makes the exported backup unreadable.</p>
        <form id="exportForm" class="form">
          <div class="field"><label for="exportPassword">Backup password</label><input id="exportPassword" name="password" type="password" minlength="8" required autocomplete="new-password"></div>
          <button class="button" type="submit">Export encrypted backup</button>
        </form>
      </article>
      <article class="panel">
        <h2>Restore backup</h2>
        <form id="importForm" class="form">
          <div class="field"><label for="importFile">Encrypted backup file</label><input id="importFile" name="file" type="file" accept=".nspbackup,application/json" required></div>
          <div class="field"><label for="importPassword">Backup password</label><input id="importPassword" name="password" type="password" required autocomplete="current-password"></div>
          <button class="button secondary" type="submit">Import and replace local data</button>
        </form>
      </article>
    </section>
    <section class="panel">
      <h2>Local data</h2>
      <p>Resetting deletes the active journey, preserved journeys, entries, and settings from this browser.</p>
      <button class="button danger" type="button" data-action="reset-data">Reset all local data</button>
    </section>
  `;
}

function ensurePracticeSessionMatchesCurrentDay() {
  const journey = state.activeJourney;
  if (!journey) return;
  const matches = practiceSession.journeyId === journey.id
    && practiceSession.week === journey.currentWeek
    && practiceSession.cycle === journey.currentCycle
    && practiceSession.day === journey.currentDay;
  if (matches) return;
  resetPracticeSession();
  practiceSession.journeyId = journey.id;
  practiceSession.week = journey.currentWeek;
  practiceSession.cycle = journey.currentCycle;
  practiceSession.day = journey.currentDay;
}

function formatSeconds(seconds) {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const remainder = Math.max(0, seconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const time = document.getElementById("timerTime");
  const status = document.getElementById("timerStatus");
  if (time) time.textContent = formatSeconds(practiceSession.remaining);
  if (status) status.textContent = practiceSession.complete ? "Practice complete" : practiceSession.running ? "Practice in progress" : practiceSession.started ? "Practice paused" : "Ready when you are";
}

function startTimer() {
  if (practiceSession.complete || practiceSession.running) return;
  practiceSession.started = true;
  practiceSession.running = true;
  document.querySelector("[data-action='timer-finish']")?.removeAttribute("disabled");
  if (state.settings.spokenGuidance) speakGuidance();
  timerInterval = setInterval(() => {
    practiceSession.remaining -= 1;
    if (practiceSession.remaining <= 0) finishTimer();
    updateTimerDisplay();
  }, 1000);
  updateTimerDisplay();
}

function pauseTimer() {
  practiceSession.running = false;
  clearInterval(timerInterval);
  timerInterval = null;
  window.speechSynthesis?.pause();
  updateTimerDisplay();
}

function finishTimer() {
  if (!practiceSession.started) return;
  practiceSession.running = false;
  practiceSession.complete = true;
  practiceSession.remaining = 0;
  clearInterval(timerInterval);
  timerInterval = null;
  window.speechSynthesis?.cancel();
  updateTimerDisplay();
  showToast("Meditation marked complete.");
}

function speakGuidance() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const week = currentWeek();
  const utterance = new SpeechSynthesisUtterance(`Begin by settling into your practice. ${week.practiceSteps.join(" ")}`);
  utterance.rate = 0.82;
  utterance.pitch = 0.9;
  window.speechSynthesis.speak(utterance);
}

function handlePreparation(form) {
  const data = new FormData(form);
  const now = new Date().toISOString();
  state.settings.duration = Number(data.get("duration") || 15);
  state.settings.dailyReminder = String(data.get("practiceTime") || state.settings.dailyReminder);
  state.activeJourney = {
    id: createId(),
    title: String(data.get("title")).trim(),
    primaryPattern: String(data.get("primaryPattern")).trim(),
    triggers: String(data.get("triggers")).trim(),
    thoughts: String(data.get("thoughts")).trim(),
    emotions: String(data.get("emotions")).trim(),
    behaviors: String(data.get("behaviors")).trim(),
    futureResponse: String(data.get("futureResponse")).trim(),
    statement: String(data.get("statement")).trim(),
    firstDeclaration: String(data.get("firstDeclaration")).trim(),
    startedAt: now,
    currentWeek: 1,
    currentCycle: 1,
    currentDay: 1,
    needsReview: false,
    records: [],
    reviews: []
  };
  saveState();
  resetPracticeSession();
  activeView = "today";
  render();
  scheduleReminders();
  showToast("Journey started. Week One begins now.");
}

function handleDailyPractice(form) {
  if (!practiceSession.complete) {
    showToast("Complete the meditation before finishing this day.");
    return;
  }
  const journey = state.activeJourney;
  const data = new FormData(form);
  const declaration = String(data.get("declaration") || "").trim();
  const reflection = String(data.get("reflection") || "").trim();
  if (!declaration || !reflection) {
    showToast("A Change Declaration and short reflection are required.");
    return;
  }
  const record = {
    id: createId(),
    key: recordKey(journey.currentWeek, journey.currentCycle, journey.currentDay),
    week: journey.currentWeek,
    cycle: journey.currentCycle,
    day: journey.currentDay,
    dayTitle: currentDayContent()[0],
    declaration,
    reflection,
    trigger: String(data.get("trigger") || "").trim(),
    newResponse: String(data.get("newResponse") || "").trim(),
    evidence: String(data.get("evidence") || "").trim(),
    intensityBefore: Number(data.get("intensityBefore") || 5),
    intensityAfter: Number(data.get("intensityAfter") || 5),
    duration: state.settings.duration,
    completedAt: new Date().toISOString()
  };
  journey.records.push(record);
  state.journal.push(record.id);
  if (journey.currentDay >= 7) {
    journey.needsReview = true;
  } else {
    journey.currentDay += 1;
  }
  saveState();
  resetPracticeSession();
  render();
  showToast(journey.needsReview ? "Seven days complete. Your weekly review is ready." : "Day complete. The next practice is unlocked.");
}

function handleWeeklyReview(form, submitter) {
  const journey = state.activeJourney;
  const data = new FormData(form);
  const choice = submitter?.value || data.get("choice");
  const review = {
    id: createId(),
    week: journey.currentWeek,
    cycle: journey.currentCycle,
    win: String(data.get("win") || "").trim(),
    recurring: String(data.get("recurring") || "").trim(),
    weakening: String(data.get("weakening") || "").trim(),
    nextIntention: String(data.get("nextIntention") || "").trim(),
    choice,
    completedAt: new Date().toISOString()
  };
  journey.reviews.push(review);

  if (choice === "repeat") {
    journey.currentCycle += 1;
    journey.currentDay = 1;
    journey.needsReview = false;
    saveState();
    resetPracticeSession();
    render();
    showToast(`Week ${journey.currentWeek} started again as Cycle ${journey.currentCycle}.`);
    return;
  }

  if (journey.currentWeek < 4) {
    journey.currentWeek += 1;
    journey.currentCycle = 1;
    journey.currentDay = 1;
    journey.needsReview = false;
    saveState();
    resetPracticeSession();
    render();
    showToast(`Week ${journey.currentWeek} is ready.`);
    return;
  }

  journey.status = "completed";
  journey.completedAt = new Date().toISOString();
  state.archives.unshift(structuredClone(journey));
  state.activeJourney = null;
  saveState();
  resetPracticeSession();
  render();
  showToast("Journey completed and preserved.");
}

function handleSettings(form) {
  const data = new FormData(form);
  state.settings.duration = Number(data.get("duration") || 15);
  state.settings.spokenGuidance = data.get("spokenGuidance") === "on";
  state.settings.remindersEnabled = data.get("remindersEnabled") === "on";
  state.settings.dailyReminder = String(data.get("dailyReminder") || "07:30");
  state.settings.eveningReminder = String(data.get("eveningReminder") || "20:30");
  saveState();
  resetPracticeSession();
  scheduleReminders();
  render();
  showToast("Practice preferences saved.");
}

function handleProgression(form) {
  const data = new FormData(form);
  state.settings.flexibleProgression = data.get("flexibleProgression") === "on";
  saveState();
  render();
  showToast(state.settings.flexibleProgression ? "Flexible Progression enabled." : "Sequential progression restored.");
}

function jumpToDay(element) {
  if (!state.settings.flexibleProgression) return;
  const journey = state.activeJourney;
  journey.currentWeek = Number(element.dataset.week);
  journey.currentCycle = Number(element.dataset.cycle);
  journey.currentDay = Number(element.dataset.day);
  journey.needsReview = false;
  saveState();
  resetPracticeSession();
  activeView = "today";
  render();
  showToast("Active day changed using Flexible Progression.");
}

function viewRecord(element) {
  const record = getRecord(
    state.activeJourney,
    Number(element.dataset.week),
    Number(element.dataset.cycle),
    Number(element.dataset.day)
  );
  state.settings.journalQuery = record?.declaration || "";
  saveState();
  activeView = "journal";
  render();
}

function editPreparation() {
  const journey = state.activeJourney;
  const markup = `
    <header class="topbar"><div><p class="eyebrow">Preparation</p><h1>Edit the active journey.</h1><p class="lead">Prior entries remain unchanged.</p></div></header>
    <section class="panel">
      <form id="editPreparationForm" class="form">
        <div class="field"><label>Journey name</label><input name="title" required value="${escapeHTML(journey.title)}"></div>
        <div class="field"><label>Primary pattern</label><textarea name="primaryPattern" required>${escapeHTML(journey.primaryPattern)}</textarea></div>
        <div class="grid two">
          <div class="field"><label>Triggers</label><textarea name="triggers" required>${escapeHTML(journey.triggers)}</textarea></div>
          <div class="field"><label>Recurring thoughts</label><textarea name="thoughts" required>${escapeHTML(journey.thoughts)}</textarea></div>
          <div class="field"><label>Familiar emotions</label><textarea name="emotions" required>${escapeHTML(journey.emotions)}</textarea></div>
          <div class="field"><label>Automatic behaviors</label><textarea name="behaviors" required>${escapeHTML(journey.behaviors)}</textarea></div>
        </div>
        <div class="field"><label>Desired future-self response</label><textarea name="futureResponse" required>${escapeHTML(journey.futureResponse)}</textarea></div>
        <div class="field"><label>Journey statement</label><input name="statement" required value="${escapeHTML(journey.statement)}"></div>
        <div class="actions"><button class="button" type="submit">Save preparation</button><button class="button secondary" type="button" data-view="journey">Cancel</button></div>
      </form>
    </section>`;
  app.querySelector(".page").innerHTML = markup;
}

function savePreparation(form) {
  const data = new FormData(form);
  for (const key of ["title", "primaryPattern", "triggers", "thoughts", "emotions", "behaviors", "futureResponse", "statement"]) {
    state.activeJourney[key] = String(data.get(key) || "").trim();
  }
  saveState();
  activeView = "journey";
  render();
  showToast("Preparation updated. Prior entries were preserved.");
}

function scheduleReminders() {
  reminderTimers.forEach(clearTimeout);
  reminderTimers = [];
  if (!state.settings.remindersEnabled) return;
  for (const [time, message] of [
    [state.settings.dailyReminder, "Your New Self practice is ready."],
    [state.settings.eveningReminder, "What evidence of a new response did you notice today?"]
  ]) {
    const delay = delayUntil(time);
    reminderTimers.push(setTimeout(() => showToast(message), delay));
  }
}

function delayUntil(time) {
  const [hours, minutes] = String(time || "09:00").split(":").map(Number);
  const now = new Date();
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  return next - now;
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function deriveBackupKey(password, salt) {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function exportEncryptedBackup(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveBackupKey(password, salt);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(state)));
  const payload = {
    format: "new-self-practice-encrypted-v1",
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(new Uint8Array(encrypted))
  };
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `new-self-practice-${new Date().toISOString().slice(0, 10)}.nspbackup`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importEncryptedBackup(file, password) {
  const payload = JSON.parse(await file.text());
  if (payload.format !== "new-self-practice-encrypted-v1") throw new Error("Unsupported backup format.");
  const key = await deriveBackupKey(password, base64ToBytes(payload.salt));
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(payload.iv) },
    key,
    base64ToBytes(payload.data)
  );
  const restored = JSON.parse(new TextDecoder().decode(decrypted));
  if (restored.version !== 1 || !restored.settings || !Array.isArray(restored.archives)) throw new Error("Backup data is invalid.");
  state = restored;
  saveState();
  resetPracticeSession();
  activeView = state.activeJourney ? "today" : "journey";
  render();
  scheduleReminders();
}

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  try {
    if (form.id === "preparationForm") handlePreparation(form);
    if (form.id === "dailyPracticeForm") handleDailyPractice(form);
    if (form.id === "weeklyReviewForm") handleWeeklyReview(form, event.submitter);
    if (form.id === "settingsForm") handleSettings(form);
    if (form.id === "progressionForm") handleProgression(form);
    if (form.id === "editPreparationForm") savePreparation(form);
    if (form.id === "journalSearchForm") {
      state.settings.journalQuery = String(new FormData(form).get("query") || "");
      saveState();
      render();
    }
    if (form.id === "exportForm") {
      await exportEncryptedBackup(String(new FormData(form).get("password") || ""));
      form.reset();
      showToast("Encrypted backup exported.");
    }
    if (form.id === "importForm") {
      const data = new FormData(form);
      const confirmed = window.confirm("Importing replaces all current local data. Continue?");
      if (!confirmed) return;
      await importEncryptedBackup(data.get("file"), String(data.get("password") || ""));
      showToast("Encrypted backup restored.");
    }
  } catch (error) {
    console.error(error);
    showToast(error.message || "That action could not be completed.");
  }
});

app.addEventListener("click", (event) => {
  const element = event.target.closest("button");
  if (!element) return;
  if (element.dataset.view) {
    activeView = element.dataset.view;
    render();
    return;
  }
  const action = element.dataset.action;
  if (action === "timer-start") startTimer();
  if (action === "timer-pause") pauseTimer();
  if (action === "timer-finish") finishTimer();
  if (action === "jump-day") jumpToDay(element);
  if (action === "view-record") viewRecord(element);
  if (action === "edit-preparation") editPreparation();
  if (action === "clear-search") {
    state.settings.journalQuery = "";
    saveState();
    render();
  }
  if (action === "view-archive") {
    const journey = state.archives.find((item) => item.id === element.dataset.journeyId);
    state.settings.journalQuery = journey?.title || "";
    saveState();
    if (state.activeJourney) {
      activeView = "journal";
      render();
    } else {
      renderArchivedOnly(journey);
    }
  }
  if (action === "reset-data") {
    const confirmed = window.confirm("This permanently deletes all New Self Practice data from this browser. Continue?");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(DEFAULT_STATE);
    resetPracticeSession();
    activeView = "journey";
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "declaration") {
    const preview = document.getElementById("declarationPreview");
    if (preview) preview.textContent = event.target.value || "______";
  }
  if (event.target.id === "intensityBefore") {
    document.getElementById("beforeValue").textContent = event.target.value;
  }
  if (event.target.id === "intensityAfter") {
    document.getElementById("afterValue").textContent = event.target.value;
  }
});

function renderArchivedOnly(journey) {
  if (!journey) return renderStart();
  app.innerHTML = `
    <main class="main"><div class="page">
      <header class="topbar"><div><p class="eyebrow">Completed journey</p><h1>${escapeHTML(journey.title)}</h1><p class="lead">${escapeHTML(journey.statement)}</p></div></header>
      <section class="panel"><button class="button secondary" type="button" data-action="back-start">Back</button></section>
      <section class="panel">${getRecords(journey).slice().reverse().map((record) => renderJournalEntry(journey, record)).join("")}</section>
    </div></main>`;
}

app.addEventListener("click", (event) => {
  if (event.target.closest("[data-action='back-start']")) renderStart();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

scheduleReminders();
render();
