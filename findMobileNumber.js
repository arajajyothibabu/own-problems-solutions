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

    const isEmpty = (inp) => Array.isArray(inp) || typeof inp === 'string' && inp.length === 0;

    const isNonAlphaNumeric = (ch) => {
        const code = ch.charCodeAt(0);
        return !((code > 64 && code < 91) || (code > 96 && code < 123) || (code > 47 && code < 58));
    }

    const isNumber = (n) => !isNaN(Number(n));

    const getValidNumber = (inp) => {
        let index = 0;
        while(index < inp.length && !numMap.hasOwnProperty(inp.slice(index))){
            index++;
        }
        return inp.slice(index);
    }

    let digitsFound = [];

    let tempDigit = "";

    const output = [];

    input.split("").forEach(ch => {
        if(isNonAlphaNumeric(ch)){
            return;
        }
        if(isNumber(ch)){
            if(isEmpty(tempDigit)){
                digitsFound.push(ch);
            }else{
                digitsFound = [ch];
                tempDigit = "";
            }
        }else{
            tempDigit += ch;
            const validNumber = getValidNumber(tempDigit);
            if(!isEmpty(validNumber)){
                if(validNumber.length < tempDigit.length){
                    digitsFound = [numMap[validNumber]];
                }else{
                    digitsFound.push(numMap[validNumber]);
                }
                tempDigit = "";
            }
        }
        //console.log(digitsFound);
        if(digitsFound.length === 10){
            output.push(digitsFound.join(""));
            digitsFound = [];
        }
    });

    return output;

}

const testCases = [
    "9 five3threeone_6-two 0.0#six",
    "90ui five3threeone_6-two9 five3threeone_6-two9 five3threeone_6-two9 five3threeone_6-two9 five3threeone_6-two9 five3threeklpone_6-two9 five3threeone_6-two9 five3threeonejkl_6-two9 five3threeone_6-two9 five3threeone_6-two 0.0#six",
    "95331six200x9533onesix200six"
]

testCases.forEach(testCase => {
    console.log(findMobileNumber(testCase));
});