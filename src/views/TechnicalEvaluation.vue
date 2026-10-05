<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ==================== HEADER ==================== -->
    <div class="bg-white border-b border-gray-200">
      <div class="px-8 py-6">

        <div class="flex items-start justify-between">

          <div class="flex items-start gap-4">

            <!-- Icon -->
            <div
              class="w-12 h-12 rounded-xl bg-red-50
                     flex items-center justify-center shrink-0"
            >
              <span class="text-2xl">⚙️</span>
            </div>

            <div>
              <h1 class="text-2xl font-bold text-gray-800">
                Évaluation technique
              </h1>

              <p class="text-sm text-gray-500 mt-1">
                Évaluez automatiquement la conformité technique
                d'une offre fournisseur.
              </p>
            </div>

          </div>

          <!-- Badge -->
          <div
            class="hidden md:flex items-center gap-2
                   px-3 py-2 rounded-lg
                   bg-green-50 border border-green-100"
          >
            <span class="w-2 h-2 rounded-full bg-green-500"></span>

            <span class="text-xs font-medium text-green-700">
              Évaluation IA disponible
            </span>
          </div>

        </div>

      </div>
    </div>


    <!-- ==================== CONTENT ==================== -->
    <div class="px-8 py-8">

      <div class="max-w-6xl mx-auto">

        <!-- ==================== PROCESS ==================== -->
        <div class="mb-8">

          <div class="flex items-center justify-between">

            <!-- Step 1 -->
            <div class="flex items-center gap-3">

              <div
                class="w-9 h-9 rounded-full bg-bp-red
                       text-white flex items-center justify-center
                       text-sm font-bold"
              >
                1
              </div>

              <div>
                <p class="text-sm font-semibold text-gray-800">
                  Documents
                </p>

                <p class="text-xs text-gray-500">
                  Importer les fichiers
                </p>
              </div>

            </div>

            <div class="hidden sm:block flex-1 h-px bg-gray-200 mx-6"></div>

            <!-- Step 2 -->
            <div class="flex items-center gap-3">

              <div
                class="w-9 h-9 rounded-full bg-gray-100
                       text-gray-400 flex items-center justify-center
                       text-sm font-bold"
              >
                2
              </div>

              <div>
                <p class="text-sm font-medium text-gray-400">
                  Analyse
                </p>

                <p class="text-xs text-gray-400">
                  Comparaison technique
                </p>
              </div>

            </div>

            <div class="hidden sm:block flex-1 h-px bg-gray-200 mx-6"></div>

            <!-- Step 3 -->
            <div class="flex items-center gap-3">

              <div
                class="w-9 h-9 rounded-full bg-gray-100
                       text-gray-400 flex items-center justify-center
                       text-sm font-bold"
              >
                3
              </div>

              <div>
                <p class="text-sm font-medium text-gray-400">
                  Résultat
                </p>

                <p class="text-xs text-gray-400">
                  Rapport de conformité
                </p>
              </div>

            </div>

          </div>

        </div>


        <!-- ==================== MAIN GRID ==================== -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">


          <!-- ==================== LEFT : FORM ==================== -->
          <div class="lg:col-span-2">

            <div
              class="bg-white rounded-xl border border-gray-200
                     shadow-sm overflow-hidden"
            >

              <!-- Card header -->
              <div
                class="px-6 py-5 border-b border-gray-100
                       flex items-center justify-between"
              >

                <div>
                  <h2 class="text-lg font-semibold text-gray-800">
                    Nouvelle évaluation
                  </h2>

                  <p class="text-sm text-gray-500 mt-1">
                    Renseignez les informations nécessaires à l'analyse.
                  </p>
                </div>

                <span
                  class="hidden sm:inline-flex items-center
                         px-3 py-1.5 rounded-full
                         bg-gray-100 text-gray-600
                         text-xs font-medium"
                >
                  PDF uniquement
                </span>

              </div>


              <!-- Form -->
              <form
                @submit.prevent="submitEvaluation"
                class="p-6"
              >

                <!-- Supplier -->
                <div class="mb-7">

                  <label
                    for="supplier"
                    class="block text-sm font-semibold
                           text-gray-700 mb-2"
                  >
                    Fournisseur
                  </label>

                  <div class="relative">

                    <span
                      class="absolute left-4 top-1/2
                             -translate-y-1/2 text-gray-400"
                    >
                      🏢
                    </span>

                    <input
                      id="supplier"
                      v-model="form.nom_fournisseur"
                      type="text"
                      placeholder="Ex : Dell Maroc"
                      required
                      class="w-full pl-11 pr-4 py-3
                             border border-gray-300 rounded-lg
                             text-sm text-gray-800
                             placeholder-gray-400
                             focus:outline-none
                             focus:ring-2 focus:ring-red-500/20
                             focus:border-bp-red
                             transition"
                    />

                  </div>

                  <p class="text-xs text-gray-400 mt-2">
                    Nom de l'entreprise ayant soumis l'offre.
                  </p>

                </div>


                <!-- Documents title -->
                <div class="mb-4">

                  <h3 class="text-sm font-semibold text-gray-800">
                    Documents à analyser
                  </h3>

                  <p class="text-xs text-gray-500 mt-1">
                    Les deux documents sont nécessaires pour lancer
                    l'évaluation.
                  </p>

                </div>


                <!-- Documents -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">


                  <!-- Cahier des charges -->
                  <div
                    class="group relative rounded-xl
                           border border-gray-200
                           bg-gray-50/50
                           hover:border-red-300
                           hover:bg-red-50/20
                           transition-all duration-200"
                  >

                    <div class="p-5">

                      <div class="flex items-start justify-between mb-5">

                        <div
                          class="w-11 h-11 rounded-lg
                                 bg-red-100
                                 flex items-center justify-center"
                        >
                          <span class="text-xl">📋</span>
                        </div>

                        <span
                          class="text-[11px] font-medium
                                 text-gray-400
                                 uppercase tracking-wide"
                        >
                          Document 01
                        </span>

                      </div>

                      <h3 class="font-semibold text-gray-800">
                        Cahier des charges
                      </h3>

                      <p class="text-xs text-gray-500 mt-1 min-h-[32px]">
                        Contient les exigences et spécifications
                        techniques demandées.
                      </p>


                      <!-- Selected file -->
                      <div
                        v-if="form.cahier_des_charges"
                        class="mt-5 p-3 rounded-lg
                               bg-white border border-green-200"
                      >

                        <div class="flex items-center gap-3">

                          <div
                            class="w-9 h-9 rounded-lg
                                   bg-red-50 flex items-center
                                   justify-center shrink-0"
                          >
                            📄
                          </div>

                          <div class="min-w-0">

                            <p
                              class="text-xs font-medium
                                     text-gray-700 truncate"
                            >
                              {{ form.cahier_des_charges.name }}
                            </p>

                            <p class="text-[11px] text-green-600 mt-1">
                              ✓ Document sélectionné
                            </p>

                          </div>

                        </div>

                      </div>


                      <!-- Upload -->
                      <label
                        v-else
                        for="cahier"
                        class="mt-5 flex items-center
                               justify-center gap-2
                               w-full py-2.5
                               rounded-lg
                               border border-red-200
                               bg-white
                               text-bp-red
                               text-sm font-medium
                               cursor-pointer
                               hover:bg-red-50
                               transition"
                      >
                        <span>＋</span>
                        Sélectionner le PDF
                      </label>

                      <input
                        id="cahier"
                        type="file"
                        accept=".pdf"
                        class="hidden"
                        @change="handleCahier"
                      />

                    </div>

                  </div>


                  <!-- Offre fournisseur -->
                  <div
                    class="group relative rounded-xl
                           border border-gray-200
                           bg-gray-50/50
                           hover:border-red-300
                           hover:bg-red-50/20
                           transition-all duration-200"
                  >

                    <div class="p-5">

                      <div class="flex items-start justify-between mb-5">

                        <div
                          class="w-11 h-11 rounded-lg
                                 bg-blue-100
                                 flex items-center justify-center"
                        >
                          <span class="text-xl">📄</span>
                        </div>

                        <span
                          class="text-[11px] font-medium
                                 text-gray-400
                                 uppercase tracking-wide"
                        >
                          Document 02
                        </span>

                      </div>

                      <h3 class="font-semibold text-gray-800">
                        Offre fournisseur
                      </h3>

                      <p class="text-xs text-gray-500 mt-1 min-h-[32px]">
                        Contient les caractéristiques techniques
                        proposées par le fournisseur.
                      </p>


                      <!-- Selected file -->
                      <div
                        v-if="form.offre_fournisseur"
                        class="mt-5 p-3 rounded-lg
                               bg-white border border-green-200"
                      >

                        <div class="flex items-center gap-3">

                          <div
                            class="w-9 h-9 rounded-lg
                                   bg-blue-50 flex items-center
                                   justify-center shrink-0"
                          >
                            📄
                          </div>

                          <div class="min-w-0">

                            <p
                              class="text-xs font-medium
                                     text-gray-700 truncate"
                            >
                              {{ form.offre_fournisseur.name }}
                            </p>

                            <p class="text-[11px] text-green-600 mt-1">
                              ✓ Document sélectionné
                            </p>

                          </div>

                        </div>

                      </div>


                      <!-- Upload -->
                      <label
                        v-else
                        for="offre"
                        class="mt-5 flex items-center
                               justify-center gap-2
                               w-full py-2.5
                               rounded-lg
                               border border-blue-200
                               bg-white
                               text-blue-600
                               text-sm font-medium
                               cursor-pointer
                               hover:bg-blue-50
                               transition"
                      >
                        <span>＋</span>
                        Sélectionner le PDF
                      </label>

                      <input
                        id="offre"
                        type="file"
                        accept=".pdf"
                        class="hidden"
                        @change="handleOffre"
                      />

                    </div>

                  </div>

                </div>


                <!-- Error -->
                <div
                  v-if="error"
                  class="mt-6 flex items-start gap-3
                         p-4 rounded-lg
                         bg-red-50 border border-red-200"
                >

                  <span class="text-red-500">
                    ⚠️
                  </span>

                  <div>
                    <p class="text-sm font-medium text-red-700">
                      Impossible de lancer l'évaluation
                    </p>

                    <p class="text-xs text-red-600 mt-1">
                      {{ error }}
                    </p>
                  </div>

                </div>


                <!-- Bottom action -->
                <div
                  class="mt-7 pt-6 border-t border-gray-100
                         flex flex-col sm:flex-row
                         items-center justify-between gap-4"
                >

                  <p class="text-xs text-gray-400">
                    🔒 Vos documents sont utilisés uniquement
                    pour cette évaluation.
                  </p>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full sm:w-auto
                           inline-flex items-center
                           justify-center gap-2
                           px-6 py-3
                           bg-bp-red text-white
                           rounded-lg
                           text-sm font-semibold
                           shadow-sm
                           hover:shadow-md
                           hover:opacity-95
                           transition-all
                           disabled:opacity-50
                           disabled:cursor-not-allowed"
                  >

                    <span v-if="loading">
                      ⏳
                    </span>

                    <span v-else>
                      ▶
                    </span>

                    {{
                      loading
                        ? 'Analyse en cours...'
                        : 'Lancer l’évaluation'
                    }}

                  </button>

                </div>

              </form>

            </div>

          </div>


          <!-- ==================== RIGHT : INFO ==================== -->
          <div class="lg:col-span-1">

            <div class="space-y-5">


              <!-- How it works -->
              <div
                class="bg-white rounded-xl border border-gray-200
                       shadow-sm overflow-hidden"
              >

                <div class="px-5 py-4 border-b border-gray-100">

                  <h3 class="font-semibold text-gray-800">
                    Comment ça fonctionne ?
                  </h3>

                </div>

                <div class="p-5 space-y-5">

                  <!-- Step -->
                  <div class="flex gap-3">

                    <div
                      class="w-8 h-8 rounded-lg bg-red-50
                             text-bp-red flex items-center
                             justify-center shrink-0 text-sm"
                    >
                      1
                    </div>

                    <div>
                      <p class="text-sm font-medium text-gray-800">
                        Analyse du cahier
                      </p>

                      <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                        Les exigences techniques sont identifiées
                        automatiquement.
                      </p>
                    </div>

                  </div>


                  <div class="flex gap-3">

                    <div
                      class="w-8 h-8 rounded-lg bg-red-50
                             text-bp-red flex items-center
                             justify-center shrink-0 text-sm"
                    >
                      2
                    </div>

                    <div>
                      <p class="text-sm font-medium text-gray-800">
                        Analyse de l'offre
                      </p>

                      <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                        Les caractéristiques proposées par le fournisseur
                        sont extraites.
                      </p>
                    </div>

                  </div>


                  <div class="flex gap-3">

                    <div
                      class="w-8 h-8 rounded-lg bg-red-50
                             text-bp-red flex items-center
                             justify-center shrink-0 text-sm"
                    >
                      3
                    </div>

                    <div>
                      <p class="text-sm font-medium text-gray-800">
                        Comparaison
                      </p>

                      <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                        Chaque exigence est comparée à la proposition
                        du fournisseur.
                      </p>
                    </div>

                  </div>


                  <div class="flex gap-3">

                    <div
                      class="w-8 h-8 rounded-lg bg-green-50
                             text-green-600 flex items-center
                             justify-center shrink-0 text-sm"
                    >
                      ✓
                    </div>

                    <div>
                      <p class="text-sm font-medium text-gray-800">
                        Résultat
                      </p>

                      <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                        Un score et un statut de conformité sont générés.
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              <!-- Important info -->
              <div
                class="bg-white rounded-xl border border-gray-200
                       shadow-sm p-5"
              >

                <div class="flex items-start gap-3">

                  <div
                    class="w-9 h-9 rounded-lg bg-blue-50
                           flex items-center justify-center shrink-0"
                  >
                    ℹ️
                  </div>

                  <div>

                    <h3 class="text-sm font-semibold text-gray-800">
                      À savoir
                    </h3>

                    <p
                      class="text-xs text-gray-500 mt-2
                             leading-relaxed"
                    >
                      L'évaluation porte uniquement sur les éléments
                      techniques identifiés dans les documents.
                      Les résultats sont présentés exigence par exigence.
                    </p>

                  </div>

                </div>

              </div>


              <!-- Supported format -->
              <div
                class="rounded-xl bg-gray-800 p-5 text-white"
              >

                <div class="flex items-center gap-3 mb-3">

                  <div
                    class="w-9 h-9 rounded-lg bg-white/10
                           flex items-center justify-center"
                  >
                    📄
                  </div>

                  <div>
                    <p class="text-sm font-semibold">
                      Format accepté
                    </p>

                    <p class="text-xs text-gray-400">
                      Documents techniques
                    </p>
                  </div>

                </div>

                <div class="flex items-center justify-between">

                  <span class="text-xs text-gray-400">
                    Type de fichier
                  </span>

                  <span
                    class="px-2 py-1 rounded
                           bg-white/10 text-xs font-medium"
                  >
                    PDF
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTechnicalEvaluation } from '../api/technicalEvaluation'

const router = useRouter()

const loading = ref(false)
const error = ref('')

const form = reactive({
  nom_fournisseur: '',
  cahier_des_charges: null,
  offre_fournisseur: null
})

const handleCahier = (event) => {
  form.cahier_des_charges = event.target.files[0] || null
}

const handleOffre = (event) => {
  form.offre_fournisseur = event.target.files[0] || null
}

const submitEvaluation = async () => {
  error.value = ''

  if (!form.nom_fournisseur.trim()) {
    error.value = 'Veuillez renseigner le nom du fournisseur.'
    return
  }

  if (!form.cahier_des_charges) {
    error.value = 'Veuillez sélectionner le cahier des charges.'
    return
  }

  if (!form.offre_fournisseur) {
    error.value = "Veuillez sélectionner l'offre fournisseur."
    return
  }

  loading.value = true

  try {

    const formData = new FormData()

    formData.append(
      'nom_fournisseur',
      form.nom_fournisseur
    )

    formData.append(
      'cahier_des_charges',
      form.cahier_des_charges
    )

    formData.append(
      'offre_fournisseur',
      form.offre_fournisseur
    )

    const response = await createTechnicalEvaluation(formData)

    const evaluation = response.data.evaluation

    router.push({
      name: 'technical-evaluation-result',
      params: {
        id: evaluation.id
      }
    })

  } catch (err) {

    console.error(err)

    error.value =
      err.response?.data?.error ||
      err.response?.data?.message ||
      'Une erreur est survenue lors de l’évaluation.'

  } finally {

    loading.value = false

  }
}
</script>