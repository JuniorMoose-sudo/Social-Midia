export function formatPeriodoAtual() {
  const now = new Date();
  const monthOnly = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(now);
  const monthYear = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(now);
  const year = now.getFullYear();

  const urgencyMonthEl = document.getElementById('urgencyMonth');
  const vacancyMonthYearEl = document.getElementById('vacancyMonthYear');
  const vacancyStartMonthYearEl = document.getElementById('vacancyStartMonthYear');
  const footerYearEl = document.getElementById('footerYear');

  if (urgencyMonthEl) urgencyMonthEl.textContent = monthOnly;
  if (vacancyMonthYearEl) vacancyMonthYearEl.textContent = `Vagas ${monthYear}`;
  if (vacancyStartMonthYearEl) vacancyStartMonthYearEl.textContent = `para início em ${monthYear}`;
  if (footerYearEl) footerYearEl.textContent = year;
}
