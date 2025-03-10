import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// aadapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({ fallback: '404.html' }),
		paths: {
			base: dev ? "" : process.env.BASE_PATH,
		}
	},
	compilerOptions:
	{
		runes: true
	},
	vitePlugin: {
		inspector: true,
	},
};

export default config;
