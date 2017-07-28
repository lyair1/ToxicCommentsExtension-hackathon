var sensitivity = 1.5;
var count = 0;

function cssHideText(ele, imageUrl){
    ele.css("text-indent","-9999px");
    ele.css("color","transparent");
    ele.css("background-image", "url(" + imageUrl + ")");
    ele.css("background-size", "contain");
}

function cssShowText(ele){
    ele.css("text-indent","0px");
    ele.css("color","black");
    ele.css("background-image", "none");
}

function hasSomeParentTheClass(element, classname) {
    var found = false;
    element.parents().each(function(){
        if ($(this).hasClass(classname)) {found = true;}
    });
    return found;
}

function hideToxicComments(divName){
    chrome.storage.local.get("sensitivity", function(items){
        if (items["sensitivity"] != undefined){
            sensitivity = parseFloat(items["sensitivity"]);
        }
        var comments = [];
        var commentSpanArr = [];

        $(divName).each(function(){
            if($(this).attr('id') != "1" && !hasSomeParentTheClass($(this), "side")){
                comments.push($(this).text());
                commentSpanArr.push($(this));
                $(this).attr("id","1");
            }
        })

        if (comments.length > 0) {
            console.log("sending request to 'comments' server");
            console.log("Level of sensitivity is:" + sensitivity);
            // console.log(JSON.stringify(comments));
            $.ajax({
                method: 'POST',
                url:"https://hateblockapi.azurewebsites.net/api/Toxicity?code=1Rfug4qf3Ra8Uos7F7kZR2NMpYNNGS4B5hiJPp/5HutMsMGHD9893g==",
                crossDomain : true,
                data: JSON.stringify(comments),
                success:function(str){
                    updateComments(str, commentSpanArr);
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("we got an error back from the server." + JSON.stringify(errorThrown));
                }      
            });
        }
    });
}

function updateComments(results, commentSpanArr) {
    for (var i = 0; i < results.length; i++) {
        var score = parseFloat(results[i]);
        var isToxic = score < sensitivity; 
        var commentSpan = commentSpanArr[i];
        if (isToxic){
            count++;
            chrome.runtime.sendMessage(count); 
            var toxicImageUrl = chrome.extension.getURL("images/toxic-comment.png");
            console.log("Comment is toxic");
            cssHideText(commentSpan, toxicImageUrl);
            commentSpan.hover(function(){
                cssShowText($(this));                
            }, function(){
                cssHideText($(this), toxicImageUrl);
            });
        }else{
            // This is a non toxic comment, don't change it
            console.log("Comment is non toxic");
        }
    }
}
