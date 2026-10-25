export function achievement(score: number, total: number) {
  const r = score / total;
  if (r >= 0.9) return "Master of Deep Time";
  if (r >= 0.7) return "Evolution Expert";
  if (r >= 0.4) return "Fossil Finder";
  return "Curious Explorer";
}
