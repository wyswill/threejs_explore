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
		ctx.lineTo(x + w - r, y); // 上边
		ctx.arc(x + w - r, y + r, 0, Math.PI / 2, false); // 右上圆角
		ctx.lineTo(x + w, y + h - r); // 右边
		ctx.arc(x + w - r, y + h - r, 0, Math.PI / 2, false); // 右下圆角
		ctx.lineTo(x + r, y + h); // 下边
		ctx.arc(x + r, y + h - r, 0, Math.PI / 2, false); // 左下圆角
		ctx.lineTo(x, y + r); // 左边
		ctx.arc(r, r, 0, Math.PI / 2, false); // 左上圆角
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
		const x0 = x + r, y0 = y + r,
			x1 = x + w - r, y1 = y + h - r;
		for (let i = 0; i < num; i++) {
			star4(ctx, randomInt(x0, x1), randomInt(y0, y1), r, '#ffffff');
		}
	}

	/**
	 * 四芒星
	 * @param {*} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
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
	 * @param {*} ctx 
	 * @param {number} x 中心 X 坐标
	 * @param {number} y 中心 Y 坐标
	 * @param {number} r 半径
	 * @param {number} a 旋转弧度，正为右旋，负为左旋
	 */
	function star5p(ctx, x, y, r, a = 0) {
		let a0 = a - Math.PI / 2;
		const a1 = Math.PI / 5;
		const a2 = Math.PI / 2 - a1;
		const d = Math.floor(Math.abs(r / Math.sin(a1)));
		let tx = Math.floor(x + r * Math.cos(a0)),
			ty = Math.floor(y - r * Math.sin(a0));
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
			tx = Math.floor(tx + d * Math.cos(a0));
			ty = Math.floor(ty - d * Math.sin(a0));
			ctx.lineTo(tx, ty);
		}
		ctx.clearPaht();
	}

	/**
	 * 范围内随机整数
	 * @param {number} a 最小值
	 * @param {number} b 最大值
	 */
	function randomInt(a, b) {
		return Math.floor(Math.random() * (b - a)) + a;
	}
})();