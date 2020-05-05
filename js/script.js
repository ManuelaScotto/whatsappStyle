$(document).ready(function() {
    // prendere il valore dell'input e controllare se è presente nel contact-name di account
    $('.container-search > input').keyup( function() {
        //ci interessa sapere cosa c'è scritto all'interno del nostro input
        var search = $(this).val().toLowerCase();    
        //devo andare a vedere che questo search sia all'interno dei nostri contatti
        //prendo tutti gli elementi, faccio un ciclo e controllo che all'interno contenga qualche cosa
        $('.account').each(function() {
            $(this).hide(); 
            //vado a cercare nel contact-name se è presente 
            if($(this).find('.contact-name').text().toLowerCase().indexOf(search) > -1)  {
                $(this).show();        
            }
        })
        //METODO ALTERNATIVO 
        // $('.account').filter(function(){
        //     $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
        // });   
        
    });

    //cambio account
    // $('.account').click(function() {
    //     $('.account').removeClass('active'); //rimuove tutte le classi active da account
    //     $(this).addClass('active'); //tieni solo quella che hai cliccato

    //     var userData = $(this).attr('data-account'); //creo una variabile per recuperare il valore dell'attributo 'data-account'
    //     $('.main').removeClass('active'); //rimuove tutte le classi active dal main
    //     $('.main').each(function(){ //faccio un ciclo per controllare se il valore della var UserData è uguale al valore dell'attributo nel main, ci aggiungo la classe active
    //         if ($(this).attr('data-account') == userData) {
    //             $(this).addClass('active')
    //         }
    //     });

    //     var name = $(this).find('.contact-name').text(); //recupero il testo all'interno di 'contact-name 
    //     $('.contact-name-active').text(name); //e lo inserisco nel contact-name-active
    //     var imgAccount = $(this).find('.account-img img').attr('src');
    //     $('.your-img img').attr('src',imgAccount);
    //     var clock = $(this).find('.contact-time').text();
    //     $('.your-name > p > span').text(clock);   
    // }); 

    //----------CAMBIO ACCOUNT--------ALTRO METODO
    $(document).on('click', '.account', function() {
        var data = $(this).attr('data-account'); //recupero il valore dell'attributo data       
        var selector = '[data-account="' + data  + '"]'; //ho creato una stringa che mi dica di prendere il valore data nell'attributo data-account. 
        console.log(selector);   
        $('.main').removeClass('active');
        $(selector).addClass('active'); //aggiunge la classe active a quel selettore

        $('.account').removeClass('active'); //rimuovo classe active
        $(this).addClass('active'); //aggiungo classe active solo all'account selezionato

        var name = $(this).find('.contact-name').text();
        var clock = $(this).find('.contact-time').text();
        var imgAccount = $(this).find('.account-img img').attr('src'); //in questo modo prendiamo il valore dell'immagine

        $('.contact-name-active').text(name);
        $('.your-name > p > span').text(clock);   
        $('.your-img img').attr('src',imgAccount); //.attr('src', imgAccount) in questo modo gli stiamo dicendo quale attributo modificare ('src') e che cosa mettere all'interno (imgAccount)
      
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
      })

      //ALTRO METODO UTILIZZANDO .FOCUS
    //   $('.mess > input').focus(function() {
    //     $('.mess > i.fa-microphone').removeClass('fa-fa-microphone').addClass('fa-paper-plane'); 
    //   }).blur(function() { //si possono concatenare in questo modo se si sta lavorando sullo stesso elemento (il selettore è sottinteso)
    //     $('.mess > i.fa-paper-plane').removeClass('fa-paper-plane').addClass('fa-microphone');
    //   })
        
    //dropdown
    $('.parent-dropdown').mouseenter( function() {
        $(this).find('.dropdown').addClass('active');
    });
    $('.parent-dropdown').mouseleave( function() {
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
    //prendo il valore dell'input e se la lunghezza del testo è diverso da 0...
    if(textMessage.length != 0) {
        var blockGreen = $ ('.template .green').clone(); //clono
        blockGreen.find('.mess-text').text(textMessage); //scrivo
        $('.main.active').append(blockGreen); //incollo nell'active perchè altrimenti te lo incollerà su tutti 

        //collego l'orario con quello reale
        var data = new Date();
        var hour = data.getHours();
        var minute = addZero(data.getMinutes()); 
        var time = (hour + ':' + minute);
        blockGreen.find('.mess-time').text(time); 
        $('.mess > input').val(''); // in questo modo resetto l'input

        setTimeout(receivedMessage, 1000); //risposta dopo 1 secondo

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
    //risposta casuale
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

//creiamo una funzione per far si che una volta ricevuto un messaggio la nostra scroll si posizioni alla fine del testo 
function scrollMessage(){
    var heightContainer = $('.main.active').height(); 
    console.log(heightContainer);//per controllare l'altezza del container in base al contenuto
    $('.wrapper-main').scrollTop(heightContainer); //gli stiamo dicendo di andare a scrollare dove è indicato con l'height
}

//aggiunge zero ai minuti
function addZero(number) {
    if(number < 10) {
        number = '0' + number;
    } 
    return number;
}
