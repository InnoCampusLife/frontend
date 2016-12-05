
function get(key) {
	return localStorage.getItem(key);
}

function set(key, value) {
	if (value) localStorage.setItem(key, value);
	return localStorage.getItem(key);
}

function clear() { 
	localStorage.clear(); 
}

export { get, set, clear }