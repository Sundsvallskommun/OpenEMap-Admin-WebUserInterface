#  OpenEMap-Admin-WebUserInterface

Administrative client for Open eMap

Based on Ext JS 4

Ext JS application name is AdmClient

## Development
Requirements:
* Node JS >0.10
* Grunt (install with npm install grunt --save-dev)
* Grunt CLI (install with npm -g install grunt-cli)
* Bower (install with npm -g install bower)
* Git command line client
A fresh clone of the repository will require running npm install in its root. After that you can start devserver on http://localhost:8000 by running grunt devserver. A development example should be runnable at http://localhost:8000/debug.html. Changes to any source file will in the debug version automatically reload the page.

## Building a release verison
Done by running `grunt dist` in a working development clone. Requires Sencha Cmd installed and available on the path.

##Documentation
Source code should be documented using [JSDucks](https://github.com/senchalabs/jsduck/wiki) semantics
Readme.md should be updated if necessary
Map config is documented in doc/config.md, and should be updated if cahnges is made in map config
Each release is documented under Releases/Release number (see versioning below) 

## Versioning
Versioning should follow [Semantic versioning 2.00](http://semver.org/)
This semantic starts at version 1.1.0-rc.1 (MAJOR.MINOR.PATCH-PRERELEASE)
Versioning uses the GitFlow model. Release branches are created as soon as a feature freeze is decided, and should be created for each new version with status of MAJOR, MINOR or PATCH. Pre releases are made within their respective release branch.

## License
Open eMap Web User Interface is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.html) for more details.
