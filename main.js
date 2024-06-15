var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var current_collection = 0;
var current_photo = 0;

// mobile css styling (yes mobile support!! fancy, innit??)
if (windowWidth < windowHeight) {
    // MOBILE!!!
    var node = document.createElement("link");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("href", `mobile.css`);
    document.head.appendChild(node);
    mobile = true;
}



// the other funny
var tag = document.createElement('script');
tag.id = 'yt-script';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



function close_collection() {
    document.querySelector(".collection-window-wrapper").classList.add("hidden");
}

function close_photo() {
    document.querySelector("iframe.preview").setAttribute("src", "");
    document.querySelector(".photo-preview").classList.add("hidden");
}

function show_collection(cnum) {
    var collection_elems = document.querySelectorAll(".collection-window .list .template");
    var collection_templates = [];

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

function show_photo(cnum, pnum) {

    var preview_json = db["collections"][cnum]["contents"][pnum]

    if (pnum == false) {
        preview_json = db["collections"][cnum];
    }

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