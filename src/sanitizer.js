//--> sanitize with "-"

// export const RESERVED_PATTERNS = [
//   // Emails
//   /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,

//   // Phone numbers
//   /\b(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}\b/,

//   // URLs & domains
//   /\bhttps?:\/\/[^\s]+/i,
//   /\bwww\.[^\s]+/i,
//   /\b[a-z0-9-]+\.(com|net|org|io|co|me|info)\b/i,

//   // Communication platforms
//   /\b(whatsapp|telegram|skype|zoom|discord|wechat|signal)\b/i,
//   /\b(instagram|facebook|linkedin|twitter|x|tiktok)\b/i,
// ];

// // Insert "-" between every character
// function hyphenate(word) {
//   return word.split("").join("-");
// }

// export function sanitizeText(text) {
//   let sanitized = text;

//   RESERVED_PATTERNS.forEach((pattern) => {
//     sanitized = sanitized.replace(pattern, (match) => hyphenate(match));
//   });

//   return sanitized;
// }

// export function containsRestrictedContent(text) {
//   return RESERVED_PATTERNS.some((pattern) => pattern.test(text));
// }



// --------------------------------------------------------------------------------



//--> sanitize with '_'

// sanitizer.js

export const RESERVED_PATTERNS = [
  // Emails (actual email addresses)
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,

  // Phone numbers
  /\b(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}\b/gi,

  // URLs & domains
  /\bhttps?:\/\/[^\s]+/gi,
  /\bwww\.[^\s]+/gi,
  /\b[a-z0-9-]+\.(com|net|org|io|co|me|info)\b/gi,

  // Communication & social platforms
  /\b(whatsapp|telegram|skype|zoom|discord|wechat|signal)\b/gi,
  /\b(instagram|facebook|linkedin|twitter|x|tiktok)\b/gi,

  // Fiverr-sensitive keywords (Updated)
  /\b(contact|review|paid|pay|payment|email)\b/gi,
];

/**
 * Insert "_" after the first character
 * Example: payment → p_ayment
 */
function insertUnderscoreAfterFirstChar(word) {
  if (!word || word.length < 2) return word;

  // Prevent double-sanitizing (e.g. p_ayment)
  if (word[1] === "_") return word;

  return `${word.charAt(0)}_${word.slice(1)}`;
}

export function sanitizeText(text) {
  let sanitized = text;

  RESERVED_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, (match) =>
      insertUnderscoreAfterFirstChar(match)
    );
  });

  return sanitized;
}

export function containsRestrictedContent(text) {
  return RESERVED_PATTERNS.some((pattern) => pattern.test(text));
}
