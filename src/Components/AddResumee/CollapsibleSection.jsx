// src/Components/AddResumee/CollapsibleSection.jsx
import React, { useState } from "react";
import "./CollapsibleSection.css";

export default function CollapsibleSection({
  title,
  children,
  // styling hook for nested sections: "default" | "nested" | etc.
  variant = "default",
  // controlled props (optional)
  isOpen: controlledIsOpen,
  onToggle,
  // uncontrolled default state when not controlled
  defaultOpen = false,
}) {
  // Internal state only used when component is uncontrolled
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(); // let parent manage state
    } else {
      setInternalIsOpen((prev) => !prev); // uncontrolled: flip internal
    }
  };

  return (
    <div className={`collapsible-section ${variant}`}>
      <button
        type="button"
        className={`collapsible-header ${variant}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <h2>{title}</h2>
        <span className="arrow" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className={`collapsible-content ${variant}`}>{children}</div>
      )}
    </div>
  );
}
