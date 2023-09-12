<template>
  <div class="container">
    <div class="row mt-2">
      
      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon">
              <transition 
                @after-enter="exibirEvolucoesTransition"
                @before-leave="exibirEvolucoes = false"
                name="pulo" 
                type="animation"   
              >                           
                <img :src="require(`@/assets/imgs/pokemons/${pokemon.id.toString().padStart(3, '0')}.png`)" v-if="exibir">
              </transition>
            </div>
            <!--
            <div class="evolucoes">
              <transition name="fade" v-for="e in exibirEvolucoes.chain.evolves_to" :key="e">
                <img :src="require(`@/assets/imgs/pokemons/${e.toString().padStart(3, '0')}.png`)" v-if="exibirEvolucoes">
              </transition>
            </div>
            -->
          </div>

          <div class="card-footer">
         
            <nav class="nav nav-pills nav-fill">
              <!-- menu de navegação -->
              <router-link class="nav-item nav-link text-white" :to="{ path: '/sobre' }" exact-active-class="active">Sobre</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/status' }" exact-active-class="active">Status</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/habilidades' }" exact-active-class="active">Habilidades</router-link>
            </nav>

            <div class="detalhes">
              <!-- exibe dados de acordo com o menu de navegação -->
            

              <router-view v-slot="{ Component }" :pokemon="pokemon">
                <transition enter-active-class="animate__animated animate__zoomIn">
                  <component :is="Component" />
                </transition>
              </router-view>

            </div>
          </div>
        </div>
      </div>
      <!-- fim lado esquerdo -->

      <!-- início lado direito -->
      <div class="col mb-2 pokedex">        
        <div class="row">
          <div class="col">
            <img src="@/assets/imgs/pokedex.png" class="pokedex-logo">
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <select class="form-select" v-model="ordenacao">
              <option value="" disabled>Selecione a ordem</option>
              <option value="1">Id crescente</option>
              <option value="2">Id decrescrente</option>
              <option value="3">De A - Z</option>
              <option value="4">De Z - A (localeCompare)</option>
            </select>
          </div>
        
          <div class="col">
            <input type="text" class="form-control" placeholder="Pesquisar pokémon" v-model="search">
          </div>
        </div>

        <div class="row">
          <div class="pokedex-catalogo">
          <transition-group name="ordenacao">
            <!-- início listagem dinâmica -->
            <div v-for="(p, index) in pokemons" :key="index" class="cartao-pokemon bg-dark" @click="analisarPokemon(p)">
              <h1>{{ p.id.toString().padStart(3, '0') }} {{ p.name }}</h1>
              <div class="cartao-pokemon-img">
                <transition appear enter-active-class="animate__animated animate__fadeInDown">
                  <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`">
                </transition>
              </div>
            </div>
            <!-- fim listagem dinâmica -->
          </transition-group>
          </div>
        </div>
      </div>
      <!-- fim lado direito -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    exibir: false,
    exibirEvolucoes: false,
    pokemon: {},
    pokemonEvolution: {},
    pokemons: [],
    ordenacao: '',
    search: '',
    nomePokemon2: ''
  }),
  methods: {
    showPokemons() {
      if(localStorage.Pokemons) {
        let pokemons = localStorage.getItem('Pokemons')
        let objPokemons = JSON.parse(pokemons)
        this.pokemons = objPokemons.results
      } else {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=806')
        .then(response => response.json())
        .then(data => {
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url.split('/')[6]
            this.pokemons.push(pokemon)
          })
          const pokemons = JSON.stringify(data)
          localStorage.setItem('Pokemons', pokemons)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    exibirEvolucoesTransition() {
      this.exibirEvolucoes = true
    }, 
    analisarPokemon(p) {

      fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}/`)
      .then(response => response.json())
      .then(data => {
        this.pokemon = data
      })

      fetch(`https://pokeapi.co/api/v2/evolution-chain/${p.id}/`)
      .then(response => response.json())
      .then(data => {
        this.pokemonEvolution = data
      })

      let alterarPokemon = false   
      if((this.pokemon.id != p.id) && this.exibir) {
        setTimeout(() => {
          this.analisarPokemon(p)
        }, 1000)

        alterarPokemon = true
      }
      this.exibir = !this.exibir
      this.pokemon = p
      this.exibirEvolucoes = !this.exibirEvolucoes  

      if(!this.exibir && !alterarPokemon) {  
        this.pokemon = {}                 
      }
    }
  },
  watch: {
    search(valorNovo) {
      let pokemons = localStorage.getItem('Pokemons')
      let objPokemons = JSON.parse(pokemons)
      this.pokemons = objPokemons.results
      let pokemonsFiltrados = this.pokemons.filter((item) => {
        return item.name.includes(valorNovo)
      })
      this.pokemons = pokemonsFiltrados
      console.log(this.pokemons)
    },
    ordenacao(valorNovo) {
      if(valorNovo == 1) { 
        this.pokemons.sort((proximo, atual) => {   
          if(atual.id < proximo.id) {
            return 1
          } else if(atual.id > proximo.id) {
            return -1
          }
          return 0
        })   
      }

      if(valorNovo == 2) {  
        this.pokemons.sort((proximo, atual) => {    
          if(atual.id < proximo.id) {
            return -1
          } else if(atual.id > proximo.id) {
            return 1
          }
          return 0
        })   
      }

      if(valorNovo == 3) { 
        this.pokemons.sort((proximo, atual) => {   
          if(atual.name < proximo.name) {
            return 1
          } else if(atual.name > proximo.name) {
            return -1
          }
          return 0
        })   
      }

      if(valorNovo == 4) { 
        this.pokemons.sort((proximo, atual) => {   
          return atual.name.localeCompare(proximo.name)  
        })   
      }
    }
  },
  created() {
    this.showPokemons()
  }
}
</script>

<style>
body {
  background-color: #dee3eb;
}
</style>

<style scoped>

@import '@/assets/css/animacoes.css';


.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalogo {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 98%;
  margin-top: 10px;
}

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.cartao-pokemon h1{
  color:#fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.cartao-pokemon span{
  color:#fff;
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.cartao-pokemon img {
    max-width:60%;
    max-height:60%;
    float: right;
}

.bg-grass {
  background-color: #2d8f78;
}

.bg-fogo {
  background-color: #e47373
}

.bg-agua {
  background-color: #5a9ed2
}

.bg-inseto {
  background-color: #26d3ab
}

.bg-normal {
  background-color: #cecece
}

.bg-pokebola {
  background-image: url("~@/assets/imgs/pokebola.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  display: block;
  text-align: center;
  height: 215px;
}

.detalhes {
  margin: 20px 30px 20px 30px;
}

.evolucoes {
  position: absolute;
  top: 10px;
  right: 0px;
  height: 70px;
}

.evolucoes img {
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
}

.pokedex-logo {
  height: 60px;
  width: auto;
}

</style>
