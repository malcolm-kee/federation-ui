import * as React from 'react';
import { Link } from 'react-router-dom';
import { usePluginNavItems } from '../plugin/plugin-hooks';
import styles from './header.module.css';

export type HeaderProps = {
	showPluginNavItems?: boolean;
};

export const Header = (props: HeaderProps) => {
	return props.showPluginNavItems ? <HeaderWithPluginItems /> : <HeaderImpl />;
};

const HeaderWithPluginItems = () => {
	const navItems = usePluginNavItems();

	return (
		<HeaderImpl>
			{navItems &&
				navItems.map((item, index) => (
					<Link to={item.url} data-app={item.appName} key={index}>
						{item.label}
					</Link>
				))}
		</HeaderImpl>
	);
};

const HeaderImpl = (props: { children?: React.ReactNode }) => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link to="/">Home</Link>
				{props.children}
			</div>
		</header>
	);
};
