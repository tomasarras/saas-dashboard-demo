// Fakes network latency for demo interactions (loading metrics, switching
// date ranges) so the dashboard doesn't feel instantaneous/static.
export function randomDelay(maxMs = 1200, minMs = 200) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
