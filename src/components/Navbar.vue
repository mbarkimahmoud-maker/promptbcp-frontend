<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <div>
      <h2 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h2>
      <p class="text-xs text-gray-400">Plateforme de gestion des prompts IA</p>
    </div>

    <div class="flex items-center gap-4">
      <!-- Badge DSI -->
      <span class="bg-red-50 text-bp-red text-xs font-medium px-3 py-1 rounded-full border border-red-200">
        DSI Groupe
      </span>

      <!-- Avatar utilisateur -->
      <div class="flex items-center gap-2">
        <div class="w-9 h-9 bg-bp-red rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-bold">BP</span>
        </div>
        <div class="hidden md:block">
          <p class="text-sm font-medium text-gray-700">Administrateur</p>
          <p class="text-xs text-gray-400">admin@bp.ma</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    '/':        'Dashboard',
    '/prompts': 'Gestion des Prompts',
    '/upload':  'Upload Fichier Word',
  }
  return titles[route.path] || 'Prompt Manager'
})
</script>