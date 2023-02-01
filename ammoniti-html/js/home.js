
import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { collection, getDocs, getFirestore, query, where, orderBy, deleteDoc,getCountFromServer} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let x = document.createElement('p')
let y=document.createElement('p')
let z= document.createElement('p')
let w= document.createElement('p')

//conto di quanti dati sono presenti nella collection dettaglio
const colRef= collection(db, 'dettaglio')
getDocs((colRef)).then((snapshot) => {
    let dettaglio = [];
    snapshot.docs.forEach((doc)=>{
        dettaglio.push({
          ...doc.data(), id:doc.id
        })
        x.textContent=dettaglio.length
     } )
     //conto di quanti dati sono presenti nella collection segnalazioni
     const colRef= collection(db, 'segnalazioni')

getDocs(colRef).then((snapshot) => {
    let segnalazioni = [];
    snapshot.docs.forEach((doc)=>{
        segnalazioni.push({
          ...doc.data(), id:doc.id
          
        })
         y.textContent = segnalazioni.length
    })
    //conto di quanti dati sono presenti nella collection zone
    const colRef= collection(db, 'zone')

getDocs((colRef)).then((snapshot) => {
    let zone = [];
    snapshot.docs.forEach((doc)=>{
        zone.push({
          ...doc.data(), id:doc.id
        })
        z.textContent=zone.length
    })
  //conto di quanti dati sono presenti nella collection users 
const colRef= collection(db, 'users')

getDocs((colRef)).then((snapshot) => {
    let utenti = [];
    snapshot.docs.forEach((doc)=>{
        utenti.push({
          ...doc.data(), id:doc.id
        })
        w.textContent=utenti.length
    })
   //riferimento al codice html in particolare al canvas da creare
     var oilCanvas = document.querySelector("#Chart");

   //creazione vari componenti del grafico 
var oilData = {
    labels: [
        "Dettagli",
        "Segnalazioni",
        "Zone",
        "Utenti"
    ],
    datasets: [
        {
            data: [x.textContent, y.textContent, z.textContent, w.textContent],
            backgroundColor: [
                "#FF6384",
                "#63FF84",
                "#8463FF",
                "#ffc107"
            ]
        }]
};
//configurazione del grafico
const config= {
  type: 'pie',
data: oilData,

  options: {
    title: {
      display: true,
      text: "Dati presenti sul database",
      fontSize: 14,
      fontColor: '#0a0a0a'
    },
  }
    }
 

//si mettono insieme i dati e si visualizzano
const pieChart = new Chart(oilCanvas, config);


  })  })})})
 //riferimento al codice html in particolare al canvas da creare
var chart=document.querySelector('#materialsChart')


  let ul=[]
  let ul4=[]
 let c=document.createElement('p')
 let a= document.createElement('p')
 let b=[]
const dbRef= collection(db, 'materiali')
getDocs((dbRef)).then((snapshot)=>{
  let materiali=[] 
  snapshot.docs.forEach((doc)=>{
    //generazione automatica dei colori; ne vengono generati tanti quanti sono i documenti nella collection materiali
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    materiali.push({
      ...doc.data(), id:doc.id
    })
    ul4.push('#'+randomColor)
    c.textContent=doc.data().nome
    ul.push(c.textContent)
    a.textContent=doc.id
    b.push(a.textContent)
    
})
console.log(ul4)


let i1=document.createElement('p')



const ref=collection(db, 'dettaglio')
   
 var Data={
  
   labels: [],
  
   datasets: [
     {
         data: [],
         backgroundColor: []
     }]
 }; 
 let g=[]
 //per ogni scheda dettaglio si vede il materiale presente; in particolare si conta quante volte un materiale è presente nelle schede dettaglio scorrendo l'array b riempito con gli id dei materiali
 for(let i=0; i<ul.length; i++){
 var e= query(ref, where('materiale', '==', b[i]))
  getDocs((e)).then((snapshot)=>{
    let materiale=[] 
    snapshot.docs.forEach((doc)=>{
      materiale.push({
        ...doc.data(), id:doc.id
      })

    })
    
    g.push(materiale.length)
}).then(()=>{
  //una volta completata l'operazione precedente si crea il grafico con i materiali e il numero di volte in cui sono presenti nelle schede dettaglio
  for(let i=0; i<ul.length; i++){
    Data['labels'][i]=ul[i]
   
    Data['datasets'][0].backgroundColor[i]=ul4[i]
    Data['datasets'][0].data[i]=g[i]
  
  }
  const config= {type: 'pie',
  data: Data,
  options: {
    title: {
      display: true,
      text: "Quante volte i materiali sono presenti nelle schede dettaglio?",
      fontSize: 14, 
      fontColor: '#0a0a0a'
    },
  }
   }
  const pieChart = new Chart(chart, config);
}) 
}
 

})

   

var zoneChart=document.querySelector('#zoneChart')

let ul2=[]
let ul5=[]
let c2=document.createElement('p')
let a2= document.createElement('p')
let b2=[]
//riferimento alla collection zone per leggere i nomi delle zone presenti e il loro id
const dbRef2= collection(db, 'zone')
getDocs((dbRef2)).then((snapshot)=>{
 let zone=[] 
 snapshot.docs.forEach((doc)=>{
    //generazione automatica dei colori; ne vengono generati tanti quanti sono i documenti nella collection zone
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
   zone.push({
     ...doc.data(), id:doc.id
   })
   c2.textContent=doc.data().nomezona
   ul2.push(c2.textContent)
   ul5.push('#'+randomColor)
   a2.textContent=doc.id
   b2.push(a2.textContent)
  }) 
 
const ref=collection(db, 'dettaglio')
var Data={
  
  labels: [],
 
  datasets: [
    {
        data: [],
        backgroundColor: []
    }]
}; 
//per ogni scheda dettaglio si vede la zona di riferimento; in particolare si conta quante volte una zona è presente nelle schede dettaglio scorrendo l'array b2 riempito con gli id delle zone
let g2=[]
for(let i=0; i<ul2.length; i++){
var e= query(ref, where('zona', '==', b2[i]))
 getDocs((e)).then((snapshot)=>{
   let zona=[] 
   snapshot.docs.forEach((doc)=>{
     zona.push({
       ...doc.data(), id:doc.id
     })

   })
   
   g2.push(zona.length)
}).then(()=>{
  //una volta completata l'operazione precedente si crea il grafico con le zone e il numero di volte in cui sono presenti nelle schede dettaglio
 for(let i=0; i<ul2.length; i++){
   Data['labels'][i]=ul2[i]
  
   Data['datasets'][0].backgroundColor[i]=ul5[i]
   Data['datasets'][0].data[i]=g2[i]
 
 }
 const config= {type: 'pie',
 data: Data,
 options: {
   title: {
     display: true,
     text: "Quante volte le zone sono presenti nelle schede dettaglio?",
     fontSize: 14, 
     fontColor: '#0a0a0a'
   },
 }
  }
 const pieChart = new Chart(zoneChart, config);
}) 
}})


var usersChart=document.querySelector('#usersChart')

  let ul3=[]
  let ul6=[]
 let c3=document.createElement('p')
 let a3= document.createElement('p')
 let b3=[]

const dbRef3= collection(db, 'users')
//riferimento alla collection users per leggere i nomi degli utenti presenti e il loro uid
getDocs((dbRef3)).then((snapshot)=>{
  let materiali=[] 
  snapshot.docs.forEach((doc)=>{
    
    //generazione automatica dei colori; ne vengono generati tanti quanti sono i documenti nella collection users
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    materiali.push({
      ...doc.data(), id:doc.id
    })
    c3.textContent=doc.data().firstName + " " +doc.data().secondName
    ul3.push(c3.textContent)
    ul6.push('#'+randomColor)
    a3.textContent=doc.id
    b3.push(a3.textContent)
})
const ref=collection(db, 'segnalazioni')
var Data={
  
  labels: [],
 
  datasets: [
    {
        data: [],
        backgroundColor: []
    }]
}; 
let g4=[]
for(let i=0; i<ul3.length; i++){
  //per ogni segnalazione si vede l'utente che l'ha effettuata; in particolare si conta quante volte un utente ha fatto una segnalazione scorrendo l'array b3 riempito con gli uid degli utenti
var e= query(ref, where('user', '==', b3[i]))
 getDocs((e)).then((snapshot)=>{
   let utenti=[] 
   snapshot.docs.forEach((doc)=>{
     utenti.push({
       ...doc.data(), id:doc.id
     })

   })
   
   g4.push(utenti.length)
}).then(()=>{
 for(let i=0; i<ul3.length; i++){
   //una volta completata l'operazione precedente si crea il grafico con gli utenti e il numero di volte in cui hanno fatto una segnalazione
   Data['labels'][i]=ul3[i]
  
   Data['datasets'][0].backgroundColor[i]=ul6[i]
   Data['datasets'][0].data[i]=g4[i]
 
 }
 const config= {type: 'pie',
 data: Data,
 options: {
   title: {
     display: true,
     text: "Quante volte gli utenti hanno fatto le segnalazioni?",
     fontSize: 14, 
     fontColor: '#0a0a0a'
   },
 }
  }
 const pieChart = new Chart(usersChart, config);
}) 
}})



