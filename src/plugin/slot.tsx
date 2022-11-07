import * as React from 'react';
import { usePluginFillItems } from './plugin-hooks';

export type SlotProps = {
	slotId: string;
};

export const Slot = (props: SlotProps) => {
	const fillItems = usePluginFillItems({
		slotId: props.slotId,
	});

	if (!fillItems) {
		return null;
	}

	return (
		<>
			{fillItems.map((item) => (
				<item.component data-app={item.appName} />
			))}
		</>
	);
};
