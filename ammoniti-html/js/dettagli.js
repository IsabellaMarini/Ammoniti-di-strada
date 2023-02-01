// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDocs, deleteDoc, getFirestore, doc, query, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, getDownloadURL} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

// Configurazione firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdRCwgQEkShwLFWx8lkJ0AffDlchwgN1I",
  authDomain: "ammoniti-di-strada.firebaseapp.com",
  projectId: "ammoniti-di-strada",
  storageBucket: "ammoniti-di-strada.appspot.com",
  messagingSenderId: "163593434920",
  appId: "1:163593434920:web:d58241746bea65c310c21d",
  measurementId: "G-CLYR7V8DLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

const listaZone= document.querySelector('#lettura')

//si riempie la tabella definita in html con i dati presi dal db: doc1 fa riferimento alla collection 'dettaglio', doc2 alla collection 'zone, doc3 alla collection 'materiali'
function letturaDettagli(doc1, doc2, doc3){
 
  let tr = document.createElement('tr');

  let td1=document.createElement('td');

  let td2=document.createElement('td');
  
  let immagine = document.createElement('img');
  
  let descrizione = document.createElement('p');

  let materiale = document.createElement('p');
 
  let zona = document.createElement('p');

  let modifica = document.createElement('button');

  let elimina = document.createElement('button');

  //si associa ad ogni riga della tabella l'id della scheda dettaglio
  tr.setAttribute('data-id', doc1.id);

  //si carica l'immagine dallo storage di riferimento
  var img=getDownloadURL( ref(storage, 'foto dettaglio/' + doc1.data().fotofossile )).then((url)=>
      immagine.setAttribute('src', url)
  )

  immagine.textContent=img
  descrizione.textContent = doc1.data().descrfossile;
  zona.textContent = "Zona: " + doc2.data().nomezona;
  materiale.textContent = "Materiale: " + doc3.data().nome;
  modifica.textContent= "Modifica";

  elimina.textContent="Elimina";

  //si caricano gli elementi creati dinamicamente nelle opportune colonne della tabella

  td1.appendChild(immagine);
  td2.appendChild(descrizione);
  td2.appendChild(zona);
  td2.appendChild(materiale);
  td2.append(modifica);

  //riferimento alla pagina di modifica in cui si salva anche l'id del dettaglio di riferimento
  modifica.addEventListener("click", (e)=>{
    location.href="modificaSchedaDettaglio.html?"+doc1.id
    sessionStorage.setItem("id", doc1.id)
  })
  td2.append(elimina);
  //si elimina la scheda dettaglio di riferimento in caso di conferma da parte dell'utente
  elimina.addEventListener("click", (e)=>{
    let w=confirm("Sei sicuro di voler eliminare questa scheda dettagli?")
    if(w==true){
    deleteDoc(doc(db, 'dettaglio', doc1.id))
    }
  })
  tr.appendChild(td1);
  tr.appendChild(td2);
  listaZone.append(tr);
}

//si prendono i documenti dalla collection dettaglio per inserirli nella tabella attraverso la funzione definita precedentemente
const colRef= collection(db, 'dettaglio')
getDocs((colRef)).then((snapshot) => {
    let dettaglio = [];
    snapshot.docs.forEach((doc)=>{
        dettaglio.push({
          ...doc.data(), id:doc.id
        })
        console.log(dettaglio)
        //si prende il nome della zona il cui id è presente all'interno della scheda dettaglio
        const x= collection(db, 'zone')
       
        const y = query(x, where('id', '==', doc.data().zona));
        getDocs(y).then((snapshot) => {
        let zone = [];
        snapshot.docs.forEach((doc2)=>{
        zone.push({
          ...doc2.data(), id:doc2.id
        })

        //si prende il nome del materiale il cui id è presente all'interno della scheda dettaglio
        const w =collection(db, 'materiali')
        const r = query(w, where('id', '==', doc.data().materiale));
        getDocs(r).then((snapshot)=>{
            let materiali=[];
            snapshot.docs.forEach((doc3)=>{
                materiali.push({
                    ...doc3.data(), id:doc3.id
                })
                letturaDettagli(doc, doc2, doc3)
            })
        })
       
    })
  })
})
})
.catch(err =>{
  console.log(err.message)
})
