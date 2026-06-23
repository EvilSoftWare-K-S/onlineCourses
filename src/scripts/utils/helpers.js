// Защита от XSS
export function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    })
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
      return c;
    });
}

// Экранирование атрибутов
export function escapeAttr(str) {
  if (!str) return "";
  return str.replace(/[&"']/g, function (match) {
    if (match === "&") return "&amp;";
    if (match === '"') return "&quot;";
    if (match === "'") return "&#39;";
    return match;
  });
}

// Debounce для оптимизации
export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
