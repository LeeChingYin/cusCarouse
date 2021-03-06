var _w = $(window),
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

img.src = $('.cycle-slideshow > div > img').attr('src');

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
	imgSetProperties = null, windowProperties = null;
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

//
$("#section1").css("height", windowProperties.height);
$(".prev-button").css("top",(windowProperties.height+70)/2);
$(".next-button").css("top",(windowProperties.height+70)/2);
$(".cycle-content-title").css("top",(windowProperties.height-70)/2);
$(window).resize(function() {
	var windowProperties = new Object();
	windowProperties.height = _w.height();
	$("#section1").css("height", windowProperties.height);
	$(".prev-button").css("top",(windowProperties.height+70)/2);
	$(".next-button").css("top",(windowProperties.height+70)/2);
	$(".cycle-content-title").css("top",(windowProperties.height-70)/2);
	windowProperties = null;
});

