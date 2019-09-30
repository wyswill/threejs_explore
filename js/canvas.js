(function () {
	let canvasv = document.getElementById('contentv');
	let canvas = canvasv.getElementsByTagName('canvas')[0];
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d');
		main(ctx);
	}

	function main(ctx) {
		star4s(ctx, 0, 0, 400, 400, 10, 100);
	}

	/**
	 * 圆角矩形
	 * @param {*} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} h 高度
	 * @param {number} w 宽度
	 * @param {number} r 圆角半径
	 */
	function rectRound(ctx, x, y, h, w, r) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.arc(x + w - r, y + r, 0, Math.PI / 2, false);
		ctx.lineTo(x + w, y + h - r);
		ctx.arc(x + w - r, y + h - r, 0, Math.PI / 2, false);
		ctx.lineTo(x + r, y + h);
		ctx.arc(x + r, y + h - r, 0, Math.PI / 2, false);
		ctx.lineTo(x, y + r);
		ctx.arc(r, r, 0, Math.PI / 2, false);
		ctx.clearPaht();
	}

	/**
	 * 四芒星群
	 * @param {*} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} w 宽度
	 * @param {number} h 高度
	 * @param {number} r 星芒半径
	 * @param {number} num 数量
	 */
	function star4s(ctx, x, y, w, h, r, num) {
		for (let i = 0; i < num; i++) {
			star4(randomInt(x + r, x + w - r), randomInt(y + r, y + h - r), r, '#ffffff');
		}
	}

	/**
	 * 四芒星
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} r 星芒半径
	 * @param {string} c 颜色
	 */
	function star4(ctx, x, y, r, c) {
		let defultStrokeStyle = ctx.strokeStyle;
		ctx.strokeStyle = newCLG(x, y, true);
		ctx.beginPath();
		ctx.moveTo(tx - r, ty);
		ctx.lineTo(tx + r, ty);
		ctx.stroke();
		ctx.strokeStyle = newCLG(x, y, false);
		ctx.beginPath();
		ctx.moveTo(tx, ty - r);
		ctx.lineTo(tx, ty + r);
		ctx.stroke();
		ctx.strokeStyle = defultStrokeStyle;

		/**
		 * 横纵星芒
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
	 * 范围内随机整数
	 * @param {number} start 最小值
	 * @param {number} end 最大值
	 */
	function randomInt(start, end) {
		return Math.floor(Math.random() * (end - start)) + start;
	}
})();