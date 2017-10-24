export function cleanString(string) {
  return string.replace(/(\r\n|\n|\r|\t|<(?:.|\n)*?>)/gm, '').replace(/&#xA0;/gm, ' ').trim();
}

export function validateSRO(object){
  let objectRegex = /^((BJ|NN|CF|CM|CX|ML|PL|PW|SB|TT|PE|MR|UA)[0-9]{9}|[A-Za-z]{2}[0-9]{9}[A-Za-z]{2}|[N]{2}[0-9]{11})$/;
  object = cleanString(object.toUpperCase());

  if (object.length === 0) {
    //console.log(`${object} - Object empty`);
    return false;
  } else {
    if (objectRegex.test(object)) {
      //console.log(`${object} - Object valid`);
      return true;
    } else {
      //console.log(`${object} - Object invalid`);
      return false;
    }
  }
}
