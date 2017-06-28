/**
 * Created by shipengqi on 2016/12/4.
 */
import {startMatchKeywords} from '../src/utils/bmMatchString';
import {expect} from 'chai';
import content from './testContent.json';

describe('bmMatchString() 测试', function() {
    it('keyword: tank, return :match_position = 10',(done)=> {
        let result = startMatchKeywords(content.tank,[{
            grade:1,
            ban_word:'tank'
        }]);
        expect(result.is_artificial).to.be.equal(0);
        expect(result.machine_audit).to.be.equal(0);
        expect(result.match_position).to.be.include(10);
        done();
    });
    it('keyword: tank,fuck return :match_position = 10',function(done) {
        let result = startMatchKeywords(content.tank,[{
            grade:1,
            ban_word:'tank'
        },{
            grade:2,
            ban_word:'fuck'
        }
        ]);
        expect(result.is_artificial).to.be.equal(0);
        expect(result.machine_audit).to.be.equal(0);
        expect(result.match_position).to.be.include(10);
        expect(result.match_position).to.be.not.include(-1);
        done();
    });

    it('keyword: fuck, return :match_position be empty',function(done) {
        let result = startMatchKeywords(content.tank,[{
            grade:2,
            ban_word:'fuck'
        }
        ]);
        expect(result.is_artificial).to.be.equal(1);
        expect(result.machine_audit).to.be.equal(1);
        expect(result.match_position).to.be.empty;
        done();
    })
});
