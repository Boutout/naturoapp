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
//    questionIds: []             // QCM liés → bouton « S'entraîner »
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
          titre: 'Ne pas confondre',
          contenu: "Trois approches « minérales » à bien distinguer :\n- **Lithothérapie** : pierres et cristaux comme support (énergétique/relaxation).\n- **Homéopathie** : minéraux **dilués** de façon infinitésimale.\n- **Oligothérapie** : apport d'**oligo-éléments** (zinc, cuivre, sélénium…) à visée physiologique.\nLe mot vient du grec *lithos* = pierre."
        },
        {
          titre: 'À nuancer (cadre prudent)',
          contenu: "Les mécanismes invoqués ne sont **pas démontrés scientifiquement**. On la présente comme un outil de **relaxation** et d'**accompagnement**, pas comme un traitement. Comme toute technique naturo, elle reste **complémentaire** et ne remplace jamais un avis médical."
        }
      ],
      pointsCles: [
        'Lithothérapie = soin par les pierres et cristaux (lithos = pierre)',
        "Ne pas confondre avec l'homéopathie (minéraux dilués) ni l'oligothérapie (oligo-éléments)",
        'Mécanismes non démontrés → outil de relaxation/accompagnement',
        'Technique complémentaire, jamais un substitut médical'
      ],
      definitions: [
        { terme: 'Lithothérapie', def: 'Pratique de soin utilisant pierres et cristaux.' },
        { terme: 'Homéopathie', def: 'Approche utilisant des dilutions infinitésimales de substances.' },
        { terme: 'Oligothérapie', def: "Apport d'oligo-éléments (zinc, cuivre, sélénium…) à visée physiologique." }
      ],
      questionIds: []
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
          titre: 'Les deux voies en détail',
          contenu: "**Voie dopamine** : Tyrosine → L-DOPA → **Dopamine** (motivation, mouvement, plaisir). Une carence donne fatigue, manque d'élan, parfois jambes sans repos.\n" +
                   "**Voie sérotonine** : Tryptophane → 5-HTP → **Sérotonine** → **Mélatonine** (humeur, satiété, puis sommeil). Une carence donne tristesse, compulsions sucrées, troubles du sommeil."
        },
        {
          titre: 'Côté plantes',
          contenu: "**Mucuna pruriens** apporte de la L-Dopa → voie **dopamine**.\n" +
                   "**Griffonia simplicifolia** apporte du 5-HTP → voie **sérotonine**.\n" +
                   "**Millepertuis** agit aussi sur l'humeur (recapture de la sérotonine), mais **attention aux interactions médicamenteuses** (nombreuses)."
        },
        {
          titre: 'Côté micronutrition',
          contenu: "Les neurotransmetteurs ont besoin de **cofacteurs** pour être fabriqués : **magnésium**, **vitamines B** (B6 surtout), **fer** et **zinc**. Sans eux, même avec les précurseurs, la synthèse est freinée. La qualité du **microbiote** influence aussi la production (l'intestin, « 2ᵉ cerveau »)."
        }
      ],
      pointsCles: [
        'Tyrosine → Dopamine ; Tryptophane → Sérotonine → Mélatonine',
        'Mucuna = L-Dopa = DOPAMINE',
        'Griffonia = 5-HTP = SÉROTONINE',
        'Cofacteurs : magnésium, vitamines B (B6), fer, zinc',
        'Millepertuis = humeur mais interactions médicamenteuses'
      ],
      definitions: [
        { terme: 'Dopamine', def: 'Neurotransmetteur de la motivation et du mouvement (via la tyrosine / L-Dopa).' },
        { terme: 'Sérotonine', def: "Neurotransmetteur de l'humeur et du sommeil (via le tryptophane / 5-HTP)." },
        { terme: 'Mucuna pruriens', def: 'Plante riche en L-Dopa, précurseur de la dopamine.' },
        { terme: 'Griffonia simplicifolia', def: 'Plante riche en 5-HTP, précurseur de la sérotonine.' },
        { terme: 'Cofacteur', def: "Nutriment (vitamine, minéral) nécessaire au fonctionnement d'une enzyme — ici, la synthèse des neurotransmetteurs." }
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
        { titre: 'Les techniques mineures (en appui)', contenu: "Au-delà des 3 piliers, le naturopathe dispose de techniques complémentaires : **phytothérapie** et **aromathérapie**, **hydrothérapie**, **techniques manuelles** (massages, réflexologie), **techniques respiratoires**, **réflexologie**, **techniques énergétiques**. Elles renforcent l'action de fond mais ne la remplacent pas." },
        { titre: 'Les 4 concepts fondateurs', contenu: "La naturopathie s'appuie sur 4 grands principes :\n- **Vitalisme** : soutenir la force vitale.\n- **Humorisme** : la qualité des liquides (humeurs) compte.\n- **Causalisme** : chercher la **cause** et pas seulement le symptôme.\n- **Holisme** : considérer la personne dans sa **globalité** (corps, mental, environnement)." },
        { titre: 'Le principe d\'individualisation', contenu: "Deux personnes avec le même symptôme peuvent recevoir des conseils différents selon leur **tempérament** et leur **terrain**. C'est la logique du *« cas par cas »* : on adapte toujours à la vitalité et au mode de vie de la personne." }
      ],
      pointsCles: [
        'Naturopathie = agir sur le terrain + la vitalité, en complément du médical',
        'Techniques majeures : alimentation, exercice, gestion du psychisme',
        'Techniques mineures en appui : phyto, hydro, manuelles, respiratoires…',
        '4 concepts : vitalisme, humorisme, causalisme, holisme',
        'Approche individualisée selon le terrain (cas par cas)'
      ],
      definitions: [
        { terme: 'Vitalisme', def: "Principe selon lequel l'organisme possède une force d'auto-guérison à soutenir." },
        { terme: 'Terrain', def: "Ensemble des prédispositions et de l'état global d'une personne." },
        { terme: 'Causalisme', def: "Chercher la cause profonde d'un trouble, pas seulement à en supprimer le symptôme." },
        { terme: 'Holisme', def: "Considérer la personne dans sa globalité (physique, psychique, environnement)." }
      ],
      questionIds: []
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
        { titre: 'Le rôle de chacun', contenu: "Chaque émonctoire élimine un type de déchet :\n- **Foie** : déchets **colloïdaux** (« colles ») via la bile, + détoxification.\n- **Intestins** : évacuation des selles (déchets solides).\n- **Reins** : déchets **acides** solubles via l'urine.\n- **Poumons** : acides **volatils** (CO₂) via la respiration.\n- **Peau** : sueur et sébum — émonctoire **de secours** quand les autres sont débordés (d'où acné, eczéma)." },
        { titre: 'Acides et colles', contenu: "Distinction fondamentale : les déchets **ACIDES** sortent par les **reins + poumons** ; les déchets **COLLES** (colloïdaux) sortent par le **foie + gros intestin**. Orienter le drainage selon le type de surcharge." },
        { titre: 'Drainer : pourquoi ?', contenu: "Quand les déchets (*toxines/toxémie*) s'accumulent, le terrain s'**encrasse**. Le **drainage** soutient les émonctoires pour favoriser l'élimination. On adapte toujours l'intensité à la **vitalité** de la personne : un terrain dévitalisé se draine en douceur (sinon on l'épuise)." },
        { titre: 'Émonctoire ≠ digestion', contenu: "L'estomac digère mais **n'élimine pas** : ce n'est pas un émonctoire. À ne pas confondre avec l'**intestin**, qui, lui, est un émonctoire (élimination des selles)." }
      ],
      pointsCles: [
        'FRIPP : Foie, Reins, Intestins, Poumons, Peau',
        'Foie = colles/bile · Reins = acides/urine · Poumons = acides volatils · Intestins = selles · Peau = secours',
        'Acides → reins + poumons ; colles → foie + gros intestin',
        'Drainer = soutenir l\'élimination des déchets',
        'Adapter l\'intensité à la vitalité (terrain dévitalisé = drainage doux)'
      ],
      definitions: [
        { terme: 'Émonctoire', def: 'Organe d\'élimination des déchets de l\'organisme.' },
        { terme: 'Toxémie', def: 'Surcharge de l\'organisme en déchets/toxines.' },
        { terme: 'Drainage', def: 'Stimulation des émonctoires pour favoriser l\'élimination.' },
        { terme: 'Déchets colloïdaux', def: 'Déchets « colles » issus des graisses et féculents, éliminés par le foie et le gros intestin.' }
      ],
      questionIds: []
    },

    {
      id: 'c-temperaments',
      categorie: 'Typologies',
      jour: 3,
      titre: 'Les tempéraments hippocratiques',
      resume: 'Les 4 humeurs et leurs tempéraments, base de la typologie.',
      duree: 6,
      sections: [
        { titre: 'Les 4 humeurs', contenu: "Hippocrate associe 4 humeurs à 4 tempéraments, eux-mêmes liés à 4 qualités (chaud/froid, sec/humide) :\n- **Sang** (chaud-humide) → *sanguin*\n- **Lymphe** (froid-humide) → *lymphatique* (flegmatique)\n- **Bile jaune** (chaud-sec) → *bilieux* (colérique)\n- **Bile noire** (froid-sec) → *nerveux* (mélancolique)" },
        { titre: 'Le sanguin', contenu: "Chaud et humide. **Extraverti, jovial, sociable**, bon vivant, plein d'énergie et d'appétit.\n- *Terrain* : sang et circulation ; tendance aux **excès** (table, plaisirs), à la pléthore.\n- *Conseils* : modération alimentaire, mouvement régulier, surveiller la circulation." },
        { titre: 'Le lymphatique (flegmatique)', contenu: "Froid et humide. **Calme, posé, endurant**, mais lent à démarrer.\n- *Terrain* : système lymphatique ; tendance à la **lenteur, la prise de poids, la rétention** et la congestion.\n- *Conseils* : stimulation, activité physique, drainage, alimentation peu mucogène." },
        { titre: 'Le bilieux (colérique)', contenu: "Chaud et sec. **Volontaire, ardent, meneur**, mais impatient et irritable.\n- *Terrain* : foie et vésicule ; tendance **inflammatoire** et à la colère.\n- *Conseils* : détente, soutien hépatique (artichaut, radis noir), gestion des émotions." },
        { titre: 'Le nerveux (mélancolique)', contenu: "Froid et sec. **Sensible, cérébral, introspectif et créatif**, mais anxieux.\n- *Terrain* : système nerveux ; tendance à l'**anxiété**, aux troubles du **sommeil** et de la **digestion**.\n- *Conseils* : reminéralisation (magnésium), ancrage, sommeil, plantes calmantes." },
        { titre: 'À quoi ça sert ?', contenu: "Repérer le **tempérament dominant** (souvent un mélange) aide à **individualiser** les conseils : alimentation, rythme de vie, plantes, gestion émotionnelle. C'est un **outil d'observation**, pas une étiquette figée." }
      ],
      pointsCles: [
        '4 humeurs : sang, lymphe, bile jaune, bile noire',
        '4 tempéraments : sanguin, lymphatique, bilieux, nerveux',
        'Sanguin = chaud-humide · lymphatique = froid-humide · bilieux = chaud-sec · nerveux = froid-sec',
        'Sanguin → excès/circulation · lymphatique → lenteur/rétention · bilieux → foie/colère · nerveux → système nerveux/anxiété',
        'Sert à individualiser les conseils (souvent un tempérament mixte)'
      ],
      definitions: [
        { terme: 'Tempérament', def: 'Profil de constitution selon l\'humeur dominante (Hippocrate).' },
        { terme: 'Pléthore', def: 'Excès, surcharge — tendance du sanguin (trop de sang, de richesse alimentaire).' },
        { terme: 'Atrabile', def: 'Autre nom de la bile noire, associée au tempérament nerveux/mélancolique.' }
      ],
      questionIds: []
    },

    {
      id: 'c-sn-autonome',
      categorie: 'Typologies',
      jour: 3,
      titre: 'Système nerveux autonome : vagotonie & sympathicotonie',
      resume: 'Deux profils opposés : le « vague » (repos) et le « sympathique » (action).',
      duree: 6,
      sections: [
        { titre: 'Deux branches', contenu: "Le système nerveux autonome (involontaire) a deux branches **complémentaires** :\n- **Parasympathique** (nerf **vague**) = *repos, digestion, récupération* (« repos-digestion »).\n- **Sympathique** (orthosympathique) = *action, stress, mobilisation de l'énergie* (« combat-fuite »).\nElles fonctionnent en **balance** : quand l'une monte, l'autre baisse." },
        { titre: 'Le profil vagotonique', contenu: "**Dominance parasympathique** : péristaltisme intestinal **augmenté** (intestin réactif), tendance aux **émotions**, à l'**intuition** et à la **créativité** (cerveau droit). « Vague comme la mer » : fluide, intérieur. Allié : un rythme régulier et **tonifiant** (mouvement, froid)." },
        { titre: 'Le profil sympathicotonique', contenu: "**Dominance sympathique** : accélération, **tonus**, orientation vers l'**action**, tendance au **stress** et à la **tension**, pensée **analytique** (cerveau gauche). Allié : la **détente** et la **récupération** (cohérence cardiaque, sommeil)." },
        { titre: "Pourquoi c'est utile", contenu: "Repérer la tendance dominante aide à **individualiser** les conseils : tonifier un vagotonique, apaiser un sympathicotonique. La plupart des personnes sont **mixtes** et peuvent basculer (le stress chronique pousse vers le sympathique)." }
      ],
      pointsCles: [
        'Parasympathique (vague) = repos/digestion ; Sympathique = action/stress',
        'Les deux branches fonctionnent en balance',
        'Vagotonique : intestin réactif, émotions, intuition → tonifier',
        'Sympathicotonique : accélération, stress, analyse → apaiser',
        'Le stress chronique fait basculer vers le sympathique'
      ],
      definitions: [
        { terme: 'Vagotonie', def: 'Dominance du parasympathique (nerf vague).' },
        { terme: 'Sympathicotonie', def: 'Dominance du système sympathique.' },
        { terme: 'Nerf vague', def: 'Principal nerf du parasympathique ; sa stimulation favorise détente et digestion.' }
      ],
      questionIds: []
    },

    {
      id: 'c-acido-basique',
      categorie: 'Nutrition',
      jour: 5,
      titre: "L'équilibre acido-basique",
      resume: 'Aliments acidifiants vs alcalinisants : trouver l\'équilibre.',
      duree: 6,
      sections: [
        { titre: 'Le pH du terrain', contenu: "Le **pH** mesure l'acidité (bas) ou l'alcalinité (haut). Le sang est maintenu très stable (≈ 7,4) par des **systèmes tampons**. En naturopathie, on s'intéresse au pH **des tissus** : une alimentation et un mode de vie trop **acidifiants** au long cours solliciteraient ces tampons et puiseraient dans les **réserves minérales** (d'où fatigue, déminéralisation selon l'approche)." },
        { titre: 'Aliments acidifiants', contenu: "Tendent à acidifier le terrain :\n- **Excès de protéines animales** (viande, charcuterie, fromages)\n- **Sucres raffinés**, sodas, pâtisseries\n- **Café**, alcool, excès de céréales raffinées\n*À noter* : le citron est acide au goût mais **alcalinisant** après métabolisme." },
        { titre: 'Aliments alcalinisants', contenu: "Tendent à alcaliniser (apportent des bases) :\n- **Légumes verts** et colorés, salades\n- **Fruits** (dont banane, châtaigne), **pomme de terre**\n- **Oléagineux** (amandes), eaux riches en **bicarbonates**\nIls fournissent les minéraux (potassium, magnésium, calcium) qui neutralisent les acides." },
        { titre: 'Au-delà de l\'assiette', contenu: "L'équilibre acido-basique dépend aussi du **mode de vie** :\n- Le **stress** et le **manque de sommeil** acidifient.\n- Le **mouvement** et une **respiration** ample aident à éliminer les acides volatils (par les poumons).\n- Les **reins** et les **poumons** sont les émonctoires des acides." },
        { titre: 'En pratique', contenu: "On vise l'**équilibre**, pas l'élimination d'une catégorie : une assiette riche en **végétaux** (l'idée des ⅔ de l'assiette en légumes), une bonne **mastication**, de l'eau, du mouvement et un sommeil suffisant." }
      ],
      pointsCles: [
        'Le sang reste à ≈ 7,4 ; on s\'intéresse au pH des tissus et aux réserves minérales',
        'Acidifiants : protéines animales en excès, sucres raffinés, sodas, café',
        'Alcalinisants : légumes verts, fruits, pomme de terre, oléagineux',
        'Le citron est acide au goût mais alcalinisant après métabolisme',
        'Stress et sédentarité acidifient ; mouvement et respiration aident',
        'Objectif : équilibre, assiette très végétale'
      ],
      definitions: [
        { terme: 'Acidifiant', def: 'Aliment dont le métabolisme tend à acidifier le terrain.' },
        { terme: 'Alcalinisant', def: 'Aliment dont le métabolisme tend à alcaliniser le terrain.' },
        { terme: 'Système tampon', def: 'Mécanisme qui stabilise le pH en neutralisant les excès d\'acides ou de bases.' },
        { terme: 'pH', def: 'Mesure de l\'acidité (bas) ou de l\'alcalinité (haut) d\'un milieu ; neutre = 7.' }
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
        { titre: "Pourquoi l'eau ?", contenu: "L'**hydrothérapie** utilise l'eau (et la température) comme stimulus pour agir sur la **circulation**, le **système nerveux** et la **vitalité**. C'est une technique majeure de naturopathie, douce et accessible (douches, bains, applications, enveloppements)." },
        { titre: 'Le chaud', contenu: "La **chaleur** détend, **vasodilate** (afflux de sang) et apaise. Utile sur les **tensions musculaires**, les spasmes et pour la relaxation.\n- *Exemples* : bain chaud, bouillotte, douche chaude.\n- *Prudence* : la chaleur est plutôt **dévitalisante** si elle est prolongée." },
        { titre: 'Le froid', contenu: "Le **froid** provoque d'abord une **vasoconstriction** (les vaisseaux se resserrent), suivie d'une **vasodilatation réactionnelle** au réchauffement : c'est l'effet **tonifiant** et **revitalisant**.\n- *Exemples* : douche froide, jet, friction.\n- *Prudence* : bref et progressif ; éviter sur terrain très affaibli ou frileux." },
        { titre: "L'alternance (jet écossais)", contenu: "Alterner **chaud puis froid** entraîne une véritable « **gymnastique** » des vaisseaux : on les dilate puis on les resserre. Très **stimulant pour la circulation** et le tonus.\n- *Règle* : toujours **terminer par le froid** pour l'effet tonifiant.\n- Adapter l'intensité à l'état et à la vitalité de la personne." },
        { titre: 'Quand l\'utiliser ?', contenu: "Chaud → détente, douleurs, spasmes. Froid → tonus, circulation, récupération. Alternance → relance circulatoire. Toujours **individualiser** : un terrain dévitalisé tolère mal le froid intense ; un terrain pléthorique en profite davantage." }
      ],
      pointsCles: [
        "L'eau agit sur la circulation, le nerveux et la vitalité",
        'Chaud = détente + vasodilatation (mais dévitalisant si prolongé)',
        'Froid = vasoconstriction puis afflux de sang (tonifiant, revitalisant)',
        'Alternance chaud/froid (jet écossais) = gymnastique vasculaire, finir par le froid',
        "Toujours adapter à la vitalité de la personne"
      ],
      definitions: [
        { terme: 'Vasoconstriction', def: 'Resserrement des vaisseaux sanguins.' },
        { terme: 'Vasodilatation', def: 'Élargissement des vaisseaux sanguins.' },
        { terme: 'Jet écossais', def: 'Alternance de jets chaud et froid pour stimuler la circulation (on termine par le froid).' }
      ],
      questionIds: []
    },

    {
      id: 'c-phytotherapie',
      categorie: 'Phytothérapie',
      jour: 2,
      titre: 'Les bases de la phytothérapie',
      resume: 'Soigner avec les plantes : formes galéniques et notion de totum.',
      duree: 6,
      sections: [
        { titre: 'Le « totum »', contenu: "La phytothérapie utilise la plante **entière** (ou ses parties) : c'est le **totum**, l'ensemble des principes actifs qui agissent en **synergie** — souvent mieux toléré et plus complet qu'une molécule isolée." },
        { titre: 'Les formes galéniques', contenu: "- **Tisane / infusion** : parties fragiles (fleurs, feuilles), eau frémissante.\n- **Décoction** : parties dures (racines, écorces), ébullition.\n- **Macération** : à froid (mucilages).\n- **Teinture-mère (TM)** : macération **alcoolique** (concentré, conservation).\n- **EPS / extraits standardisés**, **gélules de poudre**, **macérats de bourgeons** (gemmothérapie), **huiles essentielles** (aromathérapie)." },
        { titre: 'Choisir selon la plante', contenu: "On adapte la forme à la **partie utilisée** et au **principe actif** recherché : fleurs/feuilles → infusion ; racines/écorces → décoction ; principes peu solubles dans l'eau → alcool (TM). Respecter les **posologies** (ex : gemmothérapie ≈ 3 × 5-15 gouttes/jour)." },
        { titre: 'Prudence', contenu: "« Naturel » ne veut pas dire « sans risque » : **interactions médicamenteuses** (ex : millepertuis), **grossesse/allaitement**, **terrain** allergique, dosage. Toujours se renseigner et **orienter vers un professionnel** si besoin." }
      ],
      pointsCles: [
        'Totum = plante entière en synergie (vs molécule isolée)',
        'Infusion (parties fragiles) vs décoction (parties dures)',
        'Teinture-mère = macération alcoolique ; macérats de bourgeons = gemmothérapie',
        'Adapter la forme à la partie de plante et au principe actif',
        'Naturel ≠ sans risque : interactions, grossesse, terrain'
      ],
      definitions: [
        { terme: 'Totum', def: "Ensemble des composants d'une plante agissant en synergie." },
        { terme: 'Teinture-mère', def: 'Extrait obtenu par macération de la plante dans l\'alcool.' },
        { terme: 'Décoction', def: 'Extraction par ébullition (racines, écorces).' },
        { terme: 'Infusion', def: 'Extraction en versant de l\'eau chaude sur les parties fragiles (fleurs, feuilles).' }
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
        { titre: 'Une HE = un bouquet de molécules', contenu: "Une **huile essentielle** est l'extrait **volatil** et très **concentré** d'une plante aromatique (par distillation à la vapeur, ou expression pour les agrumes). On la lit par sa **famille biochimique** dominante, qui oriente ses propriétés… et sa **dangerosité**." },
        { titre: 'Les familles biochimiques', contenu: "- **Monoterpènes** : toniques, antiseptiques (agrumes, pin) — peuvent être irritants.\n- **Esters** : apaisants, **antispasmodiques** (lavande vraie, petit grain) — bien tolérés.\n- **Alcools (monoterpénols)** : anti-infectieux **doux** et sûrs (tea tree, thym à linalol).\n- **Phénols** : anti-infectieux **puissants** mais **dermocaustiques/hépatotoxiques** (origan, thym à thymol).\n- **Cétones** : cicatrisantes, mucolytiques mais **neurotoxiques/abortives** à dose élevée (menthe, romarin à camphre).\n- **Aldéhydes** : calmants, anti-inflammatoires mais irritants cutanés (citronnelle)." },
        { titre: 'Voies d\'utilisation', contenu: "Principales voies : **cutanée** (diluée dans une **huile végétale**), **olfactive/diffusion**, et **orale** (réservée à un usage encadré). Le choix dépend de l'effet recherché et de la sécurité de l'HE." },
        { titre: 'Sécurité', contenu: "**Jamais d'HE pure** sur la peau (sauf exceptions comme la lavande), toujours **diluer**. Prudence (voire contre-indication) chez l'**enfant**, la **femme enceinte/allaitante**, l'**épileptique** et l'asthmatique. Attention aux HE **photosensibilisantes** (agrumes → pas de soleil après application)." }
      ],
      pointsCles: [
        'Une HE se lit par sa famille biochimique dominante',
        'Esters = apaisants ; alcools = anti-infectieux doux',
        'Phénols = anti-infectieux puissants mais dermocaustiques/hépatotoxiques',
        'Cétones = mucolytiques/cicatrisantes mais neurotoxiques à dose élevée',
        'Toujours diluer ; prudence enfant, grossesse, épilepsie ; agrumes photosensibilisants'
      ],
      definitions: [
        { terme: 'Huile essentielle', def: 'Extrait aromatique volatil et très concentré d\'une plante.' },
        { terme: 'Phénols (HE)', def: 'Molécules anti-infectieuses puissantes, mais agressives pour la peau et le foie.' },
        { terme: 'Cétones (HE)', def: 'Molécules mucolytiques/cicatrisantes, neurotoxiques et abortives à doses élevées.' },
        { terme: 'Esters (HE)', def: 'Molécules apaisantes et antispasmodiques, bien tolérées (ex : lavande vraie).' }
      ],
      questionIds: []
    },

    {
      id: 'c-micronutrition',
      categorie: 'Nutrition',
      jour: 5,
      titre: 'Micronutrition : vitamines & minéraux clés',
      resume: 'Les micronutriments qui reviennent le plus souvent en accompagnement.',
      duree: 6,
      sections: [
        { titre: 'Macro vs micronutriments', contenu: "Les **macronutriments** (glucides, lipides, protéines) fournissent l'énergie. Les **micronutriments** (vitamines, minéraux, oligo-éléments) n'apportent pas d'énergie mais sont **indispensables** comme **cofacteurs** de milliers de réactions. Ils agissent en **synergie** (ex : vitamine D + K2 + magnésium + calcium pour l'os)." },
        { titre: 'Vitamines clés', contenu: "- **Vitamine D** (immunité, os ; synthétisée via le **soleil** ; D3 > D2).\n- **Vitamines B** (énergie, système nerveux ; B1 = sucres, B6 = neurotransmetteurs, B9 = grossesse, B12).\n- **Vitamine C** (antioxydant, immunité, aide l'absorption du **fer**).\n- **Vitamine E** (antioxydant des membranes).\n- **Vitamine F** = acides gras essentiels (peau, immunité)." },
        { titre: 'Minéraux & oligo-éléments', contenu: "- **Magnésium** (stress, muscles, sommeil ; >300 réactions ; déficit fréquent).\n- **Fer** (transport de l'O₂ ; jamais supplémenté **sans bilan** car pro-oxydant en excès).\n- **Zinc** (immunité, peau, cicatrisation).\n- **Iode** (thyroïde), **sélénium** (antioxydant, thyroïde), **chrome** (glycémie, fringales)." },
        { titre: 'Logique naturopathique', contenu: "On vise d'abord l'**alimentation** (assiette dense en nutriments, peu transformée), la **complémentation** venant en **soutien ciblé** — idéalement sur signes ou bilan — pas en automatique. La **biodisponibilité** (forme, cofacteurs) compte autant que la dose." }
      ],
      pointsCles: [
        'Micronutriments = cofacteurs indispensables, agissent en synergie',
        'Vitamine D : immunité + os (soleil ; D3 > D2)',
        'Magnésium : stress, muscles, sommeil (déficit fréquent)',
        'Fer : jamais sans bilan (pro-oxydant en excès)',
        'Alimentation d\'abord, complément en soutien ciblé'
      ],
      definitions: [
        { terme: 'Micronutriment', def: 'Nutriment nécessaire en petite quantité (vitamines, minéraux, oligo-éléments).' },
        { terme: 'Antioxydant', def: "Molécule qui neutralise les radicaux libres (vit. C, E, zinc…)." },
        { terme: 'Biodisponibilité', def: "Capacité d'un nutriment à être réellement absorbé et utilisé par l'organisme." }
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
        { titre: 'L\'horloge interne', contenu: "Le sommeil est piloté par un rythme **circadien** (~24 h). La **mélatonine** (hormone du sommeil) est sécrétée le soir dès la **baisse de lumière** (vers 18h), avec un pic vers 2-3h du matin. La lumière, surtout la **bleue des écrans**, la freine et retarde l'endormissement." },
        { titre: 'De la sérotonine à la mélatonine', contenu: "La mélatonine est fabriquée par la **glande pinéale** à partir de la **sérotonine**, elle-même issue du **tryptophane**. Un bon statut en tryptophane (et en cofacteurs : magnésium, B6) soutient donc aussi le sommeil." },
        { titre: 'Le train du sommeil', contenu: "Le sommeil arrive par **cycles** de ~90 min (sommeil léger → profond → paradoxal). Rater son « train » (signaux : **bâillements, yeux qui piquent**, frissons) oblige à attendre le cycle suivant (~90 min)." },
        { titre: 'Bonnes habitudes', contenu: "- **Lumière baissée** et **écrans réduits** le soir.\n- **Repas léger**, pas trop tardif ; limiter café/excitants l'après-midi.\n- **Régularité** des horaires de coucher/lever.\n- Chambre **fraîche, sombre et calme**.\n- La **cohérence cardiaque** ou une tisane (valériane, passiflore) peuvent aider à l'endormissement." }
      ],
      pointsCles: [
        'Mélatonine = hormone du soir (dès ~18h), freinée par la lumière',
        'Mélatonine ← sérotonine ← tryptophane (glande pinéale)',
        'Cycles de ~90 min : ne pas rater son « train »',
        'Obscurité, régularité, écrans réduits, chambre fraîche'
      ],
      definitions: [
        { terme: 'Mélatonine', def: 'Hormone du sommeil sécrétée le soir dans l\'obscurité, dérivée de la sérotonine.' },
        { terme: 'Rythme circadien', def: 'Horloge biologique sur ~24 h réglant veille et sommeil.' },
        { terme: 'Glande pinéale', def: 'Glande (épiphyse) qui sécrète la mélatonine à partir de la sérotonine.' }
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
        { titre: 'Stress aigu vs chronique', contenu: "Le stress **aigu** est utile (mobilisation immédiate de l'énergie, fuite/combat). Le stress **chronique** épuise : le **sympathique** reste en surrégime, le **cortisol** est élevé en continu, et cela pèse sur la **digestion**, le **sommeil**, l'**immunité** et l'humeur." },
        { titre: 'Les 3 phases (Selye)', contenu: "Le syndrome général d'adaptation décrit 3 phases :\n1. **Alarme** : mobilisation (adrénaline).\n2. **Résistance** : l'organisme tient (cortisol soutenu).\n3. **Épuisement** : les surrénales « lâchent » → c'est le terrain du burn-out. Le but est d'intervenir avant cette phase." },
        { titre: 'La cohérence cardiaque', contenu: "Respirer **6 respirations par minute** (≈ 5 s d'inspiration, 5 s d'expiration) pendant ~5 minutes équilibre le système nerveux autonome (stimule le **nerf vague**, parasympathique). Méthode populaire : **365** → **3** fois par jour, **6** respirations/min, **5** minutes." },
        { titre: 'Autres leviers', contenu: "**Mouvement** (décharge la tension), **nature**, **sommeil**, **lien social**, **magnésium** (très consommé par le stress) et parfois **plantes adaptogènes** (rhodiola, ashwagandha, ginseng) — toujours en complément d'un accompagnement adapté." }
      ],
      pointsCles: [
        'Stress chronique = sympathique en surrégime, cortisol élevé',
        'Selye : alarme → résistance → épuisement (burn-out)',
        'Cohérence cardiaque : 6 respirations/min, 5 min',
        'Méthode 365 : 3×/jour ; magnésium + adaptogènes en appui'
      ],
      definitions: [
        { terme: 'Cohérence cardiaque', def: 'Technique respiratoire (~6/min) qui équilibre le système nerveux autonome.' },
        { terme: 'Cortisol', def: 'Hormone du stress, élevée en cas de stress chronique.' },
        { terme: 'Adaptogène', def: "Plante qui aide l'organisme à mieux s'adapter au stress et à récupérer (rhodiola, ashwagandha, ginseng)." }
      ],
      questionIds: []
    },

    {
      id: 'c-jeune-monodiete',
      categorie: 'Nutrition',
      jour: 6,
      titre: 'Jeûne & monodiète',
      resume: 'Mettre la digestion au repos : principes et précautions.',
      duree: 5,
      sections: [
        { titre: 'L\'idée', contenu: "Réduire ou suspendre l'apport alimentaire met le système digestif **au repos** : l'énergie habituellement consacrée à la digestion serait redirigée vers le **nettoyage** (travail des émonctoires) et la réparation. La **monodiète** = un seul aliment (ex : pommes, raisin, riz) sur une courte période." },
        { titre: 'Les formes', contenu: "- **Jeûne intermittent** : fenêtre alimentaire réduite (ex : 16/8).\n- **Monodiète** d'un repas, d'une journée ou de quelques jours.\n- **Jeûne hydrique** (eau seule) ou **modifié** (bouillons, jus) — réservé à un cadre accompagné.\nOn adapte toujours à la **vitalité** : un terrain dévitalisé tolère mal le jeûne (il faut d'abord revitaliser)." },
        { titre: 'Bénéfices recherchés', contenu: "Repos digestif, allègement de la **toxémie**, soutien de l'élimination, parfois meilleure sensibilité à la satiété. C'est une **cure de désintoxication** parmi d'autres — pas une fin en soi." },
        { titre: 'Précautions', contenu: "**Déconseillé sans accompagnement** chez les personnes fragiles : dénutrition, **diabète**, grossesse/allaitement, troubles du comportement alimentaire, certains traitements. La **reprise alimentaire** doit être **progressive** (réintroduction douce). En cas de doute, avis médical." }
      ],
      pointsCles: [
        'Jeûne/monodiète = repos digestif + soutien des émonctoires',
        'Formes : jeûne intermittent (16/8), monodiète, jeûne accompagné',
        'Toujours adapter à la vitalité (dévitalisé = revitaliser d\'abord)',
        'Précautions : terrains fragiles ; reprise alimentaire progressive'
      ],
      definitions: [
        { terme: 'Monodiète', def: 'Alimentation réduite à un seul aliment sur une courte durée.' },
        { terme: 'Jeûne intermittent', def: 'Alternance de périodes de jeûne et de prise alimentaire (ex : 16/8).' },
        { terme: 'Toxémie', def: "Surcharge de l'organisme en déchets/toxines, que les cures cherchent à alléger." }
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
          explication: "L'alchémille est progestérone-like (comme le gattilier et l'igname/yam). ⚠️ Le houblon, lui, est ŒSTROGÈNE-like (phyto-œstrogène) — comme la sauge et le trèfle rouge — donc contre-indiqué en cas de cancer hormono-dépendant."
        },
        {
          question: "Quel signe serait ATYPIQUE et devrait faire consulter ?",
          options: ['Une perte de poids importante et inexpliquée', 'Bouffées de chaleur', 'Troubles du sommeil', 'Irritabilité prémenstruelle'],
          bonne: 0,
          explication: "La ménopause s'accompagne plutôt d'une PRISE de poids. Une perte de poids marquée et inexpliquée est atypique → orienter vers le médecin."
        }
      ],
      synthese: "Pistes : soutenir la progestérone (alchémille, gattilier), magnésium et plantes du stress, hygiène de vie. ⚠️ Éviter les plantes œstrogène-like (sauge, trèfle rouge, houblon) en cas de cancer hormono-dépendant. Tout symptôme atypique (perte de poids, saignements anormaux) impose un avis médical."
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
    },

    {
      id: 'cas-insomnie',
      titre: 'Insomnie & stress',
      icon: 'clock',
      profil: { nom: 'Karim', age: 42, motif: "Endormissement difficile, ruminations, réveils nocturnes" },
      contexte: "Karim travaille tard sur écran, boit du café l'après-midi et se sent sous pression. Aucun trouble médical du sommeil diagnostiqué.",
      etapes: [
        {
          question: "Quel précurseur soutenir pour fabriquer sérotonine puis mélatonine ?",
          options: ['Le tryptophane (→ 5-HTP → sérotonine → mélatonine)', 'La tyrosine', 'La méthionine', 'La glutamine'],
          bonne: 0,
          explication: "Voie du sommeil : tryptophane → 5-HTP → sérotonine → mélatonine. La tyrosine, elle, mène à la dopamine (motivation), pas au sommeil."
        },
        {
          question: "Quelle plante proposer pour favoriser l'endormissement ?",
          options: ['Valériane / passiflore', 'Pissenlit', 'Échinacée', 'Romarin'],
          bonne: 0,
          explication: "Valériane et passiflore sont calmantes et favorisent le sommeil. Pissenlit = foie, échinacée = immunité, romarin = tonique."
        },
        {
          question: "Quelle habitude corriger en priorité le soir ?",
          options: ['Les écrans tardifs (la lumière bleue bloque la mélatonine)', 'Manger des légumes', "Boire de l'eau", 'Lire un livre papier'],
          bonne: 0,
          explication: "La mélatonine se fabrique avec la baisse de lumière (dès ~18h). Les écrans le soir freinent sa production. Couper les écrans et tamiser la lumière aident l'endormissement."
        }
      ],
      synthese: "Pistes : tryptophane/magnésium, valériane-passiflore, cohérence cardiaque, couper le café après midi et les écrans le soir, lumière tamisée. Si l'insomnie persiste, consulter."
    },

    {
      id: 'cas-glycemie',
      titre: 'Surpoids & fringales sucrées',
      icon: 'activity',
      profil: { nom: 'Nadia', age: 50, motif: "Surpoids abdominal, fringales de sucre, coup de barre après les repas" },
      contexte: "Nadia grignote sucré dans la journée et bouge peu. Bilan médical sans diabète déclaré.",
      etapes: [
        {
          question: "Quels micronutriments aident à réduire les compulsions sucrées ?",
          options: ['Chrome, magnésium, vitamine C', 'Vitamines A, D, E', 'Sodium et potassium', 'Fer et cuivre'],
          bonne: 0,
          explication: "Le chrome améliore la sensibilité à l'insuline, le magnésium stabilise la glycémie et réduit les envies liées au stress, la vitamine C est anti-stress."
        },
        {
          question: "Quels aliments privilégier pour stabiliser la glycémie ?",
          options: ['Légumes, crudités et fibres (index glycémique bas)', 'Jus de fruits et miel', 'Pain blanc et riz blanc', 'Charcuteries'],
          bonne: 0,
          explication: "Les fibres ralentissent l'absorption du glucose (IG bas) et évitent les pics/chutes responsables des fringales. Les sucres rapides font l'inverse."
        },
        {
          question: "Quel pilier d'hygiène de vie ajouter ?",
          options: ['Une activité physique régulière', 'Sauter le petit-déjeuner', 'Plus de café', 'Un régime très restrictif'],
          bonne: 0,
          explication: "Le mouvement améliore la sensibilité à l'insuline et la composition corporelle. Les régimes très restrictifs entretiennent au contraire les fringales."
        }
      ],
      synthese: "Pistes : chrome/magnésium, repas à IG bas riches en fibres, protéines à chaque repas, activité physique, sommeil. Orienter vers un médecin pour le suivi métabolique."
    },

    {
      id: 'cas-rhumatismes',
      titre: 'Douleurs articulaires inflammatoires',
      icon: 'flame',
      profil: { nom: 'Robert', age: 63, motif: "Douleurs aux genoux et aux mains, raideur le matin" },
      contexte: "Robert a des douleurs articulaires inflammatoires (raideur matinale). Suivi médical en place.",
      etapes: [
        {
          question: "Quel acide gras aide à réduire l'inflammation articulaire ?",
          options: ['Oméga 3 (EPA/DHA)', 'Oméga 6 en excès', 'Graisses saturées', 'Aucun gras'],
          bonne: 0,
          explication: "Les oméga 3 (EPA/DHA) sont anti-inflammatoires (prostaglandines de série 3). Un excès d'oméga 6 est au contraire pro-inflammatoire."
        },
        {
          question: "Quelles plantes pour l'inflammation et les rhumatismes ?",
          options: ['Gingembre et cassis', 'Valériane et mélisse', 'Artichaut et radis noir', 'Thym et eucalyptus'],
          bonne: 0,
          explication: "Gingembre (gingérols anti-inflammatoires) et cassis (flavonoïdes, soutien des surrénales, anti-rhumatismal) sont les plantes retenues ici."
        },
        {
          question: "Quel terrain rééquilibrer en parallèle ?",
          options: ["L'équilibre acido-basique (réduire les acidifiants)", 'Augmenter le sel', "Supprimer toute eau", 'Plus de sucre'],
          bonne: 0,
          explication: "Un terrain acidifié favorise l'inflammation et la déminéralisation. Réduire les acidifiants (sucre, excès de protéines animales) et apporter des bases (légumes) soutient les articulations."
        }
      ],
      synthese: "Pistes : oméga 3, gingembre/cassis, rééquilibrage acido-basique, mouvement doux. En complément du suivi rhumatologique."
    },

    {
      id: 'cas-orl-enfant',
      titre: 'Infections ORL à répétition (enfant)',
      icon: 'sprout',
      profil: { nom: 'Léna', age: 7, motif: "Rhinos et otites à répétition l'hiver, après plusieurs antibiotiques" },
      contexte: "La maman de Léna consulte : enchaînements d'infections ORL et de cures d'antibiotiques. Terrain fragilisé.",
      etapes: [
        {
          question: "Que faut-il restaurer après des antibiotiques répétés ?",
          options: ['Le microbiote (probiotiques, fibres)', 'Le taux de sodium', 'La masse grasse', 'Rien de particulier'],
          bonne: 0,
          explication: "Les antibiotiques appauvrissent le microbiote, or une grande part de l'immunité s'y joue. Le restaurer (probiotiques, fibres/prébiotiques) soutient les défenses."
        },
        {
          question: "Quel apport soutient l'immunité ?",
          options: ['Vitamine D + zinc', 'Sodium', 'Calcium seul', 'Vitamine K'],
          bonne: 0,
          explication: "Vitamine D et zinc sont des soutiens classiques de l'immunité, surtout en hiver. (Posologies enfant à adapter avec un professionnel.)"
        },
        {
          question: "Quelle erreur alimentaire éviter ?",
          options: ["L'excès de sucres raffinés (baisse l'immunité, nourrit candida)", 'Manger des légumes', 'Dormir suffisamment', "Boire de l'eau"],
          bonne: 0,
          explication: "L'excès de sucre raffiné abaisse l'efficacité immunitaire et favorise les déséquilibres (candida). Le réduire aide le terrain."
        }
      ],
      synthese: "Pistes : restaurer le microbiote, vitamine D + zinc, réduire les sucres raffinés, sommeil et aération. Chez l'enfant, TOUJOURS en lien avec le pédiatre."
    },

    {
      id: 'cas-constipation',
      titre: 'Constipation & transit paresseux',
      icon: 'droplet',
      profil: { nom: 'Camille', age: 34, motif: "Constipation, ballonnements en fin de journée, transit lent" },
      contexte: "Camille boit peu, mange peu de fibres et bouge peu. Pas de cause médicale identifiée.",
      etapes: [
        {
          question: "Quel processus se produit quand les selles stagnent trop longtemps ?",
          options: ['La putréfaction : des toxines sont réabsorbées → soutenir le transit', 'La fermentation, bénéfique ici', 'Rien à signaler', 'Un excès de fibres'],
          bonne: 0,
          explication: "Quand les selles stagnent, les produits de putréfaction des protéines sont réabsorbés et chargent le foie. Relancer le transit limite cette auto-intoxication."
        },
        {
          question: "Quels apports favoriser ?",
          options: ['Fibres + hydratation + prébiotiques', "Moins d'eau", 'Pain blanc', 'Charcuteries'],
          bonne: 0,
          explication: "Fibres (légumes, fruits), eau et prébiotiques (artichaut, oignon, chicorée) augmentent le bol fécal et nourrissent le microbiote → meilleur transit."
        },
        {
          question: "Quel soutien complémentaire proposer ?",
          options: ['Activité physique + magnésium (effet sur le transit)', 'Valériane', 'Échinacée', 'Thym'],
          bonne: 0,
          explication: "Le mouvement stimule le péristaltisme et le magnésium a un effet osmotique/relaxant favorable au transit. Valériane = sommeil, échinacée = immunité."
        }
      ],
      synthese: "Pistes : fibres + eau + prébiotiques, magnésium, activité physique, horaires réguliers aux toilettes. Si la constipation est récente ou résistante, consulter."
    },

    {
      id: 'cas-acne',
      titre: 'Acné & peau grasse',
      icon: 'droplet',
      profil: { nom: 'Inès', age: 19, motif: "Acné inflammatoire, peau grasse" },
      contexte: "Inès a une acné qui s'aggrave avec le stress et une alimentation sucrée. Suivi dermato en place.",
      etapes: [
        {
          question: "Quel émonctoire « de secours » est sollicité quand foie et intestins sont surchargés ?",
          options: ['La peau', 'Les poumons seuls', "L'estomac", 'Le cœur'],
          bonne: 0,
          explication: "La peau est un émonctoire de secours : quand les voies hépato-intestinales sont débordées, elle prend le relais (acné, eczéma). Soutenir le foie et l'intestin soulage souvent la peau."
        },
        {
          question: "Quelle erreur alimentaire aggrave le plus l'acné ?",
          options: ['Excès de sucres rapides et de laitages', 'Manger des légumes', "Boire de l'eau", 'Consommer des oméga 3'],
          bonne: 0,
          explication: "Les sucres rapides (pics d'insuline) et les laitages stimulent la production de sébum et l'inflammation. Les réduire améliore souvent le terrain cutané."
        },
        {
          question: "Quel apport soutient une peau plus saine ?",
          options: ['Zinc + oméga 3', 'Sodium', 'Sucre raffiné', 'Café'],
          bonne: 0,
          explication: "Le zinc régule le sébum et a une action anti-inflammatoire ; les oméga 3 apaisent l'inflammation. Un duo cohérent pour la peau."
        }
      ],
      synthese: "Pistes : soutenir foie/intestin, réduire sucres rapides et laitages, zinc + oméga 3, gestion du stress. En complément du suivi dermatologique."
    },

    {
      id: 'cas-menopause',
      titre: 'Ménopause confirmée & os',
      icon: 'flower',
      profil: { nom: 'Brigitte', age: 58, motif: "Bouffées de chaleur, sécheresse, inquiétude pour ses os" },
      contexte: "Brigitte est ménopausée depuis 5 ans. Elle s'inquiète de l'ostéoporose. Suivi gynéco à jour.",
      etapes: [
        {
          question: "Quel risque osseux la chute des œstrogènes favorise-t-elle ?",
          options: ['La déminéralisation / ostéoporose', "Une prise de masse osseuse", 'Aucun risque', 'Un excès de calcium'],
          bonne: 0,
          explication: "Les œstrogènes protègent l'os ; leur chute après la ménopause accélère la perte osseuse (ostéoporose). La prévention nutritionnelle et l'activité physique sont clés."
        },
        {
          question: "Quels apports soutiennent le capital osseux ?",
          options: ['Calcium + vitamine D + vitamine K2 + magnésium', 'Sodium seul', 'Sucre', 'Café'],
          bonne: 0,
          explication: "Vitamine D (absorption du calcium), K2 (fixation du calcium sur l'os), magnésium et calcium forment le quatuor osseux. La marche/le renforcement musculaire complètent."
        },
        {
          question: "Quelle plante du terrain ménopausique (œstrogène-like) ?",
          options: ['Sauge / trèfle rouge', 'Alchémille seule', 'Valériane', 'Échinacée'],
          bonne: 0,
          explication: "La sauge, le trèfle rouge et le houblon sont œstrogène-like (utiles sur les bouffées, mais ⚠️ contre-indiqués si cancer hormono-dépendant). À distinguer de l'alchémille et du gattilier, qui sont progestérone-like."
        }
      ],
      synthese: "Pistes : calcium/D/K2/magnésium, activité physique en charge, sauge/trèfle rouge sur les bouffées, hygiène de vie. Suivi médical de l'os indispensable."
    },

    {
      id: 'cas-burnout',
      titre: 'Épuisement & stress chronique',
      icon: 'flame',
      profil: { nom: 'Thomas', age: 38, motif: "Épuisement, irritabilité, sommeil non réparateur" },
      contexte: "Thomas est en surcharge professionnelle depuis des mois : fatigue profonde, tension permanente. Il a consulté son médecin.",
      etapes: [
        {
          question: "Le stress chronique épuise surtout quel axe hormonal ?",
          options: ["L'axe surrénalien (cortisol)", 'Le pancréas seul', 'La thyroïde uniquement', 'Aucun'],
          bonne: 0,
          explication: "Le stress prolongé sollicite puis épuise les surrénales (cortisol) : c'est le terrain de l'épuisement. Soutenir cet axe et réduire les stresseurs est prioritaire."
        },
        {
          question: "Quelles plantes adaptogènes soutiennent l'organisme face au stress ?",
          options: ['Rhodiola, ashwagandha, ginseng', 'Pissenlit, artichaut', 'Plantain, cassis', 'Échinacée'],
          bonne: 0,
          explication: "Les adaptogènes (rhodiola, ashwagandha, ginseng) aident l'organisme à mieux s'adapter au stress et à récupérer. Pissenlit/artichaut = foie, plantain/cassis = allergie."
        },
        {
          question: "Quel minéral anti-stress prioriser ?",
          options: ['Magnésium', 'Sodium', 'Calcium seul', 'Fer'],
          bonne: 0,
          explication: "Le magnésium est massivement consommé par le stress et participe à la détente nerveuse et musculaire. Sa supplémentation est souvent utile."
        }
      ],
      synthese: "Pistes : magnésium, plantes adaptogènes, sommeil et récupération, réduction des stresseurs, cohérence cardiaque. Le burn-out nécessite un accompagnement médical."
    },

    {
      id: 'cas-sportif',
      titre: 'Récupération du sportif',
      icon: 'activity',
      profil: { nom: 'Yannis', age: 25, motif: "Courbatures, fatigue et crampes après des entraînements intenses" },
      contexte: "Yannis s'entraîne dur et récupère mal (crampes, courbatures persistantes). Pas de souci médical.",
      etapes: [
        {
          question: "Que faut-il reconstituer juste après l'effort (pertes par la sueur) ?",
          options: ['Le capital hydrique (eau + sel / électrolytes)', 'Rien de particulier', 'Plus de café', 'Du sucre uniquement'],
          bonne: 0,
          explication: "La sueur fait perdre eau et sodium : se réhydrater et resaler reconstitue le capital hydrique et limite crampes et fatigue."
        },
        {
          question: "Quel duo de vitamines recycle l'acide lactique et élimine les protéines dégradées ?",
          options: ['B1 et B6', 'A et D', 'C et K', 'E et B12'],
          bonne: 0,
          explication: "La B1 (thiamine) intervient dans le recyclage de l'acide lactique et la B6 dans l'élimination des protéines musculaires endommagées."
        },
        {
          question: "Quels apports pour reconstruire le muscle et les réserves ?",
          options: ['Protéines + glucides', 'Graisses trans', 'Sel uniquement', 'Jeûne complet'],
          bonne: 0,
          explication: "Les protéines réparent les fibres musculaires et les glucides reconstituent le glycogène. Le duo protéines + glucides est la base de la récupération."
        }
      ],
      synthese: "Pistes : réhydratation + électrolytes, magnésium, B1/B6, protéines + glucides après l'effort, sommeil. Adapter les charges d'entraînement."
    }
  ],

  // ═══════════════════════════════════════════════════════════════
  //  FICHES DE RÉVISION — par niveau de complexité
  //  niveau : 1 = bases · 2 = intermédiaire · 3 = avancé
  //  { niveau, theme, recto, verso }  — étudiées en recto/verso (fiches.html)
  // ═══════════════════════════════════════════════════════════════
  fiches: [
    // ── Niveau 1 : bases / définitions ──────────────────────────
    { niveau: 1, theme: 'Concepts', recto: "Qu'est-ce que la naturopathie ?", verso: "Une approche de santé naturelle qui stimule la force vitale et la capacité d'auto-guérison de l'organisme, via l'hygiène de vie (alimentation, exercice, gestion du stress, sommeil…)." },
    { niveau: 1, theme: 'Concepts', recto: "Les 5 émonctoires", verso: "Foie, reins, intestins, poumons, peau — les portes de sortie des déchets de l'organisme." },
    { niveau: 1, theme: 'Concepts', recto: "L'homéostasie", verso: "La capacité de l'organisme à maintenir son équilibre interne (température, pH, eau, minéraux) de façon dynamique et permanente." },
    { niveau: 1, theme: 'Concepts', recto: "Le vitalisme", verso: "Le principe selon lequel l'organisme possède une force vitale (énergie) capable de s'auto-réguler et de s'auto-réparer." },
    { niveau: 1, theme: 'Concepts', recto: "Le « terrain »", verso: "L'ensemble des caractéristiques (héréditaires + mode de vie) qui déterminent la santé d'une personne et sa prédisposition aux déséquilibres." },
    { niveau: 1, theme: 'Techniques', recto: "Phytothérapie ?", verso: "Le soin par les plantes médicinales (tisanes, teintures, extraits…)." },
    { niveau: 1, theme: 'Techniques', recto: "Aromathérapie ?", verso: "Le soin par les huiles essentielles (concentrés aromatiques de plantes)." },
    { niveau: 1, theme: 'Techniques', recto: "Gemmothérapie ?", verso: "Le soin par les bourgeons et jeunes pousses, sous forme de macérats glycérinés." },
    { niveau: 1, theme: 'Tempéraments', recto: "Les 4 tempéraments d'Hippocrate", verso: "Sanguin, lymphatique (flegmatique), bilieux (colérique), nerveux (mélancolique)." },
    { niveau: 1, theme: 'Phytothérapie', recto: "Une plante « carminative » sert à…", verso: "Réduire les ballonnements et expulser les gaz intestinaux. Ex : fenouil, anis, carvi, gingembre." },
    { niveau: 1, theme: 'Cures', recto: "La cure de revitalisation", verso: "Recharge l'organisme en vitamines et minéraux et comble les carences. Elle reconstruit (elle ne draine pas)." },
    { niveau: 1, theme: 'Microbiote', recto: "Probiotique ?", verso: "Un micro-organisme vivant bénéfique pour la flore intestinale (ex : lactobacilles, bifidobactéries)." },
    { niveau: 1, theme: 'Microbiote', recto: "Prébiotique ?", verso: "Une fibre non digestible qui sert de nourriture aux bonnes bactéries du côlon (ex : inuline, FOS)." },
    { niveau: 1, theme: 'Concepts', recto: "L'estomac est-il un émonctoire ?", verso: "Non : l'estomac est un organe de DIGESTION. Les émonctoires (foie, reins, intestins, poumons, peau) éliminent les déchets." },

    // ── Niveau 2 : intermédiaire / mécanismes ───────────────────
    { niveau: 2, theme: 'Cures', recto: "Les 3 cures de Marchesseau (dans l'ordre)", verso: "1. Désintoxication (drainage) → 2. Revitalisation (recharge) → 3. Stabilisation. On nettoie avant de recharger." },
    { niveau: 2, theme: 'Phytothérapie', recto: "Cholagogue vs cholérétique", verso: "Cholérétique = stimule la PRODUCTION de bile par le foie. Cholagogue = favorise son ÉVACUATION de la vésicule. ⚠️ Contre-indiqués en cas de lithiase biliaire (calculs) : risque de mobiliser un calcul et de provoquer une obstruction." },
    { niveau: 2, theme: 'Nutrition', recto: "Oméga 3, 6, 9 ?", verso: "Oméga 9 = mono-insaturé (huile d'olive). Oméga 3 et 6 = poly-insaturés ESSENTIELS. Viser un ratio oméga 6/oméga 3 proche de 4/1." },
    { niveau: 2, theme: 'Système nerveux', recto: "Vagotonie vs sympathicotonie", verso: "Vagotonique = dominance parasympathique (péristaltisme ↑, intuition, cerveau droit). Sympathicotonique = dominance orthosympathique (action, tension)." },
    { niveau: 2, theme: 'Micronutrition', recto: "Vitamine D3 vs D2", verso: "La D3 (cholécalciférol, animale/soleil) est mieux biodisponible que la D2 (végétale). Elle favorise l'absorption du calcium." },
    { niveau: 2, theme: 'Terrain', recto: "Acides et colles : par où s'éliminent-ils ?", verso: "Déchets ACIDES → reins + poumons. Déchets COLLES (colloïdaux) → foie + gros intestin." },
    { niveau: 2, theme: 'Phytothérapie', recto: "Le trio hépatique", verso: "Artichaut, radis noir, pissenlit — stimulent le foie et la vésicule (cholagogues/cholérétiques)." },
    { niveau: 2, theme: 'Gynécologie', recto: "Hyperœstrogénie « relative »", verso: "Les œstrogènes sont en excès PAR RAPPORT à la progestérone (pas forcément élevés en absolu). Survient à la puberté et en préménopause." },
    { niveau: 2, theme: 'Gynécologie', recto: "Rôles de la progestérone", verso: "Sécrétée par le corps jaune (phase lutéale), elle AUGMENTE la température basale et favorise le maintien de la grossesse." },
    { niveau: 2, theme: 'Microbiote', recto: "Fermentation vs putréfaction", verso: "Fermentation (sucres) = acides organiques non néfastes. Putréfaction (protéines) = toxines réabsorbées surtout si constipation." },
    { niveau: 2, theme: 'Phytochimie', recto: "Effet des furocoumarines", verso: "Photosensibilisantes : réaction cutanée au soleil (bergamote, céleri, angélique). Prudence en été." },
    { niveau: 2, theme: 'Nutrition', recto: "Acide aminé limitant", verso: "Légumineuses pauvres en méthionine, céréales pauvres en lysine. Les associer (riz + lentilles) = protéines complètes." },
    { niveau: 2, theme: 'Régimes', recto: "Méthode Kousmine : cuisson", verso: "Cuisson douce, inférieure à 100°C, pour préserver enzymes et vitamines thermosensibles." },
    { niveau: 2, theme: 'Micronutrition', recto: "Fer : précaution clé", verso: "Ne jamais supplémenter sans bilan sanguin : en excès il est pro-oxydant (réaction de Fenton) et hépatotoxique." },

    // ── Niveau 3 : avancé / clinique ────────────────────────────
    { niveau: 3, theme: 'Neuro', recto: "Précurseur de la sérotonine (voie complète)", verso: "Tryptophane → 5-HTP → sérotonine → mélatonine (sommeil). À ne pas confondre avec la voie de la dopamine." },
    { niveau: 3, theme: 'Neuro', recto: "Précurseur de la dopamine + plante source", verso: "Tyrosine → L-DOPA → dopamine. Source naturelle de L-DOPA : Mucuna pruriens (pois mascate)." },
    { niveau: 3, theme: 'Terrain', recto: "Classification de Marchesseau (4 stades)", verso: "1. Carencé · 2. Intoxiqué · 3. Dystonique · 4. Dysorganique (le plus grave)." },
    { niveau: 3, theme: 'Régimes', recto: "Régime Seignalet (hypotoxique)", verso: "Exclut TOUS les laits animaux et les céréales mutées/glutineuses (blé, seigle, épeautre, orge). Autorise riz, sarrasin, fruits, légumes, viande, poisson." },
    { niveau: 3, theme: 'Biochimie', recto: "Réaction de Maillard", verso: "Réaction sucres + acides aminés sous l'effet de la chaleur → brunissement + AGE (glycotoxines / produits de glycation)." },
    { niveau: 3, theme: 'Gynécologie', recto: "Plantes progestérone-like vs œstrogène-like", verso: "Progestérone-like : alchémille, gattilier, igname (yam). Œstrogène-like : sauge, trèfle rouge, houblon (⚠️ contre-indiqués si cancer hormono-dépendant)." },
    { niveau: 3, theme: 'Terrain', recto: "Terrain baso-colitique : prise en charge", verso: "Cible l'intestin : plantes digestives (fenouil, basilic, mélisse) + pré/probiotiques pour rééquilibrer le microbiote." },
    { niveau: 3, theme: 'Micronutrition', recto: "Rôles de la L-Glutamine", verso: "Carburant des entérocytes : renouvelle la muqueuse intestinale, synthétise le glutathion intestinal, active la synthèse protéique." },
    { niveau: 3, theme: 'Sport', recto: "Récupération sportive : 3 mécanismes", verso: "Sel (reconstitue le capital hydrique), B1 (recycle l'acide lactique), B6 (élimine les protéines musculaires endommagées)." },
    { niveau: 3, theme: 'Terrain', recto: "Carence en « vitamine F »", verso: "Vitamine F = acides gras essentiels. Carence → baisse immunitaire, troubles cutanés, terrain asthmatique." },
    { niveau: 3, theme: 'Phytochimie', recto: "Plantes à dérivés salicylés (aspirine naturelle)", verso: "Saule (salicine) et reine des prés (spiréine) — à l'origine de la synthèse de l'aspirine." },
    { niveau: 3, theme: 'Microbiote', recto: "Vitamines synthétisées par le microbiote", verso: "Vitamine K, vitamine B12 (peu absorbée dans le côlon) et vitamine B9 (folates)." },
    { niveau: 3, theme: 'Chrono-nutrition', recto: "Mélatonine : production", verso: "Produite par la glande pinéale à partir de la sérotonine ; sécrétion dès la baisse de lumière (≈18h), pic vers 2-3h du matin." },
    { niveau: 3, theme: 'Pédiatrie', recto: "Probiotique de référence : eczéma du nourrisson", verso: "Lactobacillus rhamnosus GG (LGG) — la souche la mieux documentée pour l'eczéma atopique du nouveau-né." },

    // ── Niveau 1 (compléments) ──────────────────────────────────
    { niveau: 1, theme: 'Concepts', recto: "La peau comme émonctoire", verso: "Émonctoire « de secours » : élimine par la sueur (glandes sudoripares) et le sébum (glandes sébacées) quand foie/intestins sont surchargés." },
    { niveau: 1, theme: 'Techniques', recto: "Lithothérapie ?", verso: "Le soin par les cristaux et les pierres, utilisés comme support énergétique." },
    { niveau: 1, theme: 'Techniques', recto: "Hydrothérapie ?", verso: "Le soin par l'eau : douches, bains, applications chaud/froid, jet écossais." },
    { niveau: 1, theme: 'Biochimie', recto: "Un antioxydant ?", verso: "Une molécule qui neutralise les radicaux libres (vitamines C et E, sélénium, polyphénols)." },
    { niveau: 1, theme: 'Digestion', recto: "Pourquoi mastiquer ?", verso: "La mastication est la 1ʳᵉ étape de la digestion (broyage + amylase salivaire) ; bien mâcher allège le travail de l'estomac." },
    { niveau: 1, theme: 'Cures', recto: "Le drainage ?", verso: "Stimuler les émonctoires pour aider l'organisme à éliminer ses déchets et surcharges." },

    // ── Niveau 2 (compléments) ──────────────────────────────────
    { niveau: 2, theme: 'Hydrologie', recto: "Effet du froid sur la peau", verso: "Vasoconstriction immédiate puis vasodilatation réactionnelle au retrait : effet tonifiant (douches froides, jet écossais)." },
    { niveau: 2, theme: 'Cures', recto: "La cure de désintoxication", verso: "Draine les émonctoires pour éliminer les surcharges. Elle précède la revitalisation (on nettoie avant de recharger)." },
    { niveau: 2, theme: 'Phytothérapie', recto: "Plantes diurétiques / drainantes", verso: "Pissenlit, orthosiphon (thé de Java), chiendent — augmentent l'élimination rénale. (La passiflore, elle, est calmante.)" },
    { niveau: 2, theme: 'Nutrition', recto: "Ratio oméga 6 / oméga 3", verso: "Idéal proche de 4/1. Le régime occidental tourne autour de 15-20/1 : trop d'oméga 6 → terrain pro-inflammatoire." },
    { niveau: 2, theme: 'Micronutrition', recto: "Vitamine B9 (folates) : intérêt clé", verso: "Indispensable avant la conception et en début de grossesse pour prévenir les malformations du tube neural (spina bifida)." },
    { niveau: 2, theme: 'Micronutrition', recto: "Magnésium : à retenir", verso: "Intervient dans plus de 300 réactions enzymatiques ; AJR ≈ 300-400 mg/j ; déficit très fréquent (stress, sport)." },

    // ── Niveau 3 (compléments) ──────────────────────────────────
    { niveau: 3, theme: 'Aromathérapie', recto: "Propriétés des cétones", verso: "Cicatrisantes, mucolytiques (stimulent la respiration), anti-hématomes, cholérétiques/cholagogues. Mais neurotoxiques à dose élevée." },
    { niveau: 3, theme: 'Endocrinologie', recto: "Hyperœstrogénie relative : que faire ?", verso: "Soutenir la progestérone (alchémille, gattilier) pour rééquilibrer le rapport œstrogènes/progestérone. ⚠️ Le houblon est œstrogène-like (à éviter si cancer hormono-dépendant)." },
    { niveau: 3, theme: 'Biochimie', recto: "Acide aminé libre le plus abondant", verso: "La glutamine (≈ 60 % du pool d'acides aminés musculaires) ; conditionnellement essentielle (stress, effort, maladie)." },
    { niveau: 3, theme: 'Régimes', recto: "Régime Atkins", verso: "Cétogène / low-carb : favorise protéines et graisses, supprime les féculents → cétose pour brûler les graisses." },
    { niveau: 3, theme: 'Pathologies', recto: "La candidose", verso: "Mycose (infection fongique) à Candida albicans, une levure. Favorisée par les antibiotiques et une alimentation riche en sucres." },
    { niveau: 3, theme: 'Nutrition', recto: "Acides gras essentiels (cuisson)", verso: "Éviter l'huile d'arachide en friture > 170°C (acides gras trans toxiques) ; apporter EPA/DHA (poissons gras)." }
  ],

  // ═══════════════════════════════════════════════════════════════
  //  QUESTIONS D'ORAL — questions ouvertes « à développer » + réponse modèle.
  //  Même schéma que les fiches { niveau, theme, recto, verso } : utilisées
  //  par oral.html (en plus des fiches) pour un entraînement plus réaliste.
  // ═══════════════════════════════════════════════════════════════
  oralQuestions: [
    { niveau: 1, theme: 'Concepts', recto: "Qu'est-ce que la naturopathie et sur quel principe repose-t-elle ?", verso: "C'est une approche de santé naturelle qui vise à stimuler la force vitale et la capacité d'auto-guérison de l'organisme. Elle repose sur le vitalisme (l'organisme se répare s'il en a les moyens) et le travail du terrain par l'hygiène de vie : alimentation, exercice, gestion du stress, sommeil. Elle est complémentaire, ne pose pas de diagnostic et n'établit pas de traitement médical." },
    { niveau: 1, theme: 'Concepts', recto: "Citez les 5 émonctoires et le rôle de chacun.", verso: "Le foie (élimine les déchets colloïdaux/« colles » via la bile), les intestins (évacuent les selles), les reins (déchets acides via l'urine), les poumons (acides volatils via la respiration) et la peau (sueur et sébum, émonctoire de secours). Ce sont les portes de sortie des déchets de l'organisme." },
    { niveau: 1, theme: 'Phytothérapie', recto: "Citez trois plantes qui soutiennent le foie et expliquez brièvement.", verso: "Artichaut (cholérétique/cholagogue, stimule la production et l'évacuation de la bile), radis noir (drainant hépatique, glucosinolates) et pissenlit (amers, stimulant hépatobiliaire et diurétique). C'est le trio hépatique classique." },
    { niveau: 1, theme: 'Tempéraments', recto: "Citez les 4 tempéraments d'Hippocrate et une caractéristique de chacun.", verso: "Sanguin (extraverti, jovial, tendance aux excès), lymphatique/flegmatique (calme, lent, tendance à la rétention), bilieux/colérique (volontaire, ardent, terrain hépatique et irritable), nerveux/mélancolique (sensible, cérébral, anxieux). Ils dérivent des 4 humeurs : sang, lymphe, bile jaune, bile noire." },
    { niveau: 2, theme: 'Cures', recto: "Expliquez les 3 cures de Marchesseau et leur ordre.", verso: "1. La désintoxication draine les émonctoires pour éliminer les surcharges. 2. La revitalisation recharge l'organisme en vitamines, minéraux et vitalité. 3. La stabilisation installe un équilibre durable. L'ordre est logique : on nettoie avant de recharger, et on adapte toujours à la vitalité de la personne (un terrain dévitalisé se revitalise d'abord)." },
    { niveau: 2, theme: 'Système nerveux', recto: "Différenciez vagotonie et sympathicotonie.", verso: "La vagotonie est une dominance du parasympathique (nerf vague) : repos, digestion, péristaltisme augmenté, tendance à l'intuition. La sympathicotonie est une dominance de l'orthosympathique : action, stress, mobilisation de l'énergie, tension. L'équilibre entre les deux est l'objectif ; le stress chronique fait basculer vers le sympathique." },
    { niveau: 2, theme: 'Microbiote', recto: "Quelle est la différence entre un prébiotique et un probiotique ?", verso: "Un probiotique est un micro-organisme vivant bénéfique (lactobacilles, bifidobactéries) qu'on apporte pour enrichir la flore. Un prébiotique est une fibre non digestible (inuline, FOS) qui sert de nourriture aux bonnes bactéries déjà présentes. On les associe souvent (symbiotique)." },
    { niveau: 2, theme: 'Nutrition', recto: "Qu'est-ce que l'équilibre acido-basique et comment le soutenir ?", verso: "C'est l'équilibre entre apports acidifiants et alcalinisants. Trop d'acidifiants (protéines animales en excès, sucres raffinés, sodas, café, stress, sédentarité) sollicite les réserves minérales. On le soutient avec une assiette très végétale (légumes, fruits, oléagineux), de la mastication, du mouvement et de la respiration, et un bon sommeil." },
    { niveau: 2, theme: 'Hydrologie', recto: "Décrivez l'effet du froid en hydrothérapie.", verso: "Le froid provoque d'abord une vasoconstriction (les vaisseaux se resserrent), puis une vasodilatation réactionnelle au réchauffement (afflux de sang) : c'est l'effet tonifiant et revitalisant, utilisé dans la douche froide ou le jet écossais. On l'applique brièvement et progressivement, en l'adaptant à la vitalité de la personne." },
    { niveau: 2, theme: 'Gynécologie', recto: "Qu'est-ce que l'hyperœstrogénie relative ? Quand l'observe-t-on ?", verso: "C'est un excès d'œstrogènes par rapport à la progestérone (pas forcément un excès absolu d'œstrogènes). On l'observe à la puberté et surtout en préménopause, quand la progestérone chute avant les œstrogènes, d'où un syndrome prémenstruel accentué. On peut soutenir la progestérone avec l'alchémille ou le gattilier (progestérone-like). ⚠️ Le houblon, lui, est œstrogène-like (à éviter en cas de cancer hormono-dépendant)." },
    { niveau: 3, theme: 'Neuro', recto: "Décrivez la voie de synthèse de la sérotonine et de la mélatonine.", verso: "Le tryptophane est transformé en 5-HTP, puis en sérotonine, elle-même convertie en mélatonine. La sérotonine régule l'humeur et la satiété ; la mélatonine, produite par la glande pinéale dès la baisse de lumière (≈18h, pic vers 2-3h), régule le sommeil. À distinguer de la voie de la dopamine (tyrosine → L-DOPA → dopamine)." },
    { niveau: 3, theme: 'Régimes', recto: "Présentez le régime Seignalet (régime hypotoxique).", verso: "Le régime du Dr Seignalet exclut tous les laits animaux et produits laitiers, ainsi que les céréales mutées et glutineuses (blé, seigle, épeautre, orge). Il privilégie le cru ou la cuisson douce, le riz, le sarrasin, les fruits, légumes, viandes et poissons. Objectif : réduire l'« encrassage » et l'hyperperméabilité intestinale dans certaines pathologies." },
    { niveau: 3, theme: 'Microbiote', recto: "Expliquez la fermentation et la putréfaction intestinales.", verso: "La fermentation concerne les sucres : elle produit des acides organiques courts (AGCC), non néfastes et même nutritifs pour les colonocytes. La putréfaction concerne les protéines : elle produit des amines, phénols et ammoniac, surtout dans le côlon descendant. En cas de constipation, ces produits de putréfaction sont réabsorbés et chargent le foie (auto-intoxication)." },
    { niveau: 3, theme: 'Terrain', recto: "Décrivez le terrain allergique et sa prise en charge en naturopathie.", verso: "C'est un terrain d'hyperréactivité immunitaire (rhinite, eczéma, asthme). On travaille le fond : plantes de terrain comme le plantain (antihistaminique) et le cassis (anti-inflammatoire, cortison-like), soin du microbiote intestinal (70 % de l'immunité), rééquilibrage du ratio oméga 6/oméga 3 en faveur des oméga 3, et réduction des sucres raffinés. En complément du suivi médical." },
    { niveau: 3, theme: 'Micronutrition', recto: "Pourquoi le fer ne doit-il jamais être supplémenté sans bilan ?", verso: "Parce qu'en excès le fer est pro-oxydant (réaction de Fenton, production de radicaux libres), hépatotoxique, et peut masquer ou aggraver une pathologie sous-jacente. Un dosage sanguin (ferritine, fer sérique) est indispensable avant toute supplémentation." }
  ]
};
