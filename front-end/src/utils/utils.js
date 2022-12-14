export function string_to_color(a, b) {
  b = typeof b === "number" ? b : -10;
  const c = function (a) {
    for (var b = 0, c = 0; c < a.length; c++)
      b = a.charCodeAt(c) + ((b << 5) - b);
    return b;
  };
  const d = function (a, b) {
    var c = parseInt(a, 16),
      d = Math.round(2.55 * b),
      e = (c >> 16) + d,
      f = (255 & (c >> 8)) + d,
      g = (255 & c) + d;
    return (
      16777216 +
      65536 * (255 > e ? (1 > e ? 0 : e) : 255) +
      256 * (255 > f ? (1 > f ? 0 : f) : 255) +
      (255 > g ? (1 > g ? 0 : g) : 255)
    )
      .toString(16)
      .slice(1);
  };
  const e = function (a) {
    var b =
      (255 & (a >> 24)).toString(16) +
      (255 & (a >> 16)).toString(16) +
      (255 & (a >> 8)).toString(16) +
      (255 & a).toString(16);
    return b;
  };
  return "#" + d(e(c(a)), b);
}
