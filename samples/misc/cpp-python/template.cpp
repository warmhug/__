//
// Created by hua on 2017/2/27.
//

// c++ 中有 类模板、函数模板
#include <iostream>
#include <vector>
#include <string>

using std::cout;
using std::endl;
using std::vector;
using std::string;

//template <typename T>
template <class T>
T min(T x, T y) {
    return (x < y) ? x : y;
}

template <class T>
void Swap(T &, T &);  // template prototype

// 显式具体化(explicit specialization)  template 后跟 <>
template <> void Swap<job>(job &j1, job &j2);
template <> void Swap(job &j1, job &j2);
// 显式实例化(explicit instantiation)  template 后不跟 <>
template void Swap<int>(int, int);

int main() {
    int n1 = 2, n2 = 10;
    double d1 = 1.5, d2 = 5.6;
    cout << "较小整数：" << min(n1, n2) << endl;

    vector<int> ivec;
    vector<vector<string> > file; // 该向量的元素是 vector 对象

    return 0;
}
