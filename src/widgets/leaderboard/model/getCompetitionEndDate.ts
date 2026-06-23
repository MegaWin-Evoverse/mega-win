export function getCompetitionEndDate(month: string): Date {
  const [year, monthNum] = month.split('-').map(Number);

  return new Date(Date.UTC(year, monthNum, 1));
}
