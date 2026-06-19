<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-bp-red to-bp-red-dark rounded-2xl p-6 text-white">
      <h2 class="text-2xl font-bold mb-1">Bienvenue sur Prompt Manager</h2>
      <p class="text-red-100 text-sm">Gérez et déployez vos prompts IA en toute simplicité</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="stat in stats" :key="stat.label"
           class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
             :class="stat.bg">
          {{ stat.icon }}
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-800">{{ stat.value }}</p>
          <p class="text-sm text-gray-500">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Prompts récents -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="font-semibold text-gray-800">Prompts récents</h3>
        <router-link to="/prompts"
          class="text-sm text-bp-red hover:underline font-medium">
          Voir tout →
        </router-link>
      </div>

      <div v-if="loading" class="p-6 text-center text-gray-400">
        Chargement...
      </div>

      <div v-else-if="prompts.length === 0" class="p-6 text-center text-gray-400">
        Aucun prompt disponible
      </div>

      <div v-else class="divide-y divide-gray-50">
        <div v-for="prompt in prompts.slice(0, 5)" :key="prompt.id"
             class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <span class="text-bp-red text-sm">📝</span>
            </div>
            <div>
              <p class="font-medium text-gray-800 text-sm">{{ prompt.title }}</p>
              <p class="text-xs text-gray-400">
                {{ prompt.variables?.length || 0 }} variable(s) •
                {{ prompt.source === 'upload' ? '📎 Word' : '✏️ Manuel' }}
              </p>
            </div>
          </div>
          <router-link :to="`/prompts/${prompt.id}`"
            class="bg-bp-red text-white text-xs px-3 py-1.5 rounded-lg hover:bg-bp-red-dark transition-colors">
            Utiliser
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const prompts = ref([])
const loading = ref(true)

const stats = ref([
  { icon: '📝', label: 'Total Prompts',    value: 0, bg: 'bg-red-50' },
  { icon: '⚡', label: 'Exécutions',       value: 0, bg: 'bg-orange-50' },
  { icon: '📂', label: 'Catégories',       value: 0, bg: 'bg-blue-50' },
])

onMounted(async () => {
  try {
    const [promptsRes, categoriesRes] = await Promise.all([
      api.get('/prompts'),
      api.get('/categories'),
    ])
    prompts.value = promptsRes.data
    stats.value[0].value = promptsRes.data.length
    stats.value[2].value = categoriesRes.data.length
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>