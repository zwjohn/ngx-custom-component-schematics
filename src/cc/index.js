"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function default_1(_options) {
    return (tree, _context) => {
        let parsedPath = null;
        try {
            const workspace = config_1.getWorkspace(tree);
            const projectName = _options.project || Object.keys(workspace.projects)[0];
            const project = project_1.getProject(tree, projectName);
            if (_options.path === undefined) {
                _options.path = project_1.buildDefaultPath(project);
            }
            parsedPath = parse_name_1.parseName(_options.path, _options.name);
            _options.name = parsedPath.name;
            _options.path = parsedPath.path;
            console.log("Generating Custom Component", "PATH:", _options.path, "Options:", _options, "Workspace:", workspace, "ProjectName:", projectName, "Project:", project, "ParsedPath:", parsedPath);
        }
        catch (e) {
            console.log("No Context, using default");
        }
        /*
            const workspace = getWorkspace(tree);
            const projectName = Object.keys(workspace.projects)[0];
            const project = getProject(tree, projectName);
            const path = buildDefaultPath(project);*/
        const sourceTemplates = schematics_1.url('./files');
        const sourceParameterizedTemplates = parsedPath ? schematics_1.apply(sourceTemplates, [schematics_1.template(Object.assign({}, _options, core_1.strings)), schematics_1.move(parsedPath.path)]) : schematics_1.apply(sourceTemplates, [schematics_1.template(Object.assign({}, _options, core_1.strings))]);
        return schematics_1.mergeWith(sourceParameterizedTemplates)(tree, _context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map