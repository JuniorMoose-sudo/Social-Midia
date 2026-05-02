import { WPP_NUMBER } from './config.js';
import { animateValue } from './utils.js';
import { getDiagnosticos } from './data/diagnosticos.js';
import {
  QUIZ_BUTTON_LABELS,
  QUIZ_LOADING_STEP_IDS,
  QUIZ_NEXT_BUTTON_MAP,
  QUIZ_TITLES,
  QUIZ_TOTAL_QUESTIONS,
  getQuizLoadingLabels,
  getQuizProgressText,
} from './data/quiz-content.js';
import { buildQuizWhatsappText } from './data/messages.js';

export function initQuiz() {
  let userName = '';
  let currentQ = 1;
  const score = { maturidade: 0, urgencia: 0, potencial: 0 };
  const respostas = {
    nicho: '',
    situacao: '',
    frequencia: '',
    objetivo: '',
    nichoLabel: '',
    situacaoLabel: '',
    frequenciaLabel: '',
    objetivoLabel: '',
  };

  const inputNome = document.getElementById('inputNome');
  const btnNome = document.getElementById('btnNome');
  if (!inputNome || !btnNome) return;

  Object.entries(QUIZ_BUTTON_LABELS).forEach(([id, label]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = label;
  });

  inputNome.addEventListener('input', () => {
    btnNome.disabled = inputNome.value.trim().length < 2;
  });

  inputNome.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && inputNome.value.trim().length >= 2) startQuiz();
  });

  btnNome.addEventListener('click', startQuiz);

  document.getElementById('nextQ1')?.addEventListener('click', () => goQ(2));
  document.getElementById('nextQ2')?.addEventListener('click', () => goQ(3));
  document.getElementById('nextQ3')?.addEventListener('click', () => goQ(4));
  document.getElementById('nextQ4')?.addEventListener('click', runDiagnostico);
  document.getElementById('backQ2')?.addEventListener('click', () => goQ(1));
  document.getElementById('backQ3')?.addEventListener('click', () => goQ(2));
  document.getElementById('backQ4')?.addEventListener('click', () => goQ(3));

  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', function onClick() {
      const step = this.dataset.step;
      const scoreData = JSON.parse(this.dataset.score);
      const val = this.dataset.val;
      const label = this.dataset.label;

      document.querySelectorAll(`[data-step="${step}"]`).forEach((b) => b.classList.remove('selected'));
      this.classList.add('selected');

      if (step === 'q1') { respostas.nicho = val; respostas.nichoLabel = label; }
      if (step === 'q2') { respostas.situacao = val; respostas.situacaoLabel = label; }
      if (step === 'q3') { respostas.frequencia = val; respostas.frequenciaLabel = label; }
      if (step === 'q4') { respostas.objetivo = val; respostas.objetivoLabel = label; }

      Object.keys(scoreData).forEach((k) => { score[k] = score[k] || 0; });

      const nextBtn = document.getElementById(QUIZ_NEXT_BUTTON_MAP[step]);
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  function startQuiz() {
    userName = inputNome.value.trim().split(' ')[0];
    document.getElementById('stepNome').style.display = 'none';
    document.getElementById('quizMain').style.display = 'block';
    updatePersonalizedQuestions();
    updateProgress(1);
  }

  function updatePersonalizedQuestions() {
    document.getElementById('q1title').textContent = QUIZ_TITLES.q1(userName);
    document.getElementById('q2title').textContent = QUIZ_TITLES.q2;
    document.getElementById('q3title').textContent = QUIZ_TITLES.q3;
    document.getElementById('q4title').textContent = QUIZ_TITLES.q4;
  }

  function goQ(n) {
    document.getElementById(`q${currentQ}`).classList.remove('active');
    currentQ = n;
    document.getElementById(`q${n}`).classList.add('active');
    updateProgress(n);
  }

  function updateProgress(n) {
    document.getElementById('progressFill').style.width = `${(n / QUIZ_TOTAL_QUESTIONS) * 100}%`;
    document.getElementById('progressText').textContent = getQuizProgressText(n);
  }

  function runDiagnostico() {
    score.maturidade = 0;
    score.urgencia = 0;
    score.potencial = 0;

    document.querySelectorAll('.quiz-opt.selected').forEach((btn) => {
      const s = JSON.parse(btn.dataset.score);
      Object.keys(s).forEach((k) => {
        score[k] += s[k];
      });
    });

    document.getElementById('quizMain').style.display = 'none';
    document.getElementById('quizLoading').style.display = 'block';
    runLoadingSequence();
  }

  function runLoadingSequence() {
    const steps = QUIZ_LOADING_STEP_IDS;
    const labels = getQuizLoadingLabels({
      nichoLabel: respostas.nichoLabel,
      userName,
    });

    let i = 0;
    const interval = setInterval(() => {
      document.getElementById(steps[i]).textContent = labels[i];
      document.getElementById(steps[i]).classList.add('done');
      i += 1;

      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById('quizLoading').style.display = 'none';
          document.getElementById('quizResultado').style.display = 'block';
          renderResultado();
        }, 600);
      }
    }, 700);
  }

  function classificar() {
    if (score.maturidade <= 3) return 'iniciante';
    if (score.maturidade <= 6) return 'crescimento';
    return 'avancado';
  }

  function calcNota() {
    const raw = score.maturidade * 8 + score.urgencia * 5 + score.potencial * 7;
    return Math.min(92, Math.max(18, raw));
  }

  function renderResultado() {
    const nivel = classificar();
    const nota = calcNota();
    const diag = getDiagnosticos(userName)[nivel];

    document.getElementById('resultGreeting').textContent = `✦ Análise de ${userName} — ${respostas.nichoLabel}`;

    const circle = document.getElementById('scoreCircle');
    const circumference = 314;
    setTimeout(() => {
      circle.style.strokeDashoffset = circumference - ((nota / 100) * circumference);
    }, 100);

    animateValue(document.getElementById('scoreNum'), 0, nota, 1200);

    const badge = document.getElementById('nivelBadge');
    badge.textContent = diag.nivelLabel;
    badge.className = `result-nivel-badge ${diag.nivelClass}`;

    document.getElementById('resultComparacao').textContent = diag.comparacao;
    document.getElementById('diagTitulo').textContent = diag.titulo;
    document.getElementById('diagMensagem').textContent = diag.msg;

    const metricsEl = document.getElementById('resultMetrics');
    metricsEl.innerHTML = '';
    diag.metricas.forEach((m) => {
      metricsEl.innerHTML += `
      <div class="metric-item">
        <div class="metric-label">${m.label}</div>
        <div class="metric-bar"><div class="metric-fill" style="width:0%; background:${m.color}" data-pct="${m.pct}"></div></div>
        <div class="metric-val">${m.val}</div>
      </div>`;
    });

    setTimeout(() => {
      document.querySelectorAll('.metric-fill').forEach((el) => {
        el.style.width = `${el.dataset.pct}%`;
      });
    }, 200);

    document.getElementById('resultOpp').innerHTML = diag.opp;

    const msg = encodeURIComponent(
      buildQuizWhatsappText({
        userName,
        respostas,
        nivelLabel: diag.nivelLabel,
        nota,
      }),
    );

    document.getElementById('wppQuizBtn').href = `https://wa.me/${WPP_NUMBER}?text=${msg}`;
  }
}
