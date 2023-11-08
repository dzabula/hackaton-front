// var customEvent = new Event('DOMContentLoaded', {
//   bubbles: true,
//   cancelable: true
// });
//   // Emitovanje custom događaja
//   document.dispatchEvent(customEvent);

$("#mobile-nav-menuu").on('click', '#hamburger-meni', function() {
    
    $('#mobile-nav-menuu').addClass('expanded');
});

$(document).on('click', '#mobile-nav-overlay-my', function() {
    
    document.getElementsByTagName("body")[0].classList.remove('locked');
});

//window.addEventListener("DOMContentLoaded", loadNavForMobile);

function loadNavForMobile(){

        setTimeout(()=>{
        var html = document.getElementById("computer-nav__container").innerHTML;
        document.getElementById("mobile-nav__container").innerHTML = html;
        var container = document.getElementById("mobile-nav__container");
        var liElements = container.getElementsByTagName("li");
        
        for (var i = 0; i < liElements.length; i++) {
          var li = liElements[i];
          li.classList.add("dropdown");
        }
            var style = document.createElement("style");
            var cssCode = `
            .dropdown{
                list-style-type: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .dropdown > a {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            line-height: 30px;
            color: #ffffff;
            font-size: 14px;
            font-family: var(--alipes-font);
            font-weight: 500;
            height: 46px;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-transition: 500ms;
            transition: 500ms;
            }
            `;
            style.innerHTML = cssCode;
            document.head.appendChild(style);
            // document.head.innerHTML = document.head.innerHTML + cssCode;
    },5000)
    setTimeout(()=>{
        var html = document.getElementById("computer-nav__container").innerHTML;
        document.getElementById("mobile-nav__container").innerHTML = html;
        var container = document.getElementById("mobile-nav__container");
        var liElements = container.getElementsByTagName("li");
        
        for (var i = 0; i < liElements.length; i++) {
          var li = liElements[i];
          li.classList.add("dropdown");
        }
    },4000)
    setTimeout(()=>{
        var html = document.getElementById("computer-nav__container").innerHTML;
        document.getElementById("mobile-nav__container").innerHTML = html;
        var container = document.getElementById("mobile-nav__container");
        var liElements = container.getElementsByTagName("li");
        
        for (var i = 0; i < liElements.length; i++) {
          var li = liElements[i];
          li.classList.add("dropdown");

        }

    },3000)
    setTimeout(()=>{
        var html = document.getElementById("computer-nav__container").innerHTML;
        document.getElementById("mobile-nav__container").innerHTML = html;
        var container = document.getElementById("mobile-nav__container");
        var liElements = container.getElementsByTagName("li");
        
        for (var i = 0; i < liElements.length; i++) {
          var li = liElements[i];
          li.classList.add("dropdown");
        }
        var style = document.createElement("style");
        var cssCode = `
        .dropdown{
            list-style-type: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .dropdown > a {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        line-height: 30px;
        color: #ffffff;
        font-size: 14px;
        font-family: var(--alipes-font);
        font-weight: 500;
        height: 46px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transition: 500ms;
        transition: 500ms;
        }
        `;
        style.innerHTML = cssCode;
        document.head.appendChild(style);
    },2000)
    setTimeout(()=>{
        var html = document.getElementById("computer-nav__container").innerHTML;

        document.getElementById("mobile-nav__container").innerHTML = html;
        var container = document.getElementById("mobile-nav__container");
        var liElements = container.getElementsByTagName("li");
        
        for (var i = 0; i < liElements.length; i++) {
          var li = liElements[i];
          li.classList.add("dropdown");
        }
    },1000)
   
}


/*Kod preuzet iz fajla Pzd9jlG4P8zR */

// window.onload = ()=>{
//   addAdidtionalCodeForNavMobile();

// }

window.onload = () => {
  addAdidtionalCodeForNavMobile();
  addArrowUpPage();
  addAnimationForMap();

  $(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });

};

function addAnimationForMap(){
  setTimeout(() => {
    var image = $('img.leaflet-marker-icon.animated-marker.leaflet-zoom-animated.leaflet-interactive');
    var interval = setInterval(function () {
      image.fadeOut(1000, function () {
        image.fadeIn(800);
      });
      image.css({
        'filter': 'none'
      });
    }, 1000);

  },1000);
}

function addArrowUpPage(){
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate({
          scrollTop: $(target).offset().top
        },
        150
      );

      return false;
    });
  }
}

function addAdidtionalCodeForNavMobile(){
   /* if ($(".main-menu__list").length) {
      // dynamic current class
      //let mainNavUL = $(".main-menu__list");
      //dynamicCurrentMenuClass(mainNavUL);
    }
    if ($(".service-details__sidebar-service-list").length) {
      // dynamic current class
     // let mainNavUL = $(".service-details__sidebar-service-list");
     // dynamicCurrentMenuClass(mainNavUL);
    }
  
    if ($(".main-menu__list").length && $(".mobile-nav__container").length) {
      let navContent = document.querySelector(".main-menu__list").outerHTML;
      let mobileNavContainer = document.querySelector(".mobile-nav__container");
      mobileNavContainer.innerHTML = navContent;
    }
    if ($(".sticky-header__content").length) {
      let navContent = document.querySelector(".main-menu").innerHTML;
      let mobileNavContainer = document.querySelector(".sticky-header__content");
      mobileNavContainer.innerHTML = navContent;
    }*/
  
    if ($(".mobile-nav__container .main-menu__list").length) {
      let dropdownAnchor = $(
        ".mobile-nav__container .main-menu__list .dropdown > a"
      );
      dropdownAnchor.each(function () {
        let self = $(this);
        let toggleBtn = document.createElement("BUTTON");
        toggleBtn.setAttribute("aria-label", "dropdown toggler");
        toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
        self.append(function () {
          return toggleBtn;
        });
        self.find("button").on("click", function (e) {
          e.preventDefault();
          let self = $(this);
          self.toggleClass("expanded");
          self.parent().toggleClass("expanded");
          self.parent().parent().children("ul").slideToggle();
        });
      });
    }
    
    $(".single-link-mobile").on("click",function(e){
      $(".mobile-nav__wrapper").removeClass("expanded");
        $("body").removeClass("locked");
    })

    if ($(".mobile-nav__toggler").length) {
      $(".mobile-nav__toggler").on("click", function (e) {
        e.preventDefault();
        $(".mobile-nav__wrapper").toggleClass("expanded");
        $("body").toggleClass("locked");
      });
    }


    //addEventForLinks();
  }


function addEventForLinks(){
  $(".main-menu__list a").on("click", function (e) {
    e.preventDefault(); // Zaustavi defaultnu redirekciju
    const routeLink = $(this).attr('ng-reflect-router-link');
    if (routeLink) {
      window.location.href = routeLink; // Ručno izvršite Angular ruting
    }
  });
}
  
function dynamicCurrentMenuClass(selector) {
  let FileName = window.location.href.split("/").reverse()[0];

  selector.find("li").each(function () {
    let anchor = $(this).find("a");
    if ($(anchor).attr("href") == FileName) {
      $(this).addClass("current");
    }
  });
  // if any li has .current elmnt add class
  selector.children("li").each(function () {
    if ($(this).find(".current").length) {
      $(this).addClass("current");
    }
  });
  // if no file name return
  if ("" == FileName) {
    selector.find("li").eq(0).addClass("current");
  }
}
