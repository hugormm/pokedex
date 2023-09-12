<template>
    <div>
        <div v-if="!pokemon.stats">
            Select one Pokemon
        </div>
        <div v-else>
            <span>HP:</span>
            <div class="progress mb-2">
                <div 
                    class="progress-bar" 
                    role="progressbar" 
                    :style="`width: ${pokemon.stats[0].base_stat}%;`" 
                    :aria-valuenow="pokemon.stats[0].base_stat" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                    {{ pokemon.stats[0].base_stat }}
                </div>
            </div>

            <span>Attack:</span>
            <div class="progress mb-2">
                <div 
                    class="progress-bar" 
                    role="progressbar" 
                    :style="`width: ${pokemon.stats[1].base_stat}%;`" 
                    :aria-valuenow="pokemon.stats[1].base_stat" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                {{ pokemon.stats[1].base_stat }}
                </div>
            </div>

            <span>Defense:</span>
            <div class="progress mb-2">
                <div 
                    class="progress-bar" 
                    role="progressbar" 
                    :style="`width: ${pokemon.stats[2].base_stat}%;`" 
                    :aria-valuenow="pokemon.stats[2].base_stat" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                {{ pokemon.stats[2].base_stat }}
                </div>
            </div>
            
            <span>Speed:</span>
            <div class="progress mb-2">
                <div 
                    class="progress-bar" 
                    role="progressbar" 
                    :style="`width: ${pokemon.stats[5].base_stat}%;`" 
                    :aria-valuenow="pokemon.stats[5].base_stat" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                {{ pokemon.stats[5].base_stat }}
                </div>
            </div>
        </div>   
        
    </div>
</template>

<script>
export default {
    name: 'Status',
    props: {
        pokemon: Object
    }
}
</script>