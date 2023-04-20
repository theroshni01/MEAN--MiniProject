var Product=require('../models/product');

var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/IdolShop');

var products=[
    new Product({
        imagePath:'https://m.media-amazon.com/images/I/610nTO4KNML._SL1500_.jpg',
        title:'Bora Light Stick',
        description:'Bora Light Stick with multiple color',
        price:250

    }),
    new Product({
        imagePath:'https://m.media-amazon.com/images/I/71-9FAxuFWL._SL1500_.jpg',
        title:'BTS- V',
        description:'Mininion of BTS-V Kim Taehyung',
        price:200

    }),
    new Product({
        imagePath:'https://m.media-amazon.com/images/I/71daAxchgIL._AC_SY445_.jpg',
        title:'BTS-JK',
        description:'Mininion of BTS-JK Jungkook',
        price:200

    }),
    new Product({
        imagePath:'https://ipurple.eu/296-medium_default/bts-bts-x-mattel-mini-doll-jimin.jpg',
        title:'BTS-Jimin',
        description:'Mininion of BTS-Jimin Park Jimin',
        price:200

    }),
    new Product({
        imagePath:'https://m.media-amazon.com/images/I/71ES7raHeDL._SY550_.jpg',
        title:'BTS-RM',
        description:'Mininion of BTS-RM Kim Namjoon',
        price:200

    }),
    new Product({
        imagePath:'https://images-cdn.ubuy.co.in/6347b2d1ce71dc4947559542-bts-mini-idol-doll-suga.jpg',
        title:'BTS-Suga',
        description:'Mininion of BTS-Suga Min yoongi',
        price:200

    }),
];
var done=0;
for(var i=0;i<products.length;i++)
{
    products[i].save(function(err,rezult)
    {
        done++;
        if(done==products.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}
