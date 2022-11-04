console.log("caricato")

const { createApp } = Vue;

createApp({

  data(){
    return {

      errorMessage: "",

      logoUrl: "logo.png",

      newTaskText: "",

      tasks: [{
        text: "Portare fuori il cane",
        quantity: 1
      },
      {
        text: "Fare la spesa",
        quantity: 0
      },
      {
        text: "Pagare le bollette",
        quantity: 1
      }]

    }
  },

  methods: {

    addNewTask(){

      const taskAlreadyExists = this.tasks.find(task => task.text === this.newTaskText.charAt(0).toUpperCase() + this.newTaskText.slice(1))

      if(this.newTaskText.length < 5){
        this.errorMessage = "Devi almeno mettere 5 caratteri"
        this.newTaskText = ""
      }else {

        if(taskAlreadyExists){
          console.log("la task già esiste")
          taskAlreadyExists.quantity++
          this.newTaskText = ""
        }else {
            const newTask = {
            text: this.newTaskText.charAt(0).toUpperCase() + this.newTaskText.slice(1),
            quantity: 1
          }
          
          this.tasks.unshift(newTask)
          this.newTaskText = ""
          this.errorMessage = ""
        }

      }
    },

    removeTask(task, index){

      if(task.quantity === 0){
        this.tasks.splice(index, 1)
      }else {
        this.errorMessage = "Per eliminare una task, devi prima completarla"
      }
    },

    completeTask(task, index){

      this.errorMessage = ""
      //task.quantity > 1 ? this.tasks[index].quantity-- : this.tasks[index].quantity = 0;
      if(this.tasks[index].quantity === 0 ) {
        console.log("la quantità è uguale a 0 e la metto a 1")
        this.tasks[index].quantity = 1
      }else if(this.tasks[index].quantity === 1 ) {
        console.log("la quantità è uguale a 1 e la metto a 0")
        this.tasks[index].quantity = 0
      }else {
        this.tasks[index].quantity--
      }
      console.log(this.tasks[index].quantity)


      }
    

  },

  mounted(){
    //console.log(this.tasks)
  }



}).mount("#app")