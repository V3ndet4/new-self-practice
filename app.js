"use strict";

const APP_VERSION = "v1.4";
const STORAGE_KEY = "new-self-practice-state-v1";
const DECLARATION_PREFIX = "Universal consciousness with me and all around me, I have been";
const DECLARATION_SUFFIX = "and I truly want to change that from this limited state of being.";
const app = document.getElementById("app");

const ICONS = {
  today: "◉",
  journey: "◇",
  lab: "◎",
  journal: "▤",
  growth: "↗",
  guide: "⌁",
  settings: "⚙"
};

const FOUNDATION_CONTENT = [
  {
    id: "introduction",
    label: "Introduction",
    title: "The Habit of Being Yourself",
    page: "Introduction, pages 16-26",
    focus: "Clarify why changing familiar thoughts, feelings, and behaviors requires deliberate practice.",
    why: "The introduction establishes the purpose of the journey before the science and meditation process begin.",
    prompt: "Which familiar part of yourself are you no longer willing to treat as permanent?",
    action: "Notice one moment today when the familiar self feels automatic."
  },
  {
    id: "chapter-1",
    label: "Chapter 1",
    title: "The Quantum You",
    page: "Chapter 1, pages 28-62",
    focus: "Consider the relationship between attention, possibility, and the reality you repeatedly expect.",
    why: "This chapter introduces the book's model for moving attention away from the known and toward a new possibility.",
    prompt: "Where has your attention been repeatedly reinforcing the same expected outcome?",
    action: "Catch one familiar expectation and name a different possibility."
  },
  {
    id: "chapter-2",
    label: "Chapter 2",
    title: "Overcoming Your Environment",
    page: "Chapter 2, pages 63-77",
    focus: "Recognize how people, places, objects, and routines cue the familiar self.",
    why: "Changing requires becoming greater than environmental reminders that automatically reproduce old thoughts and feelings.",
    prompt: "Which part of your environment most reliably activates your old pattern?",
    action: "Respond differently to one familiar environmental cue."
  },
  {
    id: "chapter-3",
    label: "Chapter 3",
    title: "Overcoming Your Body",
    page: "Chapter 3, pages 78-109",
    focus: "Observe how repeated emotions can train the body to expect and reproduce the old state.",
    why: "The body can become conditioned to familiar emotions even when the conscious mind wants something different.",
    prompt: "Where and how does your body signal the familiar emotional state?",
    action: "Pause when the body activates and observe it before following it."
  },
  {
    id: "chapter-4",
    label: "Chapter 4",
    title: "Overcoming Time",
    page: "Chapter 4, pages 110-121",
    focus: "Notice when attention is living in remembered past events or an anticipated familiar future.",
    why: "A new response becomes possible when attention returns to the present instead of rehearsing the known.",
    prompt: "Does your pattern pull you more toward replaying the past or anticipating the future?",
    action: "Return to the present during one familiar mental replay."
  },
  {
    id: "chapter-5",
    label: "Chapter 5",
    title: "Survival vs. Creation",
    page: "Chapter 5, pages 122-146",
    focus: "Distinguish stress-driven survival reactions from a more open creative state.",
    why: "The old self is often maintained by stress chemistry, narrowed attention, and constant preparation for threat.",
    prompt: "How does survival mode change your thoughts, body, and choices?",
    action: "Before one decision, ask whether it comes from survival or creation."
  },
  {
    id: "chapter-6",
    label: "Chapter 6",
    title: "Three Brains: Thinking to Doing to Being",
    page: "Chapter 6, pages 148-171",
    focus: "Understand change as a movement from learning, to practice, to an embodied way of being.",
    why: "Insight alone is not the end of the process; repeated action and experience help make a new response familiar.",
    prompt: "What do you understand intellectually but have not yet practiced consistently?",
    action: "Turn one useful idea into one observable action."
  },
  {
    id: "chapter-7",
    label: "Chapter 7",
    title: "The Gap",
    page: "Chapter 7, pages 172-199",
    focus: "Notice the difference between the identity shown to the world and the feelings hidden underneath it.",
    why: "Seeing the gap honestly helps recover energy spent maintaining an identity that no longer fits.",
    prompt: "Where is there a gap between how you appear and what you repeatedly feel inside?",
    action: "Choose one honest, grounded response instead of maintaining an appearance."
  },
  {
    id: "chapter-8",
    label: "Chapter 8",
    title: "Meditation and Your Future",
    page: "Chapter 8, pages 200-240",
    focus: "Understand meditation as a practice for observing the familiar self and rehearsing a different state.",
    why: "This chapter connects the foundational ideas to the meditation process that follows.",
    prompt: "What would make meditation a practical training process rather than only a relaxation exercise?",
    action: "Protect a small period of stillness without trying to solve anything."
  },
  {
    id: "chapter-9",
    label: "Chapter 9",
    title: "The Meditative Process: Preparation",
    page: "Chapter 9, pages 242-252",
    focus: "Prepare the setting, posture, schedule, and expectations for the four-week process.",
    why: "Chapter 9 is the required bridge between the foundational teaching and Week One's induction practice.",
    prompt: "What practical condition will make it easier for you to return to this practice every day?",
    action: "Prepare your practice space, time, posture, and interruption plan."
  }
];

const GUIDED_OPTIONS = {
  primaryPattern: ["Reacting defensively", "Expecting the worst", "Avoiding difficult situations", "Seeking reassurance", "Procrastinating", "Judging myself harshly", "Withdrawing when uncomfortable"],
  triggers: ["Criticism or feedback", "Uncertainty", "Feeling ignored or rejected", "Conflict", "Making a mistake", "Pressure or deadlines", "Being compared to others"],
  thoughts: ["I am not enough", "Something will go wrong", "I have to protect myself", "I cannot handle this", "They do not understand me", "I need control to feel safe"],
  emotions: ["Anxiety", "Anger", "Shame", "Fear", "Resentment", "Sadness", "Defensiveness"],
  behaviors: ["Arguing or defending", "Withdrawing or shutting down", "Avoiding or delaying", "Overthinking", "Checking or seeking reassurance", "Trying to control the outcome"],
  futureResponse: ["Pause and respond calmly", "Stay present with uncertainty", "Listen before defending", "Choose a grounded next action", "Speak honestly and respectfully", "Let the feeling pass without obeying it"],
  firstDeclaration: ["expecting the worst", "reacting defensively", "believing I am not enough", "avoiding discomfort", "trying to control every outcome", "repeating the same emotional reaction"]
};

const PRACTICE_SPARKS = [
  "Make the new response visible in one small moment.",
  "Catch the pattern one step earlier than usual.",
  "Practice the smallest version instead of waiting for perfect conditions.",
  "Use one trigger as a reminder to become conscious.",
  "Pause long enough to choose instead of repeating.",
  "Let today's proof be simple, specific, and honest.",
  "Notice what changes when you stop rehearsing the familiar outcome."
];

const LAB_BODY_OPTIONS = ["Tight chest", "Shallow breath", "Tense jaw", "Heavy stomach", "Racing heart", "Restless energy", "Numb or disconnected"];
const LAB_URGE_OPTIONS = ["Defend myself", "Withdraw", "Avoid or delay", "Control the outcome", "Seek reassurance", "Overthink", "React immediately"];
const LAB_INTERRUPT_OPTIONS = [
  ["trigger", "At the trigger", "Name what is happening before the story grows."],
  ["thought", "At the thought", "Label the old thought instead of treating it as a fact."],
  ["body", "At the body signal", "Pause, breathe, and let the physical activation settle."],
  ["urge", "At the urge", "Delay the automatic action long enough to choose."],
  ["behavior", "At the behavior", "Choose the smallest visible response of the new self."]
];

const MOMENTUM_MILESTONES = [
  { points: 100, title: "First Light", note: "You began turning insight into repeated action." },
  { points: 300, title: "Steady Horizon", note: "Your return to practice is becoming visible." },
  { points: 700, title: "New Response", note: "You are collecting evidence beyond reflection." },
  { points: 1200, title: "Lived Practice", note: "Your practice is reaching daily behavior." },
  { points: 2000, title: "New Self in Motion", note: "You have built a substantial body of evidence." }
];

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
  patternLab: [],
  settings: {
    duration: 15,
    spokenGuidance: true,
    flexibleProgression: false,
    dailyReminder: "07:30",
    eveningReminder: "20:30",
    remindersEnabled: false,
    journalQuery: "",
    privateCoachEnabled: true,
    labMode: "review"
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
    const loaded = {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      archives: Array.isArray(parsed.archives) ? parsed.archives : [],
      journal: Array.isArray(parsed.journal) ? parsed.journal : [],
      patternLab: Array.isArray(parsed.patternLab) ? parsed.patternLab : []
    };
    if (loaded.activeJourney) {
      loaded.activeJourney.foundationRecords = Array.isArray(loaded.activeJourney.foundationRecords) ? loaded.activeJourney.foundationRecords : [];
      loaded.activeJourney.currentFoundationIndex = Number(loaded.activeJourney.currentFoundationIndex || 0);
      loaded.activeJourney.foundationsComplete = Boolean(loaded.activeJourney.foundationsComplete);
    }
    return loaded;
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

function getAllJourneyRecords() {
  return [state.activeJourney, ...state.archives].filter(Boolean).flatMap((journey) => getRecords(journey));
}

function getAllFoundationRecords() {
  return [state.activeJourney, ...state.archives].filter(Boolean).flatMap((journey) => journey.foundationRecords || []);
}

function calculateStreak() {
  const dates = [...getAllJourneyRecords(), ...getAllFoundationRecords()]
    .concat(state.patternLab || [])
    .map((record) => String(record.completedAt || record.createdAt || "").slice(0, 10))
    .filter(Boolean);
  const unique = new Set(dates);
  if (!unique.size) return 0;
  const cursor = new Date();
  const today = cursor.toISOString().slice(0, 10);
  if (!unique.has(today)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (unique.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getMomentum() {
  const records = getAllJourneyRecords();
  const foundations = getAllFoundationRecords();
  const evidence = records.filter((record) => record.evidence).length;
  const actionProofs = records.filter((record) => record.actionContract?.proof).length
    + foundations.filter((record) => record.actionContract?.proof).length;
  const followThrough = [...records, ...foundations].filter((record) => ["completed", "minimum"].includes(record.actionFollowUp?.outcome)).length;
  const labSessions = state.patternLab.length;
  const points = foundations.length * 20 + records.length * 50 + evidence * 20 + actionProofs * 10 + followThrough * 25 + labSessions * 30;
  const earned = MOMENTUM_MILESTONES.filter((milestone) => points >= milestone.points);
  const next = MOMENTUM_MILESTONES.find((milestone) => points < milestone.points) || null;
  return { points, streak: calculateStreak(), evidence, actionProofs, followThrough, labSessions, earned, next };
}

function renderMomentumStrip() {
  const momentum = getMomentum();
  const nextText = momentum.next
    ? `${momentum.next.points - momentum.points} glow until ${momentum.next.title}`
    : "All current milestones reached";
  return `
    <section class="momentum-strip" aria-label="Practice momentum">
      <article><span class="small">Sunset glow</span><strong>${momentum.points}</strong><span>${escapeHTML(nextText)}</span></article>
      <article><span class="small">Return streak</span><strong>${momentum.streak}</strong><span>consecutive practice days</span></article>
      <article><span class="small">Action loops closed</span><strong>${momentum.followThrough}/${momentum.actionProofs}</strong><span>completed or minimum version practiced</span></article>
    </section>
  `;
}

function practiceSpark(seed = 0) {
  return PRACTICE_SPARKS[Math.abs(Number(seed) || 0) % PRACTICE_SPARKS.length];
}

function renderActionContract(prefix, suggestedAction, existing = {}) {
  return `
    <div class="action-contract">
      <div class="action-contract-heading">
        <div><p class="eyebrow">Required · One Move</p><h2>Make the insight observable.</h2></div>
        <span class="pill gold">Specific beats ambitious</span>
      </div>
      <div class="grid two">
        <div class="field">
          <label for="${prefix}Cue">When this happens...</label>
          <input id="${prefix}Cue" name="${prefix}Cue" required maxlength="180" value="${escapeHTML(existing.cue || "")}" placeholder="Example: when I notice criticism or tension">
        </div>
        <div class="field">
          <label for="${prefix}Response">I will do this observable action...</label>
          <input id="${prefix}Response" name="${prefix}Response" required maxlength="220" value="${escapeHTML(existing.response || "")}" placeholder="${escapeHTML(suggestedAction)}">
        </div>
        <div class="field">
          <label for="${prefix}Minimum">Smallest version I will still count...</label>
          <input id="${prefix}Minimum" name="${prefix}Minimum" required maxlength="180" value="${escapeHTML(existing.minimum || "")}" placeholder="Example: pause for three seconds before responding">
        </div>
        <div class="field">
          <label for="${prefix}Proof">How I will know I did it...</label>
          <input id="${prefix}Proof" name="${prefix}Proof" required maxlength="180" value="${escapeHTML(existing.proof || "")}" placeholder="Example: write one sentence about what I chose">
        </div>
      </div>
      <div class="mission-preview">
        <span class="small">Today's mission</span>
        <p data-mission-preview="${prefix}">Complete the four fields to create a precise action.</p>
      </div>
    </div>
  `;
}

function readActionContract(data, prefix) {
  return {
    cue: String(data.get(`${prefix}Cue`) || "").trim(),
    response: String(data.get(`${prefix}Response`) || "").trim(),
    minimum: String(data.get(`${prefix}Minimum`) || "").trim(),
    proof: String(data.get(`${prefix}Proof`) || "").trim()
  };
}

function renderActionContractSummary(contract) {
  if (!contract?.cue || !contract?.response) return "";
  return `
    <div class="action-summary">
      <span class="small">One Move</span>
      <p><strong>When</strong> ${escapeHTML(contract.cue)}, <strong>I will</strong> ${escapeHTML(contract.response)}.</p>
      <p class="small">Minimum: ${escapeHTML(contract.minimum)} · Proof: ${escapeHTML(contract.proof)}</p>
    </div>
  `;
}

function getPendingActionRecord(journey = state.activeJourney) {
  if (!journey) return null;
  return [...(journey.foundationRecords || []), ...getRecords(journey)]
    .filter((record) => record.actionContract?.cue && !record.actionFollowUp)
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))[0] || null;
}

function renderActionFollowUp() {
  const record = getPendingActionRecord();
  if (!record) return "";
  return `
    <section class="panel follow-up-panel">
      <div class="action-contract-heading">
        <div><p class="eyebrow">Close the loop</p><h2>What happened with your earlier One Move?</h2></div>
        <span class="pill gold">+25 glow for follow-through</span>
      </div>
      ${renderActionContractSummary(record.actionContract)}
      <p class="small">Record an honest outcome before completing the next lesson or practice day. Adjusting the action is allowed; silently skipping it is not.</p>
      <form id="actionFollowUpForm" class="form" style="margin-top:16px;">
        <input type="hidden" name="recordId" value="${escapeHTML(record.id)}">
        <div class="grid two">
          <div class="field">
            <label for="followUpOutcome">What happened?</label>
            <select id="followUpOutcome" name="outcome" required>
              <option value="">Choose an honest result</option>
              <option value="completed">I completed the full action</option>
              <option value="minimum">I practiced the minimum version</option>
              <option value="adjust">I did not do it; I need to adjust it</option>
            </select>
          </div>
          <div class="field">
            <label for="followUpNote">What did you learn?</label>
            <input id="followUpNote" name="note" required maxlength="220" placeholder="One honest sentence is enough">
          </div>
        </div>
        <button class="button secondary" type="submit">Record follow-through</button>
      </form>
    </section>
  `;
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
    today: state.activeJourney.foundationsComplete ? renderToday : renderFoundation,
    journey: renderJourney,
    lab: renderPatternLab,
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
          ${navButton("lab", "Pattern Lab")}
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

function guidedChoice(name, label, placeholder) {
  const options = GUIDED_OPTIONS[name] || [];
  return `
    <div class="field guided-choice">
      <label for="${name}Choice">${escapeHTML(label)}</label>
      <select id="${name}Choice" name="${name}Choice" required>
        <option value="">Choose a starting point</option>
        ${options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}
        <option value="custom">Write my own</option>
      </select>
      <input name="${name}Custom" data-custom-for="${name}Choice" maxlength="220" placeholder="${escapeHTML(placeholder)}">
      <span class="small">Choose an option, or write your own more specific answer.</span>
    </div>
  `;
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
          <h1>Practice one clear move at a time.</h1>
          <p class="lead">An ordered private companion for learning the foundations, changing one familiar pattern, and turning daily meditation into observable real-life action.</p>
          <div class="hero-proof">
            <span class="pill">One active journey</span>
            <span class="pill">One precise move each session</span>
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
            ${guidedChoice("primaryPattern", "Primary habit or identity pattern", "Example: I withdraw and replay criticism for hours.")}
            <div class="grid two">
              ${guidedChoice("triggers", "Common trigger", "Describe your own trigger")}
              ${guidedChoice("thoughts", "Recurring thought", "Write the thought in your own words")}
              ${guidedChoice("emotions", "Familiar emotion", "Name your own emotion")}
              ${guidedChoice("behaviors", "Automatic behavior", "Describe what you usually do")}
            </div>
            ${guidedChoice("futureResponse", "Desired future-self response", "Describe what your new self would choose")}
            <div class="field">
              <label for="statement">Journey statement</label>
              <input id="statement" name="statement" required maxlength="180" placeholder="I am changing my habit of withdrawing when I feel criticized.">
            </div>
            <div class="field guided-choice">
              <label for="firstDeclarationChoice">First Change Declaration</label>
              <select id="firstDeclarationChoice" name="firstDeclarationChoice" required>
                <option value="">Choose a starting declaration</option>
                ${GUIDED_OPTIONS.firstDeclaration.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}
                <option value="custom">Write my own</option>
              </select>
              <input name="firstDeclarationCustom" data-custom-for="firstDeclarationChoice" maxlength="180" placeholder="Write your own declaration">
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
            <button class="button gold" type="submit">Begin with the Introduction</button>
          </form>
        </section>
        ${archiveMarkup}
        <p class="small">Independent personal-growth companion. Keep the book available for the referenced chapters. This app is not medical or mental-health treatment.</p>
      </div>
    </main>
  `;
}

function renderFoundation() {
  const journey = state.activeJourney;
  const index = Math.min(FOUNDATION_CONTENT.length - 1, journey.currentFoundationIndex || 0);
  const lesson = FOUNDATION_CONTENT[index];
  const completed = journey.foundationRecords.length;
  const progress = Math.round((completed / FOUNDATION_CONTENT.length) * 100);

  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Foundations · ${escapeHTML(lesson.label)} · ${index + 1} of ${FOUNDATION_CONTENT.length}</p>
        <h1>${escapeHTML(lesson.title)}</h1>
        <p class="lead">${escapeHTML(lesson.focus)}</p>
      </div>
      <div class="card stat">
        <span class="small">Foundation progress</span>
        <strong>${completed}/${FOUNDATION_CONTENT.length}</strong>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
      </div>
    </header>

    ${renderMomentumStrip()}
    ${renderActionFollowUp()}

    <section class="practice-spark">
      <span class="small">Practice spark</span>
      <strong>${escapeHTML(practiceSpark(index))}</strong>
    </section>

    <section class="panel foundation-lesson">
      <div class="meta-row"><span class="pill gold">${escapeHTML(lesson.page)}</span><span class="pill">Required before Week One</span></div>
      <h2 style="margin-top:14px;">Why this comes first</h2>
      <p>${escapeHTML(lesson.why)}</p>
      <div class="notice">Read or review this section in your copy of the book. The app keeps the order and helps you apply it without reproducing the chapter.</div>
    </section>

    <form id="foundationForm" class="form">
      <section class="panel">
        <p class="eyebrow">Step 1 of 2 · Understand</p>
        <h2>${escapeHTML(lesson.prompt)}</h2>
        <div class="field">
          <label for="foundationReflection">What stood out?</label>
          <textarea id="foundationReflection" name="reflection" required placeholder="Connect the chapter to the pattern you chose for this journey."></textarea>
        </div>
        <label class="check-row">
          <input type="checkbox" name="reviewed" required>
          I read or reviewed the referenced section and completed this reflection honestly.
        </label>
      </section>
      <section class="panel">
        <p class="eyebrow">Step 2 of 2 · Act</p>
        ${renderActionContract("foundationAction", lesson.action)}
      </section>
      <button class="button gold" type="submit">${index === FOUNDATION_CONTENT.length - 1 ? "Complete Foundations and Unlock Week One" : `Complete and Continue to ${FOUNDATION_CONTENT[index + 1].label}`}</button>
    </form>
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

    ${renderMomentumStrip()}
    ${renderActionFollowUp()}

    <section class="practice-spark">
      <span class="small">Practice spark</span>
      <strong>${escapeHTML(practiceSpark(journey.currentWeek * 10 + journey.currentDay))}</strong>
    </section>

    <section class="focus-flow" aria-label="Today's practice flow">
      <span><strong>1</strong> Declare</span>
      <span><strong>2</strong> Meditate</span>
      <span><strong>3</strong> Reflect</span>
      <span><strong>4</strong> Choose one move</span>
    </section>

    <section class="panel">
      <div class="meta-row"><span class="pill gold">${escapeHTML(week.shortTitle)}</span><span class="pill">${escapeHTML(week.page)}</span></div>
      <h2 style="margin-top:12px;">Why this practice matters</h2>
      <p>${escapeHTML(week.why)}</p>
    </section>

    <form id="dailyPracticeForm" class="form">
      <section class="panel">
        <p class="eyebrow">Step 1 of 4 · Change Declaration</p>
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
        <p class="eyebrow">Step 2 of 4 · Meditation</p>
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
        <p class="eyebrow">Step 3 of 4 · Reflection</p>
        <h2>${escapeHTML(daily[1])}</h2>
        <div class="field"><label for="reflection">Short reflection</label><textarea id="reflection" name="reflection" required placeholder="Write what you noticed without judging it."></textarea></div>
        <div class="field">
          <label for="intensityAfter">How strong does the pattern feel after practice? <span id="afterValue">5</span>/10</label>
          <input id="intensityAfter" name="intensityAfter" type="range" min="1" max="10" value="5">
        </div>
      </section>

      <section class="panel">
        <p class="eyebrow">Step 4 of 4 · Act</p>
        ${renderActionContract("dailyAction", daily[2], { cue: journey.triggers, response: journey.futureResponse })}
        <div class="field" style="margin-top:18px;"><label for="evidence">Optional proof if you already tried it</label><textarea id="evidence" name="evidence" placeholder="What happened when you chose differently?"></textarea></div>
      </section>

      <button class="button gold completion-button" type="submit">Complete Day ${journey.currentDay} and add 60 glow</button>
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
    ${renderMomentumStrip()}
    ${renderActionFollowUp()}
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

    ${renderMomentumStrip()}

    <section class="panel">
      <p class="eyebrow">Required Foundations</p>
      <h2>Introduction and Chapters 1-9</h2>
      <p class="small">These lessons establish the book's ideas and preparation in order. Week One begins at Chapter 10 only after all Foundations are complete.</p>
      <div class="foundation-map">
        ${FOUNDATION_CONTENT.map((lesson, index) => renderFoundationDot(journey, lesson, index)).join("")}
      </div>
    </section>

    <section class="panel">
      <p class="eyebrow">Four-week practice</p>
      <h2>${journey.foundationsComplete ? "Week One is unlocked" : "Locked until Foundations are complete"}</h2>
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

function renderFoundationDot(journey, lesson, index) {
  const record = journey.foundationRecords.find((item) => item.id === lesson.id);
  const current = !journey.foundationsComplete && index === journey.currentFoundationIndex;
  return `
    <article class="foundation-step ${record ? "complete" : ""} ${current ? "current" : ""}">
      <span class="foundation-number">${record ? "✓" : index + 1}</span>
      <div><strong>${escapeHTML(lesson.label)}</strong><span>${escapeHTML(lesson.title)}</span></div>
    </article>
  `;
}

function renderWeekCard(week, journey) {
  const cycles = Math.max(1, ...getRecords(journey).filter((item) => item.week === week.week).map((item) => item.cycle));
  const cycle = week.week === journey.currentWeek ? journey.currentCycle : cycles;
  const isActive = week.week === journey.currentWeek;
  return `
    <article class="week-card ${isActive && journey.foundationsComplete ? "active" : ""} ${journey.foundationsComplete ? "" : "locked"}">
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
  const current = journey.foundationsComplete && week === journey.currentWeek && cycle === journey.currentCycle && day === journey.currentDay && !journey.needsReview;
  const available = Boolean(record || current || (journey.foundationsComplete && state.settings.flexibleProgression));
  const classes = [record ? "complete" : "", current ? "current" : "", available ? "" : "locked"].filter(Boolean).join(" ");
  if (!available) return `<span class="day-dot ${classes}" title="Complete earlier days first">${day}</span>`;
  return `<button class="day-dot ${classes}" type="button" data-action="${record ? "view-record" : "jump-day"}" data-week="${week}" data-cycle="${cycle}" data-day="${day}" title="${record ? "View completed entry" : "Make this the active day"}">${day}</button>`;
}

function getLabSessions(mode = "", journeyId = state.activeJourney?.id || "") {
  return state.patternLab
    .filter((session) => (!journeyId || session.journeyId === journeyId) && (!mode || session.mode === mode))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function countMostCommon(values) {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0] || ["Not enough data yet", 0];
}

function getPrivateCoachInsight() {
  const sessions = getLabSessions();
  const reviews = sessions.filter((session) => session.mode === "review");
  const rehearsals = sessions.filter((session) => session.mode === "rehearse");
  const [topTrigger, triggerCount] = countMostCommon(reviews.map((session) => session.trigger));
  const [topInterruption, interruptionCount] = countMostCommon(reviews.map((session) => session.interruptionPoint));
  const [topBranch, branchCount] = countMostCommon(rehearsals.map((session) => session.selectedBranch));
  const records = getAllJourneyRecords();
  const before = average(records.map((record) => record.intensityBefore));
  const after = average(records.map((record) => record.intensityAfter));

  if (!sessions.length) {
    return {
      headline: "Your coach needs one real moment.",
      observation: `Start with "${state.activeJourney.triggers}" or rehearse how you want to respond as "${state.activeJourney.futureResponse}".`,
      question: "Which recent or expected moment would be most useful to examine?",
      recommendation: "Complete one Review the Moment session first."
    };
  }

  const observation = reviews.length
    ? `${topTrigger} is your most repeated reviewed trigger (${triggerCount} session${triggerCount === 1 ? "" : "s"}). You most often choose to interrupt at ${topInterruption.toLowerCase()} (${interruptionCount}).`
    : `You have rehearsed ${rehearsals.length} future moment${rehearsals.length === 1 ? "" : "s"} but have not reviewed a real event yet.`;
  const recommendation = reviews.length && rehearsals.length
    ? `Rehearse the next ${topTrigger.toLowerCase()} moment using the "${topBranch}" branch, then compare it with what actually happens.`
    : reviews.length
      ? `Rehearse a likely ${topTrigger.toLowerCase()} moment before it happens.`
      : "Review the next real event after it happens so rehearsal and evidence can be compared.";
  return {
    headline: "Private coach observation",
    observation: `${observation}${records.length ? ` Daily practice intensity currently averages ${before} before and ${after} after.` : ""}`,
    question: `What would make ${topInterruption.toLowerCase()} easier to notice one step sooner?`,
    recommendation
  };
}

function renderPrivateCoach() {
  if (!state.settings.privateCoachEnabled) return "";
  const insight = getPrivateCoachInsight();
  return `
    <section class="panel coach-card">
      <div class="action-contract-heading">
        <div><p class="eyebrow">Private reflection coach</p><h2>${escapeHTML(insight.headline)}</h2></div>
        <span class="pill gold">Local only</span>
      </div>
      <p>${escapeHTML(insight.observation)}</p>
      <div class="grid two">
        <div class="mission-preview"><span class="small">Question to consider</span><p>${escapeHTML(insight.question)}</p></div>
        <div class="mission-preview"><span class="small">Recommended next experiment</span><p>${escapeHTML(insight.recommendation)}</p></div>
      </div>
      <p class="small" style="margin-top:14px;">Generated deterministically from data stored in this browser. Nothing is sent to an external AI service.</p>
    </section>
  `;
}

function renderReviewMomentForm() {
  const journey = state.activeJourney;
  return `
    <form id="reviewMomentForm" class="form lab-form">
      <section class="panel">
        <p class="eyebrow">Review the Moment</p>
        <h2>Slow down a real event until the choice becomes visible.</h2>
        <div class="field"><label for="reviewSituation">What happened, using observable facts?</label><textarea id="reviewSituation" name="situation" required placeholder="Describe what happened without interpreting motives."></textarea></div>
        <div class="grid two">
          <div class="field"><label for="reviewTrigger">Trigger</label><input id="reviewTrigger" name="trigger" required value="${escapeHTML(journey.triggers)}"></div>
          <div class="field"><label for="reviewThought">First automatic thought</label><input id="reviewThought" name="thought" required value="${escapeHTML(journey.thoughts)}"></div>
          <div class="field"><label for="reviewBody">Body signal</label><select id="reviewBody" name="body" required><option value="">Choose what appeared first</option>${LAB_BODY_OPTIONS.map((item) => `<option>${escapeHTML(item)}</option>`).join("")}<option>Something else</option></select></div>
          <div class="field"><label for="reviewEmotion">Emotion</label><input id="reviewEmotion" name="emotion" required value="${escapeHTML(journey.emotions)}"></div>
          <div class="field"><label for="reviewUrge">Urge</label><select id="reviewUrge" name="urge" required><option value="">Choose the automatic urge</option>${LAB_URGE_OPTIONS.map((item) => `<option>${escapeHTML(item)}</option>`).join("")}<option>Something else</option></select></div>
          <div class="field"><label for="reviewBehavior">What you did</label><input id="reviewBehavior" name="behavior" required value="${escapeHTML(journey.behaviors)}"></div>
        </div>
        <div class="field"><label for="reviewResult">What result did the old sequence create?</label><textarea id="reviewResult" name="result" required></textarea></div>
      </section>
      <section class="panel">
        <p class="eyebrow">Choose the earliest useful interruption</p>
        <div class="branch-grid">
          ${LAB_INTERRUPT_OPTIONS.map(([id, label, note], index) => `
            <label class="branch-card">
              <input type="radio" name="interruptionPoint" value="${escapeHTML(label)}" ${index === 0 ? "required" : ""}>
              <strong>${escapeHTML(label)}</strong><span>${escapeHTML(note)}</span>
            </label>
          `).join("")}
        </div>
        <div class="field" style="margin-top:16px;"><label for="reviewNewResponse">What would the new self choose there?</label><textarea id="reviewNewResponse" name="newResponse" required placeholder="${escapeHTML(journey.futureResponse)}"></textarea></div>
        <button class="button gold" type="submit">Save reviewed moment</button>
      </section>
    </form>
  `;
}

function scenarioBranches() {
  const journey = state.activeJourney;
  return [
    { id: "old-pattern", title: "Repeat the familiar response", action: journey.behaviors, result: `This protects the familiar state in the short term but reinforces "${journey.primaryPattern}".`, type: "old" },
    { id: "pause", title: "Pause before choosing", action: "Take one slow breath, name the old pattern, and wait three seconds.", result: "This creates enough space to choose without demanding a perfect response.", type: "bridge" },
    { id: "new-self", title: "Act as the rehearsed new self", action: journey.futureResponse, result: "This gives the new identity visible evidence and may feel unfamiliar at first.", type: "new" }
  ];
}

function renderRehearseMomentForm() {
  const journey = state.activeJourney;
  return `
    <form id="rehearseMomentForm" class="form lab-form">
      <section class="panel rehearsal-stage">
        <p class="eyebrow">Rehearse the Moment</p>
        <h2>Practice before the trigger arrives.</h2>
        <div class="field"><label for="rehearseScenario">Expected situation</label><textarea id="rehearseScenario" name="scenario" required placeholder="Example: I receive feedback during a meeting."></textarea></div>
        <div class="scenario-cue">
          <span class="small">Likely cue from your journey</span>
          <strong>${escapeHTML(journey.triggers)}</strong>
          <p>Your familiar thought may be: ${escapeHTML(journey.thoughts)}</p>
        </div>
      </section>
      <section class="panel">
        <p class="eyebrow">Choose a branch</p>
        <div class="branch-grid">
          ${scenarioBranches().map((branch, index) => `
            <label class="branch-card ${branch.type}">
              <input type="radio" name="selectedBranch" value="${escapeHTML(branch.title)}" ${index === 0 ? "required" : ""}>
              <strong>${escapeHTML(branch.title)}</strong>
              <span>${escapeHTML(branch.action)}</span>
              <em>${escapeHTML(branch.result)}</em>
            </label>
          `).join("")}
        </div>
        <div class="grid two" style="margin-top:16px;">
          <div class="field"><label for="rehearseWords">Exact words or action you will use</label><textarea id="rehearseWords" name="rehearsedResponse" required placeholder="${escapeHTML(journey.futureResponse)}"></textarea></div>
          <div class="field"><label for="rehearseObstacle">What may pull you back to the old pattern?</label><textarea id="rehearseObstacle" name="obstacle" required></textarea></div>
        </div>
        <button class="button gold" type="submit">Save rehearsed moment</button>
      </section>
    </form>
  `;
}

function renderLabSession(session) {
  if (session.mode === "review") {
    return `
      <article class="entry lab-entry">
        <div class="meta-row"><span class="pill gold">Reviewed moment</span>${session.journeyTitle ? `<span class="pill">${escapeHTML(session.journeyTitle)}</span>` : ""}<span class="small">${escapeHTML(formatDate(session.createdAt))}</span></div>
        <h3>${escapeHTML(session.situation)}</h3>
        <p><strong>Sequence:</strong> ${escapeHTML(session.trigger)} → ${escapeHTML(session.thought)} → ${escapeHTML(session.body)} → ${escapeHTML(session.emotion)} → ${escapeHTML(session.urge)} → ${escapeHTML(session.behavior)}</p>
        <p><strong>Earliest interruption:</strong> ${escapeHTML(session.interruptionPoint)}</p>
        <p><strong>New response:</strong> ${escapeHTML(session.newResponse)}</p>
      </article>
    `;
  }
  return `
    <article class="entry lab-entry">
      <div class="meta-row"><span class="pill gold">Rehearsed moment</span>${session.journeyTitle ? `<span class="pill">${escapeHTML(session.journeyTitle)}</span>` : ""}<span class="small">${escapeHTML(formatDate(session.createdAt))}</span></div>
      <h3>${escapeHTML(session.scenario)}</h3>
      <p><strong>Chosen branch:</strong> ${escapeHTML(session.selectedBranch)}</p>
      <p><strong>Rehearsed response:</strong> ${escapeHTML(session.rehearsedResponse)}</p>
      <p><strong>Expected obstacle:</strong> ${escapeHTML(session.obstacle)}</p>
    </article>
  `;
}

function renderPatternLab() {
  const sessions = getLabSessions();
  const activeMode = state.settings.labMode || "review";
  return `
    <header class="topbar">
      <div><p class="eyebrow">Pattern Lab</p><h1>Study the old sequence. Rehearse the new one.</h1><p class="lead">Use real and expected moments to specialize the practice around your actual triggers, body signals, urges, and choices.</p></div>
      <div class="card stat"><span class="small">Lab sessions</span><strong>${sessions.length}</strong><span class="small">${getLabSessions("review").length} reviewed · ${getLabSessions("rehearse").length} rehearsed</span></div>
    </header>
    ${renderMomentumStrip()}
    ${renderPrivateCoach()}
    <section class="lab-mode-switch">
      <button class="lab-mode-button ${activeMode === "review" ? "active" : ""}" type="button" data-action="lab-mode" data-mode="review"><strong>Review the Moment</strong><span>Slow down something that already happened.</span></button>
      <button class="lab-mode-button ${activeMode === "rehearse" ? "active" : ""}" type="button" data-action="lab-mode" data-mode="rehearse"><strong>Rehearse the Moment</strong><span>Practice a likely situation before it happens.</span></button>
    </section>
    ${activeMode === "review" ? renderReviewMomentForm() : renderRehearseMomentForm()}
    <section class="panel">
      <h2>Preserved Pattern Lab sessions</h2>
      ${sessions.length ? sessions.slice(0, 12).map(renderLabSession).join("") : `<div class="empty">Your reviewed and rehearsed moments will remain here for comparison.</div>`}
    </section>
  `;
}

function renderJournal() {
  const query = state.settings.journalQuery.trim().toLowerCase();
  const journeys = [state.activeJourney, ...state.archives].filter(Boolean);
  const entries = journeys.flatMap((journey) => getRecords(journey).map((record) => ({ journey, record })))
    .filter(({ journey, record }) => !query || JSON.stringify({ journey: journey.title, ...record }).toLowerCase().includes(query))
    .sort((a, b) => new Date(b.record.completedAt) - new Date(a.record.completedAt));
  const reviews = journeys.flatMap((journey) => (journey.reviews || []).map((review) => ({ journey, review })))
    .sort((a, b) => new Date(b.review.completedAt) - new Date(a.review.completedAt));
  const foundations = journeys.flatMap((journey) => (journey.foundationRecords || []).map((record) => ({ journey, record })))
    .sort((a, b) => new Date(b.record.completedAt) - new Date(a.record.completedAt));
  const labSessions = getLabSessions("", "").filter((session) => !query || JSON.stringify(session).toLowerCase().includes(query));

  return `
    <header class="topbar">
      <div><p class="eyebrow">Preserved entries</p><h1>Return to what you noticed.</h1><p class="lead">Search declarations, triggers, reflections, and evidence across every cycle and completed journey.</p></div>
      <div class="card stat"><span class="small">Preserved entries</span><strong>${entries.length + foundations.length + labSessions.length}</strong><span class="small">${foundations.length} foundations · ${labSessions.length} lab sessions</span></div>
    </header>
    <section class="panel">
      <form id="journalSearchForm" class="actions">
        <input name="query" value="${escapeHTML(state.settings.journalQuery)}" placeholder="Search preserved entries" style="flex:1; min-width:220px;">
        <button class="button secondary" type="submit">Search</button>
        <button class="button secondary" type="button" data-action="clear-search">Clear</button>
      </form>
    </section>
    <section class="panel">
      <h2>Pattern Lab sessions</h2>
      ${labSessions.length ? labSessions.map(renderLabSession).join("") : `<div class="empty">Pattern Lab sessions appear here after you review or rehearse a moment.</div>`}
    </section>
    <section class="panel">
      <h2>Foundation entries</h2>
      ${foundations.length ? foundations.map(({ journey, record }) => `
        <article class="entry">
          <div class="meta-row"><span class="pill">${escapeHTML(journey.title)}</span><span class="pill gold">${escapeHTML(record.label)}</span><span class="small">${escapeHTML(formatDate(record.completedAt))}</span></div>
          <h3>${escapeHTML(record.title)}</h3>
          <p><strong>Reflection:</strong> ${escapeHTML(record.reflection)}</p>
          <p><strong>Application:</strong> ${escapeHTML(record.application)}</p>
          ${renderActionContractSummary(record.actionContract)}
          ${record.actionFollowUp ? `<p class="small"><strong>Follow-through:</strong> ${escapeHTML(record.actionFollowUp.outcome)} · ${escapeHTML(record.actionFollowUp.note)}</p>` : ""}
        </article>
      `).join("") : `<div class="empty">Foundation reflections appear here as you complete them.</div>`}
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
      ${renderActionContractSummary(record.actionContract)}
      ${record.actionFollowUp ? `<p class="small"><strong>Follow-through:</strong> ${escapeHTML(record.actionFollowUp.outcome)} · ${escapeHTML(record.actionFollowUp.note)}</p>` : ""}
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
  const momentum = getMomentum();

  return `
    <header class="topbar">
      <div><p class="eyebrow">Growth comparisons</p><h1>Measure practice, not perfection.</h1><p class="lead">Compare recurring declarations, intensity shifts, and evidence across cycles without erasing earlier work.</p></div>
      <div class="card stat"><span class="small">Average pattern intensity</span><strong>${averageBefore} → ${averageAfter}</strong><span class="small">before and after practice</span></div>
    </header>
    ${renderMomentumStrip()}
    <section class="panel">
      <p class="eyebrow">Sunset milestones</p>
      <h2>Let consistency reveal the change.</h2>
      <div class="milestone-grid">
        ${MOMENTUM_MILESTONES.map((milestone) => `
          <article class="milestone-card ${momentum.points >= milestone.points ? "earned" : ""}">
            <span class="pill ${momentum.points >= milestone.points ? "gold" : ""}">${momentum.points >= milestone.points ? "Reached" : `${milestone.points} glow`}</span>
            <h3>${escapeHTML(milestone.title)}</h3>
            <p>${escapeHTML(milestone.note)}</p>
          </article>
        `).join("")}
      </div>
    </section>
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
        ${FOUNDATION_CONTENT.map((lesson) => `
          <article class="timeline-item"><div><span class="pill gold">${escapeHTML(lesson.label)}</span></div><div><h3>${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.focus)}</p><p class="small">${escapeHTML(lesson.page)}</p></div></article>
        `).join("")}
        ${GUIDE_SECTIONS.slice(1).map(([title, pages, note]) => `
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
        <h2>Private reflection coach</h2>
        <div class="notice"><strong>Local-only coaching.</strong><br>The coach analyzes saved Pattern Lab sessions and practice evidence using fixed rules in this app. It does not send journal content or personal data anywhere.</div>
        <form id="coachSettingsForm" style="margin-top:16px;">
          <label class="check-row"><input type="checkbox" name="privateCoachEnabled" ${settings.privateCoachEnabled ? "checked" : ""}> Show personalized local coach observations in Pattern Lab</label>
          <button class="button secondary" type="submit" style="margin-top:14px;">Save coach setting</button>
        </form>
      </article>
      <article class="panel">
        <h2>Progression override</h2>
        <div class="notice danger"><strong>Sequential progression is recommended.</strong><br>Flexible Progression allows unfinished practice days and weeks to be skipped after Foundations. Introduction and Chapters 1-9 always remain required and sequential.</div>
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

function resolveGuidedChoice(data, name) {
  const choice = String(data.get(`${name}Choice`) || "").trim();
  const custom = String(data.get(`${name}Custom`) || "").trim();
  if (custom) return custom;
  if (!choice || choice === "custom") throw new Error(`Choose or write an answer for ${name.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
  return choice;
}

function handlePreparation(form) {
  const data = new FormData(form);
  const now = new Date().toISOString();
  state.settings.duration = Number(data.get("duration") || 15);
  state.settings.dailyReminder = String(data.get("practiceTime") || state.settings.dailyReminder);
  state.activeJourney = {
    id: createId(),
    title: String(data.get("title")).trim(),
    primaryPattern: resolveGuidedChoice(data, "primaryPattern"),
    triggers: resolveGuidedChoice(data, "triggers"),
    thoughts: resolveGuidedChoice(data, "thoughts"),
    emotions: resolveGuidedChoice(data, "emotions"),
    behaviors: resolveGuidedChoice(data, "behaviors"),
    futureResponse: resolveGuidedChoice(data, "futureResponse"),
    statement: String(data.get("statement")).trim(),
    firstDeclaration: resolveGuidedChoice(data, "firstDeclaration"),
    startedAt: now,
    foundationsComplete: false,
    currentFoundationIndex: 0,
    foundationRecords: [],
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
  showToast("Journey started. Begin with the Introduction; Week One unlocks after Chapter 9.");
}

function handleFoundation(form) {
  if (getPendingActionRecord()) throw new Error("Close the previous One Move before completing this Foundation.");
  const journey = state.activeJourney;
  const index = Math.min(FOUNDATION_CONTENT.length - 1, journey.currentFoundationIndex || 0);
  const lesson = FOUNDATION_CONTENT[index];
  const data = new FormData(form);
  const actionContract = readActionContract(data, "foundationAction");
  journey.foundationRecords.push({
    id: lesson.id,
    label: lesson.label,
    title: lesson.title,
    reflection: String(data.get("reflection") || "").trim(),
    application: actionContract.response,
    actionContract,
    completedAt: new Date().toISOString()
  });
  if (index >= FOUNDATION_CONTENT.length - 1) {
    journey.foundationsComplete = true;
    journey.currentFoundationIndex = FOUNDATION_CONTENT.length;
  } else {
    journey.currentFoundationIndex = index + 1;
  }
  saveState();
  render();
  showToast(journey.foundationsComplete ? "Foundations complete. Week One unlocked. +30 glow." : `${FOUNDATION_CONTENT[index + 1].label} is ready. +30 glow.`);
}

function handleActionFollowUp(form) {
  const data = new FormData(form);
  const recordId = String(data.get("recordId") || "");
  const outcome = String(data.get("outcome") || "");
  const record = [...(state.activeJourney.foundationRecords || []), ...getRecords(state.activeJourney)].find((item) => item.id === recordId);
  if (!record) throw new Error("That One Move could not be found.");
  record.actionFollowUp = {
    outcome,
    note: String(data.get("note") || "").trim(),
    completedAt: new Date().toISOString()
  };
  saveState();
  render();
  showToast(["completed", "minimum"].includes(outcome) ? "Follow-through recorded. +25 glow." : "Action adjusted honestly. Use the next One Move to make it smaller.");
}

function handleDailyPractice(form) {
  if (getPendingActionRecord()) throw new Error("Close the previous One Move before completing today's practice.");
  if (!practiceSession.complete) {
    showToast("Complete the meditation before finishing this day.");
    return;
  }
  const journey = state.activeJourney;
  const data = new FormData(form);
  const declaration = String(data.get("declaration") || "").trim();
  const reflection = String(data.get("reflection") || "").trim();
  const actionContract = readActionContract(data, "dailyAction");
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
    trigger: actionContract.cue,
    newResponse: actionContract.response,
    actionContract,
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
  const glow = record.evidence ? 80 : 60;
  showToast(journey.needsReview ? `Seven days complete. Weekly review ready. +${glow} glow.` : `Day complete. Your One Move is ready. +${glow} glow.`);
}

function handleWeeklyReview(form, submitter) {
  if (getPendingActionRecord()) throw new Error("Close the final One Move before completing the weekly review.");
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

function handleCoachSettings(form) {
  const data = new FormData(form);
  state.settings.privateCoachEnabled = data.get("privateCoachEnabled") === "on";
  saveState();
  render();
  showToast(state.settings.privateCoachEnabled ? "Private local coach enabled." : "Private local coach hidden.");
}

function handleReviewMoment(form) {
  const data = new FormData(form);
  state.patternLab.push({
    id: createId(),
    journeyId: state.activeJourney.id,
    journeyTitle: state.activeJourney.title,
    mode: "review",
    situation: String(data.get("situation") || "").trim(),
    trigger: String(data.get("trigger") || "").trim(),
    thought: String(data.get("thought") || "").trim(),
    body: String(data.get("body") || "").trim(),
    emotion: String(data.get("emotion") || "").trim(),
    urge: String(data.get("urge") || "").trim(),
    behavior: String(data.get("behavior") || "").trim(),
    result: String(data.get("result") || "").trim(),
    interruptionPoint: String(data.get("interruptionPoint") || "").trim(),
    newResponse: String(data.get("newResponse") || "").trim(),
    createdAt: new Date().toISOString()
  });
  saveState();
  render();
  showToast("Moment reviewed and preserved. The private coach updated.");
}

function handleRehearseMoment(form) {
  const data = new FormData(form);
  state.patternLab.push({
    id: createId(),
    journeyId: state.activeJourney.id,
    journeyTitle: state.activeJourney.title,
    mode: "rehearse",
    scenario: String(data.get("scenario") || "").trim(),
    selectedBranch: String(data.get("selectedBranch") || "").trim(),
    rehearsedResponse: String(data.get("rehearsedResponse") || "").trim(),
    obstacle: String(data.get("obstacle") || "").trim(),
    createdAt: new Date().toISOString()
  });
  saveState();
  render();
  showToast("Future moment rehearsed and preserved. The private coach updated.");
}

function handleProgression(form) {
  const data = new FormData(form);
  state.settings.flexibleProgression = data.get("flexibleProgression") === "on";
  saveState();
  render();
  showToast(state.settings.flexibleProgression ? "Flexible Progression enabled." : "Sequential progression restored.");
}

function jumpToDay(element) {
  if (!state.settings.flexibleProgression || !state.activeJourney.foundationsComplete) return;
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
  state = {
    ...structuredClone(DEFAULT_STATE),
    ...restored,
    settings: { ...DEFAULT_STATE.settings, ...(restored.settings || {}) },
    patternLab: Array.isArray(restored.patternLab) ? restored.patternLab : []
  };
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
    if (form.id === "foundationForm") handleFoundation(form);
    if (form.id === "actionFollowUpForm") handleActionFollowUp(form);
    if (form.id === "dailyPracticeForm") handleDailyPractice(form);
    if (form.id === "weeklyReviewForm") handleWeeklyReview(form, event.submitter);
    if (form.id === "settingsForm") handleSettings(form);
    if (form.id === "coachSettingsForm") handleCoachSettings(form);
    if (form.id === "reviewMomentForm") handleReviewMoment(form);
    if (form.id === "rehearseMomentForm") handleRehearseMoment(form);
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
  if (action === "lab-mode") {
    state.settings.labMode = element.dataset.mode === "rehearse" ? "rehearse" : "review";
    saveState();
    render();
  }
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
  if (/^(foundationAction|dailyAction)(Cue|Response|Minimum|Proof)$/.test(event.target.id)) {
    updateMissionPreview(event.target.id.startsWith("foundationAction") ? "foundationAction" : "dailyAction");
  }
});

function updateMissionPreview(prefix) {
  const cue = document.getElementById(`${prefix}Cue`)?.value.trim();
  const response = document.getElementById(`${prefix}Response`)?.value.trim();
  const minimum = document.getElementById(`${prefix}Minimum`)?.value.trim();
  const proof = document.getElementById(`${prefix}Proof`)?.value.trim();
  const preview = document.querySelector(`[data-mission-preview="${prefix}"]`);
  if (!preview) return;
  preview.textContent = cue && response && minimum && proof
    ? `When ${cue}, I will ${response}. The minimum is ${minimum}. I will count it when ${proof}.`
    : "Complete the four fields to create a precise action.";
}

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
