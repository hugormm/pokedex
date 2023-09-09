<template>
    <div>
        <div v-if="!pokemon.id">
            Selecione um Pokemon
        </div>
        <div v-else>
            <p>Identificador: {{ id }}</p>
            <p>Nome: {{ pokemon.nome }}</p>
            <p>Tipo: {{ pokemon.tipo }}</p>
        </div>   
    </div>
</template>

<script>
export default {
    name: 'Sobre',
    props: {
        pokemon: Object
    },
    computed: {
        id() {
            return this.pokemon.id.toString().padStart(3, '0')  // 001, 011
        }
    }
}
</script>