/* 1st Japan Trip — app logic (no build step, no libraries) */
(function () {
  "use strict";

  var TRIP = window.TRIP;
  var KEY = {
    day: "jp1-day",
    check: "jp1-check",
    stamps: "jp1-stamps",
    rate: "jp1-rate",
    theme: "jp1-theme"
  };
  var WHO = { P: "ทีมพรีเซนต์", T: "ทีมเที่ยว" };
  var THEMES = ["auto", "light", "dark"];
  var THEME_LABEL = { auto: "อัตโนมัติ", light: "สว่าง", dark: "มืด" };

  /* ---------- small helpers ---------- */
  function $(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function svg(markup) {
    var wrap = document.createElement("span");
    wrap.innerHTML = markup;
    return wrap.firstChild;
  }

  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage blocked */ }
  }
  function loadJSON(key) {
    try { return JSON.parse(load(key) || "{}") || {}; } catch (e) { return {}; }
  }

  function partsIn(zone) {
    var d = new Date();
    var date = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit"
    }).format(d);
    var time = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false
    }).format(d);
    var hm = time.split(":");
    return { date: date, time: time, hour: parseInt(hm[0], 10) % 24 + parseInt(hm[1], 10) / 60 };
  }
  function tokyoNow() { return partsIn(TRIP.timeZone); }

  function daysBetween(a, b) {
    return Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000);
  }

  function pad2(n) { n = String(n); return n.length < 2 ? "0" + n : n; }

  function todayIndex(now) {
    for (var i = 0; i < TRIP.days.length; i++) if (TRIP.days[i].date === now.date) return i;
    return -1;
  }

  function dayIndexFromHash() {
    var m = /^#day-([1-9])$/.exec(window.location.hash);
    if (!m) return -1;
    var i = parseInt(m[1], 10) - 1;
    return i < TRIP.days.length ? i : -1;
  }

  var ICON = {
    pin: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    seal: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/></svg>',
    auto: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>',
    light: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>',
    dark: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>'
  };

  /* ---------- state ---------- */
  var state = {
    day: 0,
    theme: THEMES.indexOf(load(KEY.theme)) >= 0 ? load(KEY.theme) : "auto",
    stamps: loadJSON(KEY.stamps),
    rate: parseFloat(load(KEY.rate)) > 0 ? parseFloat(load(KEY.rate)) : TRIP.rate,
    planSig: ""
  };

  /* ======================================================
     6. two clocks
     ====================================================== */
  function renderClock() {
    $("clock-home").textContent = partsIn(TRIP.homeTimeZone).time;
    $("clock-jp").textContent = tokyoNow().time;
  }

  /* ======================================================
     4. sun position + auto dark mode
     ====================================================== */
  function isNight(h) { return h < 6 || h >= 18; }

  function applyTheme() {
    var h = tokyoNow().hour;
    var dark = state.theme === "dark" || (state.theme === "auto" && isNight(h));
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0E0E0F" : "#F2F2F0");

    var btn = $("theme-btn");
    btn.textContent = "";
    btn.appendChild(svg(ICON[state.theme]));
    btn.setAttribute("aria-label", "ธีม " + THEME_LABEL[state.theme] + " แตะเพื่อเปลี่ยน");

    // sun by day, moon by night, travelling along an arc
    var f = isNight(h) ? ((h - 18 + 24) % 24) / 12 : (h - 6) / 12;
    // keep the arc on the right side so it never sits behind the title
    var x = 72 + f * 16;
    var y = 44 - Math.sin(Math.PI * f) * 30;
    var sun = $("sun");
    sun.style.setProperty("--x", x.toFixed(1) + "%");
    sun.style.setProperty("--y", y.toFixed(1) + "%");
  }

  function cycleTheme() {
    state.theme = THEMES[(THEMES.indexOf(state.theme) + 1) % THEMES.length];
    save(KEY.theme, state.theme);
    applyTheme();
  }

  /* ---------- hero + tiles ---------- */
  function renderHero() {
    $("hero-route").textContent = TRIP.hero.route.join("\n");
    $("hero-why").textContent = TRIP.hero.why;
  }

  function renderTiles() {
    var box = $("tiles");
    box.textContent = "";
    TRIP.tiles.forEach(function (t) {
      var cls = "tile mini" + (t.kind === "dark" ? " dark" : t.kind === "red" ? " red-tile" : "");
      var tile = el("div", cls);
      tile.appendChild(el("span", "label", t.label));
      tile.appendChild(el("span", "mini-big", t.big));
      if (t.line1) tile.appendChild(el("span", "mini-l1", t.line1));
      if (t.line2) tile.appendChild(el("span", "mini-l2", t.line2));
      box.appendChild(tile);
    });
  }

  function renderCountdown(now) {
    var pill = $("countdown");
    var toStart = daysBetween(now.date, TRIP.start);
    var toEnd = daysBetween(now.date, TRIP.end);
    pill.textContent = "";
    if (toStart > 0) {
      pill.appendChild(document.createTextNode("อีก "));
      pill.appendChild(el("span", "red", String(toStart)));
      pill.appendChild(document.createTextNode(" วัน"));
    } else if (toEnd >= 0) {
      pill.appendChild(document.createTextNode("Day "));
      pill.appendChild(el("span", "red", String(1 - toStart)));
      pill.appendChild(document.createTextNode(" / " + TRIP.days.length));
    } else {
      pill.textContent = "จบทริปแล้ว";
    }
  }

  function renderDayButtons(now) {
    var nav = $("days");
    nav.textContent = "";
    var tIdx = todayIndex(now);
    TRIP.days.forEach(function (d, i) {
      var btn = el("button", "day-btn");
      btn.type = "button";
      btn.setAttribute("aria-pressed", i === state.day ? "true" : "false");
      btn.setAttribute("aria-label", "วันที่ " + (i + 1) + " " + d.dowFull + " " + d.date.slice(8) + (i === tIdx ? " วันนี้" : ""));
      btn.appendChild(el("span", "day-dow", d.dow));
      btn.appendChild(el("span", "day-num", d.date.slice(8)));
      if (i === tIdx) btn.appendChild(el("span", "today-dot"));
      btn.addEventListener("click", function () { selectDay(i, true); });
      nav.appendChild(btn);
    });
  }

  /* ======================================================
     2. yen → baht
     ====================================================== */
  function toBaht(yen) {
    var b = yen * state.rate;
    var digits = b >= 100 ? 0 : 2;
    return "฿" + b.toLocaleString("th-TH", { minimumFractionDigits: 0, maximumFractionDigits: digits });
  }

  function yenFromTag(tag) {
    var m = /¥\s?([\d,]+)/.exec(tag || "");
    return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  }

  function updateFx() {
    var yen = parseFloat($("fx-yen").value) || 0;
    $("fx-baht").textContent = toBaht(yen);
  }

  function initFx() {
    var rateInput = $("fx-rate");
    rateInput.value = String(state.rate);
    rateInput.addEventListener("input", function () {
      var r = parseFloat(rateInput.value);
      if (r > 0) {
        state.rate = r;
        save(KEY.rate, String(r));
        updateFx();
      }
    });
    $("fx-yen").addEventListener("input", updateFx);

    var quick = $("fx-quick");
    [100, 500, 1000, 5000, 10000].forEach(function (v) {
      var b = el("button", null, "¥" + v.toLocaleString("en-US"));
      b.type = "button";
      b.addEventListener("click", function () { $("fx-yen").value = String(v); updateFx(); });
      quick.appendChild(b);
    });
    updateFx();
  }

  /* ======================================================
     3. stamp book
     ====================================================== */
  function allStamps() {
    var list = [];
    TRIP.days.forEach(function (d) {
      d.items.forEach(function (it) { if (it.stamp) list.push(it.stamp); });
    });
    return list;
  }

  function toggleStamp(name, btn) {
    if (state.stamps[name]) {
      delete state.stamps[name];
    } else {
      var p = tokyoNow().date.split("-");
      state.stamps[name] = p[2] + "." + p[1];
      if (btn) {
        btn.classList.remove("pop");
        void btn.offsetWidth;
        btn.classList.add("pop");
      }
    }
    save(KEY.stamps, JSON.stringify(state.stamps));
    renderStampBook();
  }

  function renderStampBook() {
    var names = allStamps();
    var got = 0;
    var box = $("stamps");
    box.textContent = "";
    names.forEach(function (name, i) {
      var date = state.stamps[name];
      var s = el("div", "stamp" + (date ? " got" : ""));
      s.setAttribute("role", "img");
      s.setAttribute("aria-label", name + (date ? " เก็บแล้ว " + date : " ยังไม่ได้เก็บ"));
      if (date) {
        got++;
        s.style.setProperty("--rot", (((i * 37) % 17) - 8) + "deg");
      }
      s.appendChild(el("span", "stamp-name", name));
      s.appendChild(el("span", "stamp-date", date || "—"));
      box.appendChild(s);
    });
    $("stamp-count").textContent = got + " / " + names.length;
  }

  /* ======================================================
     day plan
     ====================================================== */
  function nextIndexFor(d, now) {
    if (d.date !== now.date) return -1;
    for (var k = 0; k < d.items.length; k++) {
      if (!d.items[k].prev && d.items[k].t >= now.time) return k;
    }
    return -1;
  }

  function renderPlan(now, force) {
    var d = TRIP.days[state.day];
    var nextIdx = nextIndexFor(d, now);
    var sig = state.day + "|" + now.date + "|" + nextIdx;
    if (!force && sig === state.planSig) return;
    state.planSig = sig;

    var plan = $("plan");
    plan.textContent = "";
    plan.appendChild(el("span", "label red", "DAY " + pad2(state.day + 1) + " / " + pad2(TRIP.days.length)));
    plan.appendChild(el("h2", "plan-title", d.title));
    plan.appendChild(el("p", "plan-sum", d.summary));
    if (d.stay) plan.appendChild(el("p", "plan-stay", "คืนนี้นอน" + d.stay));

    if (d.note) {
      var note = el("div", "note");
      note.appendChild(el("p", "note-title", d.note.title));
      note.appendChild(el("p", "note-text", d.note.text));
      plan.appendChild(note);
    }

    var list = el("ol", "items");
    d.items.forEach(function (it, idx) {
      var li = el("li", "item");
      if (idx === nextIdx) li.classList.add("is-next");
      if (nextIdx > 0 && idx < nextIdx - 1) li.classList.add("is-past");

      var time = el("span", "item-time", it.t);
      if (it.prev) time.appendChild(el("span", "item-prev", it.prev));
      li.appendChild(time);

      var body = el("div", "item-body");
      body.appendChild(el("span", "item-title", it.title));
      if (it.sub) body.appendChild(el("span", "item-sub", it.sub));

      var chips = el("div", "chips");
      if (idx === nextIdx) chips.appendChild(el("span", "chip next", "ถัดไป"));
      if (it.who && WHO[it.who]) chips.appendChild(el("span", "chip who", WHO[it.who]));
      if (it.tag) {
        var yen = yenFromTag(it.tag);
        if (yen) {
          var chipBtn = el("button", "chip", it.tag);
          chipBtn.type = "button";
          chipBtn.setAttribute("aria-label", it.tag + " แตะเพื่อดูเป็นบาท");
          (function (b, tag, y) {
            var showing = false;
            b.addEventListener("click", function () {
              showing = !showing;
              b.textContent = showing ? "≈ " + toBaht(y) : tag;
            });
          })(chipBtn, it.tag, yen);
          chips.appendChild(chipBtn);
        } else {
          chips.appendChild(el("span", "chip", it.tag));
        }
      }
      if (it.stamp && state.stamps[it.stamp]) chips.appendChild(el("span", "chip got", "เก็บตราแล้ว"));
      if (chips.childNodes.length) body.appendChild(chips);
      li.appendChild(body);

      var actions = el("div", "actions");
      if (it.map) {
        var a = el("a", "act");
        a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(it.map);
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", "เปิด " + it.title + " ใน Google Maps");
        a.appendChild(svg(ICON.pin));
        actions.appendChild(a);
      }
      if (it.stamp) {
        var sb = el("button", "act stamp-btn");
        sb.type = "button";
        sb.setAttribute("aria-pressed", state.stamps[it.stamp] ? "true" : "false");
        sb.setAttribute("aria-label", "เก็บตรา " + it.stamp);
        sb.appendChild(svg(ICON.seal));
        (function (name, b) {
          b.addEventListener("click", function () {
            toggleStamp(name, b);
            renderPlan(tokyoNow(), true);
            var again = document.querySelector('.stamp-btn[aria-label="เก็บตรา ' + name + '"]');
            if (again) {
              again.focus();
              if (state.stamps[name]) again.classList.add("pop");
            }
          });
        })(it.stamp, sb);
        actions.appendChild(sb);
      }
      li.appendChild(actions);
      list.appendChild(li);
    });
    plan.appendChild(list);
  }

  /* ======================================================
     5. show-to-staff phrases
     ====================================================== */
  var lastFocus = null;

  function onOverlayKey(e) {
    if (e.key === "Escape") closeOverlay();
  }

  function openOverlay(p) {
    lastFocus = document.activeElement;
    $("ov-ja").textContent = p.ja;
    $("ov-ro").textContent = p.ro;
    $("ov-th").textContent = p.th;
    $("overlay").hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onOverlayKey);
    $("ov-close").focus();
  }

  function closeOverlay() {
    $("overlay").hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onOverlayKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function renderPhrases() {
    var box = $("phrases");
    box.textContent = "";
    TRIP.phrases.forEach(function (p) {
      var b = el("button", "phrase");
      b.type = "button";
      var text = el("span");
      text.appendChild(el("span", "phrase-th", p.th));
      var ja = el("span", "phrase-ja", p.ja);
      ja.setAttribute("lang", "ja");
      text.appendChild(ja);
      b.appendChild(text);
      b.appendChild(svg('<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'));
      b.addEventListener("click", function () { openOverlay(p); });
      box.appendChild(b);
    });
    $("ov-close").addEventListener("click", closeOverlay);
  }

  /* ---------- checklist & emergency ---------- */
  function renderChecklist() {
    var saved = loadJSON(KEY.check);
    var ul = $("checklist");
    ul.textContent = "";
    TRIP.checklist.forEach(function (text, i) {
      var li = el("li");
      var label = el("label");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!saved[i];
      box.addEventListener("change", function () {
        saved[i] = box.checked;
        save(KEY.check, JSON.stringify(saved));
      });
      label.appendChild(box);
      label.appendChild(el("span", null, text));
      li.appendChild(label);
      ul.appendChild(li);
    });

    var em = $("emergency");
    em.textContent = "";
    TRIP.emergency.forEach(function (e) {
      var box = el("div", "sos");
      box.appendChild(el("span", "sos-num", e.num));
      box.appendChild(el("span", "sos-label", e.label));
      em.appendChild(box);
    });
  }

  /* ======================================================
     1. offline (PWA) — works on GitHub Pages / https
     ====================================================== */
  function registerSW() {
    try {
      if (!("serviceWorker" in navigator)) return;
      var ok = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if (!ok) return;
      navigator.serviceWorker.register("sw.js").catch(function () { /* not allowed here */ });
    } catch (e) { /* sandboxed preview: skip */ }
  }

  /* ---------- flow ---------- */
  function renderDynamic(force) {
    var now = tokyoNow();
    renderCountdown(now);
    renderDayButtons(now);
    renderPlan(now, force);
  }

  function selectDay(i, fromClick) {
    state.day = i;
    save(KEY.day, String(i));
    var hash = "#day-" + (i + 1);
    if (window.location.hash !== hash) {
      try { window.history.replaceState(null, "", hash); } catch (e) { window.location.hash = hash; }
    }
    renderDynamic(true);
    if (fromClick && window.matchMedia("(max-width: 959px)").matches) {
      $("plan").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initialDay() {
    var h = dayIndexFromHash();
    if (h >= 0) return h;
    var t = todayIndex(tokyoNow());
    if (t >= 0) return t;
    var saved = parseInt(load(KEY.day), 10);
    if (saved >= 0 && saved < TRIP.days.length) return saved;
    return 0;
  }

  function tick() {
    renderClock();
    applyTheme();
    renderDynamic(false);
  }

  function init() {
    document.title = TRIP.title;
    renderHero();
    renderTiles();
    initFx();
    renderPhrases();
    renderStampBook();
    renderChecklist();
    state.day = initialDay();
    $("theme-btn").addEventListener("click", cycleTheme);
    renderClock();
    applyTheme();
    renderDynamic(true);

    window.addEventListener("hashchange", function () {
      var h = dayIndexFromHash();
      if (h >= 0 && h !== state.day) { state.day = h; renderDynamic(true); }
    });

    window.setInterval(tick, 15000);
    registerSW();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
