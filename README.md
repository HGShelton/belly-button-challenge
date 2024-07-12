In this assignment, an interactive dashboard was created to explore the Belly Button Biodiversity dataset, which catalogs microbes that colonize human navels. The dataset revealed that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

To build the interactive dashboard, the D3 library was used to read in the json data from the provided URL. This data was then used to create a horizontal bar chart of the top 10 OTUs found in a specific individual and a bubble chart to display all OTUs found in the same individual. Demographic information for the test subject was also added to the dashboard. A drop down menu containing all test subject ID numbers was created for ease of sample selection which will return the subjects information and analysis results.

Tech used: JavaScript, HTML, D3 library, Plotly, JSON

Data Sample URL: https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

Credits:
- Yash Shah - Instructor - troubleshooting visualization errors
- Daniel Ference and Zach Mason - classmates - collaboration
- ChatGPT - troubleshooting code errors
