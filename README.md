# restnoterat

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Documentation

### About
The purpose with the website is that people in healthcare, pharmacy and other people easily can get an overview of medicinal prodcuts that is, has, or are expected to run out at manufacturers.

### The development of the project
The project is built with Vue using Vuex. It also contains Node.js to convert data from XML to JSON.

The data about shortage in medicinal products is coming from Läkemedelsverket in XML which is converted to JSON through Node.js. The project contains three other JSON files containing nplid, atc-code and nplpackid lexicon. Theses purpose with this lexicon-files is to translate codes to something we can read and understand without googling.

The most important data is the shortage in medicinal products and the structure of the json object is divided in each nplid containing one or several shortage periods. The other JSON files containnig information and translation into products name are later pushed into each object.

