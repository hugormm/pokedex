<template>
    <div>
        <div v-if="!pokemon.abilities">
            Select one Pokemon
        </div>
        <div v-else>
            <table class="table text-white">
                <tbody>
                    <transition-group name="lista">
                        <tr v-for="(move, index) in pokemon.moves.slice(0,4)" :key="index">
                            <td>{{ move.move.name }}</td>
                        </tr>
                    </transition-group>
                </tbody>
            </table>
        </div>   
        
    </div>
</template>

<script>
export default {
    name: 'Sobre',
    props: {
        pokemon: Object
    },
    data: () => ({
        habilidade: ''
    })
}
</script>

<style scoped>
.table td {
    border: none;
    background-color: #333;
    color:#fff;
}


</style>