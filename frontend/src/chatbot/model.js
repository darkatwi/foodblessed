/*
  FoodBlessed chatbot model — TF-IDF intent classifier.
  Reads all knowledge from knowledge.js (edit that file to teach the bot new things).
  No external API, no ML library — runs entirely in the browser.
*/

import { KNOWLEDGE } from "./knowledge";

// ── Stop words ───────────────────────────────────────────────────
const STOP = new Set([
  "i","me","my","we","our","you","your","it","its","is","am","are","was","be",
  "been","being","have","has","had","do","does","did","will","would","could",
  "should","may","can","a","an","the","and","but","or","so","if","in","on",
  "at","to","for","of","with","by","from","as","into","about","up","out",
  "what","how","why","when","where","who","which","that","this","these","those",
  "not","no","more","some","any","all","there","their","they","them","get",
  "give","want","need","like","just","let","us","also","very","really","please",
]);

// ── Text helpers ─────────────────────────────────────────────────
function normalize(t) {
  return t.toLowerCase().replace(/[^\w\s]/g, " ").trim();
}

function tokenize(t) {
  return normalize(t).split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
}

// ── Levenshtein (typo tolerance) ─────────────────────────────────
function editDist(a, b) {
  const R = a.length + 1, C = b.length + 1;
  const d = Array.from({ length: R }, (_, i) =>
    Array.from({ length: C }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i < R; i++)
    for (let j = 1; j < C; j++)
      d[i][j] = a[i-1] === b[j-1] ? d[i-1][j-1]
               : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
  return d[a.length][b.length];
}

function fuzzy(a, b) {
  if (a === b) return true;
  if (a.length >= 5 && b.length >= 5) return editDist(a, b) <= 1;
  return false;
}

// ── Build IDF weights from the entire knowledge base ─────────────
// Words that appear in many intents are penalised; rare words are rewarded.
function buildIDF() {
  const docFreq = {};
  const N = KNOWLEDGE.length;

  for (const entry of KNOWLEDGE) {
    const seen = new Set();
    for (const trigger of entry.triggers) {
      for (const tok of tokenize(trigger)) {
        if (!seen.has(tok)) {
          docFreq[tok] = (docFreq[tok] || 0) + 1;
          seen.add(tok);
        }
      }
    }
  }

  const idf = {};
  for (const [tok, df] of Object.entries(docFreq)) {
    idf[tok] = Math.log((N + 1) / (df + 1)) + 1; // smoothed IDF
  }
  return idf;
}

const IDF = buildIDF();

// Get IDF for a token (unknown tokens get max reward)
function getIDF(tok) {
  return IDF[tok] ?? (Math.log(KNOWLEDGE.length + 1) + 1);
}

// ── Scorer ───────────────────────────────────────────────────────
function scoreEntry(entry, queryTokens, normQuery) {
  let s = 0;

  for (const trigger of entry.triggers) {
    const normTrigger = normalize(trigger);

    // Exact phrase match — strongest signal, scaled by phrase length
    if (normQuery.includes(normTrigger)) {
      const words = normTrigger.split(" ").length;
      s += words * 3 * (entry.priority ?? 1);
      continue;
    }

    // TF-IDF token match with fuzzy tolerance
    const trigTokens = tokenize(trigger);
    if (trigTokens.length === 0) continue;

    let hits = 0;
    let idfSum = 0;

    for (const tt of trigTokens) {
      const ttIdf = getIDF(tt);
      for (const qt of queryTokens) {
        if (fuzzy(tt, qt)) {
          hits++;
          idfSum += ttIdf;
          break;
        }
      }
    }

    const coverage = hits / trigTokens.length;
    if (coverage >= 0.6) {
      s += idfSum * coverage * (entry.priority ?? 1);
    }
  }

  return s;
}

// ── Public API ───────────────────────────────────────────────────
export function classify(query) {
  if (!query?.trim()) return null;

  const qTokens = tokenize(query);
  const normQ   = normalize(query);

  let best = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    const s = scoreEntry(entry, qTokens, normQ);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }

  if (bestScore < 2) {
    return "I can only answer questions about FoodBlessed 🌿 Try asking about our mission, how to volunteer, donate, our Food Assistance Packages, location, or impact!";
  }

  return best.answer;
}
