utils = {
    setParam : function (name,value){
        //localStorage.clear();
         localStorage.setItem(name,value)
    },
    getParam : function(name){
        // localStorage.clear();
         return localStorage.getItem(name)
    }
}
product={
    id:0,
    name:"",
    qty:0,
    picpath: "",
    price:0.0,
    originalPrice: 0.0,
};
orderdetail={
    username:"",
    phone:"",
    address:"",
    zipcode:"",
    totalNumber:0,
    totalAmount:0.0
}
cart = {
    //向购物车中添加商品
    addProduct:function(UID,product){
        var ShoppingCart = utils.getParam(UID + "_ShoppingCart");
        console.log(ShoppingCart)
        if(ShoppingCart==null||ShoppingCart==""){
            //第一次加入商品
            var jsonstr = {"productlist":
              [
                  {
                    "id":product.id,
                    "picpath":product.picpath, 
                    "name":product.name,
                    "qty":product.qty,
                    "price":product.price,
                    "originalPrice": product.originalPrice,
                 }
            ],
                "totalNumber":product.qty,
                "totalAmount":(product.price*product.qty)
            };
            jsonstr.productlist.push();
            utils.setParam(UID + "_ShoppingCart",JSON.stringify(jsonstr));
        }
       
        else{
            var jsonstr = JSON.parse(ShoppingCart);
            alert("==1111="+utils.getParam(UID + "_ShoppingCart"));
            console.log("==2222=",jsonstr);
             
            var productlist = jsonstr.productlist;
            var result=false;
            //查找购物车中是否有该商品
            for(var i in productlist){
                if(productlist[i].id==product.id){
                    productlist[i].qty=parseInt(productlist[i].qty)+parseInt(product.qty);
                    result = true;
                }
            }
            if(!result){   //没有该商品就直接加进去
                productlist.push({"id":product.id, "picpath":product.picpath,"name":product.name,"qty":product.qty,
                "price":product.price,"originalPrice":product.originalPrice});
            }
            //重新计算总价
            jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+parseInt(product.qty);
            jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+(parseInt(product.qty)*parseFloat(product.price));
            orderdetail.totalNumber = jsonstr.totalNumber;
            orderdetail.totalAmount = jsonstr.totalAmount;
            //保存购物车
            utils.setParam(UID + "_ShoppingCart",JSON.stringify(jsonstr));
            
        }
        alert("==0000="+utils.getParam(UID + "_ShoppingCart"));
    },
    //修改给买商品数量
   
    updateProductNum:function(UID,id,qty){
        var ShoppingCart = utils.getParam(UID + "_ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart);
        var productlist = jsonstr.productlist;
        for(var i in productlist){
            if(productlist[i].id==id){
                jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+(parseInt(qty)-parseInt(productlist[i].qty));
                jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+((parseInt(qty)*parseFloat(productlist[i].price))-parseInt(productlist[i].qty)*parseFloat(productlist[i].price));
                productlist[i].qty=parseInt(qty);
                orderdetail.totalNumber = jsonstr.totalNumber;
                orderdetail.totalAmount = jsonstr.totalAmount;
                utils.setParam(UID + "_ShoppingCart",JSON.stringify(jsonstr));
                return;
            }
        }
    },
  
    //获取购物车中的所有商品
    getProductList:function(UID){
        var ShoppingCart = utils.getParam(UID + "_ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart);
        var productlist = jsonstr.productlist;
        orderdetail.totalNumber = jsonstr.totalNumber;
        orderdetail.totalAmount = jsonstr.totalAmount;
        return productlist;
    },
    /*
    //不传id则判断购物车中是否存在商品，传id则判断购物车中是否存在某种商品
    existProduct:function(UIDid){
        var ShoppingCart = utils.getParam(UID + "_ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart);
        var productlist = jsonstr.productlist;
        var result=false;
        if(id!=null){
            for(var i in productlist){
                if(productlist[i].id==id){
                    result = true;
                }
            }
        }else{
            if(productlist.length>0){
                result=true;
            }
        }
        return result;
    },
     */
    //不传id则删除购物车中所有商品，传id则删除某种商品
    clearProduct:function(UID,id){
        var ShoppingCart = utils.getParam(UID + "_ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart);
        var productlist = jsonstr.productlist;
        var list=[];
        if(id!=null){
            for(var i in productlist){
                if(productlist[i].id==id){
                    jsonstr.totalNumber=parseInt(jsonstr.totalNumber)-parseInt(productlist[i].qty);
                    jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)-parseInt(productlist[i].qty)*parseFloat(productlist[i].price);
                }else{
                    list.push(productlist[i]);
                }
            }
        }
        jsonstr.productlist = list;
        orderdetail.totalNumber = jsonstr.totalNumber;
        orderdetail.totalAmount = jsonstr.totalAmount;
        utils.setParam(UID + "_ShoppingCart",JSON.stringify(jsonstr));
    }
   
};