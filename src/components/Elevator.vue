<template>
	<div ref="elevator" @animationcancel="endOfMove" class="elevator animate__animated"
		:class="{ animate__flash: this.elevatorStatus === 'onFloor' }">
		<div v-if="this.firstInQueue" class="screen">
			<p>{{ this.currentFloor }}</p>
			<p class="arrow"><strong v-if="this.getDirection === 'up'">&#8593;</strong></p>
			<p class="arrow"><strong v-if="this.getDirection === 'down'">&#8595;</strong></p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'animate.css';


export default {
	computed: {
		...mapGetters(['firstInQueue', 'elevatorStatus', 'allQueue', 'currentFloor', 'getDirection'])
	},
	methods: {
		moveElevator() {
			const pixelMove = (this.firstInQueue - 1) * 120;
			this.$refs.elevator.style.transition = `all ${Math.abs(this.firstInQueue - this.currentFloor)}s linear`;
			this.$store.commit('changeDirection', this.firstInQueue > this.currentFloor ? 'up' : 'down');
			this.$refs.elevator.style.transform = `translateY(-${pixelMove}px)`;
			this.$store.commit('changeCurrentFloor', this.firstInQueue);
			this.$refs.elevator.ontransitionend = () => {
				this.$store.commit('changeElevatorStatus', 'onFloor');
				setTimeout(() => {
					this.$store.commit('changeElevatorStatus', 'ready');
					this.$store.commit('deleteFromQueue');
					if (this.firstInQueue) this.moveElevator();
				}, 3000)
			}
		},
	},
	mounted() {
		this.$store.watch(() => this.elevatorStatus, (elevatorStatus) => {
			if (elevatorStatus === 'active') this.moveElevator(elevatorStatus);
		})
	},

}
</script>

<style>
</style>