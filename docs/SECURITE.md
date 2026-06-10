# Sécurité — Modèle et limites

NaturoApp n'a **pas de serveur** : tout vit sur l'appareil. La sécurité est donc
un **verrou local « best effort »**, honnête sur ses limites.

## Ce qui est protégé
- **Codes jamais en clair.** PIN et mots de passe sont stockés sous forme de
  **hash SHA-256 salé** (`{ method, salt, hash, len }` par profil). Le code saisi
  est re-hashé et comparé ; on ne peut pas relire le code à partir du stockage.
- **Sel unique par compte** (`randomSalt`), via `crypto.getRandomValues` quand
  disponible.
- **Cloisonnement par profil.** Chaque compte a sa propre clé de données
  (`naturoapp_data_<id>`). Un profil ne voit pas la progression d'un autre.
- **Anti-flash.** Tant qu'aucun profil n'est déverrouillé, le contenu est masqué
  (`html.pre-lock` + classe retirée seulement après déverrouillage). Le code/contenu
  ne « clignote » pas avant l'écran de connexion.
- **Anti-injection (XSS).** Toute saisie utilisateur affichée (noms de profils,
  contenu des cours) passe par `escapeHtml()`. Le formatage des cours n'autorise
  que `**gras**`, `*italique*`, sauts de ligne — pas de HTML brut.
- **Session.** Le déverrouillage vaut pour la session de l'onglet
  (`sessionStorage`). Fermer/rouvrir l'app redemande le code. Le bouton 🔒 verrouille.

## Limites (à connaître)
- Quelqu'un avec un **accès technique au navigateur** (outils dev, fichiers
  localStorage) peut lire/effacer les données et tenter de **brute-forcer** un code
  faible hors-ligne. Un PIN à 4 chiffres ≈ 10 000 possibilités : c'est un garde-fou
  du quotidien, pas une protection contre un attaquant déterminé.
- Sans serveur, **pas de récupération** de code : « Code oublié » = repartir d'un
  nouveau compte (proposer plutôt l'export de sauvegarde, voir ci-dessous).
- En **contexte non sécurisé** (http hors localhost), `crypto.subtle` est absent →
  on utilise un SHA-256 JS pur. C'est cohérent tant qu'on reste sur le même
  hébergement (en prod : HTTPS → Web Crypto partout).

## Recommandations
- **Héberger en HTTPS** (Netlify/GitHub Pages) : active Web Crypto + PWA.
- Encourager un **mot de passe** ou un **PIN à 6 chiffres** pour les comptes sensibles.
- Proposer une **sauvegarde exportable** (`State.exportData()`/`importData()`) pour
  ne pas perdre la progression et pouvoir changer d'appareil.

## Si un jour on veut une vraie sécurité multi-appareils
Il faut un backend (comptes serveur, mots de passe hashés côté serveur type
bcrypt/argon2, sessions/JWT, HTTPS). Cela sort du périmètre « 100 % local » actuel
et change l'architecture.
