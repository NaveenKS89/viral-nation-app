import React from 'react';
import _ from 'lodash';
import { ReactComponent as SortIcon } from '../../assets/svg/sortdown.svg';
import { ReactComponent as SettingsIcon } from '../../assets/svg/settings.svg';
import { ReactComponent as ChevronDown } from '../../assets/svg/chevron-down.svg';
import { ReactComponent as ChevronLeft } from '../../assets/svg/chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../assets/svg/chevron-right.svg';
import Dropdown from './dropdown';

function TableContainer({
	children,
	headers,
	onSortTable,
	sortBy,
	sortOrder,
	onClickChangeRows,
	rows,
	page,
	size,
	fetchPrev,
	fetchNext,
}) {
	let options = [
		{ value: 5, label: 5 },
		{ value: 10, label: 10 },
	];

	return (
		<div className="vn-table-container">
			<table>
				<thead>
					<tr>
						{_.map(headers, (header, index) => {
							return (
								<th
									className={header.isSortable ? ' sortable' : ''}
									onClick={() => onSortTable(header.key)}
								>
									<div className="th-container">
										<span>{header.name}</span>
										{header.isSortable === true ? (
											<span
												className={
													'sort-icon' +
													(header.key === sortBy ? ' active' : '') +
													(sortOrder === 1 ? ' sort-asc' : '')
												}
											>
												<SortIcon />
											</span>
										) : (
											''
										)}
									</div>
								</th>
							);
						})}
						<th>
							<div className="th-container">
								<span className="settings-icon">
									<SettingsIcon />
								</span>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
			<div className="table-pagination-container">
				<div className="pagination-row-chooser">
					<span className="page-rows-title">Rows per page:</span>
					<Dropdown
						options={options}
						onClickOption={onClickChangeRows}
						className={'show-top'}
					>
						<span className="page-rows-right">
							<span className="">{rows}</span>
							<ChevronDown />
						</span>
					</Dropdown>
				</div>
				<div className="page-number-container">
					<span>{`${page * rows + 1} - ${
						page * rows + rows < size ? page * rows + rows : size
					}`}</span>
					<span>of {size}</span>
				</div>
				<div className="page-nav-container">
					<span onClick={fetchPrev}>
						<ChevronLeft />
					</span>
					<span onClick={fetchNext}>
						<ChevronRight />
					</span>
				</div>
			</div>
		</div>
	);
}

export default TableContainer;
