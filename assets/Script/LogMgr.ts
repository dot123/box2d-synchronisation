import FileSaver = require("FileSaver"); //打包原生平台时请注释本行并删除FileSaver.js文件

class LogMgr {
    public ClientFrame = 0;
    public LogIdx: number = 0;
    private LogList: Array<string> = [];

    public Push(txt: string) {
        this.LogList.push(txt);
        this.LogIdx++;
    }

    public FileWrite(contentText, fileName) {
        let blob = new Blob([contentText], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, fileName);
    }

    public Save() {
        let t = new Date();
        let pathFileName = [t.getTime(), ".txt"].join("");

        if (cc.sys.browserType) {
            this.FileWrite(this.LogList.join("\n"), pathFileName);
        } else {
            let fileUtils = jsb.fileUtils;
            let logFilePath = fileUtils.getWritablePath() + "Log/";
            if (!fileUtils.isDirectoryExist(logFilePath)) {
                fileUtils.createDirectory(logFilePath);
            }
            //Log文件完整路径
            let logPathFileName = [logFilePath, t.getTime(), ".txt"].join("");
            fileUtils.writeStringToFile(this.LogList.join("\n"), logPathFileName);
        }
    }
}

export default new LogMgr();
