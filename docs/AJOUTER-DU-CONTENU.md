# Ajouter du contenu — Guide pratique

Tout le contenu pédagogique vit dans **`content.js`**. Aucune connaissance
technique poussée n'est requise : on copie un bloc, on le remplit, on enregistre.

## Ajouter un COURS

Ouvre `content.js` et ajoute un objet dans `window.NATURO_CONTENT.cours` :

```js
{
  id: 'c-digestion',                 // unique, en kebab-case, préfixe c-
  categorie: 'Digestion',            // regroupe les cours sur la page Cours
  jour: 7,                           // optionnel (planning J1–J8)
  titre: 'Les bases de la digestion',
  resume: 'Une phrase qui donne envie de lire.',
  duree: 6,                          // minutes (optionnel)
  sections: [
    { titre: 'Introduction', contenu: 'Texte avec **gras** et *italique*.' },
    { titre: 'Le détail',    contenu: 'Ligne 1.\nLigne 2 (le \\n fait un saut de ligne).' }
  ],
  pointsCles: [ 'Idée clé 1', 'Idée clé 2' ],     // optionnel — affiché « À retenir »
  definitions: [                                   // optionnel — alimente le glossaire
    { terme: 'Enzyme', def: 'Protéine qui accélère une réaction chimique.' }
  ],
  questionIds: [ 61, 62 ]            // QCM liés → bouton « S'entraîner »
}
```

### Mise en forme du `contenu`
Pour ta **sécurité**, le texte est toujours échappé (pas de HTML brut accepté).
Tu disposes de :
- `**texte**` → **gras**
- `*texte*` → *italique*
- `\n` → saut de ligne

### Relier un cours aux QCM
`questionIds` liste les `id` de questions (du tableau `QUESTIONS` dans `app.js`).
Le bouton « S'entraîner » lance `revision.html?ids=61,62` sur ces questions.

## Ajouter un terme au GLOSSAIRE
Dans `window.NATURO_CONTENT.glossaire` :
```js
{ terme: 'Mot', definition: 'Sa définition.', categorie: 'Phytothérapie' }
```
> Astuce : les `definitions` à l'intérieur des cours apparaissent AUSSI dans le
> glossaire automatiquement (dédoublonnées). Inutile de les recopier.

## Ajouter une QUESTION de QCM
Édite le tableau `QUESTIONS` en haut de `app.js` :
```js
{
  id: 81, jour: 7, categorie: 'Digestion', sujet: 'Enzymes',
  question: 'Quel organe produit la bile ?',
  options: ['Le foie', 'L\'estomac', 'Le pancréas', 'La rate'],
  bonne: 0,                          // index (0–3) de la bonne réponse
  explication: 'Le foie produit la bile, stockée dans la vésicule.',
  piege: 'Ne pas confondre production (foie) et stockage (vésicule).',
  mnemo: 'Foie = fabrique, Vésicule = réservoir.',
  tags: ['digestion', 'bile']
}
```
> Les `id` doivent être uniques. Après ajout, certaines stats se réajustent seules
> (le code crée les compteurs manquants automatiquement).

## ⚠️ Après CHAQUE modification de contenu
Incrémente `CACHE_VERSION` dans **`sw.js`** (ex : `naturoapp-v4` → `naturoapp-v5`).
Sinon les appareils où l'app est déjà installée garderont l'ancienne version en cache.
