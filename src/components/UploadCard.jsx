import React, { useRef, useState } from "react";
import { CheckIcon, RefreshIcon, XIcon } from "./Icons";
import { fmtBytes } from "../lib/format";
import { parseSourceFile } from "../lib/fileParse";

const ICON_LETTER = { meta: "M", shopify: "S", google: "G" };

export default function UploadCard({
  source,
  name,
  required,
  fieldsLabel,
  requiredFragments,
  fileInfo,
  onLoaded,
  onRemove,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(file) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const rows = await parseSourceFile(file, requiredFragments);
      if (!rows.length) throw new Error("No data rows found in this file.");
      onLoaded({ name: file.name, size: file.size, rows });
    } catch (e) {
      setError(e.message || "Couldn't read this file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={"upload-card" + (fileInfo ? " filled" : "")}>
      {fileInfo && (
        <button className="close-x" onClick={onRemove} title="Remove file">
          <XIcon />
        </button>
      )}
      <div className="uh">
        <div className={"src-icon " + source}>{ICON_LETTER[source]}</div>
        <div>
          <div className="name">
            {name}
            {required ? <span className="badge-req">Required</span> : <span className="badge-opt">Optional</span>}
          </div>
          <div className="fields">{fieldsLabel}</div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls,.txt"
        style={{ display: "none" }}
        onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }}
      />

      {fileInfo ? (
        <div className="file-chip">
          <div className="fc-left">
            <span className="fc-check"><CheckIcon /></span>
            <div style={{ minWidth: 0 }}>
              <div className="fc-name">{fileInfo.name}</div>
              <div className="fc-meta">
                {fmtBytes(fileInfo.size)} · {fileInfo.rowCount.toLocaleString("en-IN")} rows — stored, no re-upload needed
              </div>
            </div>
          </div>
          <div className="fc-actions">
            <button className="icon-btn" title="Re-upload" onClick={() => inputRef.current?.click()}>
              <RefreshIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={"dropzone" + (dragOver ? " dragover" : "")}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            handleFile(f);
          }}
        >
          <div className="dz-main">{busy ? "Reading file…" : "Drop CSV or Excel here"}</div>
          <div className="dz-sub">or click to browse · max 50 MB</div>
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}
