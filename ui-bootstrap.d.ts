declare namespace uibs {
    interface $modalOptions {
        template?: string;
        templateUrl?: string;
        scope?: angular.IScope,
        controller?: string | angular.IControllerConstructor;
        controllerAs?: string;
        resolve?: Function;
        backdrop?: boolean | "static";
        keyboard?: boolean;
        backdropClass?: string;
        windowClass?: string;
        windowTemplateUrl?: string;
        size?: "sm" | "lg" | "fs";
    }
    interface $modalInstance {
        close(result: any);
        dismiss(reason: any);
        result: Promise<any>;
        opened: Promise<any>;
    }
    interface $modal {
        open(options: $modalOptions): $modalInstance;
    }
}
