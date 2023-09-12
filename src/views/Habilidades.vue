<template>
    <div>
        <div v-if="!pokemon.abilities">
            Selecione um Pokemon
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
    }),
    /*
    methods: {
        adicionarHabilidade() {
            this.$emit('addHabilidade', this.habilidade)
            this.habilidade = ''
        }
    },
    computed: {
        habilidadesOrdenadas() {

            let habilidades = []
            this.pokemon.abilities.forEach(element => {
                console.log(element.ability.name)
                habilidades.push(element.ability.name)
            });
                
            return habilidades.sort()  //ordena o array por ordem alfabetica
        }
    }*/
   
}
</script>

<style scoped>
.table td {
    border: none;
}
</style>