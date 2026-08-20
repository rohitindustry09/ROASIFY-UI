import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import UploadCard from "../components/UploadCard";
import SummaryCards from "../components/SummaryCards";
import TopPerformers from "../components/TopPerformers";
import ProductTable from "../components/ProductTable";
import { useData } from "../state/DataContext";
import { requiredFragmentsFor } from "../lib/merge";
import { fmtNum } from "../lib/format";
import { downloadRowsAsCSV } from "../lib/csv";
import { PlayIcon, ArrowRightIcon, PanelIcon, XIcon } from "../components/Icons";

const SOURCES = [
  {
    key: "meta",
    name: "Meta Ads",
    required: true,
    fieldsLabel: "Product ID · Month · Amount Spent · Landing Page Views · CTR · CPM",
  },
  {
    key: "shopify",
    name: "Shopify",
    required: true,
    fieldsLabel: "Product Variant ID · Product Title · Month · Total Sales · Net Items Sold",
  },
  {
    key: "google",
    name: "Google Ads",
    required: false,
    fieldsLabel: "Item ID · Product Title · Month · Cost · Conversions",
  },
];

export default function ProductAnalysis() {
  const { sources, setFile, clearFile, merged, runMergeNow, canMerge, runMeta } = useData();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const filesLoadedCount = ["meta", "shopify", "google"].filter((k) => sources[k]).length;

  return (
    <div className="main">
      <Topbar
        crumbs={["Product Analysis", "Overall View"]}
        exportDisabled={!merged}
        onExport={() => merged && downloadRowsAsCSV(merged.rows, `roasify_overall_${runMeta?.runId || "export"}`)}
      />
      <div className="content">
        <h1>Product Analysis</h1>
        <p className="sub">Merge Meta Ads, Shopify, and Google Ads into one product-level performance table.</p>

        <div className="upload-grid">
          {SOURCES.map((s) => (
            <UploadCard
              key={s.key}
              source={s.key}
              name={s.name}
              required={s.required}
              fieldsLabel={s.fieldsLabel}
              requiredFragments={requiredFragmentsFor(s.key)}
              fileInfo={sources[s.key]}
              onLoaded={(info) => setFile(s.key, info)}
              onRemove={() => clearFile(s.key)}
            />
          ))}
        </div>

        <div className="merge-bar">
          <div>
            <b>{filesLoadedCount} file{filesLoadedCount === 1 ? "" : "s"}</b> loaded —{" "}
            {canMerge ? "ready to merge" : "upload Meta Ads and Shopify to enable merge"}
          </div>
          <button className="btn-merge" disabled={!canMerge} onClick={runMergeNow}>
            <PlayIcon /> Merge &amp; Analyse
          </button>
        </div>

        {merged && runMeta && (
          <div className="success-banner">
            <span>
              ✓ Data merged · {fmtNum(merged.totals.products)} products · 3 months
            </span>
            <span className="run-id" style={{ cursor: "pointer" }} onClick={() => setDrawerOpen(true)}>
              {runMeta.runId} <PanelIcon />
            </span>
          </div>
        )}

        {!merged && (
          <div className="empty-state" style={{ marginTop: 30 }}>
            <h3>No merged data yet</h3>
            <div>Upload your Meta Ads and Shopify exports above, then click Merge &amp; Analyse.</div>
          </div>
        )}

        {merged && (
          <>
            <SummaryCards totals={merged.totals} />

            <div className="section-title">
              Top performers in this view
              <span className="chiprow">
                <span className="chip">{fmtNum(merged.totals.products)} products</span>
                <span className="chip">all months</span>
              </span>
            </div>
            <TopPerformers rows={merged.rows} />
            <div className="sub" style={{ marginTop: 6 }}>Highest ROI · Total spend &gt; ₹1</div>

            <div className="section-title" style={{ marginTop: 30 }}>Product table</div>
            <ProductTable rows={merged.rows} filename={`roasify_overall_${runMeta.runId}`} />

            <div
              className="next-card"
              style={{ marginTop: 20 }}
              onClick={() => navigate("/quadrant-view")}
            >
              <div>
                <div className="nt">Continue to Quadrant View</div>
                <div className="nd">Classify these {fmtNum(merged.totals.products)} products into Champions, Contenders, Cruisers, Casualties.</div>
              </div>
              <ArrowRightIcon />
            </div>

            <div className="methodology">
              <b>Methodology</b> — ROI = Shopify Revenue ÷ Total Spend (Total Spend = Meta Spend + Google Cost). All months in your uploads are summed per product variant before this ratio is taken. Products are matched across platforms using the numeric Shopify variant ID: extracted from the prefix of Meta's "Product ID" field, and from Google's "Item ID" field (either a bare variant ID, or the trailing number in <code>shopify_&lt;region&gt;_&lt;productId&gt;_&lt;variantId&gt;</code>). CTR/CPM are re-derived from estimated impressions (spend ÷ CPM × 1000) rather than simple-averaged across months.
            </div>
          </>
        )}
      </div>

      {drawerOpen && merged && (
        <div className="drawer">
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}><XIcon /></button>
          <h4>Run details</h4>
          <div className="drawer-row"><span>Run ID</span><b>{runMeta.runId}</b></div>
          <div className="drawer-row"><span>Products</span><b>{fmtNum(merged.totals.products)}</b></div>
          <div className="drawer-row"><span>Sources</span><b>{filesLoadedCount} files</b></div>
          <div className="drawer-section">
            <h4>Sources merged</h4>
            {sources.meta && <div className="drawer-row"><span>Meta Ads</span><b>{fmtNum(sources.meta.rowCount)} rows</b></div>}
            {sources.shopify && <div className="drawer-row"><span>Shopify</span><b>{fmtNum(sources.shopify.rowCount)} rows</b></div>}
            {sources.google && <div className="drawer-row"><span>Google Ads</span><b>{fmtNum(sources.google.rowCount)} rows</b></div>}
          </div>
          <div className="drawer-section">
            <h4>Averages per product</h4>
            <div className="drawer-row"><span>Avg Total Spend</span><b>₹{Math.round(merged.spendThreshold).toLocaleString("en-IN")}</b></div>
            <div className="drawer-row"><span>Avg Revenue</span><b>₹{Math.round(merged.revenueThreshold).toLocaleString("en-IN")}</b></div>
            <div className="drawer-row"><span>Avg ROI</span><b>{merged.totals.roi.toFixed(1)}x</b></div>
          </div>
          <div className="drawer-section">
            <h4>Methodology</h4>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6 }}>
              ROI = Shopify Revenue ÷ Total Spend. Multi-month data is summed per product ID before this ratio is taken.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
