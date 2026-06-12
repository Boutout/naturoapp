/* ─────────────────────────────────────────────────────────────
   Configuration Supabase (sync cloud multi-appareils)
   -------------------------------------------------------------
   Remplace les 2 valeurs ci-dessous par celles de TON projet :
     Supabase → Project Settings → API
       • Project URL      →  SUPABASE_URL
       • clé "anon public" →  SUPABASE_ANON_KEY

   Ces 2 valeurs sont PUBLIQUES par conception (sécurité assurée
   par les règles Row Level Security côté base). Les committer est OK.

   Tant que l'URL contient encore "YOUR-PROJECT", la sync cloud est
   DÉSACTIVÉE et l'app continue de fonctionner en local (comptes PIN).
   ───────────────────────────────────────────────────────────── */
window.SUPABASE_URL      = 'https://rhnkxeikigeqodeeyqpq.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_7VSNknb2sxT2BMulKCXAUA_L1yAgEWb';

/* Connexion sociale : n'active un fournisseur ICI qu'une fois configuré dans
   Supabase (Auth → Providers). Tant qu'il n'est pas listé, son bouton n'apparaît
   pas (évite un bouton cassé). Valeurs possibles : 'google', 'apple'.
   Ex. une fois Google prêt :  window.SUPABASE_OAUTH = ['google']; */
window.SUPABASE_OAUTH = [];
