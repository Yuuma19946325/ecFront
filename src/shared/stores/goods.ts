import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

interface State {
	goodsId: number;
	goodsName:String;
	categoryId:number;
	amount:number;
	stock:number;
	set:number;
	material:string;
	brand:string;
	theme:string;
	target:number;
	point:number;
	image:any;
}

export const useGoodsStore = defineStore("goods", {
	state: (): State => {
		return {
			goodsId: 0,
			goodsName:'',
			categoryId:0,
			amount:0,
			stock:0,
			set:0,
			material:'',
			brand:'',
			theme:'',
			target:0,
			point:0,
			image:''
		};
	},
	getters: {
		doubleCount: (state): number => {
			return state.goodsId * 2;
		}
	},
	actions: {
		increment(): void {
			ajax.getJSON('http://localhost:8080/api/goods/list').pipe(
				map(response => response)
			).subscribe({
				next: (response) => {
					console.log(response)
				  },
				  error: (err) => {
					console.log(err)
				  }
			})
		}
	}
});
