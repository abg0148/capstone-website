(function(){
    //get object 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            // User is signed in.
            console.log(user.uid);
            
            //link url of person's room to room tag in dashboard
            var userId= user.uid;
            
            //set welcome message
            k=firebase.database().ref().child('users').child(userId).child('Name');
            k.on('value',snap=>{
                nam=snap.val();
                document.getElementById('welcome-msg').innerText='Welcome, '+nam;
        
            })

            //set mess bill
            k=firebase.database().ref().child('users').child(userId).child('MessBill');
            k.on('value',snap=>{
                messbill=snap.val();
                document.getElementById('mess-bill').innerText=messbill;
        
            })

            var d=new Date()
            var weekday= new Array(7)
            weekday[0] = "sunday";
            weekday[1] = "monday";
            weekday[2] = "tuesday";
            weekday[3] = "wednesday";
            weekday[4] = "thursday";
            weekday[5] = "friday";
            weekday[6] = "saturday";

            var today = weekday[d.getDay()];

            //get menu

            //breakfast
            k=firebase.database().ref().child('messMenu').child(today).child('Breakfast');
            k.on('value',snap=>{
                breakfast=snap.val();
                document.getElementById('breakfast-menu').innerText=breakfast;
        
            })

            //lunch
            k=firebase.database().ref().child('messMenu').child(today).child('Lunch');
            k.on('value',snap=>{
                lunch=snap.val();
                document.getElementById('lunch-menu').innerText=lunch;
        
            })

            //dinner
            k=firebase.database().ref().child('messMenu').child(today).child('Dinner');
            k.on('value',snap=>{
                dinner=snap.val();
                document.getElementById('dinner-menu').innerText=dinner;
        
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
