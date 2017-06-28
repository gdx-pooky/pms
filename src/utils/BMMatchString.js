/**
 * Created by qi on 2016/12/2.
 */
import _each from 'lodash/each';
import _join from 'lodash/join';
import {
    TO_ARTIFICIAL_AUDIT,
    NO_ARTIFICIAL_AUDIT,
    MACHINE_AUDIT_PASS,
    MACHINE_AUDIT_REFUSE
} from '../lib/constants';


/*
* 坏字符规则表
* */
function buildBadTable(pattern) {
    let patternLength = pattern.length;
    let bad_table = [];

    for(let i = 0; i < patternLength - 1;i ++){
        let badchar = pattern.charAt(i);
        bad_table[badchar] = patternLength - 1 - i;
    }

    return bad_table;
}

/*
 * 好后缀规则表
 *
 * @param pattern 模式串
 *
 * @return
 * */
function buildGoodTable(pattern) {
    let patternLength = pattern.length;
    let good_table = [];
    let lastPrefixPosition = patternLength;

    for(let i = patternLength - 1; i >= 0; --i){
        if(isPrefix(pattern,i+1)){
            lastPrefixPosition = i +1;
        }
        good_table[patternLength - 1 - i] = lastPrefixPosition - i + patternLength - 1;
    }

    for (let i = 0; i < patternLength - 1; ++i) {
        let slen = suffixLength(pattern, i);
        good_table[slen] = patternLength - 1 - i + slen;
    }

    return good_table;
}

/**
 * 前缀匹配
 */
function isPrefix(pattern,p) {
    let patternLength = pattern.length;
    let is_prefix = true;
    for(let i = p,j = 0;i < patternLength; ++i,++j){
        if(pattern.charAt(i) != pattern.charAt(j)){
            is_prefix = false;
            break;
        }
    }

    return is_prefix;
}

/**
 * 后缀匹配
 */
function suffixLength(pattern,p) {
    let patternLength = pattern.length;
    let len = 0;

    for(let i = p,j = patternLength -1; i >= 0 && pattern.charAt(i) == pattern.charAt(j); i--, j--) {
        len += 1;
    }
    return len;
}

function BMMatch(target,pattern) {
    let patternLength = pattern.length;
    let targetLength = target.length;
    let badTable = [];
    let goodTable = [];
    let position = -1;
    let stop = false;

    if(patternLength > targetLength){
        return position;
    }

    badTable = buildBadTable(pattern);
    goodTable = buildGoodTable(pattern);

    for (let i = patternLength - 1, j; i < targetLength;) {
        if(stop){
            break;
        }
        for (j = patternLength - 1; target.charAt(i) == pattern.charAt(j); i--, j--) {
            if (j == 0) {//匹配到一次直接返回
                position = i;
                stop = true;
                break;
            }
        }
        i += Math.max(goodTable[patternLength - j - 1], (badTable[target.charAt(i)] ? badTable[target.charAt(i)] : patternLength));
    }

    return position;
}

const startMatchKeywords = function (sourceContent,keywords) {

    let prohibited_count = 0;
    let is_artificial = TO_ARTIFICIAL_AUDIT;
    let machine_audit = MACHINE_AUDIT_PASS;
    let match_words = [];
    let ban_words = '';
    let match_position = [];

    _each(keywords,(item)=> {
        let is_match = BMMatch(sourceContent,item.ban_word);
        if(is_match > -1){
            prohibited_count ++;
            if(item.grade === 1){
                is_artificial = NO_ARTIFICIAL_AUDIT;
            }
            match_words.push(item.ban_word);
            match_position.push(is_match);
        }
    });

    if(prohibited_count > 0){
        machine_audit = MACHINE_AUDIT_REFUSE;
        ban_words = _join(match_words);
    }
    return {
        is_artificial:is_artificial,
        machine_audit:machine_audit,
        ban_words:ban_words,
        match_position:match_position
    };
};

export {
    startMatchKeywords
}

