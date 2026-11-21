import React from "react";
import { Check, X } from "lucide-react";
import { Band, Head } from "./Layout";
import { Reveal } from "./motion";
import { useCopy, HeadTitle } from "./copy";

/** FinBoard against doing it yourself in software or hiring a traditional firm. */
export default function Compare() {
  const { COMPARE, HEADS } = useCopy();
  const OURS = COMPARE.columns.length - 1;
  return (
    <Band id="compare" testid="accounting-compare">
      <Head
        eyebrow={HEADS.compare.eyebrow}
        color="#D97706"
        title={<HeadTitle head={HEADS.compare} />}
        lead={HEADS.compare.lead}
      />
      <Reveal className="mt-12 overflow-x-auto rounded-3xl border border-line bg-white" delay={100}>
        <table className="w-full min-w-[760px] text-[14px]">
          <thead>
            <tr className="text-left align-bottom">
              <th className="w-[22%] p-5 lg:px-7" />
              {COMPARE.columns.map(({ name, sub }, i) => (
                <th key={name} scope="col" className={`p-5 lg:px-7 ${i === OURS ? "bg-[#0A0A0A] text-white" : ""}`}>
                  <div className="text-[14px] font-semibold">{name}</div>
                  <div className={`mt-0.5 text-[12px] font-normal ${i === OURS ? "text-white/55" : "text-[#0A0A0A]/45"}`}>{sub}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.rows.map(([topic, ...cells]) => (
              <tr key={topic} className="border-t border-line">
                <th scope="row" className="p-5 text-left font-medium lg:px-7">{topic}</th>
                {cells.map((c, i) => (
                  <td key={COMPARE.columns[i].name} className={`p-5 lg:px-7 ${i === OURS ? "bg-[#F5F0E8]/70 font-semibold" : "text-[#0A0A0A]/55"}`}>
                    <span className="inline-flex items-start gap-2.5">
                      {i === OURS ? (
                        <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#FFE4E6] text-[#BE123C]">
                          <X size={11} strokeWidth={3} />
                        </span>
                      )}
                      {c}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Band>
  );
}
