import Base from "./base";


export class Product extends Base {
    productList(search: any) {
        console.log("In Product API")
        let path = 'product?q='+search
        console.log('Calling apiClient from Product API###')
        let a = this.apiClient.get(path)
        console.log('***Path : ',a)
        return a
    }

    product(productId: any) {
        console.log("In Product API")
        let path = 'product?q='+productId
        console.log('Calling apiClient from Product API###')
        let a = this.apiClient.get(path)
        console.log('***Path : ',a)
        return a
    }



}