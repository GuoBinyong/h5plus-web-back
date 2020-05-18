import {H5plusWebBack} from "./H5plusWebBack"


  //Html5+ 的 webview相关：开始

//关闭 webview
export function closeWebview(backLocat:any, conditionResult:any, conditionBack:H5plusWebBack<any>):true;


//退出应用
export function quit():true;


//跳过目标 webview ，并继续
export function jumpTargetAndContinue(backLocat:any, conditionResult:any, conditionBack:H5plusWebBack<any>):boolean;


//超出时继续
export function continueForOver(backLocat:any, conditionResult:any, conditionBack:H5plusWebBack<any>):boolean;


//Html5+ 的 webview相关：结束
  
  
  