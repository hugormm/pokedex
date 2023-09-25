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
                name="pulo" 
                type="animation"   
              >                           
                <img class="img_palco" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`" v-if="exibir">
              </transition>
            </div>
          </div>

          <div class="card-footer">
         
            <nav class="nav nav-pills nav-fill">
              <!-- menu de navegação -->
              <router-link class="nav-item nav-link text-white" :to="{ path: '/sobre' }" exact-active-class="active">About</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/status' }" exact-active-class="active">Status</router-link>
              <router-link class="nav-item nav-link text-white" :to="{ path: '/habilidades' }" exact-active-class="active">Moves</router-link>
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
            <select class="form-select" v-model="order">
              <option value="" disabled>Select the order</option>
              <option value="1">ID ascending</option>
              <option value="2">ID descending</option>
              <option value="3">From A - Z</option>
              <option value="4">From Z - A (localeCompare)</option>
            </select>
          </div>
        
          <div class="col">
            <input type="text" class="form-control" placeholder="Search pokémon" v-model="search">
          </div>
        </div>

        <div class="row">

          <div v-if="loading" class="d-flex justify-content-center">
            <img class="loading" src="@/assets/gif/loading.gif" alt="">
          </div>

          <div v-if="pokemons" class="pokedex-catalogo d-flex justify-content-center">

              <transition-group name="ordenacao">

                <!-- início listagem dinâmica -->
                <div v-for="(pokemon, id) in pokemons" :key="id" class="cartao-pokemon" @click="viewPokemon(pokemon)">
                  <h1>{{ pokemon.name }}</h1>
                  <span>{{ pokemon.id.toString().padStart(3, '0') }}</span>
                  <div class="cartao-pokemon-img">
                    <transition appear enter-active-class="animate__animated animate__fadeInDown">
                      <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`">
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
    pokemon: {},
    pokemons: [],
    order: '',
    search: '',
    loading: false
  }),
  methods: {
    showPokemons() {
      if(localStorage.Pokemons) {
        let pokemons = localStorage.getItem('Pokemons')
        let objPokemons = JSON.parse(pokemons)
        this.pokemons = objPokemons.results
      } else {
        this.loading = true
        fetch('https://pokeapi.co/api/v2/pokemon?limit=806')
        .then(response => response.json())
        .then(data => {
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url.split('/')[6]
            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            this.pokemons.push(pokemon)
          })
          this.loading = false
          console.log('data ', data)
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
    viewPokemon(pokemon) {

      let name = pokemon.name.toLowerCase()

      fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then(response => response.json())
      .then(data => { 
        this.pokemon = data
        this.pokemon.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
        this.pokemon.moves.forEach((move) => {
          move.move.name = move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)
        })
      })
      .catch((error) => {
        console.log(error)
      })

      let alterarPokemon = false   
      if((this.pokemon.id != pokemon.id) && this.exibir) {
        setTimeout(() => {
          this.viewPokemon(pokemon)
        }, 1000)

        alterarPokemon = true
      }
      this.exibir = !this.exibir
      this.pokemon = pokemon

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
    order(valorNovo) {
      
      if(valorNovo == 1) { 
        this.pokemons.sort((proximo, atual) => {   
          const idAtual = parseInt(atual.id);
          const idProximo = parseInt(proximo.id);
          if(idAtual < idProximo) {
            return 1
          } else if(idAtual > idProximo) {
            return -1
          }
          return 0
        })   
      }

      if(valorNovo == 2) {  
        this.pokemons.sort((proximo, atual) => {  
          const idAtual = parseInt(atual.id);
          const idProximo = parseInt(proximo.id);  
          if(idAtual < idProximo) {
            return -1
          } else if(idAtual > idProximo) {
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
  font-size: 10px;
  margin: 5px;
  width: 160px;
  height: 125px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  background-color: #333;
}

.cartao-pokemon h1{
  font-family: 'Pokemon Solid';
  color:#bcbcbc;
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

.bg-pokebola {
  background-image: url("~@/assets/imgs/pokebola.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
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

.pokedex-logo {
  height: 60px;
  width: auto;
}

.img_palco {
  position: relative;
  top: 45px;
  height: 190px;
  width: 190px;
}

.loading {
  height: 100px;
  width: 100px;
  position: relative;
  top: 100px;
}
</style>
