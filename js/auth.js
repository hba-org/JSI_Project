//Create new room
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const owner = auth.currentUser.email
    const title = createForm['title']
    const price = createForm['price']
    const location = createForm['location']
    db.collection('rooms').add({
        owner: owner,
        title: title.value,
        price: price.value,
        location: location.value,
    }).then(() => {
        const modal = document.getElementById('modal-create')
        M.Modal.getInstance(modal).close()
        createForm.reset()
    })
})



//get data
db.collection('rooms').onSnapshot((snapshot) => {
    setupRooms(snapshot.docs)
})


//  Listen for auth changes
auth.onAuthStateChanged((user) => {
    // console.log(user)
    if (user != null) {
        console.log('user logged in')
        console.log(user.email)
        setupUI(user)
    }
    else {
        setupUI()
        console.log('user logged out')
    }
})

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
        passwordValidation.innerHTML = "⚠ Password should be at least 6 characters"
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
                return db.collection('users').doc(user.uid).set({
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: email
                })
            })
            .then(() => {
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
const logout = document.querySelectorAll('#logout')
logout.forEach(logoutButton => {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault()
        auth.signOut().then(() => {

        })
            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
            })
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

            //close modal and reset form
            const modal = document.querySelector('#modal-login')
            M.Modal.getInstance(modal).close()
            loginForm.reset()
        })
        .catch((error) => {
            let errorCode = error.code
            let errorMessage = error.message
            loginProblem.innerHTML = "The password is invalid or the user does not have a password."
            //..
            console.log(errorCode)
            console.log(errorMessage)
        });
})
console.log(districts)