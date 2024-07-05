var ds = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'gif', 'txt'];
var vs = ['mp4', 'MKV', 'mkv'];
var res = [];
filenameArr.forEach(function (item, index) {
  if (ds.indexOf(fileExtArr[index]) >= 0) {
    res.push('<div><a class="ds" href="' + item + '">' + item + '</a>\
    <i>' + fileTimeArr[index] + '</i>\
    <button data-name="' + item + '">删除</button></div>');
  } else if (vs.indexOf(fileExtArr[index]) >= 0) {
    res.push('<div><a class="vs" href="javascript:;">' + item + '</a>\
    <i>' + fileTimeArr[index] + '</i>\
    <button data-name="' + item + '">删除</button></div>');
  } else {
    res.push('<div><a class="ot" href="javascript:;">' + item + '</a>\
    <i>' + fileTimeArr[index] + '</i>\
    <button data-name="' + item + '">删除</button></div>');
  }
})
$('#pagination-container').pagination({
    dataSource: res,
    callback: function(data, pagination) {
        // template method of yourself
        // var html = template(data);
        $('#list').html(data);
    }
})
$('#list').delegate('a.vs', 'click', function () {
  var url = $(this).text();
  player.src({ type: "video/mp4", src: url });
  player.dock({
    title: url,
    description: 'des...'
  });
  player.play();
}).delegate('button', 'click', function() {
  var fileName = $(this).attr('data-name').replace('uploads/', '');
  if (window.confirm('确认是否删除 ' + fileName )) {
    $.ajax({
      url: '/delete.php',
      type: 'DELETE',
      data: JSON.stringify({fileName: fileName}),
      success: function(result) {
        location.reload();
      }
    });
  }
});
