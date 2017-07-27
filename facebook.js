var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const facebookCommentFilter = function(node) {
    $("span.UFICommentBody").each(function(i, ele){
        hideToxicComments($(this).children("span"));
    });

};

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                facebookCommentFilter(node);
            }
        });
    });
});

var var1 = '{"Inputs": {"input1": {"ColumnNames": ["class","tweet"],"Values": [["0","youre so cute"]]}},"GlobalParameters": {}}';
var jsondata = JSON.parse(var1);

const config = { attributes: false, childList: true, characterData: false, subtree: true }

observer.observe(document.body, config);

facebookCommentFilter(document.body);
