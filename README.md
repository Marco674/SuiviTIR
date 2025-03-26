# SuiviTIR

## Description
SuiviTIR est une application de suivi des tireurs sportifs à destination des clubs
Elle permet de gérer l'assiduité, de suivre leur état et de générer des attestations.

## Fonctionnalités
- Suivi de l'occupation des pas de tir
- Suivi des passages sur tous les pas de tir
- Génération des attestation d'assiduité

## Installation
Pour installer et exécuter ce projet localement, suivez les étapes ci-dessous :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Marco674/SuiviTIR.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd SuiviTIR
   ```
3. Modifiez les variables d'environnement du backend :
   ```bash
   vi docker-compose.yaml
   ```

4. Démarrez la stack avec docker-compose :
   ```bash
   docker compose up -d
   ```

## Utilisation
Après avoir démarré la stack, ouvrez votre navigateur et accédez à `http://localhost:8090/_/` pour accéder à l'interface du backend, créer un compte utilisateur.
Connectez vous avec l'addresse `http://localhost:3000/` pour accéder au front

Utilisez votre moyen d'insertion et réalisez des appels API de type Post pour ajouter des passages:
```bash
curl --request POST \
  --url http://127.0.0.1:8090/api/collections/suiviTir/records \
  --header 'content-type: application/json' \
  --data '{
    "licence": 111111,
    "pastir": "50M"
}'
```

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](../LICENSE) pour plus de détails.
