/**
 * Created by qi on 2016/12/10.
 */
import AhoCorasick from './AhoCorasick';
import later from 'later';
import child_process from 'child_process';

later.date.localTime();

function timedUpdateACTree(time) {
    let sched = later.parse.text(time);
    later.setInterval(AhoCorasick.updateAhoCorasickTree, sched);
}


//定时清理日志文件
function clearLog (time) {
    let sched = {
        schedules:[time]
    };
    later.schedule(sched);
    later.setInterval(Clear,sched);
}

function Clear() {
    var cmdstr = 'rm -f ./logs/*.log';
    child_process.exec(cmdstr, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
        }
    });
}

const timedTask = function (options) {
    process.nextTick(function () {
        timedUpdateACTree(options.updateACTreeTimeMin);
        clearLog(options.clearLogTime);
    })
};

export {
    timedTask
};