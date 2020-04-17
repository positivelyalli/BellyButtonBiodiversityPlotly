

var otuData = {};
var metadata = {};
var nameIndex = [];

function fetchData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
        
        // Populate the dropdown
        nameIndex = getNames(data);
        createDropDown(nameIndex);

        // get filtered data:
        // var selectedID = d3.select(#drop-down)
        // var filteredData = ....filter(selectedID =>)

        // Populate Metadata
        // keep in mind key-value pairs
        //createMetaData(filteredData);

        
      
        // plots data
        otuData = getOtuData(data);
    console.log("fetch completed")
    });
}

function getFilteredData(data, inputValue) {
    var filteredData = data.metadata.filter(nameID => nameID.id == inputValue);
    console.log(filteredData);
    return filteredData;
}

function getOtuData(data) {
    var sample_values = data.samples.sample_values;
    console.log(sample_values);

    var otu_ids = data.samples.otu_ids;
    console.log(otu_ids);

    var otu_labels = data.samples.otu_labels; 
    console.log(otu_labels);
    return {
        "sample_values": sample_values,
        "otu_ids": otu_ids,
        "otu_labels": otu_labels
    };
}

function getNames(data) {
    return data.names;
}



function createMetaData(data) {
    var dataTable = d3.select("#sample-metadata");
    Object.entries(data).forEach(([key, value]) => {
        dataTable.append().text(key,value);
    });
}

// var frequencyCounts = counter(value);
//   Object.entries(frequencyCounts).forEach(([key, value]) => {
//     var li = output.append("li").text(`${key}: ${value}`);
//   });


// Populate the dropdown with names array
function createDropDown(ids) {
    // select dropdown by id
    var dropdown = d3.select("#selDataset");
    ids.forEach(function (item, index){
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

function optionChanged(nameID) {

    filteredData = getFilteredData(nameID);
    createMetaData(filteredData);

    // createPlots(filteredData);
    // createBarPlot(filteredData);
    // createBubblePlot(filteredData);

}

// @TODO Bar Chart
// samples_values as values for bar_chart

// otu_ids as labels for bar chart

// otu_lables as the hovertext for the bar chart



// @TODO Bubble Chart
//Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.


// @TODO Demographic Info
// Display the metadata; an individual's demographic info
// Display each key-value pair from the metadata JSON object somewhere on the page

// Update allthe plots using a dropdown anytime a new sample is selected