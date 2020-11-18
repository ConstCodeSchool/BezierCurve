class Application {
	constructor(params) {
		this.canvas = new Canvas({
			el: "canvas",
			width: 500,
			height: 500,
			backgound: "#d2d2d2",
		});

		this.mouse = new Mouse(this.canvas.el);
		this.camera = new Camera();

		this.pTimestamp = 0;

		this.container = [];
		this.tickHandlers = [];

		this.resize();
		window.addEventListener("resize", () => this.resize());

		requestAnimationFrame((x) => this.tick(x));
	}

	tick(timestamp) {
		requestAnimationFrame((x) => this.tick(x));

		if (this.mouse.delta) {
			this.camera.scale += this.mouse.delta * this.camera.scaleStep;
		}

		const diff = timestamp - this.pTimestamp;
		const secondPart = 1000 / diff;
		const fps = 1000 / diff;

		this.pTimestamp = timestamp;

		for (const tickHandler of this.tickHandlers) {
			tickHandler({
				timestamp,
				diff,
				secondPart,
				fps,
			});
		}

		this.canvas.clear();
		this.canvas.save();
		this.canvas.translate(this.camera.offsetX, this.camera.offsetY);
		this.canvas.scale(this.camera.scale);

		for (const item of this.container) {
			item.draw(this.canvas);
		}

		this.canvas.restore();

		this.mouse.tick();
	}

	resize() {
		this.canvas.el.width = window.innerWidth;
		this.canvas.el.height = window.innerHeight;
	}
}
