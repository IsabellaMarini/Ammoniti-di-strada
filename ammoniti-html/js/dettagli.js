// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDocs, deleteDoc, getFirestore, doc, query, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, getDownloadURL} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
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
const db = getFirestore(app)
const storage = getStorage(app);

const listaZone= document.querySelector('#lettura')
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


  tr.setAttribute('data-id', doc1.id);

  
  var img=getDownloadURL( ref(storage, 'foto dettaglio/' + doc1.data().fotofossile )).then((url)=>
      immagine.setAttribute('src', url)
  )

  immagine.textContent=img
  descrizione.textContent = doc1.data().descrfossile;
  zona.textContent = "Zona: " + doc2.data().nomezona;
  materiale.textContent = "Materiale: " + doc3.data().nome;
  modifica.textContent= "Modifica";

  elimina.textContent="Elimina";
  
  td1.appendChild(immagine);
  td2.appendChild(descrizione);
  td2.appendChild(zona);
  td2.appendChild(materiale);
  td2.append(modifica);
  modifica.addEventListener("click", (e)=>{
    location.href="modificaSchedaDettaglio.html?"+doc1.id
    sessionStorage.setItem("id", doc1.id)
  })
  td2.append(elimina);
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
const colRef= collection(db, 'dettaglio')
getDocs((colRef)).then((snapshot) => {
    let dettaglio = [];
    snapshot.docs.forEach((doc)=>{
        dettaglio.push({
          ...doc.data(), id:doc.id
        })
        console.log(dettaglio)
        const x= collection(db, 'zone')
       
        const y = query(x, where('id', '==', doc.data().zona));
        getDocs(y).then((snapshot) => {
        let zone = [];
        snapshot.docs.forEach((doc2)=>{
        zone.push({
          ...doc2.data(), id:doc2.id
        })
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
