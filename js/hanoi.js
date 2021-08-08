fetch('https://provinces.open-api.vn/api/d/')
    .then(response => response.json())
    .then(data => data.forEach(element => {
        if (element.province_code == 1) { console.log(element.name) }
    }));
