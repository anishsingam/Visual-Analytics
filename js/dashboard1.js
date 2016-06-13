var dashboard1 = (function () {

    "use strict";

    // Currently selected values in the dashboard
    var selectedYear = "2007",
        selectedCountryIdx = 0,
        selectedCountry = "IBM";

    /* Functions to create the individual charts involved in the dashboard */

    function createLineChart(selector) {
        $(selector).dxChart({
            dataSource: summary,
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
                text: "Company's Marketvalues over years",
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
            pointClick: function (clickedPoint, clickEvent) {
                selectedYear = clickedPoint.argument.substr(0, 4);
                updateBarChart();
            }
        });
    }

    function createBarChart(selector) {
        return $(selector).dxChart({
            dataSource: results[selectedYear],
            animation: {
                duration: 350
            },
            title: {
                text: "Market Values of companies in " + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                visible: false
            },
            series: {
                argumentField: "Country",
                valueField: "Total",
                name: "Medals",
                type: "bar",
                color: '#ffa500'
            },
            pointClick: function (clickedPoint, clickEvent) {
                selectedCountry = clickedPoint.argument;
                for (var i = 0; i < results[selectedYear].length; i++) {
                    if (results[selectedYear][i]["Country"] === selectedCountry) {
                        selectedCountryIdx = i;
                        break;
                    }
                }
                updatePieChart();
                updateHBarChart();
            }
        });
    }

    /* Functions to update individual charts when their underlying dataset changes */

    function updateBarChart() {
        var chart2 = $("#chart2").dxChart("instance");
        chart2.option({
            dataSource: results[selectedYear],
            title: "Market Values of companies in " + selectedYear
        });
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart2"></div>' +
                '<div id="chart2" class="chart2"></div>';

        $("#content").html(html);

        createLineChart('#chart1');
        createBarChart('#chart2');

    }

    return {
        render: render
    }

}());