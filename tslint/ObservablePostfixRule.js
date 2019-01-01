"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ObservablePrefixCheckerWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Observables and methods returns with observables must postfixed with $';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObservablePrefixCheckerWalker = /** @class */ (function (_super) {
    __extends(ObservablePrefixCheckerWalker, _super);
    function ObservablePrefixCheckerWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObservablePrefixCheckerWalker.prototype.visitTypeReference = function (node) {
        var kinds = [
            ts.SyntaxKind.MethodDeclaration,
            ts.SyntaxKind.PropertyDeclaration,
            ts.SyntaxKind.GetAccessor,
            ts.SyntaxKind.PropertySignature
        ];
        var observableTypes = ['Observable', 'Subject', 'BehaviorSubject', 'ReplaySubject', 'AsyncSubject'];
        var ignoresMembersAndMethods = ['intercept', 'transform'];
        if (node.parent && (kinds.some(function (item) { return item === (node.parent ? node.parent.kind : ts.SyntaxKind.Unknown); }))) {
            var parent_1 = node.parent;
            var type_1 = node.typeName.getText();
            if (parent_1.name && observableTypes.some(function (obsType) { return type_1 === obsType; })) {
                var name_1 = parent_1.name.getText();
                if (ignoresMembersAndMethods.every(function (ignore) { return ignore !== name_1; }) && !name_1.endsWith('$')) {
                    this.addFailureAt(parent_1.getStart(), parent_1.getWidth(), Rule.FAILURE_STRING);
                }
            }
        }
        _super.prototype.visitTypeReference.call(this, node);
    };
    return ObservablePrefixCheckerWalker;
}(Lint.RuleWalker));
// TODO: move to OTP common QA package
// TODO: compile: npx tsc --lib es6,dom ObservablePostfixRule.ts
