<template>
  <div class="space-y-6 max-w-3xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <button @click="$router.back()"
        class="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
        ←
      </button>
      <div>
        <h2 class="text-xl font-bold text-gray-800">Envoyer vers une IA</h2>
        <p class="text-sm text-gray-400">Choisissez votre IA et envoyez le prompt final</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400">Chargement...</div>

    <div v-else class="space-y-6">

      <!-- Prompt final -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-3">📋 Prompt final</h3>
        <div class="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <pre class="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{{ execution?.final_content }}</pre>
        </div>
        <div class="flex gap-2 mt-3">
          <button @click="copyToClipboard"
            class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            {{ copied ? '✅ Copié !' : '📋 Copier' }}
          </button>
          <a :href="`http://127.0.0.1:8000/api/executions/${execution?.id}/download`"
            target="_blank"
            class="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
            📥 Télécharger Word
          </a>
        </div>
      </div>

      <!-- IAs disponibles -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-4">🚀 Choisir une IA</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="ai in aiList" :key="ai.name"
               class="border border-gray-100 rounded-xl p-4 hover:border-bp-red hover:shadow-sm transition-all cursor-pointer"
               @click="sendToAI(ai)">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">{{ ai.icon }}</span>
              <div>
                <p class="font-semibold text-gray-800 text-sm">{{ ai.name }}</p>
                <p class="text-xs text-gray-400">{{ ai.description }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="ai.type === 'url' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'">
                {{ ai.type === 'url' ? '🔗 Lien direct' : '📋 Copier & Ouvrir' }}
              </span>
              <button class="text-xs bg-bp-red text-white px-3 py-1 rounded-lg hover:bg-bp-red-dark transition-colors">
                Envoyer →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-red-50 border border-red-100 rounded-xl p-4">
        <p class="text-sm font-medium text-bp-red mb-1">💡 Comment ça marche ?</p>
        <ul class="text-xs text-red-700 space-y-1">
          <li>• <strong>Lien direct</strong> : Le prompt est injecté automatiquement dans l'URL de l'IA</li>
          <li>• <strong>Copier & Ouvrir</strong> : Le prompt est copié, puis l'IA s'ouvre — collez avec Ctrl+V</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/index.js'

const route = useRoute()
const execution = ref(null)
const loading = ref(true)
const copied = ref(false)

const aiList = [
  {
    name: 'ChatGPT',
    icon: '🤖',
    description: 'OpenAI GPT-4o',
    type: 'url',
    url: 'https://chatgpt.com/?q=',
  },
  {
    name: 'Perplexity',
    icon: '🔍',
    description: 'Perplexity AI',
    type: 'url',
    url: 'https://www.perplexity.ai/search?q=',
  },
  {
    name: 'Gemini',
    icon: '✨',
    description: 'Google Gemini',
    type: 'copy',
    url: 'https://gemini.google.com/',
  },
  {
    name: 'Claude',
    icon: '🧠',
    description: 'Anthropic Claude',
    type: 'copy',
    url: 'https://claude.ai/',
  },
  {
    name: 'Copilot',
    icon: '💼',
    description: 'Microsoft Copilot',
    type: 'copy',
    url: 'https://copilot.microsoft.com/',
  },
  {
    name: 'Mistral',
    icon: '🌪️',
    description: 'Mistral Le Chat',
    type: 'copy',
    url: 'https://chat.mistral.ai/',
  },
  {
    name: 'DeepSeek',
    icon: '🐋',
    description: 'DeepSeek Chat',
    type: 'copy',
    url: 'https://chat.deepseek.com/',
  },
  {
    name: 'Grok',
    icon: '⚡',
    description: 'xAI Grok',
    type: 'copy',
    url: 'https://grok.com/',
  },
]

const sendToAI = async (ai) => {
  const prompt = execution.value?.final_content
  if (!prompt) return

  if (ai.type === 'url') {
    const encoded = encodeURIComponent(prompt)
    
    // Si l'URL serait trop longue (> 2000 chars), copier à la place
    if ((ai.url + encoded).length > 2000) {
      await navigator.clipboard.writeText(prompt)
      window.open(ai.url, '_blank')
      alert(`⚠️ Prompt trop long pour l'injection URL.\n✅ Prompt copié ! Collez-le dans ${ai.name} avec Ctrl+V`)
      return
    }

    window.open(ai.url + encoded, '_blank')
  } else {
    await navigator.clipboard.writeText(prompt)
    window.open(ai.url, '_blank')
    alert(`✅ Prompt copié ! Collez-le dans ${ai.name} avec Ctrl+V`)
  }
}

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(execution.value?.final_content)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

onMounted(async () => {
  try {
    const res = await api.get(`/executions/${route.params.id}`)
    execution.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>