import { searchForWorkspaceRoot } from 'vite';
import { glob } from 'glob';

export default {

	root: './pages',
	base: '',
	build: {
		outDir: '../docs',
		emptyOutDir: true,
	},
	server: {
		fs: {
			allow: [
				// search up for workspace root
				searchForWorkspaceRoot( process.cwd() ),
			],
		},
	}

};
