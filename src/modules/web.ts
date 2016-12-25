function ajax (type: string, url: string, data: Object, successCallback: Function, errorCallback: Function): void {
	const xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.onload = function() {
		if (xhr.response && xhr.response.result) {
			console.log('Response status: ', xhr.response.status);
			if (successCallback) successCallback(xhr.response.result);
		} else if (xhr.response && xhr.response.error) {
		console.error('Response error: ', xhr.response.error);
			if (errorCallback) errorCallback(xhr.response.error);
		} else {
			console.error('Response is absent.');
		}
	}
	xhr.responseType = 'json';
	if (!(url.indexOf("getBio") > -1)) xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(data));
}

export default ajax;
