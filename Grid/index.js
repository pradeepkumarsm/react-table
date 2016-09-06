import React,{Component} from 'react';
import Template from './grid-template.js';
import classes from 'classnames';
import {get} from 'lodash';
import Sort from 'data-sorter';

import gridDesign from  './grid-design.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class Grid extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageNum: 0,
            showFooter: false,
            pageSize: this.props.pages[0],
            initialPosition: 0,
            dataLength: 0,
            async: false,
            totalIncidents: 0,
            sortedOrder: {}
        };
        this.selectedRows = {};
        this.sortData = this.sortData.bind(this);
        this.setParentValue = this.setParentValue.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }



    componentWillMount() {
        this.setState({
            data: this.props.data,
            showError: false,
            noData: this.props.noData
        });
        this.selectedRows = this.props.defaultValue;
        this.initializeTable(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initializeTable(nextProps);
    }

    componentDidMount(){
        this.setParentValue();
    }

    componentDidUpdate(){
        this.setParentValue();
    }

    setParentValue(){
        const {selectAllRowsOnMount, parentDetails} = this.props;

        selectAllRowsOnMount && selectAllRowsOnMount(parentDetails ? {
            parentDetails,
            selectedRows: this.selectedRows
        } : this.selectedRows);
    }

    initializeTable(props){
        var gridData = props.data,
            gridLength = gridData.length,
            async = props.async,
            currentPageNum = 0,
            paginatedData = [],
            pagination = false,
            totalIncidents = 0;

        this.selectedRows = props.defaultValue;

        if (async) {
            currentPageNum = Math.ceil(gridData.count / this.state.pageSize);
            pagination = currentPageNum ? true : false;
            paginatedData = gridData.data ? gridData.data : [];
            totalIncidents = gridData.count;
        } else {
            if (gridLength && (gridLength > this.state.pageSize)) {
                currentPageNum = Math.ceil(gridLength / this.state.pageSize);
                pagination = true;
            }
        }


        this.setState({
            data: async ? paginatedData : gridData,
            noData: props.noData,
            pageNum: currentPageNum,
            showFooter: pagination,
            initialPosition: 0,
            dataLength: gridLength,
            async: async,
            totalIncidents: totalIncidents
        });
    }

    rowOnChange(tbodyData, event){
        const {onChildRowSelect, onRowSelect, multiSelect, parentDetails} = this.props;

        const multiSelectRows = (multiSelect !== undefined) ? multiSelect : true;

        const currentRow = {[tbodyData[this.props.keyForRowSelect]]: tbodyData};

        if (event.target.checked) {
            this.selectedRows = multiSelectRows ? Object.assign({}, this.selectedRows, currentRow) : currentRow;
        } else {
            delete this.selectedRows[tbodyData[this.props.keyForRowSelect]];
        }
        onRowSelect && onRowSelect(parentDetails ? {
            parentDetails,
            selectedRows: this.selectedRows
        } : this.selectedRows);
        // onRowSelect && onRowSelect(this.selectedRows);
    }

    showColumns(tbodyData, column, rowIndex){
        var displayData;
        const {valueParam} = column.options;
        if (valueParam === 'serialNo') {
            return ++rowIndex + this.state.initialPosition;
        } else if (column.widget) {
            if (column.widget === "checkbox") {
                const {defaultValue, keyForRowSelect} = this.props;
                const checked = defaultValue && defaultValue[tbodyData[keyForRowSelect]] ? true : false;
                return <Checkbox
                    label=""
                    onCheck={this.rowOnChange.bind(null, tbodyData)}
                    name={"tableRow" + valueParam}
                    checked={checked}/>
            } else {
                const details = {element: column, data: tbodyData};
                displayData = this.props.getWidget(details);
                return displayData ? displayData : "-";
            }
        } else {
            displayData = Array.isArray(valueParam) ? get(tbodyData, valueParam) : tbodyData[valueParam];
            return displayData ? displayData : "-";
        }
    }

    setPageSize(event){
        var newPageSize = parseInt(event.target.value);
        this.setState({
            pageSize: newPageSize,
            initialPosition: 0,
            pageNum: Math.ceil(this.state.dataLength / newPageSize)
        });

        if (this.props.async) {
            this.props.onPageSizeChange(newPageSize, this.state.pageNum);
        }

    }

    getPageSize(){
        var options;
        options = this.props.pages.map(function (key, index) {
            return <option value={key} key={index}>{key}</option>
        });

        return (
            <div className="pageSizeContainer pull-left">
                <label htmlFor="pageSize">Page size: </label>
                <select id="pageSize" ref="pages" onChange={this.setPageSize}>{options}</select>
                {(this.props.async) ?
                    <span className="totalIncidents">Total Incidents : {this.state.totalIncidents} </span> : ""}
            </div>
        );

    }

    handlePageClick(data){
        if (this.props.async) {
            this.props.onPageChange(++data.selected);
        } else {
            this.setState({
                initialPosition: (data.selected * this.state.pageSize)
            })
        }
    }

    sortData(column, key, sortKey){
        var newSort,
            sortingSuccessful = false,
            sortedOrder = this.state.sortedOrder,
            currentSort = sortedOrder[key];

        if (currentSort && currentSort === "ASC") {
            newSort = "DSC";
        } else {
            newSort = "ASC";
        }

        Object.keys(sortedOrder).map(function (currentKey) {
            if (key !== currentKey)
                sortedOrder[currentKey] = "";
        });

        sortedOrder[key] = newSort;

        sortingSuccessful = (typeof(column.sortData) === "function" && column.sortData(newSort, column)) || (column.sortData && this.getSortedData(newSort, column));

        if (sortingSuccessful) {
            this.setState({
                sortedOrder: sortedOrder
            });
        }
    }

    getSortedData(sortOrder, column){
        //If column has sortKey specified then it will be considered as key for data else valueParam will be considered.
        const sortKey = column.options && (column.options.sortingKey || column.options.valueParam);
        if (sortKey) {
            var dataToSort = this.state.data;

            dataToSort = Sort.getSortedData(dataToSort, column.columnType, sortOrder, sortKey);

            this.setState({
                data: dataToSort
            });

            return true;

        } else {
            console.log("Key is not specified for the column");
            return false;
        }
    }


    getRow(option, tbodyData, rowIndex){
        const {selectAllRowsOnMount, getRowStyle, showNestedElement, keyForRowSelect, options, options : {columns, nestedElements}, style:{tHeadRowStyle, tBodyRowstyle, tdStyle, thStyle, trStyle}} = this.props;

        var tableClassNames = options.classNames ? options.classNames : {},
            column,
            optedColumns,
            rowClass,
            columnStyle = {},
            columnClasses,
            ascClass,
            descClass,
            childKeySorting,
            currentRowKey = tbodyData && tbodyData[keyForRowSelect];

        const rowStyle = Object.assign({},
            trStyle,
            (option === "header" ? tHeadRowStyle : tBodyRowstyle),
            getRowStyle ? getRowStyle(tbodyData) : {});

        if (option === "header") {
            rowClass = classes(gridDesign["sentinelDataRow"], gridDesign["heading"], tableClassNames.headerRowClass);

            optedColumns = columns.map((column, index)=> {
                let result,
                    colHeaderStyle = {},
                    key = column.id,
                    sortedOrder = this.state.sortedOrder[key];


                if (column.style) {
                    const {columnStyle, headerStyle} = column.style;
                    colHeaderStyle = Object.assign({}, thStyle, columnStyle, headerStyle);
                }

                columnClasses = classes(gridDesign["sentinelCol"], column.columnClass, {
                    "removeFlex": colHeaderStyle && colHeaderStyle.width
                });

                ascClass = classes("glyphicon" ," glyphicon-chevron-up" , {
                    [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "DSC") ? true : false
                });

                descClass = classes("glyphicon glyphicon-chevron-down", {
                    [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "ASC") ? true : false
                });

                if (column.hasChildren) {
                    let childColumnNames = Object.keys(column.childColumns),
                        childColumns,
                        childColumn,
                        childColumnClass;

                    columnClasses = classes(columnClasses, "sectionWrapper");

                    childColumns = childColumnNames.map((childKey, index) => {
                        childColumn = column.childColumns[childKey];
                        childColumnClass = classes(tableClassNames.tbodyColClass, gridDesign["sentinelCol"], {
                            "removeFlex": childColumn.width
                        }, childColumn.columnClass);

                        if (childColumn.sortData && this.state.data.length) {
                            childColumnClass = classes('cursorPointer sortingColumn', childColumnClass);
                            childKeySorting = childKey + key;
                            sortedOrder = this.state.sortedOrder[childKeySorting];

                            ascClass = classes("glyphicon glyphicon-chevron-up", {
                                [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "DSC") ? true : false
                            });

                            descClass = classes("glyphicon glyphicon-chevron-down", {
                                [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "ASC") ? true : false
                            });
                            return (<div
                                onClick={this.sortData.bind(null, childColumn, childKeySorting, childColumn.sortKey)}
                                className={childColumnClass} key={childKey}>
                                <div className={gridDesign["keyContainer"]}>
                                    <span
                                        className={gridDesign["headingText"]}>{childColumn.name ? childColumn.name : childKey} </span>
                                </div>
                                <div className="sortingIcons">
                                    <div className="sortingIconsContainer">
                                        <div className={ascClass}></div>
                                        <div className={descClass}></div>
                                    </div>
                                </div>

                            </div>)
                        } else {
                            return (<div className={childColumnClass} key={childKey}>
                                <span
                                    className={gridDesign["headingText"]}>{childColumn.name ? childColumn.name : childKey} </span>
                            </div>)
                        }


                    });
                    return (<div className={columnClasses} key={key} style={colHeaderStyle}>
                        <div className={gridDesign["sectionHeading"]}>{column.sectionHeading}</div>
                        <div className={gridDesign["sectionContainer"]}>{childColumns} </div>
                    </div>);
                }

                else if (column.sortData && this.state.data.length) {
                    columnClasses = classes(gridDesign['cursorPointer'], gridDesign['sortingColumn'], columnClasses);
                    return (
                        <div onClick={this.sortData.bind(null, column, key, column.sortKey)} className={columnClasses}
                             key={key} style={colHeaderStyle}>
                            <div className={gridDesign["keyContainer"]}>
									<span className={gridDesign["headingText"]}>
										{column.name === undefined ? key : column.name}
									</span>
                            </div>
                            <div className={gridDesign["sortingIcons"]}>
                                <div className={gridDesign["sortingIconsContainer"]}>
                                    <div className={ascClass}></div>
                                    <div className={descClass}></div>
                                </div>
                            </div>

                        </div>);
                } else {
                    return <div className={columnClasses} key={key} style={colHeaderStyle}> <span
                        className="headingText">{column.name === undefined ? key : column.name}</span> </div>
                }
            });

        } else {
            /*rowClass = classes(gridDesign["sentinelDataRow"],{
             "evenColor": (rowIndex % 2 === 0),
             "oddColor" : (rowIndex % 2 === 1)
             },  tableClassNames.tbodyRowClass);*/

            rowClass = classes(gridDesign["sentinelDataRow"], (rowIndex % 2 === 0) ? gridDesign["evenColor"] : gridDesign["oddColor"], tableClassNames.tbodyRowClass);

            //select all values
            if (selectAllRowsOnMount) {
                const currentRow = {[tbodyData[this.props.keyForRowSelect]]: tbodyData};
                this.selectedRows = Object.assign({}, this.selectedRows, currentRow);
            }

            optedColumns = columns.map((column, index) => {
                var key = column.id,
                    colDataStyle = Object.assign({}, tdStyle);

                if (column.style) {
                    const {dataStyle, columnStyle} = column.style;
                    colDataStyle = Object.assign({}, tdStyle, columnStyle, dataStyle);
                }


                columnClasses = classes(tableClassNames.tbodyColClass, gridDesign["sentinelCol"], {
                    "removeFlex": colDataStyle && colDataStyle.width
                }, column.columnClass);

                if (column.hasChildren) {
                    var childColumnNames = Object.keys(column.childColumns),
                        childColumn,
                        childColumns,
                        childColumnClass;


                    childColumns = childColumnNames.map((childKey, index) => {
                        childColumn = column.childColumns[childKey];
                        columnClasses = classes(columnClasses, "sectionWrapper");

                        childColumnClass = classes(tableClassNames.tbodyColClass, gridDesign["sentinelCol"], {
                            "removeFlex": childColumn.width
                        }, childColumn.columnClass);

                        return (<div className={childColumnClass} key={childKey}>
                            {this.showColumns(tbodyData, childColumn, rowIndex)}
                        </div>);
                    });


                }

                return (    <div className={columnClasses}
                                 key={key}
                                 style={colDataStyle}>
                        {column.hasChildren ? <div className="sectionContainer"> {childColumns} </div> :
                            <span className="tbodyText">{this.showColumns(tbodyData, column, rowIndex)}</span>}
                    </div>
                );


            });
        }


        return <div key={"grid" + rowIndex} className={rowClass} style={rowStyle}>
            {optedColumns}
            <div className="nestedElement">
                {
                    (showNestedElement && showNestedElement[currentRowKey] && nestedElements && nestedElements.length) ? nestedElements.map((element) => {
                        // element.onChildRowSelect = this.onChildRowSelect.bind(null, tbodyData, element);
                        //Passing Required Parent Properties to its children
                        const {keyForRowSelect, outputKey} = this.props;
                        element.parentDetails = {data: tbodyData, properties: {keyForRowSelect, outputKey}};
                        return this.props.getWidget({element, data: tbodyData});
                    }) : ""
                }
            </div>
        </div>;
    }

    getTableBody(){
        var data = this.state.data,
            noData = this.state.noData,
            async = this.props.async,
            sendDataToParent = this.props.paginated,
            objectKeys,
            keyData,
            outputData,
            requiredData,
            finalPosition,
            sendData = [];


        if (async && data.length) {
            outputData = data.map((data, index) => {
                return this.getRow("body", data, index);
            });
        }
        else if (data.length || Object.keys(data).length) {
            objectKeys = Object.keys(data);
            finalPosition = this.state.initialPosition + this.state.pageSize;
            requiredData = objectKeys.slice(this.state.initialPosition, finalPosition);

            if (sendDataToParent) {
                sendData = data.slice(this.state.initialPosition, finalPosition);
                sendDataToParent(sendData);
            }
            outputData = requiredData.map((key, index) => {
                keyData = data[key];
                keyData.rowKey = key;
                return this.getRow("body", keyData, index);
            });

        } else if (noData) {
            if (sendDataToParent) {
                sendDataToParent(sendData);
            }
            outputData = (
                <div className={gridDesign["noDataRow"]}>
                    Data Not Available
                </div>
            );
        }
        return outputData;
    }

    render = Template
}

Grid.defaultProps = {
    pages: [25, 50, 100, 500],
    data: [],
    async: false
};