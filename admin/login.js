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
const firebaseConfig = {
    apiKey: "AIzaSyD6-NjFsmW0GgcyWMcSUSSPZiHLJmvEnuI",
    authDomain: "study-diary-294bc.firebaseapp.com",
    projectId: "study-diary-294bc",
    storageBucket: "study-diary-294bc.appspot.com",
    messagingSenderId: "771492676291",
    appId: "1:771492676291:web:a10fc354ab1b0f69c8d876"
  };
  firebase.initializeApp(firebaseConfig);
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  
  // Function to trigger phone authentication
  function authenticateWithPhoneNumber() {
    var phoneNumber ="+94"+parseInt( $$('pnnum').value) // Replace with actual phone number
    var appVerifier = window.recaptchaVerifier;
  $$("btns").innerText = "Verify"
  $$("btns").style,disabled = true

  setTimeout(() => {
    $$("btns").style,disabled = false
  }, 3000);
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent successfully!");
        $$("otpar").style.display="block"
        $$("recaptcha-container").style.display="none"
  $$("btns").innerText = "Sign in"

      })
      .catch(function (error) {
        console.error("Error while sending OTP: ", error);
        Toast.fire({
            icon: 'success',
            title: error
          })
      });
  }
  
  // Function to verify OTP and sign in the user
  function verifyOTPAndSignIn() {
    var verificationCode = document.getElementById("verificationCode").value;
  
    window.confirmationResult.confirm(verificationCode)
      .then(function (result) {
        Toast.fire({
            icon: 'success',
            title: "User signed in successfully!"
          })
          location.replace("/")
        console.log("User signed in successfully!");
        var user = result.user;
        // Redirect the user to the dashboard or home page
      })
      .catch(function (error) {
        console.error("Error while verifying OTP: ", error);
      });
  }
  

function sendotp(){
    if( $$("btns").innerText=="Sign in"){
        verifyOTPAndSignIn()
    } else{
    authenticateWithPhoneNumber()

    }
}