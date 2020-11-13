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
