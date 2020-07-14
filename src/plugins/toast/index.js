import Toast from './Toast'

export default {
	install (Vue, options) {
		let defaultOptions = {
			duration: 3000,
			type: ''
		}
		let initOptions = {...defaultOptions, ...options}
		let ToastConstructor = Vue.extend(Toast)
        let toastInstance = new ToastConstructor(initOptions)
        console.log(toastInstance)
		Vue.prototype.$toast = (message, customOptions) => {
			if (!toastInstance.$el) {
				let toastTpl = toastInstance.$mount().$el
				document.body.appendChild(toastTpl)
			}
			toastInstance.queue.push({...initOptions, ...customOptions, message})
		}
	}
}
