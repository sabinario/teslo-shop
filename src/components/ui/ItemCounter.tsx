import {
	AddCircleOutline,
	Box,
	IconButton,
	RemoveCircleOutline,
	Typography,
} from 'shared';

interface Props {
	currentQuantity: number;
	onQuantityChange: (newQuantity: number) => void;
	maxValue: number;
	inStock?: boolean;
}

export const ItemCounter = ({
	currentQuantity,
	onQuantityChange,
	maxValue,
	inStock = false,
}: Props) => {
	const removeItem = () => {
		if (currentQuantity === 1) return;
		onQuantityChange(currentQuantity - 1);
	};

	const addItem = () => {
		if (currentQuantity === maxValue) return;
		onQuantityChange(currentQuantity + 1);
	};

	return (
		<Box display='flex' alignItems='center'>
			<IconButton
				onClick={removeItem}
				disabled={currentQuantity === 1 || inStock}
			>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>
				{currentQuantity}
			</Typography>
			<IconButton
				onClick={addItem}
				disabled={currentQuantity === maxValue || inStock}
			>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
