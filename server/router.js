const fs = require("fs"),
    path = require("path")
settings = require("./settings");

const extensions = {
    "html": {
        contentType: "text/html",
        encoding: "utf-8"
    },

    "css": {
        contentType: "text/css",
        encoding: "utf-8"
    },

    "js": {
        contentType: "text/plain",
        encoding: "utf-8"
    },
    
    "json": {
        contentType: "text/plain",
        encoding: "utf-8"
    },

    "png": {
        contentType: "image/png",
        encoding: "binary"
    },

    "mp3": {
        contentType: "sound/mp3",
        encoding: "binary"
    },

    "ico": {
        contentType: "image/x-icon",
        encoding: "binary"
    }
}

//一度読み込んだファイルはここに溜めて、再利用する。
let fileCollection = {}

exports.routeSetting = function (req, res) {
    const pathname = req.url;
    // console.log("pathname: ", pathname);

    let extname;
    let file;
    if (pathname === "/") {
        extname = "html";
        file = `${settings.ROOT}/${settings.TOP_PAGE}`;
    } else {
        extname = path.extname(pathname).slice(1);

        if (path.dirname(pathname) === "/") {// 親ディレクトリなしの場合はpublicから探す
            // file = settings.ROOT + "build/public" + pathname;
            file = settings.ROOT + pathname;
        } else {
            // file = settings.ROOT + pathname;
            file = settings.ROOT + pathname;
        }

        
        //拡張子なしの場合は、htmlファイルとみなす
        if (!extname) {
            extname = "html";
            // file += `.${extname}`;
            file = `${settings.ROOT}/${settings.TOP_PAGE}`;
        }
    }
    // console.log("XYZZAA", file);

    let data;
    let ex = extensions[extname];

    // 開発時はとりあえずfalseにしておく
    if (false) {
        // if (fileCollection[file]) {
        console.log("find!");
        data = fileCollection[file];
    } else {
        try {
            data = fs.readFileSync(file, ex.encoding);
        } catch (e) {
            // ファイル読み込みに失敗した場合
            console.log(e);
            res.writeHead(400, { "Content-Type": "text/html" });
            // res.write(fs.readFileSync(`${settings.ROOT}/public/error.html`, "utf-8"), "utf-8");
            res.write(fs.readFileSync(`${settings.ROOT}/error.html`, "utf-8"), "utf-8");
            res.end();
            return;
        }
        fileCollection[file] = data;
    }

    res.writeHead(200, { "Content-Type": ex.contentType });
    res.write(data, ex.encoding);
    res.end();
}
