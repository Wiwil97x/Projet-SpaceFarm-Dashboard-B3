# SpaceFarm Front

Interface web (dashboard) du projet SpaceFarm, Workshop EPSI B3 "Horizon 2080", pilier FoodTech & AgriTech Spatiale.

## Contexte projet

- Ferme hydroponique autonome pour un vaisseau interstellaire de l'ESA, coupé de la Terre (pas de ravitaillement, pas de communication temps réel).
- Chaîne : capteurs ESP32 -> MQTT (TLS) -> serveur local -> PostgreSQL -> régulation des ventilateurs + alertes. Fonctionne sans Internet, resynchronise au retour du lien.
- Équipe de 5. Ce dépôt = FRONT uniquement (Willem). Back (API + WebSocket) = Nathan. Le front avance avec de fausses données (mock) tant que le back n'est pas prêt.
- Cahier des charges complet : dossier `docs/` (vide au départ, à compléter si le PDF est ajouté).
- Jury : démo projetée en direct, 5 min de présentation + 5 min de questions. Le design doit rester lisible de loin.
- Crises de démo : A surchauffe (ventilateurs auto + alerte), B rupture avec la Terre 24 h (mode autonome + resync), C capteur muet (alerte + mode sûr).

## Ce que le front doit afficher et faire

1. Cartes d'état en direct : température, humidité, luminosité, niveau d'eau, état des ventilateurs (allumés/éteints, mode auto/manuel).
2. Historique en courbes par mesure (Recharts) + zone prévue pour des iframes Grafana plus tard.
3. Formulaire de seuils (min et max par mesure).
4. Commande des ventilateurs : auto, on, off.
5. Alertes : bannière rouge (seuil dépassé ou capteur muet) + alerte sonore, avec bouton "Activer le son" obligatoire (politique d'autoplay des navigateurs).
6. Badge "Lien Terre" : connecté ou coupé + nombre de messages en attente de synchronisation.
7. Console de crise : simuler surchauffe, coupure Terre, capteur muet, niveau d'eau bas.

## Stack et contraintes

- React + Vite + TypeScript strict (pas de `any`), Recharts pour les courbes.
- Interface en français, code et noms de variables en anglais.
- Design sombre, style tableau de bord spatial, propre et lisible en projection.
- Composants fonctionnels uniquement, un composant par fichier PascalCase, pas de barrel exports.
- Tailwind + `cn()` (clsx + tailwind-merge) pour les classes conditionnelles.
- Pas de tiret long dans les textes visibles de l'UI.
- Direction design : base neutre non noire pur, un seul accent (vert émeraude désaturé), rouge réservé aux alertes, ambre pour les avertissements. Pas de violet, pas d'Inter, pas d'emoji (icônes SVG). Chiffres en police mono. Respecter `prefers-reduced-motion`.

## Architecture données

Couche d'accès séparée, interface `ApiClient` avec deux implémentations :

- `mockClient` : fausses données qui évoluent toutes les 2 s, avec scénarios de crise.
- `httpClient` : vraie API (REST + WebSocket).

Choix via `VITE_USE_MOCK` (`true` = mock).

Contrat d'API prévu (à valider avec Nathan) :

| Méthode | Route | Rôle |
|---|---|---|
| GET | `/api/state` | état courant (mesures, ventilateurs, alertes, lien Terre) |
| GET | `/api/history?sensor=&range=` | historique d'une mesure |
| GET / PUT | `/api/thresholds` | lire / modifier les seuils |
| POST | `/api/fan` | commande ventilateurs (auto, on, off) |
| POST | `/api/crisis` | déclencher une crise simulée |
| WS | `/ws` | pousse mesures et alertes en temps réel |

Seuils par défaut : température 18 à 24 °C, humidité 50 à 70 %, niveau d'eau minimum 30 %.

## Méthode de travail

- Petites étapes, une à la fois. Un commit git à la fin de chaque étape.
- Après chaque étape : une phrase sur ce qui est fait + proposition pour la suite.
- Commits en anglais, format conventionnel (`feat:`, `fix:`, `chore:`, `style:`). Jamais de `.env` ni de clés dans git.
- Vérifier (build, lancement) avant de déclarer une étape terminée.
