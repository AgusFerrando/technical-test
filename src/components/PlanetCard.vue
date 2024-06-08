<script setup lang="ts">
import type MoviesInterface from "@/utils/interfaces/moviesInterface"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import axios from "axios"
import { defineProps, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

interface PlanetCardProps {
  result: PlanetInterface
  isFavorite: boolean
}

const props = defineProps<PlanetCardProps>()

const emit = defineEmits(["toggleFavorite"])

const toggleFavorite = () => {
  emit("toggleFavorite", props.result)
}

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

const goToDetail = (url: string) => {
  const parts = url.split('/');
  const id =  parts[parts.length - 2];
  router.push(`/planet-detail/${id}`)
}

onMounted(async () => {
  await getAllMoviesInPlanet()
})
</script>

<template>
  <div
    class="flex py-6 px-3 m-4 bg-white rounded-md shadow-md w-36 min-h-2/6"
  >
    <div class="flex flex-col flex-1">
      <div class="flex flex-row justify-between relative">
        <h1
          class="text-purple-light font-semibold text-md hover:text-purple cursor-pointer"
          @click="goToDetail(result.url)"
        >
          {{ result.name }}
        </h1>
        <i
          class="material-icons absolute right-0 cursor-pointer"
          @click="toggleFavorite"
          :class="{ 'text-red-500 hover:text-red-700': isFavorite, 'text-gray-500 hover:text-gray-700': !isFavorite }"
        >
          favorite
        </i>
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
