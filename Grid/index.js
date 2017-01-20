import React, {Component} from 'react';
import Template from './grid-template.js';
import classes from 'classnames';
import {get, isEmpty} from 'lodash';
import Sort from 'data-sorter';

import gridDesign from  './grid-design.css';
import './grid-design.raw.css';
// import 'bootstrap/dist/css/bootstrap.css';


export default class Grid extends Component {

    constructor(props) {
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
        this.renderedRows = [];
        this.sortData = this.sortData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
        this.getColumnName = this.getColumnName.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.resetSelectedData = this.resetSelectedData.bind(this);
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

    initializeTable(props) {
        var gridData = props.data,
            gridLength = gridData.length,
            async = props.async,
            currentPageNum = 0,
            paginatedData = [],
            pagination = false,
            totalIncidents = 0;

        this.selectedRows = props.defaultValue;

        if (async) {
            currentPageNum = Math.ceil(props.count / this.state.pageSize);
            pagination = currentPageNum ? true : false;
            paginatedData = gridData ? gridData : [];
            totalIncidents = props.count;
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

    rowOnChange(tbodyData, event) {
        const {onChildRowSelect, onRowSelect, multiSelect, parentDetails, keyForRowSelect} = this.props;

        const multiSelectRows = (multiSelect !== undefined) ? multiSelect : true;

        const currentRow = {[tbodyData[keyForRowSelect]]: tbodyData};

        if (event.target.checked) {
            this.selectedRows = multiSelectRows ? Object.assign({}, this.selectedRows, currentRow) : currentRow;
        } else {
            delete this.selectedRows[tbodyData[keyForRowSelect]];
        }
        onRowSelect && onRowSelect(parentDetails ? {
            parentDetails,
            selectedRows: this.selectedRows
        } : this.selectedRows);
        // onRowSelect && onRowSelect(this.selectedRows);
    }

    resetSelectedData(){
      const {onRowSelect, parentDetails} = this.props;

      onRowSelect && onRowSelect(parentDetails ? {
          parentDetails,
          selectedRows: {}
        } : {}, false);
    }

    onSelectAll(event){
        const {keyForRowSelect, onRowSelect, parentDetails} = this.props;
        let allDataWithKeys = {};

      if (event.target.checked) {
            this.renderedRows.map((data) => {
              Object.assign(allDataWithKeys, { [data[keyForRowSelect]]: data })
            });
      }

      onRowSelect && onRowSelect(parentDetails ? {
          parentDetails,
          selectedRows: allDataWithKeys
        } : allDataWithKeys, event.target.checked);

    }

    showColumns(tbodyData, column, rowIndex) {
        var displayData;
        const {valueParam} = column.options;
        if (valueParam === 'serialNo') {
            return ++rowIndex + this.state.initialPosition;
        } else if (column.widget) {
            const details = {
                element: column,
                data: tbodyData,
                selectedRows: this.selectedRows,
                parentProperties: this.props,
                rowOnChange: this.rowOnChange.bind(this, tbodyData)
            };
            if (typeof(column.widget) === "string") {
                displayData = this.props.getWidget(details);
                if (typeof(displayData) === "number")
                    return displayData;
                return displayData ? displayData : "-";
            } else {
                const {component, componentProps} = column.widget;
                return React.createElement(component, {...details, ...componentProps}, null);
            }

        } else {
            displayData = Array.isArray(valueParam) ? get(tbodyData, valueParam) : tbodyData[valueParam];
            if (typeof(displayData) === "number")
                return displayData;
            return displayData ? displayData : "-";
        }
    }

    setPageSize(event) {
        var newPageSize = parseInt(event.target.value);
        this.resetSelectedData();
        this.setState({
            pageSize: newPageSize,
            initialPosition: 0,
            pageNum: Math.ceil(this.state.dataLength / newPageSize)
        });

        if (this.props.async) {
            this.props.onPageSizeChange({
                pageSize: newPageSize,
                pageNum: this.state.pageNum
            });
        }
    }

    getPageSize() {
        var options;
        options = this.props.pages.map(function (key, index) {
            return <option value={key} key={index}>{key}</option>
        });

        return (
            <div className={gridDesign["pageSizeContainer"]}>
                <label htmlFor="pageSize">Page size: </label>
                <select id="pageSize" onChange={this.setPageSize}>{options}</select>
                {(this.props.async) ?
                    <span className="totalIncidents">Total : {this.state.totalIncidents} </span> : ""}
            </div>
        );

    }

    handlePageClick(data) {
        const {onPageChange} = this.props;
        this.resetSelectedData();
        if (this.props.async) {
            onPageChange && onPageChange(++data.selected);
        } else {
            this.setState({
                initialPosition: (data.selected * this.state.pageSize)
            })
        }
    }

    sortData(column, key, sortKey) {
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

    getSortedData(sortOrder, column) {
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

    getColumnName(name, allProperties){
        if(typeof(name) === "string"){
            return name;
        }else{
            const {component, componentProps} = name;
            const selectAllForHeader = {
              onSelectAll: this.onSelectAll,
            };
            return React.createElement(component, {...allProperties, ...componentProps, ...selectAllForHeader});
        }
    }


    getRow(option, tbodyData, rowIndex) {
        const { selectAll, defaultValue, getRowStyle, rowEvents, showNestedElement, keyForRowSelect, options, options : { columns, nestedElements }, style:{ tHeadRowStyle, nestedElementStyle, tBodyRowstyle, tdStyle, thStyle, trStyle } } = this.props;

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
                    colHeaderStyle = thStyle ? thStyle : {},
                    key = column.id,
                    sortedOrder = this.state.sortedOrder[key],
                    columnName;

                columnName = column.name ? this.getColumnName(column.name, this.props) : "";

                if (column.style) {
                    const {columnStyle, headerStyle} = column.style;
                    colHeaderStyle = Object.assign({}, colHeaderStyle, columnStyle, headerStyle);
                }

                columnClasses = classes(gridDesign["sentinelCol"], column.columnClass, {
                    [gridDesign["removeFlex"]]: colHeaderStyle && colHeaderStyle.width
                });

                ascClass = classes(gridDesign["sortingIcon"], gridDesign["arrowUp"], {
                    [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "DSC") ? true : false
                });

                descClass = classes(gridDesign["sortingIcon"], gridDesign["arrowDown"], {
                    [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "ASC") ? true : false
                });

                if (column.hasChildren) {
                    let childColumnNames = Object.keys(column.childColumns),
                        childColumns,
                        childColumn,
                        childColumnClass,
                        childColumnHeader;

                    columnClasses = classes(columnClasses, "sectionWrapper");

                    childColumns = childColumnNames.map((childKey, index) => {
                        childColumn = column.childColumns[childKey];

                        childColumnHeader = childColumn.name ? this.getColumnName(childColumn.name) : "";

                        childColumnClass = classes(tableClassNames.tbodyColClass, gridDesign["sentinelCol"], {
                            [gridDesign["removeFlex"]]: childColumn.width
                        }, childColumn.columnClass);

                        if (childColumn.sortData && this.state.data.length) {
                            childColumnClass = classes('cursorPointer sortingColumn', childColumnClass);
                            childKeySorting = childKey + key;
                            sortedOrder = this.state.sortedOrder[childKeySorting];

                            ascClass = classes(gridDesign["sortingIcon"], gridDesign["arrowUp"], {
                                [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "DSC") ? true : false
                            });

                            descClass = classes(gridDesign["sortingIcon"], gridDesign["arrowDown"], {
                                [gridDesign["hideElement"]]: (sortedOrder && sortedOrder === "ASC") ? true : false
                            });
                            return (<div
                                onClick={this.sortData.bind(null, childColumn, childKeySorting, childColumn.sortKey)}
                                className={childColumnClass} key={childKey}>
                                <div className={gridDesign["keyContainer"]}>
                                    <span
                                        className={gridDesign["headingText"]}>{childColumnHeader} </span>
                                </div>
                                <div className={gridDesign["sortingIcons"]}>
                                    <div className={gridDesign["sortingIconsContainer"]}>
                                        <div className={ascClass}></div>
                                        <div className={descClass}></div>
                                    </div>
                                </div>

                            </div>)
                        } else {
                            return (<div className={childColumnClass} key={childKey}>
                                <span
                                    className={gridDesign["headingText"]}>{childColumnHeader} </span>
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
										{columnName}
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
                        className={gridDesign["headingText"]}>{columnName}</span>
                    </div>
                }
            });

        } else {
            /*rowClass = classes(gridDesign["sentinelDataRow"],{
             "evenColor": (rowIndex % 2 === 0),
             "oddColor" : (rowIndex % 2 === 1)
             },  tableClassNames.tbodyRowClass);*/

            rowClass = classes(gridDesign["sentinelDataRow"], (rowIndex % 2 === 0) ? gridDesign["evenColor"] : gridDesign["oddColor"], tableClassNames.tbodyRowClass);

            //select all values
            if (selectAll) {
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
                    [gridDesign["removeFlex"]]: colDataStyle && colDataStyle.width
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
                            [gridDesign["removeFlex"]]: childColumn.width
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

        let additionalParams = {};

        rowEvents && Object.keys(rowEvents).map((attachRowEvent) => {
            additionalParams[attachRowEvent] = () => rowEvents[attachRowEvent](tbodyData, rowIndex)
        });


        return <div key={"grid" + rowIndex}
                    className={rowClass}
                    {...additionalParams}
                    style={rowStyle}>
            {optedColumns}
            {
                (showNestedElement && showNestedElement[currentRowKey] && nestedElements && nestedElements.length) ? nestedElements.map((element) => {
                    // element.onChildRowSelect = this.onChildRowSelect.bind(null, tbodyData, element);
                    //Passing Required Parent Properties to its children
                    const {keyForRowSelect, outputKey} = this.props;
                    element.parentDetails = {data: tbodyData, properties: {keyForRowSelect, outputKey}};

                    let renderNestedElement;

                    if (typeof(element.widget) === "string") {
                        renderNestedElement = this.props.getWidget({element, data: tbodyData});
                    } else {
                        const {component, componentProps} = element.widget;
                        renderNestedElement = React.createElement(component, {element, data: tbodyData, ...componentProps}, null);
                    }

                    return (
                        <div style={nestedElementStyle} className={gridDesign["nestedElement"]}>
                            {renderNestedElement}
                        </div>
                    )

                }) : ""
            }
        </div>;
    }

    getTableBody() {
        var data = this.state.data,
            noData = this.state.noData,
            async = this.props.async,
            sendDataToParent = this.props.paginated,
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
        else if (data.length) {
            finalPosition = this.state.initialPosition + this.state.pageSize;
            requiredData = data.slice(this.state.initialPosition, finalPosition);

            if (sendDataToParent) {
                sendData = data.slice(this.state.initialPosition, finalPosition);
                sendDataToParent(sendData);
            }

            this.renderedRows = requiredData;
            outputData = requiredData.map((currentData, index) => {
                keyData = currentData;
                keyData.rowKey = index;
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
    async: false,
    count: 0,
    style: {},
    noData: false,
    options: {
        classNames: {
            headerRowClass: "heading",
            tbodyRowClass: "tableRow",
            tbodyColClass: "tableCol",
            tableName: "Flex-Grid"
        },
        columns: []
    }
};