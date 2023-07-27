import React from 'react';
import { ReactComponent as TableIcon } from '../../assets/svg/list.svg';
import { ReactComponent as CardIcon } from '../../assets/svg/board.svg';

function ToggleView({ onViewChange, activeView }) {
	return (
		<div className="vn-toggle-view-container">
			<div
				className={'vn-toggle-view-item' + (activeView === 'card' ? ' active' : '')}
				onClick={() => activeView !== 'card' && onViewChange('card')}
			>
				<CardIcon />
			</div>
			<div
				className={'vn-toggle-view-item' + (activeView === 'table' ? ' active' : '')}
				onClick={() => activeView !== 'table' && onViewChange('table')}
			>
				<TableIcon />
			</div>
		</div>
	);
}

export default ToggleView;
