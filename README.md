<p align="center">
  <img src="public/logo_BCP.jpg" width="180" alt="Banque Populaire">
</p>

<h1 align="center">🤖 Prompt Manager BCP — Frontend</h1>

<p align="center">
  <strong>Interface web Vue.js 3 de la plateforme intelligente de gestion et d'exécution de prompts.</strong>
</p>

<p align="center">
  Application développée dans un contexte bancaire professionnel pour la Banque Centrale Populaire (BCP).
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.x-42B883?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">
</p>

---

## About the Project

Le frontend de **Prompt Manager BCP** est une application web développée avec **Vue.js 3**.

Il fournit l'interface utilisateur permettant d'interagir avec le backend Laravel et les différents services d'Intelligence Artificielle.

L'application permet notamment de :

* Créer et gérer des prompts
* Importer des documents Word
* Détecter et remplir des variables
* Exécuter des prompts avec l'IA
* Consulter les résultats
* Exporter les réponses
* Utiliser un chatbot intégré
* Organiser les prompts par catégories
* Réaliser une évaluation technique d'une offre fournisseur

Le frontend communique avec le backend via une **API REST Laravel**.

---

## ✨ Fonctionnalités

### 📝 Gestion des prompts

* Création manuelle de prompts
* Modification des prompts
* Gestion des catégories
* Utilisation de variables dynamiques `{{variable}}`
* Formulaire dynamique pour renseigner les variables
* Affichage des résultats générés

---

### 📄 Import de documents

L'application permet d'importer des documents Word afin de faciliter la création de prompts.

Fonctionnalités :

* Upload de fichiers
* Aperçu du contenu
* Extraction du texte
* Détection automatique des variables
* Création d'un prompt à partir du document

---

### 🤖 Intelligence Artificielle

Le frontend permet d'utiliser les services d'IA intégrés au backend.

Services principaux :

* Google Gemini
* Groq

L'application peut également orienter l'utilisateur vers différents services d'IA externes :

* ChatGPT
* Claude
* Perplexity
* Mistral
* DeepSeek
* Grok
* Copilot

---

### 💬 Chatbot

Un chatbot intelligent est intégré directement dans l'interface.

Il permet à l'utilisateur d'interagir avec un assistant conversationnel sans quitter l'application.

---

### 📤 Export des résultats

Les résultats générés peuvent être :

* Exportés en Word
* Exportés en PDF
* Exportés en TXT
* Copiés dans le presse-papiers
* Envoyés par email

Les réponses Markdown sont également affichées avec un rendu adapté grâce à `marked.js`.

---

# 🔎 Technical Evaluation

Le frontend intègre une interface dédiée à l'**évaluation technique des offres fournisseurs**.

Cette fonctionnalité permet à l'utilisateur de sélectionner :

1. Un cahier des charges PDF
2. Une offre fournisseur PDF
3. Le fournisseur concerné

Le backend analyse ensuite les documents et retourne les résultats de comparaison.

---

## Fonctionnement

```text
┌───────────────────────────────┐
│     Technical Evaluation      │
└───────────────┬───────────────┘
                │
                ▼
       Sélection fournisseur
                │
                ▼
      Cahier des charges PDF
                │
                ▼
       Offre fournisseur PDF
                │
                ▼
          Lancer l'analyse
                │
                ▼
       Backend Laravel + IA
                │
                ▼
       Résultat de l'analyse
                │
                ▼
     Conforme / Non conforme
```

---

## Interface d'évaluation

La page `TechnicalEvaluation.vue` permet notamment de :

* Saisir le nom du fournisseur
* Sélectionner le cahier des charges
* Sélectionner l'offre fournisseur
* Lancer l'évaluation
* Afficher l'état du traitement
* Gérer les erreurs éventuelles

---

## Résultats

La page `TechnicalEvaluationResult.vue` présente les résultats retournés par le backend.

Elle permet notamment de visualiser :

* Les exigences techniques
* Les valeurs demandées
* Les valeurs proposées
* Le statut de conformité
* Les informations relatives à l'évaluation

Exemple :

| Exigence | Valeur demandée | Valeur proposée | Statut         |
| -------- | --------------- | --------------- | -------------- |
| RAM      | ≥ 32 Go         | 64 Go           | ✅ Conforme     |
| Stockage | SSD 1 To        | SSD 512 Go      | ❌ Non conforme |
| Garantie | 3 ans           | 3 ans           | ✅ Conforme     |

Cette fonctionnalité constitue une **aide à l'analyse technique**. La décision finale reste effectuée par l'utilisateur ou la commission concernée.

---

# 🛠️ Stack technique

| Composant          | Technologie      |
| ------------------ | ---------------- |
| Framework          | Vue.js 3         |
| Syntaxe            | `<script setup>` |
| Build              | Vite             |
| CSS                | Tailwind CSS     |
| Markdown           | marked.js        |
| API                | Fetch / Axios    |
| Routing            | Vue Router       |
| Serveur production | Nginx            |
| Conteneurisation   | Docker           |

---

# 📁 Structure du projet

```text
promptbcp-frontend/
│
├── public/
│   └── logo_BCP.jpg
│
├── src/
│   │
│   ├── api/
│   │   └── technicalEvaluation.js
│   │
│   ├── assets/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── Sidebar.vue
│   │   └── ...
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── Prompts.vue
│   │   ├── PromptForm.vue
│   │   ├── PromptResult.vue
│   │   ├── Upload.vue
│   │   ├── Categories.vue
│   │   ├── TechnicalEvaluation.vue
│   │   └── TechnicalEvaluationResult.vue
│   │
│   ├── App.vue
│   └── main.js
│
├── Dockerfile
├── nginx.conf
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

# 🔗 Intégration avec le Backend

Le frontend communique avec le backend Laravel à travers l'API REST.

L'URL de l'API est définie avec :

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Les principales fonctionnalités utilisent notamment les endpoints suivants :

| Fonctionnalité       | Endpoint                            |
| -------------------- | ----------------------------------- |
| Prompts              | `/api/prompts`                      |
| Upload               | `/api/prompts/upload`               |
| Exécution            | `/api/prompts/{id}/execute`         |
| Gemini               | `/api/ai/executions/{id}/gemini`    |
| Groq                 | `/api/ai/executions/{id}/groq`      |
| Téléchargement       | `/api/executions/{id}/download`     |
| PDF                  | `/api/executions/{id}/generate-pdf` |
| Email                | `/api/executions/{id}/send-email`   |
| Évaluation technique | `/api/technical-evaluations`        |

---

# ⚙️ Configuration

Créer un fichier `.env` à la racine du frontend :

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Après modification de cette variable, redémarrer le serveur de développement.

---

# 🚀 Démarrage en développement

## Prérequis

* Node.js 18+
* npm
* Backend Laravel démarré

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

L'application est accessible sur :

```text
http://localhost:5173
```

---

# 📦 Build de production

Pour générer la version de production :

```bash
npm run build
```

Les fichiers générés sont placés dans :

```text
dist/
```

Pour tester le build localement :

```bash
npm run preview
```

---

# 🐳 Utilisation avec Docker

Le frontend peut être exécuté avec Docker en utilisant le `docker-compose.yml` du projet backend.

Depuis le répertoire principal :

```bash
docker compose up -d --build
```

Le frontend est alors accessible sur :

```text
http://localhost:5173
```

L'image Docker du frontend utilise :

1. Node.js pour construire l'application
2. Nginx pour servir les fichiers générés

Architecture :

```text
        Vue.js
           │
           ▼
        Vite Build
           │
           ▼
        dist/
           │
           ▼
      Nginx Alpine
           │
           ▼
    http://localhost:5173
```

---

# 🔄 Communication Frontend / Backend

En environnement Docker, l'application complète fonctionne avec plusieurs services :

```text
┌───────────────────────┐
│       Frontend        │
│       Vue.js          │
│       Nginx           │
│       :5173           │
└───────────┬───────────┘
            │
            │ HTTP API
            ▼
┌───────────────────────┐
│       Backend         │
│       Laravel         │
│       PHP-FPM         │
│       :8000           │
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      ▼           ▼
┌──────────┐ ┌─────────────┐
│  MySQL   │ │ Services IA │
│   :3306  │ │ Gemini/Groq │
└──────────┘ └─────────────┘
```

---

# 🧪 Vérification

Si l'application ne fonctionne pas, vérifier dans l'ordre :

### 1. Vérifier le frontend

```bash
npm run dev
```

### 2. Vérifier le backend

Le backend doit être accessible sur :

```text
http://localhost:8000
```

### 3. Vérifier l'URL de l'API

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Avec Docker

```bash
docker compose ps
```

Les conteneurs doivent être actifs.

---

# 🛠️ Dépannage

| Problème                    | Solution                                       |
| --------------------------- | ---------------------------------------------- |
| Page blanche                | Vérifier la console du navigateur              |
| Erreur réseau               | Vérifier que Laravel est démarré               |
| Erreur API                  | Vérifier `VITE_API_BASE_URL`                   |
| Erreur CORS                 | Vérifier la configuration du backend           |
| `npm install` échoue        | Vérifier Node.js et npm                        |
| Tailwind ne fonctionne pas  | Relancer le serveur Vite                       |
| Technical Evaluation échoue | Vérifier le backend et les logs Laravel        |
| Docker ne démarre pas       | Vérifier Docker Desktop et `docker compose ps` |

---

# 🔗 Backend

Le frontend fonctionne avec le backend Laravel **Prompt Manager BCP**.

Repository :

```text
promptbcp-backend
```

Le backend est responsable notamment de :

* La gestion des données
* L'API REST
* L'exécution des prompts
* L'intégration avec les services IA
* L'extraction des documents
* L'évaluation technique
* La génération des fichiers
* L'envoi des emails

---

# 🎯 Objectif du Frontend

Le frontend a été conçu afin de fournir une interface :

* Simple
* Moderne
* Responsive
* Facile à utiliser
* Adaptée à un environnement professionnel

Il centralise les principales fonctionnalités de Prompt Manager BCP dans une seule interface web.

---

# 📝 Licence

Projet développé dans le cadre d'un stage professionnel et d'un projet d'ingénierie.

Usage interne et professionnel.

---

<p align="center">
  <strong>Prompt Manager BCP</strong>
  <br>
  Vue.js 3 • Vite • Tailwind CSS • Docker • Laravel API • Artificial Intelligence
</p>
