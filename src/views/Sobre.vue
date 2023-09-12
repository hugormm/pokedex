<template>
    <div>
        <div v-if="!pokemon.id">
            Select one Pokemon
        </div>
        
        <div v-else>
            <p>Id: {{ pokemon.id }}</p>
            <p>Name: {{ name }}</p>
            <p>Type: {{ tipo }}</p>
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
                return this.pokemon.types[0].type.name.charAt(0).toUpperCase() + this.pokemon.types[0].type.name.slice(1)
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