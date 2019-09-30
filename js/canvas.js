(function () {
	let canvasv = document.getElementById('contentv');
	let canvas = canvasv.getElementsByTagName('canvas')[0];
	let ctx = null;
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		window.requestAnimationFrame(main);
	}

	function main() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		window.requestAnimationFrame(main);
	}

	/**
	 * 圆角矩形
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} h 高度
	 * @param {number} w 宽度
	 * @param {number} r 圆角半径
	 */
	function rectRound(ctx, x, y, h, w, r) {
		const a = Math.PI / 2;
		if (h < 2 * r) r = h / 2;
		if (w < 2 * r) r = w / 2;
		let x0 = x + r, x1 = x + w - r, x2 = x + w,
			y0 = y + r, y1 = y + h - r, y2 = y + h;
		ctx.beginPath();
		ctx.moveTo(x, y0);
		ctx.arc(x0, y0, r, 2 * a, -a, false);
		ctx.lineTo(x1, y);
		ctx.arc(x1, y0, r, -a, 0, false);
		ctx.lineTo(x2, y1);
		ctx.arc(x1, y1, r, 0, a, false);
		ctx.lineTo(x0, y2);
		ctx.arc(x0, y1, r, a, 2 * a, false);
		ctx.closePath();
	}

	/**
	 * 四芒星群
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} w 宽度
	 * @param {number} h 高度
	 * @param {number} r 星芒半径
	 * @param {number} n 数量
	 */
	function star4s(ctx, x, y, w, h, r, n) {
		const x0 = x + r, y0 = y + r,
			x1 = x + w - r, y1 = y + h - r;
		for (let i = 0; i < n; i++) {
			star4(ctx, Math.floor(randomInt(x0, x1)), Math.floor(randomInt(y0, y1)), r, '#ffffff');
		}
	}

	/**
	 * 四芒星
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} x 中心 X 坐标
	 * @param {number} y 中心 Y 坐标
	 * @param {number} r 星芒半径
	 * @param {string} c 颜色
	 */
	function star4(ctx, x, y, r, c) {
		ctx.save();
		// 横向星芒
		ctx.strokeStyle = newCLG(x, y, true);
		ctx.beginPath();
		ctx.moveTo(x - r, y);
		ctx.lineTo(x + r, y);
		ctx.stroke();
		// 纵向星芒
		ctx.strokeStyle = newCLG(x, y, false);
		ctx.beginPath();
		ctx.moveTo(x, y - r);
		ctx.lineTo(x, y + r);
		ctx.stroke();
		ctx.restore();

		/**
		 * 横纵星芒渐变
		 * @param {number} x 中心 X 坐标
		 * @param {number} y 中心 Y 坐标
		 * @param {boolean} isH true 为横向，false 为纵向
		 */
		function newCLG(x, y, isH) {
			let clg = isH ? ctx.createLinearGradient(x - r, y, x + r, y) : ctx.createLinearGradient(x, y - r, x, y + r);
			clg.addColorStop(0, 'rgba(0,0,0,0)');
			clg.addColorStop(0.5, c);
			clg.addColorStop(1, 'rgba(0,0,0,0)');
			return clg;
		}
	}

	/**
	 * 正五角星
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} x 中心 X 坐标
	 * @param {number} y 中心 Y 坐标
	 * @param {number} r 半径
	 * @param {number} a 旋转弧度，正为右旋，负为左旋
	 */
	function star5p(ctx, x, y, r, a = 0) {
		let a0 = a - Math.PI / 2;
		const a1 = Math.PI / 10;
		const a2 = Math.PI / 2 - a1;
		const d = Math.abs(r / 2 / Math.sin(a1));
		let tx = x + r * Math.cos(a0),
			ty = y + r * Math.sin(a0);
		ctx.beginPath();
		ctx.moveTo(tx, ty);
		for (let i = 0; i < 9; i++) {
			if (i == 0) {
				a0 += Math.PI - a1;
			} else if (i % 2) {
				a0 -= a2;
			} else {
				a0 += Math.PI - a1 * 2;
			}
			tx += d * Math.cos(a0);
			ty += d * Math.sin(a0);
			ctx.lineTo(tx, ty);
		}
		ctx.closePath();
	}

	/**
	 * 正多边形
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x 中心 X 坐标
	 * @param {number} y 中心 Y 坐标
	 * @param {number} r 半径
	 * @param {number} n 边数
	 * @param {number} a 旋转角度
	 */
	function regularPolygon(ctx, x, y, r, n, a = 0) {
		const a1 = Math.PI * 2 / n;
		let a0 = a - Math.PI / 2;
		let tx = Math.cos(a0) * r + x,
			ty = Math.sin(a0) * r + y;
		ctx.beginPath();
		ctx.moveTo(tx, ty);
		for (let i = 0; i < n; i++) {
			a0 += a1;
			tx = r * Math.cos(a0) + x;
			ty = r * Math.sin(a0) + y;
			ctx.lineTo(tx, ty);
		}
		ctx.closePath();
	}

	/**
	 * 范围内随机浮点数
	 * @param {number} a 最小值
	 * @param {number} b 最大值
	 */
	function randomInt(a, b) {
		return Math.random() * (b - a) + a;
	}
})();