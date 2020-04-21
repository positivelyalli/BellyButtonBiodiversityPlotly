

var otuData = {};
var metadata = {};
var nameIndex = [];

function fetchData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function (data) {

        // Populate the dropdown
        nameIndex = getNames(data);
        createDropDown(nameIndex);

        // Populate Metadata for an individual
        // keep in mind key-value pairs
        updateDemoInfo(data.metadata[0]);

        // plots data
        otuData = getOtuData(data);
        console.log(otuData);
        console.log("fetch completed")
    });
}

// takes data and filters it based on the id from the dropdown
function getFilteredData(data, inputValue) {
    // filters the metadata based on the id from the dropdown
    var filteredData = data.metadata.filter(function (individual) {
        return individual.id == parseInt(inputValue); // there is an id that is an integer and one is a string
    });
    console.log(filteredData);
    return filteredData;
}

// takes data and filters it based on the id from the dropdown
function getFilteredSampleData(data, inputValue) {
    // filters the metadata based on the id from the dropdown
    var filteredSampleData = data.sample.filter(function (individual) {
        return individual.id == parseInt(inputValue); // there is an id that is an integer and one is a string
    });
    console.log(filteredSampleData);
    return filteredData;
}


function getOtuData(data) {
    // path for json data object
    var queryUrl = 'samples.json';
    // get json data object
    d3.json(queryUrl).then(function (data) {
        // Sample value data from the first index of samples
        var sample_values = data.samples[0].sample_values;
        console.log("sample values");
        // Print sample value data from the first index of samples
        console.log(data.samples[0].sample_values)

        // OTU ids from the first index of samples
        var otu_ids = data.samples[0].otu_ids;
        // Print OTU ids from the first index of samples
        console.log(otu_ids);

        // OTU labels from the first index of samples
        var otu_labels = data.samples[0].otu_labels;
        // Print OTU labels from the first index of samples 
        console.log(otu_labels);

        // Return a js object of the data to use in the charts
        otuData = {
            "sample_values": sample_values,
            "otu_ids": otu_ids,
            "otu_labels": otu_labels
        };
    });
}

// Data filtered by top 10 and sorted descending
function filteredOtuData(otuData) {
    var x = otuData.sample_values.slice(0, 10).reverse();
    var y = otuData.otu_ids.slice(0, 10).reverse().map(function (value) {
        return "OTU " + value;
    });
    var text = otuData.otu_labels.slice(0, 10).reverse();
    return {
        "x": x,
        "y": y,
        "text": text
    }
}

// Retrieves an array of name ids from the json file
function getNames(data) {
    return data.names;
}



// takes a metadata item and renders the demographic info box
function updateDemoInfo(metadataItem) {
    var dataTable = d3.select("#sample-metadata");
    dataTable.html("");
    console.log("metadataItem: " + metadataItem[0])
    Object.keys(metadataItem).forEach(function (key) {
        dataTable.append('li').text(`${key}: ${metadataItem[key]}`)
    });
}





// Populate the dropdown with names array
function createDropDown(ids) {
    // select dropdown by id
    var dropdown = d3.select("#selDataset");
    ids.forEach(function (item, index) {
        addDropdownOption(item, item);
    });

}

function addDropdownOption(optionValue, optionText) {
    var dropdown = d3.select("#selDataset");

    //alt working version
    dropdown.append('option')           // create an option tag
        // append the option to the dropdown
        .attr('value', optionValue) // edit the option attribute
        .text(optionText);          // edit the option text

    // @todo:
    // return a reference to option
}

function test() {
    fetchData();
}

test();

// function updateDemoInfo() {
//     var demoInfo = d3.select("#sample-metadata");
//     console.log(demoInfo);

//     var dropdown = d3.select("#selDataset");
// }

// Assuming it will run after page load and after data has been fetched
function optionChanged(nameID) {
    console.log("optionChanged", nameID);

    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function (data) {
        filteredData = getFilteredData(data, nameID);
        console.log("filteredData" + filteredData);
        updateDemoInfo(filteredData[0]);
    });
    // createPlots(filteredData);
    // createBarPlot(filteredData);
    // createBubblePlot(filteredData);

}

// @TODO Bar Chart
// sample_values as values for bar_chart

// otu_ids as labels for bar chart

// otu_lables as the hovertext for the bar chart\

function test_createBarPlot() {
    var barChartData = filteredOtuData(otuData);
    createBarPlot(barChartData);
}

function createBarPlot(sample_data) {
    // d3.json(queryUrl).then(function(data){
    //     var sample_values = data.samples.sample_values


    var trace1 = {
        //   x: otuData.samples[0].sample_values,
        //   y: otuData.samples[0].otu_ids,
        x: sample_data.x,
        y: sample_data.y,
        type: "bar",
        text: sample_data.text,
        orientation: 'h'
    };

    var data = [trace1];

    var layout = {
        title: "Top 10 OTU Chart",
        xaxis: { title: "Sample Values" }
    };

    Plotly.newPlot("bar", data, layout);
    // });

}




// @TODO Bubble Chart
//Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

function test_createBubbleChart() {
    var bubbleData = otuData;
    createBubbleChart(bubbleData, 940);
}


function createBubbleChart(sample_data) {
    var trace1 = {
        x: otuData.otu_ids.map(function (id){ 
            console.log(id);
            return id;
        }),
        y: otuData.sample_values,
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: otuData.otu_ids,
            size: otuData.sample_values,
            colorscale: 'Earth'
        },
        text: otuData.otu_labels
    };

    var data = [trace1];

    var layout = {
        title: 'Marker Size and Color',
        // showlegend: false,
        // height: 800,
        // width: 800
        xaxis: { title: "Sample Values" }
    };


    Plotly.newPlot('bubble', data, layout);
}
