import axios from "axios";

const port = 'http://10.0.2.2:3000';

const logear = async (nUN) => {

    var result;

    await axios.get(port+'/login?userName='+nUN)
        .then(function(res){
            result = res.data;
        })
        .catch(function(error){console.log(error)});
}
 
export default {logear};