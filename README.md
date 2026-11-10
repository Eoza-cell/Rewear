# REWEAR — application mobile (Expo / React Native)

REWEAR est un prototype de marketplace : vêtements, chaussures, accessoires et autres objets.

## Tester rapidement sur Android avec Expo Go

Le projet utilise **Expo SDK 54**. Expo Go doit être compatible avec ce SDK.

### Depuis un téléphone Android uniquement
1. Installe Expo Go depuis https://expo.dev/go et sélectionne la version Android compatible avec **SDK 54** si l'application du Play Store n'est pas compatible.
2. Ouvre https://snack.expo.dev/ dans le navigateur.
3. Crée un nouveau Snack et remplace le contenu de `App.js` par celui du fichier `App.js` de ce dépôt.
4. Attends le chargement, puis ouvre le projet dans Expo Go avec le QR code ou le lien affiché.

Le Snack est une copie de test : les modifications faites dans Snack ne sont pas automatiquement enregistrées dans GitHub.

### Depuis un ordinateur ou un terminal compatible
Clone le dépôt, puis exécute :

```bash
npm install
npx expo start --tunnel
```

Scanne le QR code avec Expo Go. Le mode tunnel est utile lorsque le téléphone et l'ordinateur ne sont pas sur le même réseau.

## Vérifier la configuration

```bash
npx expo-doctor
npx expo install --fix
```

N'exécute `expo install --fix` que si Expo Doctor signale des versions incompatibles.

## Générer un APK Android

L'APK est un fichier installable. Ce n'est pas la même chose qu'Expo Go.

```bash
npm install
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build -p android --profile preview
```

Le profil `preview` dans `eas.json` produit un APK distribuable pour les tests. La compilation se fait dans le cloud Expo. Le lien de téléchargement apparaît à la fin du build.

## Fonctionnalités actuellement en démonstration

- Catalogue, recherche et catégories
- Favoris et fiches articles
- Formulaire de publication local
- Conversations simulées
- Profil vendeur
- Exemples d'abonnements Free / Plus / Pro / Business

## Limites à connaître avant un lancement public

Ce dépôt est un **prototype front-end**, pas encore une marketplace prête à accueillir de vrais clients :
- Les comptes et annonces ne sont pas synchronisés entre téléphones.
- Les conversations sont simulées.
- Les photos ne sont pas encore téléversées vers un serveur.
- Aucun paiement réel ni abonnement payant n'est activé.
- Les tarifs affichés sont des exemples, pas des prix validés.

Avant le lancement, il faudra connecter et sécuriser une base de données, l'authentification, le stockage des images, la messagerie, la modération, les signalements et un prestataire de paiement. Les règles de sécurité Supabase doivent être vérifiées et testées avant toute mise en production.

Ne publie pas d'adresse personnelle ni de numéro privé dans les annonces. Prévois des rencontres dans des lieux publics et demande l'aide d'un adulte responsable pour les démarches de paiement ou de publication officielle.

## Identité

- Nom : REWEAR
- Signature : Acheter. Vendre. Échanger.
- Marché pilote envisagé : Ouagadougou, puis extension progressive.
