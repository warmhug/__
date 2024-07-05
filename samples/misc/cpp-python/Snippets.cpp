//
// Created by hua on 2017/3/6.
//
#include <stdio.h>
#include "Base.h"

#if !defined(OS)
#define OS_NOT_DEFINED
#endif

#define min(a, b)  ((a) < (b) ? (a) : (b))

template<typename T, typename M>
inline T const &Min(T const &a, M const &b) { return a < b ? a : b; }

template<typename T>
class list {
};

template<typename K, typename V = list<K> >
class hash {
};

void globalFunc();

namespace foo {
    /**
    ...Foo...
    */
    class Foo {
    public:
        Foo();

        ~Foo();

        virtual Foo *getSelf() { return Foo::getSelf(); }

    private:
        void innerFunc();

        int var;
    };
}

struct FooPOD {
    #ifdef OS_NOT_DEFINED
    #define OS "unknown"
    #endif
    #define FooPOD_OS OS
    int i;
};

struct FooC {
private:
    int i;
};

extern int a;

static int innerFunc();

int a = innerFunc();

int innerFunc() { return 5; }
/*
void foo::Foo::innerFunc() {
    label1:
    int continuation = 0xCD + 0xFD + 0xBAADF00D;
    auto la = [](int i1, int i2) -> bool mutable {
        label2:
        return i1 < i2;
    }(1, 2);
}
*/

/*
template<class T>
struct FooT {
    char g();

    hash<int, list<char> > elems;

    template<int N>
    int foo() { return N; }

    template<>
    int foo<2>() { return Min<>(1, 5); }

    list<int> mem = {1, 2, 3};
    float vector[3] = {};

    FooT() : elems{{-1, {'c', 'p', 'p'}},
                   {1,  {'j', 'b'}}}, vector{1f, 2f, 3f} {}

    FooT operator++(int) volatile { return *this; }

    auto f(T t) -> decltype(t + g()) { return t + g(); }
};

class Bar {
};

struct FooBase {
};

int doSomething(...) { return 1; }

struct Foo : private FooBase {
public:
    int i;

    virtual int action(int, char, float) = 0;

    virtual Foo *getSelf() { return this; }

private:
    static int method() {};
};

namespace fooNS {
    class FooClass : Foo, virtual FooBase {
        typedef int (FooClass::*ACTION)(int);

    public:
        FooClass() { act = &FooClass::nv_action; }

        virtual ~FooClass() {};

        int nv_action(int arg) { return arg; }

        virtual int action(int color, char alpha, float);

        virtual Foo *getSelf() { return Foo::getSelf(); }

        int method() {
            FooT<int> bar;
            int X[] = {1, 3, 5, 6, 7, 87, 1213, 2};
            int W[][3] = {{1, 3, 5},
                          {6, 7, 8}};
            int y = 0, x;
            auto la = [X, W](int i1, int i2) -> bool mutable { return i1 < i2; }(1, 2);
            auto laF = []() {};
            bool z = (bar.foo<2>() & 4) == 4;
            for (int i = 0; i < x; i++) {
                y += (y ^ 0x123) << 2;
            }
            do {
                try {
                    if (0 < x && x < 10) {
                        while (x != y) {
                            x = min(x * 3, 5);
                        }
                        x = x >= 5 ?: 5;
                    } else if (min(1, 5) == 1) {
                        switch (this->action(0xFeeL, 0120, 0.01F)) {
                            default:
                                break;
                            case 1:
                                continue;
                        }
                    }
                }
                catch (char *message) {
                    const int *arr = X;
                    x = ((y >= 0) ? arr[y] : -1);
                }
            } while (true);
        }

        ACTION act;
    private:
        int var;
    };
}

int fooNS::FooClass::action(int color, char alpha, float) {
    fooNS::FooClass object, *ptr = (fooNS::FooClass *) object.getSelf()->getSelf()->getSelf();
    (object.*object.act)(1);
    ptr->action(10001, '\x1A', 1e13f);
    ptr->getSelf()->getSelf()->getSelf()->getSelf();
    return doSomething(color);
}

*/

typedef void(fn)(int i, int j, int k);

typedef void(*block)(int i, int j, int k);

typedef int X;

int &refTest(X &&x, int y, int b, void *(*)()) {
    int **&p = (int **&) x;
    int static &r = *&x;
    return r && (r & x) ? r : x;
}

struct fooS {
    int i;
    char j;
} foo_t;
enum fooE {
    SUNDAY = 111, MONDAY = 222, TUESDAY = 333, WEDNESDAY = TUESDAY + 1
} foo_e;
