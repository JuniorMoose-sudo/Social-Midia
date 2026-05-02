export const QUIZ_TOTAL_QUESTIONS = 4;

export const QUIZ_NEXT_BUTTON_MAP = {
  q1: 'nextQ1',
  q2: 'nextQ2',
  q3: 'nextQ3',
  q4: 'nextQ4',
};

export const QUIZ_TITLES = {
  q1: (name) => `${name}, qual é o seu segmento?`,
  q2: 'Qual é sua situação atual?',
  q3: 'Com que frequência você posta?',
  q4: 'O que você mais quer com o Instagram?',
};

export const QUIZ_LOADING_STEP_IDS = ['ls1', 'ls2', 'ls3', 'ls4'];

export const QUIZ_BUTTON_LABELS = {
  btnNome: 'Começar diagnóstico →',
  nextQ1: 'Próximo →',
  nextQ2: 'Próximo →',
  nextQ3: 'Próximo →',
  nextQ4: 'Ver meu diagnóstico →',
  backQ2: '← Voltar',
  backQ3: '← Voltar',
  backQ4: '← Voltar',
};

export function getQuizProgressText(stepNumber) {
  return `Pergunta ${stepNumber} de ${QUIZ_TOTAL_QUESTIONS}`;
}

export function getQuizLoadingLabels({ nichoLabel, userName }) {
  return [
    `✅ Nicho ${nichoLabel} identificado...`,
    '✅ Comparando com perfis similares no Brasil...',
    '✅ Gargalos e oportunidades mapeados...',
    `✅ Diagnóstico gerado para ${userName}!`,
  ];
}
