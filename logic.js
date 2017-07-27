function cssHideText(ele, imageUrl){
    ele.css("text-indent","-9999px");
    ele.css("background-image", "url(" + imageUrl + ")");
    ele.css("background-size", "contain");
    ele.css("cursor", "hand");
}

function cssShowText(ele){
    ele.css("text-indent","0px");
    ele.css("background-image", "none");
}

function hideToxicComments(commentSpan){
    if(commentSpan.attr('id') != "1"){
            commentSpan.attr("id","1");
            console.log("sending request to 'comments' server");
            $.ajax({
                method: 'POST',
                url:"https://hateblockapi.azurewebsites.net/api/Toxicity?code=1Rfug4qf3Ra8Uos7F7kZR2NMpYNNGS4B5hiJPp/5HutMsMGHD9893g==",
                dataType: 'json',
                crossDomain : true,
                data: commentSpan.text(),
                success:function(str){
                    var score = parseFloat(str);
                    var isToxic = score < 2; 
                    if (isToxic){
                        var toxicImageUrl = chrome.extension.getURL("images/toxic-comment.png");
                        console.log("Comment is toxic");
                        cssHideText(commentSpan, toxicImageUrl);
                        commentSpan.hover(function(){
                            cssShowText(commentSpan, toxicImageUrl);                  
                        }, function(){
                            cssHideText(commentSpan);
                        });
                    }else{
                        // This is a non toxic comment, don't change it
                        console.log("Comment is non toxic");
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("we got an error back from the server." + JSON.stringify(errorThrown));
                }      
            });
        }
}
