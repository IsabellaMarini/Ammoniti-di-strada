// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDocs, getFirestore, orderBy, query, deleteDoc, doc, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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
function letturaZone(docu){
 
  let tr = document.createElement('tr');

  let td1 =document.createElement('td');

  let td2= document.createElement('td')

  let nome = document.createElement('h3');
  
  let immagine = document.createElement('img');
  
  let descrizione = document.createElement('p');

  let livello = document.createElement('p');
 
  let longitudine = document.createElement('p');
  
  let latitudine = document.createElement('p');

  let modifica = document.createElement('button');

  let elimina = document.createElement('button');


  tr.setAttribute('data-id', docu.id);
  nome.textContent = docu.data().nomezona;
  
  var img=getDownloadURL( ref(storage, 'foto zona 2/' + docu.data().fotozona )).then((url)=>
      immagine.setAttribute('src', url)
  )
  immagine.textContent=img
  descrizione.textContent = docu.data().descr;
  if(docu.data().livelli == "0"){
     livello.textContent="Zona"
  } else if(docu.data().livelli != "1"){
    livello.textContent="Sottozona"
  }
  longitudine.textContent = "Longitudine: "+docu.data().long;
  latitudine.textContent = "Latitudine: "+docu.data().lat;
  modifica.textContent= "Modifica";
  elimina.textContent="Elimina";
  td2.appendChild(nome);
  td1.appendChild(immagine);
  td2.appendChild(descrizione);
  td2.appendChild(livello)
  td2.appendChild(longitudine);
  td2.appendChild(latitudine);
  td2.append(modifica);
  td2.append(elimina);
  tr.append(td1);
  tr.append(td2);
  modifica.addEventListener("click", (e)=>{
    location.href="ModificaZone.html?"+docu.id
    sessionStorage.setItem("id", docu.id)
  })
 
    const ref1 =collection(db, 'dettaglio')
    const a = query(ref1, where('zona', '==', docu.id))
    getDocs(a).then((snapshot)=>{
      let dettaglio=[];
      snapshot.docs.forEach((doc3)=>{
        dettaglio.push({
          ...doc3.data(), id: doc3.id
        })
      })

      const ref2=collection(db, 'livelli')
      const b= query(ref2, where('zona', '==', docu.id))
      getDocs(b).then((snapshot)=>{
        let livelli=[];
        snapshot.docs.forEach((doc3)=>{
          livelli.push({
            ...doc3.data(), id: doc3.id
          })
        })
      if(dettaglio.length=='0' && livelli.length=='0'){
        elimina.addEventListener("click", (e)=>{
        let w=confirm("Sei sicuro di voler eliminare questa zona?")
        if(w==true){
        deleteDoc(doc(db, 'zone', docu.id))
        const colRef2= collection(db, 'livelli')
        const x = query(colRef2, where('zonaout', '==', docu.id))
        getDocs(x).then((snapshot) => {
          let zone = [];
          snapshot.docs.forEach((doc2)=>{
          zone.push({
            ...doc2.data(), id:doc2.id
          })
          deleteDoc(doc(db, 'livelli', doc2.id))
      })
    })}
      })
      }else{
        td2.removeChild(elimina)
    }})})
    
    listaZone.append(tr);
  }
 

const colRef= collection(db, 'zone')
const z=query(colRef, orderBy('nomezona'))
getDocs((z)).then((snapshot) => {
    let zone = [];
    snapshot.docs.forEach((doc)=>{
        zone.push({
          ...doc.data(), id:doc.id
        })
        letturaZone(doc)
    })
    console.log(zone)
})
.catch(err =>{
  console.log(err.message)
})
