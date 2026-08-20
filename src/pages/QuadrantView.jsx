import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import ProductTable from "../components/ProductTable";
import ScaleSpendModal from "../components/ScaleSpendModal";
import { useData } from "../state/DataContext";
import { quadrantSummary } from "../lib/merge";
import { fmtINR, fmtNum, fmtROI } from "../lib/format";
import { StarIcon, DiamondIcon, CircleIcon, AlertIcon, ArrowRightIcon, SparkleIcon, DownloadIcon } from "../components/Icons";
import { downloadRowsAsCSV } from "../lib/csv";

const QDEF = {
  champions: { name: "Champions", desc: "High revenue · Low spend", badge: ["Scale", "badge-scale"], icon: StarIcon },
  contenders: { name: "Contenders", desc: "High revenue · High spend", badge: ["Protect", "badge-protect"], icon: DiamondIcon },
  cruisers: { name: "Cruisers", desc: "Low revenue · Low spend", badge: ["Decide", "badge-decide"], icon: CircleIcon },
  casualties: { name: "Casualties", desc: "Low revenue · High spend", badge: ["Cut", "badge-cut"], icon: AlertIcon },
};

function buildRecommendation(key, s) {
  if (s.products === 0) return `No products fall into ${QDEF[key].name} in this dataset.`;
  const roiTxt = fmtROI(s.roi);
  if (key === "champions") {
    return `${fmtNum(s.products)} products return ${roiTxt} on just ${fmtINR(s.spend)} of spend. Most of this bucket has little or no tracked ad spend behind it — that's real signal to increase budget deliberately on the ones that do show spend, and to feed the top titles into creative testing on other channels.`;
  }
  if (key === "contenders") {
    return `${fmtNum(s.products)} products are already carrying real budget (${fmtINR(s.spend)}) at a healthy ${roiTxt} return. Protect these — they're your reliable revenue engine. Watch for CPM creep; if efficiency drops here it hits total revenue the hardest.`;
  }
  if (key === "cruisers") {
    return `${fmtNum(s.products)} products sit in low-stakes territory: not much spend, not much revenue. Revenue nets to ${fmtINR(s.revenue)} — decide per-SKU whether to test a small budget bump or deprioritize inventory here rather than spending analysis time on the whole bucket.`;
  }
  return `${fmtNum(s.products)} products are absorbing ${fmtINR(s.spend)} of spend while returning ${fmtINR(s.revenue)} in revenue (${roiTxt}). This is where wasted budget usually hides — pause or re-target the worst offenders first (sort this quadrant by ROI ascending in the table).`;
}

export default function QuadrantView() {
  const { merged } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [aiRun, setAiRun] = useState(false);
  const [jumpQuadrant, setJumpQuadrant] = useState(null);
  const navigate = useNavigate();

  const quads = useMemo(() => (merged ? quadrantSummary(merged.rows) : null), [merged]);

  if (!merged) {
    return (
      <div className="main">
        <Topbar crumbs={["Quadrant View", "4C Framework"]} exportDisabled />
        <div className="content">
          <h1>Quadrant View — 4C Framework</h1>
          <p className="sub">Classify products into Champions, Contenders, Cruisers, Casualties based on spend and revenue.</p>
          <div className="empty-state">
            <h3>Nothing to classify yet</h3>
            <div>Head to Product Analysis, upload your files, and run Merge &amp; Analyse first.</div>
            <button className="btn-primary" style={{ margin: "18px auto 0" }} onClick={() => navigate("/product-analysis")}>
              Go to Product Analysis <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const champBucket = quads.champions;
  const champWithSpend = champBucket.rows.filter((r) => r.totalSpend > 0);
  const topChamps = champWithSpend
    .slice()
    .sort((a, b) => (b.roi === Infinity ? 1e18 : b.roi) - (a.roi === Infinity ? 1e18 : a.roi))
    .slice(0, 3);
  const estAdditional = champWithSpend.reduce((acc, r) => acc + r.revenue * 0.275, 0);

  return (
    <div className="main">
      <Topbar
        crumbs={["Quadrant View", "4C Framework"]}
        exportDisabled={false}
        onExport={() => downloadRowsAsCSV(merged.rows, "roasify_quadrants")}
      />
      <div className="content">
        <h1>Quadrant View — 4C Framework</h1>
        <p className="sub">Classify products into Champions, Contenders, Cruisers, Casualties based on spend and revenue.</p>

        <div className="info-bar">
          <div><span className="dot" />{fmtNum(merged.totals.products)} products · all uploaded months · thresholds {fmtINR(merged.spendThreshold)} spend / {fmtINR(merged.revenueThreshold)} rev</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span className="link-btn" onClick={() => downloadRowsAsCSV(merged.rows, "roasify_quadrants")}>Download all ↓</span>
            <span className="link-btn" onClick={() => navigate("/product-analysis")}>View source dataset →</span>
          </div>
        </div>

        <div className="cards quad4">
          <div className="card"><div className="lbl">Total Products</div><div className="val">{fmtNum(merged.totals.products)}</div></div>
          <div className="card"><div className="lbl">Total Spend</div><div className="val">{fmtINR(merged.totals.totalSpend)}</div></div>
          <div className="card"><div className="lbl">Total Revenue</div><div className="val">{fmtINR(merged.totals.revenue)}</div></div>
          <div className="card"><div className="lbl">Overall ROI</div><div className="val roi">{fmtROI(merged.totals.roi)}</div></div>
        </div>

        <div className="quad-hero">
          <span className="tag"><StarIcon /> Where to act first · Scale</span>
          <h3>
            <span className="n">{fmtNum(champWithSpend.length)} Champions</span> with measurable spend return{" "}
            <span className="n">{champWithSpend.length ? fmtROI(champWithSpend.reduce((a, r) => a + r.revenue, 0) / champWithSpend.reduce((a, r) => a + r.totalSpend, 0)) : "—"}</span>{" "}
            on {fmtINR(champWithSpend.reduce((a, r) => a + r.totalSpend, 0))} total spend.
          </h3>
          {topChamps.length > 0 && (
            <div className="top3">
              {topChamps.map((r) => (
                <div className="top-card" key={r.id}>
                  <div className="roi">{fmtROI(r.roi)}</div>
                  <div className="ttitle">{r.productTitle} — {r.variantTitle || "—"}</div>
                  <div className="meta">Spend {fmtINR(r.totalSpend)} · Revenue {fmtINR(r.revenue)}</div>
                </div>
              ))}
            </div>
          )}
          <div className="footer">
            <div className="sub" style={{ margin: 0 }}>Estimated additional revenue at +50% spend: {fmtINR(estAdditional)}</div>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>Create scale-spend plan <ArrowRightIcon /></button>
          </div>
        </div>

        <div className="quad-grid">
          {["champions", "contenders", "cruisers", "casualties"].map((key) => {
            const def = QDEF[key];
            const s = quads[key];
            const Icon = def.icon;
            return (
              <div className={"quad-card " + key} key={key} onClick={() => setJumpQuadrant(key)}>
                <div className="qhead">
                  <div className="qhead-l"><Icon /><span className="qname">{def.name}</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className={"qbadge " + def.badge[1]}>{def.badge[0]}</span>
                    <button
                      className="icon-btn"
                      title={`Download ${def.name}`}
                      onClick={(e) => { e.stopPropagation(); downloadRowsAsCSV(s.rows, `roasify_${key}`); }}
                    >
                      <DownloadIcon />
                    </button>
                  </div>
                </div>
                <div className="qdesc">{def.desc}</div>
                <div className="qstats">
                  <div><div className="l">Products</div><div className="v">{fmtNum(s.products)}</div></div>
                  <div><div className="l">Spend</div><div className="v">{fmtINR(s.spend)}</div></div>
                  <div><div className="l">Revenue</div><div className="v">{fmtINR(s.revenue)}</div></div>
                  <div><div className="l">ROI</div><div className="v" style={{ color: s.roi >= 0 ? "var(--green)" : "var(--red)" }}>{fmtROI(s.roi)}</div></div>
                </div>
                <div className="view-link">View all {fmtNum(s.products)} products ↓</div>
              </div>
            );
          })}
        </div>

        <div className="ai-panel">
          <div className="ai-panel-head">
            <div>
              <div className="ptitle">Per-quadrant recommendations</div>
              <div className="psub">{aiRun ? "Generated locally from your merged data" : "Not yet run"}</div>
            </div>
            <button className="btn-ai" onClick={() => setAiRun(true)}><SparkleIcon /> Generate Analysis</button>
          </div>
          {!aiRun ? (
            <div className="ai-empty">Click Generate Analysis to produce specific actions for each quadrant.<br />Recommendations reference the exact products and ₹ figures in your data.</div>
          ) : (
            <div>
              {["champions", "contenders", "cruisers", "casualties"].map((key) => (
                <div className="ai-rec" key={key}>
                  <b>{QDEF[key].name}.</b> {buildRecommendation(key, quads[key])}
                </div>
              ))}
              <div className="sub" style={{ marginTop: 12, fontSize: 11.5 }}>
                Generated with simple rules from your own totals — not a hosted LLM call (this rebuild runs entirely client-side, with no API keys).
              </div>
            </div>
          )}
        </div>

        {jumpQuadrant && (
          <div style={{ marginTop: 30 }}>
            <div className="section-title">{QDEF[jumpQuadrant].name} — full list</div>
            <ProductTable
              rows={merged.rows}
              defaultQuadrant={jumpQuadrant}
              filename={`roasify_${jumpQuadrant}`}
              showColumnsPanel={false}
            />
          </div>
        )}
      </div>

      {modalOpen && <ScaleSpendModal champions={champBucket.rows} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
