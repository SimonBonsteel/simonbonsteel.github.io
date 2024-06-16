var db = {

    "collections": [

        {
            "title": "planes of flying",
            "description": "they be goin so high",
            "cover": 0,
            "youtube": false,
            "contents": [
                
                {
                    "title": "hdksjugfbdxhjkgbld",
                    "description": "the planes be flying",
                    "src": "assets/photos/_1230004.jpg",
                    "youtube": false
                },
                {
                    "title": "hdksjugfbdxhjkgbld",
                    "description": "the planes be flying",
                    "src": "assets/photos/_1370407.jpg",
                    "youtube": "C0cCKmCj8ew"
                }   

            ]
        },
        {
            "title": "william osman if he was a cat",
            "description": "opensauce more like opensus",
            "cover": 0,
            "youtube": "https://www.youtube.com/watch?v=jzdkPfct8N4",
            "contents": [
                {   // this is photo #0         NOTE: this entry is not shown, the website only uses the 'src' for the thumbnail of the video
                    "src": "assets/photos/_1370407.jpg",
                },
            ]
        }

    //  ^ this is where you'll add new collections


    ]


}



/*
       ______  ______  __  ___  ____    __      ___      ______  ______      ____    ____   
      /_  __/ / ____/ /  |/  / / __ \  / /     /   |    /_  __/ / ____/     / __ \  / __ ) 
       / /   / __/   / /|_/ / / /_/ / / /     / /| |     / /   / __/       / / / / / __  |
      / /   / /___  / /  / / / ____/ / /___  / ___ |    / /   / /___      / /_/ / / /_/ /
     /_/   /_____/ /_/  /_/ /_/     /_____/ /_/  |_|   /_/   /_____/     /_____/ /_____/
*/
// this is a TEMPLATE !!!!! im making this template for YOU simon !!!
// im making it so that you can refer to it when adding photos if you forget how it works

var TEMPLATE_DB = {
    
    "collections": [    // this is the list of collections, all collections go inside this (duh)

        {   // this is a basic normal collection
            "title": "planes of flying",            // title obv
            "description": "they be goin so high",  // description obv
            "cover": 0,                             // this defines what image will be used as the cover image of this collection. it's set to 0, so it'll use image #0 from the contents list below.
            "youtube": false,                       // this is if there is a standalone video that doesn't have photos to go with it (ex. a showreel). replace 'false' with a the link to the youtube video surrounded in double quotes (ex. "https://www.youtube.com/watch?v=dQw4w9WgXcQ" )
            "contents": [   // here is the list of photos
                
                {   // this is photo #0
                    "title": "hdksjugfbdxhjkgbld",              // title obv
                    "description": "the planes be flying",      // description obv
                    "src": "assets/photos/_1230004.jpg",    // path to the image file starting with assets/   also if this is going to be a youtube video, you want this path to go to what image you want for the thumbnail (the thumbnail MUST be landscape 3:2 aspect ratio)
                    "youtube": false                            // if you want it to be a youtube video, again, replace 'false' with the video link, surrounded in double quotes.
                },

                {   // this is photo #1   (example of a youtube video)
                    "title": "hdksjugfbdxhjkgbld",
                    "description": "the planes be flying",
                    "src": "assets/photos/_1370407.jpg",                    // the thumbnail should be your photo of the cat
                    "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"    // link to youtube video
                }   

            ]
        },


        {   // this is an example of a standalone video (like what i mentioned above!)
            "title": "richard rollman",
            "description": "rolling",
            "cover": 0,                                                 // for youtube videos, keep this at 0
            "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",   // again the youtube link
            "contents": [

                {   // this is photo #0         NOTE: this entry is not shown, the website only uses the 'src' for the thumbnail of the video
                    "src": "assets/photos/_1370407.jpg",
                },
            ]
        }






    ]



}