<template>
  <aside class="w-64 bg-white shadow-lg flex flex-col min-h-screen">
    <!-- Logo Banque Populaire -->
    <div class="bg-bp-red px-6 py-5 flex items-center gap-3">
      <img src="/logo_BCP.jpg" alt="Banque Populaire" class="h-10 w-auto" 
           onerror="this.style.display='none'" />
      <div>
        <h1 class="text-white font-bold text-sm leading-tight">Banque Populaire</h1>
        <p class="text-red-200 text-xs">Prompt Manager</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-1">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
        :class="$route.path === item.path
          ? 'bg-bp-red text-white shadow-md'
          : 'text-gray-600 hover:bg-red-50 hover:text-bp-red'"
      >
        <span class="text-lg">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-gray-100">
      <p class="text-xs text-gray-400 text-center">© 2026 Banque Populaire</p>
    </div>
  </aside>
</template>

<script setup>
const menuItems = [
  { path: '/',         icon: '📊', label: 'Dashboard' },
  { path: '/prompts',  icon: '📝', label: 'Mes Prompts' },
  { path: '/upload',   icon: '📤', label: 'Upload Word' },
  { path: '/categories',  icon: '📂', label: 'Catégories' },
]
</script>