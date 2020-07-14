<template>
	<transition name="toast" v-if="showing">
		<div :class='"toast__" + options.type' class="toast-inner">
			<span>{{options.message}}</span>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ToastComponent',
	data () {
		return {
			queue: [],
			options: {},
			showing: false
		}
	},
	watch: {
		queue () {
			let queueLength = this.queue.length
			if (queueLength) {
				this.options = this.queue[0]
				this.showing = true
				if (queueLength === 1) {
					this.timeTicker = setTimeout(() => {
						this.showing = false
						this.queue.shift()
					}, this.options.duration)
				} else {
					clearTimeout(this.timeTicker)
					this.queue.shift()
				}
			}
		}
	},
	methods: {
		hide () {
			this.showing = false
		},

		close () {
			this.hide()
			if (this.options.closeCallback) {
				this.options.closeCallback()
			}
		}
	}
}
</script>

<style lang="scss">
.toast-inner {
	position: fixed;
	top: 0;
	left: 50%;
	margin-left: -150px;
	width: 350px;
	padding: 1em;
	color: #909399;
	font-size: 14px;
	line-height: 1.2em;
	text-align: center;
	z-index: 10000;
	background-color: #edf2fc;
	border: 1px solid #EBEEF5;
	border-radius: 4px;
	// &__success {
	// 	background: deepskyblue
	// }
	&.toast__error {
		background: #fef0f0;
		border-color: #fde2e2;
		color: #F56C6C;
	}
}
.toast-enter-active, .toast-leave-active {
	transition: opacity 1s;
}
.toast-enter, .toast-leave-to {
	opacity: 0;
}
</style>
