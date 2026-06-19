<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Catégories</h2>
        <p class="text-sm text-gray-400">Organisez vos prompts par catégorie</p>
      </div>
    </div>

    <!-- Formulaire ajout -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="font-semibold text-gray-800 mb-4">➕ Nouvelle catégorie</h3>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
          <input v-model="form.name" type="text" placeholder="Ex: Marketing, RH, Juridique..."
            class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input v-model="form.description" type="text" placeholder="Description optionnelle..."
            class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-bp-red" />
        </div>
        <button @click="addCategory"
          :disabled="!form.name || loading"
          class="w-full bg-bp-red text-white py-2.5 rounded-lg font-medium hover:bg-bp-red-dark transition-colors disabled:opacity-50">
          {{ loading ? 'Enregistrement...' : '💾 Ajouter la catégorie' }}
        </button>
      </div>

      <!-- Message succès -->
      <div v-if="success" class="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
        ✅ Catégorie ajoutée avec succès !
      </div>
      <div v-if="error" class="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
        ❌ {{ error }}
      </div>
    </div>

    <!-- Liste catégories -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="font-semibold text-gray-800">📂 Catégories existantes</h3>
      </div>

      <div v-if="loadingList" class="p-6 text-center text-gray-400">Chargement...</div>

      <div v-else-if="categories.length === 0" class="p-6 text-center text-gray-400">
        <p class="text-2xl mb-2">📭</p>
        <p class="text-sm">Aucune catégorie créée</p>
      </div>

      <div v-else class="divide-y divide-gray-50">
        <div v-for="cat in categories" :key="cat.id"
             class="px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <span class="text-bp-red">📂</span>
            </div>
            <div>
              <p class="font-medium text-gray-800 text-sm">{{ cat.name }}</p>
              <p class="text-xs text-gray-400">
                {{ cat.description || 'Aucune description' }} •
                {{ cat.prompts_count || 0 }} prompt(s)
              </p>
            </div>
          </div>
          <button @click="deleteCategory(cat.id)"
            class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors text-gray-400 hover:text-bp-red text-sm">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const categories = ref([])
const loading = ref(false)
const loadingList = ref(true)
const success = ref(false)
const error = ref('')

const form = ref({
  name: '',
  description: '',
})

const addCategory = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  try {
    const res = await api.post('/categories', {
      name: form.value.name,
      description: form.value.description || null,
    })
    categories.value.unshift(res.data.category)
    form.value = { name: '', description: '' }
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } catch (e) {
    error.value = e.response?.data?.message || 'Erreur lors de la création'
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm('Supprimer cette catégorie ?')) return
  try {
    await api.delete(`/categories/${id}`)
    categories.value = categories.value.filter(c => c.id !== id)
  } catch (e) {
    alert('Erreur lors de la suppression')
  }
}

onMounted(async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data
  } finally {
    loadingList.value = false
  }
})
</script>