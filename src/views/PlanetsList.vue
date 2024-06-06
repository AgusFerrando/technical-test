<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import PlanetCard from "@/components/PlanetCard.vue"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import { getAllPlanets } from "@/utils/api/getAllPlanets"

const router = useRouter()
const searchQuery = ref<string>("")
const queryTimeout = ref(null)
const searchResults = ref<PlanetInterface[]>([])
const searchError = ref<boolean>(false)

onBeforeMount(async () => {
  searchResults.value = await getAllPlanets()
})

const filteredResults = computed(() => {
  if (searchQuery.value !== "") {
    console.log(searchResults.value)
    return searchResults.value.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return searchResults.value
})
</script>

<template>
  <main class="flex flex-col items-center bg-background p-8">
    <h1 class="text-purple-dark text-2xl">Star Wars Planets</h1>
    <div
      class="flex flex-col border border-purple-light w-full min-h-[70vh] p-8 mt-2"
    >
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a planet"
        class="py-2 px-1 md:w-1/4 w-full bg-transparent border-b focus:border-purple focus:outline-none text-primary-text"
      />
      <ul
        class="text-primary-text py-2 px- flex flex-row flex-wrap"
        v-if="filteredResults"
      >
        <p class="py-2 text-primary-text" v-if="filteredResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <div v-for="(result, index) in filteredResults" :key="index">
            <PlanetCard :result="result" />
          </div>
        </template>
      </ul>
    </div>
  </main>
</template>
