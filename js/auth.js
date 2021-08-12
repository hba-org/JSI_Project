//Create new room
function uploadImageAsPromise(image, docrefID, roomDB) {
    return new Promise(function (resolve, reject) {
        var storageRef = storage.ref('roomImages/' + `${docrefID}/` + image.name)
        //Upload file
        var uploadTask = storageRef.put(image)

        //upload task visualization
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused')
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running')
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error.message)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    roomDB.doc(docrefID).update({
                        images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
                    })
                })
            }
        )
    })
}

const loadingCircle = document.getElementById('loading-circle')
const createForm = document.querySelector('#create-form')
const roomDB = db.collection('rooms')
loadingCircle.style.display = 'none'
createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const owner = auth.currentUser.email
    const title = createForm['title'].value
    const price = createForm['price'].value
    const location = createForm['specific-location'].value
    const selectedFacilities = M.FormSelect.getInstance(createForm['facilities']).getSelectedValues()
    const selectedDistrict = document.getElementById('district').M_FormSelect.input.value
    const selectedBed = document.getElementById('bed').M_FormSelect.input.value
    const selectedImages = document.getElementById('image-upload').files
    db.collection('rooms').add({
        owner: owner,
        title: title,
        price: price,
        location: location,
        district: selectedDistrict,
        facilities: selectedFacilities,
        bed: selectedBed,
    })
        .then((docref) => {
            console.log(docref.id)

            Array.from(selectedImages).forEach((image) => {
                uploadImageAsPromise(image, docref.id, roomDB)
            })
        })
        .then(() => {
            M.toast({ html: 'Room Created!', classes: 'rounded teal accent-3 white-text' })
            loadingCircle.style.display = 'none'
            const modal = document.getElementById('modal-create')
            M.Modal.getInstance(modal).close()
            createForm.reset()
        })
})
//Old codes, removing for rebuild:
// const loadingCircle = document.getElementById('loading-circle')
// const createForm = document.querySelector('#create-form')
// loadingCircle.style.display = 'none'
// createForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const owner = auth.currentUser.email
//     const title = createForm['title'].value
//     const price = createForm['price'].value
//     const location = createForm['specific-location'].value
//     const selectedFacilities = M.FormSelect.getInstance(createForm['facilities']).getSelectedValues()
//     const selectedDistrict = document.getElementById('district').M_FormSelect.input.value
//     const selectedBed = document.getElementById('bed').M_FormSelect.input.value
//     const selectedImages = document.getElementById('image-upload').files
//     let docRefID = ''
//     db.collection('rooms').add({
//         owner: owner,
//         title: title,
//         price: price,
//         location: location,
//         district: selectedDistrict,
//         facilities: selectedFacilities,
//         bed: selectedBed
//     }).then((docRef) => { // finally we can take the docref ID :D
//         loadingCircle.style.display = 'block'
//         docRefID = docRef.id
//         console.log(docRefID)
//         console.log(selectedImages)//debug
//         let storageRef = storage.ref(`roomImage/${docRef.id}/`)
//         const upload = new Promise(function (resolve, reject) {
//             let imageLinks = []
//             Array.from(selectedImages).forEach((image) => {
//                 let imageRef = storageRef.child(`${image.name}`)
//                 console.log(image.name)//debug
//                 let uploadTask = imageRef.put(image)
//                 uploadTask.on('state_changed',
//                     (snapshot) => {
//                         // Observe state change events such as progress, pause, and resume
//                         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                         console.log('Upload is ' + progress + '% done');
//                         switch (snapshot.state) {
//                             case firebase.storage.TaskState.PAUSED: // or 'paused'
//                                 console.log('Upload is paused');
//                                 break;
//                             case firebase.storage.TaskState.RUNNING: // or 'running'
//                                 console.log('Upload is running');
//                                 break;
//                         }

//                     },
//                     (error) => {
//                         // Handle unsuccessful uploads
//                         console.log(error.message)
//                     },
//                     () => {
//                         // Handle successful uploads on complete
//                         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                             // console.log('File available at', downloadURL);
//                             imageLinks.push(downloadURL)
//                         });
//                     }
//                 );
//             })
//             resolve(imageLinks)
//         })
//         upload.then((imageLinks) => {
//             console.log(imageLinks)
//             return db.collection('rooms').doc(docRefID).update({
//                 images: imageLinks
//             })
//         }).then(() => {
//             M.toast({ html: 'Room Created!', classes: 'rounded teal accent-3 white-text' })
//             loadingCircle.style.display = 'none'
//             const modal = document.getElementById('modal-create')
//             M.Modal.getInstance(modal).close()
//             createForm.reset()
//         })
//     })


// })



//get data
db.collection('rooms').onSnapshot((snapshot) => {
    setupRooms(snapshot.docs)
})


//  Listen for auth changes
auth.onAuthStateChanged((user) => {
    // console.log(user)
    if (user != null) {
        M.toast({ html: 'Signed In!', classes: 'rounded teal accent-3 white-text' })
        console.log(user.email)
        setupUI(user)
    }
    else {
        setupUI()
        M.toast({ html: 'Signed Out!', classes: 'rounded teal accent-3 white-text' })
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