import { ISize } from 'interfaces';
import { Box, Button } from 'shared/material-components';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
	inStock: boolean;
	onSelectSize: (size: ISize) => void;
}

export const ProductSizeSelector = ({
	selectedSize,
	sizes,
	onSelectSize,
	inStock,
}: Props) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button
					disabled={inStock}
					key={size}
					size='small'
					color={selectedSize === size ? 'primary' : 'info'}
					onClick={() => onSelectSize(size)}
					sx={{
						mr: 1,
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
