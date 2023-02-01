 function validate(e){
  let form=document.getElementById('login')
var password=document.getElementById('password').value;
var username = document.getElementById('username').value;
let i=document.getElementById('errore')
  if(username=="Ammoniti" && password=="Ammoniti"){
   form.action="dettagli.html?"
  
}
else{
  i.textContent="Username o password errati"
  e.preventDefault();
}
}
