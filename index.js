var fs = require('fs')
var xml2js = require('xml2js')
var axios = require('axios')

parseData()
async function parseData() {
var inputfile = __dirname + '/restnoterat.xml'
var outputfile =  __dirname + '/restnoterat/public/supplyshortage.json'

// Reading the XML file
var data = fs.readFileSync(inputfile, 'utf8')

/*  The XML document is not well formated
    since it contains "&", solution: replace "&" to &amp;
 */
data = data.replace(/&/g, '&amp;') 
data = await axios.get('https://docetp.mpa.se/LMF/Reports/restnoteringar.xml')

// initiate parser
var parser = new xml2js.Parser();
parser.parseString(data.data, function (err, result) {
  var resultObject = {}
  // console.log(JSON.stringify(result, null, 2))
  for (var s of result.supplyshortages.supplyshortage) {
    
    // OBS: There can be more than one advice per nplid!

    // We assume that there is only one medicinalproduct per row
    var nplId = s.medicinalproducts[0].medicinalproduct[0].nplid ? s.medicinalproducts[0].medicinalproduct[0].nplid[0] : ''
    
    // We can't assume that there is only a single package per nplid
    var packs = s.medicinalproducts[0].medicinalproduct[0].packages ? s.medicinalproducts[0].medicinalproduct[0].packages[0].package : ''
    var startDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-start-date'] ? s.medicinalproducts[0].medicinalproduct[0]['forecast-start-date'][0] : ''
    var endDate = s.medicinalproducts[0].medicinalproduct[0]['forecast-end-date'] ? s.medicinalproducts[0].medicinalproduct[0]['forecast-end-date'][0] : ''
    var referenceNumber = s.referencenumber ? s.referencenumber[0] : ''
    var firstPublication = s['first-publication-date'] ? s['first-publication-date'][0] : ''
    var lastPublication = s['last-publication-date'] ? s['last-publication-date'][0] : ''
    var advice = s.advice ? s.advice[0] : ''
    var publicContact = s.publiccontactinfo ? s.publiccontactinfo[0] : ''
    var actualEndDate = s.medicinalproducts[0].medicinalproduct[0]['actual-end-date'] ? s.medicinalproducts[0].medicinalproduct[0]['actual-end-date'][0] : ''


    // if (nplId == "20040607003268") console.log(packs)

    // Check if there's more than one recommendation for a given nplid'
    // If so, push advice into existing array.
    if (resultObject[nplId]) {
      resultObject[nplId].shortages.push ({
        packs: packs,
        referenceNumber: referenceNumber,
        advice: advice,
        publicContact: publicContact,
        actualEndDate: actualEndDate,
        publicationDate: {
          firstPublication: firstPublication,
          lastPublication: lastPublication
        },
        forecastDate: {
          startDate: startDate,
          endDate: endDate
        }
      })
    }

    else {
      resultObject[nplId] = {
        nplId: nplId,
        shortages: [{
          packs: packs,
          referenceNumber: referenceNumber,
          advice: advice,
          publicContact: publicContact,
          actualEndDate: actualEndDate,
          publicationDate: {
            firstPublication: firstPublication,
            lastPublication: lastPublication
          },
          forecastDate: {
            startDate: startDate,
            endDate: endDate
          }
        }]
      }
      // if (nplId == '20040607003268') console.log(JSON.stringify(resultObject['20040607003268'], null, 2))
    }
  }

    //console.log(JSON.stringify(result, null, 2))
    // console.log(JSON.stringify(resultObject, null, 2))
  // resultObject = JSON.stringify(result, true, 2)
  //  console.log(err)
   
  
   var resultfile = fs.createWriteStream(outputfile)
   resultfile.write(JSON.stringify(resultObject))
})
}
