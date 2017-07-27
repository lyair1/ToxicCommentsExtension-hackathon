var defSensitivity = "_15";
chrome.storage.local.get(["sensitivityId"], function(items){
    if ("sensitivityId" in items){
        $('#' + items["sensitivityId"]).attr('checked', 'checked');
    }else{
        $('#' + defSensitivity).attr('checked', 'checked');
    }
});

$('#sensitivity input').on('change', function() {
    chrome.storage.local.set({ "sensitivity": this.value, "sensitivityId" : this.id }, function(){
        // callback
    });
});