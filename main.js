var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var current_collection = 0;
var current_photo = 0;
var vertical = false;

// mobile css styling (yes mobile support!! fancy, innit??)

navigator.sayswho= (function(){
    var ua= navigator.userAgent;
    var tem; 
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

console.log(navigator.sayswho); // outputs: `Chrome 62`

function isMobileTablet(){
    var check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
            check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

var mobile = isMobileTablet();

var vertical_interval = setInterval(() => {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var changed = false;

    if (windowWidth < windowHeight && vertical == false) {
        changed = true;
        vertical = true;
    } else if (windowWidth > windowHeight && vertical == true) {
        changed = true;
        vertical = false;
    }

    if (changed == true) {
        if (vertical == true) {
            document.querySelector("body").classList.add("vertical");
        } else {
            document.querySelector("body").classList.remove("vertical");
        }
        
    }

    
}, 250);

if (mobile == true) {
    // MOBILE!!!
    var node = document.createElement("link");
    node.classList.add("mobile");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("href", `mobile.css`);
    document.head.appendChild(node);
}



// the other funny
var tag = document.createElement('script');
tag.id = 'yt-script';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



function close_collection() {
    document.querySelector(".collection-window-wrapper").classList.add("hidden");
    disable_scrolling(false);
    hide_main(false);
}

function close_photo() {
    document.querySelector("iframe.preview").setAttribute("src", "");
    document.querySelector(".photo-preview").classList.add("hidden");
    disable_scrolling(false);
    hide_main(false);
}

function show_collection(cnum) {
    var collection_elems = document.querySelectorAll(".collection-window .list .template");
    var collection_templates = [];

    disable_scrolling(true, 1);
    hide_main(true);

    for (i in collection_elems) {
        if (collection_elems[i].nodeType) {
            console.debug(collection_elems[i]);
            collection_templates.push(collection_elems[i].cloneNode(true));
        }
    }
    
    document.querySelector(".collection-window .list").innerHTML = "";

    for (i in collection_templates) {
        document.querySelector(".collection-window .list").appendChild(collection_templates[i]);
    }

    for (i in db["collections"][cnum]["contents"]) {
        if (db["collections"][cnum]["contents"][i]["youtube"] == false) {
            var node = document.querySelector(".collection-window .list .card.image.template").cloneNode(true);
            node.classList.remove("template");
            node.classList.remove("hidden");
            node.querySelector("img").setAttribute("src", `${db["collections"][cnum]["contents"][i]["src"]}`);
            node.setAttribute("onclick", `show_photo(${cnum}, ${i})`);
    
            document.querySelector(".collection-window .list").appendChild(node);
        } else {
            var node = document.querySelector(".collection-window .list .card.video.template").cloneNode(true);
            node.classList.remove("template");
            node.classList.remove("hidden");
            node.querySelector(".img-wrapper").style = `background-image: url("${db["collections"][cnum]["contents"][i]["src"]}");`;
            node.setAttribute("onclick", `show_photo(${cnum}, ${i})`);

            document.querySelector(".collection-window .list").appendChild(node);
        }

        
    }

    document.querySelector(".collection-window h1").innerHTML = `${db["collections"][cnum]["title"]}`;
    document.querySelector(".collection-window h2.desc").innerHTML = `${db["collections"][cnum]["description"]}`;

    document.querySelector(".collection-window-wrapper").classList.remove("hidden");
}

function disable_scrolling(disable, level=0) {
    var wow = [
        [
            ".collection-window .list",
            ".collections-taste .list",
            "main"
        ],
        [
            ".collections-taste .list",
            "main"
        ]
    ];
    for (i in wow[level]) {
        if (disable == true) {
            document.querySelector(wow[level][i]).classList.add("disable-scrolling");
        } else {
            document.querySelector(wow[level][i]).classList.remove("disable-scrolling");
        }
        
    }
}

function hide_main(hide, level=0) {
    var wow = [
        [
            ".bio",
            ".sneakpeek",
            ".collections-taste",
            ".big-background",
            "footer"
        ]
        
    ];
    for (i in wow[level]) {
        if (hide == true) {
            document.querySelector(wow[level][i]).classList.add("hidden");
        } else {
            document.querySelector(wow[level][i]).classList.remove("hidden");
        }
    }
}

function show_photo(cnum, pnum) {

    var preview_json = db["collections"][cnum]["contents"][pnum]

    if (pnum === false) {
        preview_json = db["collections"][cnum];
    }

    disable_scrolling(true);
    hide_main(true);

    console.log(preview_json)

    if (preview_json["youtube"] == false) {
        document.querySelector(".photo-preview img.preview").setAttribute("src", `${preview_json["src"]}`);
        document.querySelector(".photo-preview h1").innerHTML = `${preview_json["title"]}`;
        document.querySelector(".photo-preview h2").innerHTML = `${preview_json["description"]}`;
    
        document.querySelector("iframe.preview").style.display = "none";
        document.querySelector("img.preview").style.display = "";

        document.querySelector(".photo-preview").classList.remove("hidden");
    } else {

        var youtube_link = preview_json["youtube"];

        if (youtube_link.includes("youtu.be")) {
            // https://youtu.be/dQw4w9WgXcQ?si=MxgsZK3iRidtbKww

            var url_tm = new URL(youtube_link);
            youtube_link = url_tm.pathname.replace("/", "");
        } else if (youtube_link.includes("/watch")) {
            // https://www.youtube.com/watch?v=dQw4w9WgXcQ

            var url_tm = new URL(youtube_link);
            var params = new URLSearchParams(url_tm.search);
            youtube_link = params.get("v");
        }

        console.log(youtube_link);

        // https://www.youtube-nocookie.com/embed/${config["bg video"]}?autoplay=1&loop=1&rel=0&enablejsapi=1
        var iframe_node = document.querySelector("iframe.preview");
        iframe_node.setAttribute("src", `https://www.youtube-nocookie.com/embed/${youtube_link}?autoplay=1&loop=1&rel=0&enablejsapi=1`);
        iframe_node.setAttribute("frameborder", "0");

        document.querySelector(".photo-preview h1").innerHTML = `${preview_json["title"]}`;
        document.querySelector(".photo-preview h2").innerHTML = `${preview_json["description"]}`;

        document.querySelector("iframe.preview").style.display = "";
        document.querySelector("img.preview").style.display = "none";

        document.querySelector(".photo-preview").classList.remove("hidden");
        
        // var requestFullScreen = iframe_node.requestFullScreen || iframe_node.mozRequestFullScreen || iframe_node.webkitRequestFullScreen;
        // if (requestFullScreen) {
        //     requestFullScreen.bind(iframe_node)();
        // }
    }
    

}


document.addEventListener("keyup", (event) => {
    var keyid = event.which;

    if (keyid == 27) { // esc
        
        if (document.querySelector(".photo-preview").classList.contains("hidden") == false) {
            close_photo();
        } else if (document.querySelector(".collection-window-wrapper").classList.contains("hidden") == false) {
            close_collection();
        }
        
    }

});


for (i in db["collections"]) {

    if (db["collections"][i]["youtube"] == false) {
        var node = document.querySelector(".collections-taste .list .card.image.template").cloneNode(true);
        node.classList.remove("template");
        node.classList.remove("hidden");
        node.querySelector("h2").innerHTML = `${db["collections"][i]["title"]}`;
        node.querySelector("img").setAttribute("src", `${db["collections"][i]["contents"][db["collections"][i]["cover"]]["src"]}`);
        node.setAttribute("onclick", `show_collection(${i})`);
        
        document.querySelector(".collections-taste .list").appendChild(node);
    } else {
        var node = document.querySelector(".collections-taste .list .card.video.template").cloneNode(true);
        node.classList.remove("template");
        node.classList.remove("hidden");
        node.querySelector("h2").innerHTML = `${db["collections"][i]["title"]}`;
        node.querySelector(".img-wrapper").style = `background-image: url("${db["collections"][i]["contents"][db["collections"][i]["cover"]]["src"]}");`;
        node.setAttribute("onclick", `show_photo(${i}, false)`);
        
        document.querySelector(".collections-taste .list").appendChild(node);
    }
    

}




function update_scrollbar() {
    var bio_rects = document.querySelector(".bio").getClientRects()[0];
    
    if (bio_rects.y > 0) {
        document.querySelector(".sc-bio").style.top = `${bio_rects.y}px`;    
    } else {
        document.querySelector(".sc-bio").style.top = `0px`;    
    }
    
}

update_scrollbar()

document.addEventListener('resize', () => {
    update_scrollbar();
})

document.querySelector("main").addEventListener('scroll', () => {
    update_scrollbar();
})