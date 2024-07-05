//
// Created by hua on 2017/2/27.
//

#include <iostream>
#include <string>
using namespace std;  // 不建议这么写 http://stackoverflow.com/questions/1452721/why-is-using-namespace-std-considered-bad-practice
//using std::cout;  // 建议做法

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
