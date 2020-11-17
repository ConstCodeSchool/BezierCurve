const C = memorize((n, k) => factorial(n) / (factorial(k) * factorial(n - k)));

const factorial = memorize((n) => (n < 2 ? 1 : n * factorial(n - 1)));

function memorize(func) {
	const history = {};

	return function (...args) {
		const key = JSON.stringify(args);

		if (!history.hasOwnProperty(key)) {
			const result = func(...args);
			history[key] = result;
		}

		return history[key];
	};
}

function getDist(x1, y1, x2, y2) {
	return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}
