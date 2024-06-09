<script setup lang="ts">
import { getArrayValues } from "@/services/getArrayValues"
import type MoviesInterface from "@/utils/interfaces/moviesInterface"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import axios from "axios"
import { defineProps, onBeforeMount, ref } from "vue"

interface PlanetDetailProps {
  planet?: PlanetInterface
}
const props = defineProps<PlanetDetailProps>()
const { planet } = props
const residents = ref<string[]>([])
const films = ref<string[]>([])

onBeforeMount(async () => {
  planet?.films.forEach(async (film: string) => {
    const movie: any = await getArrayValues(film)
    films.value.push(movie.title)
  })

  planet?.residents.forEach(async (resident: string) => {
    const res: any = await getArrayValues(resident)
    residents.value.push(res.name)
  })
})
</script>

<template>
  <main class="flex bg-white rounded-md shadow-md m-12 relative">
    <router-link to="/">
      <i
        class="material-icons absolute right-2 md:right-5 top-5 hover:text-gray-500"
        >home</i
      >
    </router-link>
    <div class="flex flex-col flex-1 items-center p-6 mt-6">
      <h1 class="text-2xl md:text-5xl text-secondary-text text-bold">
        {{ planet?.name }}
      </h1>
      <ul
        class="w-[90%] flex flex-col items-center md:items-start my-4 gap-6 text-sm md:text-xl"
      >
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Rotation period: </span>
          {{ planet?.rotation_period }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Orbital period: </span>
          {{ planet?.orbital_period }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Diameter: </span>
          {{ planet?.diameter }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Climate: </span>
          {{ planet?.climate }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Gravity: </span>
          {{ planet?.gravity }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Terrain: </span>
          {{ planet?.terrain }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Surface_water: </span>
          {{ planet?.surface_water }}
        </li>
        <li class="text-primary-text">
          <span class="italic text-purple-light mr-2">Population: </span>
          {{ planet?.population }}
        </li>
        <li class="text-primary-text flex flex-row">
          <span class="italic text-purple-light mr-2">Residents:</span>
          <div>
            <span
              v-for="(film, index) in residents"
              :key="index"
              class="flex flex-col"
            >
              {{ film }}
            </span>
          </div>
        </li>
        <li class="text-primary-text flex flex-row">
          <span class="italic text-purple-light mr-2">Films:</span>
          <div>
            <span
              v-for="(film, index) in films"
              :key="index"
              class="flex flex-col"
            >
              {{ film }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
