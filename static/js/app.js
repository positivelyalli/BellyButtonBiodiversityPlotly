

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
        // createMetaData(filteredData)
        getMetaData(data);

        
      
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
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
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
    });
}

function getNames(data) {
    return data.names;
}



function getMetaData(data) {
    var dataTable = d3.select("#sample-metadata");
    Object.entries(data).forEach(([key, value]) => {
        var li = dataTable.append('li').text(`${key}, ${value}`);
    });
}
 
function getMetaData(data) {
    var dataTable = d3.select("#sample-metadata");
    data.forEach(function(item, index) {
        dataTable.append('li').text(item, item);
    })
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
    getMetaData(filteredData);

    // createPlots(filteredData);
    // createBarPlot(filteredData);
    // createBubblePlot(filteredData);

}

// @TODO Bar Chart
// sample_values as values for bar_chart

// otu_ids as labels for bar chart

// otu_lables as the hovertext for the bar chart

// function createBarPlot() {
    // d3.json(queryUrl).then(function(data){
        var sample_values
        
        var trace1 = {
            //   x: otuData.samples.sample_values,
            //   y: otuData.samples.otu_ids,
                x: ["beer", "wine", "martini", "margarita",
                "ice tea", "rum & coke", "mai tai", "gin & tonic"],
                y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],   
                type: "bar",
                // text: otuData.samples.otu_labels
            };
        
        var data = [trace1];
        
        var layout = {
        title: "'Bar' Chart",
        xaxis: { title: "Drinks"},
        yaxis: { title: "% of Drinks Ordered"}
        };
    
        Plotly.newPlot("bar", data, layout);
    // });

// }




// @TODO Bubble Chart
//Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      opacity: [1, 0.8, 0.6, 0.4],
      size: [40, 60, 80, 100]
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Marker Size and Color',
    showlegend: false,
    height: 800,
    width: 800
  };
  
  Plotly.newPlot('bubble', data, layout);


// @TODO Demographic Info
// Display the metadata; an individual's demographic info
// Display each key-value pair from the metadata JSON object somewhere on the page

// Update allthe plots using a dropdown anytime a new sample is selected