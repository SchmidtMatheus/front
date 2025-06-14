<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black bg-opacity-25" @click="$emit('update:modelValue', false)"></div>
        
        <div class="relative bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
          <button
            @click="$emit('update:modelValue', false)"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span class="material-icons">close</span>
          </button>
          
          <div class="mt-2">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script> 