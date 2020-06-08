'use strict';
const path = require('path');
const electron = require('electron');
const Conf = require('conf');

class ElectronStore extends Conf {
	constructor(options) {
		options = {
			name: 'config',
			...options
		};

		if (options.cwd && !path.isAbsolute(options.cwd)) {
			try {
				const defaultCwd = (electron.app || electron.remote.app).getPath('userData');

				options.cwd = path.join(defaultCwd, options.cwd);
			} catch (error) {
				throw new Error('Unable to get default path');
			}
		} else if (!options.cwd) {
			try {
				options.cwd = (electron.app || electron.remote.app).getPath('userData');
			} catch (error) {
				throw new Error('Unable to get default path');
			}
		}

		options.configName = options.name;
		delete options.name;
		super(options);
	}

	openInEditor() {
		electron.shell.openItem(this.path);
	}
}

module.exports = ElectronStore;
