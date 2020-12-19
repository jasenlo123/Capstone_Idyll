# Capstone - Front-End Web Development

Hello! This repository contains the front-end web development code for this [interactive project](https://jasenlo123.github.io/Capstone_Idyll/) about the editorial shifts of the South China Morning Post following an acquistion by Alibaba in 2016. This web app is written using [Idyll](https://idyll-lang.org/), [d3.js](https://d3js.org/), and [React.js](https://reactjs.org/) frameworks, in addition to vanilla JS and CSS. Please review the following sections if you're curious about the different parts that make up this project!

## Where is the index.html? 
This interactive uses Idyll-lang, a markup language and toolkit for writing interactive articles. Find out more about this awesome framework [here](https://idyll-lang.org/). Please view the ```index.idyll``` file to read the markdown text of this interactive. The build folder contains the actual ```index.html```, which is complied by Idyll similarly to how a typical React app is complied.

## Components (D3 Visualisations + React)
This folder contians the d3.js interactive charts that are featured in the piece. In addition, there is also a ```quote.js``` component which was written using React, which cycles through quotes that were made by relevant individuals.

## Data
This folder contains all of the compiled data that is used in the interactive. Not all of the data is used directly, and are included here to show the intermediate steps of data formatting.

1. ```china_colab.csv``` contians the sentiment results (scored from 0 for negative to 1 for positive) on articles about China that from this [Colab Notebook](https://colab.research.google.com/drive/1h23ZIYabZ5Wb3NB-jH9LF8hZgpDGBFXf#scrollTo=07cy4zCVM_Ub) .
2. ```china_sentiment_data.csv``` contains the sentiment results aggregated by month, that is depicted in the sentiment line chart.
3. ```quotes.csv``` contains the quotes that are used by the ```quote.js``` component, urls to where the quotes can be found found, the person who made the quote, their position, and the content of the quote itself.
4. ```ratio_data.csv``` contains the ratio of China articles against Hong Kong articles aggregated yearly.
5. ```sample_data.csv``` contains a random selection of article data that was scraped and shown in a table for the audience to be familiarised.
6. ```tagged_data.json``` contains data of the quantities of tags for the news articles aggregated by month in a json object. NOT USED.
7. ```tagged_observable.csv``` contains data of the data of the quantities of tags for the news articles aggregated by month in a csv. This was converted into ```tagged_data.json``` using Observable. 
