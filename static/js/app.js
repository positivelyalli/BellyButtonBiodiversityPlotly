

var otuData = {};
var metadata = {};
var nameIndex = [];

function fetchData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
        otuData = getOtuData(data);
        // metadata = getMetaData(data);
        nameIndex = getNames(data);
        createDropDown(nameIndex);
        // Old Code
    console.log("fetch completed")
    });
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