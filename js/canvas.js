(function () {
	let canvasv = document.getElementById('contentv');
	let canvas = canvasv.getElementsByTagName('canvas')[0];
	//canvas.height = canvasv.height;
	//canvas.width = canvasv.width;
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d');
		main(ctx);
	}

	function main(ctx) {
		bgStar(ctx, 10, 10, 80, 80, 20, 10);
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
	 * 星星背景
	 * @param {*} ctx 
	 * @param {number} x X 坐标
	 * @param {number} y Y 坐标
	 * @param {number} w 宽度
	 * @param {number} h 高度
	 * @param {number} r 半径
	 * @param {number} num 数量
	 */
	function bgStar(ctx, x, y, w, h, r, num) {
		let defultStrokeStyle = ctx.strokeStyle;
		let clg_y = ctx.createLinearGradient(0, 0, 0, r * 2);
		let clg_x = ctx.createLinearGradient(0, 0, r * 2, 0);
		clg_0.addColorStop(0, 'rgba(0,0,0,0)');
		clg_0.addColorStop(0.5, 'rgba(0,0,0,1)');
		clg_0.addColorStop(1, 'rgba(0,0,0,0)');
		clg_1.addColorStop(0, 'rgba(0,0,0,0)');
		clg_1.addColorStop(0.5, 'rgba(0,0,0,1)');
		clg_1.addColorStop(1, 'rgba(0,0,0,0)');
		for (let i = 0; i < num; i++) {
			let tx = randomInt(x, x + w),
				ty = randomInt(y, y + h);
			console.log('star: ' + tx + ',' + ty);
			//ctx.lineWidth = 2;
			ctx.strokeStyle = clg_x;
			ctx.beginPath();
			ctx.moveTo(tx - r, ty);
			ctx.lineTo(tx + r, ty);
			ctx.stroke();
			ctx.strokeStyle = clg_y;
			ctx.beginPath();
			ctx.moveTo(tx, ty - r);
			ctx.lineTo(tx, ty + r);
			ctx.stroke();
		}
		ctx.strokeStyle = defultStrokeStyle;
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