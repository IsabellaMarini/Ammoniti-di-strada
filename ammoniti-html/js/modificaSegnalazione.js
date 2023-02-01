// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDoc, getFirestore, updateDoc, doc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, uploadBytesResumable} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

//Configurazione Firebase
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

//visualizza i dati presenti nel db prendendo l'id della segnalazione di riferimento
function modificaSegnalazione(segnalazioni){
let form= document.querySelector('#aggiungi')

let descrizione = document.querySelector('#descrizione')
descrizione.value=segnalazioni.descrizione

let immagine = document.querySelector('#immagine')

//stampa il nome dell'immagine nella segnalazione di riferimento
let image2=document.getElementById('immagine1')

immagine.textContent=segnalazioni.downloadURL


//modifica l'immagine di riferimento
image2.addEventListener("change", (e)=>{
  immagine.textContent=image2.value.replace(/C:\\fakepath\\/i, '')})


//aggiorna i campi della segnalazione di riferimento 
let update = document.getElementById('conferma')
update.addEventListener("click", (e)=>{
  e.preventDefault()
    updateDoc(doc(db, 'segnalazioni', sessionStorage.getItem('id')), {
      descrizione: descrizione.value,
      downloadURL: immagine.textContent,
    });

    
})

//aggiunge la nuova immagine allo storage
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
        const im= ref(storage, 'foto segnalazioni/' +  immagine.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

}
}
}

//lettura documento con il'id salvato nella pagina precedente
const colRef= doc(db, 'segnalazioni', sessionStorage.getItem('id'))
getDoc((colRef)).then((doc)=>{
  if (doc.exists){
    
    var segnalazioni = doc.data();
    
    console.log(segnalazioni.toString());
  } 
  modificaSegnalazione(segnalazioni)
})

  





