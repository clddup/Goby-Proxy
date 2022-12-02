function activate() {
	const path = require('path')
	const fs = require('fs')
	// 每次进来都需要回复初始值, 防止代理地址关闭导致Goby请求不通

	delete require.cache[require.resolve(path.join(__dirname, './config.json'))]
	let config = require(path.join(__dirname, './config.json'))
	config.status = false
	console.log(config);
	fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(config, null, 4))
	top.require('@electron/remote').session.defaultSession.setProxy({
		proxyRules: ""
	})
	
	
	
	window.oldHttpAgent = require('http').globalAgent
	window.oldHttpsgent = require('https').globalAgent
	goby.registerCommand('setProxy', function(content){
		goby.showIframeDia(path.join(__dirname, `index.html?time=${Date.now()}`), 'Goby Proxy', 300, 300)
	});

}

exports.activate = activate;






