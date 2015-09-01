function checkBrowser() {
	var desc = '';
	desc = desc + 'appName:' + navigator.appName + '<br/>';
	desc = desc + 'appCodeName:' + navigator.appCodeName + '<br/>';
	desc = desc + 'appVersion:' + navigator.appVersion + '<br/>';

	return desc;
}

self.addEventListener('message', function(e){
	var json = e.data;
	var data = json.msg;

	if (data == 'check')
	{
		self.postMessage('waitting...');

		setTimeout(function(data){
			self.postMessage(checkBrowser());
		}, 3000);
	} 
	else
	{
		var url = json.url;
		self.postMessage(data + ', url:' + url);
	}
	
}, false);