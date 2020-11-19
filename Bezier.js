class Bezier {
	constructor(params) {
		this.nodes = [];
		this.step = params.step;
		this.showCtrlPoints = params.showCtrlPoints ?? true;
		this.showCtrlLines = params.showCtrlLines ?? true;
		this.part = 0;

		this.add(...params.nodes);
	}

	static getCurve(nodes, step) {
		const result = [];
		const n = nodes.length - 1;

		for (let t = 0; t <= 1; t = Math.min(1, t + step)) {
			const point = {
				x: 0,
				y: 0,
			};

			for (let k = 0; k <= n; k++) {
				const b = C(n, k) * t ** k * (1 - t) ** (n - k);
				const node = nodes[k];

				point.x += node.x * b;
				point.y += node.y * b;
			}

			result.push(point);

			if (t === 1) {
				break;
			}
		}

		return result;
	}

	add(...nodes) {
		for (const node of nodes) {
			if (!this.nodes.includes(node)) {
				this.nodes.push(node);
			}
		}
	}

	draw(canvas) {
		if (this.showCtrlPoints) {
			for (const node of this.nodes) {
				canvas.drawCircle({
					x: node.x,
					y: node.y,
					r: 5,
					fillStyle: "red",
				});
			}
		}

		if (this.showCtrlLines) {
			for (let i = 0; i < this.nodes.length - 1; i++) {
				canvas.drawLine({
					x1: this.nodes[i].x,
					y1: this.nodes[i].y,
					x2: this.nodes[i + 1].x,
					y2: this.nodes[i + 1].y,
					strokeStyle: "red",
					lineWidth: 1.5,
				});
			}
		}

		const curve = Bezier.getCurve(this.nodes, this.step);
		const curveLength = getCurveLength(curve);
		const { context } = canvas;

		context.beginPath();
		context.moveTo(curve[0].x, curve[0].y);

		for (let i = 1; i < curve.length; i++) {
			context.lineTo(curve[i].x, curve[i].y);
		}

		context.strokeStyle = "black";
		context.lineWidth = 2;
		context.setLineDash([curveLength * this.part, curveLength]);
		context.stroke();

		// for (let i = 0; i < curve.length - 1; i++) {
		// 	canvas.drawLine({
		// 		x1: curve[i].x,
		// 		y1: curve[i].y,
		// 		x2: curve[i + 1].x,
		// 		y2: curve[i + 1].y,
		// 		strokeStyle: "black",
		// 		lineWidth: 2,
		// 	});
		// }
	}

	getPointUnder(x, y) {
		for (const node of this.nodes) {
			const dist = getDist(x, y, node.x, node.y);

			if (dist <= 5) {
				return node;
			}
		}
	}
}
