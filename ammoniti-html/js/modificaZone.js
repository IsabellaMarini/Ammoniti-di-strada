// Import the functions you need from the SDKs you need
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { collection, getDocs, getFirestore, updateDoc, query, doc, where} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

//lettura zona di riferimento: docu è la zona, doc2 è il documento nella collection livelli
function ModificaZone(docu, doc2){
let form= document.querySelector('#div')
let nome = document.querySelector('#nome')
nome.value=docu.data().nomezona
let descrizione = document.querySelector('#descrizione')
descrizione.value=docu.data().descr
let latitude = document.querySelector('#latitudine')
latitude.value=docu.data().lat
let longitude= document.querySelector('#longitudine')
longitude.value=docu.data().long
let immagine = document.querySelector('#immagine')
let image = document.getElementById('immagine2')

//creazione menù a tendina che si visualizzerà solo in caso la zona sia una sottozona
let menu= document.createElement('fieldset')
let legend = document.createElement('legend')
let select = document.createElement('select')
let option=document.createElement('option')
immagine.textContent=docu.data().fotozona
let zona = document.getElementById('z')

//in base al valore del campo livelli nel db assegna un valore alla stringa zona 
if(docu.data().livelli=='0' || docu.data().livelli=='1'){
    zona.textContent="Zona"
    
} else {
  zona.textContent="Sottozona"
 
}


let livello= document.createElement('p')


let descrizione2 = document.createElement('input')
let labeldescr= document.createElement('label')
labeldescr.textContent="Descrizione livello: "
let height = document.createElement('input')
let labelheight= document.createElement('label')
labelheight.textContent="Altezza riquadro: "
let width = document.createElement('input')
let labelwidth= document.createElement('label')
labelwidth.textContent="Larghezza riquadro: "

let top = document.createElement('input')
let labeltop= document.createElement('label')
labeltop.textContent="Posizione riquadro altezza: "

let left = document.createElement('input')
let labelleft= document.createElement('label')
labelleft.textContent="Posizione riquadro larghezza: "

let hr= document.createElement('br')

descrizione2.placeholder="Descrizione livello"
height.placeholder="Height"
top.placeholder="Top"
width.placeholder="Width"
left.placeholder="Left"

 
//se il valore di zona è sottozona crea un menù a tendina con le varie zone di riferimento facendo apparire come selezionate la zona che è inserita nel db
if(zona.textContent=="Sottozona"){
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
        form.append(menu)
        const dbRef= collection(db, 'zone')
        const a= query(dbRef, where('livelli', '==', doc.id))
        getDocs((a)).then((snapshot)=>{
          snapshot.docs.forEach((doc2)=>{
            option.selected=doc2.data().nomezona
          })
        })
      })
      //se cambia l'opzione selezionata legge l'id della zona per inserirla sul db
      select.addEventListener("change", (e)=>{
        const y=query(colRef, where('nomezona','==', select.value))
         getDocs((y)).then((snapshot) => {
         snapshot.docs.forEach((doc)=>{
           livello.textContent=doc.data().id
         })
       })
      })  
    })
    //comparsa menù a tendina e input con i campi della collection livelli
  descrizione2.value=doc2.data().descr
  height.value=doc2.data().height
  top.value=doc2.data().top
  left.value=doc2.data().left
  width.value=doc2.data().width
  form.append(labeldescr)
  form.append(descrizione2)
  form.append(labelheight)
  form.append(height)
  form.append(labelwidth)
  form.append(width)
  form.append(hr)
  form.append(labeltop)
  form.append(top)
  form.append(labelleft)
  form.append(left)
}


  if(zona.textContent=="Zona"){
    livello.textContent="0"
  }


//aggiornamento immagine di riferimento
image.addEventListener("change", (e)=>{
  immagine.textContent=image.value.replace(/C:\\fakepath\\/i, '')})


//aggiornamento campi documento nella collection 'zone' e nella collection 'livelli'
let update = document.getElementById('conferma2')
update.addEventListener("click", (e)=>{
  e.preventDefault()
    updateDoc(doc(db, 'zone', sessionStorage.getItem('id')), {
      nomezona: nome.value,
      descr: descrizione.value,
      lat: parseFloat(latitude.value),
      long: parseFloat(longitude.value),
      fotozona: immagine.textContent,
      livelli: livello.textContent,
    });

    updateDoc(doc(db, 'livelli', doc2.id),{
      descr: descrizione2.value,
      top: parseFloat(top.value),
      height: parseFloat(height.value),
      left: parseFloat(left.value),
      width: parseFloat(width.value),
      zonaout: doc2.id
    })

    
    })
    //aggiunta immagine nello storage
    const metadata = {
      contentType:'image/png',
      contentType: 'image/jpeg',
    };
  
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
}


//lettura documento il cui riferimento è preso dalla pagina precedente 
const colRef= collection(db, 'zone')
const x= query(colRef, where('id', '==', sessionStorage.getItem('id')))
getDocs((x)).then((snapshot) => {
    let zone = [];
    snapshot.docs.forEach((doc)=>{
        zone.push({
          ...doc.data(), id:doc.id
        })
        //se la zona è una sottozone si va a leggere anche nella collection livelli
        if(doc.data().livelli!='0' && doc.data().livelli!='1'){
        const y=collection(db, 'livelli')
        const w = query(y, where('zonaout', '==', sessionStorage.getItem('id')))
        getDocs((w)).then((snapshot)=>{
         let livelli=[];
         snapshot.docs.forEach((doc2)=>{
           livelli.push({
             ...doc2.data(), id:doc2.id
           })
        ModificaZone(doc, doc2)
    }) 
  })}
  else ModificaZone(doc)
})})
.catch(err =>{
  console.log(err.message)
})
