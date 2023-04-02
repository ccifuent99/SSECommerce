const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const [
    moe,
    lucy,
    larry,
    prayerPlant,
    africanViolet,
    moneyTree,
    bunnyEars,
    ratTail,
    kentiaPalm,
    pileaPlant,
    stringOfPearls,
    rubberFig,
    dragonTree,
    goldenPothos,
    monsteraDeli,
    yuccaCane,
    africanMilk,
    zzPlant,
    arabicaCoffee,
    jadePlant,
    aloeVera,
    snakePlant,
    crotonPlant,
    ethyl,
    prof,
  ] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Fungi",
      email: "funguy2@gmail.com",
      avatar:
        "https://cdn.pixabay.com/photo/2019/10/22/13/14/woman-4568680_1280.jpg",
      isAdmin: false,
    }),
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Cacti",
      email: "cacticrfriends@gmail.com",
      avatar:
        "https://cdn.pixabay.com/photo/2018/10/14/01/21/chollo-3745561_1280.jpg",
      isAdmin: false,
    }),
    User.create({
      username: "larry",
      password: "123",
      firstName: "Larry",
      lastName: "Succulent",
      email: "larrylent@yahoo.com",
      avatar:
        "https://cdn.pixabay.com/photo/2014/05/13/22/40/man-343674_1280.jpg",
      isAdmin: false,
    }),

    Product.create({
      name: "Prayer Plant",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 7.99,
      petFriendly: true,
      difficulty: 2,
      imageURL:
        "https://cdn.shopify.com/s/files/1/0662/5489/products/Ctenanthe_burle-marxii_-_pistils_nursery_1391x1800.jpg?v=1609194747",
    }),
    Product.create({
      name: "African Violet",
      lightRequirements: "indirect bright light",
      waterRequirements: "weekly",
      price: 8.99,
      petFriendly: true,
      difficulty: 1,
      imageURL:
        "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1605445534/vendor/3637/catalog/product/2/0/20140816125821_file_53ef556d70ac7_11_1_4.jpg",
    }),
    Product.create({
      name: "Money Tree",
      lightRequirements: "indirect bright light",
      waterRequirements: "weekly",
      price: 32.99,
      petFriendly: true,
      difficulty: 2,
      imageURL:
        "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/d078e8b8-3643-43e5-81e6-5f8b1f36d923/s/braided-money-tree-scandinavian-white-scandinavian-ceramic.jpeg?version=1608581842.8790019800",
    }),
    Product.create({
      name: "Bunny Ears Cactus",
      lightRequirements: "direct bright light",
      waterRequirements: "monthly",
      price: 6.99,
      petFriendly: true,
      difficulty: 1,
      imageURL:
        "http://cdn.shopify.com/s/files/1/0253/6701/9565/products/Bunny-Ears-Cactus-Cylinder-Pot-Small_1024x1024.jpg?v=1650819673",
    }),
    Product.create({
      name: "Rat Tail Cactus",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 24.99,
      petFriendly: true,
      difficulty: 1,
      imageURL:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQSDZE2x3OGoNMAATzHWJArrzexYbmcdA6TP5jiPVFbUF35Yg_p3WtuH1Gz5WhbF7H0annz7NxQMa42GtC8wyQO0Xv5VN20ssLqiVx248j823R8iJXtUOSP&usqp=CAE",
    }),
    Product.create({
      name: "Kentia Palm",
      lightRequirements: "indirect bright light",
      waterRequirements: "weekly",
      price: 50.99,
      petFriendly: true,
      difficulty: "2",
      imageURL:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6e9hRp7zJGbdNSKLXnd14Cvw1Fllb5TkxIW_GAz95hwvu6CDRDbOPgqcVWnnJLhegM1ZGyOvGSu59ZHXY-MY3p47YEmk9CbIpvzZ3hJneSPRroNUuHK30Rw&usqp=CAE",
    }),
    Product.create({
      name: "Pilea Plant",
      lightRequirements: "indirect bright light",
      waterRequirements: "weekly",
      price: 8.99,
      petFriendly: true,
      difficulty: 1,
      imageURL:
        "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/8223e22f-0c90-4720-8373-694f221e0e8c/s/pilea-peperomioides.jpeg?version=1608581955.18890019800",
    }),
    Product.create({
      name: "String-of-Pearls",
      lightRequirements: "indirect bright light",
      waterRequirements: "biweekly",
      price: 6.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://i.etsystatic.com/23478581/r/il/292300/4347396525/il_fullxfull.4347396525_iea3.jpg",
    }),
    Product.create({
      name: "Rubber Fig",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 19.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/medium-plant-ficus-white-pot.jpg?v=1649450339",
    }),
    Product.create({
      name: "Dragon Tree",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 19.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://d3gkbidvk2xej.cloudfront.net/images/products/287c010b-f20d-4a96-9d7f-af6e8c1a619f/s/dragon-tree.jpeg?version=1647962536.46390019800",
    }),
    Product.create({
      name: "Golden Pothos",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "weekly",
      price: 5.99,
      petFriendly: false,
      difficulty: 2,
      imageURL:
        "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Golden_Pothos_5_FGT_650x.jpg?v=1626903728",
    }),
    Product.create({
      name: "Monstera deliciosa",
      lightRequirements: "indirect bright light",
      waterRequirements: "biweekly",
      price: 29.99,
      petFriendly: false,
      difficulty: 3,
      imageURL:
        "https://d3gkbidvk2xej.cloudfront.net/images/products/v2/fdbf3544-7383-4800-86eb-c8303832e6c1/s/monstera-deliciosa.jpeg?version=1608581158.16890019800&fm=jpeg&w=449&h=598&fit=crop",
    }),
    Product.create({
      name: "Yucca Cane",
      lightRequirements: "direct bright light",
      waterRequirements: "biweekly",
      price: 24.99,
      petFriendly: false,
      difficulty: 2,
      imageURL:
        "https://st2.depositphotos.com/1785712/5428/i/950/depositphotos_54288223-stock-photo-yucca-plant-potted-in-a.jpg",
    }),
    Product.create({
      name: "African Milk Tree",
      lightRequirements: "direct bright light",
      waterRequirements: "weekly",
      price: 5.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://pottedpixie.com/wp-content/uploads/2020/11/euphorbia-cactus-1024x683.jpg",
    }),
    Product.create({
      name: "ZZ Plant",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 11.99,
      petFriendly: false,
      difficulty: 2,
      imageURL:
        "https://i0.wp.com/theplantsociety.shop/wp-content/uploads/2022/03/Zamioculcas-Zamiifolia-or-ZZ-Plant-in-white-flower-pot-stand-on-wooden-table-on-a-light-background.jpeg?fit=1200%2C1200&ssl=1",
    }),
    Product.create({
      name: "Arabica Coffee Plant",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "weekly",
      price: 19.99,
      petFriendly: false,
      difficulty: 2,
      imageURL:
        "https://www.ikea.com/us/en/images/products/coffea-arabica-potted-plant-in-mug-coffee-plant__0573875_pe667947_s5.jpg?f=xs",
    }),
    Product.create({
      name: "Jade Plant",
      lightRequirements: "indirect bright light",
      waterRequirements: "biweekly",
      price: 11.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://www.picturethisai.com/wiki-image/1080/72C5DC42E7C84534A7EEB34DF9B7FA27.jpeg",
    }),
    Product.create({
      name: "Aloe vera",
      lightRequirements: "direct bright light",
      waterRequirements: "biweekly",
      price: 19.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://i5.walmartimages.com/asr/87d36fa8-a307-4ba5-a25b-8a1a4811b85e.c08ac83b50bebe674c132ce94deb9595.jpeg",
    }),
    Product.create({
      name: "Snake Plant",
      lightRequirements: "low or indirect bright light",
      waterRequirements: "biweekly",
      price: 14.99,
      petFriendly: false,
      difficulty: 1,
      imageURL:
        "https://d3gkbidvk2xej.cloudfront.net/images/products/77a60682-9128-4980-bdf6-a0ee46c97e71/s/snake-plant-laurentii-white-mid-century-ceramic.jpeg?version=1654866934.25190019800",
    }),
    Product.create({
      name: "Croton Plant",
      lightRequirements: "direct bright light",
      waterRequirements: "weekly",
      price: 32.99,
      petFriendly: false,
      difficulty: 5,
      imageURL:
        "https://balconygardenweb.b-cdn.net/wp-content/uploads/2020/04/7.-Petra-Croton.jpg",
    }),

    User.create({
      username: "ethyl",
      password: "123",
      firstName: "Ethyl",
      lastName: "Vera",
      email: "catsinger2411@aol.com",
      avatar:
        "https://cdn.pixabay.com/photo/2018/05/14/21/43/british-shorthair-3401683_1280.jpg",
      isAdmin: false,
    }),
    User.create({
      username: "prof",
      password: "123",
      firstName: "Eric",
      lastName: "Katz",
      avatar: "https://avatars.githubusercontent.com/u/572758?v=4",
      isAdmin: true,
    }),
  ]);

  await prof.getCart();
  prof.addToCart({ product: snakePlant, quantity: 2 });
  prof.addToCart({ product: aloeVera, quantity: 3 });
  prof.addToCart({ product: arabicaCoffee, quantity: 4 });
  prof.createOrder();

  await prof.getCart();
  prof.addToCart({ product: zzPlant, quantity: 2 });
  prof.addToCart({ product: monsteraDeli, quantity: 1 });
  prof.addToCart({ product: goldenPothos, quantity: 4 });

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: yuccaCane, quantity: 3 });
  await ethyl.addToCart({ product: crotonPlant, quantity: 2 });

  const moesOrder = await moe.getCart();
  await moe.addToCart({ product: dragonTree, quantity: 1 });
  await moe.addToCart({ product: snakePlant, quantity: 5 });
  await moe.createOrder();

  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      yuccaCane,
      crotonPlant,
      dragonTree,
      snakePlant,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  LineItem,
  Order,
};
