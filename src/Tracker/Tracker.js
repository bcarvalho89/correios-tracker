import rp from 'request-promise';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';

import { cleanString, validateSRO } from '../helpers/utils';

class Tracker {
  static request (req) {
    let objectsToTrack = req.body.objects;
    let promises = [];

    objectsToTrack = objectsToTrack.filter((item) => (
      validateSRO(item))
    );

    for (let i = 0; i < objectsToTrack.length; i++) {
      let request = {
        uri: 'https://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm',
        form: {
          objetos: objectsToTrack[i]
        },
        encoding: null,
        method: 'POST',
        headers: {}
      };

      promises.push(rp(request));
    }

    return Promise.all(promises);
  }

  static parser (data) {
    let response = [];

    data.forEach(function(element) {
      let elementCorrectEncoding  = iconv.decode(element, 'iso-8859-1');
      let $ = cheerio.load(elementCorrectEncoding);
      let events = [];

      let tableObject = $('table').find('tr');
      let trackingCode = $('.codSro').text().trim();
      let tracking = {
        trackingCode
      };

      $(tableObject).map((index, row) => {
        row = $(row).children('td').map((index, field) => $(field).html() );

        if (row[0]){
          let event = {
            status: null,
            location: null,
            date: null
          };

          let eventLocationRowRaw = row[0].split('<br>');
          let eventLocationRow = eventLocationRowRaw.map((text, index) => cleanString(text) ).filter((text) => text.length > 0 ? text : false );

          event.date = `${eventLocationRow[0]} às ${eventLocationRow[1]}`;
          event.location = eventLocationRow[2];
          event.status = cleanString($(row[1]).text());

          events.push(event);
        }

      }).toArray();

      response.push(Object.assign(tracking, events = {events}));
    });

    return response;
  }
}

export default Tracker;
