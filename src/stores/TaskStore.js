import {defineStore} from "pinia";

const useTaskStore = defineStore('taskStore',{
    state:()=>({
        tasks:[
        ],
        isLoading:false,
    }),
    getters:{
        favs(){
            return  this.tasks.filter(item=>item.isFav);
        },
        favCount(){
            return this.tasks.reduce((p,c)=>{
                return c.isFav ? p+1 : p
            },0);
        },
        totalCount:(state)=>state.tasks.length
    },
    actions:{
        async getTasks(){
            this.isLoading = true;
            const res = await fetch('http://localhost:3000/tasks')
            this.tasks = await res.json();
            this.isLoading = false;
        },
        async addTask(task){
            this.tasks.push(task);
            const res = await fetch('http://localhost:3000/tasks',{
                method:"post",
                body:JSON.stringify(task),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(res.error){
                console.log(res.error)
            }
        },
        async deleteTask(id){
            this.tasks  = this.tasks.filter(item=>item.id !== id)
            const res = await fetch('http://localhost:3000/tasks/'+id,{
                method:'DELETE',
            })
            if(res.error){
                console.log(res.error)
            }
        },
        async toggleFav(id){
            let task  = this.tasks.find(item=>item.id == id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/'+id,{
                method:'PATCH',
                body:JSON.stringify({isFav:task.isFav}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(res.error){
                console.log(res.error)
            }

        }
    }
});

export {useTaskStore};