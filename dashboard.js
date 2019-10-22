(function(){
    //get object 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            // User is signed in.
            console.log(user.uid);
            console.log("hello world");

            document.getElementById('heading').innerText='NOTIFiCATIONS'
            ulist = document.getElementById('notifications')
            //create object reference
            dbref = firebase.database().ref().child('notifications')
    
            //detect changes in database and reflect it on dashboard.html
            dbref.on('value',snap=>
            {
                ulist.innerText=""
                var result = snap.val()
                for( var key in result)
                {
                    li = document.createElement('li')
                    li.innerText =key + ' : ' + result[key] 
                    li.id=key
                    ulist.appendChild(li)
                }
            })
            const btnLogout=document.getElementById('btnLogout');
            btnLogout.addEventListener('click',e=>{
                firebase.auth().signOut();
              });

        } 
        else 
        {
            // No user is signed in.
            window.location='index.html';
        }
        });
    

}());
