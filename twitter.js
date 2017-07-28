

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const youtubeCommentFilter = function(node) {
    hideToxicComments("p.tweet-text");
};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // ELEMENT_NODE
                    youtubeCommentFilter(node);
                }
            });
        }
    });
});

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

youtubeCommentFilter(document.body);
