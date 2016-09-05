import React from 'react';
import gridDesign from  './grid-design.css';
import classes from 'classnames';
import ReactPaginate from 'react-paginate';
// import SentinelPaginate from '../pagination/sentinel-paginate';
const render = function(){
	const {options, options:{classNames}, style:{table}} = this.props;

	var gridClass = classes(gridDesign["sentinelGrid"] , (classNames && classNames.tableName)),
		showFooter = this.state.showFooter ? 'show' : 'hide',
		footerClass = classes(gridDesign["gridFooter"],showFooter);
		
	return (
			<div className={gridClass} style = {table}>
				{this.props.getAdditionalRows ? this.props.getAdditionalRows() : ""}			
				<div className={gridDesign["tableHeaderFooterWrapper"]}>
					{this.getRow("header")}
					<div className={gridDesign["tableDataContainer"]}>
						{this.getTableBody()}
					</div>
					<div className={footerClass}>
						{this.getPageSize()}
						<div className={gridDesign["paginationContainer"]}>
							<ReactPaginate previousLabel={"previous"}
										   nextLabel={"next"}
										   breakLabel={<li className="break"><a href="javascript:void(0)">...</a></li>}
										   pageNum={this.state.pageNum}
										   marginPagesDisplayed={2}
										   pageRangeDisplayed={5}
										   clickCallback={this.handlePageClick}
										   containerClassName={"pagination"}
										   subContainerClassName={"pages pagination"}
										   activeClassName={"active"} />
						</div>
						{/*<SentinelPaginate className="pull-right paginationContainer" pageNum={this.state.pageNum} handlePageClick = {this.handlePageClick} />*/}
					</div>
				</div>
			</div>
		);
}

export default render;