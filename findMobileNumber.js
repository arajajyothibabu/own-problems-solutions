/**
 * finds mobile number encoded in given input
 * @param {String} input "9 five3threeone_6-two 0.0#six"
 */

function findMobileNumber(input) {

    const numMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        zero: 0
    };

    let digitsFound = [];

    const isNumber = (n) => !isNaN(Number(n));

    let tempDigit = "";

    const isEmpty = (str) => typeof str === 'string' && str.length === 0;

    const isNonAlphaNumeric = (ch) => {
        const code = ch.charCodeAt(0);
        return !((code > 64 && code < 91) || (code > 96 && code < 123) || (code > 47 && code < 58));
    }

    input.split("").forEach(ch => {
        if(isNonAlphaNumeric(ch)){
            return;
        }
        if(isNumber(ch)){
            if(isEmpty(tempDigit)){
                digitsFound.push(ch);
            }else{
                digitsFound = [ch];
            }
        }else{
            tempDigit += ch;
            if(numMap.hasOwnProperty(tempDigit)){
                digitsFound.push(numMap[tempDigit]);
                tempDigit = "";
            }
        }
    });

    if(digitsFound.length % 10 === 0){
        return digitsFound.join("");
    }else{
        return "No Number Found!";
    }

}