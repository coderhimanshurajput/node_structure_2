
const
    crypto = require('crypto');
const {performance} = require('perf_hooks');

class RandamNumber {
     generateString() {
        let text = '';
        const possible = '~`/<?>@A!B#$^%&*()_+={}CDEF[]GHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz|:-0123456789';

        for (let i = 0; i < 12; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + 'st';
        }
        if (j == 2 && k != 12) {
            return i + 'nd';
        }
        if (j == 3 && k != 13) {
            return i + 'rd';
        }
        return i + 'th';
    }

    getUniqueNumber(str) {
        function shuffle(str) {
            var a = str.split(''),
             n = a.length;
            for (var i = n - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1)),
                 tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a.join('');
        }

        var str = new Date().getTime() + (Math.random() * 999 + 1000).toFixed(); //string
        return Number.parseInt(shuffle(str));
    }

    //  output (  D[nmBOF8fZdg62$yJSi|m6L.xwt"m-\0v-M9[q,&9y,Ek]TZ/. )
    randStr(len) {
        let s = '';
        // eslint-disable-next-line no-param-reassign
        while (len--) {
 s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
}
        return s;
    }

    // Case Insensitive Alphanumeric Chars (ajgf9qshp88cj7eauqz1e8q5456r751pj5p58f3gs0aupw33hf)
    randStrAplha(len) {
        let s = '';
        while (s.length < len) {
 s += Math.random().toString(36)
.substr(2, len - s.length);
}
        return s;
    }

    /* Random  function create*/
    randomValueHex(len) {
        return crypto
            .randomBytes(Math.ceil(len / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, len); // return required number of characters
    }

    /* Random Number Genrater */
    // getRandomInt(max) {
    //     let  num =  Math.floor(Math.random() * Math.floor(max));
    //     // let getMsec = new Date().getMilliseconds();
    //     //     return `${getMsec}${num}`;
    //     return num;
    // }

     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
}

module.exports = {
    RandamNumber: RandamNumber
};
