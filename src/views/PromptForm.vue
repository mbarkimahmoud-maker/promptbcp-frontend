<template>
  <div class="space-y-6 max-w-3xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <router-link to="/prompts"
        class="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
        ←
      </router-link>
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ prompt?.title }}</h2>
        <p class="text-sm text-gray-400">Remplissez les variables pour générer le prompt final</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-400">Chargement...</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Formulaire variables -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 class="font-semibold text-gray-800 flex items-center gap-2">
          <span class="w-6 h-6 bg-bp-red rounded-full flex items-center justify-center text-white text-xs">1</span>
          Remplir les variables
        </h3>

        <div v-if="variables.length === 0" class="text-center py-6 text-gray-400">
          <p class="text-2xl mb-2">✅</p>
          <p class="text-sm">Ce prompt n'a pas de variables</p>
        </div>

        <div v-else class="space-y-3">
          <div v-for="variable in variables" :key="variable.id">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ variable.label || variable.name }}
              <span class="text-bp-red">*</span>
            </label>
            <textarea
              v-model="values[variable.name]"
              :placeholder="`Entrez ${variable.label || variable.name}...`"
              rows="3"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-bp-red resize-none"
            />
          </div>
        </div>

        <button @click="generatePrompt"
          :disabled="generating"
          class="w-full bg-bp-red text-white py-3 rounded-lg font-medium hover:bg-bp-red-dark transition-colors disabled:opacity-50">
          {{ generating ? '⏳ Génération...' : '⚡ Générer le prompt final' }}
        </button>
      </div>

      <!-- Aperçu résultat -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 class="font-semibold text-gray-800 flex items-center gap-2">
          <span class="w-6 h-6 bg-bp-red rounded-full flex items-center justify-center text-white text-xs">2</span>
          Résultat final
        </h3>

        <div v-if="!result" class="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
          <div class="text-center text-gray-300">
            <p class="text-4xl mb-2">📋</p>
            <p class="text-sm">Le prompt généré apparaîtra ici</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre class="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{{ result.final_content }}</pre>
          </div>

          <!-- Actions -->
          <div class="space-y-2">
            <button @click="copyToClipboard"
              class="w-full border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              {{ copied ? '✅ Copié !' : '📋 Copier le texte' }}
            </button>

            <a :href="`http://127.0.0.1:8000/api/executions/${result.execution.id}/download`"
              target="_blank"
              class="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              📥 Télécharger Word
            </a>

            <router-link :to="`/result/${result.execution.id}`"
              class="w-full bg-bp-red text-white py-2.5 rounded-lg text-sm font-medium hover:bg-bp-red-dark transition-colors flex items-center justify-center gap-2 text-center block text-center">
              🚀 Envoyer vers une IA
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/index.js'

const route = useRoute()
const prompt = ref(null)
const variables = ref([])
const values = ref({})
const result = ref(null)
const loading = ref(true)
const generating = ref(false)
const copied = ref(false)

const generatePrompt = async () => {
  generating.value = true
  try {
    const res = await api.post(`/prompts/${route.params.id}/execute`, {
      variables: values.value
    })
    result.value = res.data
  } catch (e) {
    alert('Erreur lors de la génération')
  } finally {
    generating.value = false
  }
}

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(result.value.final_content)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

onMounted(async () => {
  try {
    const res = await api.get(`/prompts/${route.params.id}/form`)
    prompt.value = res.data.prompt
    variables.value = res.data.variables
    // Initialiser les valeurs vides
    variables.value.forEach(v => {
      values.value[v.name] = ''
    })
  } finally {
    loading.value = false
  }
})
</script>