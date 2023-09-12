<template>
    <div>
        <div v-if="!pokemon.abilities">
            Select one Pokemon
        </div>
        <div v-else>
            <table class="table text-white">
                <tbody>
                    <transition-group name="lista">
                        <tr v-for="ab in pokemon.abilities" :key="ab">
                            <td>{{ ab.ability.name }}</td>
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
}
</style>