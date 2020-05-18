import { ConditionBack, ConditionBackNewOpts } from "back-scheme"


export declare const specialWebviewTypeID: {
    LaunchWebview: "LaunchWebview",   //应用首页WebviewObject窗口对象
    SecondWebview: "SecondWebview", //第二个首页WebviewObject窗口对象
    CurrentWebview: "CurrentWebview",  //当前窗口的WebviewObject对象
    TopWebview: "TopWebview",     //应用显示栈顶的WebviewObject窗口对象
    Opener: "Opener"  // 获取当前Webview窗口的创建者
};

type SpecialWebviewType =
    "LaunchWebview" |   //应用首页WebviewObject窗口对象
    "SecondWebview" | //第二个首页WebviewObject窗口对象
    "CurrentWebview" |  //当前窗口的WebviewObject对象
    "TopWebview" |     //应用显示栈顶的WebviewObject窗口对象
    "Opener"; // 获取当前Webview窗口的创建者


type WebviewID = string

type WebviewType = SpecialWebviewType | WebviewID

/**
 * WebviewObject 对象类型
 */
type WebviewObject = any;




/**
 *
 *
 * 根据 typeID 返回对应的webview
 * @param typeID
 * @return {*}
 */
export function getWebviewByTypeID(typeID?: WebviewType): WebviewObject;








/**
 * 把 typeID 转换为 webviewID
 * @param typeID : string
 *
 */
export function transformTypeIDToWebviewID(typeID: WebviewType): WebviewID;








/**
 * 根据 webviewID 返回对应的 typeID
 * @param webviewID
 * @return typeID
 */
export function getTypeIDByWebviewID(webviewID: WebviewID): WebviewType;






/**
 * 根据 webviewID 返回对应的所有 typeID
 * @param webviewID
 * @return Array<typeID>
 */
export function getAllTypeIDsByWebviewID(webviewID: WebviewID): WebviewType[];








/**
 * 判断指定的 webviewID 是否与当前的 webview 的 id 一样
 * @param webviewID
 * @return {boolean}
 */
export function isCurrentWebview(webviewID: WebviewID): boolean;






/**
 * 判断指定的 webviewID 是否是指定的 typeID 的 webview
 * @param webviewID
 * @param typeID
 * @returns {boolean}
 */
export function webviewIDIsTypeID(webviewID: WebviewID, typeID: WebviewType): boolean;







/**
 * H5plusWebBack 构建函数的选项类型
 */
interface H5plusWebBackNewOpts<CondResult> extends ConditionBackNewOpts<CondResult, H5plusWebBack> {
    targetTypeID?: WebviewType;    //目标 Webview 的 WebviewTypeID
    comparedTypeIDs?: WebviewType[];      //被比较的 Webview 的 WebviewTypeID 的数组
    backTypeID?: WebviewType;      //返回到的 Webview 的 WebviewTypeID
}






/**
 * 增量返回类
 * 主要用于 HTML5+ App
 */
export class H5plusWebBack<CondResult> extends ConditionBack<CondResult> {

    /**
     * 构造函数
     * @param targetTypeID : specialWebviewTypeID | string    目标 Webview 的 WebviewTypeID
     * @param comparedTypeIDs : [TypeID]      被比较的 Webview 的 WebviewTypeID 的数组
     * @param backTypeID : specialWebviewTypeID | string      返回到的 Webview 的 WebviewTypeID
     * @param condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
     * @param action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
     * @param augMode :  AugMode     增加模式
     * @param augmenter : number | string | function      根据新值的类型自动设置增量 或者 增量回调
     */
    constructor(newOpts?: H5plusWebBackNewOpts<CondResult>);



    //目标 Webview 的 WebviewTypeID
    targetTypeID: WebviewType;



    /**
     * 被比较的 Webview 的 WebviewTypeID 的数组
     * @type [WebviewTypeID]
     *
     * 在执行 back 操作之前，会先判断 comparedWebviewIDs 中是否包含 targetWebviewID，如果包含，才会断续执行 back 操作，否则，直接返回 false；
     */
    comparedTypeIDs: WebviewType[];





    //返回到的 Webview 的 WebviewTypeID
    backTypeID: WebviewType;



    get targetWebviewObject(): WebviewObject;

    get targetWebviewID(): WebviewID;

    get comparedWebviewIDs(): WebviewID[];

    get backWebviewObject(): WebviewObject;

}