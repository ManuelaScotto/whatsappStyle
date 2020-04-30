$(document).ready(function() {
    $('.mess > input').keyup(function(event){
        if(event.keyCode == 13 || event.which == 13) {
            var mex = $ ('.mess > input').val();
            $('.mess > input').val('');
            var mexNew = $ ('.template .green').clone();
            mexNew.prepend(mex);
            $('.main').append(mexNew);
        }
    })
});