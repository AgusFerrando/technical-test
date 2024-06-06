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
  planet.value = allPlanets.value.filter((item)=> item.name === params)
  console.log(planet.value)
})

</script>

<template>
  <main>
    <PlanetDetailCard :planet={planet} />
  </main>
</template>
