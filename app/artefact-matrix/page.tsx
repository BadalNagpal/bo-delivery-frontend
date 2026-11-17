"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Database, FileText, Terminal } from "lucide-react";

type EngineKey = "postgres" | "oracle" | "db2";

interface ArtefactRule {
  enabled: boolean;
  note?: string;
}

interface ArtefactItem {
  id: number;
  icon: string;
  title: string;
  code: string;
  config: Record<EngineKey, ArtefactRule>;
}

const ARTEFACT_CONFIG: Record<number, Record<EngineKey, ArtefactRule>> = {
  1: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  2: {
    postgres: { enabled: true },
    oracle: { enabled: false, note: "Not applicable for Oracle Database" },
    db2: { enabled: true },
  },
  3: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  4: {
    postgres: { enabled: true },
    oracle: { enabled: false, note: "Not applicable for Oracle" },
    db2: { enabled: false, note: "Not applicable for Db2" },
  },
  5: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  13: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  14: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  6: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  7: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  8: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: true },
  },
  9: {
    postgres: { enabled: true },
    oracle: { enabled: true },
    db2: { enabled: false, note: "Not applicable for Db2 (uses TargetDB_FunctionDB2)" },
  },
  10: {
    postgres: { enabled: false, note: "Not applicable for PostgreSQL" },
    oracle: { enabled: false, note: "Not applicable for Oracle" },
    db2: { enabled: true },
  },
  11: {
    postgres: { enabled: false, note: "Not applicable for PostgreSQL (uses logical replication)" },
    oracle: { enabled: true },
    db2: { enabled: false, note: "Not applicable for Db2" },
  },
  12: {
    postgres: { enabled: false, note: "Not applicable for PostgreSQL (no NOLOGGING syntax)" },
    oracle: { enabled: true },
    db2: { enabled: false, note: "Not applicable for Db2" },
  },
};

const ARTEFACT_ITEMS: ArtefactItem[] = [
  {
    id: 1,
    icon: "table_chart",
    title: "BO Table DDLs",
    code: "TargetDB_BO_DDL",
    config: ARTEFACT_CONFIG[1],
  },
  {
    id: 2,
    icon: "category",
    title: "Composite Row Types",
    code: "TargetDB_TYPE",
    config: ARTEFACT_CONFIG[2],
  },
  {
    id: 3,
    icon: "code",
    title: "Stored Procedures",
    code: "TargetDB_Procedure / TargetDB_EXTPROC",
    config: ARTEFACT_CONFIG[3],
  },
  {
    id: 4,
    icon: "splitscreen",
    title: "Batch Chunking Procedures",
    code: "TargetDB_Clearvars, TargetDB_Check_Null...",
    config: ARTEFACT_CONFIG[4],
  },
  {
    id: 5,
    icon: "format_list_numbered",
    title: "Driver Table & Sequences",
    code: "TargetDB_BI_DRIVER",
    config: ARTEFACT_CONFIG[5],
  },
  {
    id: 13,
    icon: "key",
    title: "Static & System Codes",
    code: "TargetDB_BI_STATIC_SQL",
    config: ARTEFACT_CONFIG[13],
  },
  {
    id: 14,
    icon: "list_alt",
    title: "Indexes",
    code: "TargetDB_IDX",
    config: ARTEFACT_CONFIG[14],
  },
  {
    id: 6,
    icon: "view_quilt",
    title: "Driver Master Views",
    code: "TargetDB_DRVVIEW_DDL",
    config: ARTEFACT_CONFIG[6],
  },
  {
    id: 7,
    icon: "bolt",
    title: "Source Triggers",
    code: "SourceDB_TRG_DDL & TargetDB_TRG_UPDT",
    config: ARTEFACT_CONFIG[7],
  },
  {
    id: 8,
    icon: "table_rows",
    title: "RowToCol Aggregation",
    code: "SourceDB_RowToColFun",
    config: ARTEFACT_CONFIG[8],
  },
  {
    id: 9,
    icon: "functions",
    title: "Reference & Source Functions",
    code: "TargetDB_Function",
    config: ARTEFACT_CONFIG[9],
  },
  {
    id: 10,
    icon: "terminal",
    title: "Db2 Reference Functions",
    code: "TargetDB_FunctionDB2",
    config: ARTEFACT_CONFIG[10],
  },
  {
    id: 11,
    icon: "visibility",
    title: "Materialized Views & Logs",
    code: "SourceDB_MVLOG_DDL & TargetDB_MV_DDL",
    config: ARTEFACT_CONFIG[11],
  },
  {
    id: 12,
    icon: "speed",
    title: "Table Logging Optimizations",
    code: "TargetDB_OTH & TargetDB_TBLlog",
    config: ARTEFACT_CONFIG[12],
  },
];

export default function ArtefactMatrix() {
  const [currentEngine, setCurrentEngine] = useState<EngineKey>("postgres");
  const [userSelections, setUserSelections] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    ARTEFACT_ITEMS.forEach((item) => {
      if (item.config.postgres.enabled) {
        initial[item.id] = true;
      }
    });
    return initial;
  });

  const handleEngineChange = (engine: EngineKey) => {
    if (engine === currentEngine) return;
    setCurrentEngine(engine);
    setUserSelections((prev) => {
      const updated = { ...prev };
      ARTEFACT_ITEMS.forEach((item) => {
        if (item.config[engine].enabled) {
          updated[item.id] = true;
        }
      });
      return updated;
    });
  };

  const toggleArtefact = (id: number) => {
    const rule = ARTEFACT_CONFIG[id][currentEngine];
    if (!rule.enabled) return;
    setUserSelections((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false,
    }));
  };

  const enabledItems = ARTEFACT_ITEMS.filter((item) => item.config[currentEngine].enabled);
  const selectedCount = enabledItems.filter((item) => userSelections[item.id] !== false).length;
  const totalEnabled = enabledItems.length;

  const toggleAll = () => {
    const shouldSelectAll = selectedCount < totalEnabled;
    setUserSelections((prev) => {
      const updated = { ...prev };
      enabledItems.forEach((item) => {
        updated[item.id] = shouldSelectAll;
      });
      return updated;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-space-lg w-full max-w-6xl mx-auto">
          {/* Top Flow Banner Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-fixed/40 via-surface-container-low to-primary-fixed/20 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-8 left-1/3 w-48 h-48 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-3 max-w-xl">
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Configure Target &amp; SQL Artefacts
              </h1>
            </div>

            {/* Right 3D/Isometric Style SQL Decorative Canvas */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-full md:w-72 h-44">
              <div className="relative flex items-center justify-center">
                {/* Database Disks Visual */}
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-9 rounded-full bg-gradient-to-b from-primary-fixed to-primary-container flex items-center justify-center shadow-md">
                    <div className="w-20 h-6 rounded-full bg-primary-container/80 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary text-[16px]">database</span>
                    </div>
                  </div>
                  <div className="-mt-3 w-24 h-9 rounded-full bg-gradient-to-b from-primary-container to-tertiary flex items-center justify-center shadow-md">
                    <div className="w-20 h-6 rounded-full bg-primary-container/90"></div>
                  </div>
                  <div className="-mt-3 w-24 h-9 rounded-full bg-gradient-to-b from-tertiary to-on-primary-container flex items-center justify-center shadow-lg">
                    <div className="w-20 h-6 rounded-full bg-tertiary"></div>
                  </div>
                </div>
                {/* Floating Script Card Left */}
                <div className="absolute -left-6 top-2 bg-surface-container-lowest rounded-lg p-2.5 shadow-md flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">article</span>
                  <div className="flex flex-col gap-1 w-12">
                    <div className="h-1 bg-surface-container-high rounded-full w-full"></div>
                    <div className="h-1 bg-primary-fixed rounded-full w-3/4"></div>
                  </div>
                </div>
                {/* Floating Code Badge Right */}
                <div className="absolute -right-6 bottom-3 bg-surface-container-lowest rounded-lg p-2.5 shadow-md flex items-center gap-1.5 transform rotate-6 hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-[20px]">terminal</span>
                  <span className="font-code-sm text-code-sm text-on-surface font-semibold">.sql</span>
                </div>
                {/* Sparkle accent */}
                <div className="absolute top-0 right-4 text-primary-container animate-pulse">
                  <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Database Engine Section */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Target Database Engine
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md" id="engine-selector">
              {/* 1. PostgreSQL */}
              <div
                onClick={() => handleEngineChange("postgres")}
                className={`engine-card relative bg-surface-container-lowest rounded-xl p-4 shadow-sm border-2 flex flex-col justify-between h-24 cursor-pointer transition-all hover:shadow-md ${
                  currentEngine === "postgres" ? "border-primary-container" : "border-transparent hover:border-surface-variant"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center engine-icon-wrap ${
                      currentEngine === "postgres" ? "bg-primary-fixed/40 text-primary" : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">database</span>
                  </div>
                  {currentEngine === "postgres" && (
                    <span className="active-badge px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-bold leading-tight">
                      Active Selection
                    </span>
                  )}
                </div>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  PostgreSQL
                </span>
              </div>

              {/* 2. Oracle Database */}
              <div
                onClick={() => handleEngineChange("oracle")}
                className={`engine-card relative bg-surface-container-lowest rounded-xl p-4 shadow-sm border-2 flex flex-col justify-between h-24 cursor-pointer transition-all hover:shadow-md ${
                  currentEngine === "oracle" ? "border-primary-container" : "border-transparent hover:border-surface-variant"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center engine-icon-wrap ${
                      currentEngine === "oracle" ? "bg-primary-fixed/40 text-primary" : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">dns</span>
                  </div>
                  {currentEngine === "oracle" && (
                    <span className="active-badge px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-bold leading-tight">
                      Active Selection
                    </span>
                  )}
                </div>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  Oracle Database
                </span>
              </div>

              {/* 3. IBM Db2 */}
              <div
                onClick={() => handleEngineChange("db2")}
                className={`engine-card relative bg-surface-container-lowest rounded-xl p-4 shadow-sm border-2 flex flex-col justify-between h-24 cursor-pointer transition-all hover:shadow-md ${
                  currentEngine === "db2" ? "border-primary-container" : "border-transparent hover:border-surface-variant"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center engine-icon-wrap ${
                      currentEngine === "db2" ? "bg-primary-fixed/40 text-primary" : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">hub</span>
                  </div>
                  {currentEngine === "db2" && (
                    <span className="active-badge px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-bold leading-tight">
                      Active Selection
                    </span>
                  )}
                </div>
                <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                  IBM Db2
                </span>
              </div>
            </div>
          </div>

          {/* SQL Artefact Matrix Section Header & Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm">
                <span className="material-symbols-outlined text-[22px]">dataset</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">SQL Artefact Matrix</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Manage database definitions, procedures, functions, and metadata bundles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAll}
                className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                id="toggle-select-all"
              >
                <span className="material-symbols-outlined text-[16px]">select_all</span>
                <span>{selectedCount === 0 ? "Select All" : "Deselect All"}</span>
              </button>
            </div>
          </div>

          {/* SQL Artefacts Interactive Grid (14 Items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md" id="matrix-cards-grid">
            {ARTEFACT_ITEMS.map((item) => {
              const rule = item.config[currentEngine];
              const isEnabled = rule.enabled;
              const isChecked = isEnabled && userSelections[item.id] !== false;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleArtefact(item.id)}
                  data-artefact-id={item.id}
                  className={`artefact-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-transparent transition-all flex items-center justify-between ${
                    isEnabled
                      ? "hover:shadow-md cursor-pointer"
                      : "opacity-45 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div className="item-icon-box w-11 h-11 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface group-hover:bg-primary-fixed group-hover:text-primary transition-colors flex-shrink-0">
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                        {item.title}
                      </span>
                      <span className="font-code-sm text-[11px] text-on-surface-variant font-mono">
                        {item.code}
                      </span>
                      <div className="badge-container mt-1">
                        {!isEnabled && rule.note && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                            {rule.note}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`custom-checkbox w-6 h-6 rounded-md flex items-center justify-center shadow-sm transition-transform flex-shrink-0 ${
                      !isEnabled
                        ? "bg-surface-container text-transparent border border-surface-variant pointer-events-none"
                        : isChecked
                        ? "bg-primary-container text-on-primary"
                        : "bg-surface-container text-transparent border border-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-surface-variant/40">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span id="selected-counter">
                {selectedCount} of {totalEnabled} Artefacts Selected
              </span>
            </div>
            <a
              href="/receipt-generator"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary font-label-md text-label-md shadow-[0_8px_20px_-3px_rgba(255,92,56,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(255,92,56,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="btn-continue"
            >
              <span>Continue to Receipt Generator</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
