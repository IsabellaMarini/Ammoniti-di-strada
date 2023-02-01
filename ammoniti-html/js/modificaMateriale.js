// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDocs, getFirestore, setDoc,updateDoc, query, deleteDoc, doc, where, addDoc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, getDownloadURL, uploadBytesResumable} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
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
const storage = getStorage(app)


function modificaMateriale(docu){
let form= document.querySelector('#aggiungi')

let nome = document.querySelector('#nome')

nome.value=docu.data().nome
let descrizione = document.querySelector('#descrizione')
descrizione.value=docu.data().descrizione
let età = document.querySelector('#età')
età.value=docu.data().eta
let provenienza= document.querySelector('#provenienza')
provenienza.value=docu.data().provenienza
let immagine = document.querySelector('#immagine')
let immagine2=document.querySelector('#immagine3')
let image = document.getElementById('immagine2')
let image2=document.getElementById('immagine1')

immagine.textContent=docu.data().image1
immagine2.textContent=docu.data().image2



image.addEventListener("change", (e)=>{
    immagine2.textContent=image.value.replace(/C:\\fakepath\\/i, '')
})
image2.addEventListener("change", (e)=>{
  immagine.textContent=image2.value.replace(/C:\\fakepath\\/i, '')})



let update = document.getElementById('conferma')
update.addEventListener("click", (e)=>{
  e.preventDefault()
    updateDoc(doc(db, 'materiali', sessionStorage.getItem('id')), {
      nome: nome.value,
      descrizione: descrizione.value,
      eta: età.value,
      provenienza: provenienza.value,
      image1: immagine.textContent,
      image2: immagine2.textContent,
    });
   
})

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
        const im= ref(storage, 'foto materiali/' +  immagine.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

 
}
}

immagine2.addEventListener('change', updateImageDisplay);
 function updateImageDisplay() {

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
        const im= ref(storage, 'foto zona 2/' +  immagine2.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }
 
}
}
}

const colRef= collection(db, 'materiali')
const x= query(colRef, where('id', '==', sessionStorage.getItem('id')))
getDocs((x)).then((snapshot) => {
    let materiale = [];
    snapshot.docs.forEach((doc)=>{
        materiale.push({
          ...doc.data(), id:doc.id
        
})
    modificaMateriale(doc)
})})
.catch(err =>{
  console.log(err.message)
})

