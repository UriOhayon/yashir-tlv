#!/usr/bin/env node
// Fetches Vercel request logs for yashir-tlv and appends to vercel-logs/YYYY-MM-DD.ndjson
// Designed to run hourly via the background loop.

const fs   = require('fs');
const path = require('path');

const ENV_FILE   = path.join(__dirname, '.env.vercel-logs');
const LOG_DIR    = path.join(__dirname, '..', 'vercel-logs');
const STATE_FILE = path.join(LOG_DIR, '.state.json');

// From the Vercel dashboard network request:
const PROJECT_ID = 'prj_BWNr3yeRSA5ITZWcBlYDlYiQFCKD';
const TEAM_ID    = 'team_zaIjUkxjR9CmTOT7dhhnmlzJ';
const OWNER_ID   = 'team_zaIjUkxjR9CmTOT7dhhnmlzJ';

// Load .env.vercel-logs
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key) process.env[key] = val;
  }
}

const TOKEN = process.env.VERCEL_TOKEN;
if (!TOKEN) {
  console.error('Error: VERCEL_TOKEN not set. Add it to scripts/.env.vercel-logs');
  process.exit(1);
}

async function fetchPage(startDate, endDate, page) {
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate:   String(endDate),
    ownerId:   OWNER_ID,
    teamId:    TEAM_ID,
    projectId: PROJECT_ID,
    page:      String(page),
  });
  const res = await fetch(`https://vercel.com/api/logs/request-logs?${params}`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Vercel logs API ${res.status}: ${body}`);
  }
  return res.json();
}

async function main() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

  let state = { lastFetchMs: null, seenIds: [] };
  if (fs.existsSync(STATE_FILE)) {
    try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch {}
  }

  const now     = Date.now();
  // On first run fetch 2 hours back; afterwards fetch from last run
  const startMs = state.lastFetchMs ? Number(state.lastFetchMs) : now - 2 * 3600 * 1000;
  const seenIds = new Set(state.seenIds || []);
  const newLogs = [];

  console.log(`[${new Date().toISOString()}] Fetching logs ${new Date(startMs).toISOString()} → ${new Date(now).toISOString()}`);

  // Paginate through all pages for this time window
  let page = 0;
  while (true) {
    const data = await fetchPage(startMs, now, page);
    const entries = data.rows || data.logs || data.items || (Array.isArray(data) ? data : []);

    if (entries.length === 0) break;

    for (const entry of entries) {
      const id = entry.requestId || entry.id || `${entry.timestamp}-${entry.requestPath}-${entry.statusCode}`;
      if (!seenIds.has(id)) {
        seenIds.add(id);
        newLogs.push(entry);
      }
    }

    // Stop if this looks like the last page
    if (!data.hasMore && !data.next && entries.length < 100) break;
    page++;
    if (page > 20) break; // safety cap
  }

  if (newLogs.length === 0) {
    console.log('No new log entries.');
  } else {
    // Sort ascending by date
    newLogs.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));

    // Group by calendar date and write to per-day ndjson files
    const byDate = {};
    for (const entry of newLogs) {
      const day = (entry.timestamp || new Date().toISOString()).slice(0, 10);
      if (!byDate[day]) byDate[day] = [];
      byDate[day].push(entry);
    }

    for (const [day, entries] of Object.entries(byDate)) {
      const file  = path.join(LOG_DIR, `${day}.ndjson`);
      const lines = entries.map(e => JSON.stringify(e)).join('\n') + '\n';
      fs.appendFileSync(file, lines, 'utf8');
      console.log(`  Wrote ${entries.length} entries → vercel-logs/${day}.ndjson`);
    }

    console.log(`Total: ${newLogs.length} new log entries saved.`);
  }

  // Persist state — cap seenIds at 50k
  state.lastFetchMs = String(now);
  state.seenIds     = [...seenIds].slice(-50000);
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

main().catch(err => {
  console.error(`[${new Date().toISOString()}] Fatal error:`, err.message);
  process.exit(1);
});
