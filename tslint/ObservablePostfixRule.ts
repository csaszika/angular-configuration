import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Observables and methods returns with observables must postfixed with $';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ObservablePrefixCheckerWalker(sourceFile, this.getOptions()));
  }
}

class ObservablePrefixCheckerWalker extends Lint.RuleWalker {
  protected visitTypeReference(node: ts.TypeReferenceNode): void {
    const kinds = [
      ts.SyntaxKind.MethodDeclaration,
      ts.SyntaxKind.PropertyDeclaration,
      ts.SyntaxKind.GetAccessor,
      ts.SyntaxKind.PropertySignature,
    ];
    const observableTypes = ['Observable', 'Subject', 'BehaviorSubject', 'ReplaySubject', 'AsyncSubject'];
    const ignoresMembersAndMethods = ['intercept', 'transform'];

    if (node.parent && kinds.some((item: ts.SyntaxKind) => item === (node.parent ? node.parent.kind : ts.SyntaxKind.Unknown))) {
      const parent: ts.PropertyDeclaration = node.parent as ts.PropertyDeclaration;
      const type = node.typeName.getText();

      if (parent.name && observableTypes.some((obsType: string) => type === obsType)) {
        const name = parent.name.getText();
        if (ignoresMembersAndMethods.every((ignore: string) => ignore !== name) && !name.endsWith('$')) {
          this.addFailureAt(parent.getStart(), parent.getWidth(), Rule.FAILURE_STRING);
        }
      }
    }

    super.visitTypeReference(node);
  }
}
