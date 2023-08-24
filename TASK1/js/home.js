jQuery(document).ready(function() {
   jQuery('.moreless-button').click(function() {
       jQuery('.moretext').slideToggle();
        if (jQuery('.moreless-button').text() == "Read more") {
         jQuery(this).text("Read less")
        } else {
         jQuery(this).text("Read more")
        }
      });
  });