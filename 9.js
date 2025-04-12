let body = document.querySelector('body');
let head = document.getElementById('head');
head.style.top = '-75px';
document.addEventListener('DOMContentLoaded', () => {
	//设置背景
	fetch("https://image.anosu.top/pixiv/json?keyword=%E3%83%81%E3%83%AB%E3%83%8E&size=regular")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			//let r = JSON.parse(data);
			body.style.background = `url(\"${data[0].url}\")`;
			body.style.backgroundSize = 'cover';
			body.style.backgroundAttachment = 'fixed';
		})
	uiAnimation(head, 'top', 'px', -75, 5, 750)
})

function uiAnimation(ui, css, unit = 'px', start = 0, end = 0, duration = 1, easing = 'easeOutCubic', callback) {
	const startTime = Date.now();
	const endTime = startTime + duration;

	function runAnimation() {
		const now = Date.now();
		const progress = Math.min((now - startTime) / (endTime - startTime), 1);
		const eased = tween[easing] ? tween[easing](progress) : progress;
		const value = start + (end - start) * eased;
		ui.style[css] = value + unit;

		if (now < endTime) {
			requestAnimationFrame(runAnimation);
		} else {
			ui.style[css] = end + unit;
			if (callback) callback(ui);
		}
	}
	runAnimation();
}

function tip(t, c) {
	let tip = document.createElement('div');
	tip.className = 'box tip-s';
	tip.innerHTML = '√ - ' + c;
	body.append(tip);
	uiAnimation(tip, 'top', 'px', 0, 90, 400, 'easeOutCubic', () => {
		setTimeout(() => {
			uiAnimation(tip, 'top', 'px', 90, 0, 400, 'easeInCubic', () => tip.remove());
			uiAnimation(tip, 'opacity', '%', 100, 0, 250, 'linear');
		}, 2000)
	});
	uiAnimation(tip, 'opacity', '%', 0, 100, 250);
}

function downloadFile(url, fileName) {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	link.target = "_blank"; // 可选，如果希望在新窗口中下载文件，请取消注释此行
	link.click();
}

updateUrlStructure()
document.getElementById('jsstart').addEventListener('click', updateUrlStructure)
document.addEventListener('updatePage', ()=>{updateUrlStructure();console.log('导航栏接收到事件')})

function updateUrlStructure() {
	// 获取域名
	let rmSuffix = new RegExp("\\.(html|txt|htm|png|jpg|gif|mp3|mp4|webm|webp)$", "i"); // 改为不区分大小写，移除全局匹配
	let searchParams = new URLSearchParams(window.location.search);
	let url = searchParams.get('page') || 'index';
	let urlStructure = url.split('/').filter(part => part !== ""); // 过滤空路径部分
	let lS = document.getElementById('link-structure');
	// 清空现有内容
	lS.innerHTML = '';
	// 添加根目录（根据需求决定是否需要）
	//urlStructure.unshift('index');
	for (let i = 0; i < urlStructure.length; i++) {
		let part = urlStructure[i];
		if (part === "") continue;
		let ele = document.createElement('div');
		ele.innerHTML = part.replace(rmSuffix, "");
		ele.className = 'box fileEle';
		ele.style.height = '16px';
		// 修正路径拼接逻辑
		ele.dataset.href = urlStructure.slice(0, i + 1).join('/');
		ele.onclick = () => {
			searchParams.set('page', ele.dataset.href);
			history.replaceState({}, '', '?' + searchParams.toString());
			document.dispatchEvent(new CustomEvent('updatePage', {
				detail: {}
			}));
		};
		lS.appendChild(ele);
		// 只在非最后一个元素后添加箭头
		if (i !== urlStructure.length - 1) {
			lS.appendChild(document.createTextNode(' ➤ '));
		}
	}
}



document.getElementById('getbg').addEventListener('click', getBG)

function getBG() {
	if (document.getElementById('get-bg')) return false;
	let url = body.style.background.slice(body.style.background.indexOf('http'), body.style.background.lastIndexOf('")'))
	console.log(url)
	//获取高清图链接
	function convertImageUrl(originalUrl) {
		return originalUrl
			// 将路径中的_master改为_original
			.replace(/img-master/, 'img-original')
			// 移除文件名中的_master[数字]部分
			.replace(/(_p\d+)_master\d+(\..+)$/, '$1$2');
	}
	let uibox = document.createElement('div');
	uibox.id = 'get-bg';
	uibox.className = 'box center pop-ups';
	// uibox.style.height = '50%';
	uibox.innerHTML = '<text>9HalfCirno的背景图 - BG</text>';
	// uibox.style.display = 'flex';
	body.append(uibox);
	uiAnimation(uibox, 'top', 'px', 0, 90, 500, 'easeOutCubic');
	uiAnimation(uibox, 'opacity', '%', 0, 100, 250);
	let closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.id = 'close-get-bg';
	closeButton.innerHTML = '×';
	closeButton.onclick = () => {
		uiAnimation(uibox, 'top', 'px', 90, -20, 450, 'easeInCubic', (ui) => ui.remove());
		uiAnimation(uibox, 'opacity', '%', 100, 0, 300, 'linear');
	};
	uibox.append(closeButton);
	let bdiv = document.createElement('div');
	bdiv.id = 'get-bg-button-div';
	uibox.append(bdiv)
	let bgHD = document.createElement('button');
	bgHD.id = 'get-bg-pic';
	bgHD.innerHTML = '下载原图';
	bgHD.onclick = () => {
		console.log('开始下载');
		downloadFile(convertImageUrl(url), 'bg.png');
	};
	bdiv.append(bgHD);
	let bgLink = document.createElement('button');
	bgLink.id = 'get-bg-link';
	bgLink.innerHTML = '复制链接';
	bgLink.onclick = () => {
		navigator.clipboard.writeText(convertImageUrl(url)).then(() => {
			console.log("复制链接成功");
			tip('success', "复制成功")
		}, () => {
			console.log("复制链接失败");
			tip('failed', "复制失败")
		});
	}
	bdiv.append(bgLink);
	let test = document.createElement('button');
	test.id = 'get-bg-link';
	test.innerHTML = '复制测试';
	test.onclick = () => {
		navigator.clipboard.writeText().then(() => {
			console.log("复制链接成功");
			tip('success', "复制成功")
		}, () => {
			console.log("复制链接失败");
			tip('failed', "复制失败")
		});
	}
	bdiv.append(test);
};