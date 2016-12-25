<template lang="jade">
	main.main-main
		header.header-main
			slot(name='header')
		.content-main
			.wrap
				router-view
			footer.footer-main
				p.text-muted 2016 © InnoDev
</template>
