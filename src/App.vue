<template>
  <div class="app">
    <div class="home">
      <Floor v-for="(floor, i) in floors" :key="i" :floorNumber="i + 1" />
      <Elevator />
    </div>
    <form>
      <div class="">
        <label>Введите колисчество этажей </label>
        <input type="text" v-model.number="this.amountOfFloors">
        <button @click.prevent="changeAmountOfFloors">Задать</button>
      </div>
      <span v-if="v$.amountOfFloors.$error">Минимальное количество этажей 2</span>
    </form>
  </div>
</template>

<script>
import Floor from "./components/Floor";
import Elevator from "./components/Elevator.vue";
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

export default {
  components: { Floor, Elevator },
  data: () => ({
    amountOfFloors: 5,
    floors: Array(5)
  }),
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      amountOfFloors: { required, minValue: minValue(2) },
    };
  },
  methods: {
    changeAmountOfFloors() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return
      }

      this.$store.commit('cleanAll');
      this.floors.length = this.amountOfFloors;
    }
  }
};
</script>
