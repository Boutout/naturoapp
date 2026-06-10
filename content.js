// ═══════════════════════════════════════════════════════════════
//  NaturoApp — CONTENU PÉDAGOGIQUE (cours, concepts, glossaire)
//
//  👉 C'EST LE FICHIER À ENRICHIR pour ajouter des cours.
//  Il est chargé AVANT app.js et expose window.NATURO_CONTENT.
//  Aucune dépendance, 100% local. Voir docs/AJOUTER-DU-CONTENU.md.
//
//  Schéma d'un cours :
//  {
//    id:        'c-mon-cours',        // identifiant unique (kebab-case, préfixe c-)
//    categorie: 'Phytothérapie',      // sert à regrouper (libre)
//    jour:      2,                    // optionnel : rattache au planning J1–J8
//    titre:     'Titre du cours',
//    resume:    'Une phrase de résumé.',
//    duree:     6,                    // minutes de lecture (optionnel)
//    sections:  [ { titre:'...', contenu:'...' }, ... ],   // corps du cours
//    pointsCles:[ '...', '...' ],     // à retenir (optionnel)
//    definitions:[ { terme:'...', def:'...' } ],           // optionnel
//    questionIds:[ 1, 2 ]             // QCM liés → bouton « S'entraîner »
//  }
//
//  Le `contenu` des sections accepte un sous-ensemble de mise en forme :
//    **gras**, *italique*, et les sauts de ligne. (Pas de HTML brut : par
//    sécurité, le texte est échappé puis re-formaté — voir cours.html.)
// ═══════════════════════════════════════════════════════════════
window.NATURO_CONTENT = {

  cours: [
    {
      id: 'c-lithotherapie',
      categorie: 'Concepts fondamentaux',
      jour: 1,
      titre: 'La lithothérapie',
      resume: 'Le soin par les pierres et cristaux : définition, principes et place en naturopathie.',
      duree: 5,
      sections: [
        {
          titre: 'Définition',
          contenu: "La **lithothérapie** est une approche qui utilise les pierres et les cristaux dans une visée de mieux-être. " +
                   "Elle se distingue de l'**homéopathie** (dilutions infinitésimales) et de la phytothérapie (plantes)."
        },
        {
          titre: 'Principes avancés',
          contenu: "Chaque minéral serait associé à des propriétés énergétiques particulières. " +
                   "En naturopathie, la lithothérapie est une technique *complémentaire* : elle ne remplace jamais un avis médical."
        },
        {
          titre: 'À nuancer',
          contenu: "Les mécanismes invoqués ne sont pas démontrés scientifiquement. " +
                   "On la présente comme un outil de relaxation et d'accompagnement, pas comme un traitement."
        }
      ],
      pointsCles: [
        'Lithothérapie = soin par les pierres et cristaux',
        "Ne pas confondre avec l'homéopathie (minéraux dilués)",
        'Technique complémentaire, jamais un substitut médical'
      ],
      definitions: [
        { terme: 'Lithothérapie', def: 'Pratique de soin utilisant pierres et cristaux.' },
        { terme: 'Homéopathie', def: 'Approche utilisant des dilutions infinitésimales de substances.' }
      ],
      questionIds: [1]
    },

    {
      id: 'c-neurotransmetteurs',
      categorie: 'Neuro & micronutrition',
      jour: 8,
      titre: 'Précurseurs des neurotransmetteurs',
      resume: 'Quelle plante / quel acide aminé pour la dopamine, la sérotonine ? Le tableau à ne plus jamais confondre.',
      duree: 7,
      sections: [
        {
          titre: 'Le piège classique',
          contenu: "Beaucoup d'erreurs viennent de la confusion **dopamine** vs **sérotonine**. " +
                   "Retiens la règle : *Tyrosine → Dopamine*, *Tryptophane → Sérotonine*."
        },
        {
          titre: 'Côté plantes',
          contenu: "**Mucuna pruriens** apporte de la L-Dopa → voie **dopamine**.\n" +
                   "**Griffonia simplicifolia** apporte du 5-HTP → voie **sérotonine**.\n" +
                   "**Millepertuis** agit aussi sur l'humeur (sérotonine), mais attention aux interactions médicamenteuses."
        }
      ],
      pointsCles: [
        'Tyrosine → Dopamine ; Tryptophane → Sérotonine',
        'Mucuna = L-Dopa = DOPAMINE',
        'Griffonia = 5-HTP = SÉROTONINE'
      ],
      definitions: [
        { terme: 'Dopamine', def: 'Neurotransmetteur de la motivation et du mouvement (via la tyrosine / L-Dopa).' },
        { terme: 'Sérotonine', def: "Neurotransmetteur de l'humeur et du sommeil (via le tryptophane / 5-HTP)." },
        { terme: 'Mucuna pruriens', def: 'Plante riche en L-Dopa, précurseur de la dopamine.' },
        { terme: 'Griffonia simplicifolia', def: 'Plante riche en 5-HTP, précurseur de la sérotonine.' }
      ],
      questionIds: []
    },

    {
      id: 'c-piliers',
      categorie: 'Fondamentaux',
      jour: 1,
      titre: 'Les piliers de la naturopathie',
      resume: "Vue d'ensemble : les 3 techniques majeures et le rôle de la vitalité.",
      duree: 6,
      sections: [
        { titre: 'Une approche du terrain', contenu: "La naturopathie cherche à soutenir la **force vitale** (le *vitalisme*) et à agir sur le **terrain** plutôt que sur le seul symptôme. Objectif : prévenir et accompagner, en **complément** (jamais en remplacement) du suivi médical." },
        { titre: 'Les 3 techniques majeures', contenu: "1) **L'alimentation** (hygiène alimentaire, qualité, équilibre).\n2) **L'exercice physique** et le mouvement.\n3) **La gestion du psychisme / des émotions** (sommeil, stress, respiration).\nElles forment le socle ; les autres techniques (phyto, hydro, réflexo…) viennent en appui." },
        { titre: 'Le principe d\'individualisation', contenu: "Deux personnes avec le même symptôme peuvent recevoir des conseils différents selon leur **tempérament** et leur **terrain**. C'est la logique du *« cas par cas »*." }
      ],
      pointsCles: [
        'Naturopathie = agir sur le terrain + la vitalité, en complément du médical',
        'Techniques majeures : alimentation, exercice, gestion du psychisme',
        'Approche individualisée selon le terrain'
      ],
      definitions: [
        { terme: 'Vitalisme', def: "Principe selon lequel l'organisme possède une force d'auto-guérison à soutenir." },
        { terme: 'Terrain', def: "Ensemble des prédispositions et de l'état global d'une personne." }
      ],
      questionIds: [82]
    },

    {
      id: 'c-emonctoires',
      categorie: 'Fondamentaux',
      jour: 1,
      titre: 'Émonctoires & drainage',
      resume: 'Les 5 portes de sortie des déchets et pourquoi on draine.',
      duree: 5,
      sections: [
        { titre: 'Les 5 émonctoires', contenu: "Ce sont les organes qui **éliminent les déchets** : le **foie**, les **reins**, les **intestins**, les **poumons** et la **peau**. Moyen mnémotechnique : **FRIPP**." },
        { titre: 'Drainer : pourquoi ?', contenu: "Quand les déchets (*toxines/toxémie*) s'accumulent, le terrain s'encrasse. Le **drainage** soutient les émonctoires pour favoriser l'élimination. On adapte toujours l'intensité à la **vitalité** de la personne." },
        { titre: 'Émonctoire ≠ digestion', contenu: "L'estomac digère mais **n'élimine pas** : ce n'est pas un émonctoire. À ne pas confondre avec l'intestin." }
      ],
      pointsCles: [
        'FRIPP : Foie, Reins, Intestins, Poumons, Peau',
        'Drainer = soutenir l\'élimination des déchets',
        'Adapter l\'intensité à la vitalité'
      ],
      definitions: [
        { terme: 'Émonctoire', def: 'Organe d\'élimination des déchets de l\'organisme.' },
        { terme: 'Toxémie', def: 'Surcharge de l\'organisme en déchets/toxines.' },
        { terme: 'Drainage', def: 'Stimulation des émonctoires pour favoriser l\'élimination.' }
      ],
      questionIds: [81]
    },

    {
      id: 'c-temperaments',
      categorie: 'Typologies',
      jour: 3,
      titre: 'Les tempéraments hippocratiques',
      resume: 'Les 4 humeurs et leurs tempéraments, base de la typologie.',
      duree: 6,
      sections: [
        { titre: 'Les 4 humeurs', contenu: "Hippocrate associe 4 humeurs à 4 tempéraments :\n- **Sang** → *sanguin*\n- **Lymphe** → *lymphatique* (flegmatique)\n- **Bile jaune** → *bilieux* (colérique)\n- **Bile noire** → *nerveux* (mélancolique)" },
        { titre: 'À quoi ça sert ?', contenu: "Repérer le **tempérament dominant** aide à **individualiser** les conseils (alimentation, rythme, plantes). C'est un outil d'observation, pas une étiquette figée." }
      ],
      pointsCles: [
        '4 humeurs : sang, lymphe, bile jaune, bile noire',
        '4 tempéraments : sanguin, lymphatique, bilieux, nerveux',
        'Sert à individualiser les conseils'
      ],
      definitions: [
        { terme: 'Tempérament', def: 'Profil de constitution selon l\'humeur dominante (Hippocrate).' }
      ],
      questionIds: [83]
    },

    {
      id: 'c-sn-autonome',
      categorie: 'Typologies',
      jour: 3,
      titre: 'Système nerveux autonome : vagotonie & sympathicotonie',
      resume: 'Deux profils opposés : le « vague » (repos) et le « sympathique » (action).',
      duree: 6,
      sections: [
        { titre: 'Deux branches', contenu: "Le système nerveux autonome a deux branches :\n- **Parasympathique** (nerf **vague**) = *repos, digestion, récupération*.\n- **Sympathique** = *action, stress, mobilisation de l'énergie*." },
        { titre: 'Vagotonique', contenu: "Profil à **dominance parasympathique** : péristaltisme intestinal **augmenté**, tendance aux émotions, intuition, créativité (cerveau droit). « Vague comme la mer » : fluide, intérieur." },
        { titre: 'Sympathicotonique', contenu: "Profil à **dominance sympathique** : accélération, tonus, action, tendance au stress, pensée analytique (cerveau gauche)." }
      ],
      pointsCles: [
        'Parasympathique (vague) = repos/digestion ; Sympathique = action/stress',
        'Vagotonique : intestin réactif, émotions, intuition',
        'Sympathicotonique : accélération, stress, analyse'
      ],
      definitions: [
        { terme: 'Vagotonie', def: 'Dominance du parasympathique (nerf vague).' },
        { terme: 'Sympathicotonie', def: 'Dominance du système sympathique.' }
      ],
      questionIds: [26]
    },

    {
      id: 'c-acido-basique',
      categorie: 'Nutrition',
      jour: 5,
      titre: "L'équilibre acido-basique",
      resume: 'Aliments acidifiants vs alcalinisants : trouver l\'équilibre.',
      duree: 6,
      sections: [
        { titre: 'Le pH du terrain', contenu: "L'organisme régule finement son pH. Une alimentation trop **acidifiante** au long cours peut, selon l'approche naturo, solliciter les systèmes tampons et le terrain." },
        { titre: 'Acidifiant / alcalinisant', contenu: "**Acidifiants** : excès de protéines animales, sucres raffinés, sodas, café.\n**Alcalinisants** : *légumes verts*, fruits, pomme de terre, oléagineux, eaux riches en bicarbonates." },
        { titre: 'En pratique', contenu: "On vise l'**équilibre** (assiette riche en végétaux), pas l'élimination totale d'une catégorie. La mastication et la respiration comptent aussi." }
      ],
      pointsCles: [
        'Acidifiants : protéines animales en excès, sucres raffinés, sodas',
        'Alcalinisants : légumes verts, fruits, oléagineux',
        'Objectif : équilibre, assiette végétale colorée'
      ],
      definitions: [
        { terme: 'Acidifiant', def: 'Aliment dont le métabolisme tend à acidifier le terrain.' },
        { terme: 'Alcalinisant', def: 'Aliment dont le métabolisme tend à alcaliniser le terrain.' }
      ],
      questionIds: []
    },

    {
      id: 'c-hydrotherapie',
      categorie: 'Techniques',
      jour: 1,
      titre: "L'hydrothérapie",
      resume: "L'eau comme outil : chaud, froid et alternance.",
      duree: 5,
      sections: [
        { titre: 'Le chaud', contenu: "La **chaleur** détend, **vasodilate** (afflux de sang) et apaise. Utile sur les tensions et pour la relaxation." },
        { titre: 'Le froid', contenu: "Le **froid** provoque d'abord une **vasoconstriction**, suivie d'une **vasodilatation réactionnelle** : c'est l'effet **tonifiant** (douche froide, jet écossais)." },
        { titre: 'L\'alternance', contenu: "Alterner chaud/froid (**jet écossais**) entraîne une « gymnastique » des vaisseaux : stimulant pour la circulation. Toujours adapter à l'état de la personne." }
      ],
      pointsCles: [
        'Chaud = détente + vasodilatation',
        'Froid = vasoconstriction puis afflux de sang (tonifiant)',
        'Alternance chaud/froid = gymnastique vasculaire'
      ],
      definitions: [
        { terme: 'Vasoconstriction', def: 'Resserrement des vaisseaux sanguins.' },
        { terme: 'Vasodilatation', def: 'Élargissement des vaisseaux sanguins.' }
      ],
      questionIds: [84]
    }
  ],

  // Glossaire transversal (en plus des définitions intégrées aux cours).
  // Chaque entrée est cherchable sur la page Cours.
  glossaire: [
    { terme: 'Prébiotique', categorie: 'Microbiote', definition: 'Fibre servant de substrat aux bonnes bactéries du côlon (ex : inuline).' },
    { terme: 'Probiotique', categorie: 'Microbiote', definition: 'Micro-organisme vivant bénéfique pour la flore intestinale.' },
    { terme: 'MUFA', categorie: 'Nutrition', definition: "Acide gras mono-insaturé (une seule double liaison), ex : oméga 9 / acide oléique." },
    { terme: 'Revitalisation', categorie: 'Naturopathie', definition: "Cure visant à recharger l'organisme en nutriments et vitalité." }
  ]
};
