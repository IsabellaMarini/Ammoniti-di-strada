// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getFirestore,addDoc, getDocs, query, where, updateDoc, doc} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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
const storage= getStorage(app)
let form= document.querySelector('#aggiungi')
let nome = document.querySelector('#nome')
let descrizione = document.querySelector('#descrizione')
let zona = document.getElementById('zona')
let sottozona = document.getElementById('sottozona')
let livello = document.createElement('p')
let menu= document.createElement('fieldset')
let legend = document.createElement('legend')
let select = document.createElement('select')
let x = document.createElement('p')
let descrizione2 = document.createElement('input')
let heigth = document.createElement('input')

let width = document.createElement('input')

let top = document.createElement('input')

let left = document.createElement('input')
 
let div= document.querySelector('#id')
let option=document.createElement('option')

let immagine = document.getElementById('immagine')
let longitudine= document.querySelector('#longitudine')
let latitudine = document.querySelector('#latitudine')

let labeldescr= document.createElement('label')
labeldescr.textContent="Descrizione livello: "

let labelheight= document.createElement('label')
labelheight.textContent="Altezza riquadro: "

let labelwidth= document.createElement('label')
labelwidth.textContent="Larghezza riquadro: "

let labeltop= document.createElement('label')
labeltop.textContent="Posizione riquadro altezza: "

let labelleft= document.createElement('label')
labelleft.textContent="Posizione riquadro larghezza: "

zona.addEventListener("click", (e)=>{
  livello.textContent="0"
  document.getElementById('sottozona').checked=false
  div.removeChild(descrizione2)
  div.removeChild(heigth)
  div.removeChild(width)
  div.removeChild(top)
  div.removeChild(left)
  div.removeChild(menu)
})



sottozona.addEventListener("click", (e)=>{
  document.getElementById('zona').checked= false
  option.textContent=""
  legend.textContent="Scegli una zona: "
  select.appendChild(option)
        menu.appendChild(legend)
        menu.appendChild(select)
  div.appendChild(menu)
  const colRef= collection(db, 'zone')
  const z=query(colRef, where('livelli','in', ['0', '1']))
  getDocs((z)).then((snapshot) => {
      snapshot.docs.forEach((doc)=>{
        let option=document.createElement('option')
        select.appendChild(option)
        legend.textContent="Scegli una zona: "
        option.textContent=doc.data().nomezona
        select.appendChild(option)
        menu.appendChild(legend)
        menu.appendChild(select)
        div.append(menu)
     
      })
      select.addEventListener("change", (e)=>{
        const y=query(colRef, where('nomezona','==', select.value))
         getDocs((y)).then((snapshot) => {
         snapshot.docs.forEach((doc)=>{
           livello.textContent=doc.data().id
         })
       })
       
      })  
    descrizione2.placeholder="Descrizione livello"
       heigth.placeholder="Height"
       top.placeholder="Top"
       width.placeholder="Width"
       left.placeholder="Left"
       div.append(labeldescr)
       div.append(descrizione2)
       div.append(labelheight)
       div.append(heigth)
       div.append(labelwidth)
       div.append(width)
       div.append(labeltop)
       div.append(top)
       div.append(labelleft)
       div.append(left) 
})})



let add = document.getElementById('conferma')
const preview = document.querySelector('#preview');
add.addEventListener("click", (e) =>{
    e.preventDefault()
   addDoc( collection(db,'zone'),{
    nomezona: nome.value,
    descr: descrizione.value,
    livelli: livello.textContent, 
    fotozona : immagine.value.replace(/C:\\fakepath\\/i, ''),
    long: parseFloat(longitudine.value),
    lat: parseFloat(latitudine.value)
}).then(( colRef)=>{
  console.log("Document written with: ", colRef.id)
  x.textContent=colRef.id
  updateDoc(doc(db, 'zone', x.textContent), {
    id: x.textContent
  })
   if(livello.textContent !="0"){
    addDoc(collection(db, 'livelli'), {
    zona: livello.textContent,
    zonaout: x.textContent,
    descr: descrizione2.value,
    height: parseFloat(heigth.value),
    top: parseFloat(top.value),
    width: parseFloat(width.value),
    left: parseFloat(left.value)
  })}})
  form.setAttribute('file', immagine)
  
  
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
        const im= ref(storage, 'foto zona 2/' +  immagine.value.replace(/C:\\fakepath\\/i, ''))
        uploadBytesResumable(im, file,  metadata)
      }

    
 
 
}
}
  


