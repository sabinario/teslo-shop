import { Box, IconButton, Typography } from '../../shared/material-components';
import {
	AddCircleOutline,
	RemoveCircleOutline,
} from '../../shared/material-icons';

interface Props {
	currentQuantity: number;
	onQuantityChange: (newQuantity: number) => void;
	maxValue: number;
}

export const ItemCounter = ({
	currentQuantity,
	onQuantityChange,
	maxValue,
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
			<IconButton onClick={removeItem} disabled={currentQuantity === 1}>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>
				{currentQuantity}
			</Typography>
			<IconButton onClick={addItem} disabled={currentQuantity === maxValue}>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
