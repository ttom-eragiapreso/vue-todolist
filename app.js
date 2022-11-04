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

       // Mi faccio un check per vedere se esiste già la task che ho inserito. Rendo la prima lettere uppercase così da omogenizzare l'input dell'utente 
      const taskAlreadyExists = this.tasks.find(task => task.text === this.newTaskText.charAt(0).toUpperCase() + this.newTaskText.slice(1))

      //Error handling se la nuova task è più corta di 5 caratteri
      if(this.newTaskText.length < 5){
        this.errorMessage = "Devi almeno mettere 5 caratteri"
        this.newTaskText = ""
      }else {

        //Se esiste già allora vado a modificarne la quantità
        if(taskAlreadyExists){
          console.log("la task già esiste")
          taskAlreadyExists.quantity++
          this.newTaskText = ""
        }else {
            //Altrimenti creo una nuova task con il testo uguale a quello che ha inserito l'utente e di default la quantità è 1
            const newTask = {
            text: this.newTaskText.charAt(0).toUpperCase() + this.newTaskText.slice(1),
            quantity: 1
          }
          //una volta creato, lo aggiungo in cima alla lista, e ripulisco evenutali messaggi di errore e il campo di input.
          this.tasks.unshift(newTask)
          this.newTaskText = ""
          this.errorMessage = ""
        }

      }
    },

    removeTask(task, index){

      //Se la quantità della task è uguale a 0 vuol dire che l'abbiamo completata e possiamo eliminarla
      if(task.quantity === 0){
        this.tasks.splice(index, 1)
      }else {
        //altrimenti errore
        this.errorMessage = "Per eliminare una task, devi prima completarla"
      }
    },

    completeTask(task, index){

      this.errorMessage = ""
      //Qui vado a scrivere nel database per avere sempre il conto aggiornato di quante volte devo completare quella determinata task.
      //Se l'ho completata ma non ancora rimossa, posso cliccarci di nuovo per metterne una, però per aggiungerne più di una
      //dovrò comunque usare il bottone submit o il tasto enter sul campo dell'input.

      if(this.tasks[index].quantity === 0 ) {
        this.tasks[index].quantity = 1
      }else if(this.tasks[index].quantity === 1 ) {
        this.tasks[index].quantity = 0
      }else {
        this.tasks[index].quantity--
      }
      console.log(this.tasks[index].quantity)
      }
    

  },




}).mount("#app")