import Base from "./base";


export class Shop extends Base {
    shopList(search: any) {
        console.log("In Shop API")
        let path = 'store?q='+search
        console.log('Calling apiClient from Shop API###')
        let a = this.apiClient.get(path)
        console.log('***Result : ',a)
        return a
    }

    shop(shopId: string) {
        console.log("calling apiClient");
        console.log("calling apiClient - input shopId is", shopId);
        let path = "store?q=" + shopId;
        let a = this.apiClient.get(path);
        console.log("**shop : in shops.ts returning api result : ", a);
        return a;
      }

}
