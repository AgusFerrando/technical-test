<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue"
import PlanetCard from "@/components/PlanetCard.vue"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import { getPlanets } from "@/services/getPlanets"
import { useFavoritesStore } from "@/store/useFavoritesStore"

const favoritesStore = useFavoritesStore()
const searchQuery = ref<string>("")
const searchResults = ref<PlanetInterface[]>([])
const isLoading = ref<boolean>(true)
const searchError = ref<boolean>(false)
const showFavoritesOnly = ref<boolean>(false)
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)

onBeforeMount(async () => {
  try {
    const response = await getPlanets(currentPage.value)
    searchResults.value = response.results
    totalPages.value = Math.ceil(response.count / 10)
  } catch (error) {
    console.error("Error fetching planets:", error)
    searchError.value = true
  } finally {
    isLoading.value = false
  }
})

const filteredResults = computed(() => {
  let results = searchResults.value

  if (searchQuery.value !== "") {
    results = results.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (showFavoritesOnly.value) {
    results = results.filter((item) => favoritesStore.isFavorite(item))
  }

  return results
})

const toggleFavorite = (planet: PlanetInterface) => {
  favoritesStore.toggleFavorite(planet)
}

const isFavorite = (planet: PlanetInterface) => {
  console.log("store", favoritesStore.favorites)
  return favoritesStore.isFavorite(planet)
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    const newPlanetList = await getPlanets(currentPage.value)
    searchResults.value = newPlanetList.results
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    const newPlanetList = await getPlanets(currentPage.value)
    searchResults.value = newPlanetList.results
  }
}
</script>

<template>
  <main class="flex flex-col items-center bg-background p-8">
    <h1 class="text-purple-dark text-2xl">Star Wars Planets</h1>
    <div
      class="flex flex-col border border-purple-light w-full min-h-[70vh] p-8 mt-2 relative"
    >
      <section class="flex flex-row justify-between w-full">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a planet"
          class="py-2 px-1 md:w-1/4 w-1/2 bg-transparent border-b focus:border-purple focus:outline-none text-primary-text"
        />
        <button
          @click="showFavoritesOnly = !showFavoritesOnly"
          class="flex flex-col items-center text-sm"
        >
          <i
            class="material-icons text-red-500 hover:text-red-700 cursor-pointer"
          >
            favorite
          </i>
          Favorites
        </button>
      </section>

      <div v-if="isLoading" class="text-secondary-text font-semibold text-lg">
        ...Loading
      </div>
      <div v-else>
        <div v-if="searchError" class="text-red-500 font-semibold text-lg">
          Error loading planets. Please try again later.
        </div>
        <ul
          class="text-primary-text py-2 px- flex flex-row flex-wrap justify-center md:justify-start"
          v-if="!searchError && filteredResults.length > 0"
        >
          <template v-for="(result, index) in filteredResults" :key="index">
            <PlanetCard
              :result="result"
              :isFavorite="isFavorite(result)"
              @toggleFavorite="toggleFavorite(result)"
            />
          </template>
        </ul>
        <p
          class="py-2 text-primary-text"
          v-else-if="!searchError && filteredResults.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <div class="flex justify-center gap-8 mt-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="py-2 px-4 bg-purple-light text-white rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="py-2 px-4 bg-purple-light text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
