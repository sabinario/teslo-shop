export const formatCurrency = (value: number) => {
	const formatter = new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN',
		currencyDisplay: 'symbol',
	}).format(value);

	return formatter;
};
