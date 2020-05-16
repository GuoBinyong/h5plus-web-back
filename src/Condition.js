/**
 * 总是通过
 * @param backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据
 * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
 * @returns boolean
 */
export function allPass(backLocat, conditionBack) {
  return true;
}





/**
 * 溢出历史栈
 * @param backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据
 * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
 * @returns {{overflow: boolean, overNum: number}}
 */
export function aboutBeyondHistory(backLocat, conditionBack) {

  let hisLength = history.length;
  let overNum = backLocat + 1 - hisLength;
  let overflow = overNum > 0;

  return {
    overflow: overflow,
    overNum: overNum
  };

}






/**
 * 判断 locat 是否是数字类型
 * @param backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据
 * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
 * @returns {isNumber: boolean 表示locat 是否是数字}
 *
 *
 * 注意：
 * 此 condition 始终返回对象，即拿 action 始终会被执行，返回的逻辑需要在 action 中根据 条件结果 conditionResult 进行处理
 */
export function judgeLocatIsNumber(backLocat, conditionBack) {
  return {isNumber : (typeof backLocat) == "number"} ;
}




/**
 * 判断 locat 是否是数字类型
 * @param backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据
 * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
 * @returns boolean 表示locat 是否是数字}
 */
export function locatIsNumber(backLocat, conditionBack) {
  return (typeof backLocat) == "number";
}




/**
 * 判断 locat 是否不是数字类型
 * @param backLocat : number | any     返回的步数，也可以是传给back函数的其它任何类型的数据
 * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
 * @returns boolean 表示locat 是否不是数字}
 */
export function locatIsNotNumber(backLocat, conditionBack) {
  return (typeof backLocat) != "number";
}
