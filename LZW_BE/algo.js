// algorithm for compressing ascii to binary

const MAX_BIT = 12;
function splitBinary(binary, splitBit = 8){
    var binaryArray = [];
    // split binary into 8 bit
    var binaryString = binary.toString();
    var binaryLength = binaryString.length;
    // split from end to front  
    for(var i = binaryLength; i > 0; i-=splitBit){
        var temp = binaryString.substring(i-splitBit, i);
        // push in front
        binaryArray.unshift(temp);
    }

    // if first binary is not 8 bit, add 0 in front
    if(binaryArray[0].length < splitBit){
        var temp = binaryArray[0];
        var tempLength = temp.length;
        var tempSplit = splitBit - tempLength;
        for(var i = 0; i < tempSplit; i++){
            temp = '0' + temp;
        }
        binaryArray[0] = temp;
    }
    return binaryArray;
}

function stringBinary(arrBin){
    var binaryString = '';
    for(var i = 0; i < arrBin.length; i++){
        binaryString += arrBin[i] + ' ';
    }
    // kurangin spasi di akhir
    binaryString = binaryString.substring(0, binaryString.length-1);
    return binaryString;
}

function arrDecToStrBin(arrDec){
    var binary = [];
    var maxBit = 8;
    for(var i = 0; i < arrDec.length; i++){
        // console.log('binary: '+output[i].toString(2));
        var temp = arrDec[i].toString(2);
        binary.push(temp);
        if(temp.length > maxBit){
            maxBit = temp.length;
        }
    }
    console.log('maxBit: '+maxBit);
    // make sure all binary have the same length
    // add 0 in front to all binary that have less than maxBit
    for(var i = 0; i < binary.length; i++){
        var temp = binary[i];
        var tempLength = temp.length;
        var tempSplit = maxBit - tempLength;
        for(var j = 0; j < tempSplit; j++){
            temp = '0' + temp;
        }
        binary[i] = temp;
    }
    return stringBinary(binary);
}

function binaryStringToDecimal(binaryString){
    var binaryArray = binaryString.split(' ');
    var decimalArray = [];
    for(var i = 0; i < binaryArray.length; i++){
        decimalArray.push(parseInt(binaryArray[i], 2));
    }
    return decimalArray;
}

function compressLZW(ascii) {
    var input = ascii.split('');
    var dictionary = {};
    var string = '';
    var output = [];
    
    for (var i = 0; i < 256; i++) {
        dictionary[String.fromCharCode(i)] = i;
    }
    console.log('the ascii of space:'+ dictionary[' ']);
    console.log(input.length);
    for (var i = 0; i < input.length; i++) {
        console.log('-----------------');
        // output.push(dictionary[input[i]]);
        var temp = string + input[i];
        if (dictionary[temp] !== undefined) { // if temp is in dictionary then string = temp
            console.log('temp is in dictionary');
            string = temp;
        }
        else { // if temp is not in dictionary then add temp to dictionary and output string
            console.log('temp is not in dictionary');
            output.push(dictionary[string]);
            dictionary[temp] = Object.keys(dictionary).length;
            string = input[i];
        }
        console.log('temp: '+temp);
        console.log('dictionary temp: '+dictionary[temp]);
        console.log('string:'+string);
        console.log('-----------------');
    }
    console.log('input: '+input);
    console.log('input length: '+input.length);
    console.log('output: '+output);
    console.log('output length: '+output.length);
    return arrDecToStrBin(output);
  }  
  
function decompressLZW(binary){
    return binary+' decompressed';
}   

var ascii = 'llak;gk jaf;  aldfjal  lajfslf  afdlsfkj kkjull';
// var ascii2 = 'cabdfghabd jakfdl ajldfjlka jak huihuihuihuihuihui'
var ascii2 = 'huihuihuihuihuihui'
console.log("oke"); 
console.log('ascii: '+ascii2);
var output = compressLZW(ascii2);
console.log('result: '+output);
console.log('check: '+binaryStringToDecimal(output));

// var hexa = 0x4
// var hexa = 0x68787
// var num = 0o00011000;
// console.log(hexa.toString(2));
// console.log("hexa to binary: "+hexa.toString(2));
// console.log("binary to hexa: "+parseInt(hexa.toString(2), 2).toString(16));
// console.log("binary to decimal: "+parseInt(hexa.toString(2), 2));
// console.log("decimal to hexa: "+parseInt(hexa.toString(2), 2).toString(16));
// console.log("decimal to binary: "+parseInt(hexa.toString(2), 2).toString(2));
// console.log("split binary: "+splitBinary(hexa.toString(2)));
// console.log("string binary: "+stringBinary(splitBinary(hexa.toString(2))));
// var j = "nigel sahl ";
// j = j.substring(0, j.length-1);
// console.log(j);

module.exports = {
    compressLZW,
    decompressLZW
}