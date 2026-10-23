import { useEffect, useRef, useCallback } from "react";

/**
 * Accessible screenshot viewer built on the native <dialog> element:
 * showModal() gives focus trapping, Escape-to-close and an inert page for
 * free, and focus returns to the opening button when it closes.
 */
function Lightbox({ images, index, onClose, onIndex }) {
  const ref = useRef(null);
  const closeRef = useRef(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      closeRef.current?.focus(); // start on the close button
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const step = useCallback(
    (dir) => onIndex((index + dir + images.length) % images.length),
    [index, images.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const img = open ? images[index] : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Screenshot viewer"
      className="lightbox"
    >
      {img && (
        <div className="relative flex flex-col h-full">
          {/* Click-outside-to-close for pointer users. Keyboard users have Escape
              (native to <dialog>) and the labelled Close button, so this layer is
              hidden from assistive tech and the tab order. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 w-full h-full cursor-zoom-out"
          />
          <div className="relative flex items-center justify-between gap-4 px-4 py-3 text-sm pointer-events-none [&>*]:pointer-events-auto">
            <p className="mono text-xs text-[var(--muted)]" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className="icon-btn relative" aria-label="Close viewer">
              ✕
            </button>
          </div>
          <figure className="relative flex-1 min-h-0 flex flex-col items-center justify-center px-4 pb-4 pointer-events-none [&>*]:pointer-events-auto">
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes="100vw"
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="max-h-[calc(100dvh-9rem)] w-auto max-w-full object-contain rounded-lg border border-white/10"
            />
            <figcaption className="text-sm text-[var(--muted)] mt-3 text-center max-w-2xl">{img.alt}</figcaption>
          </figure>
          {images.length > 1 && (
            <div className="relative flex justify-center gap-3 pb-4 pointer-events-none [&>*]:pointer-events-auto">
              <button type="button" onClick={() => step(-1)} className="icon-btn" aria-label="Previous screenshot">
                ←
              </button>
              <button type="button" onClick={() => step(1)} className="icon-btn" aria-label="Next screenshot">
                →
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

export default Lightbox;
