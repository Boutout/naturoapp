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
    categorie: "Examen blanc",
    sujet: "Lithothérapie en dehors des pratiques de type…",
    question: "Qu'est ce que la lithothérapie en dehors des pratiques de type homéopathique ?",
    options: ["le soin par les micro-nutriments", "le soin par les oligo-éléments", "le soin par le biais de cristaux", "le soin par l'argile"],
  bonne: 2,
    explication: "La lithothérapie soigne par les cristaux et minéraux (du grec lithos = pierre). À distinguer de l'oligothérapie (oligo-éléments) et de l'argilothérapie.",
    mnemo: "LITHO = pierre → soin par les cristaux.",
    tags: ["examen"]
  },
  {
    id: 2, jour: 1,
    categorie: "Examen blanc",
    sujet: "Un acide gras insaturés",
    question: "Un acide gras insaturés",
    options: ["c'est un acide gras mort", "comporte plusieurs double liaisons carbone -carbone", "ils ont tendance à être solide en température ambiante", "se retrouve dans l'huile de palme"],
  bonne: 1,
    explication: "Un acide gras insaturé comporte une ou plusieurs doubles liaisons carbone-carbone ; il est plutôt liquide à température ambiante. Les saturés (sans double liaison) sont solides (huile de palme).",
    mnemo: "INsaturé = doubles liaisons = liquide ; saturé = solide.",
    tags: ["examen"]
  },
  {
    id: 3, jour: 1,
    categorie: "Examen blanc",
    sujet: "Homéostasie",
    question: "Qu'est ce que l'homéostasie ?",
    options: ["C'est la capacité de l'organisme à conserver son équilibre", "C'est la dégradation du terrain par une baisse de l'immunité", "D'après Claude Bernard le germe a une plus grande importance que le terrain", "C'est l'équilibre des paramètres physico-chimiques et biologique de nos cellules", "La régulation de l'homéostasie se fait par le système nerveux central"],
  bonnes: [0, 3],
    explication: "L'homéostasie est la capacité de l'organisme à maintenir son équilibre interne : l'équilibre des paramètres physico-chimiques et biologiques des cellules.",
    mnemo: "Homéo (semblable) + stasis (stable) = rester stable.",
    tags: ["examen"]
  },
  {
    id: 4, jour: 1,
    categorie: "Examen blanc",
    sujet: "Sont éliminés les acides et les colles",
    question: "Comment sont éliminés les acides et les colles ?",
    options: ["Les colles sont éliminées par le foie et gros intestin", "Les colles sont éliminées par les reins et les poumons", "Les acides sont éliminés par les reins et les poumons", "Les acides sont éliminés par le foie et gros intestin"],
  bonnes: [0, 2],
    explication: "Convention naturopathique : les colles (déchets colloïdaux) sont éliminées par le foie et le gros intestin ; les acides par les reins et les poumons.",
    piege: "Ne pas inverser : drainer un acidifié par le foie est inefficace.",
    mnemo: "Colles → foie/intestin ; Acides → reins/poumons.",
    tags: ["examen"]
  },
  {
    id: 5, jour: 1,
    categorie: "Examen blanc",
    sujet: "Qu'est ce qu'une cure de revitalisation",
    question: "Qu'est ce qu'une cure de revitalisation ?",
    options: ["une cure de vitamines et minéraux adaptés aux carences de l'organisme", "une cure pour éliminer les toxines", "une cure permettant de vérifier l'harmonisation globale des équilibres", "une cure de prévention"],
  bonne: 0,
    explication: "La cure de revitalisation recharge l'organisme : apport de vitamines et minéraux adaptés aux carences. Elle suit la cure de désintoxication.",
    mnemo: "Revitalisation = REcharge en vitamines/minéraux.",
    tags: ["examen"]
  },
  {
    id: 6, jour: 1,
    categorie: "Examen blanc",
    sujet: "Plantes peut-on utiliser pour stimuler le foie",
    question: "Quelles plantes peut-on utiliser pour stimuler le foie ?",
    options: ["eucalyptus, bouillon blanc, lierre terrestre", "artichaut, radis noir, pissenlit", "queue de cerise, busserole, reine des prés", "bourdaine, son d'avoine, pruneaux"],
  bonne: 1,
    explication: "Le trio hépatique stimule le foie et la vésicule : artichaut, radis noir, pissenlit (cholagogues/cholérétiques et drainants).",
    mnemo: "ARP : Artichaut, Radis noir, Pissenlit.",
    tags: ["examen"]
  },
  {
    id: 7, jour: 1,
    categorie: "Examen blanc",
    sujet: "Est la durée d'une cure détox",
    question: "Quelle est la durée d'une cure détox ?",
    options: ["Il faut drainer en continu", "Pas plus d'une semaine", "3 semaines dans l'idéal avec un maximum de 6 semaines", "Entre 5 et 8 semaines"],
  bonne: 2,
    explication: "Une cure de détoxication dure idéalement 3 semaines, avec un maximum de 6 semaines pour ne pas épuiser l'organisme.",
    mnemo: "Détox : 3 semaines (max 6).",
    tags: ["examen"]
  },
  {
    id: 8, jour: 1,
    categorie: "Examen blanc",
    sujet: "La théorie des humeurs selon Hippocrate",
    question: "La théorie des humeurs selon Hippocrate :",
    options: ["La lymphe est rattachée au cœur", "Les humeurs sont au nombre de 4", "Les humeurs sont au nombre de 3", "La bile jaune vient du foie", "Le sang produit par le cœur est reçu par le foie", "L'atrabile vient de la rate"],
  bonnes: [1, 3, 5],
    explication: "Les 4 humeurs d'Hippocrate : le sang, la lymphe (flegme), la bile jaune (issue du foie) et l'atrabile/bile noire (issue de la rate).",
    mnemo: "4 humeurs : sang, lymphe, bile jaune (foie), atrabile (rate).",
    tags: ["examen"]
  },
  {
    id: 9, jour: 1,
    categorie: "Examen blanc",
    sujet: "Une plante carminative a un intérêt…",
    question: "Une plante carminative a un intérêt principalement sur :",
    options: ["les nausées", "la constipation", "les vomissements", "les ballonnements", "la diarrhée"],
  bonne: 3,
    explication: "Une plante carminative facilite l'évacuation des gaz : elle agit surtout sur les ballonnements (fenouil, anis, carvi…).",
    mnemo: "Carminative = chasse les gaz → ballonnements.",
    tags: ["examen"]
  },
  {
    id: 10, jour: 1,
    categorie: "Examen blanc",
    sujet: "Lithiases biliaires et les coliques biliaires",
    question: "Concernant les lithiases biliaires et les coliques biliaires :",
    options: ["Les plantes cholagogues et cholérétiques apportent un soulagement", "Une compresse chaude sur le foie est indiquée", "Le signe de Murphy est positif", "Les coliques biliaires provoquent en général des douleurs en « coup de poignard » vers l'épaule droite", "Les calculs sont souvent composés de cholestérol"],
  bonne: 0,
    explication: "⚠️ En cas de lithiase biliaire, les plantes cholagogues et cholérétiques sont CONTRE-INDIQUÉES : en stimulant l'écoulement de la bile, elles peuvent mobiliser un calcul et provoquer une obstruction. C'est donc l'erreur à repérer.",
    mnemo: "Calculs = PAS de cholagogue/cholérétique (risque d'obstruction).",
    tags: ["examen"]
  },
  {
    id: 11, jour: 2,
    categorie: "Examen blanc",
    sujet: "Parmi les plantes typiquement drainantes et…",
    question: "Trouvez l'intrus parmi les plantes typiquement drainantes et diurétiques suivantes :",
    options: ["Orthosiphon", "Piloselle", "Bouleau", "Passiflore", "Thé vert"],
  bonne: 3,
    explication: "La passiflore est une plante du sommeil et de l'anxiété, pas un drainant diurétique : c'est l'intrus.",
    mnemo: "Passiflore = sommeil/anxiété, pas diurétique.",
    tags: ["examen"]
  },
  {
    id: 12, jour: 2,
    categorie: "Examen blanc",
    sujet: "Radicaux libres",
    question: "Qu'est ce que les radicaux libres ?",
    options: ["Ce sont des molécules anti-oxydantes", "Des molécules toxiques dérivées de l'oxygène provenant de la respiration, tabac, pollution..", "Ce sont des molécules qui protègent nos cellules contre le stress oxydatif"],
  bonne: 1,
    explication: "Les radicaux libres sont des molécules instables et toxiques dérivées de l'oxygène, produites par la respiration mais aussi le tabac, la pollution, le stress…",
    mnemo: "Radical libre = oxygène agressif → oxydation.",
    tags: ["examen"]
  },
  {
    id: 13, jour: 2,
    categorie: "Examen blanc",
    sujet: "Oligo-élément ne doit pas être supplémenté sans…",
    question: "Quel oligo-élément ne doit pas être supplémenté sans prise de sang ?",
    options: ["le fer", "le zinc", "le magnésium"],
  bonne: 0,
    explication: "Le fer ne doit jamais être supplémenté sans bilan sanguin : un excès est pro-oxydant et favorise la surcharge (hémochromatose).",
    mnemo: "FER = doser avant (risque de surcharge).",
    tags: ["examen"]
  },
  {
    id: 14, jour: 2,
    categorie: "Examen blanc",
    sujet: "2 éléments produits par les chondrocytes",
    question: "Trouvez 2 éléments produits par les chondrocytes :",
    options: ["Le collagène", "L'acide lactique", "L'acide hyaluronique", "Les ostéocytes", "Le périoste"],
  bonnes: [0, 2],
    explication: "Les chondrocytes sont les cellules du cartilage : elles produisent le collagène et l'acide hyaluronique (matrice cartilagineuse).",
    mnemo: "Chondrocyte = cartilage → collagène + acide hyaluronique.",
    tags: ["examen"]
  },
  {
    id: 15, jour: 2,
    categorie: "Examen blanc",
    sujet: "Vitamine D",
    question: "Au sujet de la vitamine D :",
    options: ["La vitamine D3 a une meilleure biodisponibilité que la vitamine D2", "Les individus à peau mate en produisent plus facilement avec le soleil", "Elle n'est pas stockée au niveau du corps", "Elle est hydrosoluble", "Elle favorise l'absorption du calcium de l'alimentation"],
  bonnes: [0, 4],
    explication: "La vitamine D3 (cholécalciférol) a une meilleure biodisponibilité que la D2 ; elle favorise l'absorption intestinale du calcium.",
    mnemo: "D3 > D2 ; D = absorption du Calcium.",
    tags: ["examen"]
  },
  {
    id: 16, jour: 2,
    categorie: "Examen blanc",
    sujet: "Arthrite",
    question: "Concernant l'arthrite :",
    options: ["La goutte correspond à un taux élevé d'urée dans le sang", "Il est préférable de bouger lors des poussées d'arthrite", "L'arthritisme est rattaché aux \"sanguino-pléthoriques\" en naturopathie", "La polyarthrite rhumatoïde concerne des articulations dans tout le corps", "Les omega 3 présentent un intérêt dans le traitement de l'arthrite"],
  bonnes: [3, 4],
    explication: "La polyarthrite rhumatoïde est une atteinte articulaire diffuse (tout le corps) ; les oméga 3, anti-inflammatoires, sont utiles dans l'arthrite.",
    mnemo: "Poly-arthrite = PLUSIEURS articulations ; oméga 3 anti-inflammatoires.",
    tags: ["examen"]
  },
  {
    id: 17, jour: 2,
    categorie: "Examen blanc",
    sujet: "Est le nombre de plantes en vente libre pour les…",
    question: "Quel est le nombre de plantes en vente libre pour les tisanes ?",
    options: ["178 plantes", "300 plantes", "348 plantes", "148 plantes"],
  bonne: 3,
    explication: "148 plantes médicinales sont libérées du monopole pharmaceutique et autorisées à la vente libre (tisanes).",
    mnemo: "148 plantes en vente libre.",
    tags: ["examen"]
  },
  {
    id: 18, jour: 2,
    categorie: "Examen blanc",
    sujet: "Compétences de l'enfant pour s'attacher, selon la…",
    question: "Quelles sont les compétences de l'enfant pour s'attacher, selon la théorie de l'attachement ?",
    options: ["Il sourit", "Il a peur, il urine", "Succion, il pleure,", "Il crache, il bave", "Il s'accroche, il suit du regard"],
  bonnes: [0, 2, 4],
    explication: "Selon la théorie de l'attachement, le bébé dispose de compétences innées pour créer le lien : il sourit, tète, pleure, s'accroche et suit du regard.",
    mnemo: "Bébé s'attache : sourire, succion, pleurs, agrippement, regard.",
    tags: ["examen"]
  },
  {
    id: 19, jour: 2,
    categorie: "Examen blanc",
    sujet: "Parmi ces propositions les principales variétés…",
    question: "Quels sont parmi ces propositions les principales variétés de dysthymies ?",
    options: ["L'indifférence affective", "L'euphorie morbide", "La peur", "La colère", "L'angoisse"],
  bonnes: [0, 1],
    explication: "Les dysthymies sont des troubles de l'humeur affective : on retient l'indifférence affective et l'euphorie morbide (la peur, la colère et l'angoisse sont des émotions, pas des dysthymies).",
    mnemo: "Dysthymie = trouble de l'humeur : indifférence affective, euphorie morbide.",
    tags: ["examen"]
  },
  {
    id: 20, jour: 2,
    categorie: "Examen blanc",
    sujet: "2 plantes typiquement utilisées en cas d'allergie",
    question: "Trouvez dans cette liste les 2 plantes typiquement utilisées en cas d'allergie :",
    options: ["Mélisse", "Thym", "Plantain", "Aigremoine", "Cassis"],
  bonnes: [2, 4],
    explication: "Le plantain et le cassis sont les deux plantes phares de l'allergie : antihistaminique naturel (plantain) et cortison-like (cassis).",
    mnemo: "Allergie : Plantain + Cassis.",
    tags: ["examen"]
  },
  {
    id: 21, jour: 3,
    categorie: "Examen blanc",
    sujet: "2 propositions correctes",
    question: "Trouvez les 2 propositions correctes :",
    options: ["L'hypoderme comporte de nombreuses cellules adipeuses", "La cellulite est une inflammation des glandes sudoripares", "Les glandes sébacées se situent au niveau du derme et les sécrétions aboutissent au niveau de l'épiderme", "Le derme et l'épiderme sont richement vascularisés", "L'hypoderme correspond à environ 5% du poids corporel en général"],
  bonnes: [0, 2],
    explication: "L'hypoderme (couche profonde) est riche en cellules adipeuses ; les glandes sébacées siègent dans le derme et déversent le sébum à la surface de l'épiderme.",
    mnemo: "Hypoderme = graisse ; sébacées dans le derme → sébum vers l'épiderme.",
    tags: ["examen"]
  },
  {
    id: 22, jour: 3,
    categorie: "Examen blanc",
    sujet: "2 huiles/huiles essentielles typiquement…",
    question: "Trouvez 2 huiles/huiles essentielles typiquement efficaces en cas d'hématome :",
    options: ["Myrte", "Hélichryse italienne", "Tea tree", "Plantain", "Arnica"],
  bonnes: [1, 4],
    explication: "L'hélichryse italienne (immortelle) et l'arnica sont le duo de référence contre les hématomes (« anti-bleus »).",
    mnemo: "Hématome : Hélichryse + Arnica.",
    tags: ["examen"]
  },
  {
    id: 23, jour: 3,
    categorie: "Examen blanc",
    sujet: "Est la posologie courante des macérats glycérinés…",
    question: "Quelle est la posologie courante des macérats glycérinés mère ?",
    options: ["3 fois 1 goutte par jour", "3 fois 5 à 15 gouttes par jour", "3 fois 50 gouttes par jour", "3 fois 100 gouttes par jour"],
  bonne: 1,
    explication: "Posologie usuelle des macérats glycérinés (gemmothérapie) : 3 fois 5 à 15 gouttes par jour.",
    mnemo: "Gemmo : 3 × 5 à 15 gouttes/jour.",
    tags: ["examen"]
  },
  {
    id: 24, jour: 3,
    categorie: "Examen blanc",
    sujet: "Est l'apport journalier en magnésium recommandé…",
    question: "Quel est l'apport journalier en magnésium recommandé en moyenne chez un adulte?",
    options: ["3 à 4 g/jour", "1 à 2 g/jour", "200 à 300 mg/jour", "100 à 200 mg/jour", "300 à 400 mg/jour"],
  bonne: 4,
    explication: "L'apport journalier recommandé en magnésium chez l'adulte est d'environ 300 à 400 mg/jour (~6 mg/kg).",
    mnemo: "Mg ≈ 6 mg/kg → 300-400 mg/jour.",
    tags: ["examen"]
  },
  {
    id: 25, jour: 3,
    categorie: "Examen blanc",
    sujet: "Le pois mascate (Mucuna pruriens)",
    question: "Le pois mascate (Mucuna pruriens) :",
    options: ["est riche en L-Tyrosine", "est riche en L-Glycine", "est riche en L-Dopa", "diminue les envies suicidaires et le passage à l'acte", "présente un intérêt contre les jambes sans repos"],
  bonnes: [2, 4],
    explication: "Le pois mascate (Mucuna pruriens) est riche en L-Dopa, précurseur de la dopamine : intérêt sur les jambes sans repos (et la maladie de Parkinson).",
    mnemo: "Mucuna = L-Dopa → dopamine (jambes sans repos).",
    tags: ["examen"]
  },
  {
    id: 26, jour: 3,
    categorie: "Examen blanc",
    sujet: "Le vagotonique de base",
    question: "Le vagotonique de base :",
    options: ["présente une grande capacité de travail", "présente presque toujours un syndrome métabolique", "a un péristaltisme intestinal augmenté", "se sert beaucoup de son cerveau droit", "souffre souvent de goutte et d'hypertension"],
  bonnes: [2, 3],
    explication: "Le vagotonique (système parasympathique dominant) a un péristaltisme intestinal augmenté et se sert beaucoup de son cerveau droit (intuitif/créatif).",
    mnemo: "Vagotonique = vague (parasympathique) : digestion +, cerveau droit.",
    tags: ["examen"]
  },
  {
    id: 27, jour: 3,
    categorie: "Examen blanc",
    sujet: "Propriétés générales possibles des cétones",
    question: "Quelles sont les propriétés générales possibles des cétones ?",
    options: ["Cicatrisant", "Stimulant respiratoire", "Anti hématomes", "Cholérétique et cholagogue", "Stimule le pancréas endocrine"],
  bonnes: [0, 1, 2, 3],
    explication: "Les cétones (ex. camphre, menthone) sont cicatrisantes, stimulantes respiratoires (mucolytiques), anti-hématomes et cholérétiques/cholagogues. ⚠️ Neurotoxiques à forte dose. « Stimule le pancréas endocrine » est faux.",
    mnemo: "Cétones : cicatrisant, mucolytique, anti-hématome, bile — mais neurotoxiques.",
    tags: ["examen"]
  },
  {
    id: 28, jour: 3,
    categorie: "Examen blanc",
    sujet: "Est l'effet secondaire principal des Furocoumarines",
    question: "Quel est l'effet secondaire principal des Furocoumarines ?",
    options: ["Allergisantes", "Neurotoxiques", "Photosensibilisantes", "Irritantes"],
  bonne: 2,
    explication: "Les furocoumarines (bergamote, agrumes, angélique…) sont surtout photosensibilisantes : pas d'exposition au soleil après application.",
    mnemo: "Furocoumarines + soleil = photosensibilisation.",
    tags: ["examen"]
  },
  {
    id: 29, jour: 3,
    categorie: "Examen blanc",
    sujet: "On constate typiquement une hyperoestrogénie…",
    question: "On constate typiquement une hyperoestrogénie relative :",
    options: ["Pendant la grossesse", "Au début de la puberté chez la jeune fille", "En période de préménopause", "Pendant l'allaitement"],
  bonnes: [1, 2],
    explication: "L'hyperœstrogénie relative (œstrogènes en excès PAR RAPPORT à la progestérone) s'observe au début de la puberté et en préménopause, quand la progestérone chute.",
    mnemo: "Hyperœstrogénie relative : puberté + préménopause.",
    tags: ["examen"]
  },
  {
    id: 30, jour: 3,
    categorie: "Examen blanc",
    sujet: "La progestérone",
    question: "La progestérone :",
    options: ["Provoque une augmentation de la température du corps", "A un effet androgène-like sur le système pileux et la peau", "Favorise la rétention d'eau", "Induit irritabilité, aggressivité, insomnie", "Est favorable au maintien de la grossesse"],
  bonnes: [0, 4],
    explication: "La progestérone augmente la température basale du corps (d'où son repérage sur les courbes) et favorise le maintien de la grossesse (PRO-gestation).",
    mnemo: "PROgestérone = POUR la grossesse, et fait monter la température.",
    tags: ["examen"]
  },
  {
    id: 31, jour: 4,
    categorie: "Examen blanc",
    sujet: "Plantes suivantes, deux ont une activité…",
    question: "Parmi les plantes suivantes, deux ont une activité progestérone-like :",
    options: ["Sauge", "Alchemille", "Soja", "Achillée", "Houblon"],
  bonnes: [1, 3],
    explication: "Plantes progestérone-like : l'alchémille et l'achillée. ⚠️ Le houblon, le soja et la sauge sont au contraire ŒSTROGÈNE-like — à éviter en cas de cancer hormono-dépendant.",
    mnemo: "Progestérone-like : Alchémille + Achillée (PAS le houblon).",
    tags: ["examen"]
  },
  {
    id: 32, jour: 4,
    categorie: "Examen blanc",
    sujet: "Troubles liés à la ménopause, trouvez l'intrus",
    question: "Parmi les troubles liés à la ménopause, trouvez l'intrus :",
    options: ["Sècheresse des muqueuses, de la peau, des cheveux", "Troubles du sommeil et tendance dépressive", "Risque d'ostéoporose accru", "Palpitations, tachycardie, troubles du rythme cardiaque", "Perte de poids"],
  bonne: 4,
    explication: "La ménopause s'accompagne plutôt d'une PRISE de poids : la « perte de poids » est donc l'intrus.",
    mnemo: "Ménopause = prise de poids → la perte de poids est l'intrus.",
    tags: ["examen"]
  },
  {
    id: 33, jour: 4,
    categorie: "Examen blanc",
    sujet: "Le pancréas",
    question: "Le pancréas :",
    options: ["La somatostatine stimule la production d'insuline et de glucagon", "Les îlots de Langerhans sont responsables des sécrétions endocrines", "Les cellules alpha sécrètent l'insuline", "Le glucagon est une hormone hypoglycémiante, antagoniste de l'insuline", "L'insuline favorise le stockage du glucose sous forme de glycogène dans le foie, les muscles et le tissu adipeux"],
  bonnes: [1, 4],
    explication: "Le pancréas endocrine est fait des îlots de Langerhans ; l'insuline favorise le stockage du glucose en glycogène (foie, muscles, tissu adipeux). Les cellules alpha sécrètent le glucagon (pas l'insuline).",
    mnemo: "Îlots de Langerhans = endocrine ; insuline = stockage (glycogène).",
    tags: ["examen"]
  },
  {
    id: 34, jour: 4,
    categorie: "Examen blanc",
    sujet: "Fleurs de Bach peut-on recommander pour…",
    question: "Quelle fleurs de Bach peut-on recommander pour l'affirmation suivante : Je ne lui pardonnerai jamais d'avoir pris ma place, je me vengerai...",
    options: ["Impatiens", "Water violet", "Vervain", "Holly"],
  bonne: 3,
    explication: "« Je me vengerai, jalousie, haine » → Holly (le houx), la fleur de Bach de la colère, jalousie et haine.",
    mnemo: "Holly = Haine/jalousie (Hostilité).",
    tags: ["examen"]
  },
  {
    id: 35, jour: 4,
    categorie: "Examen blanc",
    sujet: "Fleurs de Bach peut-on recommander pour…",
    question: "Quelle fleurs de Bach peut-on recommander pour l'affirmation suivante : Je viens de me séparer de mon amie, mais ce n'est pas si grave finalement...",
    options: ["Wild oat", "Willow", "Agrimony", "Honeysuckle"],
  bonne: 2,
    explication: "« Ce n'est pas si grave… » : la personne masque sa souffrance derrière une apparente légèreté → Agrimony.",
    mnemo: "Agrimony = cacher sa peine derrière un masque joyeux.",
    tags: ["examen"]
  },
  {
    id: 36, jour: 4,
    categorie: "Examen blanc",
    sujet: "Plantes ont toutes ces propriétés :…",
    question: "Quelles plantes ont toutes ces propriétés : anti-inflammatoires, stimulant surrénales, anti-douleurs rhumatismales",
    options: ["Radis noir", "Plantain", "Coquelicot", "Gingembre", "Cassis"],
  bonnes: [3, 4],
    explication: "Le gingembre et le cassis cumulent : anti-inflammatoire, stimulant des surrénales et anti-douleurs rhumatismales.",
    mnemo: "Rhumatismes + surrénales : Gingembre + Cassis.",
    tags: ["examen"]
  },
  {
    id: 37, jour: 4,
    categorie: "Examen blanc",
    sujet: "Plantes les plus adaptées en cas de spasmes…",
    question: "Quelles sont les plantes les plus adaptées en cas de spasmes intestinaux ?",
    options: ["Séné", "basilic", "Fumeterre", "Artichaut", "Fenouil"],
  bonnes: [1, 4],
    explication: "Le basilic et le fenouil sont les antispasmodiques digestifs de choix en cas de spasmes intestinaux.",
    mnemo: "Spasmes intestinaux : Basilic + Fenouil.",
    tags: ["examen"]
  },
  {
    id: 38, jour: 4,
    categorie: "Examen blanc",
    sujet: "Plantes contiennent des dérivés salicylés",
    question: "Quelles plantes contiennent des dérivés salicylés ?",
    options: ["Camomille", "Consoude", "Saule", "Aubépine", "Reine des prés"],
  bonnes: [2, 4],
    explication: "Le saule et la reine des prés contiennent des dérivés salicylés (« aspirine végétale »), anti-inflammatoires et antalgiques.",
    mnemo: "Saule + Reine des prés = aspirine végétale (salicylés).",
    tags: ["examen"]
  },
  {
    id: 39, jour: 4,
    categorie: "Examen blanc",
    sujet: "Est l'acide aminé limitant dans les légumes secs",
    question: "Quel est l'acide aminé limitant dans les légumes secs ?",
    options: ["La Lysine", "La Méthionine", "La Glycine", "La Tyrosine", "La Glutamine"],
  bonne: 1,
    explication: "Dans les légumes secs (légumineuses), l'acide aminé limitant est la méthionine (les céréales, elles, manquent de lysine → d'où l'association céréales + légumineuses).",
    mnemo: "Légumineuses = manque de Méthionine ; céréales = manque de Lysine.",
    tags: ["examen"]
  },
  {
    id: 40, jour: 4,
    categorie: "Examen blanc",
    sujet: "Fruit peut-on conseiller en fin de repas pour…",
    question: "Quel fruit peut-on conseiller en fin de repas pour aider à la protéolyse ?",
    options: ["La fraise", "La pomme", "La figue", "L'abricot", "La papaye"],
  bonne: 4,
    explication: "La papaye, riche en papaïne, aide à la digestion des protéines (protéolyse) en fin de repas.",
    mnemo: "PApaye → PApaïne digère les protéines.",
    tags: ["examen"]
  },
  {
    id: 41, jour: 5,
    categorie: "Examen blanc",
    sujet: "Acide aminé peut être utilisé en complément…",
    question: "Quel acide aminé peut être utilisé en complément alimentaire pour la fabrication de la Sérotonine",
    options: ["Le Tryptophane", "L'Isoleucine", "La Cystéine", "La Phénylalanine", "La Methionine"],
  bonne: 0,
    explication: "Le tryptophane est l'acide aminé précurseur de la sérotonine (via le 5-HTP).",
    mnemo: "Tryptophane → 5-HTP → Sérotonine.",
    tags: ["examen"]
  },
  {
    id: 42, jour: 5,
    categorie: "Examen blanc",
    sujet: "A quelle heure est fabriquée la mélatonine",
    question: "A quelle heure est fabriquée la mélatonine ?",
    options: ["A partir de 12h", "Dès 18h", "A 16h", "Dès 8h"],
  bonne: 1,
    explication: "La sécrétion de mélatonine (hormone du sommeil) débute dès 18h, avec la baisse de lumière.",
    mnemo: "Mélatonine dès 18h (tombée du jour).",
    tags: ["examen"]
  },
  {
    id: 43, jour: 5,
    categorie: "Examen blanc",
    sujet: "Les acides gras mono-insaturés proviennent de…",
    question: "Les acides gras mono-insaturés proviennent de quelle série d'oméga ?",
    options: ["Oméga 6", "Oméga 9", "Oméga 3"],
  bonne: 1,
    explication: "Les acides gras mono-insaturés appartiennent à la série des oméga 9 (ex. acide oléique de l'huile d'olive).",
    mnemo: "Mono-insaturé = Oméga 9 (huile d'olive).",
    tags: ["examen"]
  },
  {
    id: 44, jour: 5,
    categorie: "Examen blanc",
    sujet: "Conseils alimentaires peut-on donner pour ne pas…",
    question: "Quels conseils alimentaires peut-on donner pour ne pas être carencé en acides gras essentiels au quotidien ?",
    options: ["Eviter au maximum l'huile d'arachide pour la friture à + de 170°", "Utiliser surtout l'huile de tournesol", "Apporter des EPA/DHA", "Respecter le rapport omega 6/ omega 3", "Apporter à l'alimentation beaucoup d'acide gras saturés", "Utiliser du beurre de préférence cuit et bio"],
  bonnes: [0, 2, 3],
    explication: "Pour ne pas être carencé en acides gras essentiels : éviter l'huile d'arachide en friture au-delà de 170°, apporter des EPA/DHA et respecter le rapport oméga 6 / oméga 3.",
    mnemo: "AGE : éviter friture >170°, apporter EPA/DHA, équilibrer oméga 6/3.",
    tags: ["examen"]
  },
  {
    id: 45, jour: 5,
    categorie: "Examen blanc",
    sujet: "Minéral faudrait-il limiter en cas d'hypertension",
    question: "Quel minéral faudrait-il limiter en cas d'hypertension ?",
    options: ["Le Sodium", "Magnésium", "Calcium", "Fer"],
  bonne: 0,
    explication: "En cas d'hypertension, on limite le sodium (sel), qui favorise la rétention d'eau et l'élévation de la tension.",
    mnemo: "HTA = limiter le Sodium (sel).",
    tags: ["examen"]
  },
  {
    id: 46, jour: 5,
    categorie: "Examen blanc",
    sujet: "Vitamine peut avoir des besoins augmentés en cas…",
    question: "Quelle vitamine peut avoir des besoins augmentés en cas de consommation de sucres rapides ?",
    options: ["La vitamine C", "La vitamine B1", "La vitamine A", "La vitamine E"],
  bonne: 1,
    explication: "La consommation de sucres rapides augmente les besoins en vitamine B1 (thiamine), cofacteur du métabolisme des glucides.",
    mnemo: "Le sucre « brûle » la B1 (thiamine).",
    tags: ["examen"]
  },
  {
    id: 47, jour: 5,
    categorie: "Examen blanc",
    sujet: "Vitamine est préconisée pour toutes femmes…",
    question: "Quelle vitamine est préconisée pour toutes femmes désirant avoir un enfant",
    options: ["La vitamine A", "La vitamine E", "La vitamine B9", "La vitamine C"],
  bonne: 2,
    explication: "Toute femme désirant un enfant doit recevoir de la vitamine B9 (folates) : prévention des anomalies du tube neural (spina bifida).",
    mnemo: "B9 = Bébé (à débuter avant la conception).",
    tags: ["examen"]
  },
  {
    id: 48, jour: 5,
    categorie: "Examen blanc",
    sujet: "Conseiller à une personne ayant un terrain…",
    question: "Que peut-on conseiller à une personne ayant un terrain baso-colitique ?",
    options: ["Plantes de l'appareil digestif", "La vitamine D est prioritaire parmi les vitamines", "Plantes pour la détoxication rénale", "Les oligo éléments les plus importants sont cuivre or argent", "Pro et prébiotique"],
  bonnes: [0, 4],
    explication: "Le terrain baso-colitique (côlon fragile) relève des plantes de l'appareil digestif et des pro/prébiotiques pour restaurer la flore.",
    mnemo: "Baso-colitique : plantes digestives + pro/prébiotiques.",
    tags: ["examen"]
  },
  {
    id: 49, jour: 5,
    categorie: "Examen blanc",
    sujet: "Le terrain Intoxiqué en micronutrition correspond…",
    question: "Le terrain Intoxiqué en micronutrition correspond à quel stade chez Marchesseau ?",
    options: ["Stade 3", "Stade 1", "Stade 2", "Stade 4"],
  bonne: 2,
    explication: "Dans la classification de Marchesseau, le terrain « Intoxiqué » correspond au stade 2.",
    mnemo: "Intoxiqué = stade 2 (Marchesseau).",
    tags: ["examen"]
  },
  {
    id: 50, jour: 5,
    categorie: "Examen blanc",
    sujet: "Signes cliniques d'un terrain C = carencé en…",
    question: "Quels sont les signes cliniques d'un terrain C = carencé en vitamine F en micronutrition ?",
    options: ["Baisse immunitaire", "Ostéoporose", "Maux de tête", "Troubles cutanées", "Asthme"],
  bonnes: [0, 3, 4],
    explication: "La vitamine F = acides gras essentiels. Sa carence (terrain C) donne baisse immunitaire, troubles cutanés et asthme.",
    mnemo: "Vitamine F = Fatty acids ; carence : immunité, peau, asthme.",
    tags: ["examen"]
  },
  {
    id: 51, jour: 6,
    categorie: "Examen blanc",
    sujet: "Affirmations sont justes concernant la réaction…",
    question: "Quelles affirmations sont justes concernant la réaction de Maillard ?",
    options: ["La présence de sucre favorise cette réaction.", "Réaction stimulée par des températures basses", "Le pH du milieu augmente lors de sa réaction", "Réaction stimulée pendant le stockage à température ambiante", "Cette réaction ne modifie pas le goût des aliments", "Réaction stimulée lors de températures élevées"],
  bonnes: [0, 3, 5],
    explication: "La réaction de Maillard (brunissement) est favorisée par la présence de sucre, par les températures élevées et se poursuit lentement pendant le stockage à température ambiante.",
    mnemo: "Maillard : sucre + chaleur (+ stockage) = brunissement.",
    tags: ["examen"]
  },
  {
    id: 52, jour: 6,
    categorie: "Examen blanc",
    sujet: "Vitamines sont fabriquées par les bactéries…",
    question: "Quelles vitamines sont fabriquées par les bactéries probiotiques parmi les suivantes ?",
    options: ["Vitamine E", "Vitamine C", "Vitamine K", "Vitamine B12", "Vitamine A", "Vitamine B9"],
  bonnes: [2, 3, 5],
    explication: "Le microbiote intestinal (bactéries probiotiques) synthétise notamment les vitamines K, B12 et B9.",
    mnemo: "Le microbiote fabrique K, B12, B9.",
    tags: ["examen"]
  },
  {
    id: 53, jour: 6,
    categorie: "Examen blanc",
    sujet: "Bactéries en particulier sont utilisées pour…",
    question: "Quelles bactéries en particulier sont utilisées pour diminuer l'eczema atopique du nouveau-né ?",
    options: ["bifidobactéries", "Lactobacillus casei cerela", "Lactobacillus rhamnosus GG", "Saccharomyces boulardii"],
  bonne: 2,
    explication: "Lactobacillus rhamnosus GG est la souche de référence pour réduire l'eczéma atopique du nouveau-né.",
    mnemo: "Eczéma du nourrisson : L. rhamnosus GG.",
    tags: ["examen"]
  },
  {
    id: 54, jour: 6,
    categorie: "Examen blanc",
    sujet: "Affirmations sont vraies",
    question: "Quelles affirmations sont vraies ?",
    options: ["Les acides formés par la fermentation ne sont pas néfastes pour la muqueuse intestinale", "Les protéines sont dégradées dans le côlon descendant", "En cas de constipation, les produits de putréfaction sont absorbés par la muqueuse intestinale et parviennent au foie", "La fermentation est responsable de l'odeur des selles ou des gaz", "Les protéines sont dégradées dans le côlon ascendant"],
  bonnes: [0, 1, 2],
    explication: "Physiologie colique : les acides issus de la fermentation ne sont pas néfastes pour la muqueuse ; les protéines sont dégradées dans le côlon descendant ; en cas de constipation, les produits de putréfaction sont réabsorbés et parviennent au foie.",
    mnemo: "Fermentation (acides) OK ; putréfaction (protéines) = toxique si constipation.",
    tags: ["examen"]
  },
  {
    id: 55, jour: 6,
    categorie: "Examen blanc",
    sujet: "Kousmine la température de cuisson des aliments…",
    question: "D'après Kousmine la température de cuisson des aliments doit être inférieure à :",
    options: ["50°", "110°", "100°", "120°"],
  bonne: 2,
    explication: "Selon la méthode Kousmine, la cuisson doit rester inférieure à 100°C (cuisson douce, sans ébullition violente) pour préserver les nutriments.",
    mnemo: "Kousmine = cuisson < 100°C.",
    tags: ["examen"]
  },
  {
    id: 56, jour: 6,
    categorie: "Examen blanc",
    sujet: "Le temps de digestion d'un repas équilibré dans…",
    question: "Le temps de digestion d'un repas équilibré dans l'estomac varie entre ?",
    options: ["1-2 heures", "4-5 heures", "7-9 heures", "6-7 heures"],
  bonne: 1,
    explication: "Le temps de digestion gastrique d'un repas équilibré est d'environ 4 à 5 heures.",
    mnemo: "Estomac ≈ 4-5 h.",
    tags: ["examen"]
  },
  {
    id: 57, jour: 6,
    categorie: "Examen blanc",
    sujet: "Aliments interdits dans le Régime Seignalet",
    question: "Quels sont les aliments interdits dans le Régime Seignalet ?",
    options: ["moutarde", "Le seigle", "le lait de chèvre", "Amandes", "l'épeautre", "Bière", "Pomme de terre", "café"],
  bonnes: [1, 2, 4, 5],
    explication: "Le régime Seignalet (hypotoxique) exclut les céréales « mutées » et les laitages : seigle, épeautre, lait de chèvre, bière en font partie.",
    mnemo: "Seignalet exclut céréales mutées + laitages (seigle, épeautre, lait, bière).",
    tags: ["examen"]
  },
  {
    id: 58, jour: 6,
    categorie: "Examen blanc",
    sujet: "Vitamines et minéraux peut-on proposer pour la…",
    question: "Quels vitamines et minéraux peut-on proposer pour la prévention de l'artériosclérose ?",
    options: ["Zinc, silicium, magnésium", "Chrome", "Vitamine C", "cuivre, molybdène", "Vitamine B1 et B3"],
  bonnes: [0, 2, 4],
    explication: "Prévention de l'artériosclérose : zinc/silicium/magnésium, vitamine C (paroi vasculaire) et vitamines B1 et B3.",
    mnemo: "Artères : Zn/Si/Mg, vit. C, B1-B3.",
    tags: ["examen"]
  },
  {
    id: 59, jour: 6,
    categorie: "Examen blanc",
    sujet: "Régime exclut les laits animaux",
    question: "Quel régime exclut les laits animaux",
    options: ["Le régime du Dr Kousmine", "Le régime Paléolithique", "Le régime du Dr Seignalet"],
  bonne: 2,
    explication: "Le régime du Dr Seignalet exclut les laits animaux (et les céréales mutées).",
    mnemo: "Seignalet = sans laits animaux.",
    tags: ["examen"]
  },
  {
    id: 60, jour: 6,
    categorie: "Examen blanc",
    sujet: "Crudivorisme-véganisme",
    question: "Qu'est ce que le crudivorisme-véganisme ?",
    options: ["il consiste à ne pas chauffer la nourriture à plus de 40°C", "il consiste à manger des aliments crus", "il consiste à ne pas chauffer la nourriture à plus de 95°C", "Il consiste à manger des légumes et fruits cuits"],
  bonnes: [0, 1],
    explication: "Le crudivorisme consiste à manger cru, sans chauffer au-delà de 40°C ; associé au véganisme, il exclut tout produit animal.",
    mnemo: "Crudivorisme : cru, < 40°C.",
    tags: ["examen"]
  },
  {
    id: 61, jour: 7,
    categorie: "Examen blanc",
    sujet: "La cure de revitalisation permet",
    question: "La cure de revitalisation permet :",
    options: ["De corriger les carences micronutritionnelles", "De drainer l'organisme", "De proposer un rééquilibrage alimentaire adapté à la personne", "De mettre au repos ses fonctions digestives à l'aide d'un jeûne", "De reconsolider les réserves minérales"],
  bonnes: [0, 2, 4],
    explication: "La cure de revitalisation corrige les carences micronutritionnelles, propose un rééquilibrage alimentaire personnalisé et reconstitue les réserves minérales.",
    mnemo: "Revitalisation : corriger carences, rééquilibrer, recharger les minéraux.",
    tags: ["examen"]
  },
  {
    id: 62, jour: 7,
    categorie: "Examen blanc",
    sujet: "Vos cours quelles affirmations sont vraies sur le…",
    question: "D'après vos cours quelles affirmations sont vraies sur le diabète :",
    options: ["Le diabète de type 1 se déclare parfois suite à une maladie auto-immune", "Le diabète de type 2 se déclare en général après 45 ans", "Le diabète de type 1 se déclare en général après 45 ans", "Le diabète de type 2 est insulino dépendant", "Le diabète de type 2 est appelé le diabète juvénile", "Le manque d'activité physique peut être un facteur de risque du diabète"],
  bonnes: [0, 1, 5],
    explication: "Diabète : le type 1 est souvent auto-immun ; le type 2 apparaît en général après 45 ans ; la sédentarité (manque d'activité physique) est un facteur de risque.",
    mnemo: "Type 1 = auto-immun ; type 2 = après 45 ans + sédentarité.",
    tags: ["examen"]
  },
  {
    id: 63, jour: 7,
    categorie: "Examen blanc",
    sujet: "Aliments sont à favoriser en cas de diabète",
    question: "Quels aliments sont à favoriser en cas de diabète ?",
    options: ["L'ail", "Le citron", "Les fruits secs", "Le seigle", "Légumes et crudités", "Le pain blanc"],
  bonnes: [0, 1, 4],
    explication: "En cas de diabète, on favorise l'ail, le citron et les légumes/crudités (index glycémique bas, soutien métabolique).",
    mnemo: "Diabète : ail, citron, légumes/crudités.",
    tags: ["examen"]
  },
  {
    id: 64, jour: 7,
    categorie: "Examen blanc",
    sujet: "Peuvent être les causes d'un dysfonctionnement…",
    question: "Quelles peuvent être les causes d'un dysfonctionnement digestif ?",
    options: ["Les antibiotiques", "Les probiotiques", "Manger lentement", "Le manque de mastication", "Le café au lait"],
  bonnes: [0, 3, 4],
    explication: "Causes d'un dysfonctionnement digestif : les antibiotiques (destruction du microbiote), le manque de mastication (surcharge enzymatique) et le café au lait (l'acidité du café coagule les protéines du lait).",
    mnemo: "Digestion perturbée : antibiotiques, peu de mastication, café au lait.",
    tags: ["examen"]
  },
  {
    id: 65, jour: 7,
    categorie: "Examen blanc",
    sujet: "Aliments favorisent les gaz intestinaux",
    question: "Quels aliments favorisent les gaz intestinaux ?",
    options: ["La tomate", "Le fenouil", "Les choux", "L'ananas", "La carotte", "Le melon"],
  bonnes: [0, 2, 5],
    explication: "Aliments fermentescibles favorisant les gaz intestinaux : la tomate, les choux et le melon.",
    mnemo: "Gaz : tomate, choux, melon.",
    tags: ["examen"]
  },
  {
    id: 66, jour: 7,
    categorie: "Examen blanc",
    sujet: "Manger certains aliments seuls, au moins 4 h…",
    question: "Il est conseillé de manger certains aliments seuls, au moins 4 h après le repas, lesquels ?",
    options: ["La carotte", "Le yaourt", "Le melon", "Le miel", "La papaye"],
  bonnes: [1, 2, 3],
    explication: "Certains aliments se digèrent mieux seuls, à distance des repas (au moins 4 h) : le yaourt, le melon et le miel.",
    mnemo: "À manger seuls : yaourt, melon, miel.",
    tags: ["examen"]
  },
  {
    id: 67, jour: 7,
    categorie: "Examen blanc",
    sujet: "La liste ci-dessous quelles sont les erreurs à ne…",
    question: "Parmi la liste ci-dessous quelles sont les erreurs à ne pas faire ?",
    options: ["Crudités en début de repas", "Epices à chaque accompagnement", "Melon en entrée", "1 jus d'orange au petit déjeuner", "2-3 fruits crus par jour", "Dessert à chaque repas"],
  bonnes: [2, 3, 5],
    explication: "Erreurs alimentaires classiques : le melon en entrée, le jus d'orange au petit-déjeuner et un dessert (sucre) à chaque repas (fermentations, pic glycémique).",
    mnemo: "Erreurs : melon en entrée, jus d'orange le matin, dessert systématique.",
    tags: ["examen"]
  },
  {
    id: 68, jour: 7,
    categorie: "Examen blanc",
    sujet: "Phénomène d'ischémie-reperfusion",
    question: "Qu'est ce que le phénomène d'ischémie-reperfusion ?",
    options: ["une forme de rhumatisme", "un trouble du système nerveux", "un trouble digestif", "une infection urinaire"],
  bonne: 2,
    explication: "Le phénomène d'ischémie-reperfusion est, dans ce cours, classé comme un trouble digestif (souffrance puis réafflux sanguin au niveau intestinal).",
    mnemo: "Ischémie-reperfusion = trouble digestif.",
    tags: ["examen"]
  },
  {
    id: 69, jour: 7,
    categorie: "Examen blanc",
    sujet: "Après une compétition, le sportif a besoin de…",
    question: "Après une compétition, le sportif a besoin de nutriments pour la récupération des tissus et la restauration de l'équilibre physiologique lesquels ?",
    options: ["les glucides et lipides", "Zinc et vitamine B6, B1", "Manganèse et cobalt", "Vitamine E et A", "Magnésium et fer", "les protéines et glucides"],
  bonnes: [1, 4, 5],
    explication: "Après une compétition, la récupération des tissus nécessite : zinc + vitamines B6/B1, magnésium + fer, et l'apport de protéines + glucides.",
    mnemo: "Récup : Zn+B6/B1, Mg+Fer, protéines+glucides.",
    tags: ["examen"]
  },
  {
    id: 70, jour: 7,
    categorie: "Examen blanc",
    sujet: "Est le rôle de la L-glutamine",
    question: "Quel est le rôle de la L-glutamine ?",
    options: ["Permet le renouvellement rapide de la muqueuse", "Elle est très efficace pour traiter les rhumes", "Elle est très importante dans la création de la carnitine", "favorise la synthèse instestinale de glutathion", "Active la synthèse protéique"],
  bonnes: [0, 3, 4],
    explication: "La L-glutamine permet le renouvellement rapide de la muqueuse intestinale, favorise la synthèse intestinale de glutathion et active la synthèse protéique.",
    mnemo: "Glutamine = carburant de la muqueuse + glutathion + protéines.",
    tags: ["examen"]
  },
  {
    id: 71, jour: 8,
    categorie: "Examen blanc",
    sujet: "Plantes contient naturellement de la DOPA…",
    question: "Quelles plantes contient naturellement de la DOPA précurseur de la dopamine ?",
    options: ["Le Griffonia", "La Maca", "l'eleuthérocoque", "La mucuna pruriens"],
  bonne: 3,
    explication: "La mucuna pruriens contient naturellement de la L-DOPA, précurseur direct de la dopamine.",
    mnemo: "Mucuna = DOPA → dopamine.",
    tags: ["examen"]
  },
  {
    id: 72, jour: 8,
    categorie: "Examen blanc",
    sujet: "Proposer comme plantes en cas de carence en…",
    question: "Que peut-on proposer comme plantes en cas de carence en Sérotonine ?",
    options: ["Aubépine", "Eleuthérocoque", "chicorée", "Griffonia", "Millepertuis"],
  bonnes: [3, 4],
    explication: "En cas de carence en sérotonine : le griffonia (riche en 5-HTP) et le millepertuis (antidépresseur végétal).",
    mnemo: "Sérotonine : Griffonia (5-HTP) + Millepertuis.",
    tags: ["examen"]
  },
  {
    id: 73, jour: 8,
    categorie: "Examen blanc",
    sujet: "Dans quels aliments peut-on trouver des prébiotiques",
    question: "Dans quels aliments peut-on trouver des prébiotiques ?",
    options: ["Artichaut", "oignon", "viande", "lait maternel", "Chicorée", "œuf"],
  bonnes: [0, 1, 3, 4],
    explication: "Sources de prébiotiques (fibres nourrissant la flore, inuline/FOS) : artichaut, oignon, chicorée et le lait maternel.",
    mnemo: "Prébiotiques : artichaut, oignon, chicorée, lait maternel.",
    tags: ["examen"]
  },
  {
    id: 74, jour: 8,
    categorie: "Examen blanc",
    sujet: "L'IMC entre 25 et 30 est considéré comme",
    question: "L'IMC entre 25 et 30 est considéré comme :",
    options: ["Obésité modérée", "Maigreur", "Normal", "Surpoids"],
  bonne: 3,
    explication: "Un IMC entre 25 et 30 correspond au surpoids ; au-delà de 30, on parle d'obésité.",
    mnemo: "IMC 25-30 = surpoids ; >30 = obésité.",
    tags: ["examen"]
  },
  {
    id: 75, jour: 8,
    categorie: "Examen blanc",
    sujet: "Est la particularité du régime Atkins",
    question: "Quel est la particularité du régime Atkins ?",
    options: ["Favoriser les féculents", "Favoriser les protéines", "Supprimer les protéines", "Supprimer les féculents", "Autoriser les corps gras", "Supprimer les corps gras"],
  bonnes: [1, 3, 4],
    explication: "Le régime Atkins favorise les protéines, supprime les féculents et autorise les corps gras (régime hyperprotéiné/cétogène).",
    mnemo: "Atkins : protéines +, féculents −, gras autorisés.",
    tags: ["examen"]
  },
  {
    id: 76, jour: 8,
    categorie: "Examen blanc",
    sujet: "Affirmations sont vraies pour la récupération du…",
    question: "Quelles affirmations sont vraies pour la récupération du sportif",
    options: ["Il ne faut pas donner de glucides au moment de la récupération", "Les protéines de récupérations doivent être administrées 8h après la compétition", "Il ne faut pas donner de boissons contenant du sodium après l'effort", "Saler les aliments des repas après la compétition permet de reconstituer son capital hydrique", "La vitamine B1 permet le recyclage de l'acide lactique", "La vitamine B6 contribue à l'élimination des protéines endommagées"],
  bonnes: [3, 4, 5],
    explication: "Récupération du sportif : resaler les repas après l'effort (capital hydrique) ; la vitamine B1 permet le recyclage de l'acide lactique ; la vitamine B6 aide à éliminer les protéines endommagées.",
    mnemo: "Sportif : resaler, B1 (acide lactique), B6 (protéines).",
    tags: ["examen"]
  },
  {
    id: 77, jour: 8,
    categorie: "Examen blanc",
    sujet: "La gestion des compulsions sucrées",
    question: "Que peut-on proposer pour la gestion des compulsions sucrées ?",
    options: ["Le lithium", "La vitamine C", "Le cobalt", "Le chrome", "Le magnésium"],
  bonnes: [0, 1, 3, 4],
    explication: "Pour les compulsions sucrées : le lithium, la vitamine C, le chrome (régule la glycémie) et le magnésium.",
    mnemo: "Compulsions sucrées : lithium, vit. C, chrome, magnésium.",
    tags: ["examen"]
  },
  {
    id: 78, jour: 8,
    categorie: "Examen blanc",
    sujet: "Est l'acide aminé le plus abondant dans l'organisme",
    question: "Quel est l'acide aminé le plus abondant dans l'organisme ?",
    options: ["La Tyrosine", "La glutamine", "La Méthionine", "La Lysine"],
  bonne: 1,
    explication: "La glutamine est l'acide aminé le plus abondant de l'organisme (muscle, intestin, immunité).",
    mnemo: "AA le + abondant = glutamine.",
    tags: ["examen"]
  },
  {
    id: 79, jour: 8,
    categorie: "Examen blanc",
    sujet: "Rôles des prébiotiques",
    question: "Rôles des prébiotiques ?",
    options: ["Diminuent le taux de lipides sanguins", "Augmentent l'absorption des minéraux dans le côlon", "Diminuent l'absorption des minéraux dans le côlon", "Augmentent le taux de lipides sanguins", "Lutte contre la constipation"],
  bonnes: [0, 1, 4],
    explication: "Rôles des prébiotiques : diminuer les lipides sanguins, augmenter l'absorption des minéraux dans le côlon et lutter contre la constipation.",
    mnemo: "Prébiotiques : ↓ lipides, ↑ minéraux, anti-constipation.",
    tags: ["examen"]
  },
  {
    id: 80, jour: 8,
    categorie: "Examen blanc",
    sujet: "Une candidose est principalement",
    question: "Une candidose est principalement ?",
    options: ["Une infection fongique", "Un problème dermatologique", "Une inflammation du côlon", "Une maladie auto-immune"],
  bonne: 0,
    explication: "Une candidose est avant tout une infection fongique : Candida albicans est une levure (champignon), pas une bactérie.",
    mnemo: "Candida = champignon → infection fongique.",
    tags: ["examen"]
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
    if (!d.casDone) d.casDone = {};         // idCas -> { total, correct, pct }
    if (typeof d.fichesSeries !== 'number') d.fichesSeries = 0;  // séries de fiches terminées
    if (typeof d.examDate === 'undefined') d.examDate = null;   // 'YYYY-MM-DD' ou null
    if (!d.inProgress || typeof d.inProgress !== 'object') d.inProgress = {};  // sessions en cours (reprise) par type
    if (!d.usage || typeof d.usage !== 'object') d.usage = { totalSeconds: 0, lastActiveAt: null, sessions: 0, firstSeenAt: d.createdAt || null };
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
      casDone: {},         // idCas -> { total, correct, pct } (cas pratiques résolus)
      fichesSeries: 0,     // nb de séries de fiches de révision terminées
      examDate: null,      // date d'examen visée ('YYYY-MM-DD')
      dailyStats: {},      // "YYYY-MM-DD" -> { questions, correct }
      inProgress: {},      // sessions en cours, reprenables — { revision|exam|cas: {…snapshot} }
      usage: { totalSeconds: 0, lastActiveAt: null, sessions: 0, firstSeenAt: Date.now() },  // suivi du temps (admin)
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
    if (k && this.data) {
      this.data.updatedAt = Date.now();           // horodatage pour la réconciliation cloud
      localStorage.setItem(k, JSON.stringify(this.data));
    }
    if (typeof Cloud !== 'undefined' && Cloud && Cloud.schedulePush) Cloud.schedulePush();
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
    if (!s) return;            // question inconnue (ex : QCM généré par l'IA) → pas de stats
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
  // ── Intelligence : séance adaptative + analyse par thème ──────
  // Mix priorisé : mémoire à réviser (SRS dû + jamais vues) → points faibles → complément au hasard.
  getSmartQueue(max = 15) {
    const seen = new Set(), out = [];
    const push = arr => arr.forEach(q => { if (!seen.has(q.id) && out.length < max) { seen.add(q.id); out.push(q); } });
    push(this.getDueQuestions(max));
    push(this.getWeakQuestions(max));
    push(shuffle(QUESTIONS));
    return out.slice(0, max);
  },
  // Maîtrise (% réussite sur questions répondues) par thème principal (avant le « / »).
  masteryByTheme() {
    const g = {};
    QUESTIONS.forEach(q => {
      const s = this.data.questionStats[q.id];
      const theme = (q.categorie || '').split('/')[0].trim() || 'Autre';
      if (!g[theme]) g[theme] = { total: 0, ans: 0, correct: 0, seenQ: 0 };
      g[theme].total++; g[theme].ans += s.seen; g[theme].correct += s.correct; g[theme].seenQ += s.seen > 0 ? 1 : 0;
    });
    return Object.entries(g).map(([theme, v]) => ({
      theme, count: v.total,
      pct: v.ans > 0 ? Math.round(v.correct / v.ans * 100) : 0,
      coverage: v.total ? v.seenQ / v.total : 0
    }));
  },
  // Les k thèmes les plus faibles (peu maîtrisés / peu vus), parmi ceux à ≥3 questions.
  weakThemes(k = 3) {
    return this.masteryByTheme()
      .filter(t => t.count >= 3)
      .sort((a, b) => (a.pct - b.pct) || (a.coverage - b.coverage))
      .slice(0, k)
      .map(t => t.theme);
  },
  // Examen blanc ADAPTATIF : pondéré vers les faiblesses (~60 %) + couverture.
  getAdaptiveExam(n = 40) {
    const seen = new Set(), out = [];
    const add = arr => arr.forEach(q => { if (!seen.has(q.id) && out.length < n) { seen.add(q.id); out.push(q); } });
    add(this.getWeakQuestions(Math.round(n * 0.6)));   // priorité aux faiblesses
    add(shuffle(QUESTIONS));                            // complète pour la couverture
    return shuffle(out.slice(0, n));
  },
  // Coach prédictif : rythme récent → date de « prêt·e » + comparaison à l'examen.
  getProjection() {
    const rd = this.getReadiness();                    // { mastered, total, pct }
    const remaining = Math.max(0, rd.total - rd.mastered);
    let q7 = 0;                                         // questions vues sur 7 jours glissants
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
      q7 += (this.data.dailyStats[d] || {}).questions || 0;
    }
    const pace = q7 / 7;
    const cd = this.examCountdown();
    const hasExam = !!cd, daysLeft = cd ? cd.days : null;
    const effort = remaining * 1.5;                    // ~1,5 question vue pour en maîtriser 1
    const daysToReady = pace > 0 ? Math.ceil(effort / pace) : null;
    const readyDateISO = daysToReady != null ? new Date(Date.now() + daysToReady * 86400000).toISOString().split('T')[0] : null;
    const neededPerDay = (hasExam && daysLeft > 0) ? Math.ceil(effort / daysLeft) : null;
    const onTrack = (hasExam && daysToReady != null) ? daysToReady <= daysLeft : null;
    return { masteredPct: rd.pct, remaining, pace: Math.round(pace * 10) / 10, daysToReady, readyDateISO, hasExam, daysLeft, neededPerDay, onTrack };
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

  // ── Cas pratiques ───────────────────────────────────────────
  isCaseDone(id) { return !!(this.data.casDone && this.data.casDone[id]); },
  markCaseDone(id, total, correct) {
    if (!this.data.casDone) this.data.casDone = {};
    const isNew = !this.data.casDone[id];
    this.data.casDone[id] = { total, correct, pct: Math.round(correct / total * 100), timestamp: Date.now() };
    if (isNew) this.data.xp = (this.data.xp || 0) + 25;   // bonus 1re résolution
    this.save();
    return isNew;
  },

  // ── Fiches de révision ──────────────────────────────────────
  recordFichesSeries(acquis) {
    this.data.fichesSeries = (this.data.fichesSeries || 0) + 1;
    this.data.xp = (this.data.xp || 0) + Math.min(20, (acquis || 0) * 2);
    this.save();
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
  },

  // ─── Sessions en cours (reprise) — isolées par profil via this.data ───
  // type : 'revision' | 'exam' | 'cas'. payload = instantané de la session.
  saveProgress(type, payload) {
    if (!this.data) return;
    if (!this.data.inProgress) this.data.inProgress = {};
    this.data.inProgress[type] = Object.assign({}, payload, { savedAt: Date.now() });
    this.save();
  },
  getProgress(type) {
    if (!this.data || !this.data.inProgress) return null;
    return this.data.inProgress[type] || null;
  },
  clearProgress(type) {
    if (!this.data || !this.data.inProgress) return;
    if (this.data.inProgress[type]) { delete this.data.inProgress[type]; this.save(); }
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
    earned: s => { let t = 0, c = 0; Object.values(s.data.questionStats).forEach(q => { t += q.seen; c += q.correct; }); return t >= 50 && c / t >= 0.8; } },
  { id: 'clinicien',   nom: 'Clinicien',    desc: 'Résoudre 3 cas pratiques', icon: 'clipboard',
    earned: s => Object.keys(s.data.casDone || {}).length >= 3 },
  { id: 'praticien',   nom: 'Praticien',    desc: 'Résoudre 6 cas pratiques', icon: 'clipboard',
    earned: s => Object.keys(s.data.casDone || {}).length >= 6 },
  { id: 'assidu-14',   nom: 'Inarrêtable',  desc: '14 jours d\'affilée', icon: 'flame',
    earned: s => (s.data.dailyStreak || 0) >= 14 || (s.data.bestDailyStreak || 0) >= 14 },
  { id: 'examinateur', nom: 'Examinateur',  desc: 'Passer 3 examens blancs', icon: 'edit',
    earned: s => (s.data.examSessions || []).length >= 3 },
  { id: 'defi-7',      nom: 'Relève-défi',  desc: 'Relever 7 défis du jour', icon: 'zap',
    earned: s => Object.keys(s.data.challenges || {}).length >= 7 },
  { id: 'studieux',    nom: 'Studieux',     desc: 'Terminer une série de fiches', icon: 'layers',
    earned: s => (s.data.fichesSeries || 0) >= 1 },
  { id: 'fiche-pro',   nom: 'Fiche pro',    desc: 'Terminer 5 séries de fiches', icon: 'layers',
    earned: s => (s.data.fichesSeries || 0) >= 5 },
  { id: 'niveau-10',   nom: 'Niveau 10',    desc: 'Atteindre le niveau 10', icon: 'star',
    earned: s => s.levelInfo().level >= 10 }
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
  'volume-x':  '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>',
  search:      '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  network:     '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5 6.6 16.8M12 11.5l5.4 5.3"/>',
  sparkles:    '<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 14l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  send:        '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  message:     '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  play:        '<polygon points="5 3 19 12 5 21 5 3"/>',
  mic:         '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>'
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
//  CODE D'ACCÈS GLOBAL  (avant toute création de compte)
//  Le mot de passe d'accès n'est JAMAIS en clair : seule son empreinte
//  SHA-256 salée est présente ici. Vérification par comparaison + anti-
//  bruteforce (blocage temporaire). Une fois validé, l'appareil est
//  autorisé (jeton local). Voir docs/SECURITE.md.
// ═══════════════════════════════════════════════════════════════
const ACCESS_KEY   = 'naturoapp_access';
const ACCESS_SALT  = 'naturoapp-access-v1';
const ACCESS_HASH  = '4a26b74c85a379bb9f2f22039ca4142741e5208b0f633c01806011a3479bcdee';
const ACCESS_TOKEN = '139a58d60403d1a6d5c6d27450c10e74f62883da29476203778ad9af6799ad2e';

function isAccessGranted() {
  try { return localStorage.getItem(ACCESS_KEY) === ACCESS_TOKEN; } catch (e) { return false; }
}
async function verifyAccess(input) {
  const h = await sha256Hex(ACCESS_SALT + ':' + input);
  if (h === ACCESS_HASH) { try { localStorage.setItem(ACCESS_KEY, ACCESS_TOKEN); } catch (e) {} return true; }
  return false;
}

function gateAccess(onDone) {
  document.body.classList.add('app-locked');
  const screen = document.createElement('div');
  screen.id = 'lock-screen';
  screen.className = 'lock-screen';
  document.body.appendChild(screen);

  let fails = 0, lockedUntil = 0;

  screen.innerHTML = `
    <div class="lock-card">
      <div class="lock-logo">${icon('lock')}</div>
      <h1 class="lock-title">Accès réservé</h1>
      <p class="lock-sub">Cette application est privée. Entre le code d'accès pour continuer.</p>
      <form class="lock-form" id="acc-form">
        <div class="pw-field">
          <input type="password" id="acc-input" autocomplete="off" autocapitalize="off" placeholder="Code d'accès" />
          <button type="button" class="pw-toggle" id="acc-toggle" aria-label="Afficher">${icon('eye')}</button>
        </div>
        <div class="lock-error" id="acc-error"></div>
        <button class="btn btn-primary btn-lg w-full" type="submit" id="acc-submit">Entrer</button>
      </form>
    </div>`;
  hydrateIcons(screen);

  const input = screen.querySelector('#acc-input');
  const err = screen.querySelector('#acc-error');
  const submit = screen.querySelector('#acc-submit');

  screen.querySelector('#acc-toggle').addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password'; input.focus();
  });

  function throttle() {
    submit.disabled = true;
    (function tick() {
      const left = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (left <= 0) { fails = 0; submit.disabled = false; err.textContent = ''; return; }
      err.textContent = `Trop d'essais. Réessaie dans ${left} s.`;
      setTimeout(tick, 500);
    })();
  }

  screen.querySelector('#acc-form').addEventListener('submit', async e => {
    e.preventDefault();
    if (Date.now() < lockedUntil) return;
    const ok = await verifyAccess(input.value);
    if (ok) {
      screen.classList.add('unlocking');
      setTimeout(() => { screen.remove(); document.body.classList.remove('app-locked'); onDone(); }, 300);
    } else {
      fails++; input.value = '';
      const card = screen.querySelector('.lock-card');
      card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 450);
      if (fails >= 5) { lockedUntil = Date.now() + 15000; throttle(); }
      else { err.textContent = 'Code incorrect.'; input.focus(); }
    }
  });
  setTimeout(() => input.focus(), 60);
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

// ── Reconnaissance vocale (dictée / réponses orales) ────────────
const stt = {
  supported() { return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window; },
  _rec: null,
  // onResult(texteCourant) à chaque mise à jour ; onEnd(texteFinal) à la fin.
  start(onResult, onEnd) {
    if (!this.supported()) return false;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'fr-FR'; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let finalT = '';
    r.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t; else interim += t;
      }
      if (onResult) onResult((finalT + ' ' + interim).trim());
    };
    r.onerror = () => {};
    r.onend = () => { this._rec = null; if (onEnd) onEnd(finalT.trim()); };
    this._rec = r;
    try { r.start(); } catch (e) { this._rec = null; return false; }
    return true;
  },
  stop() { if (this._rec) { try { this._rec.stop(); } catch (e) {} } },
  listening() { return !!this._rec; }
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

// ═══════════════════════════════════════════════════════════════
//  SYNC CLOUD (Supabase) — la progression suit l'utilisateur
//  d'un appareil à l'autre. Auth e-mail/mot de passe + RLS.
//  Si non configuré (supabase-config.js placeholder), tout reste
//  local (système de profils PIN) : aucune régression.
// ═══════════════════════════════════════════════════════════════
const Cloud = (function () {
  let client = null, user = null, pushTimer = null, bound = false;

  function configured() {
    const url = window.SUPABASE_URL, key = window.SUPABASE_ANON_KEY;
    return typeof url === 'string' && typeof key === 'string'
      && url && key
      && !/YOUR-PROJECT|YOUR-ANON/.test(url + key)
      && !!(window.supabase && window.supabase.createClient);
  }
  function enabled() { return configured(); }
  function currentUser() { return user; }

  function getClient() {
    if (!client && configured()) {
      try { client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY); }
      catch (e) { console.warn('[cloud] createClient', e); client = null; }
    }
    return client;
  }

  function displayName(u) {
    return (u && u.user_metadata && u.user_metadata.display_name)
      || (u && u.email ? u.email.split('@')[0] : 'Moi');
  }

  // Crée/maj une entrée de profil locale pour l'utilisateur cloud :
  // permet de réutiliser tout le moteur State + currentProfile() sans le réécrire.
  function ensureLocalProfile(u) {
    const name = displayName(u);
    const o = Profiles._load();
    let p = o.profiles.find(x => x.id === u.id);
    if (!p) {
      o.profiles.push({ id: u.id, name, auth: { method: 'cloud' }, createdAt: Date.now(), cloud: true });
      Profiles._save(o);
    } else if (name && p.name !== name) { p.name = name; Profiles._save(o); }
    try { sessionStorage.setItem(ACTIVE_KEY, u.id); } catch (e) {}
  }

  function readLocal(id) {
    try { return JSON.parse(localStorage.getItem(Profiles.dataKey(id))); } catch (e) { return null; }
  }

  // Cherche la progression locale la plus « riche » d'un autre profil
  // (pour migrer le compte local existant vers le 1er compte cloud).
  function richestLocalData(excludeId) {
    let best = null, bestScore = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || k.indexOf('naturoapp_data_') !== 0) continue;
      if (k === Profiles.dataKey(excludeId)) continue;
      let d; try { d = JSON.parse(localStorage.getItem(k)); } catch (e) { continue; }
      if (!d || !d.questionStats) continue;
      let score = 0;
      Object.values(d.questionStats).forEach(s => { score += (s.seen || 0); });
      score += Object.keys(d.lessonsRead || {}).length * 3 + (d.xp || 0) / 10;
      if (score > bestScore) { bestScore = score; best = d; }
    }
    return bestScore > 0 ? best : null;
  }

  async function pull() {
    const c = getClient(); if (!c || !user) return null;
    try {
      const { data, error } = await c.from('user_progress')
        .select('data, updated_at').eq('user_id', user.id).maybeSingle();
      if (error) { console.warn('[cloud] pull', error.message); return null; }
      return data;
    } catch (e) { console.warn('[cloud] pull ex', e); return null; }
  }

  async function pushData(dataObj) {
    const c = getClient(); if (!c || !user || !dataObj) return false;
    try {
      const { error } = await c.from('user_progress').upsert({
        user_id: user.id,
        display_name: displayName(user),
        data: dataObj,
        updated_at: new Date(dataObj.updatedAt || Date.now()).toISOString()
      }, { onConflict: 'user_id' });
      if (error) { console.warn('[cloud] push', error.message); return false; }
      return true;
    } catch (e) { console.warn('[cloud] push ex', e); return false; }
  }

  let dirty = false;
  function schedulePush() {
    if (!enabled() || !user) return;
    dirty = true;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(flush, 2000);
  }
  // Envoie la dernière version si nécessaire ; garde `dirty` si l'envoi échoue
  // (hors-ligne) pour réessayer au retour du réseau / à la fermeture de l'onglet.
  async function flush() {
    if (!dirty || !user || !State.data) return;
    if (!navigator.onLine) return;
    clearTimeout(pushTimer);
    const ok = await pushData(State.data);
    if (ok) dirty = false;
  }

  // « Quantité » de progression d'un jeu de données (pour ne jamais écraser
  // une vraie progression par un compte vide).
  function activityScore(d) {
    if (!d || !d.questionStats) return 0;
    let s = 0;
    Object.values(d.questionStats).forEach(q => { s += (q.seen || 0); });
    s += (d.examSessions || []).length * 5 + (d.revisionSessions || []).length * 2;
    s += Object.keys(d.lessonsRead || {}).length * 2 + Object.keys(d.casDone || {}).length * 3;
    s += (d.xp || 0) / 10;
    return s;
  }

  // Réconcilie local ↔ cloud AVANT que les pages n'appellent State.init().
  // Règle : on garde TOUJOURS la progression la plus fournie ; à activité égale,
  // le plus récent (updatedAt) gagne. Un cloud vide n'écrase jamais un local rempli.
  async function reconcile() {
    const key = Profiles.dataKey(user.id);
    let local = readLocal(user.id);

    const cloud = await pull();
    const cloudHasData = !!(cloud && cloud.data && cloud.data.questionStats && activityScore(cloud.data) > 0);

    // Compte cloud neuf + progression déjà sur cet appareil → proposer l'import (avec consentement,
    // pour ne pas aspirer par erreur les données d'un autre profil sur un appareil partagé).
    if (activityScore(local) === 0 && !cloudHasData) {
      const legacy = richestLocalData(user.id);
      if (legacy && activityScore(legacy) > 0 &&
          confirm('Une progression existe déjà sur cet appareil. L\'importer dans ce compte pour la synchroniser ?')) {
        local = legacy;
      }
    }
    const cloudData = (cloud && cloud.data && cloud.data.questionStats) ? cloud.data : null;

    const ls = activityScore(local), cs = activityScore(cloudData);
    let winner;
    if (cs > 0 && ls === 0) winner = cloudData;            // seul le cloud a de la progression
    else if (ls > 0 && cs === 0) winner = local;           // seul le local en a → on migre
    else if (cs > 0 && ls > 0) {                           // les deux : le plus récent gagne
      winner = ((cloudData.updatedAt || 0) >= ((local && local.updatedAt) || 0)) ? cloudData : local;
    } else winner = cloudData || local;                    // les deux vides

    if (winner) localStorage.setItem(key, JSON.stringify(winner));
    if (winner && winner !== cloudData) await pushData(winner);  // pousser ce qui vient du local
  }

  let _onAuth = null;
  function bindAuthEvents() {
    if (bound) return; bound = true;
    const c = getClient(); if (!c) return;
    c.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        try { sessionStorage.removeItem(ACTIVE_KEY); } catch (e) {}
        location.reload();
      } else if (event === 'PASSWORD_RECOVERY' && _onAuth) {
        renderAuth(_onAuth, { mode: 'reset' });   // filet : lien « mot de passe oublié » ouvert
      }
    });
    // Fiabilité de la sync : pousse les changements en attente au bon moment.
    window.addEventListener('online', flush);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
    window.addEventListener('pagehide', flush);
  }

  async function signOut() {
    const c = getClient();
    try { if (c) await c.auth.signOut(); } catch (e) {}
    try { sessionStorage.removeItem(ACTIVE_KEY); } catch (e) {}
    location.reload();
  }

  async function updatePassword(pw) {
    const c = getClient(); if (!c) return { error: { message: 'Cloud indisponible' } };
    return c.auth.updateUser({ password: pw });
  }

  function translateErr(ex) {
    const m = (ex && ex.message) || '';
    if (/invalid login|invalid credentials/i.test(m)) return 'E-mail ou mot de passe incorrect.';
    if (/already registered|already been registered|user already exists/i.test(m)) return 'Un compte existe déjà avec cet e-mail.';
    if (/email.*invalid|invalid.*email/i.test(m)) return 'Adresse e-mail invalide.';
    if (/password/i.test(m)) return 'Mot de passe trop court (6 caractères minimum).';
    if (/network|fetch/i.test(m)) return 'Problème de connexion. Vérifie ton accès Internet.';
    return m || 'Une erreur est survenue. Réessaie.';
  }

  // Logos de marque (SVG inline — multicolores, hors set d'icônes monochrome).
  const GOOGLE_SVG = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22 22-9.8 22-22c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 7.1 29.6 5 24 5 16.3 5 9.7 9.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 43c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5C29.6 33.6 27 35 24 35c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.6 38.6 16.2 43 24 43z"/><path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.5C41.4 36.9 44 31.6 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>';
  const APPLE_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.3 5.9c.6-.8 1.1-1.9.9-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.3-.6 3-1.4z"/></svg>';

  async function oauth(provider, errEl) {
    const c = getClient(); if (!c) return;
    try {
      const { error } = await c.auth.signInWithOAuth({
        provider,
        options: { redirectTo: location.origin + location.pathname }
      });
      if (error) throw error;
      // succès → redirection vers le fournisseur en cours
    } catch (ex) {
      if (errEl) errEl.textContent = translateErr(ex);
    }
  }

  // ───────── Écran d'authentification cloud (4 modes) ─────────
  //  'signin' · 'signup' · 'forgot' (envoi du lien) · 'reset' (nouveau mdp)
  function renderAuth(onAuth, opts) {
    opts = opts || {};
    document.body.classList.add('app-locked');
    let screen = document.getElementById('lock-screen');
    if (!screen) { screen = document.createElement('div'); screen.id = 'lock-screen'; screen.className = 'lock-screen'; document.body.appendChild(screen); }
    let mode = opts.mode || 'signin';

    const SUB = {
      signin: 'Connecte-toi pour retrouver ta progression sur tous tes appareils.',
      signup: 'Crée ton compte — ta progression te suivra partout.',
      forgot: 'Saisis ton e-mail : on t\'envoie un lien pour réinitialiser ton mot de passe.',
      reset:  'Choisis ton nouveau mot de passe.'
    };
    const CTA = { signin: 'Se connecter', signup: 'Créer mon compte', forgot: 'Envoyer le lien', reset: 'Enregistrer' };

    function done(u) {
      screen.classList.add('unlocking');
      setTimeout(() => { screen.remove(); document.body.classList.remove('app-locked'); }, 250);
    }

    function paint() {
      const tabs = (mode === 'signin' || mode === 'signup') ? `
        <div class="cloud-tabs" role="tablist">
          <button type="button" class="cloud-tab ${mode === 'signin' ? 'active' : ''}" data-go="signin">Se connecter</button>
          <button type="button" class="cloud-tab ${mode === 'signup' ? 'active' : ''}" data-go="signup">Créer un compte</button>
        </div>` : '';

      const pwField = `
        <div class="pw-field">
          <input type="password" id="cl-pw" placeholder="${mode === 'reset' ? 'Nouveau mot de passe' : 'Mot de passe'}" autocomplete="${mode === 'signin' ? 'current-password' : 'new-password'}" />
          <button type="button" class="pw-toggle" id="cl-toggle" aria-label="Afficher le mot de passe">${icon('eye')}</button>
        </div>`;

      let fields;
      if (mode === 'forgot') fields = `<input type="email" id="cl-email" placeholder="Adresse e-mail" autocomplete="email" inputmode="email" />`;
      else if (mode === 'reset') fields = pwField;
      else fields = `
        ${mode === 'signup' ? `<input type="text" id="cl-name" placeholder="Ton prénom" autocomplete="given-name" maxlength="40" />` : ''}
        <input type="email" id="cl-email" placeholder="Adresse e-mail" autocomplete="email" inputmode="email" />
        ${pwField}
        ${mode === 'signin' ? `<button type="button" class="lock-forgot" id="cl-forgot">Mot de passe oublié ?</button>` : ''}`;

      const back = (mode === 'forgot' || mode === 'reset')
        ? `<button class="lock-add" id="cl-back">${icon('arrow-left')} Retour à la connexion</button>` : '';

      const PROVIDERS = Array.isArray(window.SUPABASE_OAUTH) ? window.SUPABASE_OAUTH : [];
      const META = {
        google: { label: 'Continuer avec Google', svg: GOOGLE_SVG },
        apple:  { label: 'Continuer avec Apple',  svg: APPLE_SVG }
      };
      const social = ((mode === 'signin' || mode === 'signup') && PROVIDERS.length) ? `
        <div class="cloud-social">
          ${PROVIDERS.map(p => META[p] ? `<button type="button" class="social-btn" data-provider="${p}">${META[p].svg} ${META[p].label}</button>` : '').join('')}
        </div>
        <div class="cloud-or"><span>ou par e-mail</span></div>` : '';

      screen.innerHTML = `
        <div class="lock-card cloud-auth">
          <div class="lock-logo">${icon('leaf')}</div>
          <h1 class="lock-title">NaturoApp</h1>
          <p class="lock-sub">${SUB[mode]}</p>
          ${tabs}
          ${social}
          <form class="lock-form" id="cloud-form">
            ${fields}
            <div class="lock-error" id="cl-error"></div>
            <button class="btn btn-primary btn-lg w-full" type="submit" id="cl-submit">${CTA[mode]}</button>
          </form>
          ${back}
          <div class="cloud-note">${icon('lock')} Progression sauvegardée et synchronisée sur tous tes appareils.</div>
        </div>`;
      hydrateIcons(screen);
      wire();
    }

    function setMode(m) { mode = m; paint(); }

    function wire() {
      const errSocial = screen.querySelector('#cl-error');
      screen.querySelectorAll('.social-btn').forEach(b => b.addEventListener('click', () => {
        b.disabled = true; oauth(b.dataset.provider, errSocial);
      }));
      screen.querySelectorAll('.cloud-tab').forEach(b => b.addEventListener('click', () => setMode(b.dataset.go)));
      const back = screen.querySelector('#cl-back'); if (back) back.addEventListener('click', () => setMode('signin'));
      const forgot = screen.querySelector('#cl-forgot'); if (forgot) forgot.addEventListener('click', () => setMode('forgot'));
      const toggle = screen.querySelector('#cl-toggle');
      if (toggle) toggle.addEventListener('click', () => { const i = screen.querySelector('#cl-pw'); i.type = i.type === 'password' ? 'text' : 'password'; i.focus(); });

      const form = screen.querySelector('#cloud-form');
      const err = screen.querySelector('#cl-error');
      const submitBtn = screen.querySelector('#cl-submit');

      form.addEventListener('submit', async e => {
        e.preventDefault();
        err.textContent = ''; err.classList.remove('ok');
        const emailEl = screen.querySelector('#cl-email');
        const pwEl = screen.querySelector('#cl-pw');
        const nameEl = screen.querySelector('#cl-name');
        const email = emailEl ? emailEl.value.trim() : '';
        const pw = pwEl ? pwEl.value : '';
        const name = nameEl ? nameEl.value.trim() : '';
        const c = getClient();
        const reset = () => { submitBtn.disabled = false; submitBtn.textContent = CTA[mode]; };

        try {
          if (mode === 'forgot') {
            if (!email) { err.textContent = 'Indique ton e-mail.'; return; }
            if (!navigator.onLine) { err.textContent = 'Connexion Internet requise.'; return; }
            submitBtn.disabled = true; submitBtn.textContent = 'Envoi…';
            const { error } = await c.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
            if (error) throw error;
            err.classList.add('ok'); err.textContent = 'E-mail envoyé ! Ouvre le lien reçu pour choisir un nouveau mot de passe.';
            reset(); return;
          }
          if (mode === 'reset') {
            if (pw.length < 6) { err.textContent = 'Mot de passe : 6 caractères minimum.'; return; }
            submitBtn.disabled = true; submitBtn.textContent = 'Enregistrement…';
            const { data, error } = await c.auth.updateUser({ password: pw });
            if (error) throw error;
            try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
            submitBtn.textContent = 'Synchronisation…';
            await onAuth(data.user); done(); return;
          }
          // signin / signup
          if (!email || !pw) { err.textContent = 'E-mail et mot de passe requis.'; return; }
          if (mode === 'signup' && !name) { err.textContent = 'Indique ton prénom.'; return; }
          if (mode === 'signup' && pw.length < 6) { err.textContent = 'Mot de passe : 6 caractères minimum.'; return; }
          if (!navigator.onLine) { err.textContent = 'Connexion Internet requise pour la première connexion sur cet appareil.'; return; }
          submitBtn.disabled = true; submitBtn.textContent = '…';
          let res;
          if (mode === 'signup') {
            res = await c.auth.signUp({ email, password: pw, options: { data: { display_name: name } } });
            if (res.error) throw res.error;
            if (!res.data.session) {   // « Confirm email » activé côté Supabase
              err.classList.add('ok'); err.textContent = 'Compte créé ! Confirme via l\'e-mail reçu, puis connecte-toi.';
              reset(); return;
            }
          } else {
            res = await c.auth.signInWithPassword({ email, password: pw });
            if (res.error) throw res.error;
          }
          submitBtn.textContent = 'Synchronisation…';
          await onAuth(res.data.user);   // ensureLocalProfile + reconcile + fireReady
          done();
        } catch (ex) {
          reset();
          err.classList.remove('ok'); err.textContent = translateErr(ex);
        }
      });

      setTimeout(() => { const el = screen.querySelector('#cl-name') || screen.querySelector('#cl-email') || screen.querySelector('#cl-pw'); if (el) el.focus(); }, 60);
    }

    paint();
  }

  // Récupère la session initiale de façon fiable, y compris au retour d'un
  // flux OAuth (Google/Apple) où la session arrive après l'échange du code dans l'URL.
  function getInitialSession(c) {
    return new Promise(resolve => {
      let settled = false;
      const finish = s => { if (!settled) { settled = true; resolve(s); } };
      // supabase-js émet INITIAL_SESSION une fois l'init (et l'échange OAuth) terminée.
      c.auth.onAuthStateChange((event, sess) => {
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') finish(sess);
      });
      c.auth.getSession().then(({ data }) => { if (data && data.session) finish(data.session); }).catch(() => {});
      setTimeout(() => finish(null), 6000);   // filet de sécurité
    });
  }

  function cleanAuthUrl() {
    // retire ?code=…&state=… (PKCE) ou le hash de jeton après connexion
    if (/[?&]code=|access_token=/.test(location.search + location.hash)) {
      try { history.replaceState(null, '', location.pathname); } catch (e) {}
    }
  }

  // Point d'entrée : appelé par boot() quand le cloud est activé.
  async function start(done) {
    // Capturé AVANT la création du client (supabase-js nettoie l'URL en la parsant).
    const hadRecovery = /type=recovery/.test(location.hash || '');
    const c = getClient(); if (!c) { done(); return; }

    const onAuth = async (u) => {
      user = u;
      ensureLocalProfile(u);
      try { await reconcile(); } catch (e) { console.warn('[cloud] reconcile', e); }
      cleanAuthUrl();
      done();
    };
    _onAuth = onAuth;
    bindAuthEvents();

    // Retour d'un lien « mot de passe oublié » → écran de nouveau mot de passe
    if (hadRecovery) { renderAuth(onAuth, { mode: 'reset' }); return; }

    const session = await getInitialSession(c);
    if (session && session.user) {
      await onAuth(session.user);
    } else {
      renderAuth(onAuth);
    }
  }

  // ───────── Admin (sécurité = RLS Supabase, pas seulement le JS) ─────────
  async function isAdmin() {
    const c = getClient(); if (!c || !user) return false;
    try {
      const { data, error } = await c.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
      return !error && !!data;
    } catch (e) { return false; }
  }
  // Renvoie toutes les progressions (RLS : ne renvoie tout QUE si l'utilisateur est admin).
  async function fetchAllUsers() {
    const c = getClient(); if (!c) return null;
    try {
      const { data, error } = await c.from('user_progress').select('user_id, display_name, data, updated_at');
      if (error) { console.warn('[cloud] admin fetch', error.message); return null; }
      return data || [];
    } catch (e) { console.warn('[cloud] admin fetch ex', e); return null; }
  }

  return { enabled, start, signOut, updatePassword, schedulePush, currentUser, isAdmin, fetchAllUsers };
})();

// ── Bootstrap commun à toutes les pages ──────────────────────────
function boot() {
  migrateLegacy();
  hydrateIcons();
  applyTheme();
  registerSW();

  // Bascule de thème (clair/sombre)
  const themeBtn = document.getElementById('nav-theme');
  if (themeBtn) themeBtn.addEventListener('click', () => { toggleTheme(); });

  // Recherche universelle (bouton nav + raccourci Ctrl/Cmd+K)
  const searchBtn = document.getElementById('nav-search');
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') closeSearch();
  });

  // Bouton de verrouillage / changement de compte (si présent dans la nav)
  const lockBtn = document.getElementById('nav-lock');
  if (lockBtn) lockBtn.addEventListener('click', () => {
    if (Cloud.enabled()) { Cloud.signOut(); }            // déconnexion du compte cloud
    else { Profiles.clearActive(); location.reload(); }  // verrouillage local (PIN)
  });

  // Cloud activé → connexion e-mail/mot de passe (multi-appareils).
  if (Cloud.enabled()) {
    Cloud.start(fireReady);
    return;
  }

  // Sinon : 1) code d'accès global (1re fois sur l'appareil), 2) puis comptes locaux
  if (isAccessGranted()) {
    afterAccess();
  } else {
    gateAccess(afterAccess);
  }
}

function afterAccess() {
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
//  RAPPEL D'INACTIVITÉ — prévient si trop de jours sans exercice
//  Désactivable par l'utilisateur (Réglages). Réglages device-level.
// ═══════════════════════════════════════════════════════════════
const INACTIF_ON   = 'naturoapp_inactif';        // '1' (défaut) | '0'
const INACTIF_DAYS = 'naturoapp_inactif_days';   // seuil en jours (défaut 3)
const INACTIF_LAST = 'naturoapp_inactif_last';   // dernier rappel affiché (YYYY-MM-DD)

function reminderOn()    { try { return localStorage.getItem(INACTIF_ON) !== '0'; } catch (e) { return true; } }
function setReminderOn(b){ try { localStorage.setItem(INACTIF_ON, b ? '1' : '0'); } catch (e) {} }
function reminderDays()  { const n = parseInt(localStorage.getItem(INACTIF_DAYS) || '3', 10); return (n >= 1 && n <= 30) ? n : 3; }
function setReminderDays(n){ try { localStorage.setItem(INACTIF_DAYS, String(n)); } catch (e) {} }

function inactivityDays() {
  const d = State.data; if (!d) return 0;
  const ref = d.lastStudyDay || (d.createdAt ? new Date(d.createdAt).toISOString().slice(0, 10) : null);
  if (!ref) return 0;
  const p = ref.split('-').map(Number);
  const last = Date.UTC(p[0], p[1] - 1, p[2]);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.floor((today - last) / 86400000));
}

function showReminderToast(days) {
  const host = document.getElementById('toast-container');
  const msg = `Ça fait ${days} jour${days > 1 ? 's' : ''} sans révision — reprends quelques minutes 💪`;
  if (host) {
    const el = document.createElement('div');
    el.className = 'toast toast-info';
    el.style.cursor = 'pointer';
    el.innerHTML = `${icon('flame')} <span>${msg}</span>`;
    el.addEventListener('click', () => { location.href = 'revision.html?mode=smart'; });
    host.appendChild(el);
    hydrateIcons(el);
    setTimeout(() => el.remove(), 9000);
  }
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification('NaturoApp 🌿', { body: msg, icon: 'icons/icon-192.png', tag: 'naturoapp-inactif' }); } catch (e) {}
  }
}

function maybeRemind() {
  if (!reminderOn() || !State.data) return;
  if (inactivityDays() < reminderDays()) return;
  const today = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem(INACTIF_LAST) === today) return;   // 1 rappel/jour max
  try { localStorage.setItem(INACTIF_LAST, today); } catch (e) {}
  setTimeout(() => showReminderToast(inactivityDays()), 1200);
}
onReady(maybeRemind);

// ═══════════════════════════════════════════════════════════════
//  SUIVI D'USAGE — temps passé, dernière activité (pour /admin)
//  Stocké dans les données du profil → synchronisé dans le cloud.
// ═══════════════════════════════════════════════════════════════
function startUsageTracking() {
  const d = State.data; if (!d) return;
  if (!d.usage) d.usage = { totalSeconds: 0, lastActiveAt: null, sessions: 0, firstSeenAt: d.createdAt || Date.now() };
  d.usage.sessions = (d.usage.sessions || 0) + 1;
  d.usage.lastActiveAt = Date.now();
  try { const u = Cloud.currentUser && Cloud.currentUser(); if (u && u.email && d.email !== u.email) d.email = u.email; } catch (e) {}
  State.save();

  const STEP = 20;   // secondes
  setInterval(() => {
    if (document.visibilityState !== 'visible' || !State.data) return;
    if (!State.data.usage) State.data.usage = { totalSeconds: 0, lastActiveAt: null, sessions: 1 };
    State.data.usage.totalSeconds = (State.data.usage.totalSeconds || 0) + STEP;
    State.data.usage.lastActiveAt = Date.now();
    State.save();
  }, STEP * 1000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && State.data && State.data.usage) {
      State.data.usage.lastActiveAt = Date.now(); State.save();
    }
  });

  collectTech();
}
onReady(startUsageTracking);

// ═══════════════════════════════════════════════════════════════
//  INFOS TECHNIQUES — appareil, navigateur, IP, localisation (admin)
//  Stockées dans le profil → synchronisées. Géoloc IP : 1×/jour.
// ═══════════════════════════════════════════════════════════════
function parseUA(ua) {
  ua = ua || '';
  let os = 'Inconnu';
  if (/Windows NT/.test(ua)) os = 'Windows';
  else if (/iPhone|iPod/.test(ua)) os = 'iOS';
  else if (/iPad/.test(ua)) os = 'iPadOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Linux/.test(ua)) os = 'Linux';
  let br = 'Inconnu';
  if (/Edg\//.test(ua)) br = 'Edge';
  else if (/SamsungBrowser/.test(ua)) br = 'Samsung Internet';
  else if (/OPR\/|Opera/.test(ua)) br = 'Opera';
  else if (/Firefox\//.test(ua)) br = 'Firefox';
  else if (/CriOS/.test(ua)) br = 'Chrome (iOS)';
  else if (/Chrome\//.test(ua)) br = 'Chrome';
  else if (/Safari\//.test(ua)) br = 'Safari';
  const device = /iPad|Tablet/.test(ua) ? 'Tablette' : (/Mobile|iPhone|Android/.test(ua) ? 'Mobile' : 'Ordinateur');
  return { os, browser: br, device };
}
function collectTech() {
  const d = State.data; if (!d) return;
  if (!d.tech) d.tech = {};
  const t = d.tech, p = parseUA(navigator.userAgent);
  t.ua = navigator.userAgent;
  t.os = p.os; t.browser = p.browser; t.device = p.device;
  t.lang = navigator.language || '';
  try { t.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
  try { t.screen = window.screen ? (screen.width + '×' + screen.height) : ''; } catch (e) {}
  t.standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  t.updatedAt = Date.now();
  State.save();
  // Géolocalisation par IP (API gratuite, sans clé) — au plus 1×/jour.
  const stale = !t.geoAt || (Date.now() - t.geoAt > 86400000);
  if (stale && navigator.onLine) {
    fetch('https://ipwho.is/').then(r => r.json()).then(j => {
      if (j && j.success) {
        t.ip = j.ip; t.country = j.country; t.region = j.region; t.city = j.city;
        t.isp = (j.connection && (j.connection.isp || j.connection.org)) || '';
        t.geoAt = Date.now(); State.save();
      }
    }).catch(() => {});
  }
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

// ═══════════════════════════════════════════════════════════════
//  RECHERCHE UNIVERSELLE  (questions, cours, cas, glossaire)
// ═══════════════════════════════════════════════════════════════
function searchAll(query) {
  const q = (query || '').trim().toLowerCase();
  if (q.length < 2) return [];
  const C = window.NATURO_CONTENT || { cours: [], glossaire: [], casPratiques: [] };
  const res = [];
  QUESTIONS.forEach(qq => {
    const hay = (qq.sujet + ' ' + qq.question + ' ' + qq.categorie + ' ' + (qq.options || []).join(' ') + ' ' + (qq.explication || '') + ' ' + (qq.tags || []).join(' ')).toLowerCase();
    if (hay.includes(q))
      res.push({ type: 'Question', icon: 'help-circle', label: 'Q' + qq.id + ' · ' + qq.sujet, sub: qq.categorie, href: 'revision.html?id=' + qq.id });
  });
  (C.cours || []).forEach(c => {
    const hay = (c.titre + ' ' + (c.resume || '') + ' ' + (c.pointsCles || []).join(' ') + ' ' + (c.definitions || []).map(d => d.terme + ' ' + d.def).join(' ')).toLowerCase();
    if (hay.includes(q)) res.push({ type: 'Cours', icon: 'book', label: c.titre, sub: c.categorie, href: 'cours.html?open=' + c.id });
  });
  (C.casPratiques || []).forEach(cas => {
    if ((cas.titre + ' ' + cas.profil.nom + ' ' + cas.profil.motif).toLowerCase().includes(q))
      res.push({ type: 'Cas', icon: 'clipboard', label: cas.titre, sub: cas.profil.nom + ', ' + cas.profil.age + ' ans', href: 'cas.html?id=' + cas.id });
  });
  const terms = [], seen = new Set();
  (C.glossaire || []).forEach(g => terms.push({ terme: g.terme, def: g.definition }));
  (C.cours || []).forEach(c => (c.definitions || []).forEach(d => terms.push({ terme: d.terme, def: d.def })));
  terms.forEach(t => {
    const k = t.terme.toLowerCase();
    if (seen.has(k)) return; seen.add(k);
    if ((t.terme + ' ' + t.def).toLowerCase().includes(q)) res.push({ type: 'Terme', icon: 'tag', label: t.terme, sub: t.def, href: 'cours.html' });
  });
  return res.slice(0, 30);
}

let _searchEl = null;
function buildSearch() {
  _searchEl = document.createElement('div');
  _searchEl.className = 'search-overlay';
  _searchEl.innerHTML =
    '<div class="search-panel">' +
      '<div class="search-bar2">' +
        '<span class="search-bar2__ico">' + icon('search') + '</span>' +
        '<input id="search-input" type="text" autocomplete="off" placeholder="Rechercher une question, un cours, un terme…">' +
        '<button class="search-close" id="search-close" aria-label="Fermer">' + icon('x') + '</button>' +
      '</div>' +
      '<div class="search-results" id="search-results"></div>' +
    '</div>';
  document.body.appendChild(_searchEl);
  const inp = _searchEl.querySelector('#search-input');
  inp.addEventListener('input', () => renderSearchResults(inp.value));
  _searchEl.querySelector('#search-close').addEventListener('click', closeSearch);
  _searchEl.addEventListener('click', e => { if (e.target === _searchEl) closeSearch(); });
}
function renderSearchResults(query) {
  const host = _searchEl.querySelector('#search-results');
  const q = (query || '').trim();
  if (q.length < 2) { host.innerHTML = '<div class="search-empty">Tape au moins 2 lettres…</div>'; return; }
  const results = searchAll(q);
  if (!results.length) { host.innerHTML = '<div class="search-empty">Aucun résultat pour « ' + escapeHtml(q) + ' ».</div>'; return; }
  host.innerHTML = results.map(r =>
    '<a class="search-item" href="' + r.href + '">' +
      '<span class="search-item__ico">' + icon(r.icon) + '</span>' +
      '<span class="search-item__txt"><span class="search-item__label">' + escapeHtml(r.label) + '</span><span class="search-item__sub">' + escapeHtml(r.sub || '') + '</span></span>' +
      '<span class="search-item__tag">' + r.type + '</span>' +
    '</a>').join('');
}
function openSearch() {
  if (document.body.classList.contains('app-locked')) return;   // pas avant déverrouillage
  if (!_searchEl) buildSearch();
  _searchEl.classList.add('open');
  const inp = _searchEl.querySelector('#search-input');
  inp.value = ''; renderSearchResults('');
  setTimeout(() => inp.focus(), 30);
}
function closeSearch() { if (_searchEl) _searchEl.classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
//  TUTEUR IA — multi-fournisseurs (Claude, GPT, DeepSeek, Qwen…)
//  Les clés ne sont JAMAIS dans le code : l'utilisateur colle les
//  siennes dans les Réglages ; les appels partent du navigateur vers
//  le fournisseur choisi. `shape` = format de l'API :
//   'anthropic'  → /v1/messages (Claude)
//   'openai'     → /chat/completions (OpenAI ET compatibles chinois)
// ═══════════════════════════════════════════════════════════════
// `browserOk:true` = appel direct navigateur garanti (CORS autorisé).
// Les autres peuvent nécessiter un proxy selon le fournisseur.
const AI_PROVIDERS = [
  { id: 'openai', nom: 'GPT (OpenAI) ✓', shape: 'openai', browserOk: true,
    url: 'https://api.openai.com/v1/chat/completions', hint: 'sk-…', where: 'platform.openai.com',
    models: [
      { id: 'gpt-4o-mini', nom: 'GPT-4o mini — éco (conseillé)' },
      { id: 'gpt-4o',      nom: 'GPT-4o' },
      { id: 'gpt-4.1-mini', nom: 'GPT-4.1 mini' },
      { id: 'gpt-4.1',     nom: 'GPT-4.1' } ] },
  { id: 'anthropic', nom: 'Claude (Anthropic) ✓', shape: 'anthropic', browserOk: true,
    url: 'https://api.anthropic.com/v1/messages', hint: 'sk-ant-…', where: 'console.anthropic.com',
    models: [
      { id: 'claude-haiku-4-5',  nom: 'Haiku 4.5 — rapide & éco' },
      { id: 'claude-sonnet-4-6', nom: 'Sonnet 4.6 — équilibré' },
      { id: 'claude-opus-4-8',   nom: 'Opus 4.8 — le top' } ] },
  { id: 'gemini', nom: 'Gemini (Google) — palier gratuit', shape: 'openai', browserOk: false,
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', hint: 'AIza…', where: 'aistudio.google.com',
    models: [
      { id: 'gemini-2.0-flash', nom: 'Gemini 2.0 Flash — éco' },
      { id: 'gemini-2.5-flash', nom: 'Gemini 2.5 Flash' },
      { id: 'gemini-1.5-flash', nom: 'Gemini 1.5 Flash' } ] },
  { id: 'mistral', nom: 'Mistral (français)', shape: 'openai', browserOk: false,
    url: 'https://api.mistral.ai/v1/chat/completions', hint: '…', where: 'console.mistral.ai',
    models: [
      { id: 'mistral-small-latest', nom: 'Mistral Small — éco' },
      { id: 'open-mistral-nemo',    nom: 'Mistral Nemo — éco' },
      { id: 'mistral-large-latest', nom: 'Mistral Large' } ] },
  { id: 'deepseek', nom: 'DeepSeek (très économique)', shape: 'openai', browserOk: false,
    url: 'https://api.deepseek.com/v1/chat/completions', hint: 'sk-…', where: 'platform.deepseek.com',
    models: [
      { id: 'deepseek-chat',     nom: 'DeepSeek V3 — très éco' },
      { id: 'deepseek-reasoner', nom: 'DeepSeek R1 — raisonnement' } ] },
  { id: 'qwen', nom: 'Qwen (Alibaba)', shape: 'openai', browserOk: false,
    url: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', hint: 'sk-…', where: 'dashscope (Alibaba Cloud)',
    models: [
      { id: 'qwen-turbo', nom: 'Qwen Turbo — éco' },
      { id: 'qwen-plus',  nom: 'Qwen Plus' },
      { id: 'qwen-max',   nom: 'Qwen Max' } ] },
  { id: 'moonshot', nom: 'Kimi (Moonshot)', shape: 'openai', browserOk: false,
    url: 'https://api.moonshot.ai/v1/chat/completions', hint: 'sk-…', where: 'platform.moonshot.ai',
    models: [
      { id: 'moonshot-v1-8k',  nom: 'Moonshot v1 8k' },
      { id: 'moonshot-v1-32k', nom: 'Moonshot v1 32k' } ] },
  { id: 'zhipu', nom: 'GLM (Zhipu)', shape: 'openai', browserOk: false,
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions', hint: 'votre clé', where: 'bigmodel.cn',
    models: [
      { id: 'glm-4-flash', nom: 'GLM-4 Flash — gratuit/éco' },
      { id: 'glm-4-air',   nom: 'GLM-4 Air' },
      { id: 'glm-4-plus',  nom: 'GLM-4 Plus' } ] }
];

const AI_PROV_LS = 'naturoapp_ai_provider';
const AI_MODEL_LS = 'naturoapp_ai_model';
const AI_KEYS_LS = 'naturoapp_ai_keys';   // { providerId: key }

// Migration de l'ancienne clé Anthropic unique → nouveau format
try {
  const old = localStorage.getItem('naturoapp_ai_key');
  if (old) {
    const o = JSON.parse(localStorage.getItem(AI_KEYS_LS) || '{}');
    if (!o.anthropic) { o.anthropic = old; localStorage.setItem(AI_KEYS_LS, JSON.stringify(o)); }
    localStorage.removeItem('naturoapp_ai_key');
  }
} catch (e) {}

function _aiKeys() { try { return JSON.parse(localStorage.getItem(AI_KEYS_LS) || '{}'); } catch (e) { return {}; } }
function getAIProvider() {
  try {
    const saved = localStorage.getItem(AI_PROV_LS);
    if (saved) return saved;
    const keys = _aiKeys();                        // sinon : 1er fournisseur déjà configuré…
    const withKey = AI_PROVIDERS.find(p => keys[p.id]);
    return withKey ? withKey.id : 'openai';        // …ou GPT-4o mini par défaut (éco + fiable)
  } catch (e) { return 'openai'; }
}
function setAIProvider(p) { try { localStorage.setItem(AI_PROV_LS, p); } catch (e) {} }
function getAIProviderConfig(id) { return AI_PROVIDERS.find(p => p.id === (id || getAIProvider())) || AI_PROVIDERS[0]; }
function getAIKey(provider) { return _aiKeys()[provider || getAIProvider()] || ''; }
function setAIKey(provider, key) {
  const o = _aiKeys();
  if (key) o[provider] = key; else delete o[provider];
  try { localStorage.setItem(AI_KEYS_LS, JSON.stringify(o)); } catch (e) {}
}
function getAIModel() { try { return localStorage.getItem(AI_MODEL_LS) || ''; } catch (e) { return ''; } }
function setAIModel(m) { try { localStorage.setItem(AI_MODEL_LS, m); } catch (e) {} }

// Export global
window.APP = {
  State, QUESTIONS, BADGES, shuffle, getQuestionsByDay, formatTime, getScoreColor, getGrade,
  answerKey, isMultiAnswer, isSelectionCorrect, getDailyChallenge,
  icon, hydrateIcons, escapeHtml,
  Profiles, Cloud, onReady, currentProfile,
  applyTheme, toggleTheme, setTheme, getThemePref, sfx, tts, stt,
  courseToFlashcards, gardenSVG, searchAll, openSearch,
  AI_PROVIDERS, getAIProvider, setAIProvider, getAIProviderConfig,
  getAIKey, setAIKey, getAIModel, setAIModel,
  reminderOn, setReminderOn, reminderDays, setReminderDays, inactivityDays,
  animateNumber, progressRing, setRing, prefersReducedMotion, celebrate
};

})();
