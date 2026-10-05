<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ==================== LOADING ==================== -->
    <div
      v-if="loading"
      class="min-h-[70vh] flex flex-col items-center justify-center"
    >
      <div
        class="w-12 h-12 border-4 border-gray-200
               border-t-bp-red rounded-full animate-spin"
      ></div>

      <p class="mt-5 text-sm font-medium text-gray-700">
        Chargement du résultat...
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Récupération de l'évaluation technique
      </p>
    </div>


    <!-- ==================== ERROR ==================== -->
    <div
      v-else-if="error"
      class="min-h-[70vh] flex items-center justify-center p-6"
    >

      <div
        class="max-w-lg w-full bg-white rounded-xl
               border border-red-200 shadow-sm p-7"
      >

        <div class="flex items-start gap-4">

          <div
            class="w-11 h-11 rounded-lg bg-red-50
                   flex items-center justify-center shrink-0"
          >
            ⚠️
          </div>

          <div>
            <h2 class="font-semibold text-gray-800">
              Impossible de charger l'évaluation
            </h2>

            <p class="text-sm text-gray-500 mt-1">
              {{ error }}
            </p>
          </div>

        </div>

        <button
          @click="$router.push('/technical-evaluation')"
          class="mt-6 px-4 py-2.5 bg-bp-red
                 text-white rounded-lg text-sm font-medium
                 hover:opacity-90 transition"
        >
          ← Nouvelle évaluation
        </button>

      </div>

    </div>


    <!-- ==================== RESULT ==================== -->
    <div v-else-if="evaluation">

      <!-- ==================== HEADER ==================== -->
      <div class="bg-white border-b border-gray-200">

        <div class="px-8 py-6">

          <div
            class="flex flex-col lg:flex-row
                   lg:items-center lg:justify-between gap-5"
          >

            <!-- Left -->
            <div class="flex items-start gap-4">

              <div
                class="w-12 h-12 rounded-xl bg-red-50
                       flex items-center justify-center shrink-0"
              >
                📊
              </div>

              <div>

                <div class="flex items-center gap-3 flex-wrap">

                  <h1 class="text-2xl font-bold text-gray-800">
                    Évaluation technique
                  </h1>

                  <span
                    class="inline-flex items-center gap-1.5
                           px-3 py-1 rounded-full
                           text-xs font-semibold"
                    :class="
                      evaluation.statut === 'CONFORME'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    <span>
                      {{
                        evaluation.statut === 'CONFORME'
                          ? '✓'
                          : '✗'
                      }}
                    </span>

                    {{ evaluation.statut }}
                  </span>

                </div>

                <p class="text-sm text-gray-500 mt-1">
                  Résultat de l'analyse technique de l'offre fournisseur
                </p>

              </div>

            </div>


            <!-- Actions -->
            <div class="flex items-center gap-3">

              <button
                @click="$router.push('/technical-evaluation')"
                class="inline-flex items-center gap-2
                       px-4 py-2.5
                       bg-white border border-gray-200
                       rounded-lg text-sm font-medium
                       text-gray-600
                       hover:bg-gray-50
                       transition"
              >
                <span>＋</span>
                Nouvelle évaluation
              </button>

            </div>

          </div>

        </div>

      </div>


      <!-- ==================== CONTENT ==================== -->
      <div class="px-8 py-8">

        <div class="max-w-7xl mx-auto">


          <!-- ==================== SUPPLIER ==================== -->
          <div
            class="bg-white rounded-xl border border-gray-200
                   shadow-sm p-6 mb-6"
          >

            <div
              class="flex flex-col md:flex-row
                     md:items-center md:justify-between gap-5"
            >

              <div class="flex items-center gap-4">

                <div
                  class="w-12 h-12 rounded-full
                         bg-gray-100 flex items-center
                         justify-center text-xl"
                >
                  🏢
                </div>

                <div>

                  <p
                    class="text-xs font-medium text-gray-400
                           uppercase tracking-wide"
                  >
                    Fournisseur évalué
                  </p>

                  <h2 class="text-xl font-bold text-gray-800 mt-1">
                    {{ evaluation.nom_fournisseur }}
                  </h2>

                </div>

              </div>


              <div class="flex items-center gap-8">

                <div>
                  <p class="text-xs text-gray-400">
                    Exigences
                  </p>

                  <p class="text-lg font-semibold text-gray-800 mt-1">
                    {{ evaluation.requirements.length }}
                  </p>
                </div>

                <div class="h-8 w-px bg-gray-200"></div>

                <div>
                  <p class="text-xs text-gray-400">
                    Évaluation
                  </p>

                  <p class="text-lg font-semibold text-gray-800 mt-1">
                    #{{ evaluation.id }}
                  </p>
                </div>

              </div>

            </div>

          </div>


          <!-- ==================== SCORE ==================== -->
          <div
            class="grid grid-cols-1 lg:grid-cols-3
                   gap-6 mb-6"
          >

            <!-- Main score -->
            <div
              class="lg:col-span-1
                     bg-white rounded-xl
                     border border-gray-200
                     shadow-sm p-6"
            >

              <div class="flex items-center justify-between">

                <div>
                  <p class="text-sm font-medium text-gray-500">
                    Score technique
                  </p>

                  <p class="text-4xl font-bold text-gray-800 mt-2">
                    {{ evaluation.note_finale }}

                    <span
                      class="text-xl font-medium text-gray-400"
                    >
                      / {{ evaluation.note_maximale }}
                    </span>
                  </p>
                </div>

                <div
                  class="w-16 h-16 rounded-full
                         flex items-center justify-center
                         text-sm font-bold"
                  :class="
                    evaluation.statut === 'CONFORME'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  "
                >
                  {{ evaluation.pourcentage }}%
                </div>

              </div>


              <!-- Progress -->
              <div class="mt-6">

                <div
                  class="h-2.5 bg-gray-100 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full rounded-full transition-all duration-700"
                    :class="
                      evaluation.statut === 'CONFORME'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    "
                    :style="{
                      width: `${Math.min(
                        Number(evaluation.pourcentage),
                        100
                      )}%`
                    }"
                  ></div>
                </div>

                <div
                  class="flex justify-between mt-2
                         text-xs text-gray-400"
                >
                  <span>0%</span>
                  <span>100%</span>
                </div>

              </div>

            </div>


            <!-- Conformes -->
            <div
              class="bg-white rounded-xl
                     border border-gray-200
                     shadow-sm p-6"
            >

              <div class="flex items-center gap-4">

                <div
                  class="w-11 h-11 rounded-lg
                         bg-green-50
                         flex items-center justify-center"
                >
                  ✓
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    Exigences conformes
                  </p>

                  <p class="text-3xl font-bold text-gray-800 mt-1">
                    {{ conformCount }}
                  </p>
                </div>

              </div>

              <div class="mt-5">

                <div
                  class="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-green-500 rounded-full"
                    :style="{
                      width: `${conformPercentage}%`
                    }"
                  ></div>
                </div>

                <p class="text-xs text-gray-400 mt-2">
                  {{ conformPercentage }}% des exigences
                </p>

              </div>

            </div>


            <!-- Non conformes -->
            <div
              class="bg-white rounded-xl
                     border border-gray-200
                     shadow-sm p-6"
            >

              <div class="flex items-center gap-4">

                <div
                  class="w-11 h-11 rounded-lg
                         bg-red-50
                         flex items-center justify-center"
                >
                  ✕
                </div>

                <div>
                  <p class="text-sm text-gray-500">
                    Exigences non conformes
                  </p>

                  <p class="text-3xl font-bold text-gray-800 mt-1">
                    {{ nonConformCount }}
                  </p>
                </div>

              </div>

              <div class="mt-5">

                <div
                  class="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-red-500 rounded-full"
                    :style="{
                      width: `${nonConformPercentage}%`
                    }"
                  ></div>
                </div>

                <p class="text-xs text-gray-400 mt-2">
                  {{ nonConformPercentage }}% des exigences
                </p>

              </div>

            </div>

          </div>


          <!-- ==================== DETAILS ==================== -->
          <div
            class="bg-white rounded-xl
                   border border-gray-200
                   shadow-sm overflow-hidden"
          >

            <!-- Header -->
            <div
              class="px-6 py-5 border-b border-gray-100"
            >

              <div
                class="flex flex-col lg:flex-row
                       lg:items-center
                       lg:justify-between gap-4"
              >

                <div>

                  <h2 class="text-lg font-semibold text-gray-800">
                    Détail de l'évaluation
                  </h2>

                  <p class="text-sm text-gray-500 mt-1">
                    Comparaison des exigences du cahier des charges
                    avec les caractéristiques de l'offre.
                  </p>

                </div>


                <!-- Search -->
                <div class="relative w-full lg:w-72">

                  <span
                    class="absolute left-3 top-1/2
                           -translate-y-1/2
                           text-gray-400"
                  >
                    🔎
                  </span>

                  <input
                    v-model="search"
                    type="text"
                    placeholder="Rechercher une exigence..."
                    class="w-full pl-9 pr-4 py-2.5
                           border border-gray-200
                           rounded-lg text-sm
                           focus:outline-none
                           focus:ring-2
                           focus:ring-red-500/20
                           focus:border-bp-red"
                  />

                </div>

              </div>


              <!-- Filters -->
              <div class="flex items-center gap-2 mt-5">

                <button
                  v-for="filter in filters"
                  :key="filter.value"
                  @click="activeFilter = filter.value"
                  class="px-3 py-1.5 rounded-lg
                         text-xs font-medium transition"
                  :class="
                    activeFilter === filter.value
                      ? 'bg-bp-red text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  "
                >
                  {{ filter.label }}

                  <span
                    class="ml-1 opacity-75"
                  >
                    {{ filter.count }}
                  </span>

                </button>

              </div>

            </div>


            <!-- Table -->
            <div class="overflow-x-auto">

              <table class="w-full">

                <thead class="bg-gray-50">

                  <tr>

                    <th
                      class="px-5 py-4 text-left
                             text-[11px] font-semibold
                             text-gray-500 uppercase
                             tracking-wide w-14"
                    >
                      #
                    </th>

                    <th
                      class="px-5 py-4 text-left
                             text-[11px] font-semibold
                             text-gray-500 uppercase
                             tracking-wide"
                    >
                      Exigence technique
                    </th>

                    <th
                      class="px-5 py-4 text-left
                             text-[11px] font-semibold
                             text-gray-500 uppercase
                             tracking-wide"
                    >
                      Valeur demandée
                    </th>

                    <th
                      class="px-5 py-4 text-left
                             text-[11px] font-semibold
                             text-gray-500 uppercase
                             tracking-wide"
                    >
                      Valeur offerte
                    </th>

                    <th
                      class="px-5 py-4 text-center
                             text-[11px] font-semibold
                             text-gray-500 uppercase
                             tracking-wide w-40"
                    >
                      Conformité
                    </th>

                  </tr>

                </thead>


                <tbody
                  v-if="filteredRequirements.length > 0"
                  class="divide-y divide-gray-100"
                >

                  <tr
                    v-for="item in filteredRequirements"
                    :key="item.requirement.id"
                    class="hover:bg-gray-50 transition"
                  >

                    <!-- Number -->
                    <td
                      class="px-5 py-4
                             text-sm text-gray-400
                             align-top"
                    >
                      {{ item.index + 1 }}
                    </td>


                    <!-- Requirement -->
                    <td
                      class="px-5 py-4
                             align-top min-w-[280px]"
                    >

                      <p
                        class="text-sm font-medium
                               text-gray-800"
                      >
                        {{ item.requirement.description }}
                      </p>

                      <span
                        v-if="item.requirement.obligatoire"
                        class="inline-flex mt-2
                               px-2 py-0.5
                               rounded text-[10px]
                               font-medium
                               bg-orange-50
                               text-orange-600"
                      >
                        Obligatoire
                      </span>

                    </td>


                    <!-- Requested -->
                    <td
                      class="px-5 py-4
                             text-sm text-gray-600
                             align-top min-w-[190px]"
                    >
                      <div
                        class="bg-gray-50 rounded-lg
                               px-3 py-2"
                      >
                        {{
                          item.requirement.valeur_demandee ||
                          '—'
                        }}
                      </div>
                    </td>


                    <!-- Offered -->
                    <td
                      class="px-5 py-4
                             text-sm text-gray-600
                             align-top min-w-[190px]"
                    >

                      <div
                        class="rounded-lg px-3 py-2"
                        :class="
                          item.requirement.result?.conforme
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        "
                      >

                        {{
                          item.requirement.result?.valeur_offerte ||
                          'Non trouvée'
                        }}

                      </div>

                    </td>


                    <!-- Status -->
                    <td
                      class="px-5 py-4
                             text-center align-top"
                    >

                      <span
                        v-if="item.requirement.result?.conforme"
                        class="inline-flex items-center
                               gap-2 px-3 py-1.5
                               rounded-full
                               bg-green-100
                               text-green-700
                               text-xs font-semibold"
                      >
                        <span
                          class="w-1.5 h-1.5
                                 rounded-full
                                 bg-green-500"
                        ></span>

                        Conforme
                      </span>

                      <span
                        v-else
                        class="inline-flex items-center
                               gap-2 px-3 py-1.5
                               rounded-full
                               bg-red-100
                               text-red-700
                               text-xs font-semibold"
                      >
                        <span
                          class="w-1.5 h-1.5
                                 rounded-full
                                 bg-red-500"
                        ></span>

                        Non conforme
                      </span>

                    </td>

                  </tr>

                </tbody>


                <!-- Empty -->
                <tbody v-else>

                  <tr>

                    <td
                      colspan="5"
                      class="px-6 py-14 text-center"
                    >

                      <div
                        class="w-12 h-12 rounded-full
                               bg-gray-100
                               flex items-center justify-center
                               mx-auto"
                      >
                        🔎
                      </div>

                      <p
                        class="mt-3 text-sm
                               font-medium text-gray-700"
                      >
                        Aucune exigence trouvée
                      </p>

                      <p class="text-xs text-gray-400 mt-1">
                        Essayez une autre recherche ou un autre filtre.
                      </p>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>


            <!-- Footer -->
            <div
              class="px-6 py-4 border-t border-gray-100
                     bg-gray-50"
            >

              <div
                class="flex flex-col sm:flex-row
                       sm:items-center
                       sm:justify-between gap-2"
              >

                <p class="text-xs text-gray-400">
                  {{ filteredRequirements.length }}
                  exigence(s) affichée(s) sur
                  {{ evaluation.requirements.length }}
                </p>

                <p class="text-xs text-gray-400">
                  Évaluation #{{ evaluation.id }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTechnicalEvaluation } from '../api/technicalEvaluation'

const route = useRoute()

const evaluation = ref(null)
const loading = ref(true)
const error = ref('')

const search = ref('')
const activeFilter = ref('all')


const conformCount = computed(() => {
  if (!evaluation.value) {
    return 0
  }

  return evaluation.value.requirements.filter(
    requirement => requirement.result?.conforme
  ).length
})


const nonConformCount = computed(() => {
  if (!evaluation.value) {
    return 0
  }

  return evaluation.value.requirements.length - conformCount.value
})


const conformPercentage = computed(() => {
  if (!evaluation.value?.requirements.length) {
    return 0
  }

  return Math.round(
    (conformCount.value /
      evaluation.value.requirements.length) * 100
  )
})


const nonConformPercentage = computed(() => {
  if (!evaluation.value?.requirements.length) {
    return 0
  }

  return Math.round(
    (nonConformCount.value /
      evaluation.value.requirements.length) * 100
  )
})


const filters = computed(() => [
  {
    label: 'Toutes',
    value: 'all',
    count: evaluation.value?.requirements.length || 0
  },
  {
    label: 'Conformes',
    value: 'conforme',
    count: conformCount.value
  },
  {
    label: 'Non conformes',
    value: 'non-conforme',
    count: nonConformCount.value
  }
])


const filteredRequirements = computed(() => {

  if (!evaluation.value) {
    return []
  }

  return evaluation.value.requirements
    .map((requirement, index) => ({
      requirement,
      index
    }))
    .filter(item => {

      const requirement = item.requirement

      // Filter status
      if (
        activeFilter.value === 'conforme' &&
        !requirement.result?.conforme
      ) {
        return false
      }

      if (
        activeFilter.value === 'non-conforme' &&
        requirement.result?.conforme
      ) {
        return false
      }

      // Search
      if (!search.value.trim()) {
        return true
      }

      const query = search.value.toLowerCase()

      const description =
        requirement.description?.toLowerCase() || ''

      const demanded =
        requirement.valeur_demandee?.toLowerCase() || ''

      const offered =
        requirement.result?.valeur_offerte?.toLowerCase() || ''

      return (
        description.includes(query) ||
        demanded.includes(query) ||
        offered.includes(query)
      )
    })
})


const loadEvaluation = async () => {

  loading.value = true
  error.value = ''

  try {

    const response = await getTechnicalEvaluation(
      route.params.id
    )

    evaluation.value = response.data.evaluation

  } catch (err) {

    console.error(err)

    error.value =
      err.response?.data?.error ||
      err.response?.data?.message ||
      'Impossible de charger l’évaluation.'

  } finally {

    loading.value = false

  }
}


onMounted(() => {
  loadEvaluation()
})
</script>