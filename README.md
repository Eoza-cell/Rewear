# REWEAR Burkina Faso 🇧🇫

**Acheter. Vendre. Échanger.**

REWEAR est une vitrine marketplace pensée pour le Burkina Faso : vêtements, chaussures, accessoires, téléphones, maison, livres et autres objets. Prix affichés en FCFA.

## Site
https://eoza-cell.github.io/Rewear/

## Fonctionnalités de démonstration
- Catalogue, catégories et recherche.
- Filtres par ville et par fourchette de prix.
- Tri par prix, favoris et fiches détaillées.
- Publication d'annonce avec photo depuis le téléphone (stockage local du navigateur).
- Profil local et connexion facultative avec un compte Puter.
- Assistant IA **OUEDRAOGO**, créé par le **Clan Zenin**, intégré avec Puter.js.
- Visuels graphiques originaux inspirés des motifs textiles du Burkina Faso, au lieu de photos de stock étrangères.

## Puter.js
La bibliothèque est chargée depuis `https://js.puter.com/v2/`. OUEDRAOGO utilise `puter.ai.chat()`. La connexion Puter s'effectue via `puter.auth.signIn()`.

Puter.js utilise un modèle « user-pays » : les fonctions IA et cloud peuvent nécessiter le compte Puter de chaque utilisateur et leur usage. Ce n'est pas une API illimitée garantie et aucun secret API n'est stocké dans ce dépôt.

## Technologies
HTML, CSS et JavaScript, publiés avec GitHub Pages depuis `docs/`.

## Limites importantes
Cette version reste un prototype front-end. Les profils locaux, annonces, favoris, photos et conversations de démonstration sont enregistrés dans le navigateur et ne sont pas partagés entre téléphones. La connexion Puter authentifie un compte Puter, pas un compte REWEAR indépendant. Il n'y a pas encore de base de données REWEAR, de messagerie entre membres, de paiement ou de livraison connectés.

Avant le lancement public, il faudra un backend sécurisé, des comptes REWEAR, un stockage de photos, des outils de modération et des solutions de paiement adaptées au Burkina Faso. Ne publie pas d'adresse personnelle ou de numéro privé dans une annonce.
