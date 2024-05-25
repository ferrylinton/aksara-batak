(function (window, document) {
  'use strict';

  const SYLLABLE_REGEX = /([^aeiou])*[aeiou](?:(ng)(?=[^aeiou])|([^aeiou])*$|[^aeiou](?=[^aeioug]))?/gi;

  var aksaraInput;

  var aksaraOutput;

  const INA_NI_SURAT = {
    'a': '\\0061',
    'ha': '\\0068',
    'ka': '\\0068',
    'ma': '\\006D',
    'na': '\\006E',
    'ra': '\\0072',
    'ta': '\\0074',
    'sa': '\\0073',
    'da': '\\0064',
    'ga': '\\0067',
    'ja': '\\006A',
    'ba': '\\0062',
    'nga': '\\003C',
    'la': '\\006C',
    'pa': '\\0070',
    'wa': '\\0077',
    'ya': '\\0079',
    'i': '\\0049',
    'u': '\\0055'
  }

  const ANAK_NI_SURAT = {
    'i': '\\0069',
    'o': '\\006F',
    'e': '\\0065',
    'u': '\\203A',
    'ng': '\\005E'
  }

  const INA_NI_SURAT_U = {
    'hu': '\\004B',
    'ku': '\\004B',
    'mu': '\\004D',
    'nu': '\\004E',
    'ru': '\\0052',
    'tu': '\\0054',
    'su': '\\0053',
    'du': '\\0044',
    'gu': '\\0047',
    'ju': '\\004A',
    'bu': '\\0042',
    'ngu': '\\003E',
    'lu': '\\004C',
    'pu': '\\0050',
    'wu': '\\0057',
    'yu': '\\0059'
  }

  const ONE_LETTER = {
    'a': '\\0061',
    'i': '\\0049',
    'u': '\\0055',
    'o': '\\0061 \\006F',
    'e': '\\0061 \\0065'
  }

  const FUNCTUATION = {
    '\\': '\\005C',
    '\.': '\\002A'
  }

  const CONSONANTS = ['h', 'k', 'm', 'n', 'r', 't', 's', 'd', 'g', 'j', 'b', 'ng', 'l', 'p', 'w', 'y'];

  const VOWELS = ['a', 'i', 'u', 'o', 'e'];

  function syllabify(txt) {
    if (txt.match(/^[^a-zA-Z0-9]+$/))
      return [txt]
    else
      return txt.match(SYLLABLE_REGEX);
  }

  function startWithNG3(txt) {
    if (txt[2] == 'a') {
      return INA_NI_SURAT['nga'];
    } else if (txt[2] == 'e') {
      return INA_NI_SURAT['nga'] + ANAK_NI_SURAT[txt[2]];
    } else if (txt[2] == 'o') {
      return INA_NI_SURAT['nga'] + ANAK_NI_SURAT[txt[2]];
    } else if (txt[2] == 'i') {
      return INA_NI_SURAT['nga'] + ANAK_NI_SURAT[txt[2]];
    } else if (txt[2] == 'u') {
      return INA_NI_SURAT_U['ngu'];
    }
  }

  function startWithNG4(txt) {
    if (txt[2] == 'a') {
      return INA_NI_SURAT['nga'] + INA_NI_SURAT[txt[3] + 'a'] + FUNCTUATION['\\'];
    } else if (txt[2] == 'e') {
      return INA_NI_SURAT['nga'] + INA_NI_SURAT[txt[3] + 'a'] + ANAK_NI_SURAT[txt[2]] + FUNCTUATION['\\'];
    } else if (txt[2] == 'o') {
      return INA_NI_SURAT['nga'] + INA_NI_SURAT[txt[3] + 'a'] + ANAK_NI_SURAT[txt[2]] + FUNCTUATION['\\'];
    } else if (txt[2] == 'i') {
      return INA_NI_SURAT['nga'] + INA_NI_SURAT[txt[3] + 'a'] + ANAK_NI_SURAT[txt[2]] + FUNCTUATION['\\'];
    } else if (txt[2] == 'u') {
      return INA_NI_SURAT['nga'] + INA_NI_SURAT[txt[3] + 'a'] + ANAK_NI_SURAT[txt[2]] + FUNCTUATION['\\'];
    }
  }

  function toConsonantVowel2(txt) {
    if (txt[1] == 'a') {
      return INA_NI_SURAT[txt];
    } else if (txt[1] == 'e') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]];
    } else if (txt[1] == 'o') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]];
    } else if (txt[1] == 'i') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]];
    } else if (txt[1] == 'u') {
      return INA_NI_SURAT_U[txt[0] + 'u'];
    }
  }

  function toVowelConsonant2(txt) {
    if (txt[0] == 'a') {
      return INA_NI_SURAT['a'] + INA_NI_SURAT[txt[1] + 'a'] + FUNCTUATION['\\'];
    } else if (txt[0] == 'e') {
      return INA_NI_SURAT['a'] + INA_NI_SURAT[txt[1] + 'a'] + ANAK_NI_SURAT['e'] + FUNCTUATION['\\'];
    } else if (txt[0] == 'o') {
      return INA_NI_SURAT['a'] + INA_NI_SURAT[txt[1] + 'a'] + ANAK_NI_SURAT['o'] + FUNCTUATION['\\'];
    } else if (txt[0] == 'i') {
      return INA_NI_SURAT['a'] + INA_NI_SURAT[txt[1] + 'a'] + ANAK_NI_SURAT['i'] + FUNCTUATION['\\'];
    } else if (txt[0] == 'u') {
      return INA_NI_SURAT['a'] + INA_NI_SURAT[txt[1] + 'a'] + ANAK_NI_SURAT['u'] + FUNCTUATION['\\'];
    }
  }

  function toVowelConsonant3(txt) {
    if (txt[0] == 'a') {
      return INA_NI_SURAT['a'] + ANAK_NI_SURAT['ng'];
    } else if (txt[0] == 'e') {
      return INA_NI_SURAT['a'] + ANAK_NI_SURAT['e'] + ANAK_NI_SURAT['ng'];
    } else if (txt[0] == 'o') {
      return INA_NI_SURAT['a'] + ANAK_NI_SURAT['o'] + ANAK_NI_SURAT['ng'];
    } else if (txt[0] == 'i') {
      return INA_NI_SURAT['a'] + ANAK_NI_SURAT['i'] + ANAK_NI_SURAT['ng'];
    } else if (txt[0] == 'u') {
      return INA_NI_SURAT['a'] + ANAK_NI_SURAT['u'] + ANAK_NI_SURAT['ng']
    }
  }

  function toConsonantVowelConsonant3(txt) {
    if (txt[1] == 'a') {
      return INA_NI_SURAT[txt[0] + 'a'] + INA_NI_SURAT[txt[2] + 'a'] + FUNCTUATION['\\'];
    } else if (txt[1] == 'e') {
      return INA_NI_SURAT[txt[0] + 'a'] + INA_NI_SURAT[txt[2] + 'a'] + ANAK_NI_SURAT['e'] + FUNCTUATION['\\'];
    } else if (txt[1] == 'o') {
      return INA_NI_SURAT[txt[0] + 'a'] + INA_NI_SURAT[txt[2] + 'a'] + ANAK_NI_SURAT['o'] + FUNCTUATION['\\'];
    } else if (txt[1] == 'i') {
      return INA_NI_SURAT[txt[0] + 'a'] + INA_NI_SURAT[txt[2] + 'a'] + ANAK_NI_SURAT['i'] + FUNCTUATION['\\'];
    } else if (txt[1] == 'u') {
      return INA_NI_SURAT[txt[0] + 'a'] + INA_NI_SURAT_U[txt[2] + 'u'] + FUNCTUATION['\\'];
    }
  }

  function toConsonantVowelConsonant4(txt) {
    if (txt[1] == 'a') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT['ng'];
    } else if (txt[1] == 'e') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]] + ANAK_NI_SURAT['ng'];
    } else if (txt[1] == 'o') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]] + ANAK_NI_SURAT['ng'];
    } else if (txt[1] == 'i') {
      return INA_NI_SURAT[txt[0] + 'a'] + ANAK_NI_SURAT[txt[1]] + ANAK_NI_SURAT['ng'];
    } else if (txt[1] == 'u') {
      return INA_NI_SURAT_U[txt[0] + 'u'] + ANAK_NI_SURAT['ng'];
    }
  }


  function convert(str) {

    var result = [];

    if (str) {
      str = str.replace(/[&\/\\#,+()$~%'":*?\-<>{}@]/g, ' ');
      var words = str.split(/\s*\b\s*/);

      words.forEach(function (word) {
        var syllables = syllabify(word);
        var unicodes = '';

        if (syllables) {
          syllables.forEach(function (syllable) {
            var txt = syllable.trim().toLowerCase();

            if (txt.length == 1) {
              if (VOWELS.includes(txt)) {
                unicodes += ONE_LETTER[txt];
              } else if (Object.keys(FUNCTUATION).includes(txt)) {
                unicodes = FUNCTUATION[txt];
              } else if (CONSONANTS.includes(txt)) {
                unicodes += INA_NI_SURAT[txt + 'a'] + FUNCTUATION['\\'];
              } else {
                unicodes += '\\00a0';
              }
            }

            if (txt.length > 1 && !txt.startsWith('ng') && CONSONANTS.includes(txt[0]) && CONSONANTS.includes(txt[1])) {
              while (txt.length > 1 && !txt.startsWith('ng') && CONSONANTS.includes(txt[0]) && CONSONANTS.includes(txt[1])) {
                unicodes += INA_NI_SURAT[txt[0] + 'a'] + FUNCTUATION['\\'];
                txt = txt.substring(1);
              }
            }

            if (txt.length == 2 && CONSONANTS.includes(txt[0]) && VOWELS.includes(txt[1])) {

              unicodes += toConsonantVowel2(txt);

            } else if (txt.length == 2 && VOWELS.includes(txt[0]) && CONSONANTS.includes(txt[1])) {

              unicodes += toVowelConsonant2(txt);

            } else if (txt.length == 3 && VOWELS.includes(txt[0]) && CONSONANTS.includes(txt[1] + txt[2])) {

              unicodes += toVowelConsonant3(txt);

            } else if (txt.length == 3 && CONSONANTS.includes(txt[0]) && VOWELS.includes(txt[1]) && CONSONANTS.includes(txt[2])) {

              unicodes += toConsonantVowelConsonant3(txt);

            } else if (txt.length == 3 && txt.startsWith('ng')) {

              unicodes += startWithNG3(txt);

            } else if (txt.length == 4 && CONSONANTS.includes(txt[0]) && VOWELS.includes(txt[1]) && CONSONANTS.includes(txt[2] + txt[3])) {

              unicodes += toConsonantVowelConsonant4(txt);

            } else if (txt.length == 4 && txt.startsWith('ng')) {

              unicodes += startWithNG4(txt);

            }

          })
        }

        result.push({ word, unicodes });

      });
    }

    return result;
  }

  function initAksara() {
    aksaraInput = document.getElementById('aksara-input');
    aksaraOutput = document.getElementById('aksara-output');

    addInaNiSurat(document.getElementById('ina-nisurat'));
    addAnakNiSurat(document.getElementById('anak-nisurat'));
  }

  function addInaNiSurat(el) {
    if (el) {
      el.innerHTML = '';

      for (const [key, value] of Object.entries(INA_NI_SURAT)) {
        let div = document.createElement('div');
        div.classList.add("aksara-box");

        div.innerHTML = `<span class="aksara-glyph"></span><span class="aksara-text">${key}</span>`;

        div.style.setProperty('--content', `'${value}'`);

        el.append(div);
      }
    }
  }

  function addAnakNiSurat(el) {
    if (el) {
      el.innerHTML = '';

      for (const [key, value] of Object.entries(ANAK_NI_SURAT)) {
        let div = document.createElement('div');
        div.classList.add("aksara-box");

        div.innerHTML = `<span class="aksara-glyph"></span><span class="aksara-text">${key}</span>`;

        div.style.setProperty('--content', `'${value}'`);

        el.append(div);
      }
    }
  }

  function convertToAksaraBatak(inputTxt, outputEl) {
    if (inputTxt && outputEl) {
      let lines = inputTxt.split(/\r?\n/);
      outputEl.innerHTML = '';
      

      for (let i = 0; i < lines.length; i++) {
        let aksaraLine = document.createElement('div');
        aksaraLine.classList.add("aksara-line");

        let result = convert(lines[i]);
        for (let j = 0; j < result.length; j++) {
          let aksaraBox = document.createElement('div');
          aksaraBox.classList.add("aksara-box");
          aksaraBox.innerHTML = `<span class="aksara-glyph"></span><span class="aksara-text">${result[j].word}</span>`;
          aksaraBox.style.setProperty('--content', `'${result[j].unicodes}'`);
          aksaraLine.append(aksaraBox);

        }
        outputEl.append(aksaraLine);
      }

    }
  }

  window.addInaNiSurat = addInaNiSurat;
  window.addAnakNiSurat = addAnakNiSurat;
  window.convertToAksaraBatak = convertToAksaraBatak;
  window.initAksara = initAksara;

})(window, document);