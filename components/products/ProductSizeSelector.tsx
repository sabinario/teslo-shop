import { ISize } from '../../interfaces';
import { Box, Button } from '../../shared/material-components';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	onSelectSize: (size: ISize) => void;
}

export const ProductSizeSelector = ({
	selectedSize,
	sizes,
	onSelectSize,
}: Props) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button
					key={size}
					size='small'
					color={selectedSize === size ? 'primary' : 'info'}
					onClick={() => onSelectSize(size)}
					sx={{
						':hover': {
							backgroundColor: `${selectedSize === size && 'secondary.main'}`,
						},
					}}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};
