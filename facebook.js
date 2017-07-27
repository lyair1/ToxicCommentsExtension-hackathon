var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const facebook_clickbait = function(node) {
    $("span.UFICommentBody").each(function(i, ele){
        var commentSpan = $(this).children("span");
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
                        commentSpan.text("**HATE**:" + commentSpan.text());
                    }else{
                        commentSpan.text("**NICE**:" + commentSpan.text());
                    }

                },
                error:function(){
                    commentSpan.text("**ERROR**:" + commentSpan.text());
                }      
            });
        }
    });

};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                facebook_clickbait(node);
            }
        });
    });
});

var var1 = '{"Inputs": {"input1": {"ColumnNames": ["class","tweet"],"Values": [["0","youre so cute"]]}},"GlobalParameters": {}}';
var jsondata = JSON.parse(var1);

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

facebook_clickbait(document.body);
