class Application {
	constructor(params) {
		this.canvas = new Canvas({
			el: "canvas",
			width: 500,
			height: 500,
			backgound: "#d2d2d2",
		});

		this.mouse = new Mouse(this.canvas.el);

		this.pTimestamp = 0;

		this.container = [];
		this.tickHandlers = [];

		requestAnimationFrame((x) => this.tick(x));
	}

	tick(timestamp) {
		requestAnimationFrame((x) => this.tick(x));

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

		for (const item of this.container) {
			item.draw(this.canvas);
		}

		this.mouse.tick();
	}
}
