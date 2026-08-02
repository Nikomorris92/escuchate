import { QuizQuestion } from '@/types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    area: 'acceptance',
    question: 'Cuando algo de ti mismo no te gusta, ¿cuánto tiempo pasas intentando cambiarlo a la fuerza?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 2,
    area: 'discipline',
    question: '¿Con qué frecuencia empiezas algo que luego abandonas porque "ya no tienes ganas"?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 3,
    area: 'no_complaining',
    question: '¿Cuántas veces al día te sorprendes quejándote —en voz alta o en tu cabeza— de algo?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 4,
    area: 'leap',
    question: '¿Con qué frecuencia te quedas atascado pensando en una decisión sin tomar ninguna?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 5,
    area: 'gratitude',
    question: '¿Cuánto espacio le das en tu día a reconocer lo que ya va bien en tu vida?',
    options: ['Nada', 'Casi nada', 'Algo', 'Mucho'],
  },
  {
    id: 6,
    area: 'observe',
    question: '¿Con qué frecuencia tomas decisiones importantes cuando estás emocionalmente alterado?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 7,
    area: 'obstacle',
    question: 'Cuando aparece un obstáculo en tu vida, ¿cuánto tiendes a evitarlo o rodearlo en lugar de enfrentarlo?',
    options: ['Nada', 'Poco', 'Bastante', 'Mucho'],
  },
  {
    id: 8,
    area: 'here_now',
    question: '¿Con qué frecuencia tu mente está en otro lugar mientras haces algo o estás con alguien?',
    options: ['Casi nunca', 'A veces', 'A menudo', 'Casi siempre'],
  },
  {
    id: 9,
    area: 'voices',
    question: '¿Cuánto peso le das a la voz interior que te dice que no eres suficiente?',
    options: ['Nada', 'Casi nada', 'Bastante', 'Mucho'],
  },
  {
    id: 10,
    area: 'mirror',
    question: '¿Cuánto rencor o irritación persistente sientes hacia alguna persona en tu vida?',
    options: ['Nada', 'Poco', 'Bastante', 'Mucho'],
  },
  {
    id: 11,
    area: 'healthy_relationships',
    question: '¿Cuánto espacio tienes para ti mismo dentro de tus relaciones más importantes?',
    options: ['Nada', 'Casi nada', 'Suficiente', 'Mucho'],
  },
]

// Domande dove punteggio basso = problema più grande (scala invertita)
const INVERTED_QUESTIONS = new Set([5, 11])

export function computeAreaOrder(answers: Record<number, number>) {
  const scores = QUIZ_QUESTIONS.map((q) => {
    const raw = answers[q.id] ?? 0
    const score = INVERTED_QUESTIONS.has(q.id) ? 3 - raw : raw
    return { area: q.area, score }
  })

  const sorted = scores
    .sort((a, b) => b.score - a.score)
    .map((s) => s.area)

  // "Relaciones sanas" è sempre l'ultimo — prima cresci tu, poi gli altri
  const withoutLast = sorted.filter((a) => a !== 'healthy_relationships')
  return [...withoutLast, 'healthy_relationships']
}
