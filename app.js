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
        done: false,
        quantity: 1
      },
      {
        text: "Fare la spesa",
        done: true,
        quantity: 1
      },
      {
        text: "Pagare le bollette",
        done: false,
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
            done:false,
            quantity: 1
          }
          
          this.tasks.unshift(newTask)
          this.newTaskText = ""
          this.errorMessage = ""
        }

      }
    },

    removeTask(task, index){
      if(task.done){
        this.tasks.splice(index, 1)
      }else {
        this.errorMessage = "Per eliminare una task, devi prima completarla"
      }
    }

  },

  mounted(){
    console.log("ciao vue")
  }



}).mount("#app")