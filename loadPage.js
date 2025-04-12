const content = document.getElementById('content');

async function loadPage(url) {
	try {
		let r = await fetch(url);
		let c = await r.text();
		content.innerHTML = c.slice(c.indexOf('<body>'), c.lastIndexOf('</body>'))
	} catch(e) {
			content.innerHTML = `<h3>error:${e}</h3>`;
	}
}

document.addEventListener('loadPage', (e) => {
		loadPage(e.detail.page);
});

// console.log("js running");
// document.addEventListener('loadPage', (event) => {
// async function getPage(page = "home", type = "html") {
// let target = document.getElementById("content");
// //获取文件
// let file = function() {
// switch (type) {
// case "html":
// target = document.getElementById("content");
// return "index.html";
// break;
// case "css":
// target = document.getElementById("pagestyles");
// return "styles.css";
// break;
// case "js":
// target = document.getElementById("pagejs");
// return "script.js";
// break;
// default:
// target = document.getElementById("content");
// return "index.html";
// break;
// }
// };

// function setFile(type = "html", tar = "content", file, url) {
// tar = document.getElementById(tar);
// switch (type) {
// case "html":
// tar.innerHTML = file;
// return "success";
// break;
// case "css":
// return '<link id="pagestyles" href=' + url + '/>';
// break;
// case "js":
// return '<script id="pagejs" src=' + url + '</script>';
// break;
// default:
// console.error("no type")
// return "fail";
// break;
// }
// };
// target.innerHTML = '<h3>LOADING……</h3>';
// let url = "doc/" + page + "/" + file() + '?random=' + Math.random();
// try {
// let response = await fetch(url);
// if (response) {
// let html = await response.text();
// setFile(type, target.id, html, url)
// } else {
// console.log(`fail to get page : ${url}`);
// setTimeout(() => getPage(page, type), 500);
// target.innerHTML = '<h1>FAIL:try again after 5s……</h1>';
// }
// } catch (e) {
// console.log(`Error to get html in ${url} :`, e);
// target.innerHTML = '<h2>ERROR TO FETCH PAGE</h2>';
// }
// };
// getPage(event.detail.page, event.detail.type);
// //   getPage("chat", "css");
// //    getPage("chat", "js");
// });