({
	appDir: "./",
    dir: "publish/",
    baseUrl: 'js/',
    removeCombined: true,
    
    mainConfigFile: 'js/main.js',
    modules: [{
        name: "main"
    }],
    fileExclusionRegExp: /^(.+-bk*|.+-bk.*|.+.psd|.+.psd|doc|less|api|backup|mockup|app\.build\.js|.+\.sh)$/
})