# 🤖 Prompt Manager BCP — Frontend

Interface web (Vue.js 3) de la plateforme de gestion, personnalisation et exécution de prompts pour intelligences artificielles génératives, développée dans un contexte bancaire professionnel.

> 🔗 Backend associé : [promptbcp-backend](https://github.com/mbarkimahmoud-maker/promptbcp-backend)

---

## ✨ Fonctionnalités

- 📄 **Upload de fichiers Word** avec aperçu et détection des variables `{{ }}`
- ✍️ **Création manuelle** de prompts avec variables personnalisées
- 📋 **Formulaire dynamique** — remplissage guidé des variables sans voir le prompt brut
- 🤖 **Génération IA intégrée** — appel direct à Gemini et Groq depuis l'interface
- 🌐 **Envoi vers IAs externes** — ChatGPT, Claude, Perplexity, Mistral, DeepSeek, Grok, Copilot
- 📥 **Export multi-format** — Word (.docx), PDF, TXT, copie presse-papier
- ✉️ **Envoi par email** depuis l'interface, avec rendu HTML
- 🎨 **Rendu Markdown stylé** (marked.js) et charte graphique personnalisée

---

## 🛠️ Stack technique

| Composant | Technologie |
|---|---|
| Framework | Vue.js 3 (`<script setup>`) |
| Build tool | Vite |
| Style | Tailwind CSS |
| Rendu Markdown | marked.js |
| Communication API | Fetch / Axios vers le backend Laravel |
| Déploiement | Docker (Nginx, build de production) |

---

## 🚀 Démarrage rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+ recommandée) et npm
- Le [backend](https://github.com/mbarkimahmoud-maker/promptbcp-backend) doit être démarré et accessible (par défaut sur `http://localhost:8000`)

### Installation

```bash
# 1. Cloner le repository frontend
git clone https://github.com/mbarkimahmoud-maker/promptbcp-frontend.git
cd promptbcp-frontend

# 2. Installer les dépendances
npm install

# 3. Configurer l'URL de l'API backend (voir section Configuration)

# 4. Lancer le serveur de développement
npm run dev
```

L'application est ensuite accessible sur **http://localhost:5173**.

### Build de production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `dist/`, prêts à être servis par Nginx ou tout autre serveur web.

### Avec Docker

Le frontend peut aussi être démarré via le `docker-compose.yml` du repository backend, qui orchestre l'ensemble des services (backend, base de données et frontend) :

```bash
docker-compose up
# Accessible sur http://localhost:5173
```

---

## ⚙️ Configuration

L'URL de l'API backend se configure via une variable d'environnement Vite. Créer un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> En environnement Docker, cette variable est généralement injectée automatiquement via `docker-compose.yml` du repository backend.

---

## 📁 Structure du projet

```
promptbcp-frontend/
├── public/                 # Fichiers statiques (favicon, assets publics)
├── src/
│   ├── components/          # Composants Vue réutilisables
│   ├── views/                # Pages / écrans de l'application
│   ├── services/              # Appels API vers le backend
│   ├── assets/                  # Styles, images, charte graphique
│   ├── App.vue                  # Composant racine
│   └── main.js                   # Point d'entrée de l'application
├── index.html              # Point d'entrée HTML
├── tailwind.config.js      # Configuration Tailwind CSS
├── postcss.config.js       # Configuration PostCSS
├── vite.config.js          # Configuration Vite
└── package.json
```

> ℹ️ Adapter cette arborescence à l'organisation réelle de `src/` si elle diffère.

---

## 🔗 Intégration avec le backend

Le frontend consomme l'API REST exposée par [promptbcp-backend](https://github.com/mbarkimahmoud-maker/promptbcp-backend) pour :

| Action | Endpoint backend utilisé |
|---|---|
| Lister / créer des prompts | `/api/prompts` |
| Uploader un fichier Word | `/api/prompts/upload` |
| Exécuter un prompt (remplir les variables) | `/api/prompts/{id}/execute` |
| Générer une réponse IA (Gemini / Groq) | `/api/ai/executions/{id}/gemini` ou `/groq` |
| Télécharger le résultat (Word / PDF) | `/api/executions/{id}/download`, `/generate-pdf` |
| Envoyer par email | `/api/executions/{id}/send-email` |

Le backend doit être démarré et accessible à l'URL configurée dans `VITE_API_BASE_URL` pour que l'application fonctionne.

---

## 🛠️ Dépannage

| Problème | Solution |
|---|---|
| Page blanche / erreurs réseau | Vérifier que le backend est démarré et que `VITE_API_BASE_URL` pointe vers la bonne URL |
| Erreurs CORS | Vérifier la configuration CORS côté backend (`config/cors.php`) |
| `npm install` échoue | Vérifier la version de Node.js (18+ recommandée) |
| Styles Tailwind non appliqués | Relancer `npm run dev` après modification de `tailwind.config.js` |

---

## 📦 Repository backend

Le code source de l'API (Laravel) est disponible sur un repository séparé :
[promptbcp-backend](https://github.com/mbarkimahmoud-maker/promptbcp-backend)

---

## 📝 Licence

Projet développé dans le cadre d'un stage professionnel — usage interne.
