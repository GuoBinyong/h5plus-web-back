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
  let overStepNumber = conditionResult.overNum;
  let evalJSStr = `history.go(${-overStepNumber})`;
  conditionBack.backWebviewObject.evalJS(evalJSStr);
  return closeWebview(backLocat, conditionResult, conditionBack);
}


//Html5+ 的 webview相关：结束


