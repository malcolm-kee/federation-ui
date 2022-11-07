import type * as types from './types';

export type DefinePluginOptions = {
	appName: string;
	navItems?: Array<types.NavItem>;
	fillItems?: Array<types.FillItem>;
};

export const definePlugin = ({
	appName,
	navItems = [],
	fillItems = [],
}: DefinePluginOptions): types.PluginConfig => ({
	navItems: navItems.map((item) => ({
		appName,
		...item,
	})),
	fillItems: fillItems.map((item) => ({
		appName,
		...item,
	})),
});
