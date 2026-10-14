import { reactive } from 'vue'

export const toastState = reactive({
    visible: false,
    message: '',
    type: 'info',
    timeoutId: null
})

export function showToast(message, type = 'info', duration = 3500) {
    if (toastState.timeoutId) {
        clearTimeout(toastState.timeoutId)
    }
    toastState.message = message
    toastState.type = type
    toastState.visible = true
    toastState.timeoutId = setTimeout(() => {
        hideToast()
    }, duration)
}

export function hideToast() {
    if (toastState.timeoutId) {
        clearTimeout(toastState.timeoutId)
        toastState.timeoutId = null
    }
    toastState.visible = false
}