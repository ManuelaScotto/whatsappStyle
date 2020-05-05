$(document).ready(function() {
    //search contact
    $('.container-search > input').keyup( function() {
        var search = $(this).val().toLowerCase();    
        $('.account').each(function() {
            $(this).hide(); 
            if($(this).find('.contact-name').text().toLowerCase().indexOf(search) > -1)  {
                $(this).show();        
            }
        })
    });

    //change account
    $('.account').click(function() {
        $('.account').removeClass('active'); 
        $(this).addClass('active');

        var userData = $(this).attr('data-account'); 
        $('.main').removeClass('active'); 
        $('.main').each(function(){ 
            if ($(this).attr('data-account') == userData) {
                $(this).addClass('active')
            }
        });

        var name = $(this).find('.contact-name').text(); 
        $('.contact-name-active').text(name); 
        var imgAccount = $(this).find('.account-img img').attr('src');
        $('.your-img img').attr('src',imgAccount);
        var clock = $(this).find('.contact-time').text();
        $('.your-name > p > span').text(clock);   
    }); 

    //   send message
      $('.mess > input').keyup(function(event){
        $('.mess > i.fa-microphone').removeClass('fa-fa-microphone').addClass('fa-paper-plane'); 
        $(document).on('click', '.mess > i.fa-paper-plane', function() {
            sendMessage();  
            $('.mess > i.fa-paper-plane').removeClass('fa-paper-plane').addClass('fa-microphone');
          })
          if(event.keyCode == 13 || event.which == 13) {
              sendMessage();
              $('.mess > i.fa-paper-plane').removeClass('fa-paper-plane').addClass('fa-microphone');
          }
      });

        
    //dropdown
    $('.parent-dropdown').mouseenter( function() {
        $(this).find('.dropdown').addClass('active');
    }).mouseleave( function() {
        $(this).find('.dropdown').removeClass('active');
    });
    //dropdown-delete
    $(document).on('click', '.delete-message', function(){
        $(this).parents('.main-mess').remove(); //dobbiamo salire ai genitori per cancellare il messaggio       
    });
    
}); //FINE DOCUMENT.READY

//---------------------FUNCTION------------------------------

//send message
function sendMessage() {
    var textMessage = $('.mess > input').val();
    if(textMessage.length != 0) {
        var blockGreen = $ ('.template .green').clone(); 
        blockGreen.find('.mess-text').text(textMessage); 
        $('.main.active').append(blockGreen); 

        var data = new Date();
        var hour = data.getHours();
        var minute = addZero(data.getMinutes()); 
        var time = (hour + ':' + minute);
        blockGreen.find('.mess-time').text(time); 
        $('.mess > input').val(''); 

        setTimeout(receivedMessage, 1000); 

        scrollMessage(); 
        $('.parent-dropdown').mouseenter( function() { 
            $(this).find('.dropdown').addClass('active');
        });
        $('.parent-dropdown').mouseleave( function() {
            $(this).find('.dropdown').removeClass('active');
        });
    }
}

//received Message
function receivedMessage() {
    var blockWhite = $ ('.template .white').clone();
    var arrayMex = ['ok', 'si', 'no', 'tutto bene!', 'ciao', 'bo', 'grazie','mi piacerebbe','pappa', 'ehi'];
    var index = Math.floor(Math.random() * (arrayMex.length - 0)) + 0;
    var received = arrayMex[index];
    blockWhite.find('.mess-text').text(received);   

    var data = new Date();
    var hour = data.getHours();
    var minute = addZero(data.getMinutes()); 
    var time = (hour + ':' + minute);
    blockWhite.find('.mess-time').text(time);
    $('.main.active').append(blockWhite);

    scrollMessage(); 
    $('.parent-dropdown').mouseenter( function() {
        $(this).find('.dropdown').addClass('active');
    });
    $('.parent-dropdown').mouseleave( function() {
        $(this).find('.dropdown').removeClass('active');
    });
}
 
//scrollTop
function scrollMessage(){
    var heightContainer = $('.main.active').height(); 
    console.log(heightContainer);
    $('.wrapper-main').scrollTop(heightContainer); 
}

//add Zero for time
function addZero(number) {
    if(number < 10) {
        number = '0' + number;
    } 
    return number;
}
