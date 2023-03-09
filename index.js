const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

require("./db.js")
const product = require("./models/product.js")


app.get('/', (req, res) => {
    res.json("<h1>HOME..</h1>");
});

app.post('/add_product', async(req, res) => {
    try{
        const id_by_user = req.body.id
        const data = await product.findOne({id : id_by_user})

        if(data){
            res.json("id is already present, choose different id")
        }else{    
            const addProduct = new product(req.body)
            await addProduct.save()
            res.status(201).json("Successfully Added")
        }  
    }
    catch (error){
        res.status(500).json(error)
    }
});

app.get('/all_products/:start_n/:productType', async(req, res) => {
    try{
        const start_n = req.params.start_n
        const productType1 = (req.params.productType).toLowerCase()

        if(productType1 == "all"){
            const allProducts = await product.find({})
                            .sort({ "add_time":-1 })
                            .skip(start_n)
                            .limit(8)
            res.status(200).json(allProducts)
        }else{
            const allProducts = await product.find({product_type: productType1})
                            .sort({ "add_time":-1 })
                            .skip(start_n)
                            .limit(8)
            res.status(200).json(allProducts)
        }
    }
    catch (error){
        res.status(500).json("error")
    }
});

app.get('/product/:p_id', async(req, res) => {
    try{
        const id = req.params.p_id
        const singleProduct = await product.findOne({id : id})   //db vala key name : const vala variable name
        res.status(200).json(singleProduct)
    }
    catch (error){
        res.status(400).json(error)
    }
});

app.patch('/p_update', async(req, res) => {
    try{
        const singleProduct = await product.updateOne(
            {id: req.body.id},
            {
                $set : {
                    instagram_link: req.body.instagram_link            
                }
            }
        )

        if(singleProduct.modifiedCount > 0){
            res.status(200).json("Product is updated successfully")
        }else{
            res.status(200).json("Product is failed to update")
        }

    }
    catch (error){
        res.status(500).json(error)
    }
});

app.delete('/p_delete', async(req, res) => {
    try{
        const myId = req.body.id
        const singleProduct = await product.deleteOne({id: myId})
        if(singleProduct.deletedCount == 0){
            res.status(200).json("No Product Is Found With This ID")
        }else{
            res.status(200).json("Successfully Deleted")
        }
    }
    catch (error){
        res.status(500).json(error)
    }
});

app.get('*', (req, res) => {
    res.json("<h1>404</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening portt ${PORT}`);
});