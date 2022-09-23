import { ISize } from '../../interfaces';
import { Box, Button } from '../../shared/material-components';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
}

export const ProductSizeSelector = ({ selectedSize, sizes }: Props) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button
					key={size}
					size='small'
					color={selectedSize === size ? 'primary' : 'info'}
				>
					{size}
				</Button>
			))}
		</Box>
	);
};
