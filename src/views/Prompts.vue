<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Mes Prompts</h2>
        <p class="text-sm text-gray-400">Gérez tous vos templates de prompts</p>
      </div>
      <router-link to="/upload"
        class="bg-bp-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-bp-red-dark transition-colors flex items-center gap-2">
        ➕ Nouveau Prompt
      </router-link>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3 flex-wrap">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Rechercher un prompt..."
        class="flex-1 min-w-48 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-bp-red"
      />
      <select
        v-model="selectedCategory"
        class="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-bp-red"
      >
        <option value="">Toutes les catégories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Liste prompts -->
    <div v-if="loading" class="text-center py-12 text-gray-400">
      Chargement...
    </div>

    <div v-else-if="filteredPrompts.length === 0" 
         class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <p class="text-4xl mb-3">📭</p>
      <p class="text-gray-500 font-medium">Aucun prompt trouvé</p>
      <p class="text-gray-400 text-sm mt-1">Uploadez un fichier Word ou créez un prompt manuellement</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="prompt in filteredPrompts" :key="prompt.id"
           class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <!-- Header carte -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <span>{{ prompt.source === 'upload' ? '📎' : '✏️' }}</span>
            </div>
            <div>
              <p class="font-semibold text-gray-800 text-sm leading-tight">{{ prompt.title }}</p>
              <p class="text-xs text-gray-400">{{ prompt.category?.name || 'Sans catégorie' }}</p>
            </div>
          </div>
          <span class="text-xs bg-red-50 text-bp-red px-2 py-1 rounded-full font-medium">
            {{ prompt.variables?.length || 0 }} vars
          </span>
        </div>

        <!-- Variables -->
        <div v-if="prompt.variables?.length" class="flex flex-wrap gap-1 mb-4">
          <span v-for="v in prompt.variables.slice(0, 3)" :key="v.id"
                class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {{ v.name }}
          </span>
          <span v-if="prompt.variables.length > 3"
                class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            +{{ prompt.variables.length - 3 }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <router-link :to="`/prompts/${prompt.id}`"
            class="flex-1 bg-bp-red text-white text-xs py-2 rounded-lg text-center font-medium hover:bg-bp-red-dark transition-colors">
            Utiliser
          </router-link>
          <button @click="deletePrompt(prompt.id)"
            class="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors text-gray-400 hover:text-bp-red">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api/index.js'

const prompts = ref([])
const categories = ref([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref('')

const filteredPrompts = computed(() => {
  return prompts.value.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = !selectedCategory.value || p.category_id == selectedCategory.value
    return matchSearch && matchCat
  })
})

const deletePrompt = async (id) => {
  if (!confirm('Supprimer ce prompt ?')) return
  await api.delete(`/prompts/${id}`)
  prompts.value = prompts.value.filter(p => p.id !== id)
}

onMounted(async () => {
  try {
    const [p, c] = await Promise.all([
      api.get('/prompts'),
      api.get('/categories'),
    ])
    prompts.value = p.data
    categories.value = c.data
  } finally {
    loading.value = false
  }
})
</script>