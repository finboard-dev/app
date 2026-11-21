"use client";

import React from "react";
import * as base from "@/data/accountingServices";
import * as samples from "@/data/accountingSamples";
import { mergeCopy } from "@/data/accounting/mergeCopy";
import { SEGMENTS_BY_SLUG } from "@/data/accounting/segments";

const BASE = mergeCopy({ ...base, ...samples });
const CopyContext = React.createContext(BASE);

/** Supplies the page copy: the general page's, or a segment's merged over it. */
export function AccountingCopyProvider({ segment, children }) {
  const value = React.useMemo(
    () => (segment ? mergeCopy(BASE, SEGMENTS_BY_SLUG[segment].copy) : BASE),
    [segment],
  );
  return <CopyContext.Provider value={value}>{children}</CopyContext.Provider>;
}

export const useCopy = () => React.useContext(CopyContext);

/** "Title <i>accent</i>end" for section headings. */
export function HeadTitle({ head, accentClass = "italic" }) {
  return (
    <>
      {head.title} <span className={accentClass}>{head.accent}</span>
      {head.end ?? ""}
    </>
  );
}
