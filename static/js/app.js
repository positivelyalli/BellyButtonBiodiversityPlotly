

var otuData = {};
var metadata = {};
var nameIndex = [];

function fetchData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
        
        // Populate the dropdown
        nameIndex = getNames(data);
        createDropDown(nameIndex);

        // FilteredOtuData
        // var selectedID = d3.select(#drop-down)
        // var filteredData = ....filter(selectedID =>)

        // Populate Metadata
        // keep in mind key-value pairs
        // createMetaData(filteredData)
        updateDemoInfo(data.metadata[0]);

        
      
        // plots data
        otuData = getOtuData(data);
        console.log(otuData);
    console.log("fetch completed")
    });
}

function getFilteredData(data, selectedSubjectID) {
    var filteredData = data.metadata.filter(function(nameID){
        return nameID.id == inputValue; // there is an id that is an integer and one is a string
    });
    console.log(filteredData);
    return filteredData;
}



function getOtuData(data) {
    // path for json data object
    var queryUrl = 'samples.json';
    // get json data object
    d3.json(queryUrl).then(function(data) {
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
    var x = [163, 126, 113, 78, 71, 51, 50, 47, 40, 40];
    var y = [
        'OTU 1167', 
        'OTU 2859', 
        'OTU 482', 
        'OTU 2264', 
        'OTU 41', 
        'OTU 1189', 
        'OTU 352', 
        'OTU 189', 
        'OTU 2318', 
        'OTU 1977'
    ];
    var text = [
        "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", 
        "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", 
        "Bacteria", 
        "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI", 
        "Bacteria", 
        "Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", 
        "Bacteria", 
        "Bacteria", 
        "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Anaerococcus", 
        "Bacteria;Firmicutes;Clostridia;Clostridiales"
    ];
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


function js_getMetaData(data) {
    var dataTable = d3.select("#sample-metadata");
    Object.entries(data).forEach(([key, value]) => {
        dataTable.append('li').text(`${key}, ${value}`);
    });
}

// Creates a Demographic Chart from a 'Data' object,
// primarily uses data.metadata as source
function createDemoChart(data) {
    var dataTable = d3.select("#sample-metadata");

    // itterates through the metadata array
    data.metadata.forEach(function(item, index) {

        // converts the item object to a string
        // var text = `${index}, ${item} \t\t`;
        var text = '';

        Object.keys(item).forEach(function(key){
            text += `${key} :: ${item[key]}, \t`;
        });

        // appends the completed item to the array
        dataTable.append('li').text(text);
    })
}

// takes a metadata item and renders the demographic info box
function updateDemoInfo(metadataItem){
    var dataTable = d3.select("#sample-metadata");

    Object.keys(metadataItem).forEach(function(key){
        dataTable.append('li').text( `${key}: ${metadataItem[key]}`)
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
    console.log("optionChanged", nameID);
    filteredData = getFilteredData(nameID);
    getMetaData(filteredData);

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
    xaxis: { title: "Sample Values"}
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