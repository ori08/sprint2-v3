


var gStickers = []
var stickerIdx = 0
var randerIdx = 0
var stickerFlag = false



function addSticker(v) {
    if (gStickers.length > 0) randerIdx++


    stickerFlag = true
    coloredBtn()

    var obj = {
        imageID: imageID,
        Id: v,
        stickerX: 150,
        stickerY: 150,
        size: 100
    }
    gStickers.push(obj)
    randallStickers()
}



function randallStickers() {
    rendSticker()
}


function rendSticker() {
    gStickers.forEach((mem) => {
        var image = new Image(60, 45);
        image.src = `stickers/${mem.Id}.png`;
        image.onload = function () {
            gCtx.drawImage(image, mem.stickerX, mem.stickerY, mem.size, mem.size);
        }
    })

}




function switchMode() {

    stickerFlag = !stickerFlag

    if (!stickerFlag) document.querySelector(".switch").src = "icons-pics/off.png"
    else document.querySelector(".switch").src = "icons-pics/on.png"

    coloredBtn()
}


function coloredBtn() {

    if (stickerFlag) {
        var elAroow = document.querySelectorAll(".arrow")
        elAroow.forEach((el) => {
            el.style.backgroundColor = "#ff7f00"
        })
    }
    else {
        var elAroow = document.querySelectorAll(".arrow")
        elAroow.forEach((el) => {
            el.style.backgroundColor = "white"
        })
    }

}



