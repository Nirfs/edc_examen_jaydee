const Board = require("../models/Boards");
const Column = require("../models/Column");
const Task = require("../models/Tasks");

const Boards = [
  new Board("1", "Mon Projet", new Date("2026-01-10")),
  new Board("2", "Backlog", new Date("2026-02-01")),
];

// Colonnes du Board 1
const Columns = [
  new Column("col-1", "À faire", "#FF4444", "1", "todo"),
  new Column("col-2", "En cours", "#6366F1", "1", "inprogress"),
  new Column("col-3", "En revue", "#F59E0B", "1", "review"),
  new Column("col-4", "Terminé", "#22C55E", "1", "done"),

  // Colonnes du Board 2
  new Column("col-5", "Idées", "#EC4899", "2", "ideas"),
  new Column("col-6", "Priorisé", "#F97v316", "2", "prioritized"),
];

const Tasks = [
  // --- Board 1 : todo ---
  new Task(
    "4839201745",
    "Créer la page d'accueil",
    "Mettre en place le layout principal avec header et footer. Créer une structure claire pour l'ensemble des pages, en intégrant un header fixe et un footer responsive. Veiller à l'accessibilité et à l'adaptabilité du layout sur tous les appareils.",
    "todo",
    "feature",
    "#6366F1",
    "high",
    "#FF4444",
  ),
  new Task(
    "2398471023",
    "Configurer la base de données",
    "Initialiser PostgreSQL et créer les migrations. Préparer la base de données pour accueillir les différentes tables du projet. S'assurer que les migrations sont bien documentées et facilement modifiables pour les évolutions futures.",
    "todo",
    "chore",
    "#6B7280",
    "medium",
    "#FFA500",
  ),

  // --- Board 1 : inprogress ---
  new Task(
    "1092837465",
    "Authentification utilisateur",
    "Implémenter JWT pour la connexion et l'inscription. Garantir la sécurité des données utilisateurs grâce à un système d'authentification robuste. Tester les différents scénarios d'inscription et de connexion pour éviter les failles.",
    "inprogress",
    "feature",
    "#6366F1",
    "high",
    "#FF4444",
  ),
  new Task(
    "9876543210",
    "Corriger bug formulaire",
    "Le formulaire de contact ne valide pas l'email correctement. Identifier l'origine du bug et corriger la logique de validation. Vérifier que le formulaire fonctionne sur tous les navigateurs et appareils.",
    "inprogress",
    "bug",
    "#EF4444",
    "medium",
    "#FFA500",
  ),

  // --- Board 1 : review ---
  new Task(
    "5647382910",
    "Refactoring des routes API",
    "Découper les routes en sous-routeurs Express. Revoir l'architecture de l'API pour améliorer la lisibilité et la maintenance du code. Documenter les nouvelles routes pour faciliter le travail des autres développeurs.",
    "review",
    "chore",
    "#6B7280",
    "low",
    "#3CB371",
  ),

  // --- Board 1 : done ---
  new Task(
    "1029384756",
    "Mise en place du projet",
    "Initialisation du repo, ESLint, Prettier. Mettre en place les outils de qualité de code pour garantir une base saine. Vérifier que les conventions sont respectées et que le projet démarre sans erreurs.",
    "done",
    "chore",
    "#6B7280",
    "low",
    "#3CB371",
  ),

  // --- Board 2 : ideas ---
  new Task(
    "9182736450",
    "Système de notifications",
    "Notifications en temps réel via WebSocket. Concevoir un système permettant d'informer les utilisateurs instantanément des changements. Tester la fiabilité et la rapidité des notifications sur différents scénarios.",
    "ideas",
    "feature",
    "#6366F1",
    "low",
    "#3CB371",
  ),

  // --- Board 2 : prioritized ---
  new Task(
    "6758493021",
    "Tableau de bord analytics",
    "Afficher les métriques clés sur une page dédiée. Créer un tableau de bord ergonomique pour visualiser les statistiques importantes du projet. S'assurer que les données sont actualisées et présentées de façon claire et accessible.",
    "prioritized",
    "feature",
    "#6366F1",
    "medium",
    "#FFA500",
  ),
];

module.exports = { Boards, Columns, Tasks };
