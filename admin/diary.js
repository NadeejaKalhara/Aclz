		
        
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
        // Initialize Firebase
        dp=''
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
        // Reference to the diary entries in the Firebase Realtime Database
		var diaryRef = firebase.database().ref('diary-entries');

		// Load diary entries from Firebase and display them on the page
		diaryRef.on('value', function(snapshot) {
			var diaryEntries = snapshot.val();
            
	
		});

		// Save a new diary entry to Firebase when the form is submitted


function updated(){
    if(document.getElementById('new-entry').value!=null&&dp!=''&&$$('titlei').value!=''){
        var newEntry = document.getElementById('new-entry').value;
        if (newEntry.trim() === '') {
            return;
        }
        firebase.database().ref('diary-entries/'+$$('titlei').value).update({
            text:newEntry,
            pic:dp
        }).then(
            Toast.fire({
                title:"Saved!",
                icon:"success"
            })
        );
        document.getElementById('new-entry').value = '';
        $$('previ').src ="."
    } else{
Toast.fire({
    title:"Please fill all the fields.",
    icon:"warning"
})
    }
       
        }
	
		
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
    
             } else{
              othern = "Nadee"
              ophone = "+94717723341"
 
             }
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
            
          });


// file uplaod
const fileInput = document.getElementById("myfile")

function fsave() { 
  var file = fileInput.files[0];
  var Type = file.type;
  var Size = file.size/1000000;
  console.log(Type);
  if(Size<8){
if (Type.includes("image")) {

  var filename = file.name;

  console.log (filename.substring(filename.lastIndexOf('.')+1))

    console.log();
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'

    
    // While the file names are the same, the references point to different files

    // Uploading Section 

 

var uploadTask = storageRef.child('diary/evi/'+Math.floor(Math.random() * 10000)+filename.substring(filename.lastIndexOf('.')+1)).put(file);
Swal.fire({
    title: '<strong>File is being uploaded</strong>',
    icon: 'info',
    html:'<div id="myProgress">' + '<center><small class="text-primary fw-semibold"><i class="bx bx-loader-circle"></i> Please be patient!</small></center><br>'+
   ' <div class="w3-green" id="myBar">10%</div>' +'</div>' ,
   showCancelButton: false,
   showCloseButton: false,
   showConfirmButton: false,
   allowOutsideClick: false
  })

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // Progress

document.getElementById("myBar").style.width = progress + "%"
document.getElementById("myBar").innerText = Math.round(progress)+"%";


    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Upload faild! Please try again'
    })
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
   dp = downloadURL
    Swal.fire(
      'File Uploaded',
      filename+' has been successfully uploaded!',
      'success'
      )
      
  
    });
  }
);
   }  else {
    Swal.fire(
'Unsupported File',
'Only image file type is allowed. ',
'error'
)
   }} else {

      Swal.fire(
          'BIG File',
          'Only image files less than 25 MB allowd',
          'error'
          )
   }
  
  
  
  }

  fileInput.onchange = () => {
    if (fileInput.files[0]) {

      fsave();

      $$('previ').src = window.URL.createObjectURL(fileInput.files[0]);

    }
  };
document.getElementsByClassName

  diaryRef.once('value', snapshot => {
   dairydata = snapshot.val();
   for (let i = 0; i < Object.keys(dairydata).length; i++) {
    const e = Object.keys(dairydata)[i];
    const bundle = dairydata[e]
    console.log(bundle)
    clzcd = $$("samplely")
    clone = clzcd.cloneNode(true);
    clone.style.display = 'block'
    clone.getElementsByClassName("umem")[0].innerText=bundle["text"].substring(0,100)+"..."
    clone.getElementsByClassName("upic")[0].src=bundle["pic"]
    clone.getElementsByClassName("util")[0].innerHTML="<b>"+e+"</b>"
 clone.getElementsByClassName("readm")[0].id=e

$$("rowly").appendChild(clone);

    
   }
  })

function befpop(d){
console.log(d)
firebase.database().ref('diary-entries/'+d).once('value', snapshot => {
    mempop(d,snapshot.val()["text"],snapshot.val()["pic"])
})
}
  function mempop(title,text,url){
    Swal.fire({
        title: title,
        text: text,
        imageUrl: url,
        imageAlt: 'love',
      })
  }