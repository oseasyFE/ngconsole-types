/// <reference path="ui-bootstrap.d.ts"/>
declare namespace vdi {
    interface ITeachTemplate {
        architecture_desc: string;
        created_at: number;
        data_alloc_disk: number;
        data_alloc_disk_2: number;
        data_size_desc: string;
        data_size_total: string;
        description: string;
        disabled_gpu: true;
        download_image_uuid: [];
        enable_gpu: false;
        host: null;
        host_uuid: string;
        id: number;
        image_id: string;
        instance_count: number;
        instance_id: string;
        instance_status: string;
        instance_type: {
            cpu_num: number;
            created_at: number;
            id: number;
            local_disk_type: number;
            local_gb: number;
            local_gb1: number;
            memory_mb: number;
            name: string;
            system_disk_type: number;
            system_gb: number
        };
        is_64: true;
        is_desktop: false;
        name: string;
        os_type: string;
        owner: number;
        owner_desc: string;
        product_type: string;
        rbd_enabled: false;
        snapshot_num: number;
        status: string;
        system_alloc_disk: number;
        system_size_desc: string;
        system_size_total: string;
        task: {
            enable: false
        };
        type_code: number;
        virtual_type: string
    }
    interface IStepScope extends ng.IScope {
        setModal(key: string, value: any);
        getStepData(stepIndex: number): any;
        setStepData(stepIndex: number, data: any);
        isValid(): boolean;
        closeModal();
        onPrev();
        onNext();
    }
    interface ProductInfo{
        language: string;
        product_type: "edaas-vdi-s" | "edaas-platform-s" | "edaas-voi-s" | // 高教行业， eDaaS 系列
                      "dc-voi-o" | "dc-vdi-f" | "dc-voi-f" | // 高教行业，DC 系列
                      "cc-vdi-d" | "cc-voi-o" | "cc-vdi-s" | "cc-voi-s" | // 普教行业，CC 系列
                      "vpc-vdi-d" | "vpc-voi-o" | "vpc-vdi-f" | "vpc-voi-f"; // 政企行业，VPC系列
    }
    interface ITemplateModalOptions {
        /**
         * modal 标题
         */
        title: string;
        /**
         * 要插入到 modal 内的模板
         */
        template: string;
        /**
         * 模板内变量，函数放在这
         */
        scope: string;
        /**
         * 确定按钮配置
         */
        okButton?: boolean | {
            show: boolean;
            text: string;
        };
        cancelButton?: boolean | {
            show: boolean;
            text: string;
        };
        size?: string;
        footer?: boolean;
    }
    interface IVDIMenuItem {
        key: string,
        value: string,
        is_group: boolean,
        icon: string,
        url: string,
        sublist?: IVDIMenuItem[];
    }
    /**
     * 一系列 ui 实用函数
     */
    interface IUIHelper {
        /**
         * 翻译错误码专用 alert
         * @param {Number} code 错误码
         * @param {Any} msg 可选的错误消息，如果找不到 code 对应的错误消息，则使用此消息
         */
        alertCodeError(code: number, msg: string);
        /**
         * 最普通的 alert，墨绿色背景
         * @param {String} content 弹出消息
         * @param {Any} title 可选的标题，没有相当于 "提示"
         */
        alert(content: string, title: string | undefined);
        /**
         * 没有翻译功能的 alert，红色背景
         * @param {String} content 弹出消息
         * @param {Any} title 可选的标题，没有相当于 "提示"
         */
        alertError(content: string, title: string | undefined);
        /**
         * 带有翻译功能的 alert，红色背景
         * @param {String} content 弹出消息
         * @param {Any} title 可选的标题，没有相当于 "提示"
         */
        i18nAlertError(content: string, title: string | undefined);
        /**
         * 带有翻译功能的 alert，墨绿色背景，title 可选
         * @param {String} content 弹出消息
         * @param {Any} title 可选的标题，没有相当于 "提示"
         */
        i18nAlert(content: string, title: string | undefined);
        /**
         * 减少 contorller 依赖打开 $modal 的快捷方式
         */
        openModal(options: uibs.$modalOptions): uibs.$modalInstance;
        /**
         * 类似于 dom 内建的 confirm 函数，不同的是用 $modal 服务实现。
         * 注意：此函数接受的参数总是会被 i18n 翻译！
         * @param {String} title bootstrap modal 标题
         * @param {String} message bootstrap modal 内容
         * @returns {Promise} 如果点击确定 resolve，否则 reject
         */
        confirmWithModal(title: string, message: string): Promise<any>;
        /**
         * 提供一个 modal 的基础架子，允许直接插入一些模板代码，具体参考下方的参数说明。
         * 如果你需要对模板做更多的控制，建议使用 `options.scope`，它的作用如同名字
         * 一样，允许你绑定变量、函数到 modal 的 $scope 上面，这意味着模板的内容、行为
         * 完全是受你控制的。为了更精确的控制 modal ，options.scope 提供了几个实用的
         * 钩子：
         * 
         * * `options.scope.getResult()` modal 在关闭时会调用这个函数并传递给最终
         *   的 Promise. 你可以根据这个 Promise 获取 modal 的结果信息。
         * * `options.scope.isOkButtonValid()` 确定按钮是否有效，无效则灰显
         * * `options.scope.isCancelButtonValid()` 取消按钮是否有效，无效则灰显
         * * `options.scope.isLoading()` 是否正在 loading，如果是，不显示底部按钮
         *    同时显示 loading gif
         * 
         * 
         * @param {Object} options 模板选项
         * @param {String} options.title modal 标题
         * @param {String} options.template 要插入到 modal 内的模板
         * @param {Object} options.scope 模板内变量，函数放在这
         * @param {Boolean|Object} options.okButton 是否显示确定按钮
         * @param {Boolean|Object} options.cancelButton 是否显示取消按钮
         * @param {String} options.size modal 选项
         * @param {Boolean} options.footer 是否显示 modal 按钮工具栏
         * 
         * @returns {Pormise} 返回 modal 确定/取消的结果
         */
        templateModal(options: ITemplateModalOptions): Promise<any>;
        bindUIActions(scope: angular.IScope, actions: any);
        bindRealtimeRefresh(scope: angular.IScope, method: string | Function);
    }
    /**
     * 当前用户信息
     */
    interface ICurrentUser {
        /**
         * 用户权限名称组成的字符串
         */
        keys: string;
        /**
         * 用户可访问的教室列表
         */
        pool: number[];
        login(username: string, password: string): angular.IHttpPromise<any>;
        logout(): angular.IHttpPromise<any>;
        kickout(): angular.IHttpPromise<any>;
        /**
         * 获取功能菜单。
         * 以前的做法是通过 `UserRole.currentUser`，再调用 N 个数据，并将数据
         * broadcast 出去来更新功能菜单。修改后的方式力求打通数据壁垒，让功能菜单
         * 所需的数据一步既得：功能菜单指令仅仅需要监听用户是否登录成功，并在登录成功时
         * 调用此函数获取即可。具体参考： navigation 指令（js/ng/ng.directives.js）
         */
        getPrivileges(): IVDIMenuItem[];
    }
    /**
     * VDI i18n 服务
     */
    interface II18n {
        translate(key, ...arg): string;
        translateCode(code: string | number): string;
        translateText(key: string): string;
    }
    interface INetworkUtils {
        isIP(ip: string): boolean;
        ip2number(ip: string): number;
        /**
         * 使用 http 请求到的数据存在需要实时刷新的情况，当每次重新请求后，新数据
         * 需要与旧数据合并，因为单纯的替换会导致对象引用发生变化，也需要 angular
         * 重新计算，当数据绑定到 ng-model 时，这些变化会莫名其妙。所以，提供此
         * 函数用于更新已有数据。如果你使用了 track by 语法，一般情况来说不用使用
         * 此函数来保证数据的一致性，但是使用这种方式依然值得推荐。
         * 
         * 用法说明：
         * ```javascript
angular.module("MyApp", []).controller("HelloCtrl", function($scope, $http, networkUtils){
  $scope.myItems = [];
  $scope.selectedItem = null;
  const loadItems = function(){
    $http.get("/items").success(function(data){
      // 更新项目列表
      networkUtils.mergeRecords($scope.myItems, data);
      // 更新当前选中的项目，如果没有选择过，使用列表种的第一个项目
      // 如果已选择过，验证此数据是否仍然有效，无效则使用第一个项目
      $scope.selectedItem = networkUtils.normalizeRecord(
        $scope.myItems,
        $scope.selectedItem
      );
    });
  };
});
```
         * ```html
<div ng-repeat="item in myItems"></div>
```
         * 
         * @param {Array} src
         * @param {Array} records
         * @param {Object} options
         * @param {String} options.idProp 用于唯一表示所有记录的字段名，默认 id
         * @param {Boolean} options.appendNew 如果新的数据中有不存在于旧数据中的项目，是否添加
         * @param {Boolean} options.removeNotExists 如果旧的数据中有不存在于新的数据中的项目，是否删除
         */
        mergeRecords(src: any[], records: any[], options?: {
            idProp: string;
            appendNew: boolean;
            removeNotExists: boolean;
        });
        /**
         * 
         * @param records ajax 请求得到的数据列表
         * @param rc 前一次 ajax 请求列表中的某项数据
         * @param idProp 主键
         */
        normalizeRecord(records: any[], rc: any, idProp: string);
    }
}

/**
 * 全局缓存对象。
 * 一般来说，需要设置缓存时优先使用此对象的接口，但是这个接口目前实现的并不好。
 */
declare var $$$storage: {
    getSessionStorage(key: string): string | null;
    setSessionStorage(key: string, value: any);
    clearSessionStorage();
};

interface Window {
    /**
     * 谨慎使用！
     * 当需要临时屏蔽所有后台请求的时候（如后台系统重启期间），设置此字段为 true 即可。
     */
    ignoreAnyRequestError: boolean;
}