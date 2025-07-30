
async function main(){

try {
    let res = await fetch("https://fakestoreapi.com/products")
    let products = await res.json()
    let filteredProducts = products.filter((ele)=>{
        return ele.price>150;
    })
    console.log(filteredProducts)
} catch (error) {
    console.log(error)
}
}

main()




