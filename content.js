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
