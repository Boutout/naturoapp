// ═══════════════════════════════════════════════════════════════
//  NaturoApp — Base de données & moteur applicatif
//  Tout est encapsulé dans une IIFE : SEUL window.APP est global.
//  (Évite la collision "Identifier 'State' has already been declared"
//   avec le `const { State } = window.APP` des scripts de page.)
// ═══════════════════════════════════════════════════════════════
(function () {

const APP_VERSION = '2.0.0';
// Anciennes clés (compte unique) migrées vers le multi-profils : 'naturoapp_v1', 'naturoapp_auth'

// ─── 80 QUESTIONS ───────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1, jour: 1,
    categorie: "Concepts fondamentaux",
    sujet: "Lithothérapie",
    question: "Qu'est-ce que la lithothérapie ?",
    options: [
      "Le soin par le biais de cristaux et de pierres",
      "Une technique de massage par pression",
      "Une forme d'homéopathie utilisant des minéraux dilués",
      "Un traitement à base de plantes médicinales"
    ],
    bonne: 0,
    explication: "La lithothérapie vient du grec 'lithos' (pierre). Elle utilise les cristaux et pierres comme support de soin énergétique. À ne pas confondre avec l'homéopathie (dilutions) ni la phytothérapie (plantes).",
    piege: "Ne pas confondre avec l'homéopathie qui utilise aussi des minéraux mais sous forme de dilutions infinitésimales.",
    mnemo: "LITHO = pierre en grec. Lithothérapie = thérapie par la pierre.",
    tags: ["bases", "définitions"]
  },
  {
    id: 2, jour: 1,
    categorie: "Biochimie",
    sujet: "Acide gras insaturé",
    question: "Quelle est la caractéristique d'un acide gras insaturé ?",
    options: [
      "Il ne possède que des liaisons simples carbone-carbone",
      "Il comporte au moins une double liaison carbone-carbone (C=C)",
      "Il est toujours d'origine animale",
      "Il est solide à température ambiante"
    ],
    bonne: 1,
    explication: "Un acide gras insaturé possède AU MOINS UNE double liaison C=C. Mono-insaturé = 1 liaison (oméga 9). Poly-insaturé = plusieurs (oméga 3, 6). Le fichier original disait 'plusieurs' — c'est une imprécision corrigée ici.",
    piege: "CORRECTION : le cours original dit 'plusieurs doubles liaisons' mais un MUFA (oméga 9) n'en a qu'une seule. Un acide gras SATURÉ n'a que des liaisons simples.",
    mnemo: "inSATURÉ = S'est SATURÉ de liaisons doubles. Au moins une. Saturé = aucune double liaison.",
    tags: ["biochimie", "lipides", "correction"],
    correction: true
  },
  {
    id: 3, jour: 1,
    categorie: "Concepts fondamentaux",
    sujet: "Homéostasie",
    question: "L'homéostasie désigne :",
    options: [
      "Un état figé et immuable de l'organisme",
      "Une maladie chronique de régulation",
      "La capacité de l'organisme à maintenir son équilibre intérieur et ses paramètres physico-chimiques cellulaires",
      "La réponse immunitaire face aux agents pathogènes"
    ],
    bonne: 2,
    explication: "L'homéostasie est une régulation DYNAMIQUE (pas figée) : température, pH, eau, minéraux, paramètres cellulaires. L'organisme ajuste en permanence pour maintenir la stabilité interne.",
    piege: "Attention : l'homéostasie est dynamique et non statique. Ce n'est pas une maladie mais un mécanisme de régulation.",
    mnemo: "HOMÉO = pareil + STASIE = état → maintenir le même état intérieur, en ajustant constamment.",
    tags: ["bases", "physiologie"]
  },
  {
    id: 4, jour: 1,
    categorie: "Naturopathie / Terrain",
    sujet: "Élimination des acides et des colles",
    question: "Quelle est la bonne association entre déchets et organes éliminateurs ?",
    options: [
      "Colles → reins et poumons | Acides → foie et gros intestin",
      "Colles → foie et gros intestin | Acides → reins et poumons",
      "Acides et colles → tous éliminés par les reins",
      "Colles → peau | Acides → foie uniquement"
    ],
    bonne: 1,
    explication: "Distinction fondamentale en naturopathie : déchets COLLOÏDAUX (colles) = voie hépato-intestinale (foie + gros intestin). Déchets ACIDES = voie rénale + pulmonaire.",
    piege: "L'inversion foie/reins est le piège classique. Mémoriser : COLLES → côlon/foie (même consistance 'collante') | ACIDES → reins/poumons (élimination gazeuse et urinaire).",
    mnemo: "COLLE colle au foie et au côlon. Les ACIDES s'évaporent par les poumons et sont filtrés par les reins.",
    tags: ["terrain", "drainage", "naturopathie"]
  },
  {
    id: 5, jour: 1,
    categorie: "Cures naturopathiques",
    sujet: "Cure de revitalisation",
    question: "La cure de revitalisation consiste en :",
    options: [
      "Un drainage intensif des toxines par les émonctoires",
      "Un jeûne thérapeutique prolongé",
      "Une cure de vitamines et minéraux adaptée aux carences de l'organisme",
      "Une cure de plantes dépuratives"
    ],
    bonne: 2,
    explication: "La cure de revitalisation RECONSTRUIT et COMBLE les carences. Elle apporte ce qui manque (vitamines, minéraux) et rééquilibre l'alimentation. Elle ne draine pas.",
    piege: "Ne pas confondre avec la cure DÉTOX (drainage des toxines) ou la cure DÉPURATIVE. La revitalisation = remplir, pas vider.",
    mnemo: "REVITALISER = remettre de la VIE = apporter des nutriments manquants.",
    tags: ["cures", "naturopathie"]
  },
  {
    id: 6, jour: 1,
    categorie: "Phytothérapie",
    sujet: "Plantes hépato-stimulantes",
    question: "Quelles plantes stimulent le foie ?",
    options: [
      "Camomille, mélisse, lavande",
      "Artichaut, radis noir, pissenlit",
      "Passiflore, valériane, aubépine",
      "Echinacea, thym, sarriette"
    ],
    bonne: 1,
    explication: "Le trio hépatique classique : Artichaut (cynaropicrine → cholagogue/cholérétique), Radis noir (glucosinolates → drainant hépatique), Pissenlit (amers → stimulant hépatobiliaire).",
    piege: "Camomille/mélisse = digestif/calmant. Passiflore/valériane = sommeil. Echinacea/thym = immunité/respiratoire.",
    mnemo: "A-R-P = Artichaut, Radis noir, Pissenlit → ARPège hépatique !",
    tags: ["phytothérapie", "foie", "drainage"]
  },
  {
    id: 7, jour: 1,
    categorie: "Cures naturopathiques",
    sujet: "Durée d'une cure détox",
    question: "Quelle est la durée recommandée d'une cure détox ?",
    options: [
      "3 jours maximum, sinon dangereux",
      "3 semaines dans l'idéal, maximum 6 semaines",
      "3 mois minimum pour être efficace",
      "La durée importe peu, on peut la faire toute l'année"
    ],
    bonne: 1,
    explication: "3 semaines = durée idéale pour agir sans épuiser. Maximum 6 semaines. En dessous = insuffisant pour agir. Au-delà = risque d'effets indésirables (fatigue, carences).",
    piege: "Mémoriser les deux chiffres : 3 semaines (idéal) et 6 semaines (maximum). Ni trop court, ni trop long.",
    mnemo: "3 et 6 : comme le permis de conduire, 3 essais, 6 points max à ne pas dépasser.",
    tags: ["cures", "détox", "chiffres"]
  },
  {
    id: 8, jour: 1,
    categorie: "Histoire / Théories",
    sujet: "Théorie des humeurs d'Hippocrate",
    question: "Concernant la théorie des humeurs selon Hippocrate, quelles propositions sont correctes ?",
    options: [
      "Les humeurs sont au nombre de 3 ; la bile jaune vient de la vésicule",
      "Les humeurs sont au nombre de 5 ; le sang vient du cœur",
      "Les humeurs sont au nombre de 4 ; la bile jaune vient du foie ; l'atrabile vient de la rate",
      "Les humeurs sont au nombre de 4 ; la bile jaune vient de la rate ; l'atrabile vient du foie"
    ],
    bonne: 2,
    explication: "4 humeurs : Sang (cœur), Phlegme (cerveau/poumons), Bile jaune (foie), Bile noire/Atrabile (rate). Mémoriser les 4 et leurs organes d'origine.",
    piege: "Le piège est d'inverser foie et rate pour bile jaune et atrabile. Bile JAUNE = FOIE (couleur du foie). Atrabile = bile NOIRE = RATE.",
    mnemo: "SANG-PHLEGME-BILE JAUNE(foie)-ATRABILE(rate). Le Foie est Jaune d'or. La Rate est noircie = atrabile.",
    tags: ["histoire", "théories", "chiffres"]
  },
  {
    id: 9, jour: 1,
    categorie: "Phytothérapie",
    sujet: "Plante carminative",
    question: "Une plante carminative est utilisée pour :",
    options: [
      "Améliorer le sommeil et réduire l'anxiété",
      "Stimuler le système immunitaire",
      "Réduire les ballonnements et les gaz intestinaux",
      "Soulager les douleurs articulaires"
    ],
    bonne: 2,
    explication: "Carminatif = qui aide à expulser les gaz et réduit les ballonnements. Exemples : fenouil, anis, carvi, gingembre. Ce terme vient du latin 'carminare' = peigner, évacuer.",
    piege: "Carminatif ≠ sédatif, ≠ immunostimulant, ≠ anti-inflammatoire. C'est exclusivement lié aux gaz digestifs.",
    mnemo: "CARMINATIF = CAR les gaz partent dans les MINutes (car-min-atif). Ballonnements → dehors !",
    tags: ["phytothérapie", "digestion", "définitions"]
  },
  {
    id: 10, jour: 1,
    categorie: "Phytothérapie",
    sujet: "Lithiases et coliques biliaires",
    question: "Concernant les lithiases et coliques biliaires, quelle proposition représente UNE ERREUR ?",
    options: [
      "Les plantes cholagogues et cholérétiques apportent un soulagement",
      "La douleur siège dans l'hypochondre droit",
      "Une alimentation riche en graisses peut déclencher une crise",
      "Les antibiotiques sont le seul traitement efficace"
    ],
    bonne: 3,
    explication: "Les antibiotiques ne traitent pas les lithiases (calculs). Les plantes cholagogues (évacuent la bile) et cholérétiques (stimulent la production de bile) SOULAGENT bien. L'alimentation grasse est un facteur déclenchant réel.",
    piege: "PIÈGE DE FORMULATION : la question demande de trouver l'ERREUR. La bonne réponse est donc la proposition fausse (antibiotiques). Ne pas cocher la prop sur les plantes cholagogues comme erreur.",
    mnemo: "CHOLA-GOGUE = fait aller (gogue) la bile (chol). CHOLA-RÉTIQUE = retient/stimule la bile. Les deux aident. Antibiotiques ≠ traitement des calculs.",
    tags: ["phytothérapie", "digestion", "piège-formulation"],
    piege_special: true
  },
  {
    id: 11, jour: 2,
    categorie: "Phytothérapie",
    sujet: "Intrus parmi les plantes drainantes",
    question: "Parmi ces plantes, laquelle est l'INTRUS (n'est pas drainante/diurétique) ?",
    options: [
      "Pissenlit",
      "Orthosiphon (thé de Java)",
      "Passiflore",
      "Chiendent"
    ],
    bonne: 2,
    explication: "La Passiflore est une plante calmante, anxiolytique et favorisant le sommeil. Elle n'a pas d'action drainante ou diurétique significative. Les 3 autres sont bien diurétiques/drainantes.",
    piege: "La Passiflore peut sembler 'naturelle' donc potentiellement drainante. Son action principale est sédative/anxiolytique.",
    mnemo: "PassiFLORE = fleur de la passion = calme, sérénité, sommeil. Pas de drainage.",
    tags: ["phytothérapie", "drainage", "intrus"]
  },
  {
    id: 12, jour: 2,
    categorie: "Biochimie",
    sujet: "Radicaux libres",
    question: "Les radicaux libres sont :",
    options: [
      "Des vitamines antioxydantes bénéfiques",
      "Des hormones de stress produites par les surrénales",
      "Des molécules toxiques dérivées de l'oxygène provenant de la respiration, du tabac, de la pollution",
      "Des minéraux essentiels à la santé cellulaire"
    ],
    bonne: 2,
    explication: "Les radicaux libres (ERO = Espèces Réactives de l'Oxygène) sont des molécules instables avec un électron non apparié. Sources : respiration cellulaire, tabac, pollution, UV, stress. Ils oxydent les cellules.",
    piege: "Ne pas confondre radicaux libres (toxiques) avec antioxydants (protecteurs). Les vitamines C, E, bêta-carotène NEUTRALISENT les radicaux libres.",
    mnemo: "Radical LIBRE = molécule qui fait ce qu'elle veut (détruire). L'antioxydant = le gendarme qui l'arrête.",
    tags: ["biochimie", "antioxydants", "oxydation"]
  },
  {
    id: 13, jour: 2,
    categorie: "Micronutrition",
    sujet: "Supplémentation en fer",
    question: "Quel oligo-élément ne doit jamais être supplémenté sans bilan sanguin préalable ?",
    options: [
      "Le magnésium",
      "Le zinc",
      "Le fer",
      "Le sélénium"
    ],
    bonne: 2,
    explication: "Le fer en excès est pro-oxydant (réaction de Fenton → production de radicaux libres), hépatotoxique, et peut masquer une pathologie sous-jacente (cancer digestif). Le dosage sanguin (ferritine, fer sérique) est INDISPENSABLE avant toute supplémentation.",
    piege: "Le magnésium et le zinc sont généralement bien tolérés. Le fer, lui, est dangereux en excès et contre-indiqué dans certaines conditions (hémochromatose, cancer).",
    mnemo: "FER = métal lourd et dangereux en excès. Toujours FERRITINE avant FER.",
    tags: ["micronutrition", "minéraux", "sécurité"]
  },
  {
    id: 14, jour: 2,
    categorie: "Biochimie",
    sujet: "Chondrocytes",
    question: "Les chondrocytes produisent :",
    options: [
      "L'insuline et le glucagon",
      "La kératine et la mélanine",
      "Le collagène et l'acide hyaluronique",
      "La testostérone et les œstrogènes"
    ],
    bonne: 2,
    explication: "Les chondrocytes sont les cellules du cartilage. Ils produisent : le collagène de type II (résistance) et l'acide hyaluronique (lubrification et amortissement). Ces deux molécules constituent la matrice cartilagineuse.",
    piege: "Insuline/glucagon = pancréas. Kératine/mélanine = peau. Hormones sexuelles = gonades. Seul le cartilage = chondrocytes.",
    mnemo: "CHONDRO = cartilage. Cartilage = COLLAGÈNE + ACIDE HYALURONIQUE. Les deux font briller les articulations.",
    tags: ["biochimie", "articulations", "chondrocytes"]
  },
  {
    id: 15, jour: 2,
    categorie: "Micronutrition",
    sujet: "Vitamine D",
    question: "Concernant la vitamine D, quelles propositions sont correctes ?",
    options: [
      "La D2 est mieux biodisponible que la D3 ; elle diminue l'absorption du calcium",
      "D3 et D2 ont exactement la même biodisponibilité",
      "La D3 a une meilleure biodisponibilité que la D2 ; elle favorise l'absorption du calcium alimentaire",
      "La vitamine D n'a aucun lien avec le métabolisme calcique"
    ],
    bonne: 2,
    explication: "D3 (cholécalciférol, source animale/soleil) > D2 (ergocalciférol, source végétale) en biodisponibilité. La vitamine D active (calcitriol) favorise l'absorption intestinale du calcium et du phosphore.",
    piege: "Le piège est d'inverser D2 et D3. D3 = meilleure. Et la vitamine D EST liée au calcium (rôle central dans l'ostéoporose).",
    mnemo: "D3 = la meilleure car 3 > 2. Vitamine D + Calcium = os en BÉTON.",
    tags: ["micronutrition", "vitamines", "calcium"]
  },
  {
    id: 16, jour: 2,
    categorie: "Micronutrition / Rhumatologie",
    sujet: "Arthrite et polyarthrite rhumatoïde",
    question: "Concernant la polyarthrite rhumatoïde :",
    options: [
      "Elle touche uniquement les petites articulations des mains",
      "C'est une maladie infectieuse bactérienne",
      "Elle touche les articulations dans tout le corps ; les oméga 3 sont intéressants pour réduire l'inflammation",
      "Les oméga 6 sont recommandés en priorité dans cette maladie"
    ],
    bonne: 2,
    explication: "La polyarthrite rhumatoïde (PR) est une maladie auto-immune inflammatoire qui peut toucher toutes les articulations. Les oméga 3 (EPA, DHA) réduisent l'inflammation via les prostaglandines de série 3.",
    piege: "Ne pas limiter la PR aux mains. Les oméga 6 (en excès) sont pro-inflammatoires. Ce sont les oméga 3 qui sont bénéfiques.",
    mnemo: "Poly = plusieurs. Arthrite = inflammation articulaire. Oméga 3 = ANTI-inflammatoire.",
    tags: ["rhumatologie", "oméga 3", "auto-immune"]
  },
  {
    id: 17, jour: 2,
    categorie: "Réglementation",
    sujet: "Plantes en vente libre (tisanes)",
    question: "Combien de plantes sont autorisées en vente libre pour les tisanes en France ?",
    options: [
      "42 plantes",
      "96 plantes",
      "148 plantes",
      "250 plantes"
    ],
    bonne: 2,
    explication: "148 plantes sont sur la liste officielle autorisée en vente libre pour les tisanes en France (liste des plantes médicinales de la Pharmacopée française, partie V). Chiffre à mémoriser tel quel.",
    piege: "Question de mémoire pure. Pas de logique derrière le nombre 148 — il faut le mémoriser.",
    mnemo: "148 = 1-4-8. Je mange UNE salade QUATRE fois par HUIT plantes... ou plus simple : mémoriser 148 ≈ 150.",
    tags: ["réglementation", "chiffres", "mémorisation"]
  },
  {
    id: 18, jour: 2,
    categorie: "Psychologie / Développement",
    sujet: "Attachement de l'enfant",
    question: "Quels comportements favorisent l'attachement du nourrisson ?",
    options: [
      "Parler, marcher, saisir des objets avec précision",
      "Il sourit / Il suce ou pleure / Il s'accroche et suit du regard",
      "Lire, écrire, dessiner",
      "Raisonner, argumenter, mémoriser"
    ],
    bonne: 1,
    explication: "Bowlby identifie des comportements d'attachement innés : le sourire (signal social), la succion/pleurs (signaux de besoin), l'agrippement et le suivi visuel (maintien de la proximité). Ces comportements assurent la survie.",
    piege: "Les comportements complexes (langage, écriture, raisonnement) ne sont pas des comportements d'attachement primaires du nourrisson.",
    mnemo: "SOURIRE + PLEURER + S'ACCROCHER + SUIVRE DU REGARD = les 4 liens du bébé avec sa figure d'attachement.",
    tags: ["psychologie", "développement", "attachement"]
  },
  {
    id: 19, jour: 2,
    categorie: "Psychologie",
    sujet: "Variétés de dysthymies",
    question: "Quelles sont les variétés de dysthymies ?",
    options: [
      "Euphorie normale et tristesse passagère",
      "Indifférence affective et euphorie morbide",
      "Anxiété et phobies",
      "Dépression et manie"
    ],
    bonne: 1,
    explication: "La dysthymie est un trouble chronique de l'humeur. Ses deux variantes : l'indifférence affective (émoussement des émotions, anhédonie) et l'euphorie morbide (bonne humeur inadaptée à la situation réelle).",
    piege: "Dépression/manie = trouble bipolaire (non dysthymie). Anxiété/phobies = troubles anxieux. La dysthymie = perturbation durable de la tonalité émotionnelle.",
    mnemo: "DYS-THYMIE = DYSfonction de l'humeur. Pas assez d'émotions (indifférence) OU trop d'humeur illégitime (euphorie morbide).",
    tags: ["psychologie", "humeur", "psychiatrie"]
  },
  {
    id: 20, jour: 2,
    categorie: "Phytothérapie",
    sujet: "Plantes anti-allergiques",
    question: "Quelles plantes sont utilisées en cas de terrain allergique ?",
    options: [
      "Valériane et passiflore",
      "Thym et eucalyptus",
      "Plantain et cassis",
      "Artichaut et radis noir"
    ],
    bonne: 2,
    explication: "Le Plantain (antihistaminique naturel, antiallergique) et le Cassis (feuilles riches en flavonoïdes, action anti-inflammatoire et antiallergique) sont les deux plantes retenues pour le terrain allergique.",
    piege: "Valériane/passiflore = sommeil. Thym/eucalyptus = voies respiratoires infectieuses. Artichaut/radis noir = foie.",
    mnemo: "PLANTAIN + CASSIS = la haie du jardin qui combat les allergies (plantes humbles mais efficaces).",
    tags: ["phytothérapie", "allergie", "antihistaminique"]
  },
  {
    id: 21, jour: 3,
    categorie: "Anatomie / Dermatologie",
    sujet: "Structure de la peau",
    question: "Quelles propositions sur la structure de la peau sont correctes ?",
    options: [
      "L'hypoderme est riche en fibres élastiques ; les glandes sébacées sont dans l'épiderme",
      "L'épiderme contient les adipocytes ; les glandes sudoripares sont dans l'hypoderme uniquement",
      "L'hypoderme est riche en cellules adipeuses ; les glandes sébacées sont dans le derme avec sécrétions vers l'épiderme",
      "Le derme ne contient aucune glande ; toutes les glandes sont dans l'épiderme"
    ],
    bonne: 2,
    explication: "Structure peau (de profond à superficiel) : HYPODERME (adipocytes, graisses, vaisseaux) → DERME (glandes sébacées, glandes sudoripares, follicules pileux, collagène, élastine) → ÉPIDERME (kératinocytes, mélanocytes). Le sébum est produit dans le derme et remonte vers la surface.",
    piege: "Ne pas placer les glandes sébacées dans l'épiderme. L'hypoderme = graisses, pas fibres élastiques.",
    mnemo: "HyPODerme = le PODe (pied) profond = GRAISSE. Derme = le milieu = glandes. Épiderme = surface visible.",
    tags: ["anatomie", "peau", "dermatologie"]
  },
  {
    id: 22, jour: 3,
    categorie: "Phytothérapie / Aromathérapie",
    sujet: "Traitement des hématomes",
    question: "Quels remèdes sont indiqués pour les hématomes ?",
    options: [
      "Lavande et camomille",
      "Hélichryse italienne et arnica",
      "Millepertuis et valériane",
      "Gingembre et curcuma"
    ],
    bonne: 1,
    explication: "Hélichryse italienne (HE italidione) = l'huile essentielle des hématomes par excellence, résorbante et cicatrisante. Arnica (teinture mère ou gel) = anti-ecchymotique classique, accélère la résorption des bleus.",
    piege: "Lavande = cicatrisant/calmant mais pas spécifique hématomes. Millepertuis/valériane = dépression/anxiété. Gingembre/curcuma = anti-inflammatoire articulaire.",
    mnemo: "HÉLICHRYSE + ARNICA = le duo 'anti-bleus'. Hélichryse = soleil doré qui efface les bleus.",
    tags: ["phytothérapie", "aromathérapie", "traumatologie"]
  },
  {
    id: 23, jour: 3,
    categorie: "Gemmothérapie",
    sujet: "Posologie des macérats glycérinés",
    question: "Quelle est la posologie standard des macérats glycérinés mère (gemmothérapie) ?",
    options: [
      "1 fois 50 gouttes par jour",
      "2 fois 3 gouttes par jour",
      "3 fois 5 à 15 gouttes par jour",
      "5 fois 20 gouttes par jour"
    ],
    bonne: 2,
    explication: "La posologie type des macérats glycérinés (bourgeons et jeunes pousses) est de 3 prises par jour de 5 à 15 gouttes chacune, à diluer dans un peu d'eau. Chiffre à mémoriser tel quel pour l'examen.",
    piege: "Question de mémorisation pure. 3 fois/jour, 5 à 15 gouttes = la posologie standard de la gemmothérapie.",
    mnemo: "3 × 5-15 gouttes. Trois fois par jour comme les repas. Entre 5 et 15 = toujours dans la quinzaine.",
    tags: ["gemmothérapie", "posologie", "chiffres"]
  },
  {
    id: 24, jour: 3,
    categorie: "Micronutrition",
    sujet: "Apport en magnésium",
    question: "Quel est l'apport journalier recommandé en magnésium pour un adulte ?",
    options: [
      "50 à 100 mg/jour",
      "150 à 200 mg/jour",
      "300 à 400 mg/jour",
      "600 à 800 mg/jour"
    ],
    bonne: 2,
    explication: "L'AJR en magnésium est de 300-400 mg/jour pour un adulte (légèrement plus élevé chez l'homme). Le magnésium intervient dans plus de 300 réactions enzymatiques. Déficit très fréquent en France.",
    piege: "Ne pas confondre avec le calcium (1000 mg/j) ou le zinc (10 mg/j). 300-400 mg = magnésium.",
    mnemo: "MAGnésium = 300-400 MG (les initiales MG restent dans MAGnésium). 300-400 comme une voiture sportive.",
    tags: ["micronutrition", "minéraux", "chiffres"]
  },
  {
    id: 25, jour: 3,
    categorie: "Phytothérapie",
    sujet: "Mucuna pruriens (Pois mascate)",
    question: "Quelles sont les propriétés du Mucuna pruriens ?",
    options: [
      "Riche en tryptophane ; intérêt contre la dépression",
      "Riche en mélatonine ; aide à l'endormissement",
      "Riche en L-Dopa ; intérêt contre le syndrome des jambes sans repos",
      "Riche en tyramine ; stimulant cardiovasculaire"
    ],
    bonne: 2,
    explication: "Mucuna pruriens = source naturelle de L-Dopa (précurseur de la dopamine). Utilisé pour le syndrome des jambes sans repos (lié à une carence dopaminergique) et parfois comme support dans la maladie de Parkinson.",
    piege: "NE PAS CONFONDRE : Mucuna = DOPAMINE (via L-Dopa). Griffonia/Tryptophane = SÉROTONINE. Ce sont deux neurotransmetteurs différents.",
    mnemo: "MuCUna = cuMiné de DOPA. Mucuna → L-DOPA → Dopamine. Jambes sans repos = manque de dopamine.",
    tags: ["phytothérapie", "neurotransmetteurs", "dopamine"],
    important: true
  },
  {
    id: 26, jour: 3,
    categorie: "Naturopathie / Typologies",
    sujet: "Profil vagotonique",
    question: "Le profil vagotonique de base se caractérise par :",
    options: [
      "Transit intestinal ralenti et dominance du cerveau gauche (logique)",
      "Péristaltisme intestinal augmenté et dominance du cerveau droit (intuition)",
      "Hypertension chronique et pensée analytique",
      "Constipation chronique et anxiété généralisée"
    ],
    bonne: 1,
    explication: "Profil vagotonique = dominance parasympathique (nerf vague = vagus). Conséquences : péristaltisme augmenté (intestin réactif), tendance aux émotions, créativité, intuition, utilisation préférentielle du cerveau droit.",
    piege: "Vagotonique ≠ sympathicotonique. Le sympathique = stress, accélération, cerveau gauche. Le parasympathique (nerf vague) = repos, digestion, créativité.",
    mnemo: "VAGO-TONIQUE = TONUS du nerf VAGUE dominant. Vague comme la mer = fluide, intuitif, intestin actif.",
    tags: ["typologies", "terrain", "neurologie"]
  },
  {
    id: 27, jour: 3,
    categorie: "Aromathérapie",
    sujet: "Propriétés des cétones (arômes)",
    question: "Quelles propriétés peut-on attribuer aux cétones en aromathérapie ?",
    options: [
      "Antiseptique puissant, antiviral, immunostimulant",
      "Cicatrisant, stimulant respiratoire, anti-hématomes, cholérétique et cholagogue",
      "Hypotenseur, sédatif, anxiolytique",
      "Aphrodisiaque, tonique général, anti-âge"
    ],
    bonne: 1,
    explication: "Les cétones (ex : camphre, menthone, thuyone) ont des propriétés spécifiques retenues : cicatrisation, stimulation respiratoire (mucolytique), action sur les hématomes, et effet cholérétique/cholagogue (bile). Attention : neurotoxiques à doses élevées.",
    piege: "Les cétones ne sont pas principalement antiseptiques (= phénols/alcools). Pas sédatifs (= esters). Mémoriser leurs 4 propriétés spécifiques.",
    mnemo: "Cétone = CICA + RESPI + BLEUS + BILE. Quatre actions, une famille.",
    tags: ["aromathérapie", "biochimie aromatique"]
  },
  {
    id: 28, jour: 3,
    categorie: "Phytochimie",
    sujet: "Furocoumarines",
    question: "Quel est l'effet principal des furocoumarines ?",
    options: [
      "Effet sédatif et anxiolytique",
      "Effet antispasmodique digestif",
      "Effet photosensibilisant",
      "Effet antihistaminique"
    ],
    bonne: 2,
    explication: "Les furocoumarines (bergaptène dans le bergamote, psoralène dans le céleri, angélicine...) provoquent une PHOTOSENSIBILISATION : réaction cutanée (érythème, brûlures, pigmentation) lors d'exposition au soleil. Danger en été.",
    piege: "Le piège est de chercher un effet thérapeutique. Les furocoumarines sont surtout connues pour leur DANGER (photosensibilisation) plutôt que leur bénéfice.",
    mnemo: "FuroCoumarine + SOLEIL = BRÛLURE. Furocoumarines = Fuyez du Soleil !",
    tags: ["phytochimie", "effets secondaires", "sécurité"]
  },
  {
    id: 29, jour: 3,
    categorie: "Endocrinologie / Gynécologie",
    sujet: "Hyperoestrogénie relative",
    question: "Dans quelles situations observe-t-on une hyperoestrogénie relative ?",
    options: [
      "Grossesse et allaitement",
      "Andropause et ménopause confirmée",
      "Début de la puberté chez la jeune fille et préménopause",
      "Post-ménopause et sénescence"
    ],
    bonne: 2,
    explication: "L'hyperoestrogénie RELATIVE signifie que les oestrogènes ne sont pas nécessairement élevés en valeur absolue, mais qu'ils sont en excès PAR RAPPORT à la progestérone. Cela survient : à la puberté (cycles irréguliers) et en préménopause (baisse de progestérone avant baisse des oestrogènes).",
    piege: "Hyperoestrogénie relative ≠ excès absolu d'oestrogènes. C'est un déséquilibre de rapport. La ménopause confirmée = carence des DEUX hormones.",
    mnemo: "RELATIVE = par rapport à la progestérone. Puberté + Préménopause = les deux 'PRÉ' = manque de progestérone.",
    tags: ["endocrinologie", "gynécologie", "hormones"]
  },
  {
    id: 30, jour: 3,
    categorie: "Endocrinologie / Gynécologie",
    sujet: "Rôles de la progestérone",
    question: "Quels sont les rôles de la progestérone ?",
    options: [
      "Elle baisse la température basale ; elle favorise l'interruption de grossesse",
      "Elle stimule l'ovulation et augmente les oestrogènes",
      "Elle augmente la température basale du corps ; elle est favorable au maintien de la grossesse",
      "Elle est sécrétée par les ovaires en phase folliculaire uniquement"
    ],
    bonne: 2,
    explication: "La progestérone est sécrétée par le corps jaune (phase lutéale). Elle MONTE la température basale (d'où son intérêt dans les courbes de température), prépare l'endomètre et maintient la grossesse (d'où le terme 'pro-gestérone' = pour la gestation).",
    piege: "La progestérone MONTE la température (opposé des oestrogènes). PRO-gestérone = POUR la grossesse (pas contre).",
    mnemo: "PRO-gestérone = PRO la grossesse + température qui MONTE. Phase lutéale = après ovulation.",
    tags: ["endocrinologie", "gynécologie", "hormones"]
  },
  {
    id: 31, jour: 4,
    categorie: "Phytothérapie / Gynécologie",
    sujet: "Plantes progestérone-like",
    question: "Quelles plantes ont une activité progestérone-like ?",
    options: [
      "Sauge et trèfle rouge (activité oestrogène-like)",
      "Alchémille et houblon",
      "Gattilier et yam (igname sauvage)",
      "Millepertuis et valériane"
    ],
    bonne: 1,
    explication: "Alchémille (Alchemilla vulgaris) et Houblon (Humulus lupulus) sont les deux plantes progestérone-like retenues dans ce cours. Le Gattilier est progestérone-like aussi mais n'est pas dans cette liste. Sauge/trèfle = oestrogène-like.",
    piege: "Ne pas confondre les plantes oestrogène-like (sauge, trèfle, houblon en partie) et progestérone-like. Pour ce cours : alchémille + houblon = progestérone.",
    mnemo: "ALChémille + HOublon = ALHO = plantes progestérone. L'ALCHEMY du houblon pour la progestérone.",
    tags: ["phytothérapie", "gynécologie", "hormones"]
  },
  {
    id: 32, jour: 4,
    categorie: "Gynécologie",
    sujet: "Symptômes de la ménopause (intrus)",
    question: "Parmi les propositions suivantes, laquelle est l'INTRUS (n'est pas un symptôme habituel de la ménopause) ?",
    options: [
      "Bouffées de chaleur",
      "Sécheresse vaginale",
      "Perte de poids significative",
      "Troubles du sommeil"
    ],
    bonne: 2,
    explication: "La ménopause est associée à une PRISE de poids (baisse du métabolisme, redistribution des graisses), pas une perte. Les bouffées de chaleur, la sécheresse vaginale et les troubles du sommeil sont des symptômes classiques.",
    piege: "Piège intuitif : certaines femmes perdent du poids à la ménopause, mais c'est atypique. L'association classique est prise de poids. C'est l'INTRUS demandé.",
    mnemo: "MÉNO = PAUSE du cycle = pause du métabolisme aussi = PRISE de poids. Perte de poids = intrus.",
    tags: ["gynécologie", "ménopause", "intrus"]
  },
  {
    id: 33, jour: 4,
    categorie: "Anatomie / Physiologie",
    sujet: "Pancréas",
    question: "Concernant le pancréas, quelles propositions sont correctes ?",
    options: [
      "Les îlots de Langerhans = sécrétions exocrines (enzymes digestives)",
      "L'insuline favorise la dégradation du glycogène en glucose",
      "Les îlots de Langerhans = sécrétions endocrines ; l'insuline favorise le stockage du glucose en glycogène dans le foie, les muscles et le tissu adipeux",
      "Le glucagon et l'insuline sont sécrétés par les mêmes cellules"
    ],
    bonne: 2,
    explication: "Pancréas ENDOCRINE = îlots de Langerhans (cellules alpha : glucagon ; cellules bêta : insuline). L'insuline = hormone de STOCKAGE : fait entrer le glucose dans les cellules et le convertit en glycogène (foie, muscles) ou en graisses (tissu adipeux).",
    piege: "Îlots de Langerhans = ENDOCRINE (hormones dans le sang) ≠ EXOCRINE (sucs digestifs dans le duodénum). Insuline = STOCKAGE (hypoglycémiante). Glucagon = DÉSTOCKAGE (hyperglycémiant).",
    mnemo: "ÎLOTS = ILES dans le pancréas = ENDOCRINE. Insuline = range le sucre (stocke). Glucagon = sort le sucre (déstocke).",
    tags: ["anatomie", "physiologie", "glycémie", "pancréas"]
  },
  {
    id: 34, jour: 4,
    categorie: "Fleurs de Bach",
    sujet: "Fleur de Bach : vengeance et rancune",
    question: "Quelle fleur de Bach correspond aux sentiments de vengeance, jalousie et rancune ?",
    options: [
      "Willow (Saule)",
      "Holly (Houx)",
      "Chicory (Chicorée)",
      "Vine (Vigne)"
    ],
    bonne: 1,
    explication: "Holly (Houx) = 37e fleur de Bach. Correspond aux émotions négatives intenses dirigées vers autrui : jalousie, haine, envie, désir de vengeance, rancune. C'est la fleur de l'amour conditionnel blessé.",
    piege: "Willow = amertume/ressentiment passif. Chicory = possessivité/amour conditionnel. Vine = domination/autoritarisme. Holly = vengeance/jalousie = le plus intense.",
    mnemo: "HOLLY = le HOUX pique ! Jalousie qui pique, vengeance qui pique = HOLLY.",
    tags: ["fleurs de Bach", "émotions", "psychologie"]
  },
  {
    id: 35, jour: 4,
    categorie: "Fleurs de Bach",
    sujet: "Fleur de Bach : souffrance cachée",
    question: "Quelle fleur de Bach correspond à une personne qui minimise sa souffrance et cache sa douleur derrière un sourire ?",
    options: [
      "Star of Bethlehem (Étoile de Bethléem)",
      "Agrimony (Aigremoine)",
      "Centaury (Centaurée)",
      "Larch (Mélèze)"
    ],
    bonne: 1,
    explication: "Agrimony (Aigremoine) = la fleur du masque joyeux. Ces personnes cachent leurs tourments derrière l'humour, la légèreté et un sourire. En société elles paraissent gaies mais intérieurement souffrent. Séparation vécue mais minimisée.",
    piege: "Star of Bethlehem = trauma, choc, deuil exprimé. Centaury = incapacité à dire non. Larch = manque de confiance. Agrimony = souffrance CACHÉE.",
    mnemo: "AGRIMONY = l'AGRIable qui souffre en silence. Agréable en façade, douleur derrière.",
    tags: ["fleurs de Bach", "émotions", "psychologie"]
  },
  {
    id: 36, jour: 4,
    categorie: "Phytothérapie",
    sujet: "Plantes anti-inflammatoires / rhumatismes",
    question: "Quelles plantes sont indiquées pour l'inflammation, les surrénales et les rhumatismes ?",
    options: [
      "Valériane et mélisse",
      "Echinacea et thym",
      "Gingembre et cassis",
      "Pissenlit et artichaut"
    ],
    bonne: 2,
    explication: "Gingembre (gingérols = puissants anti-inflammatoires) et Cassis (feuilles de cassis riches en flavonoïdes, stimulent les surrénales et ont une action anti-inflammatoire/anti-rhumatismale reconnue).",
    piege: "Valériane/mélisse = nerveux/sommeil. Echinacea/thym = immunité/respiratoire. Pissenlit/artichaut = foie/drainage.",
    mnemo: "GINGEMBRE + CASSIS = le duo enflammé qui calme les articulations. Gingembre chaud + Cassis violet = anti-rhumatismal.",
    tags: ["phytothérapie", "rhumatologie", "anti-inflammatoire"]
  },
  {
    id: 37, jour: 4,
    categorie: "Phytothérapie",
    sujet: "Plantes pour spasmes intestinaux",
    question: "Quelles plantes sont indiquées pour les spasmes intestinaux ?",
    options: [
      "Artichaut et radis noir",
      "Basilic et fenouil",
      "Gingembre et cassis",
      "Millepertuis et valériane"
    ],
    bonne: 1,
    explication: "Basilic (eugénol = antispasmodique) et Fenouil (anéthole = antispasmodique et carminatif) sont les deux plantes anti-spasmodiques digestives retenues dans ce cours.",
    piege: "Artichaut/radis = foie. Gingembre/cassis = anti-inflammatoire. Millepertuis/valériane = psyché. Basilic + Fenouil = ventre qui se détend.",
    mnemo: "BASILIC + FENOUIL = les deux herbes de cuisine qui détendent les intestins. Un ventre heureux aime la cuisine méditerranéenne.",
    tags: ["phytothérapie", "digestion", "antispasmodique"]
  },
  {
    id: 38, jour: 4,
    categorie: "Phytochimie",
    sujet: "Plantes à dérivés salicylés",
    question: "Quelles plantes contiennent des dérivés salicylés (aspirine naturelle) ?",
    options: [
      "Arnica et hélichryse italienne",
      "Saule et reine des prés",
      "Ortie et prêle",
      "Rhodiola et ginseng"
    ],
    bonne: 1,
    explication: "Saule (Salix alba : salicine → acide salicylique) et Reine des prés (Filipendula ulmaria : spiréine → aspirine naturelle, d'où le nom ASpIRINE). Ces deux plantes sont à l'origine de la synthèse de l'aspirine.",
    piege: "Arnica/hélichryse = hématomes. Ortie/prêle = reminéralisant. Rhodiola/ginseng = adaptogènes. Saule + Reine des prés = SALICYLÉS = anti-douleur/fièvre.",
    mnemo: "SAULE + REINE DES PRÉS = le duo ASPIRIN naturel. La REINE est la mère de l'ASpirine (ASpiRIN vient de la REINE des prés).",
    tags: ["phytochimie", "anti-inflammatoire", "analgésique"]
  },
  {
    id: 39, jour: 4,
    categorie: "Nutrition",
    sujet: "Acide aminé limitant des légumineuses",
    question: "Quel est l'acide aminé limitant des légumineuses (légumes secs) ?",
    options: [
      "Tryptophane",
      "Lysine",
      "Méthionine",
      "Glutamine"
    ],
    bonne: 2,
    explication: "Les légumineuses (lentilles, pois, haricots...) sont riches en lysine mais PAUVRES en méthionine. Les céréales, elles, sont riches en méthionine mais pauvres en lysine. D'où l'intérêt de les associer (riz + lentilles = protéines complètes).",
    piege: "Piège : les légumineuses CONTIENNENT de la lysine (ce n'est pas leur acide aminé limitant). Leur DÉFICIT est en méthionine.",
    mnemo: "LÉGumineuse manque de MÉTHIONINE. Céréale manque de Lysine. Ensemble = COMPLETS. Riz-lentilles = gagnants !",
    tags: ["nutrition", "protéines", "végétarien"]
  },
  {
    id: 40, jour: 4,
    categorie: "Nutrition",
    sujet: "Enzymes protéolytiques en fin de repas",
    question: "Quel fruit pris en fin de repas aide à la digestion des protéines (protéolyse) ?",
    options: [
      "Ananas",
      "Kiwi",
      "Papaye",
      "Citron"
    ],
    bonne: 2,
    explication: "La Papaye contient de la PAPAÏNE (enzyme protéolytique puissante). Elle aide à digérer les protéines. L'ananas contient de la bromélaïne (aussi protéolytique), mais le cours retient la papaye pour cette question.",
    piege: "L'ananas (bromélaïne) est aussi une réponse possible dans la littérature, mais le cours retient la PAPAYE. Mémoriser papaye = papaïne = protéines.",
    mnemo: "PAPAye → PAPAïne → digère les PROtéines. Papa mange la papaye après le repas.",
    tags: ["nutrition", "enzymes", "digestion"]
  },
  {
    id: 41, jour: 5,
    categorie: "Biochimie / Neurotransmetteurs",
    sujet: "Précurseur de la sérotonine",
    question: "Quel acide aminé est le précurseur de la sérotonine ?",
    options: [
      "Tyrosine",
      "Phénylalanine",
      "Tryptophane",
      "Méthionine"
    ],
    bonne: 2,
    explication: "Voie de synthèse : Tryptophane → 5-HTP (5-hydroxy-tryptophane) → Sérotonine. La tyrosine est le précurseur de la dopamine (tyrosine → DOPA → dopamine). Ces deux voies sont distinctes et importantes à ne pas confondre.",
    piege: "CONFUSION FRÉQUENTE : Tryptophane = sérotonine. Tyrosine = dopamine. Ce sont deux voies totalement distinctes.",
    mnemo: "TRYPtophane → SéROTonine. TYROSINE → DOPAMINE. TRY = séROTonine. TYR = DOpamine.",
    tags: ["neurotransmetteurs", "biochimie", "important"],
    important: true
  },
  {
    id: 42, jour: 5,
    categorie: "Biochimie / Chrono-nutrition",
    sujet: "Fabrication de la mélatonine",
    question: "À partir de quelle heure la production de mélatonine débute-t-elle ?",
    options: [
      "À partir de 21h-22h",
      "À partir de 18h",
      "Uniquement après minuit",
      "En continu tout au long de la journée"
    ],
    bonne: 1,
    explication: "Selon ce cours, la fabrication de mélatonine (hormone du sommeil) débute dès 18h avec la diminution de la lumière. Elle est produite par la glande pinéale (épiphyse) à partir de la sérotonine. Son pic est vers 2h-3h du matin.",
    piege: "La réponse habituelle en chronobiologie est plutôt 21h, mais CE COURS retient 18h. Mémoriser la réponse du cours : 18h.",
    mnemo: "MÉLATONINE dès 18H = heure de fermeture des bureaux. Le corps ferme ses bureaux à 18h et prépare le sommeil.",
    tags: ["biochimie", "sommeil", "mélatonine", "chiffres"]
  },
  {
    id: 43, jour: 5,
    categorie: "Nutrition / Lipides",
    sujet: "Acides gras mono-insaturés",
    question: "Les acides gras mono-insaturés appartiennent à quelle famille d'oméga ?",
    options: [
      "Oméga 3",
      "Oméga 6",
      "Oméga 9",
      "Oméga 12"
    ],
    bonne: 2,
    explication: "Oméga 9 = acides gras MONO-insaturés (une seule double liaison). Exemple : acide oléique dans l'huile d'olive. Oméga 3 et 6 = POLY-insaturés (plusieurs doubles liaisons) et ESSENTIELS (l'organisme ne peut pas les fabriquer).",
    piege: "À RETENIR : Oméga 9 = mono-insaturé (non essentiel, l'organisme peut en fabriquer). Oméga 3/6 = poly-insaturés essentiels.",
    mnemo: "Oméga 9 = huile d'olive = 1 seule double liaison. UN seul C=C = MONO. Oméga 3 et 6 = nombreuses = POLY.",
    tags: ["nutrition", "lipides", "oméga", "important"],
    important: true
  },
  {
    id: 44, jour: 5,
    categorie: "Nutrition / Lipides",
    sujet: "Prévention des carences en AGE",
    question: "Pour éviter les carences en acides gras essentiels (AGE), il faut :",
    options: [
      "Utiliser l'huile d'arachide pour toutes les cuissons et éviter les poissons gras",
      "Éviter l'huile d'arachide en friture à >170°C, apporter EPA/DHA, respecter le rapport oméga 6/oméga 3",
      "Prioriser les graisses saturées et limiter tous les oméga",
      "Ne consommer que de l'huile de coco et éviter les huiles végétales"
    ],
    bonne: 1,
    explication: "Trois axes pour éviter les carences en AGE : 1) Qualité de cuisson (l'huile d'arachide se dégrade à >170°C → acides gras trans toxiques). 2) Apporter EPA/DHA (poissons gras ou compléments). 3) Rééquilibrer le ratio oméga 6/oméga 3 (idéal : 4/1, occidental actuel : 15-20/1).",
    piege: "L'huile d'arachide est à éviter en FRITURE FORTE (>170°C), pas à bannir totalement. Le ratio oméga 6/3 est crucial : trop d'oméga 6 = inflammation.",
    mnemo: "3 règles AGE : PAS d'ARACHIDE en FRITURE, EPA/DHA dans l'assiette, RATIO 6/3 équilibré.",
    tags: ["nutrition", "lipides", "oméga", "cuisson"]
  },
  {
    id: 45, jour: 5,
    categorie: "Micronutrition / Cardiovasculaire",
    sujet: "Hypertension et minéraux",
    question: "Quel minéral doit être limité en cas d'hypertension artérielle ?",
    options: [
      "Potassium",
      "Magnésium",
      "Sodium",
      "Calcium"
    ],
    bonne: 2,
    explication: "Le SODIUM (sel) favorise la rétention d'eau et augmente la volémie (volume sanguin), ce qui élève la pression artérielle. À l'inverse, le potassium et le magnésium sont bénéfiques pour abaisser la TA.",
    piege: "Piège : le potassium et le magnésium sont cardiovasculo-protecteurs. Ce sont des alliés contre l'hypertension. Seul le SODIUM est à limiter.",
    mnemo: "SODIUM (sel) = HYPERTENSION. POTASSIUM = contre-équilibre le sodium. Moins de sel = moins de pression.",
    tags: ["micronutrition", "cardiovasculaire", "minéraux"]
  },
  {
    id: 46, jour: 5,
    categorie: "Micronutrition",
    sujet: "Vitamine B1 et sucres rapides",
    question: "Quelle vitamine voit ses besoins augmenter lors d'une consommation excessive de sucres rapides ?",
    options: [
      "Vitamine A",
      "Vitamine B1 (thiamine)",
      "Vitamine C",
      "Vitamine E"
    ],
    bonne: 1,
    explication: "La Vitamine B1 (thiamine) est un co-enzyme INDISPENSABLE du métabolisme glucidique (cycle de Krebs, pyruvate déshydrogénase). Plus on consomme de sucres, plus on consomme de B1. Carence → béribéri, troubles neurologiques.",
    piege: "B1 est la vitamine du SUCRE. Plus de sucre = plus de B1 nécessaire. C'est pour ça que les gros consommateurs de sucre/alcool sont souvent carencés en B1.",
    mnemo: "B1 = la VITAMINE des GLUCIDES. B1 = Burn 1 glucose à la fois. Sucres rapides consomment la B1 très rapidement.",
    tags: ["micronutrition", "vitamines B", "glucides"]
  },
  {
    id: 47, jour: 5,
    categorie: "Micronutrition / Gynécologie",
    sujet: "Vitamine essentielle avant la grossesse",
    question: "Quelle vitamine est indispensable pour une femme désirant concevoir un enfant ?",
    options: [
      "Vitamine D",
      "Vitamine B12",
      "Vitamine B9 (acide folique / folates)",
      "Vitamine K"
    ],
    bonne: 2,
    explication: "La Vitamine B9 (folates/acide folique) est INDISPENSABLE avant la conception et les 3 premiers mois de grossesse pour prévenir les malformations du tube neural (spina bifida, anencéphalie). Supplémentation recommandée : 400 µg/jour.",
    piege: "La vitamine D est aussi importante en grossesse mais la B9 est LA vitamine préconceptionnelle. La B12 est à supplémenter chez les végétaliennes enceintes.",
    mnemo: "B9 = Bébé 9 mois = vitamine de la GROSSESSE. B9 → BÉBÉ en bonne santé. Folates = fondations du tube neural.",
    tags: ["micronutrition", "gynécologie", "grossesse", "important"]
  },
  {
    id: 48, jour: 5,
    categorie: "Naturopathie / Terrain",
    sujet: "Terrain baso-colitique",
    question: "Quelle prise en charge naturopathique convient au terrain baso-colitique ?",
    options: [
      "Plantes respiratoires et cures de vitamine C",
      "Plantes dermatologiques et acides gras essentiels",
      "Plantes de l'appareil digestif et pro/prébiotiques",
      "Plantes cardiovasculaires et magnésium"
    ],
    bonne: 2,
    explication: "Le terrain BASO-COLITIQUE (baso = tendance acide/base + colitique = colon irritable) cible l'intestin. Soutien via plantes digestives (fenouil, basilic, mélisse) et pro/prébiotiques pour rééquilibrer le microbiote.",
    piege: "Baso-colitique ≠ terrain respiratoire, ≠ terrain cutané, ≠ terrain cardiovasculaire. Le 'colitique' pointe vers le côlon.",
    mnemo: "COLITIQUE = CÔLON. Pour le côlon : PLANTES DIGESTIVES + PRO/PRÉBIOTIQUES. Le microbiote vit dans le côlon.",
    tags: ["terrain", "naturopathie", "microbiote"]
  },
  {
    id: 49, jour: 5,
    categorie: "Naturopathie / Classification",
    sujet: "Classification de Marchesseau — terrain intoxiqué",
    question: "Dans la classification de Marchesseau, à quel stade correspond le terrain intoxiqué ?",
    options: [
      "Stade 1",
      "Stade 2",
      "Stade 3",
      "Stade 4"
    ],
    bonne: 1,
    explication: "Classification de Marchesseau : Stade 1 = carencé. Stade 2 = intoxiqué. Stade 3 = dystonique. Stade 4 = dysorganique (le plus grave). Terrain intoxiqué = stade 2.",
    piege: "Question de mémorisation pure. Retenir l'ordre : 1=carencé, 2=intoxiqué, 3=dystonique, 4=dysorganique.",
    mnemo: "1-CARENCE, 2-INTOXIQUÉ, 3-DYSTONE, 4-DYSORGANIQUE. 1,2,3,4 = de moins grave au plus grave.",
    tags: ["terrain", "naturopathie", "classification", "chiffres"]
  },
  {
    id: 50, jour: 5,
    categorie: "Naturopathie / Terrain",
    sujet: "Terrain C carencé en vitamine F",
    question: "Quelles manifestations entraîne un terrain de type C carencé en vitamine F ?",
    options: [
      "Troubles cardiovasculaires et hypertension",
      "Problèmes osseux et crampes musculaires",
      "Baisse immunitaire, troubles cutanés et asthme",
      "Troubles digestifs et colites chroniques"
    ],
    bonne: 2,
    explication: "La vitamine F = acides gras essentiels (AGE). Une carence en vitamine F affecte : l'immunité (les AGE sont précurseurs de prostaglandines immunomodulatrices), la peau (membrane cellulaire lipidique), et les voies respiratoires (terrain asthmatique, inflammation).",
    piege: "Vitamine F ≠ vitamine C. Vitamine F = acides Gras essentiels. Leur carence touche immunité, peau et respiration.",
    mnemo: "Vitamine F = Fat (gras) = acides Gras essentiels. Manque de gras = peau sèche + immuno faible + asthme.",
    tags: ["terrain", "naturopathie", "lipides", "vitamines"]
  },
  {
    id: 51, jour: 6,
    categorie: "Nutrition / Biochimie",
    sujet: "Réaction de Maillard",
    question: "La réaction de Maillard est favorisée par :",
    options: [
      "Le froid et l'absence de sucre",
      "Les sucres, le stockage à température ambiante et les températures élevées de cuisson",
      "L'humidité et les températures modérées",
      "La congélation et les acides organiques"
    ],
    bonne: 1,
    explication: "La réaction de Maillard = réaction non-enzymatique entre sucres réducteurs et acides aminés sous l'effet de la chaleur → brunissement des aliments, arômes (croûte du pain, viande rôtie). Favorisée par : sucres + chaleur + stockage à température ambiante. Produit des AGE (Advanced Glycation End-products) = glycotoxines.",
    piege: "La réaction de Maillard ≠ caramélisation (qui ne nécessite pas de protéines). Elle est favorisée par le CHAUD et le SUCRE, pas par le froid.",
    mnemo: "Maillard = MAILLOT de bain en été = CHALEUR + SUCRE = brunissement. Réaction de BRUNISSEMENT non enzymatique.",
    tags: ["nutrition", "biochimie", "cuisson"]
  },
  {
    id: 52, jour: 6,
    categorie: "Microbiote",
    sujet: "Vitamines synthétisées par les probiotiques",
    question: "Quelles vitamines les bactéries probiotiques (flore intestinale) peuvent-elles synthétiser ?",
    options: [
      "Vitamine A, D, E",
      "Vitamine C, B1, B2",
      "Vitamine K, B12, B9",
      "Vitamine B6, B3, D"
    ],
    bonne: 2,
    explication: "Le microbiote intestinal synthétise : Vitamine K (K2, coagulation), Vitamine B12 (mais peu absorbée dans le côlon) et Vitamine B9 (folates). Ces vitamines sont partiellement d'origine bactérienne.",
    piege: "Les vitamines A, D, E sont liposolubles et non synthétisées par les bactéries. La B12 et B9 sont bien synthétisées mais leur absorption colique est limitée.",
    mnemo: "K + B12 + B9 = le trio bactérien. K pour coaguler, B12 pour les neurones, B9 pour diviser les cellules.",
    tags: ["microbiote", "vitamines", "probiotiques"]
  },
  {
    id: 53, jour: 6,
    categorie: "Microbiote / Pédiatrie",
    sujet: "Probiotique pour eczéma atopique du nourrisson",
    question: "Quelle souche probiotique est spécifiquement retenue pour l'eczéma atopique du nouveau-né ?",
    options: [
      "Lactobacillus acidophilus",
      "Bifidobacterium longum",
      "Lactobacillus rhamnosus GG",
      "Saccharomyces boulardii"
    ],
    bonne: 2,
    explication: "Lactobacillus rhamnosus GG (LGG) est la souche probiotique la mieux documentée pour la prévention et le traitement de l'eczéma atopique chez le nourrisson. Mémoriser le nom complet avec 'GG'.",
    piege: "La souche GG est importante à retenir précisément. L. acidophilus = digestion générale. B. longum = gros intestin. S. boulardii = diarrhée du voyageur.",
    mnemo: "LGG = L pour L'eczéma. GG comme un bébé qui a la peau irritée et dit 'GG aide !' Lactobacillus rhamnosus GG.",
    tags: ["microbiote", "probiotiques", "pédiatrie", "mémorisation"]
  },
  {
    id: 54, jour: 6,
    categorie: "Nutrition / Microbiote",
    sujet: "Fermentation vs putréfaction intestinale",
    question: "Concernant la fermentation et la putréfaction intestinale :",
    options: [
      "Les deux processus sont néfastes ; la diarrhée aggrave la putréfaction",
      "Les acides de fermentation sont non néfastes ; les protéines se dégradent dans le côlon descendant ; la constipation = produits de putréfaction absorbés",
      "La fermentation ne se produit que dans l'intestin grêle",
      "La putréfaction est bénéfique pour le microbiote"
    ],
    bonne: 1,
    explication: "FERMENTATION (sucres) = acides organiques courts (AGCC) → NON néfastes, nutritifs pour les colonocytes. PUTRÉFACTION (protéines) = amines, phénols, ammoniac → dans le côlon DESCENDANT. Constipation = les produits de putréfaction sont réabsorbés et atteignent le foie → intoxication.",
    piege: "Les acides de fermentation ne sont PAS tous néfastes (le butyrate est même bénéfique). La putréfaction, elle, est nocive. Et la constipation aggrave la putréfaction (pas la diarrhée).",
    mnemo: "FERMENTATION = sucres = acides BONS. PUTRÉFACTION = protéines = TOXINES. CONSTIPATION = les toxines de putréfaction retournent au foie.",
    tags: ["microbiote", "digestion", "nutrition"]
  },
  {
    id: 55, jour: 6,
    categorie: "Régimes / Nutrition",
    sujet: "Méthode Kousmine : température de cuisson",
    question: "Selon la méthode Kousmine, à quelle température maximale doit-on cuire les aliments ?",
    options: [
      "Moins de 40°C",
      "Moins de 60°C",
      "Moins de 100°C",
      "Moins de 120°C"
    ],
    bonne: 2,
    explication: "La méthode du Dr Kousmine préconise une cuisson DOUCE, inférieure à 100°C (ébullition), pour préserver les nutriments, enzymes et vitamines thermosensibles. À distinguer du crudivorisme (<40°C).",
    piege: "Ne pas confondre Kousmine (<100°C) avec Crudivorisme (<40°C). Kousmine autorise la cuisson mais douce. Crudivorisme = tout cru ou très peu chauffé.",
    mnemo: "KOUSMINE = comme bouillir doucement. En dessous de 100°C = pas d'ébullition violente. 100°C = seuil de l'eau qui bout.",
    tags: ["régimes", "cuisson", "chiffres"],
    important: true
  },
  {
    id: 56, jour: 6,
    categorie: "Physiologie digestive",
    sujet: "Durée de la digestion gastrique",
    question: "Quelle est la durée de digestion d'un repas équilibré dans l'estomac ?",
    options: [
      "15 à 30 minutes",
      "1 à 2 heures",
      "4 à 6 heures",
      "8 à 12 heures"
    ],
    bonne: 1,
    explication: "Un repas équilibré passe 1 à 2 heures dans l'estomac (chyme). Ensuite : 4-6h dans l'intestin grêle, 12-24h dans le côlon. Les graisses rallongent le temps de vidange gastrique.",
    piege: "Ne pas confondre le temps gastrique (1-2h) avec le transit complet (24-48h). L'estomac seul : 1-2h.",
    mnemo: "ESTOMAC = 1-2 HEURES. Comme une réunion de travail. Après, ça part dans les intestins.",
    tags: ["physiologie", "digestion", "chiffres"]
  },
  {
    id: 57, jour: 6,
    categorie: "Régimes",
    sujet: "Régime Seignalet : aliments interdits",
    question: "Quels aliments sont interdits dans le régime Seignalet ?",
    options: [
      "Riz, quinoa, légumes et poisson",
      "Seigle, lait de chèvre, épeautre et bière",
      "Huile d'olive, fruits et légumes",
      "Viandes blanches, oeufs et légumineuses"
    ],
    bonne: 1,
    explication: "Le régime Seignalet (hypotoxique) interdit : les laits animaux (TOUS : vache, chèvre, brebis) et les céréales mutées/glutineuses (blé, seigle, épeautre, kamut, orge). La bière = dérivé de céréale (orge/seigle). Autorisé : riz, sarrasin, fruits, légumes, viande, poisson.",
    piege: "Le lait de CHÈVRE est interdit chez Seignalet (tous les laits animaux). La bière est interdite car faite à partir de céréales à gluten. Épeautre = ancêtre du blé, interdit.",
    mnemo: "SEIGNALET = régime HYPOtoxique (on réduit les toxines). Interdit : LAIT (toutes espèces) + CÉRÉALES À GLUTEN (seigle, épeautre, blé) + BIÈRE. Autorisé : riz, légumes, fruits, viandes.",
    tags: ["régimes", "Seignalet", "alimentation"],
    important: true
  },
  {
    id: 58, jour: 6,
    categorie: "Prévention cardiovasculaire",
    sujet: "Micronutriments anti-artériosclérose",
    question: "Quels micronutriments participent à la prévention de l'artériosclérose ?",
    options: [
      "Sodium, chlore, fer",
      "Zinc, silicium, magnésium + vitamine C + vitamines B1 et B3",
      "Vitamine A, D, E",
      "Iode, sélénium, chrome"
    ],
    bonne: 1,
    explication: "La prévention de l'artériosclérose requiert : Zinc (antioxydant), Silicium (souplesse artérielle), Magnésium (cardioprotecteur), Vitamine C (synthèse collagène vasculaire, antioxydant), B1 et B3 (métabolisme énergétique des cellules musculaires).",
    piege: "Le sodium est à ÉVITER dans ce contexte. Les vitamines A, D, E ont d'autres fonctions. Ce sont zinc/silicium/magnésium + C + B1/B3 le bon trio.",
    mnemo: "Artères = ZinCSiMag + C + B1B3. ZinC-Si-Mag comme des matériaux de construction pour les artères.",
    tags: ["cardiovasculaire", "prévention", "micronutrition"]
  },
  {
    id: 59, jour: 6,
    categorie: "Régimes",
    sujet: "Régime excluant les laits animaux",
    question: "Quel régime exclut spécifiquement tous les laits animaux ?",
    options: [
      "Régime Atkins",
      "Méthode Kousmine",
      "Régime du Dr Seignalet",
      "Régime paléo"
    ],
    bonne: 2,
    explication: "Le régime hypotoxique du Dr Seignalet exclut TOUS les laits animaux et produits laitiers (vache, chèvre, brebis, jument...) ainsi que les céréales mutées. Il autorise en revanche le riz, le sarrasin, les légumes, fruits, viandes et poissons.",
    piege: "Atkins = supprime les féculents. Kousmine = cuisson <100°C. Seignalet = interdit laits ET céréales à gluten.",
    mnemo: "SEIGNAlet = SEIGNe les laits = les EXclut tous. Seignalet = allergique aux laits animaux.",
    tags: ["régimes", "Seignalet", "laits"]
  },
  {
    id: 60, jour: 6,
    categorie: "Régimes",
    sujet: "Crudivorisme et véganisme",
    question: "Concernant le crudivorisme-véganisme :",
    options: [
      "Autoriser la cuisson jusqu'à 80°C ; manger principalement des viandes crues",
      "Manger des aliments crus ou chauffés à moins de 40°C maximum",
      "Cuire à la vapeur à 120°C et éviter les produits laitiers uniquement",
      "Suivre un régime à base de poissons crus uniquement"
    ],
    bonne: 1,
    explication: "Le crudivorisme préconise de ne pas chauffer au-delà de 40°C (pour préserver les enzymes naturelles des aliments). Le véganisme exclut tous les produits d'origine animale. Combinés : aliments d'origine végétale, crus ou très peu chauffés (<40°C).",
    piege: "Ne pas confondre le seuil de Kousmine (<100°C) et le seuil du crudivorisme (<40°C). Le crudivorisme est beaucoup plus restrictif.",
    mnemo: "CRUDIVORISME = CRUD + CRUE. Tout cru ou presque. Seuil : 40°C = température corporelle. Ne pas cuire plus que votre propre corps.",
    tags: ["régimes", "crudivorisme", "véganisme", "chiffres"]
  },
  {
    id: 61, jour: 7,
    categorie: "Cures naturopathiques",
    sujet: "Objectifs d'une cure de revitalisation",
    question: "Qu'est-ce qu'une cure de revitalisation permet d'accomplir ?",
    options: [
      "Drainer les toxines et vider les émonctoires",
      "Corriger les carences micronutritionnelles, rééquilibrer l'alimentation et reconsolider les réserves minérales",
      "Perdre du poids rapidement en restricant l'apport calorique",
      "Stimuler le foie et les reins pour éliminer les déchets"
    ],
    bonne: 1,
    explication: "La cure de revitalisation a 3 objectifs : 1) Corriger les carences en micronutriments (vitamines, minéraux, oligo-éléments). 2) Rééquilibrer l'alimentation globalement. 3) Reconstituer/consolider les réserves minérales de l'organisme.",
    piege: "Revitalisation ≠ cure détox/drainage (qui vide). Revitalisation = CONSTRUCTION = remplir les réserves.",
    mnemo: "Revitalisation = 3R : Reconstituer + Rééquilibrer + Reminéraliser.",
    tags: ["cures", "naturopathie", "revitalisation"]
  },
  {
    id: 62, jour: 7,
    categorie: "Pathologies",
    sujet: "Diabète — types et facteurs",
    question: "Concernant le diabète, quelles propositions sont correctes ?",
    options: [
      "Le type 1 survient après 60 ans ; le type 2 est toujours d'origine génétique",
      "Le type 1 est lié à la sédentarité ; le type 2 est auto-immun",
      "Le type 1 est parfois consécutif à une maladie auto-immune ; le type 2 survient généralement après 45 ans ; la sédentarité est un facteur de risque",
      "Les deux types se traitent uniquement par l'insuline"
    ],
    bonne: 2,
    explication: "Diabète type 1 : destruction auto-immune des cellules bêta, souvent avant 30 ans, insulinodépendant. Diabète type 2 : résistance à l'insuline, généralement après 45 ans, lié au mode de vie (sédentarité, surpoids, alimentation). Sédentarité = facteur de risque majeur du T2.",
    piege: "Ne pas inverser les types. T1 = auto-immun/jeune. T2 = mode de vie/45+. La sédentarité concerne le TYPE 2.",
    mnemo: "T1 = auto-Immun (I comme Insuline manquante). T2 = mode de vie après 45 ans (deux = deux fois plus de graisse = surpoids).",
    tags: ["pathologies", "diabète", "métabolisme"]
  },
  {
    id: 63, jour: 7,
    categorie: "Nutrition / Pathologies",
    sujet: "Alimentation bénéfique pour le diabète",
    question: "Quels aliments faut-il favoriser en cas de diabète ?",
    options: [
      "Pain blanc, riz blanc, pommes de terre",
      "Jus de fruits, miel, dattes",
      "Ail, citron, légumes et crudités",
      "Viandes grasses, fromages, charcuteries"
    ],
    bonne: 2,
    explication: "Ail (allicine → effet hypoglycémiant), Citron (index glycémique bas, acidifiant bénéfique), Légumes et crudités (fibres → ralentissent l'absorption du glucose, index glycémique bas). Ces aliments stabilisent la glycémie.",
    piege: "Pain blanc, riz blanc, pommes de terre = IG élevé = à éviter. Jus de fruits = sucres rapides. Viandes grasses = risque cardiovasculaire.",
    mnemo: "Diabète = AIL + CITRON + LÉGUMES = la salade du diabétique modèle. Pas de sucres rapides.",
    tags: ["nutrition", "diabète", "alimentation"]
  },
  {
    id: 64, jour: 7,
    categorie: "Physiologie digestive",
    sujet: "Causes de dysfonctionnement digestif",
    question: "Quelles sont les principales causes de dysfonctionnement digestif ?",
    options: [
      "Trop de fruits et légumes, excès d'eau",
      "Antibiotiques, manque de mastication, café au lait",
      "Excès de fibres, trop de probiotiques",
      "Carence en vitamine D et excès de magnésium"
    ],
    bonne: 1,
    explication: "Trois causes majeures : Antibiotiques (détruisent le microbiote), Manque de mastication (charge excessive pour l'estomac et les enzymes), Café au lait (l'acidité du café coagule les protéines du lait → bolus indigeste).",
    piege: "L'association café + lait est un piège alimentaire souvent ignoré. Le café précipite les caséines du lait, formant un coagulum difficile à digérer.",
    mnemo: "3 ennemis de la digestion : ANTIBIO (détruit microbiote) + PAS MASTIQUER + CAFÉ AU LAIT (coagule).",
    tags: ["digestion", "physiologie", "microbiote"]
  },
  {
    id: 65, jour: 7,
    categorie: "Nutrition",
    sujet: "Aliments générateurs de gaz",
    question: "Quels aliments sont connus pour produire des gaz intestinaux ?",
    options: [
      "Riz, carottes, betteraves",
      "Poulet, poisson, oeufs",
      "Tomate, choux, melon",
      "Huile d'olive, noix, amandes"
    ],
    bonne: 2,
    explication: "Tomate (acides organiques + fermentation), Choux (glucosinolates fermentescibles, soufre), Melon (sucres fermentescibles rapidement, surtout si mal combiné) sont les trois aliments identifiés dans ce cours comme générateurs de gaz.",
    piege: "Les graisses ne génèrent pas de gaz (elles ne fermentent pas). Riz et carottes sont bien tolérés. Choux et légumes crucifères sont les plus connus pour les flatulences.",
    mnemo: "ToCheMe = TOmate + CHOux + MElon = trio gazeux. ToCheMe fait TOC-TOC dans le ventre.",
    tags: ["nutrition", "digestion", "ballonnements"]
  },
  {
    id: 66, jour: 7,
    categorie: "Nutrition / Combinaisons alimentaires",
    sujet: "Aliments à consommer seuls",
    question: "Quels aliments doivent être consommés seuls ou 4h après un repas ?",
    options: [
      "Pain complet, riz brun, pâtes intégrales",
      "Beurre, fromage, crème fraîche",
      "Yaourt, melon, miel",
      "Viandes blanches, poisson, légumineuses"
    ],
    bonne: 2,
    explication: "Yaourt (fermentation lente, perturbe les autres digestions), Melon (fructose qui fermente vite, idéal seul), Miel (sucres simples très fermentescibles) → ces trois aliments sont à consommer à distance des repas (4h après) pour ne pas perturber la digestion globale.",
    piege: "Ces aliments ne sont pas 'dangereux' en soi, mais leur fermentation rapide perturbe la digestion des autres aliments si consommés ensemble.",
    mnemo: "YAOURT + MELON + MIEL = les 3 solitaires. Ils préfèrent être seuls. 4h après le repas ou rien.",
    tags: ["nutrition", "combinaisons", "digestion"]
  },
  {
    id: 67, jour: 7,
    categorie: "Nutrition / Hygiène alimentaire",
    sujet: "Erreurs alimentaires à éviter",
    question: "Quelles habitudes alimentaires sont des erreurs à ne pas commettre ?",
    options: [
      "Boire de l'eau pendant les repas et manger des légumes",
      "Melon en entrée, jus d'orange au petit-déjeuner, dessert à chaque repas",
      "Manger des protéines le midi et des glucides le soir",
      "Consommer des oméga 3 régulièrement et éviter le sucre raffiné"
    ],
    bonne: 1,
    explication: "Trois erreurs classiques : 1) Melon en entrée (doit être consommé seul → fermentation en début de repas gêne la suite). 2) Jus d'orange au petit-dej (acidité + sucres rapides à jeun = pic glycémique + irritation gastrique). 3) Dessert systématique (sucres après protéines/graisses = fermentation).",
    piege: "Ces habitudes semblent 'saines' ou 'normales' culturellement. Mais en hygiène alimentaire naturopathe, ce sont des erreurs.",
    mnemo: "3 ERREURS : MELON pas en entrée + JUS d'orange PAS le matin + DESSERT pas systématique.",
    tags: ["nutrition", "hygiène alimentaire", "erreurs"]
  },
  {
    id: 68, jour: 7,
    categorie: "Physiologie / Sport",
    sujet: "Ischémie-reperfusion",
    question: "L'ischémie-reperfusion est associée à quel type de trouble selon ce cours ?",
    options: [
      "Un trouble cardiovasculaire",
      "Un trouble neurologique",
      "Un trouble digestif",
      "Un trouble musculaire"
    ],
    bonne: 2,
    explication: "Dans CE COURS, l'ischémie-reperfusion est associée à un trouble digestif. Note : médicalement, l'ischémie-reperfusion est un mécanisme général (cardiovasculaire, rénale, cérébrale...) mais le contexte du cours la place dans le cadre digestif/sportif.",
    piege: "Cette réponse est spécifique au cours. Dans la littérature médicale générale, l'ischémie-reperfusion est un phénomène multi-systémique. Pour l'examen, retenir : trouble digestif.",
    mnemo: "Pour CE COURS : ischémie-reperfusion = trouble DIGESTIF. Mémoriser la réponse du cours, pas la définition médicale générale.",
    tags: ["physiologie", "sport", "correction"]
  },
  {
    id: 69, jour: 7,
    categorie: "Micronutrition / Sport",
    sujet: "Récupération après compétition",
    question: "Pour une bonne récupération après une compétition sportive, il faut apporter :",
    options: [
      "Uniquement des protéines en grande quantité",
      "Uniquement de l'eau et des électrolytes",
      "Zinc + vitamines B6/B1, magnésium + fer, protéines + glucides",
      "Antioxydants uniquement (C, E, sélénium)"
    ],
    bonne: 2,
    explication: "Récupération complète en 3 axes : 1) Zinc + B6/B1 (réparation enzymatique). 2) Magnésium + fer (reconstitution minérale et oxygénation). 3) Protéines + glucides (reconstruction musculaire et reconstitution des réserves glycogéniques).",
    piege: "La récupération sportive est multifactorielle. Protéines seules ou eau seule = insuffisant. Il faut les 3 axes ensemble.",
    mnemo: "RÉCUP = Zinc+B / Mg+Fer / Protéines+Glucides = 3 paires de champions. Comme 3 podiums à remonter.",
    tags: ["sport", "micronutrition", "récupération"]
  },
  {
    id: 70, jour: 7,
    categorie: "Micronutrition",
    sujet: "Rôles de la L-Glutamine",
    question: "Quels sont les rôles de la L-Glutamine ?",
    options: [
      "Précurseur de la sérotonine, améliore le sommeil",
      "Renouvellement de la muqueuse intestinale, synthèse du glutathion intestinal, activation de la synthèse protéique",
      "Stimulant cardio-vasculaire et vasodilatateur",
      "Précurseur de la dopamine, améliore la motivation"
    ],
    bonne: 1,
    explication: "La L-Glutamine est le carburant préféré des entérocytes (cellules de l'intestin). Ses 3 rôles clés : 1) Renouvellement rapide de la muqueuse intestinale. 2) Synthèse du glutathion intestinal (antioxydant majeur). 3) Activation de la synthèse protéique générale.",
    piege: "Glutamine ≠ sérotonine (tryptophane). Glutamine ≠ dopamine (tyrosine/Mucuna). Glutamine = intestin + protéines + glutathion.",
    mnemo: "GLUTAMINE = Glu-AMINE des intestins. G = Gut (intestin) + Glutathion + Growth (synthèse protéique).",
    tags: ["micronutrition", "digestion", "intestin"]
  },
  {
    id: 71, jour: 8,
    categorie: "Phytothérapie / Neurotransmetteurs",
    sujet: "Plante source de L-DOPA",
    question: "Quelle plante est une source naturelle de L-Dopa ?",
    options: [
      "Griffonia simplicifolia",
      "Millepertuis (Hypericum perforatum)",
      "Mucuna pruriens",
      "Valériane officinale"
    ],
    bonne: 2,
    explication: "Mucuna pruriens (Pois mascate, Pois à gratter) est la plante riche en L-Dopa (précurseur de la dopamine). Griffonia = 5-HTP (précurseur sérotonine). Millepertuis = inhibiteur recapture sérotonine. Ces associations sont fondamentales.",
    piege: "TABLEAU CLÉS : Mucuna = DOPA/Dopamine. Griffonia = 5-HTP/Sérotonine. Millepertuis = inhibiteur recapture sérotonine. Ne jamais les mélanger.",
    mnemo: "MUCUNA = MOTIVATION = Dopamine. Griffonia = GAITÉ = Sérotonine. Millepertuis = MOrale = sérotonine aussi.",
    tags: ["phytothérapie", "neurotransmetteurs", "dopamine", "important"],
    important: true
  },
  {
    id: 72, jour: 8,
    categorie: "Phytothérapie / Neurotransmetteurs",
    sujet: "Plantes pour la carence en sérotonine",
    question: "Quelles plantes sont indiquées en cas de carence en sérotonine ?",
    options: [
      "Mucuna pruriens et valériane",
      "Griffonia et millepertuis",
      "Ginseng et rhodiola",
      "Maca et ashwagandha"
    ],
    bonne: 1,
    explication: "Griffonia simplicifolia (graines riches en 5-HTP, précurseur direct de la sérotonine) et Millepertuis (Hypericum : hyperforine inhibe la recapture de sérotonine, dopamine et noradrénaline). Les deux agissent sur la voie sérotoninergique.",
    piege: "PIÈGE MAJEUR : Mucuna = DOPAMINE (pas sérotonine). Pour la sérotonine : Griffonia + Millepertuis.",
    mnemo: "GRIFFONIA + MILLEPERTUIS = le duo du SOURIRE (sérotonine = hormone du bonheur). GriFFonia = 5HtP → sérotonine.",
    tags: ["phytothérapie", "neurotransmetteurs", "sérotonine", "important"],
    important: true
  },
  {
    id: 73, jour: 8,
    categorie: "Nutrition / Microbiote",
    sujet: "Aliments prébiotiques",
    question: "Quels aliments sont de bonnes sources de prébiotiques ?",
    options: [
      "Yaourt, kéfir, choucroute (probiotiques vivants)",
      "Artichaut, oignon, lait maternel, chicorée",
      "Viande rouge, oeufs, poisson",
      "Pain blanc, riz blanc, pâtes blanches"
    ],
    bonne: 1,
    explication: "Les prébiotiques sont des fibres non digestibles (FOS, inuline, GOS) qui nourrissent les bactéries bénéfiques. Riches en prébiotiques : Artichaut (inuline), Oignon (FOS), Chicorée (inuline), Lait maternel (GOS/HMO = Human Milk Oligosaccharides).",
    piege: "NE PAS CONFONDRE : Prébiotiques (fibres = substrats) ≠ Probiotiques (bactéries vivantes = yaourt, kéfir). Ce sont des concepts OPPOSÉS mais complémentaires.",
    mnemo: "PRÉbiotiques = avant les bactéries = nourriture POUR les bactéries. PRObiotiques = bactéries elles-mêmes. PRÉ = l'herbe, PRO = les vaches qui mangent l'herbe.",
    tags: ["microbiote", "prébiotiques", "nutrition"],
    important: true
  },
  {
    id: 74, jour: 8,
    categorie: "Nutrition / Anthropométrie",
    sujet: "Classification de l'IMC",
    question: "Un IMC compris entre 25 et 30 correspond à :",
    options: [
      "Un poids normal",
      "Un surpoids",
      "Une obésité modérée",
      "Une obésité morbide"
    ],
    bonne: 1,
    explication: "Classification OMS de l'IMC : <18,5 = insuffisance pondérale. 18,5-24,9 = poids normal. 25-29,9 = SURPOIDS. 30-34,9 = obésité grade 1. 35-39,9 = obésité grade 2. ≥40 = obésité massive.",
    piege: "IMC 25-30 = SURPOIDS (pas obésité). L'obésité commence à 30. Mémoriser les seuils 25 et 30.",
    mnemo: "25-30 = SURPOIDS = sur-25. L'obésité c'est sur-30. 30 = le seuil de l'obésité.",
    tags: ["nutrition", "anthropométrie", "chiffres"]
  },
  {
    id: 75, jour: 8,
    categorie: "Régimes",
    sujet: "Régime Atkins",
    question: "Le régime Atkins préconise :",
    options: [
      "Favoriser les glucides complexes et limiter les graisses",
      "Favoriser les protéines, supprimer les féculents, autoriser les corps gras",
      "Régime végétalien sans produits animaux",
      "Jeûne intermittent 16/8 heures"
    ],
    bonne: 1,
    explication: "Le régime Atkins est un régime CÉTOGÈNE/LOW-CARB : Favorise les protéines (viandes, poissons, oeufs), supprime les féculents/glucides, et autorise les graisses (beurre, huiles, avocats). But : déclencher la cétose pour brûler les graisses.",
    piege: "Atkins ≠ régime hypocalorique classique. Atkins autorise les graisses (contrairement aux régimes classiques) mais supprime les glucides.",
    mnemo: "ATKINS = AS many proteins and fats you want, KILL the carbs. Protéines + graisses = OUI. Féculents = NON.",
    tags: ["régimes", "Atkins", "cétogène"]
  },
  {
    id: 76, jour: 8,
    categorie: "Micronutrition / Sport",
    sujet: "Récupération sportive (mécanismes biochimiques)",
    question: "Concernant la récupération sportive, quelles affirmations sont correctes ?",
    options: [
      "Il faut éviter le sel après une compétition ; la B1 dégrade les protéines",
      "Saler après la compétition reconstitue le capital hydrique ; B1 recycle l'acide lactique ; B6 élimine les protéines endommagées",
      "Le magnésium est contre-indiqué après l'effort",
      "Les glucides sont à éviter pour ne pas regonfler les adipocytes"
    ],
    bonne: 1,
    explication: "Trois mécanismes : 1) Sel (sodium) après compétition = compense les pertes sodées par la sueur, reconstitue le capital hydrique. 2) B1 (thiamine) = co-enzyme du cycle de l'acide lactique (pyruvate déshydrogénase). 3) B6 (pyridoxine) = co-enzyme du métabolisme des acides aminés, élimine les protéines musculaires dégradées.",
    piege: "Le SEL après l'effort est BÉNÉFIQUE (à l'inverse du régime pauvre en sel conseillé en cas d'hypertension). La B1 agit sur le LACTATE (pas sur les protéines). La B6 agit sur les PROTÉINES endommagées.",
    mnemo: "SEL = hydratation. B1 = lactate. B6 = protéines. Sel-B1-B6 = le trio de récupération.",
    tags: ["sport", "micronutrition", "récupération"]
  },
  {
    id: 77, jour: 8,
    categorie: "Micronutrition",
    sujet: "Compulsions sucrées",
    question: "Quels micronutriments aident à réduire les compulsions sucrées ?",
    options: [
      "Vitamine A, D, E, K",
      "Zinc, cuivre, iode, sélénium",
      "Lithium, vitamine C, chrome, magnésium",
      "Sodium, potassium, chlore, phosphore"
    ],
    bonne: 2,
    explication: "Quatre micronutriments contre les compulsions sucrées : Chrome (améliore la sensibilité à l'insuline, régule la glycémie), Magnésium (stabilise la glycémie, réduit le stress/envies), Vitamine C (co-enzyme, anti-stress), Lithium (équilibre émotionnel, souvent impliqué dans les compulsions).",
    piege: "Ce sont 4 éléments très spécifiques à retenir ensemble. Le chrome est le plus important pour la glycémie.",
    mnemo: "Li-C-Cr-Mg = LiCCrMg = LICK (lécher) du sucre = à éviter grâce à ces 4 micronutriments. Lithium, C, Chrome, Magnésium.",
    tags: ["micronutrition", "glycémie", "comportement alimentaire"]
  },
  {
    id: 78, jour: 8,
    categorie: "Biochimie",
    sujet: "Acide aminé le plus abondant",
    question: "Quel est l'acide aminé libre le plus abondant dans l'organisme ?",
    options: [
      "Tryptophane",
      "Méthionine",
      "Leucine",
      "Glutamine"
    ],
    bonne: 3,
    explication: "La GLUTAMINE est l'acide aminé libre le plus abondant dans le plasma et les muscles squelettiques (représente 60% du pool d'acides aminés musculaires). Elle est conditionnellement essentielle (indispensable en situations de stress, maladie, effort intense).",
    piege: "Le tryptophane est l'acide aminé le plus RARE (et précurseur de la sérotonine). La glutamine est le plus ABONDANT.",
    mnemo: "GLUTAMINE = GLUtonné d'acides aminés = le plus abondant. Glut = glucose, comme si le corps en faisait le plein.",
    tags: ["biochimie", "acides aminés"]
  },
  {
    id: 79, jour: 8,
    categorie: "Microbiote",
    sujet: "Rôles des prébiotiques",
    question: "Quels sont les rôles des prébiotiques ?",
    options: [
      "Ils introduisent des bactéries vivantes dans l'intestin",
      "Ils diminuent les lipides sanguins, augmentent l'absorption des minéraux dans le côlon, luttent contre la constipation",
      "Ils détruisent les bactéries pathogènes",
      "Ils remplacent les probiotiques en cas d'intolérance"
    ],
    bonne: 1,
    explication: "Les prébiotiques (fibres fermentescibles) ont 3 rôles métaboliques : 1) Diminuent les lipides sanguins (les bactéries les fermentent → AGCC → modifient le métabolisme hépatique). 2) Augmentent l'absorption des minéraux dans le côlon (calcium, magnésium via acidification locale). 3) Luttent contre la constipation (fermentation → augmentation du bol fécal).",
    piege: "Prébiotiques ≠ probiotiques. Les prébiotiques ne sont pas des bactéries vivantes, ce sont des fibres qui NOURRISSENT les bactéries existantes.",
    mnemo: "3 rôles PRÉbiotiques : Lipides BAS + Minéraux ABSORBÉS + Constipation COMBATTU.",
    tags: ["microbiote", "prébiotiques", "rôles"]
  },
  {
    id: 80, jour: 8,
    categorie: "Pathologies",
    sujet: "Candidose",
    question: "La candidose est :",
    options: [
      "Une infection bactérienne causée par Candida",
      "Une infection virale respiratoire",
      "Une infection fongique (champignon/levure : Candida albicans)",
      "Une infection parasitaire intestinale"
    ],
    bonne: 2,
    explication: "Candida albicans est un CHAMPIGNON / LEVURE (fungi). La candidose est donc une mycose (infection fongique). Elle touche muqueuses buccales, intestinales, vaginales. Terrain à risque : prise d'antibiotiques, immunodépression, alimentation riche en sucres.",
    piege: "Piège fréquent : confondre Candida avec une bactérie car souvent traité avec des antifongiques ressemblant à des antibiotiques. Candida = champignon ≠ bactérie.",
    mnemo: "CANDIDA = CANDIDE comme un champignon blanc innocent. Champignon = FONGIQUE. Candidose = MYCOse.",
    tags: ["pathologies", "mycologie", "microbiote"]
  },

  // ═══ Questions complémentaires (fondamentaux naturopathie) ═══
  {
    id: 81, jour: 1,
    categorie: "Concepts fondamentaux",
    sujet: "Les émonctoires",
    question: "Parmi ces organes, lesquels sont des émonctoires (portes de sortie des déchets) ?",
    options: ["Le foie", "Les reins", "La peau", "L'estomac"],
    bonnes: [0, 1, 2],
    explication: "Les 5 émonctoires de la naturopathie sont : foie, reins, intestins, poumons et peau. Ils éliminent les déchets de l'organisme. L'estomac est un organe de DIGESTION, pas d'élimination.",
    piege: "L'estomac digère mais n'élimine pas : ce n'est pas un émonctoire. Ne pas le confondre avec les intestins.",
    mnemo: "FRIPP : Foie, Reins, Intestins, Poumons, Peau = les 5 émonctoires.",
    tags: ["émonctoires", "fondamentaux", "drainage"], important: true
  },
  {
    id: 82, jour: 1,
    categorie: "Concepts fondamentaux",
    sujet: "Les 3 cures de Marchesseau",
    question: "Quel est l'ordre logique des trois cures naturopathiques ?",
    options: [
      "Désintoxication → Revitalisation → Stabilisation",
      "Revitalisation → Désintoxication → Stabilisation",
      "Stabilisation → Revitalisation → Désintoxication",
      "Revitalisation → Stabilisation → Désintoxication"
    ],
    bonne: 0,
    explication: "P.V. Marchesseau décrit 3 cures : 1) la cure de DÉSINTOXICATION (drainage des émonctoires), 2) la REVITALISATION (recharge en nutriments), 3) la STABILISATION (équilibre durable). On nettoie avant de recharger.",
    piege: "On draine AVANT de revitaliser : inutile de recharger un organisme encore encrassé.",
    mnemo: "DRS : on Détoxifie, on Recharge, on Stabilise.",
    tags: ["cures", "fondamentaux", "vitalisme"]
  },
  {
    id: 83, jour: 3,
    categorie: "Naturopathie / Typologies",
    sujet: "Tempéraments hippocratiques",
    question: "Quels tempéraments font partie de la classification hippocratique des 4 humeurs ?",
    options: ["Sanguin", "Lymphatique", "Bilieux", "Électrique"],
    bonnes: [0, 1, 2],
    explication: "Les 4 tempéraments d'Hippocrate reposent sur 4 humeurs : sanguin (sang), lymphatique/flegmatique (lymphe), bilieux/colérique (bile jaune) et nerveux/mélancolique (bile noire). « Électrique » n'existe pas dans cette classification.",
    piege: "Le 4e tempérament est le NERVEUX (mélancolique), pas « électrique ».",
    mnemo: "Sang, Lymphe, Bile, Nerfs = les 4 tempéraments.",
    tags: ["typologies", "tempéraments", "terrain"]
  },
  {
    id: 84, jour: 1,
    categorie: "Concepts fondamentaux",
    sujet: "Hydrothérapie",
    question: "Que provoque l'application de froid (cryothérapie locale) sur la peau ?",
    options: [
      "Une vasoconstriction puis une vasodilatation réactionnelle",
      "Une vasodilatation immédiate et durable",
      "Aucun effet circulatoire",
      "Une baisse définitive de la circulation locale"
    ],
    bonne: 0,
    explication: "Le froid provoque d'abord une VASOCONSTRICTION (les vaisseaux se resserrent), suivie d'une VASODILATATION réactionnelle (afflux de sang) une fois le froid retiré. C'est le principe tonifiant des douches froides et du jet écossais.",
    piege: "Le froid ne « ferme » pas durablement : la réaction du corps est un afflux de sang (effet tonifiant).",
    mnemo: "Froid = le corps RÉAGIT en envoyant du sang → effet vivifiant.",
    tags: ["hydrologie", "techniques", "circulation"]
  }
];

// ─── MOTEUR D'ÉTAT ───────────────────────────────────────────────
const State = {
  data: null,

  // Clé de stockage = propre au profil actif (multi-comptes)
  key() {
    const id = Profiles.activeId();
    return id ? Profiles.dataKey(id) : null;
  },

  init() {
    const k = this.key();
    if (!k) { this.data = null; return; }   // aucun profil actif → rien à charger
    const raw = localStorage.getItem(k);
    if (raw) {
      try { this.data = JSON.parse(raw); } catch(e) { this.data = null; }
    }
    if (!this.data) this.reset();
    else this._ensureShape();
  },

  // Garantit la présence des champs même sur d'anciennes données migrées
  _ensureShape() {
    const d = this.data;
    if (!d.lessonsRead) d.lessonsRead = {};
    if (typeof d.onboarded === 'undefined') d.onboarded = false;
    if (!d.questionStats) d.questionStats = {};
    // Gamification
    if (typeof d.xp !== 'number') d.xp = 0;
    if (typeof d.dailyStreak !== 'number') d.dailyStreak = 0;
    if (typeof d.bestDailyStreak !== 'number') d.bestDailyStreak = 0;
    if (typeof d.lastStudyDay === 'undefined') d.lastStudyDay = null;
    if (typeof d.goalPerDay !== 'number') d.goalPerDay = 20;
    if (!Array.isArray(d.badges)) d.badges = [];
    if (!d.challenges) d.challenges = {};   // "YYYY-MM-DD" -> { total, correct, pct }
    if (typeof d.examDate === 'undefined') d.examDate = null;   // 'YYYY-MM-DD' ou null
    QUESTIONS.forEach(q => {
      const s = d.questionStats[q.id];
      if (!s) {
        d.questionStats[q.id] = { seen: 0, correct: 0, wrong: 0, lastSeen: null, streak: 0, difficulty: 3, box: 0, nextReview: 0 };
      } else {
        if (typeof s.box !== 'number') s.box = Math.max(0, Math.min(5, Math.round((5 - s.difficulty) ) ));
        if (typeof s.nextReview !== 'number') s.nextReview = 0;
      }
    });
  },

  reset() {
    this.data = {
      version: APP_VERSION,
      createdAt: Date.now(),
      questionStats: {},   // id -> { seen, correct, wrong, lastSeen, streak, difficulty, box, nextReview }
      examSessions: [],    // historique des sessions d'examen
      revisionSessions: [],
      lessonsRead: {},     // idCours -> timestamp
      onboarded: false,
      currentDay: 1,
      // Gamification
      xp: 0,
      dailyStreak: 0,
      bestDailyStreak: 0,
      lastStudyDay: null,
      goalPerDay: 20,
      badges: [],          // ids des badges débloqués
      challenges: {},      // "YYYY-MM-DD" -> { total, correct, pct } (défi du jour)
      examDate: null,      // date d'examen visée ('YYYY-MM-DD')
      dailyStats: {},      // "YYYY-MM-DD" -> { questions, correct }
    };
    QUESTIONS.forEach(q => {
      this.data.questionStats[q.id] = {
        seen: 0, correct: 0, wrong: 0,
        lastSeen: null, streak: 0, difficulty: 3, // 1-5
        box: 0, nextReview: 0                       // répétition espacée (Leitner)
      };
    });
    this.save();
  },

  save() {
    const k = this.key();
    if (k && this.data) localStorage.setItem(k, JSON.stringify(this.data));
  },

  // Suivi des cours
  markLessonRead(id) {
    if (!this.data.lessonsRead) this.data.lessonsRead = {};
    this.data.lessonsRead[id] = Date.now();
    this.save();
  },
  isLessonRead(id) { return !!(this.data.lessonsRead && this.data.lessonsRead[id]); },
  setOnboarded() { this.data.onboarded = true; this.save(); },

  // Sauvegarde / restauration (export-import d'un compte)
  exportData() { return JSON.stringify(this.data); },
  importData(json) {
    const obj = (typeof json === 'string') ? JSON.parse(json) : json;
    if (!obj || typeof obj !== 'object' || !obj.questionStats) throw new Error('Fichier invalide');
    this.data = obj;
    this._ensureShape();
    this.save();
  },

  recordAnswer(questionId, isCorrect) {
    const s = this.data.questionStats[questionId];
    s.seen++;
    s.lastSeen = Date.now();
    if (isCorrect) {
      s.correct++;
      s.streak++;
      s.difficulty = Math.max(1, s.difficulty - 0.5);
      s.box = Math.min(5, (s.box || 0) + 1);          // SRS : monte d'une boîte
    } else {
      s.wrong++;
      s.streak = 0;
      s.difficulty = Math.min(5, s.difficulty + 1);
      s.box = 0;                                       // SRS : retombe en boîte 0
    }
    // Prochaine révision (Leitner) : intervalle croissant en jours
    const DAY = 86400000;
    const intervals = [0, 1, 3, 7, 16, 35];            // box 0..5
    s.nextReview = Date.now() + intervals[s.box] * DAY;

    // Daily stats
    const today = new Date().toISOString().split('T')[0];
    if (!this.data.dailyStats[today]) this.data.dailyStats[today] = { questions: 0, correct: 0 };
    this.data.dailyStats[today].questions++;
    if (isCorrect) this.data.dailyStats[today].correct++;

    // Série quotidienne (une fois par jour, au premier travail du jour)
    if (this.data.lastStudyDay !== today) {
      const yest = new Date(Date.now() - DAY).toISOString().split('T')[0];
      this.data.dailyStreak = (this.data.lastStudyDay === yest) ? (this.data.dailyStreak || 0) + 1 : 1;
      this.data.lastStudyDay = today;
      if (this.data.dailyStreak > (this.data.bestDailyStreak || 0)) this.data.bestDailyStreak = this.data.dailyStreak;
    }

    // XP : bonne réponse récompensée, effort aussi
    this.data.xp = (this.data.xp || 0) + (isCorrect ? 10 : 2);

    this.save();
  },

  // ── Répétition espacée (SRS) ────────────────────────────────
  getDueQuestions(n = 20) {
    const now = Date.now();
    const due = QUESTIONS
      .map(q => ({ q, s: this.data.questionStats[q.id] }))
      .filter(x => x.s.seen === 0 || (x.s.nextReview || 0) <= now)
      .sort((a, b) => {
        // d'abord les plus en retard / jamais vues, puis les boîtes basses
        const aw = a.s.seen === 0 ? -1e15 : (a.s.nextReview || 0);
        const bw = b.s.seen === 0 ? -1e15 : (b.s.nextReview || 0);
        return aw - bw;
      })
      .map(x => x.q);
    return n ? due.slice(0, n) : due;
  },
  countDue() {
    const now = Date.now();
    return QUESTIONS.reduce((acc, q) => {
      const s = this.data.questionStats[q.id];
      return acc + ((s.seen === 0 || (s.nextReview || 0) <= now) ? 1 : 0);
    }, 0);
  },

  // ── Gamification : XP / niveaux ─────────────────────────────
  getXP() { return this.data.xp || 0; },
  levelInfo() {
    const xp = this.getXP();
    const PER = 150;                       // XP par niveau
    const level = Math.floor(xp / PER) + 1;
    const inLevel = xp % PER;
    const titles = ['Curieux', 'Apprenti', 'Initié', 'Praticien', 'Thérapeute', 'Expert', 'Sage', 'Maître naturopathe'];
    const title = titles[Math.min(titles.length - 1, level - 1)];
    return { level, title, inLevel, perLevel: PER, pct: Math.round(inLevel / PER * 100), xp };
  },

  // ── Objectif du jour ────────────────────────────────────────
  todayCount() {
    const today = new Date().toISOString().split('T')[0];
    return (this.data.dailyStats[today] || {}).questions || 0;
  },
  goalProgress() {
    const goal = this.data.goalPerDay || 20;
    const done = this.todayCount();
    return { done, goal, pct: Math.min(100, Math.round(done / goal * 100)), reached: done >= goal };
  },
  setGoal(n) { this.data.goalPerDay = Math.max(5, Math.min(100, n | 0)); this.save(); },

  // ── Défi du jour ────────────────────────────────────────────
  _today() { return new Date().toISOString().split('T')[0]; },
  isChallengeDoneToday() { return !!(this.data.challenges && this.data.challenges[this._today()]); },
  getChallengeToday() { return (this.data.challenges || {})[this._today()] || null; },
  completeChallenge(total, correct, pct) {
    const t = this._today();
    if (!this.data.challenges) this.data.challenges = {};
    if (this.data.challenges[t]) return 0;                 // déjà fait → pas de bonus en double
    this.data.challenges[t] = { total, correct, pct, timestamp: Date.now() };
    const bonus = 30 + (pct >= 90 ? 20 : 0);
    this.data.xp = (this.data.xp || 0) + bonus;
    this.save();
    return bonus;
  },

  // ── Examen : date cible + préparation ───────────────────────
  setExamDate(iso) { this.data.examDate = iso || null; this.save(); },
  examCountdown() {
    if (!this.data.examDate) return null;
    const today = new Date(this._today() + 'T00:00:00');
    const exam = new Date(this.data.examDate + 'T00:00:00');
    const days = Math.round((exam - today) / 86400000);
    return { date: this.data.examDate, days };
  },
  // % de questions « maîtrisées » (vues, ≥80% de réussite OU boîte SRS ≥3)
  getReadiness() {
    let mastered = 0;
    QUESTIONS.forEach(q => {
      const s = this.data.questionStats[q.id];
      const rate = s.seen > 0 ? s.correct / s.seen : 0;
      if (s.seen > 0 && (rate >= 0.8 || (s.box || 0) >= 3)) mastered++;
    });
    return { mastered, total: QUESTIONS.length, pct: Math.round(mastered / QUESTIONS.length * 100) };
  },
  // Combien réviser/jour pour tout voir avant l'examen
  recommendedPerDay() {
    const c = this.examCountdown();
    let unseen = 0;
    QUESTIONS.forEach(q => { if (this.data.questionStats[q.id].seen === 0) unseen++; });
    if (!c || c.days <= 0) return Math.max(this.data.goalPerDay || 20, unseen);
    return Math.max(5, Math.ceil(unseen / Math.max(1, c.days)) + 5);
  },

  // ── Jardin (plante qui pousse) ──────────────────────────────
  gardenStage() {   // 0..5 selon le niveau
    const lvl = this.levelInfo().level;
    return Math.max(0, Math.min(5, lvl - 1));
  },
  gardenHealthy() {  // fane si la série est sur le point d'être perdue
    const last = this.data.lastStudyDay;
    if (!last) return true;                 // jamais étudié → graine saine
    const t = this._today();
    const yest = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    return last === t || last === yest;     // sinon : a sauté un jour → fanée
  },

  // ── Badges ──────────────────────────────────────────────────
  // Débloque les badges nouvellement gagnés ; renvoie la liste des NOUVEAUX.
  refreshBadges() {
    const owned = new Set(this.data.badges || []);
    const fresh = [];
    BADGES.forEach(b => {
      if (!owned.has(b.id) && b.earned(this)) { this.data.badges.push(b.id); fresh.push(b); }
    });
    if (fresh.length) this.save();
    return fresh;
  },
  hasBadge(id) { return (this.data.badges || []).includes(id); },

  getWeakQuestions(n = 20) {
    return QUESTIONS
      .map(q => ({ q, s: this.data.questionStats[q.id] }))
      .sort((a, b) => {
        const scoreA = a.s.seen === 0 ? 999 : (a.s.wrong / a.s.seen) + (a.s.difficulty / 5);
        const scoreB = b.s.seen === 0 ? 999 : (b.s.wrong / b.s.seen) + (b.s.difficulty / 5);
        return scoreB - scoreA;
      })
      .slice(0, n)
      .map(x => x.q);
  },

  getOverallScore() {
    let total = 0, correct = 0;
    Object.values(this.data.questionStats).forEach(s => {
      total += s.seen; correct += s.correct;
    });
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  },

  getProgressByDay() {
    const byDay = {};
    QUESTIONS.forEach(q => {
      if (!byDay[q.jour]) byDay[q.jour] = { total: 0, seen: 0, correct: 0 };
      const s = this.data.questionStats[q.id];
      byDay[q.jour].total++;
      if (s.seen > 0) byDay[q.jour].seen++;
      byDay[q.jour].correct += s.correct;
    });
    return byDay;
  },

  saveExamSession(session) {
    this.data.examSessions.push(session);
    this.save();
  },

  saveRevisionSession(session) {
    this.data.revisionSessions.push(session);
    this.save();
  }
};

// ─── BADGES (succès) ─────────────────────────────────────────────
const BADGES = [
  { id: 'premier-pas', nom: 'Premier pas',  desc: 'Répondre à sa 1ʳᵉ question', icon: 'sprout',
    earned: s => Object.values(s.data.questionStats).some(q => q.seen > 0) },
  { id: 'assidu-3',    nom: 'Régulier',     desc: '3 jours d\'affilée', icon: 'flame',
    earned: s => (s.data.dailyStreak || 0) >= 3 },
  { id: 'assidu-7',    nom: 'En feu',       desc: '7 jours d\'affilée', icon: 'flame',
    earned: s => (s.data.dailyStreak || 0) >= 7 },
  { id: 'centurion',   nom: 'Centurion',    desc: '100 réponses données', icon: 'target',
    earned: s => Object.values(s.data.questionStats).reduce((a, q) => a + q.seen, 0) >= 100 },
  { id: 'sans-faute',  nom: 'Sans-faute',   desc: 'Une session 100 % (5 Q+)', icon: 'check-circle',
    earned: s => (s.data.revisionSessions || []).some(r => r.pct === 100 && r.count >= 5) },
  { id: 'examen-or',   nom: 'Mention or',   desc: 'Un examen ≥ 90 %', icon: 'award',
    earned: s => (s.data.examSessions || []).some(e => e.pct >= 90) },
  { id: 'lecteur',     nom: 'Lecteur',      desc: 'Lire son 1er cours', icon: 'book',
    earned: s => Object.keys(s.data.lessonsRead || {}).length >= 1 },
  { id: 'erudit',      nom: 'Érudit',       desc: 'Lire 5 cours', icon: 'book-open',
    earned: s => Object.keys(s.data.lessonsRead || {}).length >= 5 },
  { id: 'niveau-5',    nom: 'Niveau 5',     desc: 'Atteindre le niveau 5', icon: 'star',
    earned: s => s.levelInfo().level >= 5 },
  { id: 'maitrise',    nom: 'Maîtrise',     desc: '80 % de réussite (50 Q+)', icon: 'trending-up',
    earned: s => { let t = 0, c = 0; Object.values(s.data.questionStats).forEach(q => { t += q.seen; c += q.correct; }); return t >= 50 && c / t >= 0.8; } }
];

// ─── UTILITAIRES ────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getQuestionsByDay(day) {
  return QUESTIONS.filter(q => q.jour === day);
}

// Réponses correctes d'une question : `bonnes:[...]` (multi) ou `bonne` (unique)
function answerKey(q) {
  return Array.isArray(q.bonnes) ? q.bonnes.slice() : [q.bonne];
}
function isMultiAnswer(q) {
  return Array.isArray(q.bonnes) && q.bonnes.length > 1;
}
// Vrai si l'ensemble sélectionné == l'ensemble des bonnes réponses
function isSelectionCorrect(q, selected) {
  const key = answerKey(q);
  if (selected.length !== key.length) return false;
  const set = new Set(key);
  return selected.every(i => set.has(i));
}

// PRNG déterministe (mulberry32) pour le « défi du jour » : même set toute la journée.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function getDailyChallenge(n) {
  n = n || 10;
  const today = new Date().toISOString().split('T')[0];
  let seed = 0;
  for (let i = 0; i < today.length; i++) seed = (seed * 31 + today.charCodeAt(i)) | 0;
  const rng = mulberry32(seed >>> 0);
  const arr = QUESTIONS.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getScoreColor(pct) {
  if (pct >= 80) return '#27AE60';
  if (pct >= 60) return '#E67E22';
  return '#E74C3C';
}

function getGrade(pct) {
  if (pct >= 90) return { grade: 'A', label: 'Excellent !', color: '#27AE60' };
  if (pct >= 80) return { grade: 'B', label: 'Très bien', color: '#2ECC71' };
  if (pct >= 70) return { grade: 'C', label: 'Bien', color: '#F39C12' };
  if (pct >= 60) return { grade: 'D', label: 'Passable', color: '#E67E22' };
  return { grade: 'F', label: 'À retravailler', color: '#E74C3C' };
}

// ═══════════════════════════════════════════════════════════════
//  ICÔNES SVG  (style Lucide, trait, hérite de currentColor)
//  Remplace tous les emojis par de vraies icônes vectorielles.
// ═══════════════════════════════════════════════════════════════
const ICON_PATHS = {
  leaf:        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  home:        '<path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  'book-open': '<path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z"/>',
  book:        '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  edit:        '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  chart:       '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>',
  'trending-up':'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  calendar:    '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  shuffle:     '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="M4 4l5 5"/>',
  'alert-triangle':'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  eye:         '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  star:        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  list:        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1.2"/><circle cx="3.5" cy="12" r="1.2"/><circle cx="3.5" cy="18" r="1.2"/>',
  layers:      '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  x:           '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check:       '<polyline points="20 6 9 17 4 12"/>',
  'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'x-circle':  '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  lightbulb:   '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>',
  brain:       '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z"/>',
  award:       '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  'thumbs-up': '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
  'help-circle':'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  pointer:     '<path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>',
  'arrow-left':'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  'arrow-right':'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  flame:       '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  clock:       '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  timer:       '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
  lock:        '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock:      '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  'log-out':   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  menu:        '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  'refresh':   '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  'rotate':    '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  target:      '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  zap:         '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  clipboard:   '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>',
  sparkles:    '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  flower:      '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9"/><path d="M7.5 12H9"/><path d="M16.5 12H15"/><path d="M12 16.5V15"/>',
  droplet:     '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  sprout:      '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  activity:    '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  tag:         '<path d="M20.59 13.41 13.42 20.59a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  rocket:      '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  'skip':      '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>',
  party:       '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L12 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>',
  share:       '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  printer:     '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  bell:        '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  'delete':    '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>',
  download:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  sun:         '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:        '<path d="M12 3a6.36 6.36 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  settings:    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
  volume:      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  'volume-x':  '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>'
};

function icon(name, opts) {
  opts = opts || {};
  const body = ICON_PATHS[name] || ICON_PATHS['help-circle'];
  const size = opts.size ? `width="${opts.size}" height="${opts.size}"` : '';
  const cls  = 'app-icon' + (opts.cls ? ' ' + opts.cls : '');
  const sw   = opts.strokeWidth || 2;
  return `<svg class="${cls}" ${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// Remplace tous les <… data-icon="name"> par leur SVG
function hydrateIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(el => {
    if (el.dataset.iconDone) return;
    el.innerHTML = icon(el.dataset.icon, { cls: el.dataset.iconCls || '' });
    el.dataset.iconDone = '1';
  });
}

// ═══════════════════════════════════════════════════════════════
//  AUTHENTIFICATION MULTI-PROFILS
//  Plusieurs comptes sur le même appareil, chacun protégé par son
//  propre code (PIN OU mot de passe). Aucun secret n'est stocké en
//  clair : on garde un hash SHA-256 salé. Sans serveur, c'est un
//  verrou local "best effort" (voir docs/SECURITE.md).
// ═══════════════════════════════════════════════════════════════
const PROFILES_KEY = 'naturoapp_profiles';  // registre des comptes (localStorage)
const ACTIVE_KEY   = 'naturoapp_active';     // id du profil déverrouillé (sessionStorage)

// SHA-256 : Web Crypto si dispo (contexte sécurisé), sinon fallback JS pur.
async function sha256Hex(str) {
  if (window.crypto && window.crypto.subtle) {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return sha256Fallback(str);
}

// Implémentation SHA-256 pure JS (fallback hors contexte sécurisé)
function sha256Fallback(ascii) {
  function rrot(v, a) { return (v >>> a) | (v << (32 - a)); }
  const mathPow = Math.pow, maxWord = mathPow(2, 32);
  let result = '';
  const words = [], asciiBitLength = ascii.length * 8;
  let hash = sha256Fallback.h = sha256Fallback.h || [];
  const k = sha256Fallback.k = sha256Fallback.k || [];
  let primeCounter = k.length;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while (ascii.length % 64 - 56) ascii += '\x00';
  for (let i = 0; i < ascii.length; i++) {
    const j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length;) {
    const w = words.slice(j, j += 16);
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 = hash[7]
        + (rrot(e, 6) ^ rrot(e, 11) ^ rrot(e, 25))
        + ((e & hash[5]) ^ (~e & hash[6]))
        + k[i]
        + (w[i] = i < 16 ? w[i] : (
            w[i - 16]
            + (rrot(w15, 7) ^ rrot(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rrot(w2, 17) ^ rrot(w2, 19) ^ (w2 >>> 10))
          ) | 0);
      const temp2 = (rrot(a, 2) ^ rrot(a, 13) ^ rrot(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

function randomSalt() {
  if (window.crypto && window.crypto.getRandomValues) {
    const a = new Uint8Array(16);
    window.crypto.getRandomValues(a);
    return [...a].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // fallback non-crypto (contexte non sécurisé)
  return String(Date.now()) + Math.floor(Math.random() * 1e9).toString(16);
}

// Petits utilitaires sûrs
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
function initials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}
function genId() {
  return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e9).toString(36);
}

const Profiles = {
  _load() {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY)) || { profiles: [] }; }
    catch (e) { return { profiles: [] }; }
  },
  _save(o) { localStorage.setItem(PROFILES_KEY, JSON.stringify(o)); },

  all()      { return this._load().profiles; },
  count()    { return this.all().length; },
  get(id)    { return this.all().find(p => p.id === id) || null; },
  activeId() { return sessionStorage.getItem(ACTIVE_KEY); },
  active()   { return this.get(this.activeId()); },
  setActive(id) { sessionStorage.setItem(ACTIVE_KEY, id); },
  clearActive() { sessionStorage.removeItem(ACTIVE_KEY); },
  dataKey(id)   { return 'naturoapp_data_' + id; },
  method(id)    { const p = this.get(id); return p ? p.auth.method : 'pin'; },
  credLen(id)   { const p = this.get(id); return p ? (p.auth.len || 4) : 4; },

  // Crée un compte. method = 'pin' | 'password'. Déverrouille aussitôt.
  async create({ name, method, credential }) {
    const salt = randomSalt();
    const hash = await sha256Hex(salt + ':' + credential);
    const prof = {
      id: genId(),
      name: String(name || '').trim().slice(0, 40) || 'Moi',
      auth: { method, salt, hash, len: credential.length },
      createdAt: Date.now()
    };
    const o = this._load();
    o.profiles.push(prof);
    this._save(o);
    this.setActive(prof.id);
    return prof;
  },

  async verify(id, credential) {
    const p = this.get(id);
    if (!p) return false;
    const test = await sha256Hex(p.auth.salt + ':' + credential);
    const ok = test === p.auth.hash;
    if (ok) this.setActive(id);
    return ok;
  },

  async changeCredential(id, method, credential) {
    const o = this._load();
    const p = o.profiles.find(x => x.id === id);
    if (!p) return;
    const salt = randomSalt();
    p.auth = { method, salt, hash: await sha256Hex(salt + ':' + credential), len: credential.length };
    this._save(o);
  },

  rename(id, name) {
    const o = this._load();
    const p = o.profiles.find(x => x.id === id);
    if (p) { p.name = String(name).trim().slice(0, 40) || p.name; this._save(o); }
  },

  remove(id) {
    const o = this._load();
    o.profiles = o.profiles.filter(x => x.id !== id);
    this._save(o);
    try { localStorage.removeItem(this.dataKey(id)); } catch (e) {}
    if (this.activeId() === id) this.clearActive();
  }
};

// Migration de l'ancien compte unique (PIN global) → premier profil,
// SANS perdre la progression déjà enregistrée.
function migrateLegacy() {
  const o = Profiles._load();
  if (o.profiles.length > 0) return;
  const oldAuth = localStorage.getItem('naturoapp_auth');
  const oldData = localStorage.getItem('naturoapp_v1');
  if (!oldAuth) return;
  try {
    const a = JSON.parse(oldAuth);   // { salt, hash, len }
    const id = genId();
    o.profiles.push({
      id, name: 'Clara',
      auth: { method: 'pin', salt: a.salt, hash: a.hash, len: a.len || 4 },
      createdAt: Date.now()
    });
    Profiles._save(o);
    if (oldData) localStorage.setItem(Profiles.dataKey(id), oldData);
    localStorage.removeItem('naturoapp_auth');
    localStorage.removeItem('naturoapp_v1');
  } catch (e) { /* migration impossible : on repart d'un nouveau profil */ }
}

// ═══════════════════════════════════════════════════════════════
//  PORTAIL D'ACCÈS  (sélection de profil + création + saisie du code)
//  Injecté par-dessus tout le contenu tant que rien n'est déverrouillé.
// ═══════════════════════════════════════════════════════════════
function gate(onUnlock) {
  document.body.classList.add('app-locked');
  const screen = document.createElement('div');
  screen.id = 'lock-screen';
  screen.className = 'lock-screen';
  document.body.appendChild(screen);

  let keyHandler = null;
  function setKeyHandler(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = fn || null;
    if (fn) document.addEventListener('keydown', fn);
  }
  function shake() {
    const c = screen.querySelector('.lock-card');
    if (c) { c.classList.add('shake'); setTimeout(() => c.classList.remove('shake'), 450); }
  }
  function finish() {
    setKeyHandler(null);
    screen.classList.add('unlocking');
    setTimeout(() => {
      screen.remove();
      document.body.classList.remove('app-locked');
      document.documentElement.classList.remove('pre-lock');
      onUnlock();
    }, 300);
  }

  // ───────── Sélecteur de profil ─────────
  function renderSelect() {
    setKeyHandler(null);
    screen.innerHTML = `
      <div class="lock-card">
        <div class="lock-logo">${icon('leaf')}</div>
        <h1 class="lock-title">NaturoApp</h1>
        <p class="lock-sub">Qui révise aujourd'hui&nbsp;?</p>
        <div class="profile-list">
          ${Profiles.all().map(p => `
            <button class="profile-item" data-id="${p.id}">
              <span class="profile-avatar">${escapeHtml(initials(p.name))}</span>
              <span class="profile-name">${escapeHtml(p.name)}</span>
              <span class="profile-go">${icon('arrow-right')}</span>
            </button>`).join('')}
        </div>
        <button class="lock-add" id="add-profile">${icon('star')} Ajouter un compte</button>
      </div>`;
    hydrateIcons(screen);
    screen.querySelectorAll('.profile-item').forEach(b =>
      b.addEventListener('click', () => renderAuth(Profiles.get(b.dataset.id))));
    screen.querySelector('#add-profile').addEventListener('click', () => renderCreate());
  }

  // ───────── Saisie du code (PIN ou mot de passe) ─────────
  function renderAuth(profile) {
    if (!profile) return renderSelect();
    if (profile.auth.method === 'password') return renderAuthPassword(profile);
    return renderAuthPin(profile);
  }

  function renderAuthPin(profile) {
    const len = profile.auth.len || 4;
    let entered = '';
    screen.innerHTML = `
      <div class="lock-card">
        <button class="lock-back" id="lk-back">${icon('arrow-left')} Comptes</button>
        <div class="lock-avatar-lg">${escapeHtml(initials(profile.name))}</div>
        <h1 class="lock-title">${escapeHtml(profile.name)}</h1>
        <p class="lock-sub">Entre ton code.</p>
        <div class="pin-dots" id="pin-dots"></div>
        <div class="lock-error" id="lock-error"></div>
        <div class="keypad">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<button class="key" data-key="${n}">${n}</button>`).join('')}
          <span></span>
          <button class="key" data-key="0">0</button>
          <button class="key key--action" id="key-del" title="Effacer">${icon('delete')}</button>
        </div>
      </div>`;
    hydrateIcons(screen);
    const dotsEl = screen.querySelector('#pin-dots');
    const errEl = screen.querySelector('#lock-error');
    function dots() { dotsEl.innerHTML = Array.from({ length: len }, (_, i) => `<span class="pin-dot${i < entered.length ? ' filled' : ''}"></span>`).join(''); }
    async function tryUnlock() {
      const ok = await Profiles.verify(profile.id, entered);
      if (ok) finish();
      else { entered = ''; dots(); errEl.textContent = 'Code incorrect.'; shake(); }
    }
    function press(d) { errEl.textContent = ''; if (entered.length >= len) return; entered += d; dots(); if (entered.length === len) tryUnlock(); }
    screen.querySelectorAll('.key[data-key]').forEach(b => b.addEventListener('click', () => press(b.dataset.key)));
    screen.querySelector('#key-del').addEventListener('click', () => { entered = entered.slice(0, -1); errEl.textContent = ''; dots(); });
    screen.querySelector('#lk-back').addEventListener('click', renderSelect);
    setKeyHandler(e => { if (e.key >= '0' && e.key <= '9') press(e.key); else if (e.key === 'Backspace') { entered = entered.slice(0, -1); errEl.textContent = ''; dots(); } });
    dots();
  }

  function renderAuthPassword(profile) {
    screen.innerHTML = `
      <div class="lock-card">
        <button class="lock-back" id="lk-back">${icon('arrow-left')} Comptes</button>
        <div class="lock-avatar-lg">${escapeHtml(initials(profile.name))}</div>
        <h1 class="lock-title">${escapeHtml(profile.name)}</h1>
        <p class="lock-sub">Entre ton mot de passe.</p>
        <form class="lock-form" id="pw-form">
          <div class="pw-field">
            <input type="password" id="pw-input" autocomplete="current-password" placeholder="Mot de passe" />
            <button type="button" class="pw-toggle" id="pw-toggle" aria-label="Afficher le mot de passe">${icon('eye')}</button>
          </div>
          <div class="lock-error" id="lock-error"></div>
          <button class="btn btn-primary btn-lg w-full" type="submit">Déverrouiller</button>
        </form>
      </div>`;
    hydrateIcons(screen);
    const input = screen.querySelector('#pw-input');
    const errEl = screen.querySelector('#lock-error');
    screen.querySelector('#pw-toggle').addEventListener('click', () => { input.type = input.type === 'password' ? 'text' : 'password'; input.focus(); });
    screen.querySelector('#lk-back').addEventListener('click', renderSelect);
    screen.querySelector('#pw-form').addEventListener('submit', async e => {
      e.preventDefault();
      const ok = await Profiles.verify(profile.id, input.value);
      if (ok) finish();
      else { input.value = ''; errEl.textContent = 'Mot de passe incorrect.'; shake(); input.focus(); }
    });
    setKeyHandler(null);
    setTimeout(() => input.focus(), 60);
  }

  // ───────── Assistant de création de compte ─────────
  function renderCreate() {
    const st = { step: 'name', name: '', method: 'pin', first: '' };

    function paint() {
      const showBack = Profiles.count() > 0 || st.step !== 'name';
      let inner = '';
      if (st.step === 'name') {
        inner = `
          <p class="lock-sub">Crée ton compte. Comment t'appelles-tu&nbsp;?</p>
          <form class="lock-form" id="name-form">
            <input type="text" id="name-input" maxlength="40" placeholder="Ton prénom" value="${escapeHtml(st.name)}" autocomplete="given-name" />
            <div class="lock-error" id="lock-error"></div>
            <button class="btn btn-primary btn-lg w-full" type="submit">Continuer</button>
          </form>`;
      } else if (st.step === 'method') {
        inner = `
          <p class="lock-sub">Comment protéger ton compte&nbsp;?</p>
          <div class="method-choices">
            <button class="method-choice" data-method="pin">${icon('lock')}<b>Code PIN</b><span>4 à 6 chiffres — rapide sur mobile</span></button>
            <button class="method-choice" data-method="password">${icon('edit')}<b>Mot de passe</b><span>au moins 6 caractères</span></button>
          </div>`;
      } else {
        const confirming = st.step === 'confirm';
        if (st.method === 'pin') {
          inner = `
            <p class="lock-sub">${confirming ? 'Confirme ton code.' : 'Choisis un code (4 à 6 chiffres).'}</p>
            <div class="pin-dots" id="pin-dots"></div>
            <div class="lock-error" id="lock-error"></div>
            <div class="keypad">
              ${[1,2,3,4,5,6,7,8,9].map(n => `<button class="key" data-key="${n}">${n}</button>`).join('')}
              <button class="key key--action" id="key-validate" title="Valider">${icon('check')}</button>
              <button class="key" data-key="0">0</button>
              <button class="key key--action" id="key-del" title="Effacer">${icon('delete')}</button>
            </div>`;
        } else {
          inner = `
            <p class="lock-sub">${confirming ? 'Confirme ton mot de passe.' : 'Choisis un mot de passe (6 caractères min).'}</p>
            <form class="lock-form" id="pw-form">
              <div class="pw-field">
                <input type="password" id="pw-input" autocomplete="new-password" placeholder="${confirming ? 'Confirme le mot de passe' : 'Mot de passe'}" />
                <button type="button" class="pw-toggle" id="pw-toggle" aria-label="Afficher le mot de passe">${icon('eye')}</button>
              </div>
              <div class="lock-error" id="lock-error"></div>
              <button class="btn btn-primary btn-lg w-full" type="submit">${confirming ? 'Créer mon compte' : 'Continuer'}</button>
            </form>`;
        }
      }
      screen.innerHTML = `
        <div class="lock-card">
          ${showBack ? `<button class="lock-back" id="lk-back">${icon('arrow-left')} Retour</button>` : ''}
          <div class="lock-logo">${icon('leaf')}</div>
          <h1 class="lock-title">NaturoApp</h1>
          ${inner}
        </div>`;
      hydrateIcons(screen);
      wire();
    }

    function goBack() {
      if (st.step === 'name') return renderSelect();
      if (st.step === 'method') { st.step = 'name'; return paint(); }
      if (st.step === 'cred') { st.step = 'method'; return paint(); }
      if (st.step === 'confirm') { st.step = 'cred'; st.first = ''; return paint(); }
    }

    async function createNow(cred) {
      await Profiles.create({ name: st.name, method: st.method, credential: cred });
      finish();
    }

    function wire() {
      const backBtn = screen.querySelector('#lk-back');
      if (backBtn) backBtn.addEventListener('click', goBack);

      if (st.step === 'name') {
        const form = screen.querySelector('#name-form');
        const inp = screen.querySelector('#name-input');
        form.addEventListener('submit', e => {
          e.preventDefault();
          if (!inp.value.trim()) { screen.querySelector('#lock-error').textContent = 'Indique un prénom.'; return; }
          st.name = inp.value.trim(); st.step = 'method'; paint();
        });
        setKeyHandler(null);
        setTimeout(() => inp.focus(), 60);
      } else if (st.step === 'method') {
        screen.querySelectorAll('.method-choice').forEach(b => b.addEventListener('click', () => {
          st.method = b.dataset.method; st.first = ''; st.step = 'cred'; paint();
        }));
        setKeyHandler(null);
      } else if (st.method === 'pin') {
        wirePinStep();
      } else {
        wirePasswordStep();
      }
    }

    function wirePinStep() {
      const MIN = 4, MAX = 6;
      let entered = '';
      const dotsEl = screen.querySelector('#pin-dots');
      const errEl = screen.querySelector('#lock-error');
      const validate = screen.querySelector('#key-validate');
      function dots() {
        const n = Math.max(MIN, entered.length);
        dotsEl.innerHTML = Array.from({ length: n }, (_, i) => `<span class="pin-dot${i < entered.length ? ' filled' : ''}"></span>`).join('');
        validate.classList.toggle('ready', entered.length >= MIN);
      }
      function submit() {
        if (st.step === 'cred') {
          if (entered.length < MIN) { errEl.textContent = `Au moins ${MIN} chiffres.`; shake(); return; }
          st.first = entered; st.step = 'confirm'; paint();
        } else {
          if (entered !== st.first) { st.step = 'cred'; st.first = ''; paint(); const e2 = screen.querySelector('#lock-error'); if (e2) e2.textContent = 'Les codes ne correspondent pas.'; shake(); return; }
          createNow(entered);
        }
      }
      function press(d) { errEl.textContent = ''; if (entered.length >= MAX) return; entered += d; dots(); }
      screen.querySelectorAll('.key[data-key]').forEach(b => b.addEventListener('click', () => press(b.dataset.key)));
      screen.querySelector('#key-del').addEventListener('click', () => { entered = entered.slice(0, -1); errEl.textContent = ''; dots(); });
      validate.addEventListener('click', submit);
      setKeyHandler(e => { if (e.key >= '0' && e.key <= '9') press(e.key); else if (e.key === 'Backspace') { entered = entered.slice(0, -1); dots(); } else if (e.key === 'Enter') submit(); });
      dots();
    }

    function wirePasswordStep() {
      const form = screen.querySelector('#pw-form');
      const inp = screen.querySelector('#pw-input');
      const errEl = screen.querySelector('#lock-error');
      screen.querySelector('#pw-toggle').addEventListener('click', () => { inp.type = inp.type === 'password' ? 'text' : 'password'; inp.focus(); });
      form.addEventListener('submit', e => {
        e.preventDefault();
        const v = inp.value;
        if (st.step === 'cred') {
          if (v.length < 6) { errEl.textContent = 'Au moins 6 caractères.'; shake(); return; }
          st.first = v; st.step = 'confirm'; paint();
        } else {
          if (v !== st.first) { st.step = 'cred'; st.first = ''; paint(); const e2 = screen.querySelector('#lock-error'); if (e2) e2.textContent = 'Les mots de passe ne correspondent pas.'; shake(); return; }
          createNow(v);
        }
      });
      setKeyHandler(null);
      setTimeout(() => inp.focus(), 60);
    }

    paint();
  }

  if (Profiles.count() === 0) renderCreate();
  else renderSelect();
}

// ═══════════════════════════════════════════════════════════════
//  SERVICE WORKER (PWA) — enregistrement
// ═══════════════════════════════════════════════════════════════
function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  THÈME (clair / sombre) — préférence d'appareil
// ═══════════════════════════════════════════════════════════════
const THEME_KEY = 'naturoapp_theme';   // 'light' | 'dark' | 'auto'
function getThemePref() { try { return localStorage.getItem(THEME_KEY) || 'auto'; } catch (e) { return 'auto'; } }
function systemDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
function effectiveTheme() { const t = getThemePref(); return t === 'auto' ? (systemDark() ? 'dark' : 'light') : t; }
function applyTheme() {
  const eff = effectiveTheme();
  document.documentElement.setAttribute('data-theme', eff);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', eff === 'dark' ? '#0F1A16' : '#1A5C45');
  const btn = document.getElementById('nav-theme');
  if (btn) { btn.innerHTML = icon(eff === 'dark' ? 'sun' : 'moon'); btn.setAttribute('aria-label', eff === 'dark' ? 'Thème clair' : 'Thème sombre'); }
}
function toggleTheme() {
  const eff = effectiveTheme();
  try { localStorage.setItem(THEME_KEY, eff === 'dark' ? 'light' : 'dark'); } catch (e) {}
  applyTheme();
}
function setTheme(value) {   // 'light' | 'dark' | 'auto'
  try { localStorage.setItem(THEME_KEY, value); } catch (e) {}
  applyTheme();
}

// ═══════════════════════════════════════════════════════════════
//  SON & VIBRATION  (feedback ludique, réglable)
//  Sons synthétisés (Web Audio) — aucun fichier audio nécessaire.
// ═══════════════════════════════════════════════════════════════
const SOUND_KEY = 'naturoapp_sound';
let _audioCtx = null;
function audioCtx() {
  if (!_audioCtx) { try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { _audioCtx = null; } }
  return _audioCtx;
}
const sfx = {
  isEnabled() { try { return localStorage.getItem(SOUND_KEY) !== '0'; } catch (e) { return true; } },
  setEnabled(on) { try { localStorage.setItem(SOUND_KEY, on ? '1' : '0'); } catch (e) {} },
  vibe(pattern) { if (this.isEnabled() && navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} } },
  _melody(freqs, dur, type) {
    if (!this.isEnabled()) return;
    const ctx = audioCtx(); if (!ctx) return;
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    const now = ctx.currentTime;
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'sine'; o.frequency.value = f;
      const t0 = now + i * 0.085;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t0); o.stop(t0 + dur + 0.02);
    });
  },
  correct() { this._melody([523.25, 659.25, 783.99], 0.18, 'sine'); this.vibe(18); },     // do-mi-sol
  wrong()   { this._melody([311.13, 246.94], 0.22, 'sine'); this.vibe([22, 40, 22]); },     // descendant
  levelup() { this._melody([523.25, 659.25, 783.99, 1046.5], 0.2, 'triangle'); this.vibe([12, 30, 12, 30]); }
};

// ═══════════════════════════════════════════════════════════════
//  AUDIO — lecture vocale (Web Speech API) pour écouter mains-libres
// ═══════════════════════════════════════════════════════════════
const tts = {
  supported() { return 'speechSynthesis' in window; },
  speaking()  { return this.supported() && window.speechSynthesis.speaking; },
  cancel()    { if (this.supported()) window.speechSynthesis.cancel(); },
  // texte = string OU tableau de strings (lus à la suite). opts.onend appelé à la fin.
  speak(text, opts) {
    if (!this.supported()) return false;
    opts = opts || {};
    window.speechSynthesis.cancel();
    const parts = (Array.isArray(text) ? text : [text]).filter(Boolean);
    if (!parts.length) return false;
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(String(p));
      u.lang = 'fr-FR'; u.rate = opts.rate || 0.98; u.pitch = opts.pitch || 1;
      if (i === parts.length - 1 && opts.onend) u.onend = opts.onend;
      window.speechSynthesis.speak(u);
    });
    return true;
  }
};

// ── onReady : différé jusqu'à ce qu'un profil soit actif ─────────
let _ready = false;
const _readyCbs = [];
function fireReady() {
  _ready = true;
  document.documentElement.classList.remove('pre-lock');
  _readyCbs.splice(0).forEach(cb => { try { cb(); } catch (e) { console.error(e); } });
}
function onReady(cb) { if (_ready) cb(); else _readyCbs.push(cb); }

function currentProfile() { return Profiles.active(); }

// ── Bootstrap commun à toutes les pages ──────────────────────────
function boot() {
  migrateLegacy();
  hydrateIcons();
  applyTheme();
  registerSW();

  // Bascule de thème (clair/sombre)
  const themeBtn = document.getElementById('nav-theme');
  if (themeBtn) themeBtn.addEventListener('click', () => { toggleTheme(); });

  // Bouton de verrouillage / changement de compte (si présent dans la nav)
  const lockBtn = document.getElementById('nav-lock');
  if (lockBtn) lockBtn.addEventListener('click', () => { Profiles.clearActive(); location.reload(); });

  const active = Profiles.activeId() && Profiles.get(Profiles.activeId());
  if (active) {
    document.documentElement.classList.remove('pre-lock');
    fireReady();
  } else {
    Profiles.clearActive();   // nettoie une session orpheline
    gate(() => fireReady());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// ═══════════════════════════════════════════════════════════════
//  ANIMATIONS — helpers (respectent prefers-reduced-motion)
// ═══════════════════════════════════════════════════════════════
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Compteur animé : fait monter un nombre de 0 → `to`
function animateNumber(el, to, opts) {
  opts = opts || {};
  const suffix = opts.suffix || '';
  const dur = opts.duration || 900;
  const dec = opts.decimals || 0;
  if (!el) return;
  if (prefersReducedMotion()) { el.textContent = to.toFixed(dec) + suffix; return; }
  const start = performance.now();
  const from = 0;
  function frame(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);           // easeOutCubic
    const val = from + (to - from) * eased;
    el.textContent = val.toFixed(dec) + suffix;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = to.toFixed(dec) + suffix;
  }
  requestAnimationFrame(frame);
}

// Anneau de progression circulaire (SVG) — renvoie le markup
function progressRing(pct, opts) {
  opts = opts || {};
  const size = opts.size || 120;
  const sw = opts.stroke || 10;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const track = opts.track || 'rgba(255,255,255,0.22)';
  const color = opts.color || '#fff';
  return `
    <svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${track}" stroke-width="${sw}"/>
      <circle class="ring__bar" cx="${size/2}" cy="${size/2}" r="${r}" fill="none"
        stroke="${color}" stroke-width="${sw}" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c}"
        transform="rotate(-90 ${size/2} ${size/2})"/>
    </svg>`;
}

// Anime le remplissage d'un anneau déjà inséré dans le DOM
function setRing(barEl, pct) {
  if (!barEl) return;
  const r = parseFloat(barEl.getAttribute('r'));
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  if (prefersReducedMotion()) { barEl.style.strokeDashoffset = offset; return; }
  // léger délai pour déclencher la transition CSS
  barEl.style.strokeDashoffset = c;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    barEl.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)';
    barEl.style.strokeDashoffset = offset;
  }));
}

// Petite célébration (confettis) — pour les beaux scores. Respecte reduced-motion.
function celebrate(opts) {
  if (prefersReducedMotion()) return;
  opts = opts || {};
  const n = opts.count || 90;
  const colors = ['#27896A', '#4EBF93', '#C4873A', '#6FD7AE', '#1A5C45', '#E8C36B'];
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    p.style.left = (Math.random() * 100) + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.5) + 's';
    p.style.animationDuration = (2.4 + Math.random() * 1.8) + 's';
    if (i % 3 === 0) p.style.borderRadius = '50%';
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 5000);
}

// Génère des flashcards depuis un cours (définitions → Q/R, sinon points clés)
function courseToFlashcards(c) {
  const cards = [];
  (c.definitions || []).forEach(d => cards.push({ front: d.terme, back: d.def, tag: 'Définition' }));
  if (cards.length === 0) {
    (c.pointsCles || []).forEach(p => cards.push({ front: 'À retenir', back: p, tag: 'Point clé' }));
  }
  return cards;
}

// SVG d'une plante en pot, paramétrique selon le stade (0..5) et la santé.
function gardenSVG(stage, healthy) {
  stage = Math.max(0, Math.min(5, stage | 0));
  const leaf = healthy ? '#4EBF93' : '#A7B0A4';
  const leafDark = healthy ? '#2E9B77' : '#8C968A';
  const stemC = healthy ? '#3A9B6E' : '#94A08C';
  const flower = healthy ? '#E8A23A' : '#C7B79A';
  const stemTop = 122 - (14 + stage * 16);        // plus haut = plus grand
  let parts = '';
  // pot
  parts += '<path d="M40 122 L80 122 L75 138 L45 138 Z" fill="#C4873A"/><rect x="38" y="116" width="44" height="8" rx="2" fill="#D8954A"/>';
  // sol
  parts += '<ellipse cx="60" cy="118" rx="20" ry="3" fill="#6B4A28"/>';
  if (stage === 0) {
    // graine / pousse minuscule
    parts += `<path d="M60 118 q-1 -8 0 -12" stroke="${stemC}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    parts += `<ellipse cx="56" cy="104" rx="6" ry="3.5" fill="${leaf}" transform="rotate(-30 56 104)"/>`;
    parts += `<ellipse cx="64" cy="104" rx="6" ry="3.5" fill="${leafDark}" transform="rotate(30 64 104)"/>`;
  } else {
    // tige
    parts += `<path d="M60 118 C58 ${100 - stage * 4}, 62 ${stemTop + 14}, 60 ${stemTop}" stroke="${stemC}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    // paires de feuilles le long de la tige
    const pairs = Math.min(4, stage);
    for (let i = 0; i < pairs; i++) {
      const y = 110 - i * ((110 - stemTop) / (pairs + 0.5));
      const fl = (i % 2 === 0) ? leaf : leafDark;
      parts += `<ellipse cx="48" cy="${y}" rx="11" ry="5" fill="${fl}" transform="rotate(-28 48 ${y})"/>`;
      parts += `<ellipse cx="72" cy="${y - 4}" rx="11" ry="5" fill="${i % 2 ? leaf : leafDark}" transform="rotate(28 72 ${y - 4})"/>`;
    }
    // fleur(s) au sommet pour les stades élevés
    if (stage >= 4) {
      const cx = 60, cy = stemTop - 2;
      for (let a = 0; a < 6; a++) {
        const ang = (a / 6) * Math.PI * 2;
        parts += `<ellipse cx="${(cx + Math.cos(ang) * 7).toFixed(1)}" cy="${(cy + Math.sin(ang) * 7).toFixed(1)}" rx="5" ry="3.2" fill="${flower}" transform="rotate(${(ang * 180 / Math.PI).toFixed(0)} ${(cx + Math.cos(ang) * 7).toFixed(1)} ${(cy + Math.sin(ang) * 7).toFixed(1)})"/>`;
      }
      parts += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${healthy ? '#F4C95D' : '#D8CBA8'}"/>`;
    } else {
      // bourgeon
      parts += `<circle cx="60" cy="${stemTop}" r="5" fill="${leafDark}"/>`;
    }
  }
  return `<svg viewBox="0 0 120 145" class="garden-svg" aria-hidden="true">${parts}</svg>`;
}

// Export global
window.APP = {
  State, QUESTIONS, BADGES, shuffle, getQuestionsByDay, formatTime, getScoreColor, getGrade,
  answerKey, isMultiAnswer, isSelectionCorrect, getDailyChallenge,
  icon, hydrateIcons, escapeHtml,
  Profiles, onReady, currentProfile,
  applyTheme, toggleTheme, setTheme, getThemePref, sfx, tts,
  courseToFlashcards, gardenSVG,
  animateNumber, progressRing, setRing, prefersReducedMotion, celebrate
};

})();
