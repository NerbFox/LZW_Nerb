function compressLZW(ascii){
    return ascii+' compressed';
}
function decompressLZW(binary){
    return binary+' decompressed';
}   

module.exports = {
    compressLZW,
    decompressLZW
}