import { searchForWorkspaceRoot } from 'vite';
import { glob } from 'glob';

export default {

	root: './',
	base: '',
	build: {
		outDir: './docs',
		rollupOptions: {
			input: glob
				.sync( './pages/**/*.html' )
				.map( p => `./${ p }` ),
		},
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
