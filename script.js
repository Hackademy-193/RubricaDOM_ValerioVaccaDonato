// catturiamo il padre di tutti i contatti telefonici
let cardsWrapper = document.querySelector('#cardsWrapper');

// catturiamo i bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactsBtn = document.querySelector('#addContactsBtn');
let removeContactsBtn = document.querySelector('#removeContactsBtn');

// catturiamo gli input

let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

const RUBRICA = {

    'contacts' : [

        {name : 'Valerio' , number : 333333333 },
        {name : 'Pikachu' , number : 12345678 },
        {name : 'Charizard' , number : 118113118 },

    ],

    'showContacts' : function(){

        // svuoto il contenitore ogni volta che parte la funzione showContacts
        cardsWrapper.innerHTML = '';

        this.contacts.forEach((contact)=>{

            let div = document.createElement('div');
            div.classList.add('col-7', 'my-3');
            div.innerHTML = `
                 <div class="cardContact d-flex align-items-center justify-content-evenly">
                    <i class="fa-regular fa-user"></i>
                    <h5>${contact.name}</h5>
                    <h5>${contact.number}</h5>
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            `;
            cardsWrapper.appendChild(div);

        });

        // catturo qui le icone dei bidoni, perché qui esistono. se le catturassi fuori, riceverei un null.

        let icons = document.querySelectorAll('.fa-trash-can');
     
        // ogni icona deve far accadere qualcosa al click
        // per ogni icona, tengo traccia anche del suo indice
        icons.forEach((icona, i)=>{
            icona.addEventListener('click', ()=>{
                // l'indice dell'icona, corrispone esattamente all'indice dell'elemento in rubrica.
                // in questa maniera vado a prelevare, al click sull'icona, esattamente il nome dall'array contacts, nello stesso indice dell'icona e me lo salva dentro removedName
                let removedName = this.contacts[i].name;
                
                // ora posso lanciare la funzione removedContact, che rimuove un contatto, passando il parametro che vuole e cioè un nome. il tutto al click su un'icona
                this.removeContact(removedName);
            });
        });
    },

    'addContact' : function(newName, newNumber){
        this.contacts.push({'name' : newName, 'number' : newNumber});

        // e poi crea i contatti della rubrica, compreso quello che ho appena aggiunto
        this.showContacts();
    },

    'removeContact' : function(removedName){

        // mi estrapolo da contacts, solo un array con i nomi dei contatti
        let names = this.contacts.map((contact)=>{
            return contact.name.toLowerCase();
        });

        // una volta che ho trovato l'indice del nome nell'array names
         let index = names.indexOf(removedName.toLowerCase());

        //  posso ora cercare se quell'indice è > -1
        // se lo è elimino il contatto dalla rubrica con lo splice
        // se non lo è, mi dirà contatto inesistente
        if(index > -1){
            this.contacts.splice(index, 1);

            // solo quando elimina il contatto, mi deve partire anche la funzione che mostra i contatti
            this.showContacts();
        }else{
            alert('contatto non presente in rubrica');
        }

    }

}

// variabile d'appoggio
let confirm = false;

// evento al click sul bottone mostra contatti
showContactsBtn.addEventListener('click', ()=>{

    if(confirm == false){
        RUBRICA.showContacts();
        showContactsBtn.innerHTML = 'Nascondi Rubrica';
        confirm = true;
    }else{
        cardsWrapper.innerHTML = '';
        showContactsBtn.innerHTML = 'Mostra Rubrica';
        confirm = false;
    }
    
});


// evento al click sul bottone aggiungi contatti
addContactsBtn.addEventListener('click', ()=>{
    // aggiungingimi il nuovo contatto
    // cambia anche il valore del bottone mostra rubrica in nascondi rubrica
    // cambia anche il valore della variabile d'appoggio, così quando cliccherò una volta su nascondi rubrica, si chiuderà senza intoppi
    // questo perché quando lanciamo addContact, dentro la funzione, stiamo anche facendo partire la funzione showContacts che mi crea le card

    if( nameInput.value != '' && numberInput.value != ''){
        confirm = true;
        RUBRICA.addContact(nameInput.value, numberInput.value);
        showContactsBtn.innerHTML = 'Nascondi Rubrica';

        // dopo che aggiungo il contatto, svuota i campi degli input
        nameInput.value = '';
        numberInput.value = '';
    }else{
        alert('Attenzione, devi inserire per forza un nome e un numero!');
    }
   
});

// evento al click sul bottone rimuovi contatto
removeContactsBtn.addEventListener('click', ()=>{
    confirm = true;
    RUBRICA.removeContact(nameInput.value);
    showContactsBtn.innerHTML = 'Nascondi Rubrica';

    // dopo che rimuovo il contatto, svuota i campi degli input
    nameInput.value = '';
});


// mi permette di rimuovere e/o aggiungere elementi in un desiderato indice dell'array. accetta 3 parametri:
// il primo inica l'indice dal quale intervenire
// il secondo indica quanti elementi cancellare, anche 0
// il terzo indica gli elementi da aggiungere
// let numbers = [1, 2, 3, 4, 5];
// numbers.splice(2, 1, 'Ciao');


// let arrayMiao = ['dino', 'sauro', 'bello'];

// let index = arrayMiao.indexOf('bello');

// if(index > -1){
//     arrayMiao.splice(index, 1);
// } else{
//     alert('contatto non presente');
// }

// console.log(arrayMiao);
