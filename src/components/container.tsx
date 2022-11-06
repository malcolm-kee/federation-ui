import cx from 'classnames';
import * as React from 'react';
import styles from './container.module.css';

export const Container = (props: React.ComponentPropsWithoutRef<'div'>) => {
	return <div {...props} className={cx(styles.container, props.className)} />;
};
