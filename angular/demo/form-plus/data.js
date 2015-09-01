/**
 *   后端数据
 */

var personInfo = {
    name: '',
    txt: 'ddd',
    email: 'sss@sd',
    selectedCompany: 1,
    company: [
        {id: 1, name: 'google'},
        {id: 2, name: 'apple'},
        {id: 3, name: 'soft......'}
    ],
    selectedSex: '',
    sex: [
        {id: 1, name: '女'},
        {id: 2, name: '男'},
        {id: 3, name: 'xxx'},
        {id: 4, name: '........................................................'},
        {id: 5, name: '0000000000000000000..........................'}
    ],
    tags: [
        {flag: true, name: 'shuai'},
        {flag: false, name: 'chou'},
        {flag: true, name: 'shuai'},
        {flag: true, name: 'shuai'}
    ]
};

var schResult = {
    success: true,
    totalItems: 2000,
    currentPage: 1,
    lists: [
        {sel: true, name: 'll1', selectedSex: '男', email: 'xx1@yy', desc: 'long text'},
        {sel: true, name: 'xx2', selectedSex: '女', email: 'xx2@yy', desc: 'long text'},
        {sel: true, name: 'ss3', selectedSex: '男或女', email: 'xx3@yy', desc: 'long text'},
        {sel: true, name: 'ee4', selectedSex: 'male4', email: 'xx4@yy', desc: 'long text'},
        {sel: true, name: 'ff5', selectedSex: 'xxx', email: 'xx5@yy', desc: 'long text'},
        {sel: true, name: 'ss1', selectedSex: 'male6', email: 'xx6@yy',
            desc: 'long text ddddddddddddddddddddddddddddddddd'}
    ]
};

var editItem = {
    name: '',
    selectedSex: '',
    sex: angular.copy(personInfo.sex),
    email: '',
    desc: ''
};