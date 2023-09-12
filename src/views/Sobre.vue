<template>
    <div>
        <div v-if="!pokemon.id">
            Selecione um Pokemon
        </div>
        
        <div v-else>
            <p>Identificador: {{ pokemon.id }}</p>
            <p>Nome: {{ name }}</p>
            <p>Tipo: {{ tipo }}</p>
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
            return console.log('------', this.pokemon.id.toString().padStart(3, '0'))  // 001, 011
        },
        tipo() {
            if(this.pokemon.types) {
                return this.pokemon.types[0].type.name
            } else {
                return '---'
            }
        },
        name() {
            if(this.pokemon.name) {
                return this.pokemon.name
            } else {
                return '---'
            }
        }
    }
}
</script>