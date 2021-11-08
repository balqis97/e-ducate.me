
  // web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDprUGi52hEhQEJvYreF4CSL5L-hzOLZ0w",
    authDomain: "e-ducate-me-4b9c9.firebaseapp.com",
    databaseURL: "https://e-ducate-me-4b9c9-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "e-ducate-me-4b9c9",
    storageBucket: "e-ducate-me-4b9c9.appspot.com",
    messagingSenderId: "470148779696",
    appId: "1:470148779696:web:9a6852b1df26b858d8b575",
    measurementId: "G-SNZ6VHYB74"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth =  firebase.auth()
  const database = firebase.database()

  //register button fuction
  function register () {
    f_name = document.getElementById("f_name").value
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    subj = document.getElementById("subj").value
    grade = document.getElementById("grade").value
    edu = document.getElementById("edu").value
    PhoneNo = document.getElementById("PhoneNo").value
    
    
     // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(f_name) == false || validate_field(PhoneNo) == false || validate_field(grade) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }


    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){

      var user = auth.currentUser

      var database_ref = database.ref()
     

      var user_data ={
        f_name : f_name,
        email : email,
        password : password,
        subj : subj,
        grade : grade,
        edu : edu,
        PhoneNo : PhoneNo,
        last_login : Date.now()
      }

      database_ref.child('tutors/' + user.uid).set(user_data)
    

      alert('User Created!! Welcome '+ f_name)

    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })

    const file = document.getElementById("file").files[0]
    const storageRef = firebase.storage().ref()
    const final = storageRef.child(`resume/${file}`)
    const task = final.put(file)

    task.on('state_changed', 
            function progress(progress){
              console.log(progress.bytesTransferred / progress.totalBytes *100)
            },
            function error(err){
              console.log('There was An Err ' + err)
            }
            
          )
  }


  function login(){
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    auth.signInWithEmailAndPassword(email, password)
  .then(function() {

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  }


  // Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

