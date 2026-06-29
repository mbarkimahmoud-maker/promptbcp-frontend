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

      <!-- IA Interne -->
<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-semibold text-gray-800 flex items-center gap-2">
      <span class="text-2xl">🤖</span>
      IA Interne
    </h3>
    <span class="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">
      Intégré
    </span>
  </div>

  <!-- Sélecteur de modèle -->
  <div class="flex gap-2 mb-3">
    <button @click="selectedModel = 'gemini'"
      class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors border"
      :class="selectedModel === 'gemini' ? 'bg-bp-red text-white border-bp-red' : 'border-gray-200 text-gray-600 hover:bg-gray-50'">
      ✨ Gemini
    </button>
    <button @click="selectedModel = 'groq'"
      class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors border"
      :class="selectedModel === 'groq' ? 'bg-bp-red text-white border-bp-red' : 'border-gray-200 text-gray-600 hover:bg-gray-50'">
      ⚡ Groq (Llama)
    </button>
  </div>

  <button @click="askAI"
    :disabled="askingGemini"
    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
    <span v-if="askingGemini">⏳ Génération en cours... (jusqu'à 2 min pour les prompts longs)</span>
    <span v-else>{{ selectedModel === 'gemini' ? '✨ Générer avec Gemini' : '⚡ Générer avec Groq' }}</span>
  </button>

        

        <!-- Erreur Gemini -->
        <div v-if="geminiError" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-700">❌ {{ geminiError }}</p>
        </div>

        <!-- Réponse Gemini -->
        <div v-if="geminiResponse" class="mt-4 space-y-3">
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <!-- Header de la réponse -->
            <div class="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
              <span class="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Réponse générée
              </span>
              <span class="text-xs text-gray-400">{{ wordCount }} mots</span>
            </div>

            <!-- Contenu -->
            <div class="bg-white p-5 max-h-[600px] overflow-y-auto">
              <div class="ai-response" v-html="renderedResponse"></div>
            </div>
          </div>

          <div class="flex gap-2">
            <button @click="copyGeminiResponse"
              class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span>{{ geminiCopied ? '✅' : '📋' }}</span>
              {{ geminiCopied ? 'Copié !' : 'Copier' }}
            </button>
            <button @click="downloadGeminiResponse"
              class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              📥 Télécharger (.txt)
            </button>
            <button @click="showEmailModal = true"
              class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              ✉️ Envoyer par email
            </button>
             <button @click="downloadPDF"
            class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            📄 PDF
          </button>
          </div>
        </div>
        <!-- fin v-if geminiResponse -->
      </div>
      <!-- fin bloc IA Interne Gemini -->

      <!-- Modal email -->
      <div v-if="showEmailModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           @click.self="showEmailModal = false">
        <div class="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 class="font-semibold text-gray-800 mb-3">Envoyer par email</h3>
          <div class="space-y-2 mb-3">
  <label class="block text-sm font-medium text-gray-700">Destinataires</label>
  <div v-for="(email, index) in emailList" :key="index" class="flex gap-2">
    <input v-model="emailList[index]" type="email" placeholder="destinataire@exemple.com"
      class="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-bp-red" />
    <button v-if="emailList.length > 1" @click="removeEmailField(index)"
      class="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 text-gray-400 hover:text-bp-red">
      ✕
    </button>
  </div>
  <button @click="addEmailField"
    class="text-sm text-bp-red hover:underline font-medium">
    ➕ Ajouter un destinataire
  </button>
</div>
          <div v-if="emailSuccess" class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 mb-3">
            ✅ Email envoyé avec succès !
          </div>
          <div v-if="emailError" class="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-3">
            ❌ {{ emailError }}
          </div>

          <div class="flex gap-2">
            <button @click="showEmailModal = false"
              class="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <button @click="sendEmail"
              :disabled="emailList.every(e => !e.trim()) || sendingEmail"
              class="flex-1 bg-bp-red text-white py-2.5 rounded-lg text-sm font-medium hover:bg-bp-red-dark transition-colors disabled:opacity-50">
              {{ sendingEmail ? 'Envoi...' : 'Envoyer' }}
            </button>
            
          </div>
        </div>
      </div>
      <!-- fin modal email -->

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
      <!-- fin IAs disponibles -->

      <!-- Instructions -->
      <div class="bg-red-50 border border-red-100 rounded-xl p-4">
        <p class="text-sm font-medium text-bp-red mb-1">💡 Comment ça marche ?</p>
        <ul class="text-xs text-red-700 space-y-1">
          <li>• <strong>Lien direct</strong> : Le prompt est injecté automatiquement dans l'URL de l'IA</li>
          <li>• <strong>Copier &amp; Ouvrir</strong> : Le prompt est copié, puis l'IA s'ouvre — collez avec Ctrl+V</li>
        </ul>
      </div>
      <!-- fin instructions -->

    </div>
    <!-- fin v-else loading -->
  </div>
  <!-- fin div racine -->
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/index.js'
import { marked } from 'marked'
import html2pdf from 'html2pdf.js'


marked.setOptions({
  breaks: true,
  gfm: true,
})

const route = useRoute()
const execution = ref(null)
const loading = ref(true)
const copied = ref(false)
const selectedModel = ref('gemini')

const askingGemini = ref(false)
const geminiResponse = ref(null)
const geminiError = ref(null)
const geminiCopied = ref(false)

const askAI = async () => {
  askingGemini.value = true
  geminiError.value = null
  geminiResponse.value = null
  try {
    const endpoint = selectedModel.value === 'gemini' ? 'gemini' : 'groq'
    const res = await api.post(`/ai/executions/${execution.value.id}/${endpoint}`)
    geminiResponse.value = res.data.response
  } catch (e) {
    geminiError.value = e.response?.data?.error || 'Erreur lors de la génération'
  } finally {
    askingGemini.value = false
  }
}

const downloadPDF = async () => {
  try {
    const response = await api.post(`/executions/${execution.value.id}/generate-pdf`, {
      html_content: renderedResponse.value,
    }, {
      responseType: 'blob'
    })
    
    const url = URL.createObjectURL(new Blob([response.data]))
    const a = document.createElement('a')
    a.href = url
    a.download = `reponse_gemini_${Date.now()}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    alert('Erreur lors de la génération du PDF')
  }
}
  
  

const renderedResponse = computed(() => {
  if (!geminiResponse.value) return ''
  
  // Nettoyer les blocs de code qui entourent les tableaux markdown
  let cleaned = geminiResponse.value
  
  // Retirer les ```  qui entourent un tableau (détecte | au début de ligne après ```)
  cleaned = cleaned.replace(/```\n(\|.*\|[\s\S]*?)\n```/g, '$1')
  cleaned = cleaned.replace(/```markdown\n(\|.*\|[\s\S]*?)\n```/g, '$1')
  
  return marked.parse(cleaned)
})

const wordCount = computed(() => {
  if (!geminiResponse.value) return 0
  return geminiResponse.value.trim().split(/\s+/).length
})

const downloadGeminiResponse = () => {
  const blob = new Blob([geminiResponse.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reponse_gemini_${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const copyGeminiResponse = async () => {
  await navigator.clipboard.writeText(geminiResponse.value)
  geminiCopied.value = true
  setTimeout(() => geminiCopied.value = false, 2000)
}

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

const showEmailModal = ref(false)
const emailList = ref([''])
const addEmailField = () => {
  emailList.value.push('')
}
const removeEmailField = (index) => {
  emailList.value.splice(index, 1)
}
const sendingEmail = ref(false)
const emailSuccess = ref(false)
const emailError = ref(null)

const sendEmail = async () => {
  sendingEmail.value = true
  emailError.value = null
  emailSuccess.value = false
  try {
    const validEmails = emailList.value.filter(e => e.trim() !== '')
    await api.post(`/executions/${execution.value.id}/send-email`, {
      emails: validEmails,
      html_content: renderedResponse.value,
    })
    emailSuccess.value = true
    setTimeout(() => {
      showEmailModal.value = false
      emailSuccess.value = false
      emailList.value = ['']
    }, 2000)
  } catch (e) {
    emailError.value = e.response?.data?.error || 'Erreur lors de l\'envoi'
  } finally {
    sendingEmail.value = false
  }
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

<style scoped>
.ai-response {
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
}

.ai-response :deep(h1) {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 20px 0 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f3f4f6;
}

.ai-response :deep(h1:first-child) {
  margin-top: 0;
}

.ai-response :deep(h2) {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
  margin: 18px 0 10px;
}

.ai-response :deep(h3) {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 14px 0 8px;
}

.ai-response :deep(p) {
  margin: 10px 0;
}

.ai-response :deep(strong) {
  font-weight: 600;
  color: #111827;
}

.ai-response :deep(em) {
  font-style: italic;
  color: #6b7280;
}

.ai-response :deep(ul),
.ai-response :deep(ol) {
  margin: 10px 0;
  padding-left: 24px;
}

.ai-response :deep(li) {
  margin: 4px 0;
}

.ai-response :deep(ul li) {
  list-style-type: disc;
}

.ai-response :deep(ul li::marker) {
  color: #CC0000;
}

.ai-response :deep(hr) {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

.ai-response :deep(code) {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #CC0000;
}

.ai-response :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 12px;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.ai-response :deep(thead) {
  background: linear-gradient(to right, #CC0000, #990000);
}

.ai-response :deep(th) {
  color: white;
  font-weight: 600;
  padding: 10px 14px;
  text-align: left;
  white-space: nowrap;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.ai-response :deep(td) {
  padding: 10px 14px;
  border-bottom: 1px solid #f3f4f6;
  white-space: normal;
  min-width: 140px;
  vertical-align: top;
}

.ai-response :deep(tbody tr:nth-child(even)) {
  background-color: #fafafa;
}

.ai-response :deep(tbody tr:hover) {
  background-color: #fef2f2;
}

.ai-response :deep(blockquote) {
  border-left: 3px solid #CC0000;
  padding-left: 16px;
  margin: 12px 0;
  color: #6b7280;
  font-style: italic;
}
</style>