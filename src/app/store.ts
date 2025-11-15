import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce} from 'immer';
import { Snackbar } from "./services/snackbar";
import { Cart } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./shared/sign-in-dialog/sign-in-dialog";
import { SignUpDialog } from "./shared/sign-up-dialog/sign-up-dialog";
import { User, UserSignIn } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync } from "@angular-architects/ngrx-toolkit"

export type EcommerceState = {
    products: Product[];
    category:string;
    wishlistItems: Product[];
    cartItems: Cart[];
    user: User | undefined;

    loading: boolean;
    selectedProductId: string | undefined;
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },

    withState<EcommerceState>({
        products:[
      {
        id: "el001",
        name: "Samsung S21 Ultra Smartphone",
        description: "6.8-inch AMOLED display, 256GB storage, 5G-ready flagship phone.",
        price: 899.99,
        imageUrl: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.7,
        reviewCount: 1432,
        inStock: true,
        category: "Electronics"
      },
      {
        id: "el002",
        name: "Auralink Pro Headphones",
        description: "Wireless over-ear headphones with adaptive noise cancellation.",
        price: 279.99,
        imageUrl: "https://images.unsplash.com/photo-1698296725423-9ede5de2d624?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
        rating: 4.6,
        reviewCount: 981,
        inStock: true,
        category: "Electronics"
      },
      {
        id: "el003",
        name: "VoltEdge Smartwatch V5",
        description: "Fitness tracking, sleep monitoring, and smartphone notifications.",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1758348844355-2ef28345979d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.4,
        reviewCount: 742,
        inStock: false,
        category: "Electronics"
      },
      {
        id: "el004",
        name: "Zenbook Ultra Laptop 14”",
        description: "Lightweight, high-performance laptop with Intel Core i7 and 16GB RAM.",
        price: 1299.99,
        imageUrl: "https://images.unsplash.com/photo-1713470812508-c276021f1b93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        rating: 4.8,
        reviewCount: 512,
        inStock: true,
        category: "Electronics"
      },
      {
        id: "el005",
        name: "PixelCam 4K Action Camera",
        description: "Waterproof compact action camera with stabilization.",
        price: 349.99,
        imageUrl: "https://images.unsplash.com/photo-1584725686929-eebf97add53e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.5,
        reviewCount: 655,
        inStock: true,
        category: "Electronics"
      },
      {
        id: "fa001",
        name: "UrbanFlex Sneakers",
        description: "Lightweight, breathable mesh sneakers for comfort and performance.",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1687511845973-b6225ffec7e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 4.6,
        reviewCount: 891,
        inStock: true,
        category: "Fashion"
      },
      {
        id: "fa002",
        name: "LumaWear Denim Jacket",
        description: "Classic fit denim jacket with a modern cut.",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1706765779494-2705542ebe74?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1051",
        rating: 4.5,
        reviewCount: 452,
        inStock: true,
        category: "Fashion"
      },
      {
        id: "fa003",
        name: "Elegance Chrono Watch",
        description: "Stylish stainless-steel chronograph watch with minimalist design.",
        price: 249.99,
        imageUrl: "https://images.unsplash.com/photo-1753628205683-e23b6890c243?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
        rating: 4.8,
        reviewCount: 620,
        inStock: true,
        category: "Fashion"
      },
      {
        id: "fa004",
        name: "SilkEdge Scarf",
        description: "Premium silk scarf with handcrafted patterns.",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        rating: 4.4,
        reviewCount: 200,
        inStock: false,
        category: "Fashion"
      },
      {
        id: "fa005",
        name: "Nordic Leather Boots",
        description: "Durable handmade leather boots with reinforced soles.",
        price: 189.99,
        imageUrl: "https://images.unsplash.com/photo-1599141793311-710f09cc58ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 4.7,
        reviewCount: 377,
        inStock: false,
        category: "Fashion"
      },
      {
        id: "hl001",
        name: "ComforRest Memory Foam Pillow",
        description: "Ergonomic pillow designed for optimal neck support.",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1654801837473-302a16e1b96d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1400",
        rating: 4.8,
        reviewCount: 934,
        inStock: true,
        category: "Home & Living"
      },
      {
        id: "hl002",
        name: "Lumina Smart Lamp",
        description: "Adjustable brightness and color via mobile app.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1695617508238-7b2b6c64e191?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=669",
        rating: 4.6,
        reviewCount: 564,
        inStock: true,
        category: "Home & Living"
      },
      {
        id: "hl003",
        name: "Braun Coffee Maker",
        description: "Automatic coffee maker with built-in grinder.",
        price: 229.99,
        imageUrl: "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        rating: 4.7,
        reviewCount: 382,
        inStock: true,
        category: "Home & Living"
      },
      {
        id: "hl004",
        name: "EcoMat Bamboo Rug",
        description: "Eco-friendly bamboo fiber rug, soft and durable.",
        price: 99.99,
        imageUrl: "https://plus.unsplash.com/premium_photo-1744444401599-d26518a5de3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.5,
        reviewCount: 261,
        inStock: false,
        category: "Home & Living"
      },
      {
        id: "hl005",
        name: "Serene Aroma Diffuser",
        description: "Ultrasonic diffuser with adjustable mist modes.",
        price: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1636410515418-bbec95c35053?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        rating: 4.6,
        reviewCount: 478,
        inStock: true,
        category: "Home & Living"
      },
      {
        id: "bp001",
        name: "GlowSkin Vitamin C Serum",
        description: "Brightens skin tone and reduces dark spots.",
        price: 34.99,
        imageUrl: "https://images.unsplash.com/photo-1648712789552-a039336cecf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=903",
        rating: 4.7,
        reviewCount: 1034,
        inStock: true,
        category: "Beauty & Personal Care"
      },
      {
        id: "bp002",
        name: "Volumen Shampoo",
        description: "Fortifying shampoo for stronger hair growth.",
        price: 19.99,
        imageUrl: "https://images.unsplash.com/photo-1669281392832-9181a2b484af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025",
        rating: 4.5,
        reviewCount: 680,
        inStock: true,
        category: "Beauty & Personal Care"
      },
      {
        id: "bp003",
        name: "PureSilk Body Lotion",
        description: "Deep moisturizing lotion enriched with shea butter.",
        price: 15.99,
        imageUrl: "https://images.unsplash.com/photo-1703174323653-0455deaf7f11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 4.8,
        reviewCount: 910,
        inStock: true,
        category: "Beauty & Personal Care"
      },
      {
        id: "bp004",
        name: "ZenScent Eau de Parfum",
        description: "Luxury fragrance with floral and amber notes.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1644141929951-e07aa12a51db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.9,
        reviewCount: 543,
        inStock: true,
        category: "Beauty & Personal Care"
      },
      {
        id: "bp005",
        name: "AquaPure Facial Cleanser",
        description: "Gentle daily cleanser suitable for all skin types.",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1710693547884-41a6113d67d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=777",
        rating: 4.6,
        reviewCount: 612,
        inStock: false,
        category: "Beauty & Personal Care"
      },
      {
        id: "ga001",
        name: "HyperPulse Gaming Mouse",
        description: "Ergonomic RGB mouse with adjustable DPI and low latency.",
        price: 69.99,
        imageUrl: "https://images.unsplash.com/photo-1727417490350-4a1a6e18d9f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
        rating: 4.8,
        reviewCount: 870,
        inStock: false,
        category: "Gaming & Accessories"
      },
      {
        id: "ga002",
        name: "StormKey Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches and aluminum frame.",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1558050032-8e05d4037d2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 4.7,
        reviewCount: 531,
        inStock: true,
        category: "Gaming & Accessories"
      },
      {
        id: "ga003",
        name: "CloudZone Gaming Chair",
        description: "Ergonomic gaming chair with adjustable lumbar and armrests.",
        price: 259.99,
        imageUrl: "https://images.unsplash.com/photo-1670946839270-cc4febd43b09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        rating: 4.6,
        reviewCount: 414,
        inStock: true,
        category: "Gaming & Accessories"
      },
      {
        id: "ga004",
        name: "ProVision 4K Monitor",
        description: "27-inch 4K monitor with HDR and 144Hz refresh rate.",
        price: 499.99,
        imageUrl: "https://images.unsplash.com/photo-1680254811982-bdf4dabde3ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        rating: 4.8,
        reviewCount: 788,
        inStock: true,
        category: "Gaming & Accessories"
      },
      {
        id: "ga005",
        name: "SoundWave Gaming Headset",
        description: "Surround sound headset with noise-canceling mic.",
        price: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1662198876798-7d1e4f1a42bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 4.7,
        reviewCount: 675,
        inStock: true,
        category: "Gaming & Accessories"
      }
        ],
        category:'All',
        wishlistItems:[],
        cartItems:[],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
    }),
    withStorageSync({key:'shopdev', select: ({ wishlistItems, cartItems, user}) =>({ wishlistItems, cartItems, user})}),

    withComputed(({category, products, wishlistItems, cartItems, selectedProductId})=>({
        filterProducts: computed(() => {
            if (category() === 'All') {
                return shuffle(products());
            } else {
                return products().filter(p => p.category === category());
            }
        }),
        wishListCount: computed( () => wishlistItems().length),
        cartCount: computed(()=> cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        selectedProduct: computed(()=> products().find(p => p.id === selectedProductId())),
    })),

    withMethods((store, snackbar= inject(Snackbar), matDialog=inject(MatDialog), router = inject(Router)) => ({

        setCategory: signalMethod<string>((category:string)=>{
            patchState( store,  {category});
        }),

        setProductId: signalMethod<string>((selectedProductId: string)=>{
          patchState(store, {selectedProductId: selectedProductId})
        }),

        addTowishList:(product: Product) =>{
            const updatedwishListItems: Product[] = produce(store.wishlistItems(), (draft:Product[])=>{
                if(!draft.find(p => p.id === product.id )){
                    draft.push(product);
                }
            });
            patchState(store, {wishlistItems : updatedwishListItems});
            snackbar.showSnackBarSucess('✅ Product added to wishlist');
        },

        addToCart: (product: Product, quantity =1)=>{
          const existAlreadyInCart = store.cartItems().findIndex( i=> i.product.id === product.id);
          const updateCartItems: Cart[] = produce(store.cartItems(), (draft:Cart[])=>{
            if(existAlreadyInCart !==-1){
              draft[existAlreadyInCart].quantity += quantity;
              return
            }else{
              draft.push({product, quantity})
            }
          });
          patchState(store, {
            cartItems: updateCartItems
          });
          snackbar.showSnackBarSucess(existAlreadyInCart !==-1 ? '✅ Product added again' :'✅ Product added to the Cart');
        },

        removeFromWishList : (product:Product) =>{
            patchState(store, {
                wishlistItems: store.wishlistItems().filter(p =>p.id !==product.id)
            });
            snackbar.showSnackBarSucess('❎ Product remove from the wishlist');
        },

        clearWishList: () =>{
            patchState(store, {wishlistItems: []})
        },

        setItemQuantity: (product: Product, quantity:number) =>{
          const index = store.cartItems().findIndex(cart=> cart.product.id === product.id);
          const updateCart = produce(store.cartItems(), (draft)=>{
            draft[index].quantity = quantity;
          });
          patchState(store, {cartItems : updateCart});
        }, 

        addWishToCart: ()=>{
          const updateCartWithWishlist = produce(store.cartItems(), (draft)=>{
            store.wishlistItems().forEach((p)=>{
              if(!draft.find(c=> c.product.id === p.id)){
                draft.push({
                  product: p,
                  quantity:1
                })
              }
            })
          });
          patchState(store, {
            cartItems: updateCartWithWishlist,
            wishlistItems: []
          });
        },

        moveToWishlist: (product: Product)=>{
          const movingProduct = store.cartItems().filter((p=> p.product.id !== product.id));
          const updatedwishListItems = produce(store.wishlistItems(), (draft)=>{
            if(!draft.find((p)=> p.id === product.id)){
              draft.push(product);
            }
          })
          patchState(store, {
            cartItems: movingProduct,
            wishlistItems: updatedwishListItems
          })
        }, 

        removeFromCartList : (product: Product) =>{
            patchState(store, {
                cartItems: store.cartItems().filter(p =>p.product.id !== product.id)
            });
            snackbar.showSnackBarSucess('❎ Product remove from the Cart');
        },

        loginModal: () =>{
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
            width: '400px',
          });
        },

        signIn : ({email, password, checkout, dialogId}: UserSignIn) => {
          patchState(store, {
            user: {
              id: 'user001',
              name: 'John Doe',
              email: email,
              imageUrl: 'https://randomuser.me/api/portraits/men/15.jpg'
            }
          });
          matDialog.getDialogById(dialogId!)?.close();

          if(checkout){
            router.navigate(['/checkout']);
          }
          snackbar.showSnackBarSucess('✅ User signed in successfully');

        },

        signupModal: () =>{
          matDialog.open(SignUpDialog, {
            disableClose: true,
            width: '400px',
          });
        },

        signOut : () =>{
          patchState(store, {
            user: undefined
          });
          snackbar.showSnackBarSucess('✅ User signed out successfully');
        },

        checkout: () =>{
          if(!store.user()){
            matDialog.open(SignInDialog, {
              disableClose: true,
              data: {
                checkout: true,
              },
              width: '400px',
            });
            return;
          }
          router.navigate(['/checkout']);
        },


        proceedOrder: async () =>{
          patchState(store, {loading: true});
          const user = store.user();
          if(!user){
            snackbar.showSnackBarError("❌ Please Login before Continiung");
            patchState(store, {loading: false});
            return
          }

          const order: Order = {
            id: crypto.randomUUID(),
            userId: user.id,
            total: store.cartItems().reduce((acc, item)=>acc + item.quantity* item.product.price, 0),
            items: store.cartItems(),
            paymentStatus: 'success',
          }
          await new Promise((resolve)=> setTimeout(resolve, 1000));
          patchState(store, {loading: false, cartItems : []});
          router.navigate(['/order_success']);

        }

    }))

)


/**
 * this function takes an array of any type and returns a shuffled array of that same type.
 * @param array array of element to shuffle
 * @returns same array type
 */
export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};