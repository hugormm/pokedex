<template>
    <div>
        <div v-if="!pokemon.abilities">
            Select one Pokemon
        </div>
        <div v-else>
            <table class="table text-white">
                <tbody>
                    <tr v-for="(move, index) in pokemon.moves.slice(0,4)" :key="index">
                        <td>{{ move.move.name }}</td>
                    </tr>
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
    }
}
</script>

<style scoped>
.table td {
    font-family: 'Pokemon Hollow';
    font-weight: 100;
    border: none;
    background-color: #333;
    color:#ffffff;
}

</style>