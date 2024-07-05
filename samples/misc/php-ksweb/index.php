<?php
  $viewInfo = $_GET['viewInfo'];
  if ($viewInfo == '1') {
    phpinfo();
  } else {
  $path = "uploads/";
  $fileMArr = array();
  $fileMFObj = new StdClass();
  foreach (glob($path."*") as $filename) {
    $fm = filemtime($filename);
    $fileInfo = new StdClass();
    $fileInfo->name = $filename;
    $fileInfo->ext = pathinfo($filename, PATHINFO_EXTENSION);
    $fileInfo->mtime = date("Y-m-d H:i:s", $fm);
    $fileMFObj->$fm = $fileInfo;
    array_push($fileMArr, $fm);
  }
  arsort($fileMArr);
  $filenameArr = array();
  $fileExtArr = array();
  $fileTimeArr = array();
  foreach ($fileMArr as $value) {
    array_push($filenameArr, $fileMFObj->$value->name);
    array_push($fileExtArr, $fileMFObj->$value->ext);
    array_push($fileTimeArr, $fileMFObj->$value->mtime);
  }
  // var_dump($fileMFObj);
  function toJsArray($arr) {
    return "[".'"' . implode('","', $arr).'"' ."]";
  }
  $js_data = "<script>
    var filenameArr = ". toJsArray($filenameArr) ."; \n
    var fileExtArr = ". toJsArray($fileExtArr) ."; \n
    var fileTimeArr = ". toJsArray($fileTimeArr) .";
  </script>";
?>
<!DOCTYPE html>
<html>
<head>
  <title>demo</title>
  <meta charset="utf-8" />
  <meta name="apple-touch-fullscreen" content="yes" />
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta content="yes" name="apple-mobile-web-app-capable" />
  <meta content="black" name="apple-mobile-web-app-status-bar-style" />
  <style>
    #mvideo { width: 100%; margin-top: 10px; position: relative; }
    #mvideo .st { position: absolute; top: 10px; left: 10px; z-index: 999; }
    #list { word-break: break-all; }
    #list a { display: inline-block; padding: 4px; }
    #list a.vs { background-color: bisque; }
    form { display: block; margin: 20px auto; background: #eee; border-radius: 10px; padding: 15px }
    .progress { position:relative; width:100%; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
    .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
    .percent { position:absolute; display:inline-block; top:3px; left:48%; }
  </style>
  <!-- 5.11.6/video-js.css -->
  <link href="https://os.alipayobjects.com/rmsportal/XNpVOAMlFTypViDwBexF.css" rel="stylesheet">
  <?php
  echo $js_data;
  ?>
</head>
<body>
  <a href='index.php?viewInfo=1'>Click</a> to view PHP info.

  <form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload" multiple="multiple" />
    <input type="submit" value="Upload file" name="submit" />
  </form>
  <div class="progress">
    <div class="bar"></div>
    <div class="percent">0%</div>
  </div>
  <div id="status"></div>
  <!-- jQuery v1.12.4 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/YbGjMuYEbXdIGJRsqOSA.js"></script>
  <!-- jQuery Form Plugin version: 3.51.0-2014.06.20 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/iDZHbJEouZyiZGETqGjK.js"></script>
  <script>
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
  </script>

  <video id="mvideo"
    class="video-js vjs-default-skin vjs-big-play-centered"
    controls height="264">
  </video>
  <!-- 5.11.6/video.min.js -->
  <script src="https://os.alipayobjects.com/rmsportal/tKjaoxQxIehvljvpwkLo.js"></script>
  <!-- videojs.hotkeys.min.js -->
  <script src="https://os.alipayobjects.com/rmsportal/ggQzhojOhUGULmwqXFKA.js"></script>
  <!-- Hammer.JS - v2.0.8  -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/ytgbeqbiCoGivVPYWUVZ.js"></script>
  <!-- videojs-dock.css -->
  <link href="https://gw.alipayobjects.com/os/rmsportal/SunZxbEHhikrAUeyzSAs.css" rel="stylesheet">
  <!-- videojs-dock.js -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/EjmvXAeRayDABBQwzEQo.js"></script>
  <!-- vr support
  <script src="libs/three.min.js"></script>
  <script src="libs/vr/vr.js"></script>
  <script src="libs/vr/OculusRiftControls.js"></script>
  <script src="libs/vr/OculusRiftEffect.js"></script>
  <script src="libs/videojs.vr.js"></script>
  -->
  <script>
    var player = videojs('mvideo', {
      playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
      controlBar: {
        muteToggle: false,
        progressControl: {
          keepTooltipsInside: false
        }
      }
     }, function() {
      this.hotkeys();
      // player.dock({
      //   title: 'Bacon ipsum dolor amet ribeye',
      //   description: 'des...'
      // });
      // player.shelf.addChild('playToggle');
      // this.play(); // if you don't trust autoplay for some reason
      // this.vr({projection: 'Sphere'}); // initialize the plugin, 'Plane' projection by default
    });

    // 快进/快退 功能
    var videoContainer = document.getElementById('mvideo');
    function mkStatus(text) {
      var st = document.createElement('div');
      st.setAttribute('class', 'st');
      st.innerHTML = text;
      videoContainer.appendChild(st);
      setTimeout(function () {
        if (st.parentNode) {
          st.parentNode.removeChild(st);
        }
      }, 1000);
    }
    var mc = new Hammer(videoContainer);
    var seekStep = 5;
    mc.on("swipeleft", function(ev) {
      // console.log(ev);
      var curTime = player.currentTime() - seekStep;
      // The flash player tech will allow you to seek into negative
      // numbers and break the seekbar, so try to prevent that.
      if (player.currentTime() <= seekStep) {
        curTime = 0;
      }
      player.currentTime(curTime);
      mkStatus('快退 5 秒');
    });
    mc.on("swiperight", function(ev) {
      // console.log(ev);
      player.currentTime(player.currentTime() + seekStep);
      mkStatus('快进 5 秒');
    });
  </script>

  <div id="list" style="padding: 10px; margin-top: 10px;"></div>
  <div id="pagination-container"></div>
  <!-- pagination.css 2.0.7 -->
  <link href="https://gw.alipayobjects.com/os/rmsportal/gbpQwVVeKonlJIwszbqx.css" rel="stylesheet">
  <!-- pagination.js 2.0.7 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/zGKujqDocdriMchcKxhD.js"></script>
  <script>
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
  </script>
</body>
</html>
<?php
}
?>
