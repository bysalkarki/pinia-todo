<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <div class="new-task-form">
      <task-form></task-form>
    </div>
    <nav class="filter">
      <button @click="filter = 'all'" :class="{active: filter == 'all' }">All Task</button>
      <button @click="filter = 'favs'" :class="{active: filter == 'favs' }">Favourite Task</button>
    </nav>
    <div class="loading" v-if="taskStore.isLoading">Loading Tasks.....</div>
    <div class="task-list" v-if="filter === 'all' ">
      <p>You Have : {{taskStore.totalCount}} tasks left to do</p>
      <p>All Tasks</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You Have : {{taskStore.favCount}} favourite tasks left to do</p>
      <p>Fav Tasks</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task"></TaskDetails>
      </div>


    </div>
  </main>
</template>
<script setup>
import TaskDetails from "./components/TaskDetails.vue"
import TaskForm from "./components/TaskForm.vue"
import {useTaskStore} from "@/stores/TaskStore";
import {ref} from "vue";
const filter = ref('all');
const taskStore = useTaskStore();
taskStore.getTasks();
</script>