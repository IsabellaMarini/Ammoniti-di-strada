import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getFirestore,addDoc, updateDoc, doc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, uploadBytesResumable} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

//vari riferimenti alle componenti html tramite id
let nome= document.querySelector('#nome')
let descrizione= document.querySelector('#descrizione')
let età= document.querySelector('#età')
let provenienza= document.querySelector('#provenienza')
let immagine1 = document.querySelector('#immagine1')
let immagine2= document.querySelector('#immagine2')
let x= document.createElement('p')
let add = document.getElementById('conferma')

// Caricare documento nel db al click sul pulsante
add.addEventListener("click", (e) =>{
    e.preventDefault()
   addDoc( collection(db,'materiali'),{
    nome: nome.value,
    descrizione: descrizione.value,
    eta: età.value, 
    image1: immagine1.value.replace(/C:\\fakepath\\/i, ''),
    provenienza: provenienza.value,
    image2: immagine2.value.replace(/C:\\fakepath\\/i, '')
}).then((colRef)=>{
  console.log("Document written with: ", colRef.id)
  x.textContent=colRef.id
  updateDoc(doc(db, 'materiali', x.textContent), {
    id: x.textContent
  })})
})

// Caricare le immagini nello storage
immagine1.addEventListener('change', updateImageDisplay);
 function updateImageDisplay() {

  const file = immagine1.files;
  if (file.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.textContent=para;
  } else {
   //scorre ogni bit dell'immagine e la inserisce
    for (const file of curFiles) {

        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        const metadata = {
          contentType:'image/png',
          contentType: 'image/jpeg',
        };
        const im= ref(storage, 'foto materiali/' +  immagine1.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

    
 
 
}
}
immagine2.addEventListener('change', updateImageDisplay2);
 function updateImageDisplay2() {

  const curFiles = immagine2.files;
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
        const im= ref(storage, 'foto materiali/' +  immagine2.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

 
}
}