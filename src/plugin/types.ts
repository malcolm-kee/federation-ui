import type * as React from 'react';

export type NavItem = {
	label: string;
	url: string;
	priority: number;
};

export type FillItem = {
	slotId: string;
	component: React.ComponentType<{}>;
	priority: number;
};

export type Route = {
	path: string;
	component: React.ComponentType<{}>;
};

export type PluginConfig = {
	navItems: Array<NavItem & { appName: string }>;
	fillItems: Array<FillItem & { appName: string }>;
	routes: Array<Route & { appName: string }>;
};
