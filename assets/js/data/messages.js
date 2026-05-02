export const GENERIC_WPP_TEXT = 'Olá! Vim da landing page e quero saber sobre o diagnóstico gratuito para o meu Instagram.';

export function buildQuizWhatsappText({
  userName,
  respostas,
  nivelLabel,
  nota,
}) {
  return `Olá! Acabei de fazer o diagnóstico do Instagram na sua landing page.

👤 Nome: ${userName}
📍 Segmento: ${respostas.nicho}
📊 Situação: ${respostas.situacao}
📅 Frequência de posts: ${respostas.frequencia}
🎯 Objetivo: ${respostas.objetivo}

📈 Nível identificado: ${nivelLabel}
🔢 Nota do perfil: ${nota}/100

Quero entender como aplicar isso no meu negócio!`;
}
