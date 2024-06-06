<script setup lang="ts">
import type MoviesInterface from "@/utils/interfaces/moviesInterface"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import axios from "axios"
import { defineProps, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

interface PlanetCardProps {
  result: PlanetInterface
}

const props = defineProps<PlanetCardProps>()
const router = useRouter()
const allMovies = ref<MoviesInterface[]>([])

const getAllMoviesInPlanet = async () => {
  props.result.films.forEach(async (film) => {
    try {
      const result = await axios.get(film)
      allMovies.value.push(result.data)
    } catch (error) {
      console.log(error)
    }
  })
}

const goToDetail = (name: string) => {
  router.push(`/planet-detail/${name}`)
}

onMounted(async () => {
  await getAllMoviesInPlanet()
})
</script>

<template>
  <div
    class="flex py-6 px-3 m-4 bg-white rounded-md shadow-md cursor-pointer w-36 min-h-2/6"
  >
    <div
      class="flex flex-col flex-1 cursor-pointer"
      @click="goToDetail(result.name)"
    >
      <div class="flex flex-row justify-between relative">
        <h1 class="text-purple-light font-semibold text-sm">
          {{ result.name }}
        </h1>
        <i class="material-icons absolute right-0"> favorite </i>
      </div>

      <h2 class="text-dark text-xs italic mt-2">Films:</h2>
      <ul>
        <li
          v-for="(film, index) in allMovies"
          :key="index"
          class="text-primary-color text-sm"
        >
          {{ film.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
