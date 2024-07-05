//
// Created by hua on 2017/2/27.
//

#include <iostream>
using namespace std;

int main() {

    // 指针
    int  var1;
    char var2[10];
    cout << "var1 变量的地址： " << &var1 << endl;
    cout << "var2 变量的地址： " << &var2 << endl;
    int  var = 20;   // 实际变量的声明
    int  *ip;        // 指针变量的声明
    ip = &var;       // 在指针变量中存储 var 的地址
    cout << "Value of var variable: " << var << endl;
    cout << "Address stored in ip variable: " << ip << endl;
    cout << "Value of *ip variable: " << *ip << endl;

    // void* 指针可以存放任意对象的地址。 ref: c++ primer
    double obj = 3.14, *pd = &obj;
    void *pv = &obj;
    pv = pd;

    int ival = 1024;
    int *pi = &ival; // pi 指向一个 int 型的数
    int **ppi = &pi; // ppi 指向一个 int 型的指针

    int ii = 42;
    int *p; // p 是一个 int 型指针
    int *&rr = p; // r 是一个对指针 p 的引用
    rr = &ii; // r 引用了一个指针，因此给 r 赋值 &i 就是令 p 指向 i
    *rr = 0; // 解引用 r 得到 i，也就是 p 指向的对象，将 i 的值改为 0

    double arr[5] = {22.1, 32.2, 23.4, 45.2, 37.4};
    double *pt = arr;  // pt points to arr[0]
    ++pt;  // pt points to arr[1]
    double x = *++pt;  // to arr[2]
    // ++*pt;  // arr[2] + 1
    // (*pt)++;  //
    x = *pt++;  // 后缀运算符++的优先级高于*，因此用于 pt，而不是 *pt，对指针递增

    // 错误用法，重要！
    // long *fellow;
    // *fellow = 223323;  // 223323 存在哪里不确定，fellow 指向的地址可能并不是要存放 223323 的地方

    ing age = 39;
    int *pd = &age;  // *pd = 41 is a valid operation
    const int *pt = pd;  // *pt = 42 is an invalid operation

    int sloth = 3;
    const int *ps = &sloth;  // a pointer to const int , ps 可以改为指向其他地址
    int *const finger = &sloth;  // a const pointer to int , finger 只能指向 sloth，但可以用 finger 修改 sloth 的值

    double trouble = 2.0E30;
    const double *const stick = &trouble;  // 指向 const 对象的 const 指针， stick 和 *stick 都是 const

    // 二维数组和指针
    // ar2[r][c] == *(*(ar2 + r) + c)  // same

    // 引用
    int rats;
    // 必须在声明引用变量时 进行初始化
    int &rodents = rats; // 同 int * const pr = &rats; 引用更接近 const 指针

    int *pt = &rats;
    int &rodents = *pt; // 使 rodents 指向 rats
    int bunnies = 50;
    pt = &bunnies;  // 改变 pt 的指向，不影响 rodents 引用

    int    i;
    double d;
    int &r = i;
    double &s = d;

    i = 5;
    cout << "Value of i : " << i << endl;
    cout << "Value of i reference : " << r  << endl;

    d = 11.7;
    cout << "Value of d : " << d << endl;
    cout << "Value of d reference : " << s  << endl;
}
