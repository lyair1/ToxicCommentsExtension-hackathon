var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const youtube_clickbait = function(node) {
    var toxicImageUrl = chrome.extension.getURL("images/toxic-comment.png");
    $("div.comment-renderer-text-content").each(function(i, ele){
        var commentSpan = $(this);
        if(commentSpan.attr('id') != "1"){
            commentSpan.attr("id","1");

            $.ajax({
                method: 'POST',
                url:"https://hateblockapi.azurewebsites.net/api/Toxicity?code=1Rfug4qf3Ra8Uos7F7kZR2NMpYNNGS4B5hiJPp/5HutMsMGHD9893g==",
                dataType: 'json', // Notice! JSONP <-- P (lowercase)
                crossDomain : true,
                data: commentSpan.text(),
                success:function(str){
                    // do stuff with json (in this case an array)
                    //alert(json);
                    var score = parseFloat(str);
                    var isToxic = score < 2; 
                    if (isToxic){
                        commentSpan.append("<img id='img' src='chrome-extension://ocoglhenbfclcijjoonggbbcdjgifjpb/images/toxic-comment.png' />");
                        commentSpan.text("**HATE**:" + commentSpan.text());
                    }else{
                        commentSpan.append("<img id='img' src='chrome-extension://ocoglhenbfclcijjoonggbbcdjgifjpb/images/toxic-comment.png' />");
                        commentSpan.text("**NICE**:" + commentSpan.text());
                    }

                },
                error:function(){
                    commentSpan.text("**ERROR**:" + commentSpan.text());
                }      
            });
        }
    });

    console.log($("div.comment-renderer-text-content").length);
};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                youtube_clickbait(node);
            }
        });
    });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

youtube_clickbait(document.body);
