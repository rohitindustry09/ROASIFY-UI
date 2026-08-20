const HEADERS = [
  ["id", "Product ID"],
  ["productTitle", "Product Title"],
  ["variantTitle", "Variant Title"],
  ["metaSpend", "Meta Spend"],
  ["googleCost", "Google Cost"],
  ["totalSpend", "Total Spend"],
  ["revenue", "Revenue"],
  ["roi", "ROI"],
  ["items", "Items Sold"],
  ["ctr", "CTR"],
  ["cpm", "CPM"],
  ["quadrant", "Quadrant"],
];

export function rowsToCSV(rows) {
  const lines = [HEADERS.map(([, label]) => label).join(",")];
  rows.forEach((r) => {
    const line = HEADERS.map(([key]) => {
      const v = r[key];
      if (key === "productTitle" || key === "variantTitle") return `"${String(v ?? "").replace(/"/g, '""')}"`;
      if (key === "roi") return v === Infinity ? "inf" : v;
      return v;
    });
    lines.push(line.join(","));
  });
  return lines.join("\n");
}

export function downloadRowsAsCSV(rows, filename) {
  const blob = new Blob([rowsToCSV(rows)], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".csv") ? filename : filename + ".csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
