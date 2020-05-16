//浏览器相关：开始


//不执行任何操作
export function none(backLocat) {
  return true;
}


//正常的返回
export function normal(backLocat) {
  history.go(-backLocat);
  return true;
}


//关闭浏览器的 window
export function closeBrowserWindow() {
  window.close();
  return true;
}


/**
 * 创建 超出历史栈相关的 action
 * @param actionForOver : (backLocat : number | any   返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    超出历史栈时执行的 action
 * @param actionForLack ? : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    未出历史栈时执行的 action；默认执行 history.go(-backLocat)
 * @returns actionBeyondHistory : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean
 */
export function createActionBeyondHistory(actionForOver, actionForLack) {

  let actionBeyondHistory = function (backLocat, conditionResult, conditionBack) {

    if (conditionResult.overflow) {
      return actionForOver(backLocat, conditionResult, conditionBack);
    } else if (actionForLack) {
      return actionForLack(backLocat, conditionResult, conditionBack);
    } else {
      history.go(-backLocat);
      return true;
    }

  };


  return actionBeyondHistory;
}









/**
 * 创建 决定位置 locat 是否是数字的 action
 * @param actionForNo : (backLocat : number | any   返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    当locat不是数字类型时执行的 action
 * @param actionForIs ? : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean    当locat是数字类型时执行的 action；默认执行 history.go(-backLocat)
 * @returns aboutIsNumberForLocatAction : (backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据, conditionResult : any  条件结果)=> boolean
 */
export function createJudgeLocatIsNumberAction(actionForNo, actionForIs) {

  let judgeLocatIsNumberAction = function (backLocat, conditionResult, conditionBack) {

    if (!conditionResult.isNumber) {
      return actionForNo(backLocat, conditionResult, conditionBack);
    } else if (actionForIs) {
      return actionForIs(backLocat, conditionResult, conditionBack);
    } else {
      history.go(-backLocat);
      return true;
    }

  };


  return judgeLocatIsNumberAction;
}




//浏览器相关：结束












//Html5+ 的 webview相关：开始

//关闭 webview
export function closeWebview(backLocat, conditionResult, conditionBack) {
  conditionBack.targetWebviewObject.close();
  return true;
}


//退出应用
export function quit() {
  plus.runtime.quit();
  return true;
}


//跳过目标 webview ，并继续
export function jumpTargetAndContinue(backLocat, conditionResult, conditionBack) {
  let backStepNum = backLocat - 1;

  if (backStepNum !== 0) {
    let evalJSStr = `history.go(${-backStepNum})`;
    conditionBack.backWebviewObject.evalJS(evalJSStr);
  }
  return closeWebview(backLocat, conditionResult, conditionBack);
}


//超出时继续
export function continueForOver(backLocat, conditionResult, conditionBack) {
  let overbackLocat = conditionResult.overNum;
  let evalJSStr = `history.go(${-overStepNumber})`;
  conditionBack.backWebviewObject.evalJS(evalJSStr);
  return closeWebview(backLocat, conditionResult, conditionBack);
}


//Html5+ 的 webview相关：结束


