import { WPP_NUMBER } from './config.js';
import { animateCounter } from './utils.js';
import { GENERIC_WPP_TEXT } from './data/messages.js';

export function initUI() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.problema-card, .solucao-card, .result-card, .dep-card, .dif-card').forEach((el) => {
    observer.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.hero [data-count]').forEach((el) => animateCounter(el));
  }, 600);

  function updateCalc() {
    const ticket = parseInt(document.getElementById('calcTicket').value, 10) || 0;
    const qtd = parseInt(document.getElementById('calcQtd').value, 10);
    document.getElementById('calcQtdLabel').textContent = qtd;
    document.getElementById('calcQtdResult').textContent = qtd;
    document.getElementById('calcTicketResult').textContent = ticket.toLocaleString('pt-BR');
    document.getElementById('calcNum').textContent = `R$ ${(ticket * qtd).toLocaleString('pt-BR')}`;
  }

  document.getElementById('calcTicket')?.addEventListener('input', updateCalc);
  document.getElementById('calcQtd')?.addEventListener('input', updateCalc);

  const genericMsg = encodeURIComponent(GENERIC_WPP_TEXT);
  const wppBase = `https://wa.me/${WPP_NUMBER}?text=${genericMsg}`;
  ['wppFloat', 'wppEscassez', 'wppFinal'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = wppBase;
  });

  setTimeout(() => {
    const vf = document.getElementById('vacFill');
    if (vf) vf.style.width = '62.5%';
  }, 800);
}
