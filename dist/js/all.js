jQuery(document).ready(function($){
    var buyGamesValue = parseInt($('#buy-games').val());
    var openGames = parseInt($('#open-games').val());
    function gnomeDraw() {
        var gnome = document.getElementById('gnom');
        var ctx = gnome.getContext('2d');
        var gnomeImg = new Image();
        gnomeImg.src = 'dist/images/gnom.png';
        gnomeImg.onload = function () {
            ctx.drawImage(gnomeImg, 0, 0);
        };
    }

    function drawEyes() {
        var gnome = document.getElementById('eyes');
        var ctx = gnome.getContext('2d');
        var gnomeEyes = new Image();
        gnomeEyes.src = 'dist/images/close-eyes.png';
        gnomeEyes.onload = function () {
            setInterval(function () {
                ctx.drawImage(gnomeEyes, 0, 0);
                setTimeout(function () {
                    ctx.clearRect(0, 0, 65, 12);
                }, 100);
            }, 4000);
        };
    }

    function drawNose() {
        var gnome = document.getElementById('nose');
        var ctx = gnome.getContext('2d');
        var gnomeNose = new Image();
        gnomeNose.src = 'dist/images/nose.png';
        gnomeNose.onload = function () {
            setInterval(function () {
                ctx.drawImage(gnomeNose, 0, 0);
                setTimeout(function () {
                    ctx.clearRect(0, 0, 60, 44);
                }, 200);

            }, 12200);
        };
    }
 function drawMessage() {
        var message = document.getElementById('gnom-message');
        var messageBox = message.getContext('2d');
     messageBox.globalCompositeOperation = 'destination-over';
        var messageImg = new Image();
     messageImg.src = 'dist/images/message-box.png';
     messageImg.onload = function () {
         messageBox.drawImage(messageImg, 0, 0);
        };
 }
    
    drawEyes();
    drawNose();
    drawMessage();
    function render(id){
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        var chestHasGold = new Image();
        chestHasGold.src = "dist/images/chest-empty.png";
        chestHasGold.onload = function () {
            ctx.drawImage(chestHasGold, 0, 0, 123, 113, 0, 0, 123, 113);
        };
    }

    (function(){
        for(var i = 0; i < 9; i++){
            var chestID = 'chest' + i;
            var chest = "<div class='chest-item'><canvas id='"+ chestID+"' width='123' height='113'></canvas></div>";
            $('.game-field-chests-container').append(chest);
            render(chestID);
        }
    }());
    function ActivationBuyButton(){
        $('#buy-games-btn').removeClass('btn-disable').addClass('btn-active');
        $('#buy-games').val(buyGamesValue);

    }
    function disableBuyButton(e){
        if(buyGamesValue < 1){
            $('#buy-games-btn').addClass('btn-disable').removeClass('btn-active');
        }else{
            buyGamesValue--;
        }
    }

   function calcBuyGamesSum(){
       $('#sum').val(buyGamesValue * 50);
   }

    function buyMoreGames(){
        var allCashValue = parseInt($('#all-cash').val());
        allCash = allCashValue - (buyGamesValue * 50);
        $('#all-cash').val(parseInt(allCash));
    }
    function cleanSumValue(){
        openGames += buyGamesValue;
        buyGamesValue = 0;
        $('#sum').val(0);
        $('#buy-games').val(0);
        $('#open-games').val(openGames);
    }
    function activatePlayButton(){
        if(openGames > 0){
            $('#game-start').removeClass('btn-disable').addClass('btn-active');
        }
    }

    function chestAnimate(id, gold) {
        var imgPath;
        if (gold === 1) {
            imgPath = "dist/images/chest-gold.png";
        } else  {
            imgPath = "dist/images/chest-empty.png";
        }
        var chest = document.getElementById(id),
            cont = chest.getContext('2d');
        cont.fillStile = "transparent";
        var chestHas = new Image();
        chestHas.src = imgPath;
        chestHas.onload = function () {
            cont.drawImage(chestHas, 0, 0, 123, 113, 0, 0, 123, 113);
        };
        var cadr = 0;
        setInterval(function () {
            if (cadr < 3) {
                cont.clearRect(0, 0, 123, 113);
                cont.drawImage(chestHas, 123 * cadr, 0, 123, 113, 0, 0, 123, 113);
                cadr++;
            } else {
                clearInterval();
            }
        }, 30);
    }
    gnomeDraw();
    
    $(document).on('input', '#buy-games', function(e){
        var inputValue = $(this).val(),
            maxGames = parseInt($('#all-cash').val() / 50);
        if(inputValue >  maxGames){
            $(this).val(maxGames);
        }else if(parseInt(inputValue) === 0){
            $(this).val('');
        }else if(isNaN(parseInt(inputValue))){
            e.preventDefault();
            $(this).val('');
        }

    });
    $(document).on('focusin', '#buy-games', function(e){
        if(parseInt($(this).val()) === 0){
            $(this).val('');
        }
    });
    $(document).on('focusout', '#buy-games', function(e){
        var currentValue = parseInt($(this).val());
        if(isNaN(currentValue)){
            $(this).val(0);
            buyGamesValue = 0;
            $('#sum').val(0);
            disableBuyButton();
        }else{
            buyGamesValue = currentValue;
            $('#sum').val(buyGamesValue * 50);
            if( $('#buy-games-btn').hasClass('btn-disable')){
                $('#buy-games-btn').removeClass('btn-disable').addClass('btn-active');
            }

        }
    });
    
    $('.add-game').click(function(e){
        if((buyGamesValue * 50) + 50 > parseInt($('#all-cash').val())){
            e.preventDefault();
        }else{
            buyGamesValue++;
            ActivationBuyButton();
            calcBuyGamesSum();
        }
    });
    $('.remove-game').click(function(e){
        if(buyGamesValue === 0){
            e.preventDefault();
        }else if(buyGamesValue === 1){
            buyGamesValue--;
            disableBuyButton();
        }else{
            buyGamesValue --;
        }
        $('#buy-games').val(buyGamesValue);
          calcBuyGamesSum();

    });
    $('#buy-games-btn').click(function(e){
        if($(this).hasClass('btn-disable')){
            return false;
        }else{
            buyMoreGames();
            cleanSumValue();
            $(this).addClass('btn-disable').removeClass('btn-active');
            activatePlayButton();
        }

    });
    $('#game-start').click(function(e){
        if($(this).hasClass('btn-disable')) {
            return false;
        }else{
            openGames--;
            $('#open-games').val(openGames);
           $('.chest-item').addClass('active');
            $(this).addClass('btn-disable').removeClass('btn-active');
            $('#buy-games-count').addClass('close');
        }
    });


    var openChests = 0,
        openChestWithGold = 0;
$('.chest-item').click(function(e){

    if($(this).hasClass('active') && $(this).hasClass('open') === false){
        var currentChest = $('.chest-item').index($(this));
        var currentChestId = 'chest' + currentChest;
        $(this).addClass('open');
        openChests++;
        if(currentChest === 0 || currentChest === 1 || currentChest === 2) {
            chestAnimate(currentChestId , 1);
            openChestWithGold++;
        }else{
            chestAnimate(currentChestId , 0);
        }
    }else if($(this).hasClass('active') && $(this).hasClass('open')){
        e.preventDefault();
    }
    if(openChests === 3 && openChestWithGold === 3){
        $(this).parent().find('.chest-item').removeClass('active');

        $('#success-modal-window').fadeIn(500,function(){
            setTimeout(function(){
                var allCash = $('#all-cash').val();
                closeChests();
                $('#success-modal-window').fadeOut(600);
                $('#all-cash').val(parseInt(allCash) + 1000);
                $('#buy-games-count').removeClass('close');
                startNewGame();
            },2000);
        });
    }else if(openChests === 3 && openChestWithGold !== 3){
        $(this).parent().find('.chest-item').removeClass('active');
        $('#lose-modal-window').fadeIn(500, function(){
            setTimeout(function(){
                closeChests();
                $('#lose-modal-window').fadeOut(600);
                $('#buy-games-count').removeClass('close');
                startNewGame();
            },2000);
        });

    }

});
    $('.user-login-link').click(function(e){
        e.preventDefault();
        $('#login-modal-window').fadeIn(300);
    });
$('.login-modal-close').click(function(){
        $('#login-modal-window').fadeOut(300);
    });

function changeAsideWidth(){
    var aside = $('.game-control').position();
    var windowWidth = $(window).width();
    $('#game-control-bg').width( windowWidth - aside.left + 5);
}
    $(window).resize( changeAsideWidth);
    changeAsideWidth();
function closeChests(){
    $('.chest-item').removeClass('open');
    openChests = openChestWithGold = 0;
    for(var i = 0; i < 9; i++){
        var id = 'chest' + i;
        render(id);
    }
}
    function startNewGame(){
        if(openGames > 0){
            $('#game-start').toggleClass('btn-disable : btn-active');
        }else if(parseInt($('#all-cash').val()) > 50){
            $('#buy-games-btn').toggleClass('btn-disable : btn-active');
            setTimeout(function(){
                $('#buy-games-btn').toggleClass('btn-disable : btn-active');
            },2000);
        }
    }

});


