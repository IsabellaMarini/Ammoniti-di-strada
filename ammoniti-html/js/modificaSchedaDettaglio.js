// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDoc, getDocs, getFirestore, updateDoc, query,  doc, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, uploadBytesResumable } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
//Configurazione firebase
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
const storage = getStorage(app)

//visualizzazione dati salvati sul db nel documento salvato precedentemente con l'id
function modificaDettagli(docu){
let form= document.querySelector('#aggiungi')

let descrizione = document.querySelector('#descrizione')
descrizione.value=docu.descrfossile
let select1 = document.querySelector('#zone')
let select2= document.querySelector('#materiali')
let image = document.querySelector('#immagine')

let immagine = document.getElementById('image')


immagine.textContent=docu.fotofossile

//lettura dei nomi delle zone presenti sul database e inserimento nel menù a tendina; per prima viene visualizzata la zona già salvata
const dbRef= collection(db, 'zone')
const a= query(dbRef, where('id', '==', docu.zona))
getDocs((a)).then((snapshot)=>{
  snapshot.docs.forEach((doc2)=>{
    let option=document.createElement('option')
    option.textContent=doc2.data().nomezona
    
    select1.appendChild(option)
  })
  console.log(option)
})

//lettura dei nomi deli materiali presenti sul database e inserimento nel menù a tendina; per prima viene visualizzato il materiale già salvato
const ref1= collection(db, 'materiali')
      const y= query(ref1, where('id', '==', docu.materiale))
      getDocs((y)).then((snapshot)=>{
        snapshot.docs.forEach((doc4)=>{
          let option=document.createElement('option')
          option.textContent=doc4.data().nome
         
          select2.appendChild(option)
        })
      })

const colRef= collection(db, 'zone')
getDocs((colRef)).then((snapshot) => {
    snapshot.docs.forEach((doc)=>{
      let option=document.createElement('option')
      
      option.textContent=doc.data().nomezona
      
      select1.appendChild(option)

 })
      
    //una volta fatto il click su una opzione la zona viene inserita sul database tramite l'id
      select1.addEventListener("change", (e)=>{
        const y=query(colRef, where('nomezona','==', select1.value))
         getDocs((y)).then((snapshot) => {
         snapshot.docs.forEach((doc3)=>{
           zona.textContent=doc3.data().id
         })
       })
      })  
    })

    const colRef2= collection(db, 'materiali')
    getDocs((colRef2)).then((snapshot) => {
        snapshot.docs.forEach((doc)=>{
          let option=document.createElement('option')
      
          select2.appendChild(option)
          option.textContent=doc.data().nome
          select2.appendChild(option)})
          //una volta fatto il click su una opzione il materiale viene inserito sul database tramite l'id
          select2.addEventListener("change", (e)=>{
            const y=query(colRef2, where('nome','==', select2.value))
             getDocs((y)).then((snapshot) => {
             snapshot.docs.forEach((doc)=>{
               materiale.textContent=doc.data().id
             })
           })
          })  
})


//visualizzazione nome dell'immagine inserita tramite l'input di tipo file
image.addEventListener("change", (e)=>{
    immagine.textContent=image.value.replace(/C:\\fakepath\\/i, '')
})


//aggiornamento documento con i campi inseriti
let update = document.getElementById('conferma')
update.addEventListener("click", (e)=>{
  e.preventDefault()
    updateDoc(doc(db, 'dettaglio', sessionStorage.getItem('id')), {
      descrizione: descrizione.value,
      fotofossile: immagine.textContent,
      materiale: materiale.textContent,
      zona: zona.textContent
    });
    
})

//caricamento nuova immagine sullo storage
 immagine.addEventListener('change', updateImageDisplay);
 function updateImageDisplay() {

  const curFiles = immagine.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.textContent=para;
  } else {
   
    for (const file of curFiles) {
      
    
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        const metadata = {
          contentType:'image/png',
          contentType: 'image/jpeg',
        };
        const im= ref(storage, 'foto dettaglio/' +  immagine.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

}
}
}

//lettura dati relativi alla scheda dettaglio attraverso l'id salvato precedentemente
const colRef= doc(db, 'dettaglio', sessionStorage.getItem('id'))
getDoc((colRef)).then((doc)=>{
  if (doc.exists){
   
    var dettagli = doc.data();
    
    console.log(dettagli);
  } 
  modificaDettagli(dettagli)
})

