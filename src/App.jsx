import { useState } from "react";
import { sanitizeText, containsRestrictedContent } from "./sanitizer";

export default function App() {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const hasRestricted = containsRestrictedContent(message);
  const sanitizedMessage = sanitizeText(message);

  const handleCopy = async () => {
    if (!sanitizedMessage) return;

    try {
      await navigator.clipboard.writeText(sanitizedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Fiverr Message Sanitizer</h1>
        <p className="subtitle">
          Restricted keywords are neutralized using hyphens to keep your Fiverr
          messages compliant.
        </p>

        <label className="label">Your Message</label>
        <textarea
          className={`textarea ${hasRestricted ? "error" : ""}`}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {hasRestricted && (
          <div className="warning">
            ⚠ Restricted content detected. Use the sanitized version below.
          </div>
        )}

        <div className="preview-header">
          <label className="label">Sanitized Preview</label>

          <button
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            disabled={!sanitizedMessage}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="preview">
          {sanitizedMessage || "Nothing to preview yet."}
        </div>

        {/* <button className="button" disabled={!message}>
          Submit Safely
        </button> */}
      </div>
    </div>
  );
}
