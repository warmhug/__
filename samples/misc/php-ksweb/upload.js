(function() {
  var bar = $('.bar');
  var percent = $('.percent');
  var status = $('#status');
  $('form').ajaxForm({
    beforeSend: function() {
        status.empty();
        var percentVal = '0%';
        bar.width(percentVal)
        percent.html(percentVal);
    },
    uploadProgress: function(event, position, total, percentComplete) {
        var percentVal = percentComplete + '%';
        bar.width(percentVal)
        percent.html(percentVal);
    },
    success: function() {
      console.log('success..');
      var percentVal = '100%';
      bar.width(percentVal)
      percent.html(percentVal);
      setTimeout(function () {
        location.reload();
      }, 1000);
    },
    complete: function(xhr) {
      console.log('complete..');
      status.html(xhr.responseText);
    }
  });
})();
