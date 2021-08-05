//  Sign Up
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //  get user info
    const email = signupForm['signup-email']
    const password = signupForm['signup-password']
    const passwordValidation = document.getElementById('password-validation')
    const firstName = signupForm['signup-first-name']
    const lastName = signupForm['signup-last-name']

    if (password.value.length < 6) {
        passwordValidation.innerHTML = "⚠ Password must have at least 6 characters"
    }
    else {
        passwordValidation.innerHTML = ""
        //  create the user (it's going to take some time to finish)
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                let user = userCredential.user
                let email = user.email
                let userFirstName = firstName.value
                let userLastName = lastName.value
                console.log(email)
                console.log(userFirstName, userLastName)

                const modal = document.getElementById('modal-signup')
                M.Modal.getInstance(modal).close()
                signupForm.reset()

            })
            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
                passwordValidation.innerHTML = "An error has occurred, please try again later"
            })
    }
})


//  Log out
const logout = document.getElementById('logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut().then(()=>{
        console.log("User signed out")
    })
    .catch((error) =>{
        console.log(error.code)
        console.log(error.message)
    })
})

//  Log in
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm['login-email']
    const password = loginForm['login-password']
    const loginProblem = document.getElementById('login-problem')

    auth.signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        //setupUI

        //close modal and reset form
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
    })
    .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        loginProblem.innerHTML = "Wrong password or email maybe?"
        // ..
        console.log(errorCode)
        console.log(errorMessage)
    });
})