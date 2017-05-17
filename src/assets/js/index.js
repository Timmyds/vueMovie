(function () {
	//初始化变量
	var canvas = document.querySelector("#mainSearchCanvas"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = { x: 0, y: 0 },
		radius = 1;

	//颜色变量数组
	var colors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

	var mainSearchCanvasText = 'MOVIE';

	var ww;
	var wh;

	var canvasResizeDelay;

	//颗粒函数（处理图像数据）
	function Particle(x, y) {
		this.x = Math.random() * ww;
		this.y = Math.random() * wh;
		this.dest = {
			x: x,
			y: y
		};
		this.r = Math.random() * 5 + 2;                      //随机半径（颗粒大小）
		this.vx = (Math.random() - 0.5) * 20;
		this.vy = (Math.random() - 0.5) * 20;
		this.accX = 0;
		this.accY = 0;
		this.friction = Math.random() * 0.05 + 0.94;          //随机摩擦力（缓冲的动画效果）
		this.color = colors[Math.floor(Math.random() * 6)];   //随机颜色
	}

	//颗粒原型
	Particle.prototype.render = function () {

		this.accX = (this.dest.x - this.x) / 1000;
		this.accY = (this.dest.y - this.y) / 1000;
		this.vx += this.accX;
		this.vy += this.accY;
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.x += this.vx;
		this.y += this.vy;

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
		ctx.fill();

		var a = this.x - mouse.x;
		var b = this.y - mouse.y;

		var distance = Math.sqrt(a * a + b * b);
		if (distance < (radius * 70)) {
			this.accX = (this.x - mouse.x) / 100;
			this.accY = (this.y - mouse.y) / 100;
			this.vx += this.accX;
			this.vy += this.accY;
		}
	}

	//鼠标移动函数
	function onMouseMove(e) {
		mouse.x = e.clientX - getElementLeft(canvas);
		mouse.y = e.clientY - getElementTop(canvas);
	}

	//触摸移动函数 暂时不用
	function onTouchMove(e) {
		//touches 多点触摸数组
		if (e.touches.length > 0) {
			mouse.x = e.touches[0].clientX;
			mouse.y = e.touches[0].clientY;
		}
	}

	//触摸结束函数 暂时不用
	function onTouchEnd(e) {
		mouse.x = -9999;
		mouse.y = -9999;
	}

	//初始化函数
	function initScene() {
		if (getStyle(canvas, 'display') === 'none') {
			return;
		}
		ww = canvas.width = canvas.offsetParent.offsetWidth;
		wh = canvas.height = canvas.offsetParent.offsetHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);   //清空 Canvas

		ctx.font = "bold " + (wh / 2) + "px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(mainSearchCanvasText, ww / 2, wh / 2.3);

		var data = ctx.getImageData(0, 0, ww, wh).data;    //获取图像数据
		ctx.clearRect(0, 0, canvas.width, canvas.height);   //清空 Canvas
		ctx.globalCompositeOperation = "screen";

		particles = [];
		for (var i = 0; i < ww; i += Math.round(ww / 150)) {
			for (var j = 0; j < wh; j += Math.round(ww / 150)) {
				if (data[((i + j * ww) * 4) + 3] > 150) {
					particles.push(new Particle(i, j));      //将图像数据经过 Particle 函数处理后 push 到 particles 数组中
				}
			}
		}
		amount = particles.length;                          //获得 particles 的长度
	}

	//鼠标点击事件（点击一次 radius++ 当 radius === 5 时，radius = 0）
	function onMouseClick() {
		radius++;
		if (radius === 5) {
			radius = 0;
		}
	}

	//渲染函数
	function render(a) {
		requestAnimationFrame(render);
		ctx.clearRect(0, 0, canvas.width, canvas.height);   //清空 Canvas
		for (var i = 0; i < amount; i++) {
			particles[i].render();                          //循环 particles 数组渲染
		}
	};

	function resizeDelay() {
		clearTimeout(canvasResizeDelay);
		canvasResizeDelay = setTimeout(initScene, 200);
	}

	//监听事件
	window.addEventListener("resize", resizeDelay);           //可视窗口改变
	window.addEventListener("mousemove", onMouseMove);      //鼠标移动
	canvas.addEventListener("click", onMouseClick);         //点击
	initScene();                                            //初始化
	requestAnimationFrame(render);                          //循环渲染

})();
//瀑布流布局
(function () {
	var mainContentCol;//列数
	var ww = window.innerWidth;
	switch (ww) {
		case ww >= 1200:
			mainContentCol = 6;
			break;
		case ww >= 992:
			mainContentCol = 4;
			break;
		case ww >= 768:
			mainContentCol = 3;
			break;
		default:
			mainContentCol = 2;
			break;
	}
})();
