<template>
	<div class="category-admin">
		<b-form class="mb-4">
			<b-row>
				<b-col md="12">
					<b-form-group label="Nome:" label-for="category-name">
						<b-form-input
							id="category-name"
							type="text"
							v-model="category.name"
							required
							:disabled="mode === 'remove'"
							placeholder="Informe o Nome da Categoria..."
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="12">
					<b-form-group
						label="Categoria Pai:"
						label-for="category-parentId"
					>
						<b-form-select
							id="category-parentId"
							:options="categories"
							v-model="category.parentId"
							:disabled="mode === 'remove'"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-button variant="primary" v-if="mode === 'save'" @click="save"
						>Salvar</b-button
					>
					<b-button
						variant="danger"
						v-if="mode === 'remove'"
						@click="remove"
						>Excluir</b-button
					>
					<b-button class="ml-2" @click="reset">Cancelar</b-button>
				</b-col>
			</b-row>
		</b-form>
		<b-table hover striped :items="categories" :fields="fields">
			<template slot="actions" slot-scope="data">
				<b-button
					variant="warning"
					@click="loadCategory(data.item)"
					class="mr-2"
				>
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button
					variant="danger"
					@click="loadCategory(data.item, 'remove')"
				>
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
	name: 'CategoryAdmin',
	data: () => ({
		categories: [],
		category: {},
		mode: 'save',
		fields: [
			{
				key: 'id',
				label: 'ID',
				sortable: true,
			},
			{
				key: 'name',
				label: 'Nome',
				sortable: true,
			},
			{
				key: 'path',
				label: 'Caminho',
			},
			{ key: 'actions', label: 'Ações' },
		],
	}),
	methods: {
		loadCategories() {
			axios.get(`${baseApiUrl}/categories`).then((res) => {
				this.categories = res.data.map((category) => {
					return { ...category, value: category.id, text: category.path }
				})
			})
		},
		reset() {
			this.mode = 'save'
			this.category = {}
			this.loadCategories()
		},
		save() {
			const method = this.category.id ? 'put' : 'post'
			const id = this.category.id ? `/${this.user.id}` : ''
			axios[method](`${baseApiUrl}/categories${id}`, this.category)
				.then(() => {
					this.$toasted.global.defaultSuccess()
					this.reset()
				})
				.catch(showError)
		},
		remove() {
			const id = this.category.id
			axios
				.delete(`${baseApiUrl}/categories/${id}`)
				.then(() => {
					this.$toasted.global.defaultSuccess()
					this.reset()
				})
				.catch(showError)
		},
		loadCategory(category, mode = 'save') {
			this.mode = mode
			this.category = { ...category }
		},
	},
	mounted() {
		this.loadCategories()
	},
}
</script>

<style>
</style>