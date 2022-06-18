var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var picsNumbers = 24
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

// 

var gEditedMem = {

    line: [{

        imageID: 1,
        sticker: 0,
        txt: 'I sometimes eat Falafel',
        size: 20,
        font: "Impact",
        align: 'left',
        color: 'red',
        locationY: 60,
        locationX: 0
    }
    ]


}


function drawSticker() {


}





var storedMem = [{}]



function renderAllPics() {
    var strHtml = ""
    for (var i = 1; i <= picsNumbers; i++) {
        strHtml += `<img class="resize3" src="img/${i}.jpg" onclick="selectedIMG(${i})" alt="">`
    }
    document.querySelector(".main-container-gllary").innerHTML = strHtml

}
