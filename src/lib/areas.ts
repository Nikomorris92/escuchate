import { AreaDefinition } from '@/types'

export const AREAS: AreaDefinition[] = [
  {
    id: 'acceptance',
    slug: 'aceptacion',
    order: 1,
    title: 'Aceptación',
    subtitle: 'Lo que resistes, persiste',
    teachings: [
      'En la aceptación de los hechos está nuestro bienestar. No podemos controlar todo lo que nos ocurre en la vida — y hay cosas que directamente no dependen de nosotros, sobre todo cuando se trata de las decisiones de los demás.',
      'El sufrimiento no viene del dolor en sí. Viene de la lucha continua contra una realidad que no podemos cambiar. Cada vez que la mente rechaza lo que ya ha ocurrido, esa resistencia cobra un precio — y en casos extremos, puede ser el detonante de enfermedades reales: problemas digestivos, insomnio, tensión crónica. El cuerpo paga lo que la mente no resuelve.',
      'Aceptar no es rendirse. Todos los grandes cambios parten de una fase de aceptación. Primero ves lo que es — luego puedes mover algo. Sin ese primer paso, solo gastas energía peleando contra lo que ya pasó.',
      'No podemos pretender tener control sobre las decisiones de los demás. Eso no está en nuestras manos. Lo que sí está en nuestras manos es cómo respondemos cuando esas decisiones nos afectan.',
      'Cuando se tiene el corazón lleno de bondad y amor, es mucho más fácil aceptar incluso los acontecimientos que a primera vista parecen adversos. No porque duelan menos — sino porque desde ahí se ve más lejos.',
      'No es el dolor lo que más nos hace sufrir, sino la resistencia continua a una realidad que no podemos cambiar. Soltar esa resistencia no significa que no te importe — significa que te importas lo suficiente como para no destruirte.',
      'De joven me enamoré de una chica que vivía en Australia. Me prometió que volvería a vivir en Italia y que podríamos tener nuestra historia. No ocurrió. Un día me llamó para decirme que se quedaría allí. Dos años después, antes de irme a España, volvió por unos trámites médicos — y tampoco nos vimos. Aceptar aquello años antes, y mirar hacia adelante, me habría ahorrado años de sufrimiento. Lo entendí tarde. Pero lo entendí.',
      'Hay una diferencia entre resignarse y aceptar. La resignación dice: "no puedo hacer nada, así que me rindo." La aceptación dice: "esto es lo que hay — ahora, ¿qué hago con ello?" Una te paraliza. La otra te da poder.',
    ],
    reflection:
      '¿Hay algo que ha ocurrido — una situación, una decisión de otra persona, algo que no salió como esperabas — que todavía estás combatiendo? ¿Qué cambiaría si, solo por hoy, dejaras de hacerlo?',
    extraReflections: [
      '¿Hay algo de ti mismo que todavía no has aceptado del todo? ¿Cómo sería tratarte con la misma comprensión que le darías a un amigo?',
      'Si pudieras hablar con la versión de ti que vivió ese momento difícil, ¿qué le dirías?',
    ],
    inRelacion:
      'Quien no se acepta a sí mismo suele buscar en el otro la confirmación que no logra darse — y es un peso que ninguna relación aguanta mucho tiempo.',
    practicalExercise: {
      description:
        'Cierra el puño con toda tu fuerza.\n\nMantenerlo cerrado durante un minuto entero.\n\nAhora responde: ¿duele?\n\nSí. Ahora abre la mano despacio.\n\nEl alivio es inmediato.\n\nEse puño eres tú cuando te resistes a la realidad. Cuanto más aprietas, más sufres. La apertura de la mano no cambia lo que pasó — pero te devuelve la energía que estabas gastando en sostener el dolor.',
      prompt: '¿Qué es lo que llevas tiempo apretando con el puño? ¿Qué pasaría si abrieras la mano?',
    },
    secondExercise: {
      description:
        'Piensa en una persona que ya no forma parte de tu vida — alguien que aprecias, o que apreciabas, y que por algún motivo se fue, se alejó, o simplemente las cosas entre vosotros no pudieron ser.\n\nEn lugar de rumiar sobre lo que pudo haber sido, o sobre lo que ya no será posible, haz esto:\n\nEscribe una carta de agradecimiento — no para enviarla, solo para ti.\n\nDale las gracias por los momentos vividos. Por lo que te enseñó. Por lo que dejó en ti, aunque no te lo propusiera. Por la versión de ti mismo que apareció mientras estaba cerca.\n\nNo tienes que fingir que no duele. Solo cambiar el punto de vista: de lo que perdiste, a lo que recibiste.',
      prompt: '¿Qué te dejó esa persona que todavía llevas contigo? ¿Qué le dirías si pudieras, sin reproches y sin tristeza?',
    },
  },
  {
    id: 'discipline',
    slug: 'disciplina',
    order: 2,
    title: 'Disciplina',
    subtitle: 'La motivación se agota. El sistema permanece',
    teachings: [
      'La disciplina no es castigarte, es mantener una promesa a ti mismo sin ganas.',
      'Las pequeñas acciones repetidas pesan más que una gran decisión tomada una sola vez.',
      'Cada vez que eliges la acción en lugar de la excusa, refuerzas quien quieres ser.',
      'El mayor enemigo de la disciplina no es la pereza — es el placer inmediato: el sofá, el teléfono, salir de fiesta con los amigos, el alcohol, las sustancias. Todo lo que promete alivio ahora y cobra el precio después.',
      'Tu entorno decide más que tu voluntad. El sofá, el teléfono al lado, el ruido de casa — cambia el lugar y cambia el rendimiento. Tu cerebro no puede rendir igual en todos lados.',
      'La rutina de la mañana no es un ritual de productividad: es el momento en que demuestras, antes de que empiece el día, que eres alguien que cumple su palabra.',
      'Hay una voz interior que dice "ya lo hago mañana", "hoy estoy cansado", "no tengo ganas". Esa voz no desaparece — pero puedes aprender a actuar sin esperarla.',
      'Un médico entra al quirófano aunque no tenga ganas. No porque sea de hierro — sino porque sabe que su deber no depende de su estado de ánimo. Tú también puedes actuar antes de sentirte listo.',
      'Cuanto más tiempo y esfuerzo dedicas a lo que amas, más rápido llegas a donde quieres estar. No hay atajo más directo que eso.',
      'No existe el éxito sin el fracaso. Cada intento fallido te acerca a la consecución del objetivo — es más importante el camino y los intentos fallidos que el logro en sí mismo.',
      'Encuentra una hora al día que sea solo tuya. Sin teléfono, sin ruido, sin nadie que te necesite. Una hora en la que lees, entrenas, te mueves, te hablas bien. No es un lujo — es el mínimo que te debes a ti mismo. Todo lo que construyes hacia afuera empieza por lo que construyes en ese silencio.',
      'La disciplina no es una característica de personalidad — es una habilidad. Se entrena igual que un músculo: con repetición, con pequeños retos diarios, con la decisión consciente de elegir lo difícil sobre lo cómodo. Nadie nace disciplinado. Se construye.',
      'El día que dejas de necesitar que alguien te empuje, que alguien te recuerde, que alguien te dé permiso — ese día empieza la verdadera disciplina.',
      'Disciplina no es hacer las cosas cuando tienes ganas. Es hacerlas sobre todo cuando no las tienes.',
    ],
    reflection:
      '¿Cuál es la acción más pequeña que podrías hacer hoy para cumplir una promesa a ti mismo?',
    extraReflections: [
      '¿Qué excusa usas más a menudo para posponer lo que sabes que tienes que hacer? ¿Qué hay detrás de esa excusa?',
      'Imagínate obteniendo la mejor versión de ti mismo — a nivel físico, mental y espiritual. ¿Cómo lo conseguirías? ¿Qué tipo de cambios tendría tu vida?',
    ],
    inRelacion:
      'Quien sabe cumplir una promesa a sí mismo, por lo general, sabe cumplirla también a quien ama — la disciplina con uno mismo es la base de la confianza con el otro.',
    practicalExercise: {
      description:
        'Todo empieza la noche anterior. Si te acuestas a medianoche o más tarde, no es lo mismo que hacerlo a las 10:30. El cuerpo no descansa igual: el tipo de sueño es diferente y la energía con la que te levantas también. Garantízate 7 u 8 horas de sueño real — eso no es perder tiempo, es la base de todo lo demás.\n\nDurante los próximos 7 días, haz esto cada mañana: levántate 30 minutos antes de lo habitual y mueve el cuerpo — lo que sea: caminar, estirar, subir escaleras. Sin teléfono hasta que hayas terminado. Y si puedes, apúntate a una clase en el gimnasio, la que sea. Ahí entra menos la voluntad cuando ya has pagado un abono o reservado una plaza. Verás que todo lo que viene después lo enfrentas con otro tipo de energía.\n\nUna cosa más: elige el entorno donde trabajas. Tu cerebro no rinde igual en el sofá que en un sitio donde hay energía y movimiento. Busca tu lugar — una cafetería, una biblioteca, un banco en la calle — y prueba a trabajar desde ahí aunque sea una vez.\n\nAl final del día, si has cumplido, date algo concreto: algo pequeño que disfrutes y que hayas reservado solo para cuando cumplas tu palabra. No como premio por haber sido bueno — sino como confirmación de que eres alguien que hace lo que dice.',
      prompt: '¿Qué cambió cuando lo hiciste igual, sin esperar las ganas?',
    },
    secondExercise: {
      description:
        'Decide ahora mismo cuál es tu hora. ¿A las 6 de la mañana antes de que empiece el día? ¿A mediodía? ¿Por la noche? Elige el momento, ponlo en el calendario, y protégelo como si fuera la reunión más importante de tu semana — porque lo es.\n\nDurante esa hora: muévete, lee algo que te haga crecer, dite en voz alta una cosa que admiras de ti mismo. No para el mundo. Para ti.\n\nSin teléfono. Sin notificaciones. Sin nadie que te necesite. Solo tú.',
      prompt: '¿Cuál es tu hora? ¿Qué harás en ella mañana?',
    },
  },
  {
    id: 'no_complaining',
    slug: 'no-te-quejes',
    order: 3,
    title: 'El placer momentáneo',
    subtitle: 'Lo que promete alivio ahora cobra el precio después',
    teachings: [
      'La dopamina es la hormona del "ir a buscar" — no del placer en sí. Se dispara cuando anticipas una recompensa: el scroll, el like, el mensaje, la copa. El problema es que cuanto más la estimulas sin esfuerzo, más necesitas para sentir lo mismo.',
      'En el gimnasio, el dolor muscular no es el fracaso — es exactamente la señal de que algo está cambiando. El placer momentáneo funciona al revés: te quita el dolor ahora, pero te cobra el precio más tarde, con intereses.',
      'Cada vez que eliges el sofá en lugar del entrenamiento, las redes en lugar del libro, la queja en lugar de la acción — no es solo una elección pequeña. Estás entrenando a tu cerebro para elegir lo fácil. Y el cerebro aprende rápido.',
      'El alcohol, las drogas, el porno, el scroll infinito: todos activan el mismo circuito de recompensa. No son problemas morales — son atajos neurológicos que con el tiempo reducen tu capacidad de sentir satisfacción con las cosas que realmente valen.',
      'La persona que va al gimnasio no disfruta del dolor — aprende a tolerar el malestar porque sabe lo que hay al otro lado. Esa misma habilidad, aplicada a tu vida, lo cambia todo.',
      'No se trata de eliminar el placer. Se trata de aprender a elegir placeres que te dejen algo después. Una cena con amigos de verdad, un libro que te cambia, un proyecto que te da miedo — todos activan dopamina. Pero la dejan crecer, no la queman.',
      'Cada mañana suena el despertador a las 5:40. No hay motivación, no hay ganas — solo la promesa que me hice a mí mismo el día anterior. Me levanto de todos modos. No porque sea fácil, sino porque sé lo que hay al otro lado: no una recompensa inmediata, sino algo mucho más valioso — una sensación constante de bienestar que se acumula día tras día. El placer momentáneo te promete todo ahora y no te deja nada. El esfuerzo repetido no te promete nada ahora — pero lo construye todo después.',
      'La queja es el placer momentáneo del pensamiento: te da alivio inmediato, pero te deja exactamente donde estabas — o peor. Cada minuto que pasas quejándote es un minuto que no estás buscando la solución.',
      'Quejarse no está mal en sí mismo. El problema es cuando se convierte en un hábito — cuando la queja sustituye a la acción y el malestar se vuelve cómodo. Porque al menos así no tienes que moverte.',
      'Hay una pregunta que cambia todo: "¿qué depende de mí aquí?" No para culparte — sino para recuperar el timón. La queja te pone en el asiento de atrás. Esa pregunta te devuelve al volante.',
      'El problema no desaparece porque lo nombras — desaparece porque actúas. La mente que busca soluciones y la mente que se queja no pueden funcionar al mismo tiempo. Tienes que elegir una.',
    ],
    reflection:
      'Piensa en el último momento en que elegiste el alivio inmediato. ¿Qué estabas evitando realmente? ¿Qué habrías hecho si ese escape no hubiera existido?',
    extraReflections: [
      '¿Hay algún hábito que sabes que te quita energía pero sigues repitiendo? ¿Qué te da a cambio — aunque sea por un momento?',
      '¿Qué harías con tu tiempo si el teléfono dejara de existir durante una semana?',
    ],
    inRelacion:
      'Quien busca constantemente estímulos fáciles acaba sintiéndose vacío con personas reales — que son complejas, imperfectas y no dan like en dos segundos.',
    practicalExercise: {
      description:
        'Instagram, TikTok, YouTube Shorts — no son culpa tuya. Están diseñados por equipos de ingenieros para que no puedas parar. Entonces necesitas un sistema, no voluntad.\n\n1. Cambia la contraseña sin mirarla.\nVe a la configuración de Instagram, cambia la contraseña con una combinación aleatoria que teclees rápido sin memorizarla. Cierra sesión. Ahora para entrar necesitas un esfuerzo real — y ese esfuerzo rompe el automatismo.\n\n2. El teléfono fuera de la habitación donde trabajas o estudias.\nNo en silencio. No boca abajo. Fuera. En otra habitación. Cada vez que lo quieras, tendrás que levantarte — y ese momento de fricción te da tiempo para decidir si realmente lo necesitas.\n\n3. Sustitución inmediata.\nCuando sientas el impulso, no lo resistas — redirigelo. Ten a mano algo concreto: un cuaderno, un proyecto a medio hacer, un libro. El cerebro no tolera el vacío — dale algo mejor.\n\n4. El castigo que entrena.\nCada vez que cedes a un placer momentáneo que habías decidido evitar — 100 flexiones. No como castigo moral. Como sistema: tu cuerpo aprende que ceder tiene un coste físico real. Y muy pronto, el cerebro empieza a calcular si el scroll de dos minutos vale el esfuerzo. Spoiler: casi nunca vale.',
      prompt: '¿Cuántas veces cogiste el teléfono hoy de forma automática, sin haberlo decidido conscientemente? ¿Qué hiciste en su lugar?',
    },
    secondExercise: {
      description:
        'Durante las próximas 24 horas, cada vez que notes que estás a punto de quejarte — en voz alta o en tu cabeza — para un momento.\n\nNo te juzgues. Solo observa.\n\nLuego hazte una sola pregunta: "¿Qué depende de mí aquí?"\n\nNo tienes que resolver nada grande. Puede ser algo pequeño: cambiar el tono, hacer una llamada, tomar una decisión que has estado aplazando. O simplemente dejar ir algo que no puedes cambiar.\n\nAl final del día, escribe una cosa concreta que hiciste en lugar de quejarte.',
      prompt: '¿Cuántas veces te sorprendiste quejándote hoy? ¿Qué encontraste cuando preguntaste "¿qué depende de mí aquí?"',
    },
  },

  {
    id: 'leap',
    slug: 'el-miedo',
    order: 4,
    title: 'El miedo',
    subtitle: 'No existe el coraje sin el miedo',
    teachings: [
      'El miedo y la ansiedad son, a su manera, útiles: nos hacen sobrevivir y nos empujan a obtener resultados mejores de los que obtendríamos sin ellos.',
      'No existen atajos. Para superar los propios miedos hay que afrontarlos — gradualmente, paso a paso. Hacerlo de golpe puede generar un trauma mayor.',
      'No podemos limitarnos a no tomar decisiones por miedo o por preocupación. Eso también es una elección — y tiene sus consecuencias.',
      '¿A quién le interesaría escuchar la historia de una persona que pasa la vida encerrada en su habitación sin haber afrontado ningún riesgo? Seguirá viva, sí. Pero ¿qué tipo de vida merece la pena ser vivida?',
      'No existe coraje sin miedo. El miedo sirve a nuestro ego para proteger nuestra supervivencia y ponernos en alerta ante situaciones de peligro. No debe ser, sin embargo, nuestra guía — si no, acaba arrastrarnos hacia la monotonía.',
      'La mayoría de las veces, una vez superado el miedo, te das cuenta de que en realidad no era para tanto. El obstáculo casi siempre es más grande en la cabeza que en la realidad.',
      'Muchas veces es el juicio severo que tenemos hacia nosotros mismos lo que nos hace ver el obstáculo mucho más grande de lo que es.',
      'Si empiezas un proyecto y fracasas, puedes empezar otro mejor con todo lo que has aprendido del fracaso anterior.',
      'De pequeño tenía dificultades para relacionarme con la gente. Las palabras me salían en voz muy baja, por miedo a decir algo estúpido o a no ser aceptado. Empecé poco a poco: pedía indicaciones en la calle aunque no las necesitara, hacía cumplidos a desconocidos, buscaba amigos con quienes pudiera expresarme. Hoy he podido organizar mi primera conferencia abierta al público. ¿Qué me habría perdido si hubiera escuchado esa voz que decía "mejor déjalo estar"?',
    ],
    reflection:
      '¿Hay algo que llevas tiempo queriendo hacer o decir y el miedo te ha impedido dar el paso? ¿Qué sería lo peor que podría pasar realmente?',
    extraReflections: [
      '¿Hay alguna decisión que postergues por miedo al juicio de los demás? ¿Qué elegirías si nadie te estuviera mirando?',
      '¿Recuerdas alguna vez que te atreviste a hacer algo que te daba miedo? ¿Qué pasó después?',
    ],
    inRelacion:
      'Esperar a "sentirse listo" para amar de verdad, o para dejar ir a quien no es el indicado, es a menudo solo miedo disfrazado de cautela.',
    practicalExercise: {
      description:
        'Elige un área en la que te sientas inseguro o carente. Toma clases, busca ayuda, y ve afrontando el miedo poco a poco. Como puede ser conducir un coche: haz las primeras prácticas con amigos que te den confianza, hasta que la práctica te dé la seguridad de poder ir solo y disfrutar esa sensación de libertad.\n\nEsfuérzate por interactuar con una persona diferente cada día. Sin presión — no tienes que encontrar al chico o a la chica de tu vida en esa ocasión. Poco a poco tendrás conversaciones cada vez más largas y agradables con personas que nunca habrías imaginado conocer.',
      prompt: '¿Qué miedo pequeño puedes afrontar esta semana? ¿Cuál sería el primer paso concreto?',
    },
    secondExercise: {
      description:
        'El malestar es un músculo. Si nunca lo entrenas, la más pequeña incomodidad te paraliza. Si lo entrenas cada día, te vuelves alguien que puede con casi todo.\n\nEl ejercicio es simple: cada mañana, oblígate a vivir una situación incómoda antes de que empiece el día.\n\nEl ejemplo más concreto: la ducha fría. Empieza con 10 segundos de agua completamente helada al final de tu ducha normal. Cada día, aumenta unos segundos. No vale hacerlo en verano si para ti el agua fría es agradable — el punto es el malestar real, no el ritual.\n\nPero no se limita a la ducha. La idea es enfrentarte cada día a algo que te dé pereza, vergüenza o miedo:\n— Habla con un desconocido.\n— Di lo que piensas cuando normalmente te callas.\n— Haz algo en público que normalmente evitarías.\n— Pide algo aunque creas que te dirán que no.\n\nAl final del día, apunta en tu Cuaderno de la incomodidad lo que afrontaste — lo encontrarás en el dashboard como icono de cuaderno 📓 al lado de la campana. No tiene que ser grande — tiene que ser real.',
      prompt: '¿Qué momento incómodo elegiste afrontar hoy? ¿Qué notaste en ti antes, durante y después?',
    },
  },
  {
    id: 'gratitude',
    slug: 'gratitud',
    order: 5,
    title: 'Gratitud',
    subtitle: 'El motor, no la meta',
    teachings: [
      'La vida es un milagro, y de por sí un regalo del que debemos ser agradecidos cada día al despertar.',
      'La gratitud no es esperar a que todo vaya bien: es dar las gracias sin prescindir del acontecimiento y haber aprendido algo de esa situación.',
      'Damos por sentadas muchas cosas que mucha gente en el mundo no tiene: poder elegir una ducha fría o caliente, decidir qué cocinar, salir a comer una pizza con amigos.',
      'La vida no siempre te da lo que crees merecer — te da lo que necesitas para crecer. Es de las situaciones más difíciles de donde vienen los cambios más fuertes.',
      'No es rico el que más posee, sino el que más da. Aprende a dar sin esperar nada a cambio.',
      'En Koh Phangan, Tailandia, con una humedad del 90% y 15 km de camino de vuelta por delante, un hombre en su moto se detuvo y ofreció un pasaje sin pedir nada a cambio. Cuando intenté comprarle algo en el 7-Eleven, lo rechazó. Y al despedirse, me dio las gracias a mí — por haber venido a visitar su isla. Ahí está todo el sentido de la gratitud: alguien que tiene poco, da mucho, y encima agradece. No esperaba nada. No necesitaba nada. Solo daba.',
    ],
    reflection:
      '¿Qué, en tu vida tal como es hoy, merecería más gratitud de la que le estás dando?',
    extraReflections: [
      '¿Hay alguien en tu vida a quien nunca le hayas dado las gracias como se merece? ¿Qué te ha impedido hacerlo?',
      '¿Qué situación difícil del pasado te ha dado algo que hoy valoras — aunque en su momento solo lo vivieras como pérdida?',
    ],
    inRelacion:
      'Se ama mejor desde un lugar de plenitud que desde un lugar de carencia — quien busca al otro para llenar un vacío, tarde o temprano, lo consume.',
    practicalExercise: {
      description:
        'Date las gracias por estar vivo cada mañana y poder disfrutar de este regalo que es la vida. Antes de levantarte, sin teléfono, nombra tres cosas concretas por las que estás agradecido hoy — no en general, sino cosas reales de tu vida ahora mismo.\n\nCuando te prepares la comida, hazlo con consciencia: hay gente en el mundo que ni siquiera puede imaginar qué comerá esta noche. No como culpa — como gratitud real por lo que tienes.\n\nPiensa en una persona que se ha portado mal contigo o que te hizo vivir un período difícil. Escribe su nombre y, en silencio, dile gracias — por lo que aprendiste de esa situación, por cómo te cambió, por la fuerza que sacaste de ahí.',
      prompt: '¿Qué apareció cuando buscaste gratitud donde antes solo veías dolor o incomodidad?',
    },
  },
  {
    id: 'observe',
    slug: 'las-emociones',
    order: 6,
    title: 'Las emociones',
    subtitle: 'No hagas la compra con el estómago vacío',
    teachings: [
      'Dejar que cualquier sentimiento o emoción prevalezca puede llevarte a tomar las peores decisiones de tu vida.',
      'Reaccionar a una provocación cegado por la rabia puede empeorar considerablemente tu situación.',
      'Tomar una decisión en un estado de desesperación te lleva a aceptar compromisos que jamás aceptarías en calma.',
      'Ir a hacer la compra con hambre — acabarás llenando el frigorífico de cosas inútiles que luego tirarás. Las emociones funcionan igual.',
      'Dejarse llevar por el pánico en una emergencia puede meterte en aún más problemas.',
      'Las mejores decisiones se toman desde un estado de tranquilidad y paz, que te permite analizar la situación y decidir con claridad.',
      'Las discusiones nacen porque ambas personas quieren imponer su razón como si fuera lo más importante del mundo. En el estado de calma — lo que los griegos llamaban Ataraxia — no hay razón ni error, ni rabia, ni rencor, ni culpa.',
      'En el trabajo he tenido muchas situaciones donde la persona al otro lado del teléfono subía el tono y con prepotencia intentaba imponer su versión. Respirando profundamente, entendí que era alguien desesperado movido por un mal estado de ánimo. Le hice ver la situación con calma, le dije que estaba de su lado y que haría lo posible para ayudarle. Terminó dejándome una reseña positiva en Trustpilot.',
    ],
    reflection:
      '¿Hay alguna decisión reciente que habrías tomado de forma diferente con la cabeza más fría?',
    extraReflections: [
      'La rabia y el rencor son dos de las peores emociones. ¿En qué momentos, al hacerles caso, has empeorado tu situación?',
      'Cuando uno está movido por la desesperación, acepta los peores compromisos. Cuenta tu peor experiencia con esta emoción.',
    ],
    inRelacion:
      'La mayoría de las peleas no nace del problema en sí, sino de una reacción dicha en el momento equivocado, con el tono equivocado. La calma no es debilidad — es la única ventaja real en un conflicto.',
    practicalExercise: {
      description:
        'Primero: en una discusión, prueba a dar la razón a tu interlocutor diciéndole que entiendes su punto de vista. Romperás su esquema mental y lo pondrás en dificultad — sin gritar, sin pelear.\n\nSegundo: hazte preguntas por escrito. Da primero una respuesta de golpe — lo que piensas en ese momento. Luego haz 4 respiraciones profundas y responde de nuevo. ¿Son iguales las dos respuestas?\n\nMuchas personas descubrirán que la segunda es diferente. No porque la respiración haya dado la respuesta correcta — sino porque ha reducido la influencia de la ansiedad, la rabia o el miedo.',
      prompt: '¿Qué diferencia notaste entre la respuesta de golpe y la respuesta en calma?',
    },
  },
  {
    id: 'obstacle',
    slug: 'el-obstaculo',
    order: 7,
    title: 'El obstáculo',
    subtitle: 'El obstáculo es el camino',
    teachings: [
      'Hay dos maneras de afrontar un obstáculo: lamentarse sin aportar ninguna solución y sucumbir ante él — o evaluar sus efectos negativos y positivos, y encontrar la manera de convertirlo a tu favor.',
      'Cuando se generan profundas crisis en la sociedad, se ocultan profundas oportunidades detrás de ellas.',
      'De los grandes problemas y necesidades nacen los negocios más fructíferos. El fundamento de cualquier buen producto es que resuelve un problema real.',
      'Cuantos más obstáculos superes, mayor será tu capacidad de adaptarte incluso en las peores situaciones — y de sacar provecho de ellas.',
      'El obstáculo no es una señal de que estás equivocado. Es el camino mismo hacia el progreso.',
      'Quien aprende a ver la dificultad como información — en lugar de como amenaza — tiene una ventaja enorme sobre quien la evita.',
      'Trabajo en una plataforma que, en ciertos aspectos, tiene muchas carencias a nivel técnico de cara al cliente final. Lo fácil habría sido ignorarlo, o quejarse sin hacer nada.\n\nEn cambio, esos mismos problemas se convirtieron en mi mayor fortaleza. Precisamente por afrontarlos de frente — buscando soluciones donde otros solo veían fallos — llegué a ser el número uno en reseñas positivas en Trustpilot en los tres países donde operamos: Inglaterra, España e Italia.\n\nEl obstáculo no era el enemigo. Era la ventaja.',
    ],
    reflection:
      '¿Hay alguna dificultad en tu vida ahora mismo que estés evitando en lugar de enfrentando? ¿Qué pasaría si intentaras convertirla a tu favor?',
    extraReflections: [
      '¿Cuál ha sido el obstáculo más grande que has superado en tu vida hasta ahora? ¿Qué te enseñó de ti mismo?',
      '¿Hay algo que consideras un fracaso pero que, mirándolo desde fuera, podría ser la base de algo mejor?',
    ],
    inRelacion:
      'Los conflictos en las relaciones son obstáculos. Quien los evita acumula distancia; quien los enfrenta — con calma y honestidad — construye algo más sólido.',
    practicalExercise: {
      description:
        'Primero: piensa en algo que te complica la vida durante el día — un trayecto largo, una espera, una tarea que detestas — y pregúntate cómo esa dificultad podría convertirse en una oportunidad. Un viaje largo en transporte público, por ejemplo, es tiempo perfecto para leer, escuchar podcasts o dejar que una idea tome forma.\n\nSegundo: piensa si alguno de tus problemas cotidianos lo comparte mucha gente a tu alrededor. ¿Cómo lo resolverías? ¿Habría alguien dispuesto a pagar por ese alivio? Los mejores negocios no nacen de ideas brillantes — nacen de problemas reales que nadie ha resuelto bien todavía.',
      prompt: '¿Qué dificultad identificaste? ¿Cómo podrías convertirla a tu favor?',
    },
  },
  {
    id: 'here_now',
    slug: 'aqui-y-ahora',
    order: 8,
    title: 'Aquí y ahora',
    subtitle: 'El mejor momento de tu vida es este',
    teachings: [
      'El pasado te ha formado — es todo lo que eres ahora. Pero no puedes cambiarlo. Seguir viviendo en él es desperdiciar lo único que sí tienes: el presente.',
      'El futuro es todo por decidir. Se construye aquí, en cada elección que tomas ahora. Lo mejor está todavía por llegar.',
      'Con la cabeza en otro lado — en lo que fue o en lo que podría ser — vives una vida imaginaria en lugar de la real.',
      'La depresión, en muchos casos, es un estado mental anclado al pasado: a algo que se perdió, a algo que no salió bien, a una versión de ti mismo que ya no existe. O anclado a lo que no se tiene — comparando el presente con una idea de lo que debería ser.',
      'Aceptar el momento presente y habitarlo de verdad es el primer paso concreto para salir de ese estado. No el único — pero sí el primero.',
      'Es una locura pensar que basta tomar una pastilla para decidir cómo estamos — y que sea ella quien decida sobre nuestro destino. Un fármaco puede aliviar, pero no puede vivir tu vida por ti. El trabajo interior no lo hace nadie más.',
      'Cada pequeño paso dado en el aquí y ahora nos acerca — o nos aleja — de nuestro objetivo. Las pequeñas acciones del día a día determinan nuestro destino. Por eso necesitamos una visión a largo plazo: saber hacia dónde vamos para no perder el rumbo en los pequeños momentos.',
      'Lo que te da placer instantáneo te aleja del foco. Los reels de Instagram, el scroll sin fin, la dopamina fácil — ofrecen al cerebro a diario una versión irreal de la vida. Esa comparación constante con lo que vemos en el teléfono es uno de los caminos más directos hacia la depresión.',
      'Después de publicar mis últimas canciones en Instagram, decidí desinstalar todas las redes sociales del teléfono. La cantidad de detalles que me perdía durante un simple paseo por el paseo marítimo o por la montaña era inmensa. Gracias a eso empecé a leer en el transporte público. Pequeñas acciones que, día a día, me acercan a lo que quiero ser.',
    ],
    reflection: '¿Dónde está tu mente en este momento? ¿En el pasado, en el futuro, o aquí?',
    extraReflections: [
      '¿Hay un recuerdo del pasado o una preocupación del futuro que tu mente repite con más frecuencia? ¿Qué necesitaría ese pensamiento para soltarse?',
      '¿Qué actividad o momento del día te pone más fácilmente en el presente? ¿Cómo podrías tener más de eso?',
    ],
    inRelacion:
      'Puedes estar sentado junto a alguien y estar completamente en otro lugar — ahí es donde una relación empieza a vaciarse, en silencio, sin que nadie lo diga.',
    practicalExercise: {
      description:
        'Desinstala las redes sociales del teléfono durante al menos 24 horas. No las "silencies" ni las ocultes — desinstálalas.\n\nEn ese tiempo, invierte los minutos que habrías dedicado al scroll en algo concreto: salir a caminar sin auriculares, leer en el transporte, sentarte en silencio cinco minutos sin hacer nada.\n\nObserva cuántos detalles del mundo real aparecen cuando dejas de mirar la pantalla. Cuántas ideas. Cuánta calma.\n\nLuego, si quieres ir un paso más allá: empieza a meditar. No hace falta una hora al día — cinco minutos bastan para empezar. Siéntate, cierra los ojos, y observa tus pensamientos pasar sin subirte a ninguno. No es fácil. Requiere tiempo, esfuerzo y constancia. Pero es el entrenamiento más directo que existe para quedarte en el aquí y ahora.',
      prompt: '¿Qué apareció cuando apagaste el ruido? ¿Qué hiciste con ese tiempo?',
    },
    secondExercise: {
      description:
        'Pregunta sencilla: ¿cuántos de vosotros os habéis duchado pensando en la ducha?\n\nSintiendo el agua. La temperatura. El sonido. El vapor.\n\nO la cabeza estaba en aquella discusión de ayer, en la reunión de mañana, en algo que alguien dijo y que todavía no has digerido.\n\nLa próxima vez que te duches, prueba esto: quédate ahí. Solo ahí. Siente el agua en la piel. Cuando la mente se vaya — y se irá — tráela de vuelta sin juzgarla. Sin drama.\n\nEs uno de los entrenamientos más simples que existen para el aquí y ahora. Y lo tienes disponible cada día.',
      prompt: '¿Pudiste quedarte en la ducha, o tu mente se fue a otro lado? ¿Adónde fue?',
    },
  },
  {
    id: 'voices',
    slug: 'las-voces',
    order: 9,
    title: 'Las voces',
    subtitle: 'Míralas pasar, no te subas',
    teachings: [
      'La mente habla sin parar. Nos juzga, nos advierte, nos convence de cosas que muchas veces no son ciertas. Y casi siempre le creemos sin cuestionarla.',
      'Lo que vales y lo que eres, solo tú lo decides. Nadie más.',
      'Es fundamental implementar en nuestra mente palabras afectivas, buenas, de amor hacia nosotros mismos. La mente se puede reprogramar.',
      'La mente no hace otra cosa que proyectar preocupaciones o hechos del pasado que han marcado tu existencia. Déjalos pasar como si nada — no son el presente.',
      'Háblate a ti mismo con un lenguaje de amor, como si fueras tu mejor novio o tu mejor novia. Dite cosas bonitas. Inserta esos mensajes en tu cabeza con intención.',
      'Lo que nos define es lo que hacemos y decimos en el momento presente. Solo eso importa — no la voz, sino lo que eliges hacer mientras la escuchas.',
      'Prueba esto: intenta convencerte mentalmente de que no puedes levantar el brazo. Y luego levántalo. Puedes — incluso doblarlo. Eso te da una idea de la relevancia real de esas voces: eres tú quien decide si son verdad o no.',
      'Se cuenta que durante ciertos entrenamientos militares, algunos soldados o prisioneros vendados, convencidos de estar atados con cuerdas resistentes, no intentaban siquiera liberarse — aunque las cuerdas ya hubieran sido retiradas. Una convicción puede limitar el comportamiento más que la realidad misma.',
      'Durante más de 30 años me dirigí a mí mismo con insultos y palabras de mal gusto. Eso provocó un efecto burnout — un agotamiento profundo que tardé mucho en entender. Piénsalo así: imagina tener una relación con tu pareja y llenarla de insultos durante toda la vida. ¿Cómo suele acabar ese tipo de relación? Exactamente igual acaba la relación contigo mismo cuando te hablas así.',
    ],
    reflection:
      '¿Cuál es la voz que escuchas con más frecuencia, la que te dice que no eres suficiente? ¿Qué pasa si la miras pasar en lugar de creerle?',
    extraReflections: [
      '¿De quién crees que viene esa voz? ¿La reconoces en alguien de tu historia?',
      'Si le hablaras a tu mejor amigo como te hablas a ti mismo, ¿seguiría siendo tu amigo? ¿Qué cambiarías?',
    ],
    inRelacion:
      'Quien siempre cree a la voz que dice "no soy suficiente" suele buscar en el otro una prueba del contrario que ninguna relación puede dar para siempre.',
    practicalExercise: {
      description:
        'Ve solo a dar un paseo por la naturaleza — descarga una app de rutas, hay muchísimos caminos fáciles y accesibles. Pon el modo avión y sigue solo el camino. Siente tus pensamientos en medio de un bosque y déjalos pasar. Te darás cuenta de que no pasa nada: las voces llegan, y se van.\n\nAntes de dormir, reprograma tu mente con un mantra. Construye dos o tres frases sobre ti mismo que quieras que sean verdad — algo que te gustaría creer de ti. Repítelas en voz baja cinco veces antes de cerrar los ojos. Cuantas más veces te repites algo, el cerebro lo hace suyo y real, aunque al principio no lo creas del todo. No se reprograma de un día para otro — necesita tiempo y constancia. Sé constante.',
      prompt: '¿Qué frases elegiste para tu mantra? ¿Cómo te sentiste repitiéndolas?',
    },
  },
  {
    id: 'mirror',
    slug: 'el-espejo',
    order: 10,
    title: 'El espejo',
    subtitle: 'Cuando cambias tú, cambia lo que ves',
    teachings: [
      'Presta atención a lo que dices cuando hablas mal de alguien. Muchas veces, cuando juzgamos a los demás, estamos hablando de nosotros mismos — en distinta escala, pero los mismos patrones.',
      'El rencor hacia alguien dice más de ti que de él.',
      'Seguramente tienes ejemplos de personas que al principio no podías ni ver — y que en algún momento empezaron a caerte bien sin saber muy bien por qué. ¿Quién cambió realmente? ¿Ellos, o tú?',
      'Lo más fácil es siempre ser la víctima: dar la culpa a los demás de lo que nos va mal, de lo que no somos, de lo que no tenemos. Pero mientras estamos en ese papel, no cambia nada.',
      'Los traumas familiares pesan — y a menudo no es culpa nuestra haberlos cargado. Pero guardar rencor hacia quienes nos los dieron no nos libera: nos encadena. En su cabeza, hicieron lo máximo que sabían hacer.',
      'Perdónate por lo que fuiste en el pasado. Cuando lo hagas, es probable que también puedas perdonar a los demás — no para ellos, sino para ti.',
      'No juzgues a los demás como no deberías juzgarte a ti mismo. El juicio que aplicas fuera es casi siempre el mismo que te aplicas dentro.',
      'De joven, años de terapia me llevaron a identificar en la relación con mi padre la causa de mi falta de autoestima. Durante mucho tiempo cargué con ese peso como víctima. El cambio llegó cuando dejé de mirar lo que no había tenido y empecé a mirar a quienes no habían tenido ni eso: niños nacidos en orfanatos, en zonas de guerra, sin nada. Entendí que mi padre, con sus límites, había hecho lo máximo que sabía hacer. Lo perdoné. La relación no cambió — pero los encuentros con él dejaron de vivirlos con esa angustia. Fue como quitarme un peso enorme del estómago.',
    ],
    reflection:
      '¿Hay algún rencor muy grande que todavía sientes hacia otra persona después de años? ¿Y por qué?',
    extraReflections: [
      '¿Hay algo que criticas en los demás que, si eres honesto, reconoces también en ti mismo?',
      '¿Qué parte de ti mismo te cuesta más aceptar? ¿Qué haría falta para perdonarte por eso?',
    ],
    inRelacion:
      'Cambiar a uno mismo es a menudo lo que, sin esforzarse por lograrlo, cambia también cómo se comportan las personas a tu alrededor.',
    practicalExercise: {
      description:
        'Piensa en aquellas situaciones o personas que después de 20 años o más todavía te generan rencor. Si te pones a analizarlas, verás que han tenido efectos positivos y negativos — en perfecto equilibrio. Haz las paces con esos hechos, acéptalos y da las gracias por haberlos vivido. Si empiezas por perdonarte a ti mismo, hacerlo con los demás será todavía más fácil.\n\nToma un papel. Escribe el nombre de una persona que te molesta y completa la frase: "Esta persona es..." — 5 adjetivos, sin pensarlo demasiado. Luego relee cada uno sustituyendo el inicio por: "Una parte de mí es..." o "Yo, a veces, soy..." Pregúntate: ¿por qué precisamente este comportamiento me afecta tanto? Casi siempre la respuesta tiene que ver con algo que conocemos muy bien dentro de nosotros.',
      prompt: '¿Qué adjetivos de tu lista te costó más reconocer en ti mismo?',
    },
  },
  {
    id: 'healthy_relationships',
    slug: 'relaciones-sanas',
    order: 11,
    title: 'Relaciones sanas',
    subtitle: 'Dos vidas enteras, no una a medias',
    unlockNotice:
      'Para llegar hasta aquí has tenido que leer, comprender y trabajar todas las áreas anteriores. No es casualidad que sea la última. Una relación con otra persona solo puede ser sana si primero tienes una relación sana contigo mismo.',
    teachings: [
      'Nos quejamos todo el tiempo de que las relaciones ya no duran, de que falta afecto, inteligencia emocional, compromiso. Pero siempre echando la culpa al otro. Antes de mirar afuera, hazte la pregunta: ¿cómo estoy yo? ¿He trabajado en mí mismo? ¿Qué tipo de relación tengo conmigo?',
      'Para construir una relación con otra persona hace falta — escúchalo bien — trabajo, esfuerzo, conversación, y compromiso. No es un estado que llegas y te quedas: es algo que se construye cada día.',
      'No busques a alguien que te complete. Cada uno ya es completo a su manera. Si buscas a alguien que llene un vacío que tienes dentro, lo estás haciendo al revés. Se trata de compartir una vida — no de necesitar a alguien para tener una.',
      'Una vez que la relación existe, es fundamental construir proyectos juntos: ¿casarse? ¿hijos? ¿una casa? ¿un negocio? Una relación sin horizonte compartido tiende a vaciarse. Necesitáis algo hacia donde mirar juntos.',
      'Mantén tu individualidad y tus espacios. No seas dependiente emocionalmente del otro. De una forma u otra, esa persona puede no estar — y sin ella sigues siendo tú. Eso no es frialdad: es salud.',
      'No des nunca por sentado al otro. Seguir probando cosas nuevas juntos es el primer paso para no caer en la monotonía. La rutina no mata las relaciones — la indiferencia dentro de la rutina sí.',
      'Establece límites y sé honesto contigo mismo a la hora de hacerlos respetar. Sin confianza en el otro no puede construirse nada sólido. Y si el deseo de controlar al otro es insaciable — si nunca es suficiente — quizás el problema no es la confianza en él o en ella, sino en ti mismo.',
      'En mi relación anterior entendí que los dos, respectivamente, habíamos cruzado nuestros propios límites para estar juntos. Era una relación nacida más de la necesidad de no estar solos que de otra cosa. Rompimos y lo intentamos varias veces — pero si mientras tanto no se han sanado las propias heridas, el dolor vuelve más fuerte que antes.',
      'El tantra es una filosofía ancestral que ve el acto de hacer el amor no como un placer momentáneo, sino como un camino hacia algo más profundo — una unión que trasciende lo físico y nos acerca a lo divino. Estudiarlo con tu pareja es, en sí mismo, un acto de intimidad.',
    ],
    reflection:
      '¿Buscas en el otro a alguien que te complete, o a alguien con quien compartir lo que ya eres? ¿Hay algún límite tuyo que hayas cruzado — o dejado cruzar — para mantener una relación?',
    extraReflections: [
      '¿Hay algo que nunca le has dicho a alguien importante en tu vida pero que llevas tiempo necesitando decir?',
      '¿Qué aprendiste de tus relaciones pasadas — románticas, familiares o de amistad — que hoy aplicas de forma diferente?',
    ],
    inRelacion:
      'Todo lo que has trabajado antes — aceptación, disciplina, presencia, gratitud — converge aquí. Esta área es el resultado de todas las demás.',
    practicalExercise: {
      description:
        'Establece rituales con la otra persona — cosas concretas que hacéis juntos con regularidad. Una caminata el domingo. El cine una vez al mes. Una sesión de yoga. Una partida de cartas. No importa qué sea: lo que importa es la frecuencia y que sea vuestro. Los rituales crean afinidad y os obligan a tener conversaciones — incluso las incómodas — que de otra forma nunca llegan.\n\nY alternaos en proponer planes. Una semana uno organiza una escapada. La siguiente, el otro. En una relación, el esfuerzo tiene que ser recíproco. Cuando solo uno lleva el peso, la relación se desequilibra — aunque ninguno de los dos lo diga en voz alta.\n\n— — —\n\nTres prácticas tántricas para explorar juntos:\n\n1. Tumbados el uno junto al otro, desnudos, mírate en el ojo izquierdo de tu pareja durante varios minutos. Sin hablar. Sin prisa. Deja que el silencio haga su trabajo.\n\n2. Respirad al mismo tiempo: inhala cuando inhala el otro, exhala cuando exhala. Poco a poco, los dos cuerpos empiezan a moverse como uno solo.\n\n3. Contacto corporal sin ningún fin sexual: simplemente estar, piel con piel, sin que haya un "después". Muchas parejas descubren que este momento de presencia pura es más íntimo que cualquier otra cosa.',
      prompt: '¿Qué ritual podrías proponer esta semana? ¿Y cuál de las tres prácticas tántricas te da más curiosidad explorar con tu pareja?',
    },
  },
]

export const AREA_MAP = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<
  string,
  AreaDefinition
>

export const AREA_TITLES_EN: Record<string, string> = {
  acceptance: 'Acceptance',
  discipline: 'Discipline',
  no_complaining: 'Momentary Pleasure',
  leap: 'Fear',
  gratitude: 'Gratitude',
  observe: 'Emotions',
  obstacle: 'The Obstacle',
  here_now: 'Here & Now',
  voices: 'The Voices',
  mirror: 'The Mirror',
  healthy_relationships: 'Healthy Relationships',
}
