// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { collection, getDocs, getFirestore, query, deleteDoc, where , doc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{getStorage, ref, getDownloadURL } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const listaSegnalazioni= document.querySelector('#lettura')
function letturaSegnalazioni(doc1, doc2){
 
  let tr = document.createElement('tr');
  let td1=document.createElement('td');
  let td2=document.createElement('td')
 
  
  
  let immagine = document.createElement('img');
  var img=getDownloadURL( ref(storage,  doc1.data().downloadURL )).then((url)=>
  immagine.setAttribute('src', url))
  
  let descrizione = document.createElement('p');
  let utente = document.createElement('p');
 
  let elimina = document.createElement('button');
  let modifica = document.createElement('button');

  tr.setAttribute('data-id', doc1.id);

  immagine.textContent= img;
  descrizione.textContent = doc1.data().descrizione;
  utente.textContent= "Creato da: " + doc2.data().firstName + " " +doc2.data().secondName
  modifica.textContent= "Modifica";
  elimina.textContent="Elimina";
  
  td1.appendChild(immagine);
  td2.appendChild(descrizione);
  td2.appendChild(utente);
  td2.appendChild(modifica);
  modifica.addEventListener("click", (e)=>{
    location.href="modificaSegnalazione.html?"+doc1.id
    sessionStorage.setItem("id", doc1.id)
  })
  td2.appendChild(elimina);
  elimina.addEventListener("click", (e)=>{
    let w=confirm("Sei sicuro di voler eliminare questa segnalazione?")
    if(w==true){
    deleteDoc(doc(db, 'segnalazioni', doc1.id))}
  })
  tr.appendChild(td1);
  tr.appendChild(td2);
  listaSegnalazioni.append(tr);
}
const colRef= collection(db, 'segnalazioni')

getDocs(colRef).then((snapshot) => {
    let segnalazioni = [];
    snapshot.docs.forEach((doc)=>{
        segnalazioni.push({
          ...doc.data(), id:doc.id
          
        })
        const x= collection(db, 'users')
      const y = query(x, where('uid', '==', doc.data().user));
      getDocs(y).then((snapshot) => {
      let utenti = [];
      snapshot.docs.forEach((doc2)=>{
      segnalazioni.push({
        ...doc2.data(), id:doc2.id
      })
      letturaSegnalazioni(doc, doc2)
  })
  console.log(utenti)
  
})
       
    })
    console.log(segnalazioni)
})
.catch(err =>{
  console.log(err.message)
})

