import rp from 'request-promise';
import cheerio from 'cheerio';

import { cleanString } from './utils';

let WebSRO = {
  request: function (req) {

    let correios = {
      uri: 'http://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm',
      form: {
        objetos: req.params.code
      },
      method: 'POST',
      headers: {}
    };

    return rp(correios);
  },

  parser: function(data) {
    let $ = cheerio.load(data);
    let object = [];
    let events = [];
    let tableObject = $('table').find('tr');
    let trackingCode = $('.codSro').text().trim();
    let tracking = {
      trackingCode
    };

    $(tableObject).map(function(index, row) {
      row = $(row).children('td').map(function(index, field) {
        return $(field).html();
      });

      if (row[0]){
        let event = {
          status: null,
          location: null,
          date: null
        };

        let eventLocationRowRaw = row[0].split('<br>');
        let eventLocationRow = eventLocationRowRaw.map(function(text, index) {
          return cleanString(text);
        }).filter(function(text) {
          return text.length > 0 ? text : false;
        });

        event.date = eventLocationRow[0] + ' ' + eventLocationRow[1];
        event.location = eventLocationRow[2];
        event.status = cleanString($(row[1]).text());
        
        events.push(event);
      }

    }).toArray();

    return Object.assign(tracking, events = {events});
  }
};

module.exports = WebSRO;