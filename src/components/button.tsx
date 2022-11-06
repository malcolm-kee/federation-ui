import cx from 'classnames';
import * as React from 'react';
import styles from './button.module.css';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	variant?: 'primary' | 'white';
	size?: 'default' | 'small' | 'none';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ variant = 'primary', size = 'default', ...props },
		forwardedRef
	) {
		return (
			<button
				type="button"
				{...props}
				className={cx(
					styles.btn,
					classBySize[size],
					classByVariant[variant],
					props.className
				)}
				ref={forwardedRef}
			/>
		);
	}
);

const classByVariant = {
	primary: styles.primary,
	white: styles.white,
};

const classBySize = {
	default: styles.defaultSize,
	small: styles.smallSize,
	none: '',
};
