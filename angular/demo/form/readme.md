
## angular - form

### input - control控件

    radio checkbox 使用上的区别：
    <input type="radio" ng-value="item.id" ng-model=“parent.sel" />
    <input type="checkbox" ng-model=“item.flag" />


    radio按钮组、select列表框（含默认值）的示例
    <div class="radio-list">
        <label class="radio-inline">
            <input type="radio" value="" ng-model="xx.sel" /> 默认值
        </label>
        <label class="radio-inline" ng-repeat="item in lists">
            <input type="radio" ng-value="item.id" ng-model="xx.sel" /> {{ item.desc }}
        </label>
    </div>

    <select class="form-control"
            ng-model="bagQueryForm.pieceType"
            ng-options="t.code as t.desc for t in pieceTypeLists">
        <option value="" selected="selected">默认值</option>
    </select>

参考 [checklist-model](http://vitalets.github.io/checklist-model/)，使用`checklist-model`代替`ng-model`，简化单纯使用 checkbox 时多写的代码。但注意使用时产生的负面影响，这个库的issue里提到的问题、如：`How to validate`等等。

------
