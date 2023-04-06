var $$ = function( id ) { return document.getElementById( id ); };
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
//month no
const datea = new Date();
const monthNumber = parseInt(datea.getMonth())+1; // returns the month number (0-11)
console.log(monthNumber); // outputs the current month number
const date = new Date();
const monthName = (date.toLocaleString('default', { month: 'long' })).toLocaleUpperCase();
console.log(monthName); // outputs the current month name in the current locale


//Get date
// Create a new Date object
const currentDate = new Date();

// Get the year, month, and day from the date object
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");

// Combine the year, month, and day into the desired format
 formattedDate = `${year}|${month}|${day}`;

// Log the formatted date to the console
console.log(formattedDate);


//Week Number
// Get current date
const today = new Date();

// Get the week number of the year
const weekNumber = Math.ceil((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

console.log("Week number:", weekNumber);

$$('weeklyt').innerText  = "Weekly Performance (Week "+weekNumber+")"

//Calculate remaining
  // Set the end date of the countdown
  const endDate = new Date("August 15, 2024 00:00:00").getTime();

  // Update the countdown every second
  const timer = setInterval(() => {
    // Get the current date and time
    const now = new Date().getTime();

    // Calculate the remaining time in milliseconds
    const remainingTime = endDate - now;

    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Display the remaining time in the countdown element
    const countdown = document.getElementById("countdown");
    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Check if the countdown has ended
    if (remainingTime < 0) {
      clearInterval(timer);
      countdown.innerHTML = "Countdown has ended";
    }
  }, 1000);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD6-NjFsmW0GgcyWMcSUSSPZiHLJmvEnuI",
    authDomain: "study-diary-294bc.firebaseapp.com",
    projectId: "study-diary-294bc",
    storageBucket: "study-diary-294bc.appspot.com",
    databaseURL: "https://study-diary-294bc-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "771492676291",
    appId: "1:771492676291:web:a10fc354ab1b0f69c8d876"
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userdt = user
      var uid = user.uid;
     pn = user.phoneNumber;
     if(pn.includes("7723341")){
      othern = "Evi"
      ophone = "+94775667556"
      $$('mel').innerText = "N"
$$('yol').innerText = "E"
     } else{
      othern = "Nadee"
      ophone = "+94717723341"
$$('mel').innerText = "E"
$$('yol').innerText = "N"
     }
     $$('othern').innerText = othern
      database.ref('users/'+userdt.phoneNumber).once('value', snapshot => {
      console.log('users/'+userdt.phoneNumber)
console.log(snapshot.val())
      $$("uname").innerText = snapshot.val()["name"]
      $$('ppic').src = snapshot.val()["profile"]
      $$('ppic2').src = snapshot.val()["profile"]
      });

      // ...
    } else {
   window.location.href =   "/admin/login"
    }
    
    gotpn()
  });



function lastx(){
  database.ref('hours/').on('value', snapshot => {
    $$('toth').innerText = parseFloat(snapshot.val()["+94717723341"])+parseFloat(snapshot.val()["+94775667556"])
    $$('ndih').innerText = snapshot.val()["+94717723341"];
    $$('evih').innerText = snapshot.val()["+94775667556"];

    nnow = parseFloat(snapshot.val()["+94717723341"])
    enow = parseFloat(snapshot.val()["+94775667556"])
    
    
    database.ref('last').once('value', snapshot => {
      nlast = parseFloat(snapshot.val()["+94717723341"]["hours"]["h"])
      elast = parseFloat(snapshot.val()["+94775667556"]["hours"]["h"])
     $$('nhp').innerHTML ='<i class="fas fa-arrow-up" ></i>&nbsp'+(100-(nlast/nnow)*100).toFixed(2)+"%"
     $$('evp').innerHTML ='<i class="fas fa-arrow-up" ></i>&nbsp'+(100-(elast/enow*100)).toFixed(2)+"%"
     database.ref("items/"+pn).once('value', snapshot => {
      $$('perform').innerHTML = (parseFloat(mineh)/parseFloat(snapshot.val())/8)*100
     })
     

          })})

 
}


  function addrec(){
    Swal.fire({
  
        html: "<div id='newpop'>"+$$('inform').outerHTML+"</div>",
        showConfirmButton:false,
        showCloseButton:true
     
      })
  }

  function submitnew(){
    var hours = (document.getElementById("newpop")).getElementsByClassName("hoursx")[0].value;
    var lesson = (document.getElementById("newpop")).getElementsByClassName("lessonx")[0].value;

if(hours!=''&&lesson!=''){
  database.ref('last/'+pn+"/hours").update({
h:mineh
  })
database.ref('weekly/'+weekNumber+"/"+pn+"/"+formattedDate).once('value', snapshot => {
  if(snapshot.val()==null){
    database.ref("monthly/"+pn+"/"+monthName).transaction((currentValue) => {
      return (currentValue || 0) + parseFloat(hours);})
    database.ref("hours/"+pn).transaction((currentValue) => {
      return (currentValue || 0) + parseFloat(hours);})
      database.ref("items/"+pn).transaction((currentValue) => {
        return (currentValue || 0) + parseFloat(hours);})
      database.ref('weekly/'+weekNumber+"/"+pn+"/"+formattedDate).update({
        lesson:lesson,
        hours:hours,
    
}).then(
    Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      })
)
  } else{
    Toast.fire({
      icon: 'error',
      title: 'Already Submitted!'
    })
  }
})

} else{
  Toast.fire({
    icon: 'warning',
    title: 'Empty Fields'
  })
}

  }

function gotpn(){
  database.ref('hours/'+pn).once('value', snapshot => {
    mineh= snapshot.val()
          })
  updatetable()
  lastx()
  loadmonthly()
}


function updatetable(){

  database.ref('weekly/'+weekNumber+"/"+pn+"/").on('value', snapshot => {
    tabled = snapshot.val();
    var tl = document.getElementById("wpg").rows.length;
    for (let i = 0; i < tl-1; i++) {
      document.getElementById("wpg").deleteRow(-1);
  }
  labels=[]
  mydata=[]
  for (let i = 0; i < Object.keys(tabled).length; i++) {
    const e = Object.keys(tabled)[i];
    var item = tabled[e];
    console.log(item)
    var row2 = document.getElementById("wpg").insertRow(-1);
          var cell1 = row2.insertCell(0);
          var cell2 = row2.insertCell(1);
          var cell3 = row2.insertCell(2);
cell1.innerHTML = "<b>"+item["lesson"]+"</b>"
cell2.innerHTML = e.replace("|","/").replace("|","/");
labels.push(( e.replace("|","/").replace("|","/")))
cell3.innerHTML=item["hours"] + " h"
mydata.push(parseFloat(item["hours"]))

if(i == Object.keys(tabled).length-1){
  const ctx = document.getElementById('chart');
 new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: '# days',
      data: mydata,
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}

  }

 
   })
}


  function youd(){

    database.ref('weekly/'+weekNumber+"/"+pn+"/").once('value', snapshot => {
      if(snapshot.val()==null){
        Toast.fire(
          {
            icon:"warning",
            title:"No Data found"
          }
        )} else{
          tabled = snapshot.val();
  
          labels=[]
          mydata=[]
          for (let i = 0; i < Object.keys(tabled).length; i++) {
            const e = Object.keys(tabled)[i];
            var item = tabled[e];
            console.log(item)
        labels.push(( e.replace("|","/").replace("|","/")))
        mydata.push(parseFloat(item["hours"]))
        const ctx = document.getElementById('chart');
        mychart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: '# days',
              data: mydata,
              borderWidth: 3
            }]
          },
      
        });
        
          }   
        }

  
   
     })
  }

  function otherl(){
    database.ref('weekly/'+weekNumber+"/"+ophone+"/").once('value', snapshot => {
      if(snapshot.val()==null){
Toast.fire(
  {
    icon:"warning",
    title:"No Data found"
  }
)
      } else{
        tabled = snapshot.val();
  
        labels=[]
        mydata=[]
        for (let i = 0; i < Object.keys(tabled).length; i++) {
          const e = Object.keys(tabled)[i];
          var item = tabled[e];
          console.log(item)
      labels.push(( e.replace("|","/").replace("|","/")))
      mydata.push(parseFloat(item["hours"]))
      const ctx = document.getElementById('chart');
      mychart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: '# days',
            data: mydata,
            borderWidth: 3
          }]
        },
        options: {
          scales: {
              y: {
                  suggestedMin: 0.5,
                  suggestedMax: 10
              }
            }}
      });
      
        }
      
      }
    
   
     })
  }

  function logout(){
    firebase.auth().signOut()
  }


  function loadmonthly(){
months = []
datam = []
    database.ref('monthly/'+pn).once('value', snapshot => {
      array = snapshot.val()
      arl = Object.keys(array).length
      console.log(array)
      for (let i = 0; i < Object.keys(array).length; i++) {
        const e = Object.keys(array)[i];
        months.push(e)
        datam.push(array[e])
        if(i==arl-1){
 ctxx = document.getElementById('chartm');

          new Chart(ctxx, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                label: '# days',
                data: datam,
                borderWidth: 3
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }

      }
    })

  }