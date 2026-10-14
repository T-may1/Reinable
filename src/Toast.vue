<template>
    <Transition name="toast">
        <div v-if="toastState.visible" :class="['toast', `toast-${toastState.type}`]">
            <span class="toast-message">{{ toastState.message }}</span>
            <button class="toast-close" @click="hideToast">×</button>
        </div>
    </Transition>
</template>

<script>
import { toastState, hideToast } from './toastStore'

export default {
    name: 'Toast',
    data() {
        return { toastState }
    },
    methods: { hideToast }
}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 250px;
    max-width: 400px;
}

.toast-info    { background-color: #3b82f6; }
.toast-success { background-color: #22c55e; }
.toast-error   { background-color: #ef4444; }

.toast-close {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-left: auto;
    padding: 0 4px;
    line-height: 1;
}

/* Transition */
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.toast-leave-active {
    position: absolute;
}
</style>