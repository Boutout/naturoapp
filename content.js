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
    },

    {
      id: 'c-phytotherapie',
      categorie: 'Phytothérapie',
      jour: 2,
      titre: 'Les bases de la phytothérapie',
      resume: 'Soigner avec les plantes : formes galéniques et notion de totum.',
      duree: 6,
      sections: [
        { titre: 'Le « totum »', contenu: "La phytothérapie utilise la plante **entière** (ou ses parties) : c'est le **totum**, l'ensemble des principes actifs qui agissent en synergie — différent d'une molécule isolée." },
        { titre: 'Les formes', contenu: "**Tisane / infusion** (parties fragiles : fleurs, feuilles), **décoction** (parties dures : racines, écorces), **teinture-mère** (macération alcoolique), **EPS / extraits**, **gélules de poudre**, **huiles essentielles** (aromathérapie)." },
        { titre: 'Prudence', contenu: "« Naturel » ne veut pas dire « sans risque » : interactions médicamenteuses, grossesse, terrain. Toujours se renseigner et orienter vers un professionnel si besoin." }
      ],
      pointsCles: [
        'Totum = plante entière en synergie',
        'Infusion (fragile) vs décoction (dur)',
        'Naturel ≠ sans risque : attention aux interactions'
      ],
      definitions: [
        { terme: 'Totum', def: "Ensemble des composants d'une plante agissant en synergie." },
        { terme: 'Teinture-mère', def: 'Extrait obtenu par macération de la plante dans l\'alcool.' },
        { terme: 'Décoction', def: 'Extraction par ébullition (racines, écorces).' }
      ],
      questionIds: []
    },

    {
      id: 'c-aromatherapie',
      categorie: 'Aromathérapie',
      jour: 3,
      titre: 'Aromathérapie : familles biochimiques',
      resume: 'Comprendre les huiles essentielles par leurs molécules dominantes.',
      duree: 7,
      sections: [
        { titre: 'Une HE = un bouquet de molécules', contenu: "Une **huile essentielle** est très concentrée. On la lit par sa **famille biochimique** dominante, qui oriente ses propriétés… et sa **dangerosité**." },
        { titre: 'Quelques familles', contenu: "**Monoterpènes** : toniques (agrumes, pin).\n**Esters** : apaisants, antispasmodiques (lavande vraie).\n**Phénols** : anti-infectieux puissants mais **dermocaustiques/hépatotoxiques** (origan, thym à thymol).\n**Cétones** : mucolytiques mais **neurotoxiques/abortives** à doses élevées (menthe, romarin à camphre)." },
        { titre: 'Sécurité', contenu: "Jamais d'HE pures sur la peau (sauf exception), prudence chez l'enfant, la femme enceinte, l'épileptique. Diluer dans une **huile végétale**." }
      ],
      pointsCles: [
        'On lit une HE par sa famille biochimique dominante',
        'Phénols = anti-infectieux mais dermocaustiques',
        'Cétones = mucolytiques mais neurotoxiques à dose élevée'
      ],
      definitions: [
        { terme: 'Huile essentielle', def: 'Extrait aromatique volatil et très concentré d\'une plante.' },
        { terme: 'Phénols (HE)', def: 'Molécules anti-infectieuses puissantes, mais agressives pour la peau et le foie.' },
        { terme: 'Cétones (HE)', def: 'Molécules mucolytiques, neurotoxiques et abortives à doses élevées.' }
      ],
      questionIds: [27]
    },

    {
      id: 'c-micronutrition',
      categorie: 'Nutrition',
      jour: 5,
      titre: 'Micronutrition : vitamines & minéraux clés',
      resume: 'Les micronutriments qui reviennent le plus souvent en accompagnement.',
      duree: 6,
      sections: [
        { titre: 'Vitamines', contenu: "**Vitamine D** (immunité, os ; synthèse via le soleil), **vitamines B** (énergie, système nerveux), **vitamine C** (antioxydant, immunité, fer), **vitamine E** (antioxydant)." },
        { titre: 'Minéraux', contenu: "**Magnésium** (stress, muscles, sommeil), **fer** (transport de l'oxygène), **zinc** (immunité, peau), **iode** (thyroïde)." },
        { titre: 'Logique naturo', contenu: "On vise d'abord l'**alimentation** (assiette dense en nutriments), la complémentation venant en **soutien ciblé**, pas en automatique." }
      ],
      pointsCles: [
        'Vitamine D : immunité + os (soleil)',
        'Magnésium : stress, muscles, sommeil',
        'Alimentation d\'abord, complément en soutien ciblé'
      ],
      definitions: [
        { terme: 'Micronutriment', def: 'Nutriment nécessaire en petite quantité (vitamines, minéraux, oligo-éléments).' },
        { terme: 'Antioxydant', def: "Molécule qui neutralise les radicaux libres (vit. C, E, zinc…)." }
      ],
      questionIds: []
    },

    {
      id: 'c-sommeil',
      categorie: 'Hygiène de vie',
      jour: 8,
      titre: 'Le sommeil',
      resume: 'Rythmes, mélatonine et bonnes habitudes du soir.',
      duree: 5,
      sections: [
        { titre: 'L\'horloge interne', contenu: "Le sommeil est piloté par un rythme **circadien**. La **mélatonine** (hormone du sommeil) est sécrétée le soir, dans l'**obscurité** — la lumière (surtout bleue des écrans) la freine." },
        { titre: 'Le train du sommeil', contenu: "Le sommeil arrive par **cycles** de ~90 min. Rater son « train » (signaux : bâillements, yeux qui piquent) oblige à attendre le suivant." },
        { titre: 'Bonnes habitudes', contenu: "Lumière baissée le soir, écrans réduits, repas léger, régularité des horaires, chambre fraîche et sombre. La *cohérence cardiaque* peut aider à l'endormissement." }
      ],
      pointsCles: [
        'Mélatonine = hormone du soir, freinée par la lumière',
        'Cycles de ~90 min : ne pas rater son « train »',
        'Obscurité, régularité, écrans réduits'
      ],
      definitions: [
        { terme: 'Mélatonine', def: 'Hormone du sommeil sécrétée le soir dans l\'obscurité.' },
        { terme: 'Rythme circadien', def: 'Horloge biologique sur ~24 h réglant veille et sommeil.' }
      ],
      questionIds: []
    },

    {
      id: 'c-stress',
      categorie: 'Hygiène de vie',
      jour: 3,
      titre: 'Gestion du stress & cohérence cardiaque',
      resume: 'Calmer le système nerveux par la respiration.',
      duree: 5,
      sections: [
        { titre: 'Stress aigu vs chronique', contenu: "Le stress **aigu** est utile (mobilisation). Le stress **chronique** épuise (sympathique en surrégime, cortisol élevé) et pèse sur la digestion, le sommeil, l'immunité." },
        { titre: 'La cohérence cardiaque', contenu: "Respirer **6 respirations par minute** (≈ 5 s d'inspiration, 5 s d'expiration) pendant ~5 minutes équilibre le système nerveux autonome (stimule le **nerf vague**). Méthode populaire : **365** (3 fois par jour, 6 respirations/min, 5 min)." },
        { titre: 'Autres leviers', contenu: "Mouvement, nature, sommeil, lien social, parfois plantes adaptogènes — toujours en complément d'un accompagnement adapté." }
      ],
      pointsCles: [
        'Stress chronique = sympathique en surrégime',
        'Cohérence cardiaque : 6 respirations/min, 5 min',
        'Méthode 365 : 3×/jour'
      ],
      definitions: [
        { terme: 'Cohérence cardiaque', def: 'Technique respiratoire (~6/min) qui équilibre le système nerveux autonome.' },
        { terme: 'Cortisol', def: 'Hormone du stress, élevée en cas de stress chronique.' }
      ],
      questionIds: [26]
    },

    {
      id: 'c-jeune-monodiete',
      categorie: 'Nutrition',
      jour: 6,
      titre: 'Jeûne & monodiète',
      resume: 'Mettre la digestion au repos : principes et précautions.',
      duree: 5,
      sections: [
        { titre: 'L\'idée', contenu: "Réduire ou suspendre l'apport alimentaire met le système digestif **au repos** et favorise, selon l'approche naturo, le travail des émonctoires. La **monodiète** = un seul aliment (ex : pommes, riz) sur une courte période." },
        { titre: 'Formes douces', contenu: "**Jeûne intermittent** (fenêtre alimentaire réduite), **monodiète d'un repas ou d'une journée**. On adapte toujours à la **vitalité** de la personne." },
        { titre: 'Précautions', contenu: "Déconseillé sans accompagnement chez les personnes fragiles (dénutrition, diabète, grossesse, troubles du comportement alimentaire). Reprise alimentaire **progressive**." }
      ],
      pointsCles: [
        'Jeûne/monodiète = repos digestif',
        'Formes douces : jeûne intermittent, monodiète courte',
        'Précautions : terrains fragiles, reprise progressive'
      ],
      definitions: [
        { terme: 'Monodiète', def: 'Alimentation réduite à un seul aliment sur une courte durée.' },
        { terme: 'Jeûne intermittent', def: 'Alternance de périodes de jeûne et de prise alimentaire.' }
      ],
      questionIds: []
    }
  ],

  // Glossaire transversal (en plus des définitions intégrées aux cours).
  // Chaque entrée est cherchable sur la page Cours.
  glossaire: [
    { terme: 'Prébiotique', categorie: 'Microbiote', definition: 'Fibre servant de substrat aux bonnes bactéries du côlon (ex : inuline).' },
    { terme: 'Probiotique', categorie: 'Microbiote', definition: 'Micro-organisme vivant bénéfique pour la flore intestinale.' },
    { terme: 'MUFA', categorie: 'Nutrition', definition: "Acide gras mono-insaturé (une seule double liaison), ex : oméga 9 / acide oléique." },
    { terme: 'Revitalisation', categorie: 'Naturopathie', definition: "Cure visant à recharger l'organisme en nutriments et vitalité." }
  ],

  // ═══════════════════════════════════════════════════════════════
  //  CAS PRATIQUES — patients fictifs, raisonnement naturopathique.
  //  Schéma : { id, titre, icon, profil:{nom,age,motif}, contexte,
  //            etapes:[{ question, options[], bonne, explication }],
  //            synthese }  — purement pédagogique, jamais un avis médical.
  // ═══════════════════════════════════════════════════════════════
  casPratiques: [
    {
      id: 'cas-ballonnements',
      titre: 'Ballonnements & digestion difficile',
      icon: 'droplet',
      profil: { nom: 'Sophie', age: 38, motif: 'Ballonnements après les repas, transit irrégulier' },
      contexte: "Sophie mange vite, souvent stressée au travail. Elle prend un café au lait le matin avec du pain, et dort mal depuis quelques mois. Aucun signe d'alarme médical.",
      etapes: [
        {
          question: "Quelle habitude aggrave le plus sa digestion ?",
          options: ['Le café au lait du matin', 'Manger des légumes', "Boire de l'eau", 'Marcher après le repas'],
          bonne: 0,
          explication: "Le café précipite les caséines du lait → un coagulum difficile à digérer. Associé au manque de mastication, c'est une cause classique de ballonnements."
        },
        {
          question: "Quelle plante proposer pour les spasmes et les gaz ?",
          options: ['Fenouil', 'Valériane', 'Échinacée', 'Pissenlit'],
          bonne: 0,
          explication: "Le fenouil (anéthole) est antispasmodique et carminatif : il détend l'intestin et aide à expulser les gaz. Valériane = sommeil, échinacée = immunité, pissenlit = foie."
        },
        {
          question: "Quel pilier d'hygiène de vie travailler en priorité ?",
          options: ['Gestion du stress (cohérence cardiaque) + mastication', 'Augmenter le café', 'Sauter le petit-déjeuner', 'Faire un jeûne de 5 jours'],
          bonne: 0,
          explication: "Le stress freine la digestion (sympathique). Ralentir, mastiquer et pratiquer la cohérence cardiaque relancent le parasympathique (« repos-digestion »). Le jeûne long serait inadapté ici."
        }
      ],
      synthese: "Pistes : ralentir et mastiquer, supprimer le café au lait, soutenir la digestion (fenouil, basilic) et apaiser le stress (cohérence cardiaque, sommeil). Orienter vers un médecin si les troubles persistent."
    },

    {
      id: 'cas-fatigue',
      titre: 'Fatigue chronique & terrain fragilisé',
      icon: 'sprout',
      profil: { nom: 'Marc', age: 45, motif: 'Fatigue persistante, infections à répétition, peau sèche' },
      contexte: "Marc enchaîne les petites infections cet hiver, se sent vidé et a la peau sèche. Bilan médical sans gravité. Terrain plutôt dévitalisé.",
      etapes: [
        {
          question: "Cette association (immunité basse + peau sèche) évoque une carence en…",
          options: ['Acides gras essentiels (« vitamine F »)', 'Sodium', 'Calcium', 'Vitamine K'],
          bonne: 0,
          explication: "La « vitamine F » = acides gras essentiels. Leur carence touche l'immunité (précurseurs de prostaglandines), la peau (membranes cellulaires) et la sphère respiratoire."
        },
        {
          question: "Quelle cure naturopathique est prioritaire ?",
          options: ['Revitalisation', 'Détoxication intensive', 'Jeûne long', 'Monodiète stricte prolongée'],
          bonne: 0,
          explication: "Sur un terrain dévitalisé, on RECHARGE avant tout (revitalisation). Un drainage intensif épuiserait encore plus la vitalité : on adapte toujours à l'énergie de la personne."
        },
        {
          question: "Quel apport soutient l'immunité et la peau ?",
          options: ['Oméga 3 + zinc + vitamine D', 'Beaucoup de sucre rapide', 'Régime sans aucun gras', 'Café et sel'],
          bonne: 0,
          explication: "Oméga 3 (anti-inflammatoires), zinc (immunité/peau) et vitamine D (immunité) forment un trio cohérent pour ce terrain."
        }
      ],
      synthese: "Pistes : revitaliser (oméga 3, zinc, vitamine D, magnésium), améliorer le sommeil et réduire le stress, drainage doux seulement. Toujours en complément d'un suivi médical."
    },

    {
      id: 'cas-premenopause',
      titre: 'Préménopause & déséquilibre hormonal',
      icon: 'flower',
      profil: { nom: 'Hélène', age: 49, motif: 'Cycles irréguliers, irritabilité, bouffées de chaleur' },
      contexte: "Hélène a 49 ans, des cycles devenus irréguliers, de l'irritabilité avant les règles et quelques bouffées de chaleur. Suivi gynécologique à jour.",
      etapes: [
        {
          question: "Ce tableau évoque quel déséquilibre ?",
          options: ['Hyperœstrogénie relative (manque de progestérone)', 'Carence en testostérone', 'Excès de progestérone', 'Hypothyroïdie isolée'],
          bonne: 0,
          explication: "En préménopause, la progestérone baisse avant les œstrogènes : ces derniers sont en excès RELATIF. D'où le syndrome prémenstruel accentué."
        },
        {
          question: "Quelle plante « progestérone-like » proposer ?",
          options: ['Alchémille', 'Sauge (œstrogène-like)', 'Valériane', 'Artichaut'],
          bonne: 0,
          explication: "L'alchémille (et le houblon) sont progestérone-like. La sauge et le trèfle rouge sont au contraire œstrogène-like — à ne pas confondre."
        },
        {
          question: "Quel signe serait ATYPIQUE et devrait faire consulter ?",
          options: ['Une perte de poids importante et inexpliquée', 'Bouffées de chaleur', 'Troubles du sommeil', 'Irritabilité prémenstruelle'],
          bonne: 0,
          explication: "La ménopause s'accompagne plutôt d'une PRISE de poids. Une perte de poids marquée et inexpliquée est atypique → orienter vers le médecin."
        }
      ],
      synthese: "Pistes : soutenir la progestérone (alchémille, houblon), magnésium et plantes du stress, hygiène de vie. Tout symptôme atypique (perte de poids, saignements anormaux) impose un avis médical."
    },

    {
      id: 'cas-allergie',
      titre: 'Terrain allergique saisonnier',
      icon: 'leaf',
      profil: { nom: 'Léa', age: 28, motif: 'Rhinite au printemps, petit eczéma' },
      contexte: "Léa a une rhinite allergique chaque printemps et un eczéma léger. Elle aimerait travailler son terrain de fond.",
      etapes: [
        {
          question: "Quelles plantes pour le terrain allergique ?",
          options: ['Plantain et cassis', 'Valériane et passiflore', 'Thym et eucalyptus', 'Artichaut et radis noir'],
          bonne: 0,
          explication: "Le plantain (antihistaminique naturel) et le cassis (anti-inflammatoire, « cortison-like ») sont les plantes de fond du terrain allergique."
        },
        {
          question: "Quel axe de fond renforcer ?",
          options: ["Le microbiote intestinal (pré/probiotiques)", 'Plus de sucre raffiné', 'Supprimer tous les légumes', 'Augmenter la charcuterie'],
          bonne: 0,
          explication: "70 % de l'immunité se joue dans l'intestin. Soigner le microbiote (pré/probiotiques, fibres) module le terrain allergique."
        },
        {
          question: "Quel acide gras privilégier pour son effet anti-inflammatoire ?",
          options: ['Oméga 3 (EPA/DHA)', 'Oméga 6 en excès', 'Graisses trans', 'Aucun gras'],
          bonne: 0,
          explication: "Les oméga 3 sont anti-inflammatoires (prostaglandines de série 3). À l'inverse, un excès d'oméga 6 est pro-inflammatoire : c'est le ratio qui compte."
        }
      ],
      synthese: "Pistes : plantes de terrain (plantain, cassis), soin du microbiote, rééquilibrage oméga 3/oméga 6, réduction des sucres raffinés. En complément du suivi allergologique."
    }
  ]
};
