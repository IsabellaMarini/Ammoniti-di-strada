// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { collection, getDocs, getFirestore, query, orderBy, deleteDoc, doc, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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
const db = getFirestore(app);
const storage = getStorage(app);
const listaMateriali= document.querySelector('#lettura')
//si riempie la tabella definita in html con i dati presi dal db: doc1 fa riferimento alla collection 'materiali'
function letturaMateriali(doc1){
 
  let tr= document.createElement('tr');

  let td1=document.createElement('td');

  let td2=document.createElement('td');

  let nome = document.createElement('h3');
  
  let immagine1 = document.createElement('img');

  //si caricano le immagini di riferimento dallo storage
  var img=getDownloadURL( ref(storage, 'foto materiali/' + doc1.data().image1 )).then((url)=>
      immagine1.setAttribute('src', url))
  
  immagine1.textContent=img
  let immagine2 = document.createElement('img');
  var img=getDownloadURL( ref(storage, 'foto materiali/' + doc1.data().image2 )).then((url)=>
  immagine2.setAttribute('src', url)
)
immagine2.textContent=img
  let descrizione = document.createElement('p');
 
  let età = document.createElement('p');
  
  let provenienza = document.createElement('p');
  let elimina = document.createElement('button');
  let modifica = document.createElement('button');

  //nelle righe della tabella definita in html si prende il riferimento all'id del documento
  tr.setAttribute('data-id', doc1.id);

  //si riempiono le componenti definite precedentemente con i dati presi dal db
  nome.textContent = doc1.data().nome;
  immagine1.textContent= doc1.data().image1;
  immagine2.textContent= doc1.data().image2;
  descrizione.textContent = doc1.data().descrizione;
  età.textContent = "Età: " + doc1.data().eta;
  provenienza.textContent = "Provezienza: "+ doc1.data().provenienza;
  modifica.textContent= "Modifica";
  elimina.textContent="Elimina";

  //si caricano i campi dei documenti nell'opportuna colonna della tabella
  td2.appendChild(nome);
  td1.appendChild(immagine1);
  td1.appendChild(immagine2);
  td2.appendChild(descrizione);
  td2.appendChild(età);
  td2.appendChild(provenienza);
  td2.append(modifica);

  //si rimanda alla pagina di modifica del materiale salvando anche l'id del materiale di riferimento
  modifica.addEventListener("click", (e)=>{
    location.href="modificaMateriale.html?"+doc1.id
    sessionStorage.setItem("id", doc1.id)
  })
  td2.append(elimina);
  //si permette l'eliminazione di un materiale sono dopo aver verificato che esso non è presente in nessuna scheda dettaglio attraverso l'id di riferimento
  const ref1 =collection(db, 'dettaglio')
  const a = query(ref1, where('materiale', '==', doc1.id))
  getDocs(a).then((snapshot)=>{
    let dettaglio=[];
    snapshot.docs.forEach((doc3)=>{
      dettaglio.push({
        ...doc3.data(), id: doc3.id
      })
    })
    if(dettaglio.length=='0'){
      elimina.addEventListener("click", (e)=>{
      let w=confirm("Sei sicuro di voler eliminare questo materiale?")
      if(w==true){
      deleteDoc(doc(db, 'materiali', doc1.id))
    }
    })
    }else{
      td2.removeChild(elimina)
  }})
  tr.appendChild(td1);
  tr.appendChild(td2);
  listaMateriali.append(tr);
}

//si leggono tutti i materiali presenti nella collection e si inseriscono nella tabella attraverso la funzione precedente
const colRef= collection(db, 'materiali')
const z=query(colRef, orderBy('nome', 'desc'))
getDocs(z).then((snapshot) => {
    let materiali = [];
    snapshot.docs.forEach((doc)=>{
        materiali.push({
          ...doc.data(), id:doc.id
        })
        letturaMateriali(doc)
    })
    console.log(materiali)
})
.catch(err =>{
  console.log(err.message)
})