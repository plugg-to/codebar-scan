<template>
	<div class="row" v-if="step == 1">
		<div class="col-md-12">
			<div class="form-group">
				<img src="../assets/bar.png" />

				<input type="text" v-model="ean" class="form-control" placeholder="Digite um EAN válido..." />
			</div>
		</div>
		<div class="col-md-12 text-right text-white">
			<a class="btn btn-success" @click="getProductAndNextStep()">
				Adicionar Estoque <i class="fa fa-check"></i>
			</a>
		</div>
	</div>

	<div class="row" v-else-if="step == 2">
		<div class="col-md-12">
			<div class="form-group">
				<h2 v-html="product.name"></h2>

				<label>
					Digite o Novo Estoque
				</label>
				<input type="text" v-model="product.quantity" class="form-control" placeholder="Digite a nova quantidade de estoque..." />
			</div>
		</div>
		<div class="col-md-12 text-right text-white">
			<a class="btn btn-success" @click="saveQuantity()">
				Salvar <i class="fa fa-check"></i>
			</a>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Step1',
  data () {
    return {
      ean: '',
      step: 1,
      product: {},
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  	getProductAndNextStep () {
  		axios.get('https://api.plugg.to/products?ean=' + this.ean + '&access_token=8de87cb8c86437bab9adc8ef05cf48a529351018').then(response => {
  			if (response.data.total == 0) {
	  			this.$swal(
	  				'Erro',
	  				'Nenhum produto encontrado com o EAN: ' + this.ean,
	  				'error'
	  			)

	  			this.ean = ''

	  			return;
  			}

  			this.product = response.data.result[0].Product
  			
  			this.step = 2
  		})
  	},
  	saveQuantity () {
  		axios.put('https://api.plugg.to/skus/' + this.product.sku + '?access_token=8de87cb8c86437bab9adc8ef05cf48a529351018', this.product).then(response => {
  			this.$swal(
  				'Atualizado',
  				'Estoque do produto "' + this.product.name + '" atualizado para ' + this.product.quantity + ' com sucesso!',
  				'success'
  			)

  			this.ean = ''
  			this.step = 1
  		})		
  	}
  }
}
</script>

<style scoped>
	img {
		margin-bottom: 30px;
	}
</style>