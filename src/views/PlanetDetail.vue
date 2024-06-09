<script setup lang="ts">
import PlanetDetailCard from "@/components/PlanetDetailCard.vue"
import { getPlanet } from "@/services/getPlanet"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import { onBeforeMount, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const params = route.params.id
const allPlanets = ref<PlanetInterface[]>([])
const planet = ref<PlanetInterface>()
const isLoading = ref<boolean>(true)

onBeforeMount(async () => {
  try {
    planet.value = await getPlanet(Number(params))
  } catch (error) {
    console.error("Error fetching planets:", error)
  } finally {
    isLoading.value = false
  }

  console.log("oneplanet", planet.value)
})
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <div v-if="isLoading" class="text-secondary-text font-semibold text-lg">
      ...Loading
    </div>
    <div v-else class="w-full h-full">
      <PlanetDetailCard :planet="planet" />
    </div>
  </main>
</template>
