var gCanvas;
var gCtx;
var gCurrShape = 'shape1';
var color;
var gStartPosx
var gStartPosy
var gShapeSize = 30;
var storedPicsUrl
var imageID = 1;
var lastIdx
var filterFlag = false

if (!lastIdx) lastIdx = 0
else lastIdx = gEditedMem.line.length - 1

color = document.querySelector(".shapeColor").value


gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');





function init() {
    renderAllPics()
    if (loadFromStorage("selected-pic")) loadPic()


}

var storedMem = [];
// if (!loadFromStorage("mem")) storedMem = []
// else storedMem = loadFromStorage("mem")

var imageImSave = []



var gStringData = []

function saveMeme(stored, loaded, storedStick, loadedStick) {

    if (!loadFromStorage("imageUrl")) storedPicsUrl = []
    else storedPicsUrl = loadFromStorage("imageUrl")

    if (!loadFromStorage("editedMem")) storedMem = []
    else storedMem = loadFromStorage("editedMem")

    if (!loadFromStorage("stickers-memory")) gStringData = []
    else gStringData = loadFromStorage("stickers-memory")




    stored = gEditedMem.line
    saveToStorage("mem", stored)

    loaded = loadFromStorage("mem")
    storedMem.push(loaded)



    saveToStorage("editedMem", storedMem)
    var imageUrl = gCanvas.toDataURL("image/jpg");

    storedPicsUrl.push(imageUrl)
    saveToStorage("imageUrl", storedPicsUrl)


    storedStick = gStickers
    saveToStorage("stickers", storedStick)

    loadedStick = loadFromStorage("stickers")
    gStringData.push(loadedStick)

    saveToStorage("stickers-memory", gStringData)


}



function onSetImg(ev) {

    imageID = ev
    clearCanvas()
    rendImg()

}

function clearCanvas() {

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gEditedMem.line.splice(0, gEditedMem.line.length)
    rendImg();
}


function switchLines() {


    if (!stickerFlag) {

        if (lastIdx < gEditedMem.line.length - 1) {
            lastIdx = Math.abs(lastIdx + 1)

        }
        else lastIdx = 0
    }

    else {
        if (randerIdx < gStickers.length - 1) {
            randerIdx = Math.abs(randerIdx + 1)

        }
        else randerIdx = 0
    }
}


function moveDown() {

    if (!stickerFlag) gEditedMem.line[lastIdx].locationY += 50
    else gStickers[randerIdx].stickerY += 50


    refrashCanvas()
    rendImg()
    setTimeout(randallStickers, 100)
    setTimeout(render, 5)
}

function moveUp() {

    if (!stickerFlag) gEditedMem.line[lastIdx].locationY -= 50
    else gStickers[randerIdx].stickerY -= 50


    refrashCanvas()
    rendImg()
    setTimeout(rendSticker, 10)
    setTimeout(render, 5)
}

function moveLeft() {



    if (!stickerFlag) gEditedMem.line[lastIdx].locationX -= 50
    else gStickers[randerIdx].stickerX -= 50

    refrashCanvas()
    rendImg()
    setTimeout(rendSticker, 10)
    setTimeout(render, 5)
}


function moveRight() {


    if (!stickerFlag) gEditedMem.line[lastIdx].locationX += 50
    else gStickers[randerIdx].stickerX += 50



    refrashCanvas()
    rendImg()
    setTimeout(rendSticker, 10)
    setTimeout(render, 5)
}


function drawEmoji(ev) {
    if (gEditedMem.line.length > 0) lastIdx++
    stickerFlag = false
    coloredBtn()
    text = ev

    var obj = {
        imageID: imageID,
        txt: text,
        size: 100,
        align: 'left',
        color: 'red',
        locationY: 150,
        locationX: 150,
    }


    gEditedMem.line.push(obj)
    refrashCanvas()
    rendImg()
    setTimeout(render, 500)
}

function fontChange() {
    if (stickerFlag) alert("Font change is not suppurt with Stickers")
    else {
        gEditedMem.line[lastIdx].font = "Arial"
        refrashCanvas()
        rendImg()
        rendSticker()
        setTimeout(render, 5)
    }
}

function fontIncarseSize() {





    if (!stickerFlag) gEditedMem.line[lastIdx].size += 10
    else gStickers[randerIdx].size += 10


    refrashCanvas()
    rendImg()
    rendSticker()
    setTimeout(render, 5)
}

function fontDecraseSize() {

    if (!stickerFlag) gEditedMem.line[lastIdx].size -= 10
    else gStickers[randerIdx].size -= 10

    refrashCanvas()
    rendImg()
    rendSticker()
    setTimeout(render, 5)
}

function changeColor(value) {

    gEditedMem.line[lastIdx].color = value
    refrashCanvas()
    rendImg()
    rendSticker()
    setTimeout(render, 5)
}

function remove() {



    if (!stickerFlag) gEditedMem.line.splice(lastIdx, 1);
    else {
        gStickers.splice(randerIdx, 1);
        if (randerIdx > 0) randerIdx--
    }





    refrashCanvas()
    rendImg()
    rendSticker()
    setTimeout(render, 5)

}

function onSetSettings(ev) {
    ev.preventDefault()

    stickerFlag = false
    coloredBtn()
    // if (gEditedMem.line.sticker > 0) lastIdx++
    if (gEditedMem.line.length > 0) lastIdx++

    text = document.querySelector('[name=text]').value



    var obj = {
        imageID: imageID,
        txt: text,
        size: 100,
        font: "Impact",
        align: 'left',
        color: 'red',
        locationY: 60,
        locationX: 0
    }


    gEditedMem.line.push(obj)





    //render
    // refrashCanvas()
    // rendImg()
    setTimeout(render, 500)
    document.querySelector("input").value = ""

}

function rendImg() {
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize;
    image.src = `img/${imageID}.jpg`;

}

function drawImageActualSize() {

    gCanvas.width = this.naturalWidth;
    gCanvas.height = this.naturalHeight;
    gCtx.drawImage(this, 0, 0);

}

function render() {




    for (i = 0; i < gEditedMem.line.length; i++) {

        var txt = gEditedMem.line[i].txt
        var locationY = gEditedMem.line[i].locationY
        var locationX = gEditedMem.line[i].locationX
        var fontSize = gEditedMem.line[i].size
        var memColor = gEditedMem.line[i].color
        var memFont = gEditedMem.line[i].font

        addLine(locationY, locationX, txt, fontSize, memFont, memColor)



    }

}

function addLine(y, x, txt, fontSize, font, memColor) {




    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = memColor;

    gCtx.font = `${fontSize}px ${font}`

    var posX = x
    var posy = y

    gCtx.fillText(txt, posX, posy);
    gCtx.strokeText(txt, posX, posy);
    // drawRect(y, color)

}

function drawRect(y, color) {
    gCtx.beginPath();
    gCtx.rect(0, y, gCanvas.width, -60);
    gCtx.strokeStyle = color;
    gCtx.stroke();
    gCtx.save()
}

function refrashCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gShapeSize = 30;

}

function draw(ev) {

    var x = ev.offsetX
    var y = ev.offsetY


    drawRec(150, 50)
}

function renderImg(img) {
    //Draw the img on the canvas

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function selectedIMG(i) {

    imageID = i
    clearCanvas()
    rendImg()

    document.querySelector(".main-container-gllary").style.display = "none"
    document.querySelector(".main-container-editor").style.display = "flex"

}

function goToGalleryPage() {
    window.location.href = "index.html"
    document.querySelector(".main-container-gllary").style.display = "flex"
    document.querySelector(".main-container-editor").style.display = "none"

    saveToStorage("selected-pic", "")


}

function aplayColorBtn() {
    if (stickerFlag) alert("Color is not suppurt with Stickers")
    else document.querySelector('.color-input').click()
}



function filterPic() {

    if (!filterFlag) document.querySelector("canvas").style.filter = "grayscale(100%)"
    else document.querySelector("canvas").style.filter = "grayscale(0%)"
    filterFlag = !filterFlag

}














function setPokemons() {
    document.querySelector(".pokemons").style.display = "block"
    document.querySelector(".emojis").style.display = "none"
}

function setEmogis() {
    console.log("s")
    document.querySelector(".pokemons").style.display = "none"
    document.querySelector(".emojis").style.display = "block"
}




















function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");// Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //Create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}