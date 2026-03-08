# Kanban Jaydee - Gestion de Production

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%2019-61dafb?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript)

## Présentation du Projet
Développée pour l'entreprise **Jaydee** (injection plastique), cette application Kanban permet de digitaliser le suivi des ordres de fabrication (OF). Elle remplace les tableaux physiques pour offrir une visibilité en temps réel sur l'avancement de la production.
Ce projet a été réalisé dans le cadre de l'examen **[EDC EXAMEN] KANBAN** (Bloc 1 - CDA).

## Fonctionnalités
- **Gestion des Boards :** Création et visualisation de tableaux par ligne de production.
- **Colonnes Dynamiques :** Suivi des étapes (À faire, En cours, Terminé, etc.).
- **Gestion des Tâches :** Création, modification et suppression de tâches avec priorité et typage.
- **Validation de données :** Sécurisation des entrées via `express-validator`.
- **Tests automatisés :** Suite de tests d'intégration pour garantir la fiabilité de l'API.

## Stack Technique
- **Frontend :** React 19, TypeScript, Vite, Tailwind CSS, React Icons.
- **Backend :** Node.js, Express.js.
- **Qualité/Tests :** Jest, Supertest.
- **Gestion de projet :** Méthode Agile (Scrum), Trello, Figma.

## Installation et Lancement

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

###  1. Cloner le projet
```bash
git clone [https://github.com/votre-utilisateur/votre-repo.git](https://github.com/votre-utilisateur/votre-repo.git)
cd votre-repo
```

### 2. Installer les dépendances

installer les dépendances (depuis le dossier backend)
```bash
cd Back_End
npm install
```
installer les dépendances (depuis le dossier frontend)
```bash
cd Front_End
npm install
```

### 3. Lancer le projet
Lancer le serveur (depuis le dossier backend)
```bash
npm run dev
```
Lancer le client (depuis le dossier frontend)
```bash
npm run dev
```

### 4. Lancer ls test
Lancer le serveur (depuis le dossier backend)
```bash
npm run test
```



