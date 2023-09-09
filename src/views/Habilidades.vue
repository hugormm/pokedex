<template>
    <div>
        <div v-if="!pokemon.habilidades">
            Selecione um Pokemon
        </div>
        <div v-else>
            <table class="table text-white">
                <tbody>
                    <transition-group name="lista">
                        <tr v-for="(hab, index) in habilidadesOrdenadas" :key="hab">
                            <td>{{ hab }}</td>
                            <td class="d-flex justify-content-end">
                                <button type="button" class="btn btn-danger btn-sm" @click="$emit('removeHabilidade', index)">x</button>
                            </td>
                        </tr>
                    </transition-group>
                </tbody>
            </table>
            <input type="text" class="form-control" placeholder="Adicionar habilidade" v-model="habilidade" @keyup.enter="adicionarHabilidade()">
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
    methods: {
        adicionarHabilidade() {
            this.$emit('addHabilidade', this.habilidade)
            this.habilidade = ''
        }
    },
    computed: {
        habilidadesOrdenadas() {
            let habilidades = this.pokemon.habilidades

            return habilidades.sort()  //ordena o array por ordem alfabetica
        }
    }
   
}
</script>

<style scoped>
.table td {
    border: none;
}
</style>