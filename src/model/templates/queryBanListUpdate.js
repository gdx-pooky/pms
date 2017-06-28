var nunjucks = require("nunjucks");
var nodeproxy = require("nodeproxy");
var StringUtils = require("underscore.string");

var shim = function(nunjucks, env, obj, dependencies) {
    var oldRoot = obj.root;

    obj.root = function(env, context, frame, runtime, ignoreMissing, cb) {
        var oldGetTemplate = env.getTemplate;
        env.getTemplate = function(name, ec, parentName, ignoreMissing, cb) {
            if (typeof ec === "function") {
                cb = ec = false;
            }
            var _require = function(name) {
                try {
                    // add a reference to the already resolved dependency here
                    return dependencies[name];
                } catch (e) {
                    if (frame.get("_require")) {
                        return frame.get("_require")(name);
                    } else {
                        console.warn('Could not load template "%s"', name);
                    }
                }
            };

            var tmpl = _require(name);
            frame.set("_require", _require);

            if (ec) tmpl.compile();
            cb(null, tmpl);
        };

        oldRoot(env, context, frame, runtime, ignoreMissing, function(err, res) {
            env.getTemplate = oldGetTemplate;
            cb(err, res);
        });
    };

    var src = {
        obj: obj,
        type: 'code'
    };

    return new nunjucks.Template(src, env);
};

var env;
if (!nunjucks.currentEnv) {
    env = nunjucks.currentEnv = new nunjucks.Environment([], {
        autoescape: false
    });
} else {
    env = nunjucks.currentEnv;
}
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});

function root(env, context, frame, runtime, cb) {
    var lineno = null;
    var colno = null;
    var output = "";
    try {
        var parentTemplate = null;
        output += "SELECT\r\nupdate_time\r\nFROM\r\nlocal_ban_list\r\nWHERE\r\n`status` = 1\r\nORDER BY\r\nupdate_time DESC\r\nLIMIT 1;";
        if (parentTemplate) {
            parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
        } else {
            cb(null, output);
        }
    } catch (e) {
        cb(runtime.handleError(e, lineno, colno));
    }
}

var instance = shim(nunjucks, env, {
    root: root
}, dependencies);
module.exports = function(object) {
    return StringUtils.strip(StringUtils.strip(StringUtils.strip(nodeproxy(instance.render, instance)(object), "\n")), "\n");
};
