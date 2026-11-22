# Cérénité Blablabla — BNN24 / Feuch Lab

Prototype minimal d'une interface vocale poético-allégorique mobile.

## Fonctionnalités
- Orbe central animé, avatar-bouton en bas de l'écran.
- Microphone activé **sur demande** (SpeechRecognition si disponible).
- Réponses locales préécrites, sans appel à Mistral ni ElevenLabs.
- Synthèse vocale native (SpeechSynthesis) avec bouton muet.
- Saisie texte de secours, arrêt immédiat.
- Aucun compte, aucune clé API, aucun stockage de conversation.

## Démarrage
Ouvrir `index.html` dans un navigateur récent. Pour le microphone, utiliser de préférence un site HTTPS (par exemple GitHub Pages) et autoriser l'accès au micro. La reconnaissance vocale du navigateur peut être indisponible ou utiliser un service externe selon le navigateur.

## Déploiement
Dans GitHub : **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**. L'adresse attendue après activation est https://benoitlub.github.io/cerenite-blablabla/ .

## Limites
C'est une démo scénarisée, **pas une IA conversationnelle**. Pas de diagnostic, hypnothérapie, EMDR ou promesse de soin. L'intégration éventuelle d'un modèle sera étudiée séparément, via un backend protégeant les secrets.

## Prochaine étape
Remplacer l'avatar typographique par le portrait officiel de Cérénité, avec un fichier image autorisé dans `assets/`.