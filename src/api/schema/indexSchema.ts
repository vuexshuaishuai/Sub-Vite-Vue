/* 注释: 接口定义公共文件 */

/* 接口返回数据类型定义: data为Array */
export interface Rows<T> {
    code: number;
    data: Array<T>;
}

/* 接口返回数据类型定义: data为Object */
export interface ObjRows<T> {
    code: number;
    data: T;
}