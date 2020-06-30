/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2020-06-30 14:11:41
 * @LastEditors: conjurer
 * @LastEditTime: 2020-06-30 14:14:51
 * @Description:
 */

class LogMgr {
    public ClientFrame = 0;
    public LogIdx: number = 0;
    private LogList: Array<string> = [];

    public Push(txt: string) {
        this.LogList.push(txt);
        this.LogIdx++;
    }

    public Save() {
        let t = new Date();
        let logFileName = [t.getTime(), ".txt"].join("");
        let contentText = this.LogList.join("\n");
        if (cc.sys.browserType) {
            let blob = new Blob([contentText], { type: "text/plain;charset=utf-8" });
            saveAs(blob, logFileName);
        } else {
            let fileUtils = jsb.fileUtils;
            let logFilePath = fileUtils.getWritablePath() + "Log/";
            if (!fileUtils.isDirectoryExist(logFilePath)) {
                fileUtils.createDirectory(logFilePath);
            }
            //Log文件完整路径
            let logPathFileName = [logFilePath, logFileName].join("");
            fileUtils.writeStringToFile(contentText, logPathFileName);
        }
    }
}

export default new LogMgr();
