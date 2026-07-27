"use client";

import React from "react";

/**
 * Scales fixed-width content down to fit narrow (mobile) containers, instead of
 * letting it clip or overflow. When the available width is >= designWidth the
 * children render naturally (desktop is untouched); below that, the content is
 * pinned to designWidth and transform-scaled to fit, with the wrapper height
 * collapsed to match so surrounding layout stays correct.
 */
export default function ScaleToFit({ designWidth = 520, className = "", children }) {
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const [state, setState] = React.useState({ scale: 1, natural: true, height: undefined });

  React.useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return undefined;

    const measure = () => {
      const avail = outer.clientWidth;
      if (avail >= designWidth) {
        setState((s) => (s.natural ? s : { scale: 1, natural: true, height: undefined }));
      } else {
        const scale = avail / designWidth;
        const height = inner.offsetHeight * scale;
        setState({ scale, natural: false, height });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ height: state.height, overflow: state.natural ? undefined : "hidden" }}
    >
      <div
        ref={innerRef}
        style={
          state.natural
            ? undefined
            : { width: designWidth, transform: `scale(${state.scale})`, transformOrigin: "top left" }
        }
      >
        {children}
      </div>
    </div>
  );
}
