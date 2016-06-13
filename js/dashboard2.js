var dashboard2 = (function () {

    "use strict";

    // Currently selected values in the dashboard
    var selectedYear = "2007";

    /* Functions to create the individual charts involved in the dashboard */

    function createLineChart(selector) {
        $(selector).dxChart({
            dataSource: summary1,
            animation: {
                duration: 350
            },
            commonSeriesSettings: {
                argumentField: "year"
            },
            series: [
                { valueField: "IBM", name: "IBM" },
                { valueField: "AT & T", name: "AT & T" },
                { valueField: "BofA", name: "BofA" },
                { valueField: "J & J", name: "J & J" },
                { valueField: "HP", name: "HP" },
                { valueField: "P&G", name: "P&G" },
                { valueField: "Walmart", name: "Walmart" },
                { valueField: "Cocacola", name: "Cocacola" },
                { valueField: "Pepsi Co", name: "Pepsi Co" },
                { valueField: "Walt Disney", name: "Walt Disney" }
            ],
            argumentAxis: {
                grid: {
                    visible: true
                }
            },
            tooltip: {
                enabled: true
            },
            title: {
                text: "Company's Listed shares over years",
                font: {
                    size: "24px"
                }
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            },
            commonPaneSettings: {
                border: {
                    visible: true,
                    right: false
                }
            },
            pointClick: function(clickedPoint, clickEvent){
                selectedYear = clickedPoint.argument.substr(0,4);
                updatePieChart();
            }
        });
    }

    function createPieChart(selector) {
        $(selector).dxPieChart({
            dataSource: results1[selectedYear],
            animation: {
                duration: 350
            },
            title: {
                text: "Company's Listed shares in" + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                horizontalAlignment: "left",
                verticalAlignment: "bottom",
                margin: 0
            },
            series: [
                {
                    type: "doughnut",
                    argumentField: "Country",
                    valueField: "Total",
                    label: {
                        visible: true,
                        connector: {
                            visible: true
                        }
                    }
                }
            ]
        });
    }

    /* Functions to update individual charts when their underlying dataset changes */

    function updatePieChart() {
        var chart2 = $("#chart2").dxPieChart("instance");
        chart2.option({
            dataSource: results1[selectedYear],
            title: "Company's Listed shares in" + selectedYear
        });
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart2"></div>' +
            '<div id="chart2" class="chart2"></div>';

        $("#content").html(html);

        createLineChart('#chart1');
        createPieChart('#chart2');

    }

    /* Functions to transform/format the data as required by specific charts */

    function getTypeByCountry(year, countryIdx) {
        var item = results1[year][countryIdx];
        return [
            {'type': 'Q1', 'count': item.Q1},
            {'type': 'Q2', 'count': item.Q2},
            {'type': 'Q3', 'count': item.Q3},
            {'type': 'Q4', 'count': item.Q4}
        ];
    }

    return {
        render: render
    }

}());