(function(){
  // Your web app's Firebase configuration

  //Get Elements
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const btnLogin=document.getElementById('btnLogin');

  //Add login event
  
      
  btnLogin.addEventListener('click',e=>{
    //Get Email
    const email=txtEmail.value+'@capstone.project';  //done so that in username fiels users dont have to write @capstone.project everytime.
    const pass=txtPassword.value;
    const auth=firebase.auth();
    const promise=auth.signInWithEmailAndPassword(email,pass);
    promise.then(user=>window.location='dashboard.html').catch(e=>window.alert(e.message));



    
  });


}());