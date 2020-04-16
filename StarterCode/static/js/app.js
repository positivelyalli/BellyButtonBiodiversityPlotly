
// /**
//  * Helper function to select sample data
//  * Returns an array of values
//  * @param {array} rows
//  * @param {integer} index
//  * index 0 - id
//  * index 1 - otu_ids
//  * index 2 - sample_values
//  * index 3 - otu_labels
//  */

// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }

  
// Assign variables to samples.json
// Read sample.json

// function getOtuData() {
//     var queryUrl = 'samples.json';
//     d3.json(queryUrl).then(function(data) {
//         var sample_values = unpack(data.samples.samples_values);
//         var otu_ids = unpack(data.samples.otu_ids);
//         var otu_labels = unpack(data.samples.otu_labels);
        
//     });
// }
var otuData = {};
var metadata = {};
var nameIndex = [];

function fetchData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
        otuData = getOtuData(data);
        metadata = getMetaData(data);
        nameIndex = getNameIndex(data);

        // Old Code
    console.log("function completed")    
    });
}

function getOtuData(data) {
    var sample_values = data.samples.samples_values;
    console.log(sample_values);

    var otu_ids = data.samples.otu_ids;
    console.log(otu_ids);

    var otu_labels = data.samples.otu_labels; 
    console.log(otu_labels);
    return {
        "sample_values": samples_values,
        "otu_ids": otu_ids,
        "otu_labels": otu_labels
    };
};

function getMetaData(data) {
    var metaData_id = data.metadata.id;
    var ethnicity = data.metadata.ethnicity;
    var gender = data.metadata.gender;
    var age = data.metadata.age;
    var location = data.metadata.location;
    var bbtype = data.metadata.bbtype;
    var wfreq = data.wfreq.wfreq;

    // DOES NOT DESTROY REFERENCES
    /*
    var meta = data.metadata;
    meta.metaData_id = data.metadata.id;
    meta.wfreq = data.wfreq.wfreq;
    */

    return {
        "metaData_id": metaData_id,
        "ethnicity": ethnicity,
        "gender": 
    };
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