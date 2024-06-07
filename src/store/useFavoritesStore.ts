import type PlanetInterface from '@/utils/interfaces/planetInterface';
import { defineStore } from 'pinia';

interface FavoritesState {
    favorites: PlanetInterface[];
  }

  export const useFavoritesStore = defineStore('favorites', {
    state: (): FavoritesState => ({
      favorites: []
    }),
    actions: {
      toggleFavorite(planet: PlanetInterface) {
        const index = this.favorites.findIndex(fav => fav.name === planet.name);
        if (index === -1) {
          this.favorites.push(planet);
        } else {
          this.favorites.splice(index, 1);
        }
      },
      isFavorite(planet: PlanetInterface): boolean {
        return this.favorites.some(fav => fav.name === planet.name);
      }
    }
  });
