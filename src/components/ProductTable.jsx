import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { fmtINR, fmtNum, fmtROI, fmtPct } from "../lib/format";
import { ChevronDownIcon, DownloadIcon } from "./Icons";

const QNAMES = { champions: "Champions", contenders: "Contenders", cruisers: "Cruisers", casualties: "Casualties" };

const ALL_COLUMNS = [
  { key: "id", label: "Product ID", src: null, sortable: true },
  { key: "productTitle", label: "Product Title", src: "Shopify", sortable: true },
  { key: "variantTitle", label: "Variant", src: "Shopify", sortable: true },
  { key: "metaSpend", label: "Meta Spend", src: "Meta", sortable: true },
  { key: "totalSpend", label: "Total Spend", src: "Derived", sortable: true },
  { key: "revenue", label: "Revenue", src: "Shopify", sortable: true },
  { key: "roi", label: "ROI", src: "Derived", sortable: true },
  { key: "items", label: "Items Sold", src: "Shopify", sortable: true },
  { key: "ctr", label: "CTR", src: "Meta", sortable: true },
  { key: "cpm", label: "CPM", src: "Meta", sortable: true },
];
const DEFAULT_VISIBLE = ALL_COLUMNS.map((c) => c.key);
const PAGE_SIZE = 25;

function roiNumeric(v) {
  return v === Infinity ? Number.POSITIVE_INFINITY : v || 0;
}

export default function ProductTable({ rows, defaultQuadrant = "ALL", filename = "roasify_export", showColumnsPanel = true }) {
  const [search, setSearch] = useState("");
  const [quadFilter, setQuadFilter] = useState(defaultQuadrant);
  const [sortCol, setSortCol] = useState("totalSpend");
  const [sortDir, setSortDir] = useState(-1);
  const [page, setPage] = useState(1);
  const [visibleCols, setVisibleCols] = useState(DEFAULT_VISIBLE);
  const [fname, setFname] = useState(filename);

  const chipWrapRef = useRef(null);
  const chipRefs = useRef({});
  const [chipIndicator, setChipIndicator] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const el = chipRefs.current[quadFilter];
    const parent = chipWrapRef.current;
    if (el && parent) {
      const pRect = parent.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setChipIndicator({ left: eRect.left - pRect.left, width: eRect.width, ready: true });
    }
  }, [quadFilter, rows]);

  const filtered = useMemo(() => {
    let out = rows;
    if (quadFilter !== "ALL") out = out.filter((r) => r.quadrant === quadFilter);
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.id.toLowerCase().includes(s) ||
          r.productTitle.toLowerCase().includes(s) ||
          r.variantTitle.toLowerCase().includes(s)
      );
    }
    const dir = sortDir;
    const arr = [...out].sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
      if (sortCol === "roi") { av = roiNumeric(av); bv = roiNumeric(bv); }
      if (typeof av === "string") return dir * av.localeCompare(bv);
      return dir * ((av || 0) - (bv || 0));
    });
    return arr;
  }, [rows, quadFilter, search, sortCol, sortDir]);

  const totals = useMemo(() => {
    const t = filtered.reduce(
      (acc, r) => {
        acc.metaSpend += r.metaSpend;
        acc.totalSpend += r.totalSpend;
        acc.revenue += r.revenue;
        acc.items += r.items;
        acc.ctrSum += r.ctr;
        acc.cpmSum += r.cpm;
        return acc;
      },
      { metaSpend: 0, totalSpend: 0, revenue: 0, items: 0, ctrSum: 0, cpmSum: 0 }
    );
    t.roi = t.totalSpend > 0 ? t.revenue / t.totalSpend : 0;
    t.avgCtr = filtered.length ? t.ctrSum / filtered.length : 0;
    t.avgCpm = filtered.length ? t.cpmSum / filtered.length : 0;
    return t;
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  function sortBy(col) {
    if (sortCol === col) setSortDir((d) => -d);
    else { setSortCol(col); setSortDir(-1); }
  }

  function toggleCol(key) {
    setVisibleCols((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function downloadCSV() {
    const cols = ALL_COLUMNS.filter((c) => visibleCols.includes(c.key));
    const headers = cols.map((c) => c.label);
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      const row = cols.map((c) => {
        const v = r[c.key];
        if (c.key === "productTitle") return `"${String(v).replace(/"/g, '""')}"`;
        if (c.key === "roi") return v === Infinity ? "inf" : v;
        return v;
      });
      lines.push(row.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fname.endsWith(".csv") ? fname : fname + ".csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const pageNums = useMemo(() => {
    const set = new Set([1, 2, totalPages - 1, totalPages, curPage - 1, curPage, curPage + 1].filter((p) => p >= 1 && p <= totalPages));
    return [...set].sort((a, b) => a - b);
  }, [curPage, totalPages]);

  return (
    <div>
      {showColumnsPanel && (
        <div className="panel">
          <div className="panel-head">
            <div className="ptitle">Columns &amp; filters</div>
            <div className="reset-link" onClick={() => setVisibleCols(DEFAULT_VISIBLE)}>Reset to default</div>
          </div>
          <div className="colchips">
            {ALL_COLUMNS.map((c) => (
              <div className="colchip" key={c.key} style={{ opacity: visibleCols.includes(c.key) ? 1 : 0.4 }}>
                {c.label}
                {c.src && <span className="src">{c.src}</span>}
                <button onClick={() => toggleCol(c.key)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="totals-strip">
        <div className="t"><div className="l">Products</div><div className="v">{fmtNum(filtered.length)}</div></div>
        <div className="t"><div className="l">Meta Spend</div><div className="v">{fmtINR(totals.metaSpend, { compact: true })}</div></div>
        <div className="t"><div className="l">Total Spend</div><div className="v">{fmtINR(totals.totalSpend, { compact: true })}</div></div>
        <div className="t"><div className="l">Revenue</div><div className="v">{fmtINR(totals.revenue, { compact: true })}</div></div>
        <div className="t"><div className="l">ROI</div><div className="v" style={{ color: "var(--indigo)" }}>{fmtROI(totals.roi)}</div></div>
        <div className="t"><div className="l">Items Sold</div><div className="v">{fmtNum(totals.items)}</div></div>
        <div className="t"><div className="l">Avg CTR</div><div className="v">{fmtPct(totals.avgCtr)}</div></div>
        <div className="t"><div className="l">Avg CPM</div><div className="v">{fmtINR(totals.avgCpm)}</div></div>
        <div className="t"><div className="l">Quadrant</div><div className="v" style={{ fontSize: 12 }}>{quadFilter === "ALL" ? "All" : QNAMES[quadFilter]}</div></div>
      </div>

      <div className="toolbar">
        <input
          className="search"
          placeholder="Search by product ID, title, or variant..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <div className="chip-wrap" ref={chipWrapRef}>
          {chipIndicator.ready && (
            <div
              className="chip-indicator"
              style={{ transform: `translateX(${chipIndicator.left}px)`, width: chipIndicator.width }}
            />
          )}
          {["ALL", "champions", "contenders", "cruisers", "casualties"].map((q) => (
            <span
              key={q}
              ref={(el) => (chipRefs.current[q] = el)}
              className={"filter-chip" + (quadFilter === q ? " active" : "")}
              onClick={() => { setQuadFilter(q); setPage(1); }}
            >
              {q === "ALL" ? "All" : QNAMES[q]}
            </span>
          ))}
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {ALL_COLUMNS.filter((c) => visibleCols.includes(c.key)).map((c) => (
                <th key={c.key} onClick={() => c.sortable && sortBy(c.key)}>
                  {c.label}
                  {sortCol === c.key && <span className="arrow">{sortDir === 1 ? "▲" : "▼"}</span>}
                </th>
              ))}
              <th>Quadrant</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => {
              const roiNum = roiNumeric(r.roi);
              const roiClass = roiNum >= 1 ? "roi-pos" : "roi-neg";
              return (
                <tr key={r.id}>
                  {visibleCols.includes("id") && <td className="mono">{r.id}</td>}
                  {visibleCols.includes("productTitle") && (
                    <td className="ttl-cell" title={r.productTitle}>{r.productTitle}</td>
                  )}
                  {visibleCols.includes("variantTitle") && <td>{r.variantTitle || "—"}</td>}
                  {visibleCols.includes("metaSpend") && <td className="mono">{fmtINR(r.metaSpend)}</td>}
                  {visibleCols.includes("totalSpend") && <td className="mono">{fmtINR(r.totalSpend)}</td>}
                  {visibleCols.includes("revenue") && <td className="mono">{fmtINR(r.revenue)}</td>}
                  {visibleCols.includes("roi") && <td className={"mono " + roiClass}>{fmtROI(r.roi)}</td>}
                  {visibleCols.includes("items") && <td className="mono">{fmtNum(r.items)}</td>}
                  {visibleCols.includes("ctr") && <td className="mono">{fmtPct(r.ctr)}</td>}
                  {visibleCols.includes("cpm") && <td className="mono">{fmtINR(r.cpm)}</td>}
                  <td><span className={"qtag " + r.quadrant}>{QNAMES[r.quadrant]}</span></td>
                </tr>
              );
            })}
            {pageRows.length === 0 && (
              <tr><td colSpan={11} style={{ textAlign: "center", padding: 30, color: "var(--text-dim)" }}>No products match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <div>
          Showing {filtered.length === 0 ? 0 : (curPage - 1) * PAGE_SIZE + 1}–{Math.min(curPage * PAGE_SIZE, filtered.length)} of {fmtNum(filtered.length)}
        </div>
        <div className="pbtns">
          <button disabled={curPage <= 1} onClick={() => setPage(1)}>«</button>
          <button disabled={curPage <= 1} onClick={() => setPage(curPage - 1)}>‹</button>
          {pageNums.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && pageNums[i - 1] < p - 1 && <span style={{ padding: "0 4px" }}>…</span>}
              <button className={p === curPage ? "cur" : ""} onClick={() => setPage(p)}>{p}</button>
            </React.Fragment>
          ))}
          <button disabled={curPage >= totalPages} onClick={() => setPage(curPage + 1)}>›</button>
          <button disabled={curPage >= totalPages} onClick={() => setPage(totalPages)}>»</button>
        </div>
      </div>

      <div className="export-row">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input className="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
          <button className="btn-primary" onClick={downloadCSV}><DownloadIcon /> Download CSV ({fmtNum(filtered.length)})</button>
        </div>
      </div>
    </div>
  );
}
