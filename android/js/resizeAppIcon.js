var originalCanvas = document.getElementById("imageCanvas");
var originalCanvasCtx = originalCanvas.getContext('2d');
var tempCanvas = document.getElementById("tempCanvas");
var tempCanvasCtx = tempCanvas.getContext('2d');
var imageOriginal = document.getElementById("imageOriginal");
var fileName = null;


$( document ).ready(function() {

    var fileUpload = document.getElementById('fileUpload');
    fileUpload.addEventListener('change', fileUploadClick, false);

    $( "#btnResize" ).on( "click", function() {

        if(isCanvasBlank(originalCanvas)){

            alert('Please upload an image.');
            return;
        }
        
        var mdpiWidth = $( "#mdpiWidth" ).val();
        var mdpiHeight = $( "#mdpiHeight" ).val();

        var hdpiWidth = $( "#hdpiWidth" ).val();
        var hdpiHeight = $( "#hdpiHeight" ).val();

        var xhdpiWidth = $( "#xhdpiWidth" ).val();
        var xhdpiHeight = $( "#xhdpiHeight" ).val();

        var xxhdpiWidth = $( "#xxhdpiWidth" ).val();
        var xxhdpiHeight = $( "#xxhdpiHeight" ).val();

        var xxxhdpiWidth = $( "#xxxhdpiWidth" ).val();
        var xxxhdpiHeight = $( "#xxxhdpiHeight" ).val();

        //mdpi
        resizeCanvas(tempCanvas, mdpiWidth, mdpiHeight);
        addImageToCanvas(tempCanvasCtx, originalCanvas, mdpiWidth, mdpiHeight);

        var imageMdpi = document.getElementById("imageMdpi");
        imageMdpi.src = getDataUrlFromCanvas(tempCanvas);

        resetCanvas(tempCanvas, tempCanvasCtx);

        //hdpi
        resizeCanvas(tempCanvas, hdpiWidth, hdpiHeight);
        addImageToCanvas(tempCanvasCtx, originalCanvas, hdpiWidth, hdpiHeight);

        var imageHdpi = document.getElementById("imageHdpi");
        imageHdpi.src = getDataUrlFromCanvas(tempCanvas);

        resetCanvas(tempCanvas, tempCanvasCtx);    

        //xhdpi
        resizeCanvas(tempCanvas, xhdpiWidth, xhdpiHeight);
        addImageToCanvas(tempCanvasCtx, originalCanvas, xhdpiWidth, xhdpiHeight);

        var imageXhdpi = document.getElementById("imageXhdpi");
        imageXhdpi.src = getDataUrlFromCanvas(tempCanvas);

        resetCanvas(tempCanvas, tempCanvasCtx);   

        //xxhdpi
        resizeCanvas(tempCanvas, xxhdpiWidth, xxhdpiHeight);
        addImageToCanvas(tempCanvasCtx, originalCanvas, xxhdpiWidth, xxhdpiHeight);

        var imageXxhdpi = document.getElementById("imageXxhdpi");
        imageXxhdpi.src = getDataUrlFromCanvas(tempCanvas);

        resetCanvas(tempCanvas, tempCanvasCtx);   

        //xxxhdpi
        resizeCanvas(tempCanvas, xxxhdpiWidth, xxxhdpiHeight);
        addImageToCanvas(tempCanvasCtx, originalCanvas, xxxhdpiWidth, xxxhdpiHeight);

        var imageXxxhdpi = document.getElementById("imageXxxhdpi");
        imageXxxhdpi.src = getDataUrlFromCanvas(tempCanvas);

        resetCanvas(tempCanvas, tempCanvasCtx);    

        changeResultDivVisibility(true);                                                                     
    });

    $( "#buttonMdpi, #buttonHdpi, #buttonXhdpi, #buttonXxhdpi, #buttonXxxhdpi" )
    .on( "click", function() {

        imageName = $(this).attr('data');
        dataUrl = $("#" + imageName).attr('src');
        
        if(dataUrl == ''){

            alert('Please upload or resize an image first.');
            return;
        }

        download(dataUrl, fileName, "image/png");
    });
});

function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    var dataUrl = blank.toDataURL();
    //blank.parentNode.removeChild();

    return canvas.toDataURL() == dataUrl;
}    

function resizeCanvas(canvas, width, height){
    canvas.width = width;
    canvas.height = height;
}

function addImageToCanvas(canvasContext, canvasImage, width, height){
    canvasContext.drawImage(canvasImage, 0, 0, width, height);
}

function getDataUrlFromCanvas(canvas){
    return canvas.toDataURL();
}

function resetCanvas(canvas, canvasContext){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function changeResultDivVisibility(status){
    
    if(status)
        $("#result").css("display", "block");
    else
        $("#result").css("display", "none");
}

function resetImages(){

    var imageMdpi = document.getElementById("imageMdpi");
    imageMdpi.src = "";

    var imageHdpi = document.getElementById("imageHdpi");
    imageHdpi.src = "";

    var imageXhdpi = document.getElementById("imageXhdpi");
    imageXhdpi.src = "";

    var imageXxhdpi = document.getElementById("imageXxhdpi");
    imageXxhdpi.src = "";

    var imageXxxhdpi = document.getElementById("imageXxxhdpi");
    imageXxxhdpi.src = "";                                            
}

function resetAll(){

    resetCanvas(originalCanvas, originalCanvasCtx);
    resetCanvas(tempCanvas, tempCanvasCtx);
    resetImages();
    changeResultDivVisibility(false);
    resetImages();
}

function fileUploadClick(e){
    resetAll();
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            originalCanvas.width = img.width;
            originalCanvas.height = img.height;
            originalCanvasCtx.drawImage(img, 0, 0, img.width, img.height);

            imageOriginal.src = getDataUrlFromCanvas(originalCanvas);
        }
        img.src = event.target.result;
    }
    fileName = event.target.files[0].name;
    reader.readAsDataURL(e.target.files[0]);     
} 