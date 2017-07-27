function hideToxicComments(commentSpan){
    if(commentSpan.attr('id') != "1"){
            var toxicImageUrl = chrome.extension.getURL("images/toxic-comment.png");
            commentSpan.attr("id","1");
            console.log("sending request to 'comments' server");
            $.ajax({
                method: 'POST',
                url:"https://hateblockapi.azurewebsites.net/api/Toxicity?code=1Rfug4qf3Ra8Uos7F7kZR2NMpYNNGS4B5hiJPp/5HutMsMGHD9893g==",
                dataType: 'json', // Notice! JSONP <-- P (lowercase)
                crossDomain : true,
                data: commentSpan.text(),
                success:function(str){
                    // do stuff with json (in this case an array)

                    var score = parseFloat(str);
                    var isToxic = score < 2; 
                    if (isToxic){

                        commentSpan.css("text-indent","-9999px");
                        var img = $(document.createElement('img'));
                        img.attr('src', toxicImageUrl);
                        commentSpan.css("background-image", "url(" + toxicImageUrl + ")");
                        commentSpan.css("background-size", "contain");

                        commentSpan.hover(function(){
                            commentSpan.css("text-indent","0px");
                            commentSpan.css("background-image", "none");
                        }, function(){
                            commentSpan.css("text-indent","-9999px");
                            var img = $(document.createElement('img'));
                            img.attr('src', toxicImageUrl);
                            commentSpan.css("background-image", "url(" + toxicImageUrl + ")");
                            commentSpan.css("background-size", "contain");
                        });
                    }else{
                        // This is a non toxic comment, don't touch it
                    }

                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("we got an error back from the server." + JSON.stringify(errorThrown));
                }      
            });
        }
}
