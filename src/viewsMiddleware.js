const path = require('path');
const validPages = ["homepage","about","trip","index","contact"];
function viewHandler(req,res,next){
    let page = null;
    if (req.params.page) {
        page = req.params.page.toLowerCase();
    }
//    Foolproof index and homepage
if(page === "homepage" || page === "index"){
    page = "index";
}

//    If page isnt found send them to 404 allows for case sensitive options also
   if(!validPages.includes(page)){
     return res.render("404");
   }
//    Needed to implement res.render due to project changes
   try {
    res.render(page);
    console.log(`Page "${page}" rendered successfully.`);
} catch (err) {
    console.error(`Error rendering page: ${page}`);
    return next(err);
}
}
module.exports = viewHandler;

// GET https://failteireland.azure-api.net/opendata-api/v2/attractions HTTP/1.1

// Cache-Control: cache

