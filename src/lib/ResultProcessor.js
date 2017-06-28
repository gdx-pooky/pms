/**
 * Created by qi on 2016/12/1.
 */
import {
    RESPONSE_AUDIT_REFUSE_HIGHEST,
    RESPONSE_AUDIT_PASS,
    RESPONSE_AUDIT_REFUSE,
    NO_ARTIFICIAL_AUDIT,
    MACHINE_AUDIT_REFUSE
} from './constants';

class ResultProcessor {

    processSuccess () {
        return {
            code:RESPONSE_AUDIT_PASS,
            msg:'success'
        }
    }

    processFail (code,msg) {
        let code_result = RESPONSE_AUDIT_REFUSE;
        if(code === NO_ARTIFICIAL_AUDIT){
            code_result = RESPONSE_AUDIT_REFUSE_HIGHEST;
        }
        return {
            code:code_result,
            msg:msg
        }
    }

    decide (result) {
        if(result.machine_audit === MACHINE_AUDIT_REFUSE){
            return this.processFail(result.is_artificial,result.ban_words);
        }else{
            return this.processSuccess();
        }
    }

}

export default ResultProcessor;