<template>
    <Transition name="modal">
        <div class="modal-backdrop" @click.self="$emit('cancel')">
            <div class="modal-dialog">
                <h2>{{ title }}</h2>
                <p>{{ message }}</p>
                <div class="modal-actions">
                    <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
                    <button class="confirm-btn" @click="$emit('confirm')">Delete</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props: {
        title: {
            type: String,
            default: 'Are you sure?'
        },
        message: {
            type: String,
            default: ''
        }
    },
    emits: ['confirm', 'cancel']
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;   /* above the toast, which is at 1000 */
}

.modal-dialog {
    background-color: white;
    padding: 24px 28px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-dialog h2 {
    margin-bottom: 12px;
    color: rgb(32, 32, 32);
}

.modal-dialog p {
    margin-bottom: 20px;
    color: #555;
    line-height: 1.4;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.cancel-btn,
.confirm-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
}

.cancel-btn {
    background-color: #e5e7eb;
    color: #333;
}

.cancel-btn:hover {
    background-color: #d1d5db;
}

.confirm-btn {
    background-color: #ef4444;
    color: white;
}

.confirm-btn:hover {
    background-color: #dc2626;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
    transition: transform 0.2s ease;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
    transform: scale(0.95);
}
</style>