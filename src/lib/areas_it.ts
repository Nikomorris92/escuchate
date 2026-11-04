import { AreaDefinition } from '@/types'

const AREAS_IT: AreaDefinition[] = [
  {
    id: 'acceptance',
    slug: 'accettazione',
    order: 1,
    title: 'Accettazione',
    subtitle: 'Ciò che resisti, persiste',
    teachings: [
      "Nell'accettazione dei fatti risiede il nostro benessere. Non possiamo controllare tutto ciò che ci accade nella vita — e ci sono cose che non dipendono da noi, soprattutto quando si tratta delle scelte degli altri.",
      "La sofferenza non viene dal dolore in sé. Viene dalla lotta continua contro una realtà che non possiamo cambiare. Ogni volta che la mente rifiuta ciò che è già accaduto, quella resistenza ha un costo — e in casi estremi può essere il detonatore di malattie reali: problemi digestivi, insonnia, tensione cronica. Il corpo paga ciò che la mente non risolve.",
      "Accettare non significa arrendersi. Tutti i grandi cambiamenti partono da una fase di accettazione. Prima vedi quello che c'è — poi puoi muovere qualcosa. Senza quel primo passo, sprechi energia a combattere contro ciò che è già avvenuto.",
      "Non possiamo pretendere di controllare le scelte degli altri. Non è nelle nostre mani. Quello che è nelle nostre mani è come rispondiamo quando quelle scelte ci toccano.",
      "Quando si ha il cuore pieno di bontà e amore, è molto più facile accettare anche gli eventi che a prima vista sembrano avversi. Non perché facciano meno male — ma da lì si vede più lontano.",
      "Non è il dolore a farci soffrire di più, ma la resistenza continua a una realtà che non possiamo cambiare. Lasciare andare quella resistenza non significa che non ti importa — significa che ti importi abbastanza da non distruggerti.",
      "Da giovane mi sono innamorato di una ragazza che viveva in Australia. Mi aveva promesso che sarebbe tornata in Italia e che avremmo potuto avere la nostra storia. Non è successo. Un giorno mi chiamò per dirmi che sarebbe rimasta lì. Due anni dopo, prima di partire per la Spagna, tornò per alcune pratiche mediche — e nemmeno in quella occasione ci vedemmo. Accettare tutto ciò anni prima, e guardare avanti, mi avrebbe risparmiato anni di sofferenza. L'ho capito tardi. Ma l'ho capito.",
      "C'è una differenza tra rassegnarsi e accettare. La rassegnazione dice: \"non posso fare nulla, quindi mi arrendo.\" L'accettazione dice: \"questo è quello che c'è — ora, cosa faccio con questo?\" Una ti paralizza. L'altra ti dà potere.",
    ],
    reflection:
      "C'è qualcosa che è accaduto — una situazione, una scelta di qualcun altro, qualcosa che non è andata come speravi — contro cui stai ancora combattendo? Cosa cambierebbe se, solo per oggi, smettessi di farlo?",
    extraReflections: [
      "C'è qualcosa di te stesso che non hai ancora del tutto accettato? Come sarebbe trattarti con la stessa comprensione che daresti a un amico?",
      "Se potessi parlare con la versione di te che ha vissuto quel momento difficile, cosa le diresti?",
    ],
    inRelacion:
      "Chi non accetta sé stesso tende a cercare nell'altro la conferma che non riesce a darsi — ed è un peso che nessuna relazione regge a lungo.",
    practicalExercise: {
      description:
        "Chiudi il pugno con tutta la tua forza.\n\nTienilo chiuso per un minuto intero.\n\nOra rispondi: fa male?\n\nSì. Ora apri lentamente la mano.\n\nIl sollievo è immediato.\n\nQuel pugno sei tu quando ti resisti alla realtà. Più stringi, più soffri. Aprire la mano non cambia ciò che è successo — ma ti restituisce l'energia che stavi spendendo a tenere il dolore.",
      prompt: "Cos'è che stringi nel pugno da tempo? Cosa succederebbe se aprissi la mano?",
    },
    secondExercise: {
      description:
        "Pensa a una persona che non fa più parte della tua vita — qualcuno che apprezzi, o che apprezzavi, e che per qualche motivo se ne è andato, si è allontanato, o semplicemente le cose tra voi non hanno potuto essere.\n\nInvece di rimuginare su quello che avrebbe potuto essere, o su quello che non sarà più possibile, fai questo:\n\nScrivi una lettera di ringraziamento — non per inviarla, solo per te.\n\nRingraziala per i momenti vissuti. Per quello che ti ha insegnato. Per quello che ha lasciato in te, anche senza volerlo. Per la versione di te stesso che è emersa mentre era vicina.\n\nNon devi fingere che non faccia male. Solo cambiare punto di vista: da quello che hai perso, a quello che hai ricevuto.",
      prompt: "Cosa ti ha lasciato quella persona che porti ancora con te? Cosa le diresti se potessi, senza rimpianti e senza tristezza?",
    },
  },
  {
    id: 'discipline',
    slug: 'disciplina',
    order: 2,
    title: 'Disciplina',
    subtitle: 'La motivazione finisce. Il sistema resta',
    teachings: [
      "La disciplina non è punirti, è mantenere una promessa a te stesso senza averne voglia.",
      "Le piccole azioni ripetute pesano più di una grande decisione presa una volta sola.",
      "Ogni volta che scegli l'azione al posto della scusa, rafforzi chi vuoi essere.",
      "Il nemico più grande della disciplina non è la pigrizia — è il piacere immediato: il divano, il telefono, uscire a fare festa con gli amici, l'alcol, le sostanze. Tutto ciò che promette sollievo adesso e paga il prezzo dopo.",
      "Il tuo ambiente decide più della tua volontà. Il divano, il telefono vicino, il rumore di casa — cambia il posto e cambia il rendimento. Il tuo cervello non può rendere allo stesso modo ovunque.",
      "La routine mattutina non è un rituale di produttività: è il momento in cui dimostri, prima che inizi la giornata, di essere qualcuno che mantiene la parola.",
      "C'è una voce interiore che dice \"lo faccio domani\", \"oggi sono stanco\", \"non ho voglia\". Quella voce non scompare — ma puoi imparare ad agire senza aspettarla.",
      "Un medico entra in sala operatoria anche senza averne voglia. Non perché sia di ferro — ma perché sa che il suo dovere non dipende dal suo stato d'animo. Anche tu puoi agire prima di sentirti pronto.",
      "Più tempo ed energia dedichi a ciò che ami, prima arrivi dove vuoi essere. Non esiste scorciatoia più diretta.",
      "Non esiste il successo senza il fallimento. Ogni tentativo fallito ti avvicina all'obiettivo — è più importante il percorso e i tentativi falliti che il risultato in sé.",
      "Trovati un'ora al giorno che sia solo tua. Senza telefono, senza rumore, senza nessuno che abbia bisogno di te. Un'ora in cui leggi, ti alleni, ti muovi, ti parli bene. Non è un lusso — è il minimo che devi a te stesso. Tutto quello che costruisci fuori inizia da quello che costruisci in quel silenzio.",
      "La disciplina non è una caratteristica della personalità — è un'abilità. Si allena come un muscolo: con la ripetizione, con piccole sfide quotidiane, con la decisione consapevole di scegliere il difficile sul comodo. Nessuno nasce disciplinato. Si costruisce.",
      "Il giorno in cui smetti di aver bisogno che qualcuno ti spinga, ti ricordi, ti dia il permesso — quel giorno inizia la vera disciplina.",
      "La disciplina non è fare le cose quando hai voglia. È farle soprattutto quando non ce l'hai.",
    ],
    reflection:
      "Qual è la piccola azione che potresti fare oggi per mantenere una promessa a te stesso?",
    extraReflections: [
      "Quale scusa usi più spesso per rimandare ciò che sai di dover fare? Cosa c'è dietro quella scusa?",
      "Immagina di ottenere la migliore versione di te stesso — a livello fisico, mentale e spirituale. Come ci arriveresti? Che tipo di cambiamenti avrebbe la tua vita?",
    ],
    inRelacion:
      "Chi sa mantenere una promessa a sé stesso, in genere, sa mantenerla anche a chi ama — la disciplina con sé stessi è la base della fiducia con l'altro.",
    practicalExercise: {
      description:
        "Tutto inizia la sera prima. Se vai a letto a mezzanotte o più tardi, non è la stessa cosa che farlo alle 22:30. Il corpo non riposa allo stesso modo: il tipo di sonno è diverso e l'energia con cui ti svegli anche. Garantisciti 7 o 8 ore di sonno vero — non è perdere tempo, è la base di tutto il resto.\n\nNei prossimi 7 giorni, fai questo ogni mattina: alzati 30 minuti prima del solito e muovi il corpo — qualunque cosa: camminare, stretching, salire le scale. Senza telefono finché non hai finito. E se puoi, iscriviti a una classe in palestra, quale che sia. Lì entra meno la volontà quando hai già pagato un abbonamento o prenotato un posto. Vedrai che tutto quello che viene dopo lo affronti con un altro tipo di energia.\n\nUna cosa in più: scegli l'ambiente dove lavori. Il tuo cervello non rende allo stesso modo sul divano e in un posto dove c'è energia e movimento. Trova il tuo posto — un bar, una biblioteca, una panchina in strada — e prova a lavorarci anche solo una volta.\n\nA fine giornata, se hai rispettato, darti qualcosa di concreto: qualcosa di piccolo che ti piace e che hai riservato solo per quando mantieni la parola. Non come premio per essere stato bravo — ma come conferma di essere qualcuno che fa ciò che dice.",
      prompt: "Cos'è cambiato quando l'hai fatto lo stesso, senza aspettare la voglia?",
    },
    secondExercise: {
      description:
        "Decidi subito qual è la tua ora. Alle 6 del mattino prima che inizi la giornata? A mezzogiorno? La sera? Scegli il momento, mettilo in calendario, e proteggilo come se fosse la riunione più importante della tua settimana — perché lo è.\n\nDurante quell'ora: muoviti, leggi qualcosa che ti faccia crescere, dì ad alta voce una cosa che ammiri di te stesso. Non per il mondo. Per te.\n\nSenza telefono. Senza notifiche. Senza nessuno che abbia bisogno di te. Solo tu.",
      prompt: "Qual è la tua ora? Cosa farai in essa domani?",
    },
  },
  {
    id: 'no_complaining',
    slug: 'piacere-momentaneo',
    order: 3,
    title: 'Il piacere momentaneo',
    subtitle: 'Ciò che promette sollievo adesso paga il prezzo dopo',
    teachings: [
      "La dopamina è l'ormone dell'\"andare a cercare\" — non del piacere in sé. Si attiva quando anticipi una ricompensa: lo scroll, il like, il messaggio, il bicchiere. Il problema è che più la stimoli senza sforzo, più ne hai bisogno per sentire la stessa cosa.",
      "In palestra, il dolore muscolare non è il fallimento — è esattamente il segnale che qualcosa sta cambiando. Il piacere momentaneo funziona al contrario: ti toglie il dolore adesso, ma ti fa pagare il prezzo dopo, con gli interessi.",
      "Ogni volta che scegli il divano al posto dell'allenamento, i social al posto del libro, il lamento al posto dell'azione — non è solo una piccola scelta. Stai addestrando il tuo cervello a scegliere il facile. E il cervello impara in fretta.",
      "L'alcol, le droghe, il porno, lo scroll infinito: tutti attivano lo stesso circuito di ricompensa. Non sono problemi morali — sono scorciatoie neurologiche che nel tempo riducono la tua capacità di sentire soddisfazione per le cose che valgono davvero.",
      "La persona che va in palestra non gode del dolore — impara a tollerare il disagio perché sa cosa c'è dall'altra parte. Quella stessa abilità, applicata alla tua vita, cambia tutto.",
      "Non si tratta di eliminare il piacere. Si tratta di imparare a scegliere piaceri che ti lascino qualcosa dopo. Una cena con amici veri, un libro che ti cambia, un progetto che ti spaventa — tutti attivano dopamina. Ma la lasciano crescere, non la bruciano.",
      "Ogni mattina la sveglia suona alle 5:40. Non c'è motivazione, non c'è voglia — solo la promessa che ho fatto a me stesso il giorno prima. Mi alzo lo stesso. Non perché sia facile, ma perché so cosa c'è dall'altra parte: non una ricompensa immediata, ma qualcosa di molto più prezioso — una sensazione costante di benessere che si accumula giorno dopo giorno. Il piacere momentaneo ti promette tutto adesso e non ti lascia nulla. Lo sforzo ripetuto non ti promette nulla adesso — ma lo costruisce tutto dopo.",
      "Il lamento è il piacere momentaneo del pensiero: ti dà sollievo immediato, ma ti lascia esattamente dove eri — o peggio. Ogni minuto che passi a lamentarti è un minuto in cui non stai cercando la soluzione.",
      "Lamentarsi non è sbagliato di per sé. Il problema è quando diventa un'abitudine — quando il lamento sostituisce l'azione e il disagio diventa comodo. Perché così almeno non devi muoverti.",
      "C'è una domanda che cambia tutto: \"Cosa dipende da me qui?\" Non per colpevolizzarti — ma per riprendere il timone. Il lamento ti mette sul sedile posteriore. Quella domanda ti riporta al volante.",
      "Il problema non sparisce perché lo nomini — sparisce perché agisci. La mente che cerca soluzioni e la mente che si lamenta non possono funzionare allo stesso tempo. Devi sceglierne una.",
    ],
    reflection:
      "Pensa all'ultimo momento in cui hai scelto il sollievo immediato. Cosa stavi evitando davvero? Cosa avresti fatto se quella via di fuga non fosse esistita?",
    extraReflections: [
      "C'è qualche abitudine che sai che ti toglie energia ma continui a ripetere? Cosa ti dà in cambio — anche solo per un momento?",
      "Cosa faresti del tuo tempo se il telefono smettesse di esistere per una settimana?",
    ],
    inRelacion:
      "Chi cerca costantemente stimoli facili finisce per sentirsi vuoto con persone reali — che sono complesse, imperfette e non danno like in due secondi.",
    practicalExercise: {
      description:
        "Instagram, TikTok, YouTube Shorts — non è colpa tua. Sono progettati da team di ingegneri perché tu non possa smettere. Quindi hai bisogno di un sistema, non di volontà.\n\n1. Cambia la password senza guardarla.\nVai nelle impostazioni di Instagram, cambia la password con una combinazione casuale digitata velocemente senza memorizzarla. Esci. Ora per entrare ti serve uno sforzo reale — e quello sforzo rompe l'automatismo.\n\n2. Il telefono fuori dalla stanza dove lavori o studi.\nNon in silenzio. Non a faccia in giù. Fuori. In un'altra stanza. Ogni volta che lo vuoi, dovrai alzarti — e quel momento di attrito ti dà il tempo di decidere se ne hai davvero bisogno.\n\n3. Sostituzione immediata.\nQuando senti l'impulso, non resistergli — reindirizzalo. Tieni a portata di mano qualcosa di concreto: un quaderno, un progetto a metà, un libro. Il cervello non tollera il vuoto — dagli qualcosa di meglio.\n\n4. La penalità che allena.\nOgni volta che cedi a un piacere momentaneo che avevi deciso di evitare — 100 flessioni. Non come punizione morale. Come sistema: il tuo corpo impara che cedere ha un costo fisico reale. E presto il cervello inizia a calcolare se lo scroll di due minuti vale lo sforzo. Spoiler: quasi mai vale.",
      prompt: "Quante volte hai preso il telefono oggi in modo automatico, senza averlo deciso consapevolmente? Cosa hai fatto al posto?",
    },
    secondExercise: {
      description:
        "Nelle prossime 24 ore, ogni volta che noti che stai per lamentarti — ad alta voce o nella tua testa — fermati un momento.\n\nNon giudicarti. Osserva soltanto.\n\nPoi fatti una sola domanda: \"Cosa dipende da me qui?\"\n\nNon devi risolvere nulla di grande. Può essere qualcosa di piccolo: cambiare il tono, fare una telefonata, prendere una decisione che hai rimandato. O semplicemente lasciare andare qualcosa che non puoi cambiare.\n\nA fine giornata, scrivi una cosa concreta che hai fatto al posto di lamentarti.",
      prompt: "Quante volte ti sei sorpreso a lamentarti oggi? Cosa hai trovato quando hai chiesto \"Cosa dipende da me qui?\"",
    },
  },
  {
    id: 'leap',
    slug: 'la-paura',
    order: 4,
    title: 'La paura',
    subtitle: 'Non esiste coraggio senza paura',
    teachings: [
      "La paura e l'ansia sono, a loro modo, utili: ci fanno sopravvivere e ci spingono a ottenere risultati migliori di quelli che otterremmo senza di loro.",
      "Non esistono scorciatoie. Per superare le proprie paure bisogna affrontarle — gradualmente, passo dopo passo. Farlo di colpo può generare un trauma maggiore.",
      "Non possiamo limitarci a non prendere decisioni per paura o preoccupazione. Anche quella è una scelta — e ha le sue conseguenze.",
      "Chi vorrebbe ascoltare la storia di qualcuno che passa la vita chiuso nella propria stanza senza aver affrontato nessun rischio? Sarà ancora vivo, sì. Ma che tipo di vita vale la pena essere vissuta?",
      "Non esiste coraggio senza paura. La paura serve al nostro ego per proteggere la sopravvivenza e metterci in allerta di fronte a situazioni di pericolo. Non deve essere, però, la nostra guida — altrimenti finisce per trascinarci verso la monotonia.",
      "La maggior parte delle volte, una volta superata la paura, ti rendi conto che in realtà non era così grave. L'ostacolo è quasi sempre più grande nella testa che nella realtà.",
      "Molte volte è il giudizio severo che abbiamo verso noi stessi a farci vedere l'ostacolo molto più grande di quello che è.",
      "Se inizi un progetto e fallisci, puoi iniziarne un altro migliore con tutto quello che hai imparato dal fallimento precedente.",
      "Da piccolo avevo difficoltà a relazionarmi con le persone. Le parole mi uscivano a voce molto bassa, per paura di dire qualcosa di stupido o di non essere accettato. Ho iniziato poco a poco: chiedevo indicazioni per strada anche se non ne avevo bisogno, facevo complimenti a sconosciuti, cercavo amici con cui potessi esprimermi. Oggi ho organizzato la mia prima conferenza aperta al pubblico. Cosa mi sarei perso se avessi ascoltato quella voce che diceva \"meglio lascia stare\"?",
    ],
    reflection:
      "C'è qualcosa che da tempo vorresti fare o dire e la paura ti ha impedito di fare il passo? Qual sarebbe il peggio che potrebbe accadere davvero?",
    extraReflections: [
      "C'è qualche decisione che rimandi per paura del giudizio degli altri? Cosa sceglieresti se nessuno ti stesse guardando?",
      "Ricordi una volta in cui hai avuto il coraggio di fare qualcosa che ti spaventava? Cosa è successo dopo?",
    ],
    inRelacion:
      "Aspettare di \"sentirsi pronti\" per amare davvero, o per lasciare andare chi non fa per te, è spesso solo paura travestita da cautela.",
    practicalExercise: {
      description:
        "Scegli un'area in cui ti senti insicuro o carente. Prendi lezioni, cerca aiuto, e vai affrontando la paura poco a poco. Come può essere guidare una macchina: fai le prime esercitazioni con amici che ti diano fiducia, finché la pratica non ti dà la sicurezza di poter andare da solo e godere di quella sensazione di libertà.\n\nSforzati di interagire con una persona diversa ogni giorno. Senza pressione — non devi trovare il ragazzo o la ragazza della tua vita in quell'occasione. Poco a poco avrai conversazioni sempre più lunghe e piacevoli con persone che non avresti mai immaginato di conoscere.",
      prompt: "Quale piccola paura puoi affrontare questa settimana? Quale sarebbe il primo passo concreto?",
    },
    secondExercise: {
      description:
        "Il disagio è un muscolo. Se non lo alleni mai, il minimo fastidio ti paralizza. Se lo alleni ogni giorno, diventi qualcuno che riesce a gestire quasi tutto.\n\nL'esercizio è semplice: ogni mattina, obbligati a vivere una situazione scomoda prima che inizi la giornata.\n\nL'esempio più concreto: la doccia fredda. Inizia con 10 secondi di acqua completamente gelata alla fine della tua doccia normale. Ogni giorno, aumenta qualche secondo. Non vale farlo in estate se per te l'acqua fredda è piacevole — il punto è il disagio reale, non il rituale.\n\nMa non si limita alla doccia. L'idea è affrontare ogni giorno qualcosa che ti dà pigrizia, imbarazzo o paura:\n— Parla con uno sconosciuto.\n— Dì quello che pensi quando di solito taci.\n— Fai qualcosa in pubblico che normalmente eviteresti.\n— Chiedi qualcosa anche se credi che ti diranno di no.\n\nA fine giornata, annota nel tuo Quaderno del disagio cosa hai affrontato — lo trovi nella dashboard come icona di quaderno 📓 accanto alla campana. Non deve essere grande — deve essere reale.",
      prompt: "Quale momento scomodo hai scelto di affrontare oggi? Cosa hai notato in te prima, durante e dopo?",
    },
  },
  {
    id: 'gratitude',
    slug: 'gratitudine',
    order: 5,
    title: 'Gratitudine',
    subtitle: 'Il motore, non la meta',
    teachings: [
      "La vita è un miracolo, e di per sé un regalo per cui dovremmo essere grati ogni mattina al risveglio.",
      "La gratitudine non è aspettare che vada tutto bene: è ringraziare senza prescindere dall'evento e aver imparato qualcosa da quella situazione.",
      "Diamo per scontate molte cose che moltissime persone nel mondo non hanno: poter scegliere una doccia fredda o calda, decidere cosa cucinare, uscire a mangiare una pizza con gli amici.",
      "La vita non ti dà sempre quello che credi di meritare — ti dà quello di cui hai bisogno per crescere. È dalle situazioni più difficili che arrivano i cambiamenti più profondi.",
      "Non è ricco chi possiede di più, ma chi dà di più. Impara a dare senza aspettarti nulla in cambio.",
      "A Koh Phangan, Tailandia, con un'umidità del 90% e 15 km di strada del ritorno davanti, un uomo in moto si è fermato e ha offerto un passaggio senza chiedere nulla. Quando ho cercato di comprargli qualcosa al 7-Eleven, ha rifiutato. E al momento del saluto, ha ringraziato me — per essere venuto a visitare la sua isola. Lì c'è tutto il senso della gratitudine: qualcuno che ha poco, dà molto, e per giunta ringrazia. Non si aspettava nulla. Non aveva bisogno di nulla. Dava soltanto.",
    ],
    reflection:
      "Cosa nella tua vita, così com'è oggi, meriterebbe più gratitudine di quanta gliene stai dando?",
    extraReflections: [
      "C'è qualcuno nella tua vita a cui non hai mai detto grazie come si merita? Cosa te l'ha impedito?",
      "Qual è una situazione difficile del passato che ti ha dato qualcosa che oggi apprezzi — anche se sul momento l'hai vissuta solo come perdita?",
    ],
    inRelacion:
      "Si ama meglio da un luogo di pienezza che da un luogo di mancanza — chi cerca l'altro per riempire un vuoto, prima o poi, lo consuma.",
    practicalExercise: {
      description:
        "Ringrazia ogni mattina per essere vivo e poter godere di questo regalo che è la vita. Prima di alzarti, senza telefono, nomina tre cose concrete per cui sei grato oggi — non in generale, ma cose reali della tua vita in questo momento.\n\nQuando prepari da mangiare, fallo con consapevolezza: ci sono persone nel mondo che non riescono nemmeno a immaginare cosa mangeranno stasera. Non come senso di colpa — come gratitudine reale per quello che hai.\n\nPensa a una persona che si è comportata male con te o che ti ha fatto vivere un periodo difficile. Scrivi il suo nome e, in silenzio, dille grazie — per quello che hai imparato da quella situazione, per come ti ha cambiato, per la forza che ne hai tratto.",
      prompt: "Cosa è emerso quando hai cercato gratitudine dove prima vedevi solo dolore o disagio?",
    },
  },
  {
    id: 'observe',
    slug: 'le-emozioni',
    order: 6,
    title: 'Le emozioni',
    subtitle: 'Non fare la spesa con lo stomaco vuoto',
    teachings: [
      "Lasciare che qualsiasi sentimento o emozione prevalga può portarti a prendere le peggiori decisioni della tua vita.",
      "Reagire a una provocazione accecato dalla rabbia può peggiorare considerevolmente la tua situazione.",
      "Prendere una decisione in uno stato di disperazione ti porta ad accettare compromessi che non accetteresti mai con la testa fredda.",
      "Fare la spesa affamato — finirai per riempire il frigorifero di cose inutili che poi butterai. Le emozioni funzionano allo stesso modo.",
      "Lasciarsi travolgere dal panico in un'emergenza può metterti in ancora più difficoltà.",
      "Le decisioni migliori si prendono da uno stato di tranquillità e pace, che ti permette di analizzare la situazione e decidere con chiarezza.",
      "Le discussioni nascono perché entrambe le persone vogliono imporre la propria ragione come se fosse la cosa più importante del mondo. Nello stato di calma — quello che i greci chiamavano Atarassia — non c'è ragione né torto, né rabbia, né rancore, né colpa.",
      "Al lavoro ho avuto molte situazioni in cui la persona dall'altra parte del telefono alzava i toni e con prepotenza cercava di imporre la sua versione. Respirando profondamente, ho capito che era qualcuno disperato mosso da un cattivo stato d'animo. Gli ho fatto vedere la situazione con calma, gli ho detto che ero dalla sua parte e che avrei fatto il possibile per aiutarlo. Ha finito per lasciarmi una recensione positiva su Trustpilot.",
    ],
    reflection:
      "C'è qualche decisione recente che avresti preso diversamente con la testa più fredda?",
    extraReflections: [
      "La rabbia e il rancore sono due delle peggiori emozioni. In quali momenti, seguendole, hai peggiorato la tua situazione?",
      "Quando si è mossi dalla disperazione, si accettano i peggiori compromessi. Racconta la tua esperienza più difficile con questa emozione.",
    ],
    inRelacion:
      "La maggior parte dei litigi non nasce dal problema in sé, ma da una reazione detta nel momento sbagliato, con il tono sbagliato. La calma non è debolezza — è l'unico vantaggio reale in un conflitto.",
    practicalExercise: {
      description:
        "Primo: in una discussione, prova a dare ragione al tuo interlocutore dicendogli che capisci il suo punto di vista. Romperai il suo schema mentale e lo metterai in difficoltà — senza urlare, senza litigare.\n\nSecondo: fatti domande per iscritto. Dai prima una risposta di getto — quello che pensi in quel momento. Poi fai 4 respirazioni profonde e rispondi di nuovo. Le due risposte sono uguali?\n\nMolte persone scopriranno che la seconda è diversa. Non perché la respirazione abbia dato la risposta giusta — ma perché ha ridotto l'influenza dell'ansia, della rabbia o della paura.",
      prompt: "Che differenza hai notato tra la risposta di getto e la risposta in calma?",
    },
  },
  {
    id: 'obstacle',
    slug: 'l-ostacolo',
    order: 7,
    title: "L'ostacolo",
    subtitle: "L'ostacolo è il cammino",
    teachings: [
      "Ci sono due modi di affrontare un ostacolo: lamentarsi senza apportare alcuna soluzione e soccombere — oppure valutarne gli effetti negativi e positivi, e trovare il modo di trasformarlo a proprio favore.",
      "Quando si generano profonde crisi nella società, si nascondono profonde opportunità dietro di esse.",
      "Dai grandi problemi e bisogni nascono le imprese più fruttuose. Il fondamento di qualsiasi buon prodotto è che risolve un problema reale.",
      "Più ostacoli superi, maggiore sarà la tua capacità di adattarti anche nelle situazioni peggiori — e di trarne vantaggio.",
      "L'ostacolo non è un segnale che stai sbagliando. È il cammino stesso verso il progresso.",
      "Chi impara a vedere la difficoltà come informazione — invece che come minaccia — ha un enorme vantaggio su chi la evita.",
      "Lavoro in una piattaforma che, in certi aspetti, ha molte lacune a livello tecnico nei confronti del cliente finale. La cosa facile sarebbe stata ignorarlo, o lamentarsi senza fare nulla.\n\nInvece, quegli stessi problemi sono diventati il mio punto di forza più grande. Proprio affrontandoli di petto — cercando soluzioni dove gli altri vedevano solo difetti — sono diventato il numero uno nelle recensioni positive su Trustpilot nei tre paesi in cui operiamo: Inghilterra, Spagna e Italia.\n\nL'ostacolo non era il nemico. Era il vantaggio.",
    ],
    reflection:
      "C'è qualche difficoltà nella tua vita in questo momento che stai evitando invece di affrontare? Cosa succederebbe se provassi a trasformarla a tuo favore?",
    extraReflections: [
      "Qual è stato l'ostacolo più grande che hai superato nella tua vita finora? Cosa ti ha insegnato di te stesso?",
      "Quale dei tuoi punti deboli potrebbe diventare uno dei tuoi punti di forza?",
    ],
    inRelacion:
      "I conflitti nelle relazioni sono ostacoli. Chi li evita accumula distanza; chi li affronta — con calma e onestà — costruisce qualcosa di più solido.",
    practicalExercise: {
      description:
        "Primo: pensa a qualcosa che ti complica la vita durante la giornata — un tragitto lungo, un'attesa, un compito che detesti — e chiediti come quella difficoltà potrebbe diventare un'opportunità. Un lungo viaggio sui mezzi pubblici, per esempio, è tempo perfetto per leggere, ascoltare podcast o lasciare che un'idea prenda forma.\n\nSecondo: pensa se qualcuno dei tuoi problemi quotidiani lo condivide molta gente intorno a te. Come lo risolveresti? Ci sarebbe qualcuno disposto a pagare per quel sollievo? I migliori business non nascono da idee brillanti — nascono da problemi reali che nessuno ha ancora risolto bene.",
      prompt: "Quale difficoltà hai individuato? Come potresti trasformarla a tuo favore?",
    },
  },
  {
    id: 'here_now',
    slug: 'qui-e-ora',
    order: 8,
    title: 'Qui e ora',
    subtitle: 'Il momento migliore della tua vita è questo',
    teachings: [
      "Il passato ti ha formato — è tutto quello che sei adesso. Ma non puoi cambiarlo. Continuare a viverci dentro significa sprecare l'unica cosa che hai davvero: il presente.",
      "Il futuro è tutto da decidere. Si costruisce qui, in ogni scelta che fai adesso. Il meglio deve ancora venire.",
      "Con la testa altrove — in quello che è stato o in quello che potrebbe essere — vivi una vita immaginaria invece di quella reale.",
      "La depressione, in molti casi, è uno stato mentale ancorato al passato: a qualcosa che si è perso, a qualcosa che non è andata bene, a una versione di sé che non esiste più. O ancorato a ciò che non si ha — confrontando il presente con un'idea di come dovrebbe essere.",
      "Accettare il momento presente e abitarlo davvero è il primo passo concreto per uscire da quello stato. Non l'unico — ma il primo.",
      "È una follia pensare che basti prendere una pastiglia per decidere come stiamo — e che sia lei a decidere del nostro destino. Un farmaco può alleviare, ma non può vivere la tua vita al posto tuo. Il lavoro interiore non lo fa nessun altro.",
      "Ogni piccolo passo fatto nel qui e ora ci avvicina — o ci allontana — dal nostro obiettivo. Le piccole azioni quotidiane determinano il nostro destino. Per questo abbiamo bisogno di una visione a lungo termine: sapere dove andiamo per non perdere la rotta nei piccoli momenti.",
      "Ciò che ti dà piacere istantaneo ti allontana dal fuoco. I reel di Instagram, lo scroll infinito, la dopamina facile — offrono al cervello ogni giorno una versione irreale della vita. Quel confronto costante con quello che vediamo sul telefono è uno dei percorsi più diretti verso la depressione.",
      "Dopo aver pubblicato le mie ultime canzoni su Instagram, ho deciso di disinstallare tutti i social dal telefono. La quantità di dettagli che mi perdevo durante una semplice passeggiata sul lungomare o in montagna era enorme. Grazie a quello ho iniziato a leggere sui mezzi pubblici. Piccole azioni che, giorno dopo giorno, mi avvicinano a quello che voglio essere.",
    ],
    reflection: "Dove si trova la tua mente in questo momento? Nel passato, nel futuro, o qui?",
    extraReflections: [
      "C'è un ricordo del passato o una preoccupazione del futuro che la tua mente ripete con più frequenza? Di cosa avrebbe bisogno quel pensiero per lasciarsi andare?",
      "Quale attività o momento della giornata ti porta più facilmente nel presente? Come potresti averne di più?",
    ],
    inRelacion:
      "Puoi essere seduto accanto a qualcuno ed essere completamente altrove — è lì che una relazione inizia a svuotarsi, in silenzio, senza che nessuno lo dica.",
    practicalExercise: {
      description:
        "Disinstalla i social dal telefono per almeno 24 ore. Non \"silenziare\" né nascondere — disinstalla.\n\nIn quel tempo, investi i minuti che avresti dedicato allo scroll in qualcosa di concreto: uscire a camminare senza auricolari, leggere sui mezzi, sederti in silenzio cinque minuti senza fare nulla.\n\nOsserva quanti dettagli del mondo reale emergono quando smetti di guardare lo schermo. Quante idee. Quanta calma.\n\nPoi, se vuoi andare un passo oltre: inizia a meditare. Non serve un'ora al giorno — cinque minuti bastano per cominciare. Siediti, chiudi gli occhi, e osserva i tuoi pensieri passare senza salirci. Non è facile. Richiede tempo, sforzo e costanza. Ma è l'allenamento più diretto che esiste per restare nel qui e ora.",
      prompt: "Cosa è emerso quando hai spento il rumore? Cosa hai fatto con quel tempo?",
    },
    secondExercise: {
      description:
        "Domanda semplice: quanti di voi si sono mai fatti una doccia pensando alla doccia?\n\nSentendo l'acqua. La temperatura. Il suono. Il vapore.\n\nO la testa era in quella discussione di ieri, nella riunione di domani, in qualcosa che qualcuno ha detto e che non hai ancora digerito.\n\nLa prossima volta che fai la doccia, prova questo: stai lì. Solo lì. Senti l'acqua sulla pelle. Quando la mente se ne va — e se ne andrà — riportala indietro senza giudicarla. Senza dramma.\n\nÈ uno degli allenamenti più semplici che esistano per il qui e ora. E lo hai disponibile ogni giorno.",
      prompt: "Sei riuscito a stare nella doccia, o la tua mente è andata altrove? Dove è andata?",
    },
  },
  {
    id: 'voices',
    slug: 'le-voci',
    order: 9,
    title: 'Le voci',
    subtitle: 'Guardatele passare, non salirti',
    teachings: [
      "La mente parla ininterrottamente. Ci giudica, ci avverte, ci convince di cose che spesso non sono vere. E quasi sempre le crediamo senza metterle in discussione.",
      "Quello che vali e quello che sei, lo decidi solo tu. Nessun altro.",
      "È fondamentale inserire nella nostra mente parole affettuose, buone, d'amore verso noi stessi. La mente si può riprogrammare.",
      "La mente non fa altro che proiettare preoccupazioni o fatti del passato che hanno segnato la tua esistenza. Lasciali passare come se niente — non sono il presente.",
      "Parlati con un linguaggio d'amore, come se fossi il tuo migliore amico o la tua migliore amica. Dì cose belle a te stesso. Inserisci quei messaggi nella tua testa con intenzione.",
      "Quello che ci definisce è quello che facciamo e diciamo nel momento presente. Solo questo conta — non la voce, ma quello che scegli di fare mentre la ascolti.",
      "Prova questo: cerca di convincerti mentalmente che non puoi alzare il braccio. E poi alzalo. Puoi — anche piegarlo. Questo ti dà un'idea della rilevanza reale di quelle voci: sei tu a decidere se sono vere o no.",
      "Si racconta che durante certi addestramenti militari, alcuni soldati o prigionieri bendati, convinti di essere legati con corde resistenti, non cercavano nemmeno di liberarsi — anche se le corde erano già state rimosse. Una convinzione può limitare il comportamento più della realtà stessa.",
      "Per più di 30 anni mi sono rivolto a me stesso con insulti e parole dure. Questo ha provocato un effetto burnout — un esaurimento profondo che ho impiegato molto tempo a capire. Pensaci così: immagina di avere una relazione con il tuo partner e riempirla di insulti per tutta la vita. Come finisce di solito quel tipo di relazione? Esattamente così finisce il rapporto con te stesso quando ti parli in questo modo.",
    ],
    reflection:
      "Qual è la voce che senti con più frequenza, quella che ti dice che non sei abbastanza? Cosa succede se la guardi passare invece di crederle?",
    extraReflections: [
      "Da dove credi che venga quella voce? La riconosci in qualcuno della tua storia?",
      "Se parlassi al tuo migliore amico come parli a te stesso, rimarrebbe tuo amico? Cosa cambieresti?",
    ],
    inRelacion:
      "Chi crede sempre alla voce che dice \"non sono abbastanza\" tende a cercare nell'altro una prova del contrario che nessuna relazione può dare per sempre.",
    practicalExercise: {
      description:
        "Vai da solo a fare una passeggiata nella natura — scarica un'app di percorsi, ci sono tantissimi cammini facili e accessibili. Metti la modalità aereo e segui solo il sentiero. Senti i tuoi pensieri in mezzo a un bosco e lasciali passare. Ti renderai conto che non succede nulla: le voci arrivano, e se ne vanno.\n\nPrima di dormire, riprogramma la tua mente con un mantra. Costruisci due o tre frasi su di te che vuoi che siano vere — qualcosa che vorresti credere di te stesso. Ripetile a bassa voce cinque volte prima di chiudere gli occhi. Più volte ripeti qualcosa, il cervello lo fa suo e reale, anche se all'inizio non ci credi del tutto. Non si riprogramma da un giorno all'altro — ci vogliono tempo e costanza. Sii costante.",
      prompt: "Quali frasi hai scelto per il tuo mantra? Come ti sei sentito ripetendole?",
    },
  },
  {
    id: 'mirror',
    slug: 'lo-specchio',
    order: 10,
    title: 'Lo specchio',
    subtitle: 'Quando cambi tu, cambia quello che vedi',
    teachings: [
      "Presta attenzione a quello che dici quando parli male di qualcuno. Molte volte, quando giudichiamo gli altri, stiamo parlando di noi stessi — in scala diversa, ma gli stessi schemi.",
      "Il rancore verso qualcuno dice più di te che di lui.",
      "Sicuramente hai esempi di persone che all'inizio non riuscivi a sopportare — e che a un certo punto hanno iniziato a piacerti senza sapere bene perché. Chi è cambiato davvero? Loro, o tu?",
      "La cosa più facile è sempre fare la vittima: dare la colpa agli altri di quello che non va, di quello che non siamo, di quello che non abbiamo. Ma finché restiamo in quel ruolo, non cambia nulla.",
      "I traumi familiari pesano — e spesso non è colpa nostra averli portati. Ma tenere rancore verso chi ce li ha dati non ci libera: ci incatena. Nella loro testa, hanno fatto il massimo che sapevano fare.",
      "Perdonati per quello che sei stato nel passato. Quando lo farai, è probabile che tu possa perdonare anche gli altri — non per loro, ma per te.",
      "Non giudicare gli altri come non dovresti giudicare te stesso. Il giudizio che applichi fuori è quasi sempre lo stesso che applichi dentro.",
      "Da giovane, anni di terapia mi hanno portato a identificare nel rapporto con mio padre la causa della mia mancanza di autostima. Per molto tempo ho portato quel peso come vittima. Il cambiamento è arrivato quando ho smesso di guardare a quello che non avevo avuto e ho iniziato a guardare a chi non aveva avuto nemmeno quello: bambini nati in orfanotrofi, in zone di guerra, senza nulla. Ho capito che mio padre, con i suoi limiti, aveva fatto il massimo che sapeva fare. L'ho perdonato. La relazione non è cambiata — ma gli incontri con lui ho smesso di viverli con quell'angoscia. È stato come togliermi un peso enorme dallo stomaco.",
    ],
    reflection:
      "C'è qualche rancore molto grande che senti ancora verso un'altra persona dopo anni? E perché?",
    extraReflections: [
      "C'è qualcosa che critichi negli altri che, se sei onesto, riconosci anche in te stesso?",
      "Quale parte di te stesso fai più fatica ad accettare? Cosa servirebbe per perdonarti per questo?",
    ],
    inRelacion:
      "Cambiare sé stessi è spesso quello che, senza sforzarsi di ottenerlo, cambia anche il comportamento delle persone intorno a te.",
    practicalExercise: {
      description:
        "Pensa a quelle situazioni o persone che dopo 20 anni o più ti generano ancora rancore. Se inizi ad analizzarle, vedrai che hanno avuto effetti positivi e negativi — in perfetto equilibrio. Fai pace con quei fatti, accettali e ringrazia per averli vissuti. Se inizi a perdonare te stesso, farlo con gli altri sarà ancora più facile.\n\nPredi un foglio. Scrivi il nome di una persona che ti dà fastidio e completa la frase: \"Questa persona è...\" — 5 aggettivi, senza pensarci troppo. Poi rileggi ognuno sostituendo l'inizio con: \"Una parte di me è...\" oppure \"Io, a volte, sono...\" Chiediti: perché proprio questo comportamento mi tocca così tanto? Quasi sempre la risposta ha a che fare con qualcosa che conosciamo molto bene dentro di noi.",
      prompt: "Quali aggettivi della tua lista hai fatto più fatica a riconoscere in te stesso?",
    },
  },
  {
    id: 'healthy_relationships',
    slug: 'relazioni-sane',
    order: 11,
    title: 'Relazioni sane',
    subtitle: 'Due vite intere, non una a metà',
    unlockNotice:
      "Per arrivare fin qui hai dovuto leggere, capire e lavorare tutte le aree precedenti. Non è un caso che sia l'ultima. Una relazione con un'altra persona può essere sana solo se prima hai una relazione sana con te stesso.",
    teachings: [
      "Ci lamentiamo in continuazione del fatto che le relazioni non durano più, che manca affetto, intelligenza emotiva, impegno. Ma dando sempre la colpa all'altro. Prima di guardare fuori, fatti la domanda: come sto io? Ho lavorato su me stesso? Che tipo di relazione ho con me?",
      "Per costruire una relazione con un'altra persona serve — ascoltalo bene — lavoro, impegno, conversazione e dedizione. Non è uno stato in cui arrivi e resti: è qualcosa che si costruisce ogni giorno.",
      "Non cercare qualcuno che ti completi. Ognuno è già completo a modo suo. Se cerchi qualcuno che riempia un vuoto che hai dentro, lo stai facendo al contrario. Si tratta di condividere una vita — non di aver bisogno di qualcuno per averla.",
      "Una volta che la relazione esiste, è fondamentale costruire progetti insieme: sposarsi? figli? una casa? un'impresa? Una relazione senza orizzonte condiviso tende a svuotarsi. Avete bisogno di qualcosa verso cui guardare insieme.",
      "Mantieni la tua individualità e i tuoi spazi. Non essere dipendente emotivamente dall'altro. In un modo o nell'altro, quella persona potrebbe non esserci — e senza di lei sei ancora te stesso. Questo non è freddezza: è salute.",
      "Non dare mai per scontato l'altro. Continuare a provare cose nuove insieme è il primo passo per non cadere nella monotonia. La routine non uccide le relazioni — l'indifferenza dentro la routine sì.",
      "Stabilisci dei limiti e sii onesto con te stesso nel farli rispettare. Senza fiducia nell'altro non si può costruire nulla di solido. E se il desiderio di controllare l'altro è insaziabile — se non è mai abbastanza — forse il problema non è la fiducia in lui o in lei, ma in te stesso.",
      "Nella mia relazione precedente ho capito che entrambi, rispettivamente, avevamo attraversato i nostri limiti per stare insieme. Era una relazione nata più dal bisogno di non stare soli che da altro. Ci siamo lasciati e ci siamo riprovati più volte — ma se nel frattempo non si sanano le proprie ferite, il dolore torna più forte di prima.",
      "Il tantra è una filosofia ancestrale che vede l'atto d'amore non come un piacere momentaneo, ma come un cammino verso qualcosa di più profondo — un'unione che trascende il fisico e ci avvicina al divino. Studiarlo con il tuo partner è, di per sé, un atto di intimità.",
    ],
    reflection:
      "Cerchi nell'altro qualcuno che ti completi, o qualcuno con cui condividere quello che già sei? C'è qualche tuo limite che hai attraversato — o lasciato attraversare — per mantenere una relazione?",
    extraReflections: [
      "Credi di star facendo tutto il possibile per mantenere una relazione con un'altra persona — che sia di amicizia o di coppia? Cosa ti è mancato finora per trovare la persona che cerchi?",
      "Sulla base di quello che ti ha dato questa piattaforma, come avresti gestito le tue relazioni passate? Ti senti ora pronto/a per condividere la tua vita con qualcuno?",
    ],
    inRelacion:
      "Tutto quello che hai lavorato prima — accettazione, disciplina, presenza, gratitudine — converge qui. Quest'area è il risultato di tutte le altre.",
    practicalExercise: {
      description:
        "Stabilisci rituali con l'altra persona — cose concrete che fate insieme con regolarità. Una camminata la domenica. Il cinema una volta al mese. Una sessione di yoga. Una partita a carte. Non importa cosa sia: quello che conta è la frequenza e che sia vostro. I rituali creano affinità e vi costringono ad avere conversazioni — anche quelle scomode — che altrimenti non arrivano mai.\n\nE alternatevi nel proporre piani. Una settimana uno organizza un'uscita. La successiva, l'altro. In una relazione, lo sforzo deve essere reciproco. Quando solo uno porta il peso, la relazione si squilibra — anche se nessuno dei due lo dice ad alta voce.\n\n— — —\n\nTre pratiche tantriche da esplorare insieme:\n\n1. Sdraiati accanto a lui o a lei, nudi, guardati nell'occhio sinistro del tuo partner per diversi minuti. Senza parlare. Senza fretta. Lascia che il silenzio faccia il suo lavoro.\n\n2. Respirate allo stesso tempo: inspira quando inspira l'altro, espira quando espira. Poco a poco, i due corpi iniziano a muoversi come uno solo.\n\n3. Contatto corporeo senza nessun fine sessuale: semplicemente stare, pelle a pelle, senza che ci sia un \"dopo\". Molte coppie scoprono che questo momento di presenza pura è più intimo di qualsiasi altra cosa.",
      prompt: "Quale rituale potresti proporre questa settimana? E quale delle tre pratiche tantriche ti dà più curiosità di esplorare con il tuo partner?",
    },
  },
]

export const AREA_MAP_IT = Object.fromEntries(AREAS_IT.map((a) => [a.id, a])) as Record<
  string,
  AreaDefinition
>

export const AREA_TITLES_IT: Record<string, string> = {
  acceptance: 'Accettazione',
  discipline: 'Disciplina',
  no_complaining: 'Piacere Momentaneo',
  leap: 'La Paura',
  gratitude: 'Gratitudine',
  observe: 'Le Emozioni',
  obstacle: "L'Ostacolo",
  here_now: 'Qui e Ora',
  voices: 'Le Voci',
  mirror: 'Lo Specchio',
  healthy_relationships: 'Relazioni Sane',
}
