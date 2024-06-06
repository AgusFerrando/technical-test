<script setup lang="ts">
import type MoviesInterface from "@/utils/interfaces/moviesInterface"
import type PlanetInterface from "@/utils/interfaces/planetInterface"
import { defineProps, onMounted, ref } from "vue"


interface PlanetDetailProps {
  planet: PlanetInterface
}

const props = defineProps<PlanetDetailProps>()

</script>

<template>
  <main
    class="flex py-6 px-3 m-4 bg-white rounded-md shadow-md cursor-pointer w-36 min-h-2/6"
  >
    <div class="flex flex-col flex-1">
      <div v-for="(item, index) in planet" :key="index">
          <div v-for="(i, index) in item" :key="index">
            <h1> {{ i.name }} </h1>
            <span>
              <p><span></span></p>
            </span>
          </div>
      </div>
    </div>
  </main>
</template>
