import LogMgr from "./LogMgr";
import MD5Tool = require("MD5Tool");

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property([cc.Prefab])
    private itemPrefabList: cc.Prefab[] = [];

    @property(cc.Node)
    private itemLayer: cc.Node = null;

    @property(cc.Label)
    private label: cc.Label = null;

    private nodeList: cc.Node[] = [];
    private isStart: boolean = false;
    private isEnd: boolean = false;
    private seed: number = 7;
    private duration: number = 180;

    private SyncRandom() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1000);

        for (let i = 0; i < 20; i++) {
            this.RandomAddItemNode();
        }

        LogMgr.Push(new Date().toString());

        let hex_md5 = MD5Tool.hex_md5("0123456789abc");
        this.label.string = hex_md5; //先测试md5是否正确

        LogMgr.Push(hex_md5);
    }

    private RandomAddItemNode() {
        let idx = Math.floor(this.SyncRandom() * this.itemPrefabList.length);
        let itemNode = cc.instantiate(this.itemPrefabList[idx]);
        itemNode.scale = 0.25;
        this.itemLayer.addChild(itemNode);
        itemNode.setPosition(cc.v2(this.SyncRandom() * 2000, this.SyncRandom() * 2000));
        itemNode.name = "" + this.nodeList.length;
        this.nodeList.push(itemNode);

        return itemNode;
    }

    private ApplyForceToCenter(itemNode: cc.Node, value: number) {
        let r = itemNode.getComponent(cc.RigidBody);
        r.applyForceToCenter(cc.v2(this.SyncRandom() * value, this.SyncRandom() * value), true);
    }

    private PhysicUpdate() {
        cc.director.getPhysicsManager().update(1 / 60, true);

        LogMgr.ClientFrame++;
        if (LogMgr.ClientFrame % this.duration == 0) {
            this.duration = Math.floor(this.SyncRandom() * 600 + 300) + 1; //间隔
            for (let i = 0; i < this.nodeList.length; i++) {
                let itemNode = this.nodeList[i];
                if (this.SyncRandom() > 0.5) {
                    this.ApplyForceToCenter(itemNode, 5000);
                } else {
                    //射线测试
                    let results = cc.director.getPhysicsManager().rayCast(itemNode.position, cc.v2(0, 0), cc.RayCastType.All);
                    for (let j = 0; j < results.length; j++) {
                        let result = results[j];
                        let collider = result.collider;
                        let point = result.point;
                        let normal = result.normal;
                        let fraction = result.fraction;
                        LogMgr.Push("" + LogMgr.LogIdx + "  " + itemNode.name + "  " + LogMgr.ClientFrame + "  " + point.x + "  " + point.y + " " + fraction);
                    }
                }
            }

            let itemNode = this.RandomAddItemNode();
            this.ApplyForceToCenter(itemNode, 2000);
        }
    }

    public update(dt) {
        if (this.isEnd || !this.isStart) {
            return;
        }

        for (let i = 0; i < 100; i++) {
            this.PhysicUpdate();
        }
        if (LogMgr.ClientFrame > 10000) {
            this.isEnd = true;

            let str = "";
            let children = this.itemLayer.children;
            let childrenCount = this.itemLayer.childrenCount;
            for (let i = 0; i < childrenCount; i++) {
                let itemNode = children[i];
                str += itemNode.name + itemNode.x + itemNode.y + itemNode.angle;
            }

            let hex_md5 = MD5Tool.hex_md5(str);
            this.label.string = hex_md5;

            LogMgr.Push(hex_md5);
            LogMgr.Save();
        }
    }

    public OnClick_Start() {
        this.isStart = true;
    }

    public OnClick_Restart() {
        if (cc.sys.browserType) {
            window.location.reload();
        } else {
            cc.game.restart();
        }
    }
}
