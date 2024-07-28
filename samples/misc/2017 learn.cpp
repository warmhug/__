//
// Created by hua on 2017/2/27.
//

#include <iostream>
#include <string>
#include <vector>
#include <string>

using namespace std;  // 不建议这么写 http://stackoverflow.com/questions/1452721/why-is-using-namespace-std-considered-bad-practice
using std::cout;   // 建议做法
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
  // 使用 new 来为 内置类型 分配动态内存
  int *pi = new int(6);  // *pi set to 6
  double *pd = new double(99.99);  // *pd set to 99.99
  int *ar = new int[4]{2, 4, 6, 7};  // C++11

  // new delete 的实质
  int *pi = new int; // 会被转换为 int *pi = new(sizeof(int));
  int *pa = new int[40]; // 会被转换为 int *pa = new(40 * sizeof(int));
  delete pi;             // 会被转换为 delete(pi);

  const Stock land = Stock("xx");
  land.show();  // 编译器将拒绝执行此行，因为 show() 代码无法确保调用对象 land 不被修改
  // show 方法所使用的对象是由方法调用隐式提供的，所以需要一种新语法，保证函数不会修改调用对象
  void show() const;  // promises not to change invoking object
  void Stock::show() const;  // promises not to change invoking object

  // c++11 中新增了 基于范围的for循环，便于操作数组或容器类
  double prices[5] = {4.99, 10.99, 6.87, 7.99};
  for (double x : prices) {
    std::cout << x << std::endl;
  }

  double (*pf)(int);  // pf points to a function that returns double
  double *pf(int);  // pf() a function that returns a pointer-to-double

  // 以下三种写法都正确
  const double *f1(const double ar[], int n);
  const double *f2(const double [], int);
  const double *f3(const double *, int);
  // 声明一个指针，指向以上三个函数之一
  const double *(*p1)(const double *, int) = f1;
  auto p1 = f2;  // c++11 automatic type deduction 自动类型推断
  // 声明一个 函数指针数组，包含以上三个函数
  const double *(*pa[3])(const double *, int) = {f1, f2, f3};
  auto pb = pa;  // pa pb 都是指向函数指针的指针
  // 调用函数
  const double *px = pa[0](av, 3);
  const double *py = (*pb[1])(av, 3);
  // 创建指向整个数组的指针
  auto pc = &pa;  // c++11
  const double *(*(*pd)[3])(const double *, int) = &pa;  // c++98
  **&pa == *pa == pa[0];

  // 使用 typedef 起别名做简化
  typedef const double *(*p_fun)(const double *, int);  // p_fun now a type name
  p_fun p1 = f1;  // p1 points to the f1() function
  p_fun pa[3] = {f1, f2, f3};
  p_fun(*pd)[3] = &pa;  // pd points to an array of 3 function pointers

  return 0;
}


int main() {
    int n1 = 2, n2 = 10;
    double d1 = 1.5, d2 = 5.6;
    cout << "较小整数：" << min(n1, n2) << endl;

    vector<int> ivec;
    vector<vector<string> > file; // 该向量的元素是 vector 对象

    return 0;
}


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


#define NEWLINE '\n'
#define LENGTH 10  // 使用 #define 预处理器定义常量
const int WIDTH = 5; // 使用 const 前缀声明指定类型的常量
int g; // 全局变量声明. 在所有函数外部定义的变量，称为全局变量
int func(); // 函数声明

// 结构体
struct inflatable {
  char name[20];
  float volume;
  double price;
}

void swapr(int & a, int & b);   // a, b are aliases for ints
void swapp(int * p, int * q);   // p, q are addresses of ints
void swapv(int a, int b);       // a, b are new variables

int main()
{
    using namespace std;
    int wallet1 = 300;
    int wallet2 = 350;

    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;

    cout << "Using references to swap contents:\n";
    swapr(wallet1, wallet2);   // pass variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;
    // 类型不匹配时，swapr 函数内会创建 临时变量、交换的是临时变量，而 a b 保持不变
    long a = 3, b = 5;
    swapr(a, b);
    cout << "a = " << a << " b = " << b << endl;

    cout << "Using pointers to swap contents again:\n";
    swapp(&wallet1, &wallet2); // pass addresses of variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;

    cout << "Trying to use passing by value:\n";
    swapv(wallet1, wallet2);   // pass values of variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;
    // cin.get();
    return 0;
}

void swapr(int & a, int & b)    // use references
{
    int temp;

    temp = a;       // use a, b for values of variables
    a = b;
    b = temp;
}

void swapp(int * p, int * q)    // use pointers
{
    int temp;

    temp = *p;      // use *p, *q for values of variables
    *p = *q;
    *q = temp;
}

void swapv(int a, int b)        // try using values
{
    int temp;

    temp = a;      // use a, b for values of variables
    a = b;
    b = temp;
}

int main() {
    // 局部变量声明 并定义 并初始化
    char ch = 'A', ch1 = 'B';
    int x;
    // 变量初始化
    x = 3;  // c 中初始化方式
    int x1(5);  // c++ 中新增的初始化方式
    int x2 = {5};  // c++98 中新增的初始化 单值变量 的方式，可以不写 =
    cout << "x1: " << x1 << x2 << endl;

    cout << "基本的内置类型：bool / char / int / float / double / void / wchar_t" << endl;
    cout << "类型修饰符：signed / unsigned / short / long" << endl;

    cout << "bool / char / int / float / double 占据空间大小："
         << sizeof(bool) << sizeof(char) << sizeof(int) << sizeof(float) << sizeof(double) << endl;

    cout << "long int / unsigned int / signed short int 占据空间大小："
         << sizeof(long int) << sizeof(unsigned int) << sizeof(signed short int) << endl;

    short int i;           // 有符号短整数
    short unsigned int j;  // 无符号短整数
    j = 50000;
    i = j;
    cout << i << " " << j << endl;

    // 数组
    double balance[5] = {1000.0, 2.0, 3.4, 17.0, 50.0};  // c++11 可省略 = 号
    long plifs[] = {25, 92, 3.0};  // c++11 编译不通过，不能将浮点数转换为整数
    char slifs[] = {'h', 'i', 1122011, '\0'};  // c++11 编译不通过，1122011 超出 char 范围

    // 字符串实际上是使用 null 字符 '\0' 终止的一维字符数组
    char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};  // 不能将一个数组赋给另一个数组
    // char greeting[] = "Hello";  // c 语言中只能用 char 数组定义字符串，而 c++ 中新增了 string 类
    cout << "Greeting message: " << greeting << " 拼接字符串方式（略奇怪）：str1 " "str2" << endl;

    char str1[10] = "Hello";
    char str2[10] = "World";
    // 连接 str1 和 str2
    strcat( str1, str2);
    cout << "strcat( str1, str2): " << str1 << endl;

    //  String 类
    string str111 = {"Hello"};  // c++11 风格初始化 可省略 = 号
    string str11 = "Hello";  // c 风格初始化
    string str22 = "World";
    string str3;
    str3 = str11 + str22;
    cout << "str11 + str22 : " << str3 << str3.size() << endl;
    // 原始字符串
    cout << R"(Jim "King" Tutt uses "\n" instead of endl.)" << '\n';
    // 在原始字符串中包含 )"
    cout << R"+*("(Who wouldn't?)", she whispered.)+*" << endl;

    // 初始化结构体
    inflatable guest = {
      "Glorious Gloria",  // name value
      1.88,               // volume value
      29.99               // price value
    };
    cout << guest.price << endl;
    // 创建 包含 100 个 inflatable 结构的数组
    inflatable gifts[100];
    cin >> gifts[0].volume;
    cout << gifts[99].price << endl;

    // 枚举类型
    enum color { red, green, blue } c;
    c = red;  // valid
    // c = 2000; // invalid
    cout << c << endl;
    enum bits
    {
      one = 1,
      two = 2,
      four = 4,
      eight = 8
    };
    bits myflag;
    myflag = bits(6); // valid, 6 不是枚举值，但它位于枚举定义的取值范围内

    // 函数调用
    int fn = func();

    return 0;
}

// 函数定义
int func() {
    return 0;
}
