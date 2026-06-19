<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-bold text-gray-800">Nouveau Prompt</h2>
      <p class="text-sm text-gray-400">Uploadez un fichier Word ou créez manuellement</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex border-b border-gray-100">
        <button
          v-for="tab in tabs" :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-3 text-sm font-medium transition-colors"
          :class="activeTab === tab.id
            ? 'bg-bp-red text-white'
            : 'text-gray-500 hover:text-bp-red hover:bg-red-50'"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <div class="p-6">

        <!-- Tab Upload Word -->
        <div v-if="activeTab === 'upload'" class="space-y-4">
          <!-- Zone drop -->
          <div
            @dragover.prevent @drop.prevent="onDrop"
            @click="$refs.fileInput.click()"
            class="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-bp-red hover:bg-red-50 transition-all"
            :class="file ? 'border-bp-red bg-red-50' : ''"
          >
            <input ref="fileInput" type="file" accept=".docx" class="hidden" @change="onFileChange" />
            <div v-if="!file">
              <p class="text-4xl mb-3">📄</p>
              <p class="font-medium text-gray-600">Glissez votre fichier Word ici</p>
              <p class="text-sm text-gray-400 mt-1">ou cliquez pour sélectionner</p>
              <p class="text-xs text-gray-300 mt-2">Format accepté : .docx</p>
            </div>
            <div v-else class="flex items-center justify-center gap-3">
              <span class="text-3xl">📎</span>
              <div class="text-left">
                <p class="font-medium text-bp-red">{{ file.name }}</p>
                <p class="text-xs text-gray-400">{{ (file.size / 1024).toFixed(1) }} KB</p>
              </div>
              <button @click.stop="file = null" class="ml-4 text-gray-400 hover:text-red-500">✕</button>
            </div>
          </div>

          <!-- Titre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre du prompt *</label>
            <input v-model="form.title" type="text" placeholder="Ex: Benchmark IT Sourcing"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red" />
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select v-model="form.category_id"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red">
              <option value="">Sans catégorie</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>

          <button @click="submitUpload"
            :disabled="!file || !form.title || loading"
            class="w-full bg-bp-red text-white py-3 rounded-lg font-medium hover:bg-bp-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Upload en cours...' : '📤 Uploader le fichier' }}
          </button>
        </div>

        <!-- Tab Manuel -->
        <div v-if="activeTab === 'manual'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre du prompt *</label>
            <input v-model="form.title" type="text" placeholder="Ex: Email de relance client"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select v-model="form.category_id"
              class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red">
              <option value="">Sans catégorie</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
            Contenu du prompt *
            <span class="text-gray-400 font-normal ml-1">— utilisez <code>&#123;&#123; variable &#125;&#125;</code> pour les variables</span>
          </label>
            <textarea v-model="form.content" rows="10"
              placeholder="Bonjour {{ nom_client }}, votre dossier {{ numero_dossier }} est en cours de traitement..."
              class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-bp-red font-mono resize-none">
            </textarea>
          </div>

          <!-- Aperçu variables détectées -->
          <div v-if="detectedVariables.length" class="bg-red-50 rounded-lg p-3">
            <p class="text-xs font-medium text-bp-red mb-2">Variables détectées :</p>
            <div class="flex flex-wrap gap-1">
              <span v-for="v in detectedVariables" :key="v"
                class="text-xs bg-white text-bp-red border border-red-200 px-2 py-0.5 rounded-full">
                &#123;&#123; {{ v }} &#125;&#125;
              </span>
            </div>
          </div>

          <button @click="submitManual"
            :disabled="!form.title || !form.content || loading"
            class="w-full bg-bp-red text-white py-3 rounded-lg font-medium hover:bg-bp-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Enregistrement...' : '💾 Enregistrer le prompt' }}
          </button>
        </div>

      </div>
    </div>

    <!-- Message succès -->
    <div v-if="success"
         class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
      <span class="text-2xl">✅</span>
      <div>
        <p class="font-medium text-green-800">Prompt créé avec succès !</p>
        <router-link to="/prompts" class="text-sm text-green-600 hover:underline">
          Voir tous les prompts →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/index.js'

const router = useRouter()
const activeTab = ref('upload')
const loading = ref(false)
const success = ref(false)
const file = ref(null)
const categories = ref([])

const tabs = [
  { id: 'upload', icon: '📎', label: 'Upload Word' },
  { id: 'manual', icon: '✏️', label: 'Créer manuellement' },
]

const form = ref({
  title: '',
  category_id: '',
  content: '',
})

const detectedVariables = computed(() => {
  const matches = form.value.content.match(/\{\{(.*?)\}\}/g) || []
  return [...new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '').trim()))]
})

const onFileChange = (e) => {
  file.value = e.target.files[0]
}

const onDrop = (e) => {
  const dropped = e.dataTransfer.files[0]
  if (dropped?.name.endsWith('.docx')) file.value = dropped
}

const submitUpload = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('title', form.value.title)
    if (form.value.category_id) formData.append('category_id', form.value.category_id)

    await api.post('/prompts/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    success.value = true
    setTimeout(() => router.push('/prompts'), 2000)
  } catch (e) {
    alert('Erreur lors de l\'upload')
  } finally {
    loading.value = false
  }
}

const submitManual = async () => {
  loading.value = true
  try {
    await api.post('/prompts', {
      title: form.value.title,
      content: form.value.content,
      category_id: form.value.category_id || null,
    })
    success.value = true
    setTimeout(() => router.push('/prompts'), 2000)
  } catch (e) {
    alert('Erreur lors de la création')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const res = await api.get('/categories')
  categories.value = res.data
})
</script>