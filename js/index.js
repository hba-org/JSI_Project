//setting up UI
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const accountInfo = document.querySelectorAll('#account-info')
const setupUI = (user) => {
    if (user) {
        //toggle UI elements
        loggedInLinks.forEach((item) =>{item .style.display = 'block'})
        accountInfo.forEach((accInfo)=>{
            accInfo.innerHTML = user.email
        })
        loggedOutLinks.forEach((item) =>{item .style.display = 'none'})
    }
    else {
        //toggle UI elements
        loggedOutLinks.forEach((item) =>{item .style.display = 'block'})
        accountInfo.forEach((accInfo)=>{
            accInfo.innerHTML = "Account"
        })
        loggedInLinks.forEach((item) =>{item .style.display = 'none'})
    }
}



// setting up rooms
const roomList = document.getElementById('roomList')
const setupRooms = (data) => {
    let html = ''
    data.forEach(doc => {
        const room_info = doc.data()
        console.log(room_info)

        const li = `
        <li>
        <div class="collapsible-header teal accent-1">${room_info.title}</div>
        <div class="collapsible-body white">Owner: ${room_info.owner}</div>
        <div class="collapsible-body white">Location: ${room_info.location}</div>
        <div class="collapsible-body white">Price: ${room_info.price} VND/day</div>
        </li>
        `
        html += li
    });
    roomList.innerHTML = html
}