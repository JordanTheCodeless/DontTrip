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
     return res.sendFile(path.join(__dirname,"../views/404.html"));
   }
// Create file path const
const relativePath = path.join(__dirname, `../views`, `${page}.html`);
// console.log("Requesting page:", page);
// console.log("File path:", relativePath);
// Testing ^
res.sendFile(relativePath, err =>{
    if(err){
        console.log(`There was an error getting ${page} page at this moment`);
    }
    else{
        console.log(`The following page has been accessed ${page}`);
    }
})
}
module.exports = viewHandler;