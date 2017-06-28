/**
 * Created by qi on 2016/11/30.
 */
import _each from 'lodash/each';
import _join from 'lodash/join';
import {
    TO_ARTIFICIAL_AUDIT,
    NO_ARTIFICIAL_AUDIT,
    MACHINE_AUDIT_PASS,
    MACHINE_AUDIT_REFUSE
} from '../lib/constants';

function kmpGetStrPartMatchValue(str) {
    let prefix = [];
    let suffix = [];
    let partMatch = [];
    for (let i = 0, j = str.length; i < j; i++) {
        let newStr = str.substring(0, i + 1);
        if (newStr.length == 1) {
            partMatch[i] = 0;
        } else {
            for (let k = 0; k < i; k++) {
                //取前缀
                prefix[k] = newStr.slice(0, k + 1);
                suffix[k] = newStr.slice(-k - 1);
                if (prefix[k] == suffix[k]) {
                    partMatch[i] = prefix[k].length;
                }
            }
            if (!partMatch[i]) {
                partMatch[i] = 0;
            }
        }
    }
    return partMatch;
}

function KMPMatch(sourceStr, searchStr) {
    //生成匹配表
    let part         = kmpGetStrPartMatchValue(searchStr);
    let sourceLength = sourceStr.length;
    let searchLength = searchStr.length;
    let result;

    for (let i = 0; i < sourceLength; i++) { //最外层循环，主串
        //子循环
        for (let j = 0; j < searchLength; j++) {
            //如果与主串匹配
            if (searchStr.charAt(j) == sourceStr.charAt(i)) {
                //如果是匹配完成
                if (j == searchLength - 1) {
                    result = i - j;
                    break;
                } else {
                    //如果匹配到了，就继续循环，i++是用来增加主串的下标位
                    i++;
                }
            } else {
                //在子串的匹配中i是被叠加了
                if (j > 1 && part[j - 1] > 0) {
                    i += (i - j - part[j - 1]);
                } else {
                    //移动一位
                    i = (i - j)
                }
                break;
            }
        }
        if (result || result == 0) {
            break;
        }
    }
    if (result || result == 0) {
        return result
    } else {
        return -1;
    }
}

const startMatchKeywords = function (sourceContent,keywords) {

    let prohibited_count = 0;
    let is_artificial = TO_ARTIFICIAL_AUDIT;
    let machine_audit = MACHINE_AUDIT_PASS;
    let match_words = [];
    let ban_words = '';

    _each(keywords,(item)=> {
        let is_match = KMPMatch(sourceContent,item.ban_word);
        if(is_match > -1){
            prohibited_count ++;
            if(item.grade === 1){
                is_artificial = NO_ARTIFICIAL_AUDIT;
            }
            match_words.push(item.ban_word);
        }
    });

    if(prohibited_count > 0){
        machine_audit = MACHINE_AUDIT_REFUSE;
        ban_words = _join(match_words);
    }

    return {
        is_artificial:is_artificial,
        machine_audit:machine_audit,
        ban_words:ban_words
    }
};

export {
    startMatchKeywords
}


/*let s = "BBC ABCDAB ABCDABCDABDE";
let t = "AB";
show('indexOf',function() {
    return s.indexOf(t)
})
show('KMP',function() {
    return KMP(s,t)
})
function show(bf_name,fn) {
    let myDate = +new Date()
    let r = fn();

    console.log( bf_name + '算法,搜索位置:' + r + ",耗时" + (+new Date() - myDate) + "ms");
}*/

/*function next(str) {
 let prefix = [];
 let suffix = [];
 let partMatch;
 let i = str.length;
 let newStr = str.substring(0, i + 1);
 for (let k = 0; k < i; k++) {
 //取前缀
 prefix[k] = newStr.slice(0, k + 1);
 suffix[k] = newStr.slice(-k - 1);
 if (prefix[k] == suffix[k]) {
 partMatch = prefix[k].length;
 }
 }
 if (!partMatch) {
 partMatch = 0;
 }
 return partMatch;
 }

 exports.KMPMatch = function(sourceStr, searchStr) {
 let sourceLength = sourceStr.length;
 let searchLength = searchStr.length;
 let result;

 for (let i = 0; i < sourceLength; i++) { //最外层循环，主串
 //子循环
 for (let j = 0; j < searchLength; j++) {
 //如果与主串匹配
 if (searchStr.charAt(j) == sourceStr.charAt(i)) {
 //如果是匹配完成
 if (j == searchLength - 1) {
 result = i - j;
 break;
 } else {
 //如果匹配到了，就继续循环，i++是用来增加主串的下标位
 i++;
 }
 } else {
 if (j > 1) {
 i += i - next(searchStr.slice(0,j));
 } else {
 //移动一位
 i = (i - j)
 }
 break;
 }
 }
 if (result || result == 0) {
 break;
 }
 }
 if (result || result == 0) {
 return result
 } else {
 return -1;
 }
 };*/