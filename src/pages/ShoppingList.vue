<template>
  <div>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-pink-600 mb-2">Nossa Lista de Compras</h1>
      <p class="text-pink-500">Insira os itens que precisamos comprar</p>
    </div>
    
    <!-- Add List Form -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold text-pink-700 mb-4">Nova Lista de Compras</h2>
      <form @submit.prevent="addList" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-pink-600">Nome da Lista</label>
          <input
            type="text"
            v-model="newList.name"
            placeholder="Ex: Compras do Mês"
            class="mt-1 block w-full rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-pink-600">Itens</label>
          <div class="space-y-2">
            <div v-for="(item, index) in newList.items" :key="index" class="flex gap-2">
              <input
                type="text"
                v-model="item.name"
                placeholder="Nome do item"
                class="flex-1 rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required
              >
              <input
                type="text"
                v-model="item.quantity"
                placeholder="Qtd"
                class="w-24 rounded-lg border-pink-200 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                required
              >
              <button
                type="button"
                @click="removeItem(index)"
                class="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <span class="material-icons">delete_outline</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addItem"
            class="mt-2 text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1"
          >
            <span class="material-icons">add</span>
            <span>Adicionar Item</span>
          </button>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="submit"
            class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Criar Lista
          </button>
        </div>
      </form>
    </div>

    <!-- Shopping Lists -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-xl font-semibold text-pink-700 mb-4">Nossas Listas</h2>
      <div class="space-y-4">
        <div
          v-for="list in shoppingLists"
          :key="list._id"
          class="border border-pink-100 rounded-lg p-4"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-medium text-pink-600">{{ list.name }}</h3>
            <button
              @click="removeList(list._id)"
              class="text-pink-400 hover:text-pink-600 transition-colors"
            >
              <span class="material-icons">delete_outline</span>
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(item, index) in list.items"
              :key="index"
              class="flex items-center justify-between p-2 bg-pink-50 rounded"
            >
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="item.checked"
                  @change="updateList(list._id, list.items)"
                  class="h-5 w-5 text-pink-500 rounded border-pink-300 focus:ring-pink-500"
                >
                <span :class="{ 'line-through text-pink-400': item.checked }" class="text-pink-700">
                  {{ item.name }} ({{ item.quantity }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/axios';

const router = useRouter();
const shoppingLists = ref([]);
const showModal = ref(false);
const newList = ref({
  name: '',
  items: [],
});

onMounted(async () => {
  try {
    const res = await api.get('/shopping-lists');
    shoppingLists.value = res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      router.push('/login');
    }
  }
});

async function addList() {
  if (!newList.value.name || !newList.value.items.length) return;
  
  try {
    const res = await api.post('/shopping-lists', newList.value);
    shoppingLists.value.unshift(res.data);
    newList.value = { name: '', items: [] };
    showModal.value = false;
  } catch (error) {
    alert('Erro ao criar lista de compras');
  }
}

function addItem() {
  newList.value.items.push({ name: '', quantity: '1', checked: false });
}

function removeItem(index) {
  newList.value.items.splice(index, 1);
}

async function updateList(listId, items) {
  try {
    await api.put(`/shopping-lists/${listId}`, { items });
  } catch (error) {
    alert('Erro ao atualizar lista');
  }
}

async function removeList(listId) {
  try {
    await api.delete(`/shopping-lists/${listId}`);
    shoppingLists.value = shoppingLists.value.filter(list => list._id !== listId);
  } catch (error) {
    alert('Erro ao remover lista');
  }
}
</script> 