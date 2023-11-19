


$(document).ready(function () {
   //program number 0
   $('#p0').on('click', function () {
      //alert('click')
      var chold = $('.pd0')
      if (chold.hasClass('d-none')) {
         //alert('has');
         chold.removeClass('d-none');
         $('.pd1').addClass('d-none');
         $('.pd2').addClass('d-none');
         $('.pd3').addClass('d-none')
         $('.sd0').addClass('d-none');
         $('.sd1').addClass('d-none');
           $('.pd4').addClass('d-none');
      }
   });
   //program number 1
   $('#p1').on('click', function () {
      //alert('click')
      var chold = $('.pd1')
      if (chold.hasClass('d-none')) {
         //alert('has');
         chold.removeClass('d-none');
         $('.pd0').addClass('d-none');
         $('.pd2').addClass('d-none');
         $('.pd3').addClass('d-none');
         $('.sd0').removeClass('d-none');
         $('.sd1').removeClass('d-none');
           $('.pd4').addClass('d-none');

      }
   });
   //program number 2
   $('#p2').on('click', function () {
      // alert('click')
      var chold = $('.pd2')
      if (chold.hasClass('d-none')) {
         //alert('has');
         chold.removeClass('d-none');
         $('.pd0').addClass('d-none');
         $('.pd1').addClass('d-none');
         $('.pd3').addClass('d-none')
         $('.sd0').addClass('d-none');
         $('.sd1').addClass('d-none');
           $('.pd4').addClass('d-none');
      }
   });
   //program number 3
   $('#p3').on('click', function () {
      ///alert('click')
      var chold = $('.pd3')
      if (chold.hasClass('d-none')) {
         //alert('has');
         chold.removeClass('d-none');
         $('.pd0').addClass('d-none');
         $('.pd2').addClass('d-none');
         $('.pd1').addClass('d-none')
         $('.sd0').addClass('d-none');
         $('.sd1').addClass('d-none');
         $('.pd4').addClass('d-none');
      }
   });
    //
    $('#p4').on('click', function () {
      ///alert('click')
      var chold = $('.pd4')
      if (chold.hasClass('d-none')) {
         //alert('has');
         chold.removeClass('d-none');
         $('.pd0').addClass('d-none');
         $('.pd3').addClass('d-none');
         $('.pd2').addClass('d-none');
         $('.pd1').addClass('d-none')
         $('.sd0').addClass('d-none');
         $('.sd1').addClass('d-none');
          
      }
   });
});