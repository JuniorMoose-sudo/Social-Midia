const DIAGNOSTICOS_BASE = {
  iniciante: {
    titulo: 'Seu Instagram ainda não está trabalhando por você',
    msg: 'Você ainda não tem uma base estratégica, e isso está bloqueando seu potencial de crescimento. A boa notícia: negócios no início do processo respondem muito rápido quando a estratégia certa é aplicada.',
    comparacao: 'Você está entre os 40% que ainda não ativaram o potencial do Instagram',
    nivelClass: 'nivel-iniciante',
    nivelLabel: '🔴 Estágio Inicial',
    opp: '<strong>{{name}}, seu caso tem alto potencial de crescimento rápido.</strong> Perfis no estágio inicial, quando bem trabalhados, são os que mais crescem nos primeiros 60 dias. Existe uma janela de oportunidade agora — e perder tempo equivale a perder posição para concorrentes que estão agindo.',
    metricas: [
      { label: 'Estrutura', val: 'Fraca', pct: 15, color: '#FF6B6B' },
      { label: 'Potencial', val: 'Alto', pct: 85, color: '#E2A1B8' },
      { label: 'Urgência', val: 'Alta', pct: 90, color: '#D6AE62' },
    ],
  },
  crescimento: {
    titulo: 'Você está perto de destravar resultados reais',
    msg: 'Seu perfil já tem movimento, mas falta a estratégia certa para converter esse esforço em clientes de verdade. A diferença entre quem vende e quem não vende no Instagram costuma ser uma única mudança de abordagem.',
    comparacao: 'Você está à frente de 58% dos perfis no seu segmento',
    nivelClass: 'nivel-crescimento',
    nivelLabel: '🟡 Em Crescimento',
    opp: '<strong>{{name}}, você está no ponto de inflexão.</strong> Quem chega nesse estágio e faz os ajustes certos geralmente vê resultado nas primeiras semanas. Quem não faz continua no mesmo patamar por meses. O que falta não é esforço — é direcionamento.',
    metricas: [
      { label: 'Estrutura', val: 'Média', pct: 50, color: '#D6AE62' },
      { label: 'Potencial', val: 'Alto', pct: 80, color: '#E2A1B8' },
      { label: 'Urgência', val: 'Média', pct: 60, color: '#D6AE62' },
    ],
  },
  avancado: {
    titulo: 'Seu Instagram tem alto potencial de escala agora',
    msg: 'Você já fez o básico e tem consistência. O próximo passo é profissionalizar para crescer em outra dimensão — mais alcance, mais conversão e mais clientes com menos esforço operacional.',
    comparacao: 'Você já está à frente de 75% dos perfis no seu segmento',
    nivelClass: 'nivel-avancado',
    nivelLabel: '🟢 Perfil Avançado',
    opp: '<strong>{{name}}, você está pronto para escalar.</strong> Perfis no seu estágio que aplicam estratégia avançada costumam dobrar resultados em 45–60 dias. O risco aqui é continuar no piloto automático e deixar de capturar o crescimento que já está disponível.',
    metricas: [
      { label: 'Estrutura', val: 'Boa', pct: 72, color: '#E2A1B8' },
      { label: 'Potencial', val: 'Muito alto', pct: 90, color: '#E2A1B8' },
      { label: 'Urgência', val: 'Média', pct: 55, color: '#D6AE62' },
    ],
  },
};

export function getDiagnosticos(name) {
  return Object.fromEntries(
    Object.entries(DIAGNOSTICOS_BASE).map(([key, diag]) => [
      key,
      { ...diag, opp: diag.opp.replaceAll('{{name}}', name) },
    ]),
  );
}
