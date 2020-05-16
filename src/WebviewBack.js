
//特殊的webviewID
import {ConditionBack} from "./ConditionBack";
import {aboutBeyondHistory} from './Condition.js'
import {createActionBeyondHistory,closeWebview} from './Action.js';

export const specialWebviewTypeID = {
  LaunchWebview : "LaunchWebview" ,   //应用首页WebviewObject窗口对象
  SecondWebview : "SecondWebview"  , //第二个首页WebviewObject窗口对象
  CurrentWebview : "CurrentWebview" ,  //当前窗口的WebviewObject对象
  TopWebview : "TopWebview" ,     //应用显示栈顶的WebviewObject窗口对象
  Opener: "Opener"  // 获取当前Webview窗口的创建者
};




/**
 *
 *
 * 根据 typeID 返回对应的webview
 * @param typeID
 * @return {*}
 */
export function getWebviewByTypeID(typeID) {
  let wvo = null ;

  switch (typeID) {
    case specialWebviewTypeID.LaunchWebview : {
      wvo = plus.webview.getLaunchWebview();
      break;
    }

    case specialWebviewTypeID.SecondWebview : {
      wvo = plus.webview.getSecondWebview();
      break;
    }

    case specialWebviewTypeID.CurrentWebview : {
      wvo = plus.webview.currentWebview();
      break;
    }


    case specialWebviewTypeID.TopWebview : {
      wvo = plus.webview.getTopWebview();
      break;
    }



    case specialWebviewTypeID.Opener : {
      let currWVO = plus.webview.currentWebview();
      wvo = currWVO.opener();
      break;
    }

    default : {
      if (typeID) {
        wvo = plus.webview.getWebviewById(typeID) ;
      }
    }

  }



  return wvo;
}




/**
 * 把 typeID 转换为 webviewID
 * @param typeID : string
 *
 */
export function transformTypeIDToWebviewID(typeID) {
  let wvID = typeID ;
  if (Object.values(specialWebviewTypeID).includes(wvID)){
    let wvo = getWebviewByTypeID(wvID);
    wvID = wvo && wvo.id ;
  }

  return wvID ;
}




/**
 * 根据 webviewID 返回对应的 typeID
 * @param webviewID
 * @return typeID
 */
export function getTypeIDByWebviewID(webviewID) {

  let wIDAndTIDMap = {};
  let wvo = null ;

  let webview = plus.webview ;

  wvo = webview.getLaunchWebview();
  if (wvo) {
    wIDAndTIDMap[wvo.id] = specialWebviewTypeID.LaunchWebview ;
    wvo = null ;
  }


  wvo = webview.getSecondWebview();
  if (wvo) {
    wIDAndTIDMap[wvo.id] = specialWebviewTypeID.SecondWebview ;
    wvo = null ;
  }


  wvo = webview.currentWebview();
  if (wvo) {
    wIDAndTIDMap[wvo.id] = specialWebviewTypeID.CurrentWebview ;
    wvo = null ;
  }


  wvo = webview.getTopWebview();
  if (wvo) {
    wIDAndTIDMap[wvo.id] = specialWebviewTypeID.TopWebview ;
    wvo = null ;
  }


  let currWVO = plus.webview.currentWebview();
  wvo = currWVO.opener();
  if (wvo) {
    wIDAndTIDMap[wvo.id] = specialWebviewTypeID.Opener ;
    wvo = null ;
  }




  let typeID = wIDAndTIDMap[webviewID] || webviewID ;

  return typeID;
}


/**
 * 根据 webviewID 返回对应的所有 typeID
 * @param webviewID
 * @return Array<typeID>
 */
export function getAllTypeIDsByWebviewID(webviewID) {

  let allTypeIDs = [];
  let wvo = null ;

  let webview = plus.webview ;



  //mark: 由于不带 `break` 的 switch 控制流有bug (会匹配第一次成功匹配后的所有 case )，所以这里用 if 语句来实现
  let launchWebview = webview.getLaunchWebview();
  let launchWebviewID = launchWebview && launchWebview.id;
  if (webviewID == launchWebviewID) {
    allTypeIDs.push(specialWebviewTypeID.LaunchWebview);
  }

  let secondWebview = webview.getSecondWebview();
  let secondWebviewID = secondWebview && secondWebview.id ;
  if (webviewID == secondWebviewID) {
    allTypeIDs.push(specialWebviewTypeID.SecondWebview);
  }



  let currentWebview = webview.currentWebview();
  let currentWebviewID = currentWebview && currentWebview.id ;
  if (webviewID == currentWebviewID) {
    allTypeIDs.push(specialWebviewTypeID.CurrentWebview);
  }



  let topWebview = webview.getTopWebview();
  let topWebviewID = topWebview && topWebview.id ;
  if (webviewID == topWebviewID) {
    allTypeIDs.push(specialWebviewTypeID.TopWebview);
  }


  let opener = currentWebview.opener();
  let openerID = opener && opener.id ;
  if (webviewID == openerID) {
    allTypeIDs.push(specialWebviewTypeID.Opener);
  }


  if  (allTypeIDs.length <= 0){
    allTypeIDs.push(webviewID);
  }

  return allTypeIDs;
}


/**
 * 判断指定的 webviewID 是否与当前的 webview 的 id 一样
 * @param webviewID
 * @return {boolean}
 */
export function isCurrentWebview(webviewID) {
  let currWVO = plus.webview.currentWebview();
  return currWVO.id == webviewID ;
}


/**
 * 判断指定的 webviewID 是否是指定的 typeID 的 webview
 * @param webviewID
 * @param typeID
 * @returns {boolean}
 */
export function webviewIDIsTypeID(webviewID,typeID) {
  let typeWV = getWebviewByTypeID(typeID);
  return webviewID == typeWV.id ;
}









/**
 * 增量返回类
 * 主要用于 HTML5+ App
 */
export class WebviewBack extends ConditionBack{

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
  constructor({targetTypeID,comparedTypeIDs,backTypeID,condition,action,...superParams} = {}){
    super(superParams);

    if (targetTypeID) {
      this.targetTypeID = targetTypeID;
    }

    if (Array.isArray(comparedTypeIDs)){
      this.comparedTypeIDs = comparedTypeIDs;
    }


    if (backTypeID) {
      this.backTypeID = backTypeID;
    }


    if (condition) {
      this.condition = condition ;
    }

    if (action) {
      this.action = action ;
    }

  }


  //目标 Webview 的 WebviewTypeID
  targetTypeID = specialWebviewTypeID.CurrentWebview ;


  /**
   * 被比较的 Webview 的 WebviewTypeID 的数组
   * @type [WebviewTypeID]
   *
   * 在执行 back 操作之前，会先判断 comparedWebviewIDs 中是否包含 targetWebviewID，如果包含，才会断续执行 back 操作，否则，直接返回 false；
   */
  comparedTypeIDs = [specialWebviewTypeID.CurrentWebview] ;

  /**
   *默认：当超出历史时，关闭目标 Webview；未超出时，正常返回；
   */
  condition = aboutBeyondHistory ;
  action = createActionBeyondHistory(closeWebview) ;


  //返回到的 Webview 的 WebviewTypeID
  get backTypeID(){
    if (!this._backTypeID ){
      this._backTypeID = specialWebviewTypeID.Opener ;
    }

    return this._backTypeID ;
  }

  set backTypeID(newValue){
    this._backTypeID = newValue ;
  }



  get targetWebviewObject(){
    return getWebviewByTypeID(this.targetTypeID);
  }


  get targetWebviewID(){
    return transformTypeIDToWebviewID(this.targetTypeID); ;
  }



  get comparedWebviewIDs(){

    let wvIDList = this.comparedTypeIDs.map(function (typeID) {
      return transformTypeIDToWebviewID(typeID) ;
    });

    return wvIDList ;
  }



  get backWebviewObject(){

    let backWVO = null ;

    if (this.backTypeID == specialWebviewTypeID.Opener) {
      let targetWVO = this.targetWebviewObject ;
      backWVO = targetWVO && targetWVO.opener() ;
    }else {
      backWVO = getWebviewByTypeID(this.backTypeID);
    }

    return backWVO;
  }





//返回模式对应的处理器：开始

  back(locat){

    if (this.comparedWebviewIDs.includes(this.targetWebviewID)) {
      return super.back(locat);
    }else {
      return false;
    }
  }



}

