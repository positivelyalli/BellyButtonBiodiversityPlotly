
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

function getOtuData() {
    var queryUrl = 'samples.json';
    d3.json(queryUrl).then(function(data) {
        var sample_values = data.samples.samples_values;
        var otu_ids = data.samples.otu_ids;
        var otu_labels = data.samples.otu_labels; 
        
    });
}

function getMetaData() {
    var queryUrl = 'sample.json';
    d3.json(queryUrl).then(function(data2) {

    });
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