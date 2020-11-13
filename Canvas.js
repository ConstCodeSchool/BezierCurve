class Canvas {
	constructor(param) {
		this.el = document.querySelector(param.el);
		this.context = this.el.getContext("2d");

		this.el.width = param.width;
		this.el.height = param.height;
		this.backgound = param.backgound;

		this.clear();
	}

	clear() {
		const { context } = this;

		context.beginPath();
		context.fillStyle = this.backgound;
		context.rect(0, 0, this.el.width, this.el.height);
		context.fill();
	}

	drawCircle(param) {
		const { context } = this;

		context.beginPath();
		context.arc(param.x, param.y, param.r, 0, 2 * Math.PI);

		if (param.fillStyle) {
			context.fillStyle = param.fillStyle;
			context.fill();
		}

		if (param.strokeStyle) {
			context.strokeStyle = param.strokeStyle;
			context.stroke();
		}
	}

	drawLine(param) {
		const { context } = this;

		context.beginPath();
		context.moveTo(param.x1, param.y1);
		context.lineTo(param.x2, param.y2);

		context.lineWidth = param.lineWidth ?? 1;

		if (param.strokeStyle) {
			context.strokeStyle = param.strokeStyle;
			context.stroke();
		}
	}
}
