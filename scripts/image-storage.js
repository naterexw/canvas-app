// Initiating image storage array 
let storeImg = [];

$(document).ready(()=>{
  saveImage(canvasReal);
})

let saveImage = canvas => {
  canvas.toBlob(blob => {
    let newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);
    newImg.src = url;
    newImg.onload = () => {
    };
    writeTempImg(newImg);
  });
};

function retriveImage(img) {
  contextReal.clearRect(0, 0, 800, 500);
  console.log(img);
  contextReal.drawImage(img, 0, 0);
}

function writeTempImg(imgElement) {
  storeImg.push(imgElement);
}

// Ctrl + z for reverting drawing 1 step
let map = {};
$(window).on("keydown", (e) => {
  map[e.keyCode] = e.type == "keydown";
  if (map[17] && map[90] && storeImg.length>0) {
    retriveImage(storeImg[storeImg.length-2]);
    storeImg.pop();
    console.log("after changing the image array");
    console.log(storeImg);
    map = {};
    return false;
  }
})

// Click on save button and get the current image from real canvas
$("#save").click(function(ev){
  let saveTp = "jpg";
  $("#save").attr("href",canvasReal.toDataURL(`image/${saveTp}`));
  $("#save").attr("download",`mypainting.${saveTp}`);
});