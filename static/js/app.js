// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    
    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = data.metadata.filter(item => item.id == sample);
    filteredMetadata = filteredMetadata[0];
    

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    console.log("Panel:", panel);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    // code adapted from ChatGPT
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
      console.log(panel);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

    // Filter the samples for the object with the desired sample number
    let filteredSamples = data.samples.filter(item => item.id == sample);
    filteredSamples = filteredSamples[0];
    console.log("Filtered samples:", filteredSamples);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSamples.otu_ids;
    let otu_labels = filteredSamples.otu_labels;
    let sample_values = filteredSamples.sample_values;
    console.log("OTU IDs:", otu_ids);
    console.log("OTU Labels:", otu_labels);
    console.log("Sample Values:", sample_values);

    //Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      type: "bubble-chart",
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };
    
    let bubbleData = [trace1];
    console.log("Bubble Chart Data:", bubbleData);

    let layout1 = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"},
      showlegend: false
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, layout1);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // let yticks = otu_ids.map(otu_id => "OTU ${otu_id}"); -----------------------------------check on this, credit comment
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();

    // Don't forget to slice and reverse the input data appropriately
    let top10_otu_ids = otu_ids.slice(0, 10).reverse();
    let top10_otu_labels = otu_labels.slice(0, 10).reverse();
    let top10_sample_values = sample_values.slice(0, 10).reverse();
    console.log("Top 10 OTU IDs:", top10_otu_ids);
    console.log("Top 10 OTU Labels:", top10_otu_labels);
    console.log("Top 10 Sample Values:", top10_sample_values);

    // Build a Bar Chart
    let trace2 = {
      x: top10_sample_values,
      y: yticks,
      text: top10_otu_labels,
      type: "bar",
      orientation: "h"
    };

    let barData = [trace2];
    console.log("Bar Chart Data:", barData);

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"}
    };
    
    // Render the Bar Chart
    Plotly.newPlot("bar", barData, layout2)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      dropdown.append("option")
              .text(sample)
              .property("value", sample);
    });

    // Get the first sample from the list
    let samples = sampleNames[0]

    // Build charts and metadata panel with the first sample
    buildMetadata(samples)
    buildCharts(samples)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();
