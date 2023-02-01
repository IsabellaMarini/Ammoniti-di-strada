
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection,  getFirestore,addDoc, getDocs, query, where, serverTimestamp, updateDoc, doc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import{ getStorage, ref, uploadBytesResumable} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage=getStorage(app)

let descrizione= document.querySelector('#descrizione')
let select1 = document.querySelector('#zone')
let select2= document.querySelector('#materiali')
let option= document.createElement('option')
let option2= document.createElement('option')
let zona=document.createElement('p')
let materiale = document.createElement('p')
let immagine=document.querySelector('#immagine')
option.textContent=""
option2.textContent=""
select1.append(option)
select2.append(option2)

const colRef= collection(db, 'zone')
getDocs((colRef)).then((snapshot) => {
    snapshot.docs.forEach((doc)=>{
      let option=document.createElement('option')
      select1.appendChild(option)
      option.textContent=doc.data().nomezona
      select1.appendChild(option)})
      select1.addEventListener("change", (e)=>{
        const y=query(colRef, where('nomezona','==', select1.value))
         getDocs((y)).then((snapshot) => {
         snapshot.docs.forEach((doc)=>{
           zona.textContent=doc.data().id
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
          select2.addEventListener("change", (e)=>{
            const y=query(colRef2, where('nome','==', select2.value))
             getDocs((y)).then((snapshot) => {
             snapshot.docs.forEach((doc)=>{
               materiale.textContent=doc.data().id
             })
           })
          })  
})
let x= document.createElement('p')

let add = document.getElementById('conferma')
add.addEventListener("click", (e)=>{
  e.preventDefault()
  addDoc( collection(db,'dettaglio'),{
   descrfossile: descrizione.value,
   zona: zona.textContent, 
   fotofossile : immagine.value.replace(/C:\\fakepath\\/i, ''),
   materiale: materiale.textContent,
   dateTime: serverTimestamp()
}).then((colRef)=>{
  console.log("Document written with: ", colRef.id)
  x.textContent=colRef.id
  updateDoc(doc(db, 'dettaglio', x.textContent), {
    id: x.textContent
  })})

  const metadata = {
    contentType:'image/png',
    contentType: 'image/jpeg',
  };

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
        const im= ref(storage, 'foto dettaglio/' +  immagine.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

    
 
 
}
}