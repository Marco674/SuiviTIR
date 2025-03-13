# SuiviTIR

## Description
SuiviTIR est une application de suivi tireurs sportifs. Elle permet de gérer l'assiduité, de suivre leur état et de générer des attestations.

## Fonctionnalités
- Suivi de l'occupation des pas de tir
- Génération des attestation d'assiduité

## Installation
Pour installer et exécuter ce projet localement, suivez les étapes ci-dessous :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/SuiviTIR.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd SuiviTIR/front
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Démarrez l'application :
   ```bash
   npm start
   ```

5. Configurez le back et modifier le superuser:
   ```
   vi /pocketbase/pb_migration/1687801090_initial_superuser.js
   ```

5. Démarrez le back :
   ```
   ./pocketbase/pocketbase serve
   ```

6. Créez un premier utilisateur SuiviTIR :
Connectez vous sur pocketbase `http://127.0.0.1:8090 et créez un utilisateur dans la collection users

## Utilisation
Après avoir démarré l'application, ouvrez votre navigateur et accédez à `http://localhost:3000` pour utiliser l'application.

## Contribuer
Les contributions sont les bienvenues ! Veuillez suivre les étapes ci-dessous pour contribuer :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
