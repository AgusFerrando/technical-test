<script setup lang="ts">
import PlanetDetailCard from "@/components/PlanetDetailCard.vue"
import { getAllPlanets } from "@/utils/api/getAllPlanets";
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()
const params = route.params.name
const allPlanets = ref<PlanetInterface[]>([])
const planet = ref<PlanetInterface>()

onBeforeMount(async () => {
  allPlanets.value = await getAllPlanets()
  planet.value = allPlanets.value.find((item)=> item.name === params)
  console.log('planet', planet.value)
})

</script>

<template>
  <main class="flex flex-col items-center justify-items-center">
    <PlanetDetailCard :planet={planet} />
  </main>
</template>
