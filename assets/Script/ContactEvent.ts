/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2020-06-05 10:57:29
 * @LastEditors: conjurer
 * @LastEditTime: 2020-06-30 14:23:17
 * @Description:
 */

import LogMgr from "./LogMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ContactEvent extends cc.Component {
    // 只在两个碰撞体开始接触时被调用一次
    public onBeginContact(contact, selfCollider, otherCollider) {
        LogMgr.Push(
            [
                LogMgr.LogIdx,
                LogMgr.ClientFrame,
                selfCollider.node.name,
                otherCollider.node.name,
                Math.floor(selfCollider.node.x),
                Math.floor(selfCollider.node.y),
                Math.floor(otherCollider.node.x),
                Math.floor(otherCollider.node.y),
            ].join(",")
        );
    }

    // 只在两个碰撞体结束接触时被调用一次
    public onEndContact(contact, selfCollider, otherCollider) {
        LogMgr.Push(
            [
                LogMgr.LogIdx,
                LogMgr.ClientFrame,
                selfCollider.node.name,
                otherCollider.node.name,
                Math.floor(selfCollider.node.x),
                Math.floor(selfCollider.node.y),
                Math.floor(otherCollider.node.x),
                Math.floor(otherCollider.node.y),
            ].join(",")
        );
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    public onPreSolve(contact, selfCollider, otherCollider) {
        LogMgr.Push(
            [
                LogMgr.LogIdx,
                LogMgr.ClientFrame,
                selfCollider.node.name,
                otherCollider.node.name,
                Math.floor(selfCollider.node.x),
                Math.floor(selfCollider.node.y),
                Math.floor(otherCollider.node.x),
                Math.floor(otherCollider.node.y),
            ].join(",")
        );
    }

    // 每次处理完碰撞体接触逻辑时被调用
    public onPostSolve(contact, selfCollider, otherCollider) {
        LogMgr.Push(
            [
                LogMgr.LogIdx,
                LogMgr.ClientFrame,
                selfCollider.node.name,
                otherCollider.node.name,
                Math.floor(selfCollider.node.x),
                Math.floor(selfCollider.node.y),
                Math.floor(otherCollider.node.x),
                Math.floor(otherCollider.node.y),
            ].join(",")
        );
    }
}
