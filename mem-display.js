var memsFromStoarge = loadFromStorage("editedMem")
var stickerFromStoarge = loadFromStorage("stickers-memory")
var urlFromStoarge = loadFromStorage("imageUrl")
var strHtml

var strHtml = ""




for (i = 0; i < urlFromStoarge.length; i++) {

    strHtml += `<img class="resize3" onclick="renderPics(${i})"  src=${urlFromStoarge[i]}>`

}

document.querySelector(".pics-container").innerHTML = strHtml





function downloadImg(elLink) {
    // var imgContent = gElCanvas.toDataURL('image/jpeg')
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent

}






function renderPics(i) {

    saveToStorage("selected-pic", memsFromStoarge[i])
    saveToStorage("selected-stickers", stickerFromStoarge[i])

    window.location.href = "index.html"



}


function loadPic() {

    document.querySelector(".main-container-gllary").style.display = "none"
    document.querySelector(".main-container-editor").style.display = "flex"

    gEditedMem.line = []
    gEditedMem.line = loadFromStorage("selected-pic")
    gStickers = []
    gStickers = loadFromStorage("selected-stickers")


    if (gEditedMem.line[0]) imageID = gEditedMem.line[0].imageID
    else imageID = gStickers[0].imageID





    refrashCanvas()
    rendImg()
    setTimeout(randallStickers, 100)
    setTimeout(render, 5)
}

