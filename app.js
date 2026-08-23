(function () {
  const D = window.KPQ_DATA;
  const $ = (s, r) => (r || document).querySelector(s);

  const attackers = D.characters.filter((c) => c.side === "attacker" || c.side === "both");
  const defenders = D.characters.filter((c) => c.side === "defender" || c.side === "both");

  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  function pick2(arr) {
    const a = pick(arr);
    let b = pick(arr);
    let n = 0;
    while (b.id === a.id && n++ < 16) b = pick(arr);
    return [a, b];
  }

  const recent = [];
  const RECENT_MAX = 8;
  function remember(id) {
    if (!id) return;
    recent.push(id);
    while (recent.length > RECENT_MAX) recent.shift();
  }
  function pickFresh(pool, extraSkip) {
    const skip = new Set((extraSkip || []).concat(recent));
    const fresh = pool.filter((c) => !skip.has(c.id));
    return pick(fresh.length ? fresh : pool.filter((c) => !(extraSkip || []).includes(c.id)).length
      ? pool.filter((c) => !(extraSkip || []).includes(c.id))
      : pool);
  }
  function rollAw(c) {
    return Math.random() < 0.5
      ? { tier: "觉醒2", name: c.awaken2 }
      : { tier: "觉醒3", name: c.awaken3 };
  }

  function pickRoll() {
    const atk = pickFresh(attackers);
    const def = pickFresh(defenders, [atk.id]);
    const aAw = rollAw(atk);
    const dAw = rollAw(def);
    const ag = pick2(D.gadgets);
    const dg = pick2(D.gadgets);
    return {
      atk: atk, def: def, aAw: aAw, dAw: dAw,
      aSec: pick(D.secondaries), dSec: pick(D.secondaries),
      aMel: pick(D.melees), dMel: pick(D.melees),
      ag1: ag[0], ag2: ag[1], dg1: dg[0], dg2: dg[1]
    };
  }

  const wheels = {
    atkChar: { el: $("#atk-char"), pool: attackers, kind: "char" },
    defChar: { el: $("#def-char"), pool: defenders, kind: "char" },
    atkAw: { el: $("#atk-aw"), pool: [], kind: "aw" },
    defAw: { el: $("#def-aw"), pool: [], kind: "aw" },
    atkSec: { el: $("#atk-sec"), pool: D.secondaries, kind: "gear" },
    defSec: { el: $("#def-sec"), pool: D.secondaries, kind: "gear" },
    atkMel: { el: $("#atk-mel"), pool: D.melees, kind: "gear" },
    defMel: { el: $("#def-mel"), pool: D.melees, kind: "gear" },
    atkG1: { el: $("#atk-g1"), pool: D.gadgets, kind: "gear" },
    atkG2: { el: $("#atk-g2"), pool: D.gadgets, kind: "gear" },
    defG1: { el: $("#def-g1"), pool: D.gadgets, kind: "gear" },
    defG2: { el: $("#def-g2"), pool: D.gadgets, kind: "gear" }
  };

  function paintFace(el, html, title, meta) {
    const face = $(".face", el);
    if (face.innerHTML !== html) face.innerHTML = html;
    const nameEl = $(".gname", el);
    if (nameEl.textContent !== title) nameEl.textContent = title;
    const m = $(".gmeta", el);
    if (m && m.textContent !== (meta || "")) m.textContent = meta || "";
  }

  function showChar(el, c) {
    const ch = (c.name || "?").charAt(0);
    const src = c.portrait || "";
    const html = src
      ? '<img alt="" src="' + src + '">'
      : '<div class="mono">' + ch + "</div>";
    paintFace(el, html, c.name, (c.faction || "") + " · " + (c.primary || ""));
  }

  function showAw(el, aw) {
    const label = aw.tier || "觉醒2";
    const n = /3/.test(label) ? "3" : "2";
    paintFace(el, '<div class="mono aw-num">' + n + "</div>", "", "");
  }

  function showGear(el, g) {
    paintFace(el, '<div class="mono gear-txt">' + (g.name || "") + '</div>', "", "");
  }

  function renderKind(kind, el, item) {
    if (kind === "char") showChar(el, item);
    else if (kind === "aw") showAw(el, item);
    else showGear(el, item);
  }

  function preload() {
    const urls = [];
    D.characters.forEach((c) => { if (c.portrait) urls.push(c.portrait); });
    [D.secondaries, D.melees, D.gadgets].forEach((arr) => {
      arr.forEach((g) => { if (g.icon) urls.push(g.icon); });
    });
    urls.forEach((u) => { const i = new Image(); i.src = u; });
  }

  let spinning = false;
  let raf = 0;
  let lastTick = 0;
  let intervalMs = 110;
  let pending = null;
  let stopPlan = null;

  function setDialState(el, state) {
    const dial = $(".dial", el);
    dial.classList.remove("spinning", "stopping", "locking");
    if (state) dial.classList.add(state);
  }

  function startSpinVisual() {
    Object.keys(wheels).forEach((k) => setDialState(wheels[k].el, "spinning"));
  }

  function loop(ts) {
    if (!spinning && !stopPlan) return;
    if (!lastTick) lastTick = ts;
    if (ts - lastTick >= intervalMs) {
      lastTick = ts;
      Object.keys(wheels).forEach((k) => {
        const w = wheels[k];
        if (stopPlan && stopPlan.locked[k]) return;
        const pool = w.pool.length ? w.pool : [{ name: "—", portrait: "", icon: "" }];
        renderKind(w.kind, w.el, pick(pool));
      });
    }
    raf = requestAnimationFrame(loop);
  }

  function row(side, cls, name, aw, sec, mel, g1, g2) {
    return "<tr class=\"" + cls + " ready\"><td>" + side + "</td><td>" + name +
      "</td><td>" + aw + "</td><td>" + sec + "</td><td>" + mel +
      "</td><td>" + g1 + "</td><td>" + g2 + "</td></tr>";
  }

  let current = null;
  function paintResult(r) {
    current = r;
    showChar(wheels.atkChar.el, r.atk);
    showChar(wheels.defChar.el, r.def);
    showAw(wheels.atkAw.el, r.aAw);
    showAw(wheels.defAw.el, r.dAw);
    showGear(wheels.atkSec.el, r.aSec);
    showGear(wheels.defSec.el, r.dSec);
    showGear(wheels.atkMel.el, r.aMel);
    showGear(wheels.defMel.el, r.dMel);
    showGear(wheels.atkG1.el, r.ag1);
    showGear(wheels.atkG2.el, r.ag2);
    showGear(wheels.defG1.el, r.dg1);
    showGear(wheels.defG2.el, r.dg2);
    $("#result-body").innerHTML =
      row("进攻方", "atk", r.atk.name, r.aAw.tier, r.aSec.name, r.aMel.name, r.ag1.name, r.ag2.name) +
      row("防守方", "def", r.def.name, r.dAw.tier, r.dSec.name, r.dMel.name, r.dg1.name, r.dg2.name);
  }

  function lockOne(key, renderFinal) {
    const w = wheels[key];
    stopPlan.locked[key] = true;
    setDialState(w.el, "stopping");
    setTimeout(function () {
      renderFinal();
      setDialState(w.el, "locking");
      setTimeout(function () { setDialState(w.el, ""); }, 420);
    }, 280);
  }

  function idlePreview() {
    showChar(wheels.atkChar.el, pick(attackers));
    showChar(wheels.defChar.el, pick(defenders));
    showAw(wheels.atkAw.el, { tier: "觉醒2", name: "待抽取" });
    showAw(wheels.defAw.el, { tier: "觉醒3", name: "待抽取" });
    showGear(wheels.atkSec.el, D.secondaries[0]);
    showGear(wheels.defSec.el, D.secondaries[1]);
    showGear(wheels.atkMel.el, D.melees[0]);
    showGear(wheels.defMel.el, D.melees[1]);
    showGear(wheels.atkG1.el, D.gadgets[0]);
    showGear(wheels.atkG2.el, D.gadgets[1]);
    showGear(wheels.defG1.el, D.gadgets[2]);
    showGear(wheels.defG2.el, D.gadgets[3]);
  }

  const btn = $("#go");
  btn.addEventListener("click", function () {
    if (!spinning) {
      spinning = true;
      pending = pickRoll();
      wheels.atkAw.pool = [
        { tier: "觉醒2", name: pending.atk.awaken2 },
        { tier: "觉醒3", name: pending.atk.awaken3 }
      ];
      wheels.defAw.pool = [
        { tier: "觉醒2", name: pending.def.awaken2 },
        { tier: "觉醒3", name: pending.def.awaken3 }
      ];
      stopPlan = null;
      intervalMs = 110;
      lastTick = 0;
      startSpinVisual();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
      btn.textContent = "STOP";
      btn.classList.add("stop");
      $("#status").textContent = "";
      return;
    }
    const r = pending;
    spinning = false;
    stopPlan = null;
    cancelAnimationFrame(raf);
    paintResult(r);
    Object.keys(wheels).forEach(function (k) { setDialState(wheels[k].el, "locking"); });
    setTimeout(function () {
      Object.keys(wheels).forEach(function (k) { setDialState(wheels[k].el, ""); });
    }, 420);
    pending = null;
    btn.textContent = "START";
    btn.classList.remove("stop");
    remember(r.atk.id);
    remember(r.def.id);
    $("#status").textContent = "";
  });

  function swapSide(side) {
    if (spinning) return;
    if (!current) current = pickRoll();
    const other = side === "atk" ? current.def : current.atk;
    const pool = side === "atk" ? attackers : defenders;
    const next = pickFresh(pool, [current.atk.id, current.def.id, other.id]);
    if (side === "atk") {
      current.atk = next;
      current.aAw = rollAw(next);
    } else {
      current.def = next;
      current.dAw = rollAw(next);
    }
    remember(next.id);
    paintResult(current);
    const el = side === "atk" ? wheels.atkChar.el : wheels.defChar.el;
    setDialState(el, "locking");
    setTimeout(function () { setDialState(el, ""); }, 420);
  }
  $("#atk-char").addEventListener("click", function () { swapSide("atk"); });
  $("#def-char").addEventListener("click", function () { swapSide("def"); });

  preload();
  idlePreview();
  var mask = document.getElementById("help-mask");
  var closeBtn = document.getElementById("help-close");
  function hideHelp() { if (mask) mask.classList.add("off"); }
  if (closeBtn) closeBtn.addEventListener("click", hideHelp);
  if (mask) mask.addEventListener("click", function (e) { if (e.target === mask) hideHelp(); });
})();
