import {apply, mergeWith, move, Rule, SchematicContext, template, Tree, url} from '@angular-devkit/schematics';
import {strings} from "@angular-devkit/core";
import {Schema} from "./schema";
import { parseName } from '@schematics/angular/utility/parse-name';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  buildDefaultPath,
  getProject
} from '@schematics/angular/utility/project';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
let parsedPath = null;
try{
  const workspace = getWorkspace(tree);
  const projectName = _options.project || Object.keys(workspace.projects)[0];
  const project = getProject(tree, projectName);

  if (_options.path === undefined) {
    _options.path = buildDefaultPath(project);
  }

  parsedPath = parseName(_options.path, _options.name);
  _options.name = parsedPath.name;
  _options.path = parsedPath.path;
  console.log("Generating Custom Component","PATH:",_options.path,"Options:",_options,"Workspace:",workspace,"ProjectName:",projectName,"Project:",project,"ParsedPath:",parsedPath);

}catch (e) {
  console.log("No Context, using default");
}


/*
    const workspace = getWorkspace(tree);
    const projectName = Object.keys(workspace.projects)[0];
    const project = getProject(tree, projectName);
    const path = buildDefaultPath(project);*/
    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = parsedPath? apply(sourceTemplates,
      [template({..._options, ...strings}),move(parsedPath.path)]):apply(sourceTemplates,
      [template({..._options, ...strings})]);
    return mergeWith(sourceParameterizedTemplates)(tree, _context);
  };
}
