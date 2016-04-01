var _w = $(window),
	baseHtmlFontSize = 50,
	navHeight = $('nav').height(),
	originalWidth, originalHeight,
	_this = $('.cycle-slideshow > div > img'),
	_thisParent = $('.cycle-slideshow > div'),
	img = new Image(),
	windowProperties = new Object();
/**
 * windowProperties 设置window属性的对象
 * windowProperties.width 窗口的宽（可视区域的宽）
 * windowProperties.height 窗口的高（可视区域的高）
 */
windowProperties.width = _w.width();
windowProperties.height = _w.height();

if (_this.length > 0)
    img.src = _this.attr('src');

/**
 * [isimgHeightHigher 判断需要设定图片的高度是否大于或等于窗口的高度,分别调用imgHeightHigher(), imgHeightShorter()控制图片的位置
 * @param  {object[]} obj - 设置img属性的对象
 * @param  {object[]} windowObj - 设置window属性的对象
 * @param  {function()} imgHeightHigher - 控制图片的位置
 * @param  {function()} imgHeightShorter - 控制图片的位置
 */
var isimgHeightHigher = function(obj, windowObj, imgHeightHigher, imgHeightShorter) {
	if (obj.height >= windowObj.height) {
		imgHeightHigher(obj, windowObj);
	} else {
		imgHeightShorter(obj, windowObj);
	}
}

/**
 * imgHeightHigher 控制图片的位置
 * 假设设定图片的高度大于或等于窗口的高度，那么无论图片的宽度是否大于、等于或小于窗口的宽度，均设定图片的宽度为窗口的宽度
 * @param  {object[]} obj - 设置img属性的对象
 * @param  {object[]} windowObj - 设置window属性的对象
 */
var imgHeightHigher = function(obj, windowObj) {
		// 由于图片的高度obj.height大于或等于窗口的高度，将图片至中（即多出的部分往上移动）
		obj.top = (obj.height - windowObj.height) / 2;
		/**
		 * 设置图片顶部上移动：-obj.top
		 * 设置图片的高为：obj.height，
		 * 设置图片的宽为：windowObj.width
		 */
		_this.css({
			'position': 'absolute',
			'top': -obj.top,
			'left': 0,
			'height': obj.height,
			'width': windowObj.width
		});
	}
	/**
	 * imgHeightShorter 控制图片的位置
	 * 假设设定图片的高度小于窗口的高度，那么不断放大图片，设置图片的高度为可视窗口的高度，并根据已经设定的图片高度按比例计算图片所需的宽度
	 * @param  {[type]} obj - 设置img属性的对象
	 * @param  {[type]} windowObj - 设置window属性的对象
	 */
var imgHeightShorter = function(obj, windowObj) {
	// 由于图片的高度小于窗口的高度，则设定图片的高度为窗口的高度，并根据已经设定的图片高度按比例计算图片所需的宽度
	obj.width = windowObj.height * originalWidth / originalHeight;
	// 由于宽度不断扩大，将图片至中（即多出的部分往左移动）
	obj.left = (obj.width - windowObj.width) / 2;
	/**
	 * 设置图片左部左移动：-obj.left
	 * 设置图片的高为：windowObj.height，
	 * 设置图片的宽为：obj.width
	 */
	_this.css({
		'position': 'absolute',
		'top': 0,
		'left': -obj.left,
		'height': windowObj.height,
		'width': obj.width
	});
}


img.onload = function() {
	// 当图片加载完成时获取图片的原图大小
	originalWidth = _this.width();
	originalHeight = _this.height();

	/**
	 * imgSetProperties 一个设置img属性的对象
	 * @imgSetProperties.height 需要设定的图片高度(由于图够宽，则根据设定图片宽度为窗口宽度，根据窗口宽度按比例计算需要设定的图片高度)
	 * @imgSetProperties.width 需要设定的图片宽度
	 * @imgSetProperties.top 设定图片的top
	 * @imgSetProperties.left 设定图片的left
	 */

	var imgSetProperties = new Object();
	imgSetProperties.height = windowProperties.width * originalHeight / originalWidth;
	imgSetProperties.width = null;
	imgSetProperties.top = null;
	imgSetProperties.left = null;

	// 设置最外层div的长宽
	_thisParent.css({
		'width': windowProperties.width,
		'height': windowProperties.height
	});


	// 判断原图的宽是否大于等于窗口宽度
	if (originalWidth >= windowProperties.width) {

		// 判断原图高度是否大于等于窗口高度
		if (originalHeight >= windowProperties.height) {
			/**
			 * 原图高度大于等于窗口高度
			 * 根据设定图片的高度是否大于窗口高度，调用isimgHeightHigher()控制图片位置
			 */
			isimgHeightHigher(imgSetProperties, windowProperties, imgHeightHigher, imgHeightShorter);
		} else {
			/**
			 * 原图高度小于窗口高度
			 * 根据设定图片的高度小于窗口的高度,调用imgHeightShorter()控制图片的位置
			 */
			console.log("图够宽，图高不够高");
			imgHeightShorter(imgSetProperties, windowProperties);

		}


	} else {

		// 判断原图高度是否大于等于窗口高度
		if (originalHeight >= windowProperties.height) {
			/**
			 * 原图高度大于等于窗口高度
			 * 根据设定图片的高度大于等于窗口的高度,调用imgHeightHigher()控制图片的位置
			 */
			imgHeightHigher(imgSetProperties, windowProperties)
		} else {
			/**
			 * 原图高度小于窗口高度
			 * 根据设定图片的高度是否大于窗口高度，调用isimgHeightHigher()控制图片位置
			 */
			isimgHeightHigher(imgSetProperties, windowProperties, imgHeightHigher, imgHeightShorter);
		}

	}
	imgSetProperties = null;
};

$(window).resize(function() {
	var windowProperties = new Object();
	windowProperties.width = _w.width();
	windowProperties.height = _w.height();

	var imgSetProperties = new Object();
	imgSetProperties.height = windowProperties.width * originalHeight / originalWidth;
	imgSetProperties.width = null;
	imgSetProperties.top = null;
	imgSetProperties.left = null;

	_thisParent.css({
		'width': windowProperties.width,
		'height': windowProperties.height
	});

	if (originalWidth >= windowProperties.width) {
		if (originalHeight >= windowProperties.height) {
			isimgHeightHigher(imgSetProperties, windowProperties, imgHeightHigher, imgHeightShorter);
		} else {
			imgHeightShorter(imgSetProperties, windowProperties);
		}
	} else {
		if (originalHeight >= windowProperties.height) {
			imgHeightHigher(imgSetProperties, windowProperties)
		} else {
			isimgHeightHigher(imgSetProperties, windowProperties, imgHeightHigher, imgHeightShorter);
		}
	}
	imgSetProperties = null, windowProperties = null;
});




/**
 * [控制cycle-show字体垂直居中]
 * @param  {number} baseFontSize - html font-size;
 * @param  {number} fontHeight - cycle-show 字体大小(高度);
 * @param {number} outContainer - cycle-show 字体div高度;
 * @param {number} space - cycle-show cycle-show 字体间距;
 * @param {number} midline - cycle-show 字体div的中线位置;
 * @param {number} outContainerTop - cycle-show 字体div的top位置（垂直居中）;
 */
var cycleShowVerticalMiddle = function(windowObj) {
	var navHg = caculateNavHeight(windowObj);
	    baseFontSize = windowObj.width / 320 * baseHtmlFontSize,
		fontHeight = baseFontSize * .3,
		outContainer = fontHeight * 1.42857143,
		space = (outContainer - fontHeight) / 2,
		midline = (windowObj.height - navHg - outContainer) / 2,
		outContainerTop = midline - fontHeight / 2;
	$(".cycle-content-title").css("top", midline);

	navHg = null, baseFontSize = null, fontHeight = null, outContainer = null, space = null, midline = null, outContainerTop = null;
}

/**
 * [计算导航高度]
 * @param  {[type]} windowObj [description]
 * @return {[type]}           [description]
 */
var caculateNavHeight = function(windowObj){
	var navHeight, baseFontSize;
	// console.log(window.innerWidth);
	if(window.innerWidth>=992){
		navHeight = 70;
	}else{
		baseFontSize = windowObj.width / 320 * baseHtmlFontSize;
		navHeight = 70/baseHtmlFontSize * baseFontSize;
	}
	return navHeight;
}

var optionsSetting = function(windowObj) {
	navHg = caculateNavHeight(windowObj);
	cycleShowVerticalMiddle(windowObj,navHg);
	var imgLogo = new Image();
	imgLogo.src = $(".navbar-logo img").attr("src");
	imgLogo.onload = function() {
		console.log(navHg);
		$(".banner-sildeshow").css("top", navHg);
	}

	$("#section1").css("height", windowObj.height);
	$(".prev-button").css("top", (windowObj.height - 70) / 2 + navHg);
	$(".next-button").css("top", (windowObj.height - 70) / 2 + navHg);
	$(".mobile-navbar-collapse").css("height", windowObj.height-navHg);
}


optionsSetting(windowProperties,navHeight);

$(window).resize(function() {
	var windowProperties = new Object();
	windowProperties.width = _w.width();
	windowProperties.height = _w.height();
	// var baseFontSize = windowProperties.width / 320 * baseHtmlFontSize,
	// 	navHeight = 70 * windowProperties.width / 320;
	// 	console.log(navHeight+"aa");

	// navHeight = $('nav').height();
	// $(".banner-sildeshow").css("top", navHeight);

	optionsSetting(windowProperties,navHeight);
	console
	$(".banner-sildeshow").css("top", navHeight);

	windowProperties = null;
});











