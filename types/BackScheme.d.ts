import { ConditionBack } from "./ConditionBack"

interface BackMap {
  [key: string]: ConditionBack<any>;
}

type BackMapGet = () => BackMap;

type BackStack = ConditionBack<any>[];
type BackStackGet = () => BackStack;


export class BackScheme {

  /**
   * 返回方案
   * @param backMap : {key:ConditionBack}
   * @param backStack : Array<ConditionBack>
   *
   * 通过 back 方法会选在 backMap 中查找并执行 相应的 conditionBack ；如果查找失败 或者 conditionBack 执行失败 ，则会通过 this.performBackStack(locat) 依次执行 backStack 中的 conditionBack ;
   */
  constructor(backMap?:BackMap | BackMapGet, backStack?:BackStack | BackStackGet);



  /**
   * 可自定义返回策略的返回
   * @param locat ? : any     可选；在执行 conditionBack 时，给 conditionBack.back(locat) 函数传递的位置参数 ;
   * @param key ? : string     可选；返回策略 backMap 中的key，会执行 backMap 中的相应的 conditionBack ；
   * @param disableBackStack ? : boolean     可选；默认值 false; 表示是否禁用 BackStack ；如果该参数的值是 true ，表示：即使 key 对应的 conditionBack 不存在 或者 执行失败，也不会执行 backStack 中的 conditionBack ；
   * @returns boolean  表示是否执行成功
   *
   * 注意：
   * - 该函数会选在 this.backMap 中查找并执行 相应的 conditionBack ；如果查找失败 或者 conditionBack 执行失败  并且 disableBackStack 参数的值不为 true，则会通过 this.performBackStack(locat) 依次执行 backStack 中的 conditionBack ;
   */
  back(locat?: any, key?: string, disableBackStack?: boolean): boolean;





  //backMap:开始



  /**
   * 设置 backMap ；
   */
  backMap: BackMap | BackMapGet;



  /**
   * 把新的 backMap 追加到原来的 backMap 中
   * @param backMap : {key:ConditionBack}
   *
   *
   * 注意：
   * 当 backMap 不是对象 或者 this._backMap 是函数时，会设置 this.backMap = backMap ;
   */
  appendBackMap(backMap: BackMap): void;




  /**
   * 添加 back 到 backMap 的 key 属性中；
   * @param key : string
   * @param back : ConditionBack
   *
   * 当 this._backMap 是函数时，会把 this._backMap 重置为空对象
   */
  appendBackMapItem(key: string, back: ConditionBack<any>): void;


  //backMap:结束










  //返回栈：开始



  /**
   * 设置返回栈；
   * @param newValue : Array<ConditionBack> | function | null
   */
  backStack: BackStack | BackStackGet;






  /**
   * 依次执行 backStack 中的 conditionBack ；直到有成功执行的 conditionBack 为止
   * @param locat
   * @returns conditionBack  返回成功执行的 conditionBack
   */
  performBackStack(locat?: any): ConditionBack<any>;



  //返回栈：结束


}