"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SelectProps = {
  name: string;
  options: readonly string[];
  /** id of the visible label element. */
  labelledBy: string;
  placeholder?: string;
  defaultValue?: string;
  invalid?: boolean;
  onChange?: (value: string) => void;
};

/**
 * Select-only combobox. The native <select> drop-down is rendered by the OS and
 * can't be styled (rounded corners, system font, grey highlight), so the list is
 * rebuilt here. Value is submitted through a hidden input, and the server action
 * still validates it.
 */
export function Select({
  name,
  options,
  labelledBy,
  placeholder = "Select one",
  defaultValue = "",
  invalid = false,
  onChange,
}: SelectProps) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(defaultValue)),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const select = (index: number) => {
    const next = options[index];
    setValue(next);
    setActiveIndex(index);
    setOpen(false);
    onChange?.(next);
    triggerRef.current?.focus();
  };

  const move = (delta: number) => {
    setActiveIndex((current) =>
      Math.min(options.length - 1, Math.max(0, current + delta)),
    );
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        move(event.key === "ArrowDown" ? 1 : -1);
        return;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        return;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1);
        }
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) select(activeIndex);
        else setOpen(true);
        return;
      case "Escape":
        setOpen(false);
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        // Type-ahead: jump to the first option starting with the pressed key.
        if (event.key.length !== 1 || event.metaKey || event.ctrlKey) return;
        const match = options.findIndex((option) =>
          option.toLowerCase().startsWith(event.key.toLowerCase()),
        );
        if (match === -1) return;
        event.preventDefault();
        setOpen(true);
        setActiveIndex(match);
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelledBy}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        aria-invalid={invalid}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 border-b border-hairline bg-transparent py-3 text-left font-body text-base outline-none focus:outline-none"
      >
        <span className={value ? "text-ink" : "text-grey"}>
          {value || placeholder}
        </span>
        {/* Sharp caret rather than a soft chevron. */}
        <span
          className={cn(
            "mb-1 size-2 shrink-0 rotate-45 border-b border-r transition-[transform,border-color] duration-200 ease-out",
            open ? "-rotate-[135deg] border-accent" : "border-grey",
          )}
          aria-hidden="true"
        />
      </button>

      {/* Doubles as the focus indicator, matching the text inputs. */}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center bg-accent transition-transform duration-200 ease-out",
          open ? "scale-x-100" : "scale-x-0 group-focus-within:scale-x-100",
        )}
        aria-hidden="true"
      />

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="absolute inset-x-0 top-full z-30 mt-px max-h-64 overflow-y-auto border border-hairline bg-paper py-1 shadow-none"
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                data-active={index === activeIndex}
                onClick={() => select(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-[0.9375rem] transition-colors duration-100 ease-linear",
                  index === activeIndex ? "bg-card" : "bg-transparent",
                  selected ? "text-accent" : "text-ink",
                )}
              >
                <span
                  className={cn(
                    "h-px w-3 shrink-0 transition-colors duration-100 ease-linear",
                    selected || index === activeIndex ? "bg-accent" : "bg-transparent",
                  )}
                  aria-hidden="true"
                />
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
