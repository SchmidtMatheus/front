<template>
    <form @submit.prevent="submitForm" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input v-model="form.name" type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Nome da coleção" required />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea v-model="form.description" rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Descrição (opcional)"></textarea>
        </div>

        <div class="flex justify-end gap-2 pt-4">
            <button type="button" @click="$emit('cancel')"
                class="bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 px-4 py-2 rounded-md">
                Cancelar
            </button>
            <button type="submit" class="bg-pink-600 hover:bg-pink-700 text-sm text-white px-4 py-2 rounded-md">
                Salvar
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { collectionService } from '../../services/collections'
const emit = defineEmits(['cancel', 'created'])

const form = ref({
    name: '',
    description: ''
})

const submitForm = async () => {
    if (!form.value.name) {
        alert('Preencha todos os campos obrigatórios.')
        return
    }

    try {
        await collectionService.createCollection({
            name: form.value.name,
            description: form.value.description
        })
        emit('created')
    } catch (err) {
        console.error('Erro ao criar coleção:', err)
    }
}
</script>
