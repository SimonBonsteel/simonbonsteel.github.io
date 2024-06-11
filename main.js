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



function close_collection() {
    document.querySelector(".collection-window-wrapper").classList.add("hidden");
}

function close_photo() {
    document.querySelector(".photo-preview").classList.add("hidden");
}

function show_collection(cnum) {
    var collection_elems = document.querySelector(".collection-window .list").children
    
    for (i in collection_elems) {
        if (collection_elems[i].nodeType) {
            if (collection_elems[i].classList.contains("template") == false) {
                collection_elems[i].remove();
            }
        }
    }

    for (i in db["collections"][cnum]["contents"]) {
        var node = document.querySelector(".collection-window .list .card.template").cloneNode(true);
        node.classList.remove("template");
        node.classList.remove("hidden");
        node.querySelector("img").setAttribute("src", `${db["collections"][cnum]["contents"][i]["src"]}`);
        node.setAttribute("onclick", `show_photo(${cnum}, ${i})`);

        document.querySelector(".collection-window .list").appendChild(node);
    }

    document.querySelector(".collection-window h1").innerHTML = `${db["collections"][cnum]["title"]}`;
    document.querySelector(".collection-window h2.desc").innerHTML = `${db["collections"][cnum]["description"]}`;

    document.querySelector(".collection-window-wrapper").classList.remove("hidden");
}

function show_photo(cnum, pnum) {

    document.querySelector(".photo-preview img.preview").setAttribute("src", `${db["collections"][cnum]["contents"][pnum]["src"]}`);
    document.querySelector(".photo-preview h1").innerHTML = `${db["collections"][cnum]["contents"][pnum]["title"]}`;
    document.querySelector(".photo-preview h2").innerHTML = `${db["collections"][cnum]["contents"][pnum]["description"]}`;

    document.querySelector(".photo-preview").classList.remove("hidden");

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

    var node = document.querySelector(".collections-taste .list .card.template").cloneNode(true);
    node.classList.remove("template");
    node.classList.remove("hidden");
    node.querySelector("h2").innerHTML = `${db["collections"][i]["title"]}`;
    node.querySelector("img").setAttribute("src", `${db["collections"][i]["contents"][db["collections"][i]["cover"]]["src"]}`);
    node.setAttribute("onclick", `show_collection(${i})`);
    
    document.querySelector(".collections-taste .list").appendChild(node);

}