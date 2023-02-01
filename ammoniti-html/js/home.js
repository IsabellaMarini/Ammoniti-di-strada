// Import the functions you need from the SDKs you need

import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { collection, getDocs, getFirestore, query, where, orderBy, deleteDoc,getCountFromServer} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
const db = getFirestore(app);
let x = document.createElement('p')
let y=document.createElement('p')
let z= document.createElement('p')
let w= document.createElement('p')


const colRef= collection(db, 'dettaglio')
getDocs((colRef)).then((snapshot) => {
    let dettaglio = [];
    snapshot.docs.forEach((doc)=>{
        dettaglio.push({
          ...doc.data(), id:doc.id
        })
        x.textContent=dettaglio.length
     } )
     const colRef= collection(db, 'segnalazioni')

getDocs(colRef).then((snapshot) => {
    let segnalazioni = [];
    snapshot.docs.forEach((doc)=>{
        segnalazioni.push({
          ...doc.data(), id:doc.id
          
        })
         y.textContent = segnalazioni.length
    })
    
    const colRef= collection(db, 'zone')

getDocs((colRef)).then((snapshot) => {
    let zone = [];
    snapshot.docs.forEach((doc)=>{
        zone.push({
          ...doc.data(), id:doc.id
        })
        z.textContent=zone.length
    })
   
const colRef= collection(db, 'users')

getDocs((colRef)).then((snapshot) => {
    let utenti = [];
    snapshot.docs.forEach((doc)=>{
        utenti.push({
          ...doc.data(), id:doc.id
        })
        w.textContent=utenti.length
    })
   
     var oilCanvas = document.querySelector("#Chart");

    
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
 


const pieChart = new Chart(oilCanvas, config);


  })  })})})
 
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

const dbRef2= collection(db, 'zone')
getDocs((dbRef2)).then((snapshot)=>{
 let zone=[] 
 snapshot.docs.forEach((doc)=>{
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
 let e3= document.createElement('p')
let f3= document.createElement('p')
let g3= document.createElement('p')
let h3= document.createElement('p')
let i3=document.createElement('p')
let l3=document.createElement('p')
let x3 = document.createElement('p')
let y3=document.createElement('p')
let z3=document.createElement('p')
const dbRef3= collection(db, 'users')
getDocs((dbRef3)).then((snapshot)=>{
  let materiali=[] 
  snapshot.docs.forEach((doc)=>{
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



