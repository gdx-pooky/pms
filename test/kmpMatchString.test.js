/**
 * Created by shipengqi on 2016/12/4.
 */
import {startMatchKeywords} from '../src/utils/kmpMatchString';
import {expect} from 'chai';
import content from './testContent.json'

describe('kmpMatchString() 测试', function() {
    it('keyword: tank',function(done) {
        let result = startMatchKeywords(content.tank,[{
            grade:1,
            ban_word:'tank'
        }]);
        expect(result.is_artificial).to.be.equal(0);
        expect(result.machine_audit).to.be.equal(0);
        done();
    })
});
