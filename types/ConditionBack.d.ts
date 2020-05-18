//增量模式
export declare const augModeMap: {
  constant: "constant",  //根据增量常数 augConstant 的值进行衰减
  history: "history",    //增加 history.length
  callBack: "callBack"   //根据 augCallBack 函数的返回值进行增量
};


type AugMode = "constant" | "history" | "callBack";


/**
* condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
* @param stepNumber : number    返回的步数
* @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
* @returns any    返回真值，表示是否要执行 action ，并且会被作为参数传给 action ； 返回假值，表示不执行 action
*/
export type Condition<CondResult, CondBack = ConditionBack> = (stepNumber: any, conditionBack: CondBack) => CondResult;

/**
* action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
* @param stepNumber : number 返回的步数
* @param conditionResult : any  条件结果
* @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
* @returns boolean     表求行为是否执行成功
*/
export type Action<CondResult, CondBack = ConditionBack> = (stepNumber: any, conditionResult: CondResult, conditionBack: CondBack) => boolean;

type AugCallBack = () => number;

type Augmenter = number | string | AugCallBack;

export interface ConditionBackNewOpts<CondResult, CondBack = ConditionBack> {
  condition?: Condition<CondResult, CondBack>;         //条件；默认值是 allPass
  action?: Action<CondResult, CondBack>;   //行为；默认值是正常的返回
  augMode?: AugMode     //增加模式
  augmenter?: Augmenter      //根据新值的类型自动设置增量 或者 增量回调
}






/**
 * 增量返回类
 * 主要用于web
 */
export class ConditionBack<CondResult, CondBack = this> {


  /**
   * 构造函数
   * @param condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
   * @param action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
   * @param augMode :  AugMode     增加模式
   * @param augmenter : number | string | function      根据新值的类型自动设置增量 或者 增量回调
   */
  constructor(props?: ConditionBackNewOpts<CondResult, CondBack>);


  //增加模式
  augMode: AugMode;




  /**
   * condition : (stepNumber,conditionBack)=> any         条件；默认值是 allPass
   * @param stepNumber : number    返回的步数
   * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
   * @returns any    返回真值，表示是否要执行 action ，并且会被作为参数传给 action ； 返回假值，表示不执行 action
   */
  condition: Condition<CondResult, CondBack>;

  /**
   * action : (stepNumber, conditionResult,conditionBack)=>boolean   行为；默认值是正常的返回
   * @param stepNumber : number 返回的步数
   * @param conditionResult : any  条件结果
   * @param conditionBack : ConditionBack   调用条件函数的 ConditionBack 对象
   * @returns boolean     表求行为是否执行成功
   */
  action?: Action<CondResult, CondBack>;




  augConstant: number;  //增量


  augCallBack: AugCallBack;




  /**
   * 根据当前设置的增量模式获取增量
   * @return {number}
   */
  augmenter: Augmenter;







  back(locat?: any): boolean;


}