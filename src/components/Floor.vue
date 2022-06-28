<template>
  <div class="floor">
    <div class="boxElevator"></div>
    <div class="boxButton"><button :disabled="this.floorNumber === this.currentFloor" @click="callUp" :class='{
      active: this.isFloorInQueue(this.floorNumber)
    }'>{{ this.floorNumber }}</button></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Floor',
  props: ['floorNumber'],
  computed: {
    ...mapGetters(['isFloorInQueue', 'elevatorStatus', 'currentFloor'])
  },
  methods: {
    callUp() {
      if (!this.isFloorInQueue(this.floorNumber) && this.elevatorStatus === 'ready') {
        this.$store.commit('addToQueue', this.floorNumber)
        this.$store.commit('changeElevatorStatus', 'active')
      } else {
        this.$store.commit('addToQueue', this.floorNumber)
      }
    }
  }
}
</script>
