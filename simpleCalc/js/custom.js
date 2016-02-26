$(document).ready(function(){

    $('.calcType').on('click', function(){
        if($('#calc').hasClass('simple')){
            $('#calc').removeClass('simple');
            $('#calc').addClass('rest');
        }else if($('#calc').hasClass('rest')){
            $('#calc').removeClass('rest');
            $('#calc').addClass('simple');
        }
        $('#eq_btn').attr('data-calcType', $(this).attr('data-calcType'));
    });

    var display = $('#calc_result');
    $('.calc_btn').on('click', function(){
        var ev = $(this).val();
        if(ev == "="){
            if($('#eq_btn').attr('data-calcType') == 'simple'){
                display.val(eval(display.val()));
            }else if($('#eq_btn').attr('data-calcType') == 'rest'){
                restCalc(display.val());
            }
        }else if(ev == "CE"){
            display.val("");
        }else if(ev =="C"){
            display.val(display.val().substr(0, display.val().length-1));
        }else if(ev == "±"){
            if(display.val().substr(0, 1) == "-"){
                display.val(display.val().substr(1, display.val().length-1));
            }else{
                display.val("-"+display.val());
            }
        }/*else if(ev == "."){
            var str = display.val();
            var patt = new RegExp("/^[-+]?[0-9]+\.[0-9]+$/");
            var res = patt.test(str);
            if(res){
                console.log(res);
                display.val().substr(0, display.val().length-1)
            }else{
                console.log(res);
                display.val(display.val()+ev);
            }
        }*/else{
            display.val(display.val()+ev);
        }
    });
});

/* calculator with ajax request */

var xhr;

function init() {
    if (window.XMLHttpRequest)  {
        // Not a Microsoft browser
        xhr = new XMLHttpRequest();
    } else if  (window.ActiveXObject) {
        // Microsoft browser
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function restCalc(expression) {
    if (!xhr) {
        init();
    }
    xhr.onreadystatechange = callback;
    xhr.open("POST", "http://localhost:8080/calc");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({expression: expression}));
}

function callback() {
    console.log("callback is called")
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var result = xhr.responseText;
            res = JSON.parse(result);
            var resultDiv = document.getElementById("calc_result");
            resultDiv.value = res.calcResult;
        } else {
            //console.log("http status: ", xhr.status);
        }
    } else {
        //console.log("ready status: ", xhr.readyState);
    }
}
