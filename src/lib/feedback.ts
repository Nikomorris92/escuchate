import type { Area } from '@/types'
import type { Lang } from './i18n'

export const AREA_FEEDBACK: Record<Area, string> = {
  acceptance:
    'Hay algo en ti que todavía estás combatiendo. Una parte que juzgas, que quisieras que fuera diferente. Ese esfuerzo cansa — y suele ser el primero que hay que soltar.',
  discipline:
    'Empiezas, pero algo te detiene a mitad. No es falta de voluntad: es que todavía no has encontrado el sistema que te sostenga cuando las ganas se acaban.',
  no_complaining:
    'Te quedas mucho tiempo en el problema antes de moverte hacia la solución. La queja te da alivio, pero te quita el impulso que necesitas para cambiar las cosas.',
  obstacle:
    'Ante una dificultad, tu primer movimiento suele ser evitarla. Lo que no afrontas hoy regresa mañana — casi siempre más grande.',
  leap:
    'Piensas, analizas, vuelves a pensar — y el tiempo pasa sin que tomes la decisión. La claridad que esperas casi nunca llega antes de actuar.',
  gratitude:
    'Te resulta difícil detenerte a ver lo que ya funciona. Vives más en lo que falta que en lo que tienes — y eso agota sin que te des cuenta.',
  observe:
    'Cuando una emoción sube, tiendes a actuar desde ahí. Decides, dices, reaccionas — y a veces, con la cabeza más fría, lo habrías hecho diferente.',
  here_now:
    'Tu mente viaja mucho: al pasado que ya ocurrió, al futuro que todavía no existe. La vida que tienes delante, mientras tanto, pasa un poco de largo.',
  voices:
    'Hay una voz dentro de ti que dice que no eres suficiente, y le das bastante credibilidad. Esa voz no es la verdad — pero sí es lo primero que hay que aprender a ver.',
  mirror:
    'Cargas con algo hacia alguien — rencor, irritación, una cuenta pendiente. Eso pesa, y casi siempre dice más de ti que de la otra persona.',
  healthy_relationships:
    'No tienes mucho espacio para ti mismo dentro de tus relaciones. Sin ese espacio, es difícil saber quién eres tú — fuera de lo que los demás esperan de ti.',
}

// Feedback mostrato al completamento di ogni area
export const AREA_COMPLETION_FEEDBACK: Record<Area, string> = {
  acceptance:
    'Aceptar no significa que estás de acuerdo con todo — significa que dejas de gastar energía en luchar contra lo que ya es. Ese es el primer espacio que se abre.',
  discipline:
    'Una promesa cumplida a ti mismo, por pequeña que sea, vale más que diez grandes intenciones. Acabas de demostrar que puedes.',
  no_complaining:
    'Has elegido algo difícil sobre algo fácil. Eso es exactamente lo contrario del placer momentáneo — y es exactamente lo que te cambia. Cada vez que transformas una queja en "¿qué depende de mí aquí?", recuperas el control.',
  obstacle:
    'Has mirado el obstáculo de frente en lugar de rodearlo. Eso ya es más de lo que hace la mayoría.',
  leap:
    'No necesitabas estar listo. Nunca lo estarás del todo. Lo que acabas de hacer es exactamente lo que se necesita: dar el paso igual.',
  gratitude:
    'Lo que reconoces crece. Lo que ignoras se achica. Has entrenado hoy la atención hacia lo que ya funciona — y eso se acumula.',
  observe:
    'Nombrar lo que sientes antes de actuar es uno de los actos más difíciles y más útiles. Hoy lo has practicado.',
  here_now:
    'Estás aquí. No en el pasado, no en el futuro — aquí. Es más raro de lo que parece, y más valioso de lo que crees.',
  voices:
    'Has visto pasar la voz sin subirte. Eso no la silencia, pero le quita poder. Con el tiempo, aprenderás a reconocerla antes de que hable.',
  mirror:
    'Lo que ves en los demás es también una ventana hacia ti. No siempre es cómodo mirarse así — pero es donde empieza el cambio real.',
  healthy_relationships:
    'Dos personas enteras se relacionan mejor que una que se pierde en la otra. Lo que has trabajado hoy es la base de cualquier vínculo que valga la pena.',
}

export const AREA_COMPLETION_FEEDBACK_IT: Record<Area, string> = {
  acceptance:
    "Accettare non significa essere d'accordo con tutto — significa smettere di sprecare energia a lottare contro quello che già è. È il primo spazio che si apre.",
  discipline:
    "Una promessa mantenuta a te stesso, per piccola che sia, vale più di dieci grandi intenzioni. Hai appena dimostrato di potercela fare.",
  no_complaining:
    "Hai scelto qualcosa di difficile su qualcosa di facile. È esattamente il contrario del piacere momentaneo — ed è esattamente quello che ti cambia. Ogni volta che trasformi un lamento in \"Cosa dipende da me qui?\", riprendi il controllo.",
  obstacle:
    "Hai guardato l'ostacolo in faccia invece di aggirarlo. Questo è già più di quello che fa la maggior parte delle persone.",
  leap:
    "Non avevi bisogno di essere pronto. Non lo sarai mai del tutto. Quello che hai appena fatto è esattamente quello che serve: fare il passo lo stesso.",
  gratitude:
    "Quello che riconosci cresce. Quello che ignori si rimpicciolisce. Oggi hai allenato l'attenzione verso quello che già funziona — e questo si accumula.",
  observe:
    "Nominare quello che senti prima di agire è uno degli atti più difficili e più utili. Oggi l'hai praticato.",
  here_now:
    "Sei qui. Non nel passato, non nel futuro — qui. È più raro di quanto sembri, e più prezioso di quanto credi.",
  voices:
    "Hai guardato passare la voce senza salirci. Non la silenzia, ma le toglie potere. Col tempo imparerai a riconoscerla prima che parli.",
  mirror:
    "Quello che vedi negli altri è anche una finestra verso di te. Non è sempre comodo guardarsi così — ma è da lì che inizia il cambiamento reale.",
  healthy_relationships:
    "Due persone intere si relazionano meglio di una che si perde nell'altra. Quello che hai lavorato oggi è la base di qualsiasi legame che vale la pena.",
}

export function generateFeedback(
  answers: Record<number, number>,
  areaOrder: Area[]
): string {
  const top = areaOrder.slice(0, 2)
  const lines = top.map((area) => AREA_FEEDBACK[area]).filter(Boolean)
  if (lines.length === 0) return ''
  return lines.join('\n\n')
}
