# box2d帧同步测试

用于测试在不同平台上box2d计算结果是否同步。

使用说明：

1.在engine\cocos2d\core\physics\CCPhysicsManager.js中将

    update: function (dt) {
          var world = this._world;
          if (!world || !this.enabled) return;
修改为：

    update: function (dt, enabled) {
        var world = this._world;
        if (!enabled || !world || !this.enabled) return;

2.重新编译引擎参考https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html。

3.点击start按钮，开始测试，等待测试完成将保存日志， 对比不同平台的日志文件确定是否同步。

4.显示的md5用于快速辨别是否同步（注意：某些浏览器md5的计算结果可能不同）。
