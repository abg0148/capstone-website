(function(){
    //get object 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            // User is signed in.
            console.log(user.uid);
            

            var userId= user.uid;
            r=1;
            k=firebase.database().ref().child('users').child(userId).child('RoomNo');
            k.on('value',snap=>{
                roomNo=snap.val();
                kk=firebase.database().ref().child('roomURL').child(roomNo);
                kk.on('value',snap=>{
                    roomurl=snap.val()
                    document.getElementById('dashboard-room').href=roomurl;
                })
            })
            
            
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
