class Mouse {
	constructor(el) {
		this.x = 0;
		this.y = 0;

		this.left = false;
		this.pLest = false;

		this.over = false;
		this.el = el;
		this.click = false;

		this.el.addEventListener("mouseenter", (e) => this.mouseenterHandler(e));
		this.el.addEventListener("mouseout", (e) => this.mouseoutHandler(e));
		this.el.addEventListener("mousemove", (e) => this.mousemoveHandler(e));

		this.el.addEventListener("mousedown", (e) => this.mousedownHandler(e));
		this.el.addEventListener("mouseup", (e) => this.mouseupHandler(e));
	}

	tick() {
		this.click = !this.pLeft && this.left;
		this.pLeft = this.left;
	}

	mouseenterHandler(event) {
		this.over = true;
	}

	mouseoutHandler(event) {
		this.over = false;
	}

	mousemoveHandler(event) {
		const rect = this.el.getBoundingClientRect();

		this.x = event.clientX - rect.left;
		this.y = event.clientY - rect.top;
	}

	mousedownHandler(event) {
		if (event.button === 0) {
			this.left = true;
		}
	}

	mouseupHandler(event) {
		if (event.button === 0) {
			this.left = false;
		}
	}
}
