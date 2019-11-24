(function(){
    //get object 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            // User is signed in.
            console.log(user.uid);
            
            //link url of person's room to room tag in dashboard
            var userId= user.uid;

            k=firebase.database().ref().child('users').child(userId).child('RoomNo');
            k.on('value',snap=>{
                roomNo=snap.val();
                kk=firebase.database().ref().child('roomURL').child(roomNo);
                kk.on('value',snap=>{
                    roomurl=snap.val()
                    roomurl= "http://"+roomurl;
                    document.getElementById('dashboard-room').href=roomurl;
                    console.log(roomurl)
                })
            })

            //
            
            //writing mess menu
            //firebase.database().ref().child('notifications').set({
            //    "fees" : "fees has increased in thapar",
            //    "menu" : "menu has been changed in Hostel M" 
            //})
            
            document.getElementById('heading').innerText='NOTIFICATIONS'
            document.getElementById('heading2').innerText='E-BILL'
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

            kkk=firebase.database().ref().child("users").child(user.uid).child("ElectricityBill")
            kkk.on('value',snap=>{
                var bill=snap.val()
                document.getElementById("ebillunits").innerText=bill+" units";
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
