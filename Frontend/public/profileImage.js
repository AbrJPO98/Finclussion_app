var uri='/images/avatar.png';

export const setUri = (filePath) => {
    if(filePath!==undefined){
        var nPath = filePath;
        var nNewPath = nPath.replace("public","");
        uri = nNewPath.replace(/\\/g, '/');
    } else {
        uri='/images/avatar.png';
    }
}

export const getUir = () => {
    return uri;
}