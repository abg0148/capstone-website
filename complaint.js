

  (function(){
    //get object 
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
          //console.log(user.uid);
          var submit=document.getElementById('submit');
          submit.addEventListener('click',e=>{
        
          var service=document.getElementById('service').value;
          var complaint=document.getElementById("complaint").value;
          
          
          //writing complaints data

          //testing
          k=firebase.database().ref().child('users').child(user.uid).child('RoomNo');
            k.on('value',snap=>{
                roomNo=snap.val();
                console.log(roomNo);
            
                var updates = {};
                updates['/service/' + service + '/' + roomNo] = complaint;
                //console.log(updates)
                firebase.database().ref().update(updates);
            })


          // firebase.database().ref().child('complaints').child(service).set({
          //   "fees" : "fees has increased in thapar",
          //   "menu" : "menu has been changed in Hostel M" 
          // })      
    });


    //adding data to MyComplaints
    k=firebase.database().ref().child('users').child(user.uid).child('RoomNo');
    k.on('value',snap=>{
        roomNo=snap.val();
        
        //adding data to MyComplaints-carpenter

        kk=firebase.database().ref().child('service').child('carpenter').child(roomNo);
        kk.on('value',snap=>{
          if(snap.val()!=null){
            //console.log(snap.val());
            document.getElementById("carpenter-complaint").innerText=snap.val();
          }else{
            document.getElementById("carpenter-complaint").innerText="";
          }
        })
        
        //adding data to MyComplaints-electricity

        kk=firebase.database().ref().child('service').child('electricity').child(roomNo);
        kk.on('value',snap=>{
          if(snap.val()!=null){
            //console.log(snap.val());
            document.getElementById("electricity-complaint").innerText=snap.val();
          }else{
            document.getElementById("electricity-complaint").innerText="";
          }
        })

        //adding data to MyComplaints-plumbing

        kk=firebase.database().ref().child('service').child('plumbing').child(roomNo);
        kk.on('value',snap=>{
          if(snap.val()!=null){
            //console.log(snap.val());
            document.getElementById("plumbing-complaint").innerText=snap.val();
          }else{
            document.getElementById("plumbing-complaint").innerText="";
          }
        })


        //removing data on clicking withdraw button

        //1. carpenter
        var withdraw=document.getElementById('carpenter-complaint-withdraw');
        withdraw.addEventListener('click',e=>{
          firebase.database().ref().child('service').child('carpenter').child(roomNo).remove()
        })
        
        //2. electricity
        var withdraw=document.getElementById('electricity-complaint-withdraw');
        withdraw.addEventListener('click',e=>{
          firebase.database().ref().child('service').child('electricity').child(roomNo).remove()
        })
        
        //3.plumbing
        var withdraw=document.getElementById('plumbing-complaint-withdraw');
        withdraw.addEventListener('click',e=>{
          firebase.database().ref().child('service').child('plumbing').child(roomNo).remove()
        })

    })
    
            

        } 
        else 
        {
            // No user is signed in.
            window.location='index.html';
        }
        });
    

}());
