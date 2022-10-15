<template>
  <div class="task">
    <h3>{{task.title}}</h3>
    <div class="icons">
      <i class="material-icons" @click="handleDelete(task.id)" >delete</i>
      <i class="material-icons" @click="handleFavourite(task.id)" :class="{active:task.isFav}">favorite</i>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  task: { type: Object}
});
import {useTaskStore} from "@/stores/TaskStore";
const tasks = useTaskStore();
const  handleFavourite = (id)=>{
  tasks.toggleFav(id);
};
const  handleDelete = (id)=>{
  tasks.deleteTask(id)
}
</script>