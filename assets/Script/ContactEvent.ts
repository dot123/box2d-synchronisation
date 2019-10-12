import LogMgr from "./LogMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ContactEvent extends cc.Component {
    // 只在两个碰撞体开始接触时被调用一次
    public onBeginContact(contact, selfCollider, otherCollider) {
        LogMgr.Push("" + LogMgr.LogIdx + "  " + selfCollider.node.name + "  " + LogMgr.ClientFrame + "  " + otherCollider.node.name);
    }

    // 只在两个碰撞体结束接触时被调用一次
    public onEndContact(contact, selfCollider, otherCollider) {
        LogMgr.Push("" + LogMgr.LogIdx + "  " + selfCollider.node.name + "  " + LogMgr.ClientFrame + "  " + otherCollider.node.name);
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    public onPreSolve(contact, selfCollider, otherCollider) {
        LogMgr.Push("" + LogMgr.LogIdx + "  " + selfCollider.node.name + "  " + LogMgr.ClientFrame + "  " + otherCollider.node.name);
    }

    // 每次处理完碰撞体接触逻辑时被调用
    public onPostSolve(contact, selfCollider, otherCollider) {
        LogMgr.Push("" + LogMgr.LogIdx + "  " + selfCollider.node.name + "  " + LogMgr.ClientFrame + "  " + otherCollider.node.name);
    }
}
