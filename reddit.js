var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const youtube_clickbait = function(node) {
    // $("div.md").each(function(i, ele){
    //     $(this).html("I love everyone on this world! they are so nice and wonderfull!!! :))))))))");
    // });

    $("div.md").each(function(i, ele){
        var txt = $(this).text;
         $(this).hover(
            function () {
                $(this).text("I love everyone on this world! they are so nice and wonderfull!!! :))))))))")
            }, 
            function () {
                $(this).text("txt")
            }
        );
    });

    console.log($("div.md").length);
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
