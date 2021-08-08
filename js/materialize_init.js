//  set up Materialize components
//Slider
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems);
});
//Carousel
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, {
        numVisible: 10,
        dist: 0,
    });
});
//Parallax
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
});

//Sidebar       
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav')
    var instances = M.Sidenav.init(elems)
})
//Modal
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal')
    M.Modal.init(modals)

    var items = document.querySelectorAll('.collapsible')
    M.Collapsible.init(items)
});
//Collapsible
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});