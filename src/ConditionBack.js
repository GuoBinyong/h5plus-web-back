import {normal} from './Action.js';
import {allPass} from './Condition.js'



//增量模式
export const augModeMap = {
  constant:"constant",  //根据增量常数 augConstant 的值进行衰减
  history:"history",    //增加 history.length
  callBack: "callBack"   //根据 augCallBack 函数的返回值进行增量
};












/**
 * 增量返回类
 * 主要用于web
 */
export class ConditionBack {


  /**
   * 构造函数
   * @param condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
   * @param action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
   * @param augMode :  AugMode     增加模式
   * @param augmenter : number | string | function      根据新值的类型自动设置增量 或者 增量回调
   */
  constructor({condition,action,augMode,augmenter} = {}){

    if (condition) {
      this.condition = condition ;
    }

    if (action) {
      this.action = action ;
    }


    if (augMode) {
      this.augMode = augMode ;
    }

    if (augmenter != undefined) {
      this.augmenter = augmenter ;
    }

  }


  //增加模式
  augMode = augModeMap.constant ;




  /**
   * condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
   * @param stepNumber : number    返回的步数
   * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
   * @returns any    返回真值，表示是否要执行 action ，并且会被作为参数传给 action ； 返回假值，表示不执行 action
   */
  condition = allPass ;

  /**
   * action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
   * @param stepNumber : number 返回的步数
   * @param conditionResult : any  条件结果
   * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
   * @returns boolean     表求行为是否执行成功
   */
  action = normal ;




  augConstant = 0 ;  //增量


  get augCallBack(){
    if (!this._augCallBack){
      this._augCallBack =  ()=>{return this.augConstant ;}
    }
    return this._augCallBack ;
  }

  set augCallBack(newValue){
    this._augCallBack = newValue ;
  }


  /**
   * 根据当前设置的增量模式获取增量
   * @return {number}
   */
  get augmenter(){

    let aug = this.augConstant ;

    switch (this.augMode){

      case augModeMap.history : {
        aug = history.length - 1;
        break ;
      }


      case augModeMap.callBack : {
        aug = this.augCallBack();
        break ;
      }
    }

    return aug;

  }


  /**
   * 根据新值的类型自动设置增量 或者 增量回调
   * @param newValue
   */
  set augmenter(newValue){

    let newValueType = typeof newValue ;

    if (newValueType == "function" ) {
      this.augCallBack = newValue ;
    }else {
      let newNum = parseInt(newValue);

      if (!isNaN(newNum)) {
        this.augConstant = newNum ;
      }

    }


  }







  back(locat){
    if (locat == null){
      locat = 1
    }

    let backLocat = locat ;
    let backNumber = parseInt(locat) ;

    if (backNumber === 0) {
      history.go(0) ;
      return true;
    }

    if (!isNaN(backNumber)){
      backLocat = backNumber + this.augmenter ;
    }


    let conditionResult = this.condition(backLocat, this) ;

    let backResult = false ;

    try {
      if (conditionResult && this.action){
        backResult = this.action(backLocat,conditionResult,this);
      }
    }catch (e) {
      backResult = false ;
    }

    return backResult ;

  }


}