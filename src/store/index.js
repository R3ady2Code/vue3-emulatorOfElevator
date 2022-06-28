import { createStore } from 'vuex';

export default createStore({
  state: {
    queueOfFloors: [],
    elevatorStatus: 'ready',
    currentFloor: 1,
    direction: 'none',
  },
  getters: {
    allQueue(state) {
      return state.queueOfFloors;
    },
    firstInQueue(state) {
      return state.queueOfFloors[0];
    },
    isFloorInQueue: (state) => (floor) => {
      return state.queueOfFloors.includes(floor);
    },
    elevatorStatus(state) {
      return state.elevatorStatus;
    },
    currentFloor(state) {
      return state.currentFloor;
    },
    getDirection(state) {
      return state.direction;
    },
  },
  mutations: {
    addToQueue(state, floor) {
      state.queueOfFloors.push(floor);
    },
    deleteFromQueue(state) {
      state.queueOfFloors.shift();
    },
    changeElevatorStatus(state, payload) {
      state.elevatorStatus = payload;
    },
    changeCurrentFloor(state, payload) {
      state.currentFloor = payload;
    },
    changeDirection(state, payload) {
      state.direction = payload;
    },
    cleanAll(state) {
      state.queueOfFloors = [];
      state.elevatorStatus = 'ready';
      state.direction = 'none';
    },
  },
  actions: {},
  modules: {},
});
