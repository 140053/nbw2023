$(document).ready(function(){
    //program number 1
    $('#p1').on('click', function(){
        //alert('click')
        var chold = $('.pd1')
        if(chold.hasClass('d-none')){
            //alert('has');
            chold.removeClass('d-none');
            $('.pd2').addClass('d-none');
             $('.pd3').addClass('d-none')
        }
    });
    //program number 2
    $('#p2').on('click', function(){
       // alert('click')
        var chold = $('.pd2')
        if(chold.hasClass('d-none')){
            //alert('has');
            chold.removeClass('d-none');
            $('.pd1').addClass('d-none');
             $('.pd3').addClass('d-none')
        }
    });
    //program number 3
    $('#p3').on('click', function(){
        ///alert('click')
        var chold = $('.pd3')
        if(chold.hasClass('d-none')){
            //alert('has');
            chold.removeClass('d-none');
            $('.pd2').addClass('d-none');
             $('.pd1').addClass('d-none')
        }
    });
});


