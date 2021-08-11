//setting up UI
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const accountInfo = document.querySelectorAll('#account-info')
const setupUI = (user) => {
    if (user) {
        //toggle UI elements
        loggedInLinks.forEach((item) => { item.style.display = 'block' })
        accountInfo.forEach((accInfo) => {
            accInfo.innerHTML = user.email
        })
        loggedOutLinks.forEach((item) => { item.style.display = 'none' })
    }
    else {
        //toggle UI elements
        loggedOutLinks.forEach((item) => { item.style.display = 'block' })
        accountInfo.forEach((accInfo) => {
            accInfo.innerHTML = "Account"
        })
        loggedInLinks.forEach((item) => { item.style.display = 'none' })
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


//All District of Hanoi
let districts = {
    1: "Quận Ba Đình",
    2: "Quận Hoàn Kiếm",
    3: "Quận Tây Hồ",
    4: "Quận Long Biên",
    5: "Quận Cầu Giấy",
    6: "Quận Đống Đa",
    7: "Quận Hai Bà Trưng",
    8: "Quận Hoàng Mai",
    9: "Quận Thanh Xuân",
    10: "Huyện Sóc Sơn",
    11: "Huyện Đông Anh",
    12: "Huyện Gia Lâm",
    13: "Quận Nam Từ Liêm",
    14: "Huyện Thanh Trì",
    15: "Quận Bắc Từ Liêm",
    16: "Huyện Mê Linh",
    17: "Quận Hà Đông",
    18: "Thị xã Sơn Tây",
    19: "Huyện Ba Vì",
    20: "Huyện Phúc Thọ",
    21: "Huyện Đan Phượng",
    22: "Huyện Hoài Đức",
    23: "Huyện Quốc Oai",
    24: "Huyện Thạch Thất",
    25: "Huyện Chương Mỹ",
    26: "Huyện Thanh Oai",
    27: "Huyện Thường Tín",
    28: "Huyện Phú Xuyên",
    29: "Huyện Ứng Hòa",
    30: "Huyện Mỹ Đức"
}
let facilities = {
    1: "Air-conditioning",
    2: "Bathroom",
    3: "Shower",
    4: "Bathtub",
    5: "Checkroom",
    6: "Dry cleaner",
    7: "Wi-fi",
    8: "Electrical services",
    9: "Microwave",
    10: "Fridge",
    11: "Stove",
    12: "Coffee Maker"
}
