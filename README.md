# REWEAR — prototype Android (Expo)

## Fonctionnalités de démonstration
- Catalogue de produits avec recherche et catégories
- Favoris et fiches articles
- Formulaire de publication local
- Espace de conversations simulées
- Profil vendeur
- Abonnements Free / Plus / Pro / Business

**Important :** ce dépôt contient un prototype. Les annonces et messages ne sont pas encore synchronisés entre utilisateurs. Aucun paiement réel n'est traité. Les prix d'abonnement sont des hypothèses, pas des tarifs définitifs.

## Tester sur Android
1. Installer Expo Go : https://expo.dev/go
2. Ouvrir le projet avec Expo Snack : https://snack.expo.dev/
3. Copier le contenu de `App.js` dans un nouveau Snack.

## Générer un APK
Avec Node.js et EAS CLI :
```bash
npm install
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```
Le lien de téléchargement de l'APK sera fourni par Expo à la fin de la compilation.

## Backend avant lancement public
- Configurer Supabase Auth, PostgreSQL et Storage.
- Ajouter l'envoi sécurisé de photos.
- Remplacer la messagerie simulée par une vraie messagerie.
- Ajouter signalements, blocage et modération.
- Connecter un prestataire de paiement compatible.
- Faire auditer les règles RLS et tester la sécurité.
- Ne jamais afficher les adresses personnelles ou numéros privés des utilisateurs.

Pour les comptes de paiement et la publication officielle, l'aide d'un parent/tuteur ou d'un adulte responsable peut être nécessaire.

## Identité
- Nom : REWEAR
- Promesse : Acheter. Vendre. Échanger.
- Marché pilote proposé : Ouagadougou, puis extension progressive.
