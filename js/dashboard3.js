var dashboard3 = (function () {

    "use strict";

    // Currently selected values in the dashboard
    var selectedYear = "2007",
        selectedCountryIdx = 0,
        selectedCountry = "IBM",
        selectedMedalType = "Q1";

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
            pointClick: function(clickedPoint, clickEvent){
                selectedYear = clickedPoint.argument.substr(0,4);
                updateBarChart();
                updatePieChart();
                updateHBarChart();
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
            pointClick: function(clickedPoint, clickEvent){
                selectedCountry = clickedPoint.argument;
                for (var i=0; i < results[selectedYear].length; i++) {
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

    function createPieChart(selector) {
        $(selector).dxPieChart({
            dataSource: getTypeByCountry(selectedYear, selectedCountryIdx),
            animation: {
                duration: 350
            },
            title: {
                text: selectedCountry + " Qtly Analysis in " + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                horizontalAlignment: "right",
                verticalAlignment: "top",
                margin: 0
            },
            series: [
                {
                    type: "doughnut",
                    argumentField: "type",
                    valueField: "count",
                    label: {
                        visible: true,
                        connector: {
                            visible: true
                        }
                    }
                }
            ],
            pointClick: function(clickedPoint, clickEvent){
                console.log(clickedPoint);
                selectedMedalType = clickedPoint.argument;
                updateHBarChart();
            }
        });
    }

    function createHBarChart(selector) {
        $(selector).dxChart({
            dataSource: results[selectedYear],
            animation: {
                duration: 350
            },
            title: {
                text: selectedMedalType + ' Analysis in ' + selectedYear,
                font: {
                    size: "24px"
                }
            },
            legend: {
                visible: false
            },
            rotated: true,
            series: {
                argumentField: "Country",
                valueField: selectedMedalType,
                name: "Medals",
                type: "bar",
                color: '#ffa500'
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

    function updatePieChart() {
        var chart3 = $("#chart3").dxPieChart("instance");
        chart3.option({
            dataSource: getTypeByCountry(selectedYear, selectedCountryIdx),
            title: selectedCountry + " Qtly Analysis in " + selectedYear
        });
    }

    function updateHBarChart() {
        var chart4 = $("#chart4").dxChart("instance");
        chart4.option({
            dataSource: results[selectedYear],
            title: selectedMedalType + ' Analysis in ' + selectedYear,
            series: {
                valueField: selectedMedalType
            }

        });
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart"></div>' +
            '<div id="chart2" class="chart"></div>' +
            '<div id="chart3" class="chart"></div>' +
            '<div id="chart4" class="chart"></div>';

        $("#content").html(html);

        createLineChart('#chart1');
        createBarChart('#chart2');
        createPieChart('#chart3');
        createHBarChart('#chart4');

    }

    /* Functions to transform/format the data as required by specific charts */

    function getTypeByCountry(year, countryIdx) {
        var item = results[year][countryIdx];
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