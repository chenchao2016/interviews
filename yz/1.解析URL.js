/*将URL地址键值对字符串转换为对象*/
// case 1: 解析数组  ?list[]=1&list[]=2&list[]=3
// case 2: 解析对象 ?obj={ a: 1 }
// case 3: 解析异常字符串 ?&wd=URL%E9%9D%9E%E6%B3%95%E5%8F%82%E6%95%#B0'
// case 4: 解析url编码字符串 ?key=%E6%B5%8B%E8%AF%95
// case 5: 解析时处理单个关键字的情况  ?key=value&name&k=v
// case 5: 解析时移出hash值 ?key=value#anchor

const url = `?list[]=1&list[]=2&list[]=3&obj={ "a": 1 }&key1=%E6%B5%8B%E8%AF%95&name&wd=URL%E9%9D%9E%E6%B3%95%E5%8F%82%E6%95%#B0&key2=%7B%20%22prop%22:%20%22%E6%B5%8B%E8%AF%95%22%20%7D&key3=?value#anchor`;

function parseUrlParams(url) {
    const result = {};
    if (!url || typeof url !== 'string') return result;
    const paramArray = url.trim().replace('?','').split('&');
    paramArray.forEach((param,index) => {
        const [key,value] = param.split('=');
        let val = undefined;
        if(value === undefined) { result[key] = undefined; return;}
        try {
            val = decodeURI(value); // case 3 和 case 4
            if(val.startsWith('{') || val.startsWith('[')){
              val = JSON.parse(val); // case 2
            }
        } catch (error) {
            val = val !== undefined ? val : value;
        }
        if(key.indexOf('[]') > -1){ // case 1
            const realKey = key.replace('[]','');
            if(!result[realKey]) result[realKey] = [];
            result[realKey].push(val);
        }else {
            result[key] = val;
        }
        // case 5 ，移出末尾的锚点
        if(index + 1 === paramArray.length){
            const r = val.match(/(#.*)/);
            if(r) result[key] = val.replace(RegExp.$1, '');
        }
    });
    return result;
}

const result = parseUrlParams(url);
console.log('====================================');
console.log(result);
console.log('====================================');


