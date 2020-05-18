import {Action} from "./ConditionBack"
import {WebviewBack} from "./WebviewBack"


//浏览器相关：开始


//不执行任何操作
export function none():true
  
  
//正常的返回
export function normal():true;
  
  
//关闭浏览器的 window
export function closeBrowserWindow():true;
  
  
/**
 * 创建 超出历史栈相关的 action
 * @param actionForOver : (backLocat : number | any   返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    超出历史栈时执行的 action
 * @param actionForLack ? : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    未出历史栈时执行的 action；默认执行 history.go(-backLocat)
 * @returns actionBeyondHistory : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean
 */
export function createActionBeyondHistory<CondResult,CondBack = ConditionBack>(actionForOver:Action<CondResult,CondBack>, actionForLack?:Action<CondResult,CondBack>):Action<CondResult,CondBack>;
  
  
  
  
  
  
  
  
  
/**
 * 创建 决定位置 locat 是否是数字的 action
 * @param actionForNo : (backLocat : number | any   返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    当locat不是数字类型时执行的 action
 * @param actionForIs ? : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    当locat是数字类型时执行的 action；默认执行 history.go(-backLocat)
 * @returns aboutIsNumberForLocatAction : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean
 */
export function createJudgeLocatIsNumberAction<CondResult,CondBack = ConditionBack>(actionForNo:Action<CondResult,CondBack>, actionForIs?:Action<CondResult,CondBack>):Action<CondResult,CondBack>;
  
  
  
  
//浏览器相关：结束
  
  
  
  
  
  
  
  
  
  
  
  
//Html5+ 的 webview相关：开始

//关闭 webview
export function closeWebview(backLocat:any, conditionResult:any, conditionBack:WebviewBack<any>):true;


//退出应用
export function quit():true;


//跳过目标 webview ，并继续
export function jumpTargetAndContinue(backLocat:any, conditionResult:any, conditionBack:WebviewBack<any>):boolean;


//超出时继续
export function continueForOver(backLocat:any, conditionResult:any, conditionBack:WebviewBack<any>):boolean;


//Html5+ 的 webview相关：结束
  
  
  