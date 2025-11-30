import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce} from 'immer';
import { Snackbar } from "./services/snackbar";
import { Cart } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./shared/sign-in-dialog/sign-in-dialog";
import { SignUpDialog } from "./shared/sign-up-dialog/sign-up-dialog";
import { User, UserSignIn, UserSignUp } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync } from "@angular-architects/ngrx-toolkit"
import { AddReviewParams, UserReview } from "./models/user-review";

export type EcommerceState = {
    products: Product[];
    category:string;
    wishlistItems: Product[];
    cartItems: Cart[];
    user: User | undefined;

    loading: boolean;
    selectedProductId: string | undefined;
    writeReview:boolean
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
        category: "Electronics",
        reviews: [
          {
            id: "rev-el001-1",
            productId: "el001",
            UserName: "John Doe",
            userImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5,
            title: "Excellent Smartphone",
            comment: "Amazing camera and performance. Worth every penny!",
            reviewDate: new Date('2023-05-15')
          },
          {
            id: "rev-el001-2",
            productId: "el001",
            UserName: "Jane Smith",
            userImageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 4,
            title: "Good but pricey",
            comment: "Great features, but a bit expensive. Overall satisfied.",
            reviewDate: new Date('2023-06-20')
          },
          {
            id: "rev-el001-3",
            productId: "el001",
            UserName: "Bob Johnson",
            userImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 5,
            title: "Top-notch",
            comment: "Best phone I've ever owned. Battery life is incredible.",
            reviewDate: new Date('2023-07-10')
          },
          {
            id: "rev-el001-4",
            productId: "el001",
            UserName: "Alex Turner",
            userImageUrl: "https://randomuser.me/api/portraits/men/76.jpg",
            rating: 4,
            title: "Solid Choice",
            comment: "Good value for the features.",
            reviewDate: new Date('2023-07-15')
          },
          {
            id: "rev-el001-5",
            productId: "el001",
            UserName: "Jordan Lee",
            userImageUrl: "https://randomuser.me/api/portraits/men/77.jpg",
            rating: 5,
            title: "Amazing Phone",
            comment: "Camera is outstanding.",
            reviewDate: new Date('2023-08-20')
          },
          {
            id: "rev-el001-6",
            productId: "el001",
            UserName: "Morgan Smith",
            userImageUrl: "https://randomuser.me/api/portraits/men/78.jpg",
            rating: 3,
            title: "Okay",
            comment: "Battery life could be better.",
            reviewDate: new Date('2023-09-10')
          },
          {
            id: "rev-el001-7",
            productId: "el001",
            UserName: "Taylor Brown",
            userImageUrl: "https://randomuser.me/api/portraits/men/79.jpg",
            rating: 5,
            title: "Love It",
            comment: "Best smartphone I've had.",
            reviewDate: new Date('2023-10-05')
          }
        ]
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
        category: "Electronics",
        reviews: [
          {
            id: "rev-el002-1",
            productId: "el002",
            UserName: "Alice Brown",
            userImageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
            rating: 5,
            title: "Amazing Sound",
            comment: "Noise cancellation is top-notch. Perfect for travel.",
            reviewDate: new Date('2023-04-12')
          },
          {
            id: "rev-el002-2",
            productId: "el002",
            UserName: "Charlie Wilson",
            userImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
            rating: 4,
            title: "Comfortable",
            comment: "Very comfortable for long listening sessions.",
            reviewDate: new Date('2023-05-18')
          },
          {
            id: "rev-el002-3",
            productId: "el002",
            UserName: "Diana Lee",
            userImageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
            rating: 5,
            title: "Highly Recommend",
            comment: "Great value and sound quality. Love it!",
            reviewDate: new Date('2023-06-25')
          },
          {
            id: "rev-el002-4",
            productId: "el002",
            UserName: "Casey Wilson",
            userImageUrl: "https://randomuser.me/api/portraits/men/80.jpg",
            rating: 4,
            title: "Good Headphones",
            comment: "Sound is clear and bass is good.",
            reviewDate: new Date('2023-07-08')
          },
          {
            id: "rev-el002-5",
            productId: "el002",
            UserName: "Riley Davis",
            userImageUrl: "https://randomuser.me/api/portraits/men/81.jpg",
            rating: 5,
            title: "Excellent",
            comment: "Best headphones for the price.",
            reviewDate: new Date('2023-08-14')
          },
          {
            id: "rev-el002-6",
            productId: "el002",
            UserName: "Avery Martinez",
            userImageUrl: "https://randomuser.me/api/portraits/men/82.jpg",
            rating: 3,
            title: "Average",
            comment: "Noise cancellation could be better.",
            reviewDate: new Date('2023-09-22')
          }
        ]
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
        category: "Electronics",
        reviews: [
          {
            id: "rev-el003-1",
            productId: "el003",
            UserName: "Eve Garcia",
            userImageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
            rating: 4,
            title: "Good Watch",
            comment: "Fitness tracking is accurate. Stylish design.",
            reviewDate: new Date('2023-03-08')
          },
          {
            id: "rev-el003-2",
            productId: "el003",
            UserName: "Frank Miller",
            userImageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
            rating: 3,
            title: "Average",
            comment: "Decent features, but battery could be better.",
            reviewDate: new Date('2023-04-14')
          },
          {
            id: "rev-el003-3",
            productId: "el003",
            UserName: "Grace Davis",
            userImageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
            rating: 4,
            title: "Satisfied",
            comment: "Good for daily use. Notifications work well.",
            reviewDate: new Date('2023-05-22')
          },
          {
            id: "rev-el003-4",
            productId: "el003",
            UserName: "Cameron Garcia",
            userImageUrl: "https://randomuser.me/api/portraits/men/83.jpg",
            rating: 5,
            title: "Great Smartwatch",
            comment: "Love the health features.",
            reviewDate: new Date('2023-06-10')
          },
          {
            id: "rev-el003-5",
            productId: "el003",
            UserName: "Jamie Rodriguez",
            userImageUrl: "https://randomuser.me/api/portraits/men/84.jpg",
            rating: 4,
            title: "Nice",
            comment: "Stylish and functional.",
            reviewDate: new Date('2023-07-18')
          },
          {
            id: "rev-el003-6",
            productId: "el003",
            UserName: "Devin Martinez",
            userImageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
            rating: 2,
            title: "Disappointed",
            comment: "Battery drains quickly.",
            reviewDate: new Date('2023-08-25')
          },
          {
            id: "rev-el003-7",
            productId: "el003",
            UserName: "Skyler Thompson",
            userImageUrl: "https://randomuser.me/api/portraits/men/86.jpg",
            rating: 4,
            title: "Good Buy",
            comment: "Worth the money.",
            reviewDate: new Date('2023-09-30')
          }
        ]
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
        category: "Electronics",
        reviews: [
          {
            id: "rev-el004-1",
            productId: "el004",
            UserName: "Henry Taylor",
            userImageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
            rating: 5,
            title: "Powerful Laptop",
            comment: "Handles all my tasks effortlessly. Great performance.",
            reviewDate: new Date('2023-02-10')
          },
          {
            id: "rev-el004-2",
            productId: "el004",
            UserName: "Ivy Anderson",
            userImageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
            rating: 5,
            title: "Excellent Build",
            comment: "Lightweight and durable. Perfect for work.",
            reviewDate: new Date('2023-03-15')
          },
          {
            id: "rev-el004-3",
            productId: "el004",
            UserName: "Jack White",
            userImageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 4,
            title: "Good Value",
            comment: "High specs for the price. Very satisfied.",
            reviewDate: new Date('2023-04-20')
          },
          {
            id: "rev-el004-4",
            productId: "el004",
            UserName: "Logan White",
            userImageUrl: "https://randomuser.me/api/portraits/men/87.jpg",
            rating: 5,
            title: "Amazing Laptop",
            comment: "Fast and reliable.",
            reviewDate: new Date('2023-05-28')
          },
          {
            id: "rev-el004-5",
            productId: "el004",
            UserName: "Peyton Harris",
            userImageUrl: "https://randomuser.me/api/portraits/men/88.jpg",
            rating: 4,
            title: "Great",
            comment: "Good for gaming too.",
            reviewDate: new Date('2023-07-05')
          },
          {
            id: "rev-el004-6",
            productId: "el004",
            UserName: "Rowan Clark",
            userImageUrl: "https://randomuser.me/api/portraits/men/89.jpg",
            rating: 3,
            title: "Okay",
            comment: "Keyboard could be better.",
            reviewDate: new Date('2023-08-12')
          }
        ]
      },
      {
        id: "el005",
        name: "PixelCam 4K Action Camera",
        description: "Waterproof compact action camera with stabilization.",
        price: 349.99,
        imageUrl: "https://images.unsplash.com/photo-1584725686929-eebf97add53e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 2.5,
        reviewCount: 655,
        inStock: true,
        category: "Electronics",
        reviews: [
          {
            id: "rev-el005-1",
            productId: "el005",
            UserName: "Kate Harris",
            userImageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
            rating: 3,
            title: "Okay Camera",
            comment: "Decent for beginners, but not professional grade.",
            reviewDate: new Date('2023-01-05')
          },
          {
            id: "rev-el005-2",
            productId: "el005",
            UserName: "Liam Clark",
            userImageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
            rating: 2,
            title: "Disappointed",
            comment: "Expected better stabilization. Average at best.",
            reviewDate: new Date('2023-02-12')
          },
          {
            id: "rev-el005-3",
            productId: "el005",
            UserName: "Mia Lewis",
            userImageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
            rating: 4,
            title: "Good for Price",
            comment: "Affordable and waterproof. Good for casual use.",
            reviewDate: new Date('2023-03-18')
          },
          {
            id: "rev-el005-4",
            productId: "el005",
            UserName: "Quinn Lewis",
            userImageUrl: "https://randomuser.me/api/portraits/men/90.jpg",
            rating: 4,
            title: "Nice Camera",
            comment: "Good video quality.",
            reviewDate: new Date('2023-04-25')
          },
          {
            id: "rev-el005-5",
            productId: "el005",
            UserName: "Sage Robinson",
            userImageUrl: "https://randomuser.me/api/portraits/men/91.jpg",
            rating: 3,
            title: "Average",
            comment: "Battery life is short.",
            reviewDate: new Date('2023-06-02')
          },
          {
            id: "rev-el005-6",
            productId: "el005",
            UserName: "Tristan Walker",
            userImageUrl: "https://randomuser.me/api/portraits/men/92.jpg",
            rating: 5,
            title: "Love It",
            comment: "Great for adventures.",
            reviewDate: new Date('2023-07-10')
          },
          {
            id: "rev-el005-7",
            productId: "el005",
            UserName: "Violet Hall",
            userImageUrl: "https://randomuser.me/api/portraits/men/93.jpg",
            rating: 2,
            title: "Not Impressed",
            comment: "Image stabilization is poor.",
            reviewDate: new Date('2023-08-18')
          }
        ]
      },
      {
        id: "fa001",
        name: "UrbanFlex Sneakers",
        description: "Lightweight, breathable mesh sneakers for comfort and performance.",
        price: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1687511845973-b6225ffec7e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 1.6,
        reviewCount: 891,
        inStock: true,
        category: "Fashion",
        reviews: [
          {
            id: "rev-fa001-1",
            productId: "fa001",
            UserName: "Noah Walker",
            userImageUrl: "https://randomuser.me/api/portraits/men/16.jpg",
            rating: 2,
            title: "Not Comfortable",
            comment: "Uncomfortable after wearing for a few hours.",
            reviewDate: new Date('2023-04-01')
          },
          {
            id: "rev-fa001-2",
            productId: "fa001",
            UserName: "Olivia Hall",
            userImageUrl: "https://randomuser.me/api/portraits/men/17.jpg",
            rating: 1,
            title: "Poor Quality",
            comment: "Material feels cheap. Not worth the price.",
            reviewDate: new Date('2023-05-08')
          },
          {
            id: "rev-fa001-3",
            productId: "fa001",
            UserName: "Parker Young",
            userImageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
            rating: 3,
            title: "Average",
            comment: "Okay for casual wear, but not for running.",
            reviewDate: new Date('2023-06-15')
          },
          {
            id: "rev-fa001-4",
            productId: "fa001",
            UserName: "Reese Allen",
            userImageUrl: "https://randomuser.me/api/portraits/men/94.jpg",
            rating: 2,
            title: "Meh",
            comment: "Not as described.",
            reviewDate: new Date('2023-07-22')
          },
          {
            id: "rev-fa001-5",
            productId: "fa001",
            UserName: "Sawyer King",
            userImageUrl: "https://randomuser.me/api/portraits/men/95.jpg",
            rating: 4,
            title: "Decent",
            comment: "Good for walking.",
            reviewDate: new Date('2023-08-30')
          },
          {
            id: "rev-fa001-6",
            productId: "fa001",
            UserName: "Teagan Wright",
            userImageUrl: "https://randomuser.me/api/portraits/men/96.jpg",
            rating: 1,
            title: "Terrible",
            comment: "Soles wore out quickly.",
            reviewDate: new Date('2023-10-08')
          }
        ]
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
        category: "Fashion",
        reviews: [
          {
            id: "rev-fa002-1",
            productId: "fa002",
            UserName: "Quinn King",
            userImageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
            rating: 5,
            title: "Classic Jacket",
            comment: "Perfect fit and quality. Love the design.",
            reviewDate: new Date('2023-03-22')
          },
          {
            id: "rev-fa002-2",
            productId: "fa002",
            UserName: "Riley Scott",
            userImageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
            rating: 4,
            title: "Good Buy",
            comment: "Stylish and comfortable. Great for layering.",
            reviewDate: new Date('2023-04-28')
          },
          {
            id: "rev-fa002-3",
            productId: "fa002",
            UserName: "Sophia Green",
            userImageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
            rating: 5,
            title: "Highly Recommend",
            comment: "Excellent craftsmanship. Will buy again.",
            reviewDate: new Date('2023-05-30')
          },
          {
            id: "rev-fa002-4",
            productId: "fa002",
            UserName: "Blake Lopez",
            userImageUrl: "https://randomuser.me/api/portraits/men/97.jpg",
            rating: 5,
            title: "Amazing",
            comment: "Looks great.",
            reviewDate: new Date('2023-07-05')
          },
          {
            id: "rev-fa002-5",
            productId: "fa002",
            UserName: "Charlie Hill",
            userImageUrl: "https://randomuser.me/api/portraits/men/98.jpg",
            rating: 4,
            title: "Nice Jacket",
            comment: "Comfortable material.",
            reviewDate: new Date('2023-08-12')
          },
          {
            id: "rev-fa002-6",
            productId: "fa002",
            UserName: "Drew Green",
            userImageUrl: "https://randomuser.me/api/portraits/men/99.jpg",
            rating: 3,
            title: "Okay",
            comment: "A bit tight.",
            reviewDate: new Date('2023-09-20')
          },
          {
            id: "rev-fa002-7",
            productId: "fa002",
            UserName: "Ellis Adams",
            userImageUrl: "https://randomuser.me/api/portraits/men/100.jpg",
            rating: 5,
            title: "Perfect",
            comment: "Will buy more.",
            reviewDate: new Date('2023-10-28')
          }
        ]
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
        category: "Fashion",
        reviews: [
          {
            id: "rev-fa003-1",
            productId: "fa003",
            UserName: "Tyler Adams",
            userImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 5,
            title: "Elegant Watch",
            comment: "Beautiful design and accurate timekeeping.",
            reviewDate: new Date('2023-02-14')
          },
          {
            id: "rev-fa003-2",
            productId: "fa003",
            UserName: "Uma Baker",
            userImageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
            rating: 5,
            title: "Perfect Gift",
            comment: "Gave as a gift. Recipient loves it!",
            reviewDate: new Date('2023-03-20')
          },
          {
            id: "rev-fa003-3",
            productId: "fa003",
            UserName: "Victor Carter",
            userImageUrl: "https://randomuser.me/api/portraits/men/24.jpg",
            rating: 4,
            title: "Stylish",
            comment: "Looks great on wrist. Good quality.",
            reviewDate: new Date('2023-04-25')
          },
          {
            id: "rev-fa003-4",
            productId: "fa003",
            UserName: "Finley Nelson",
            userImageUrl: "https://randomuser.me/api/portraits/men/101.jpg",
            rating: 5,
            title: "Love It",
            comment: "Classy watch.",
            reviewDate: new Date('2023-06-02')
          },
          {
            id: "rev-fa003-5",
            productId: "fa003",
            UserName: "Greyson Carter",
            userImageUrl: "https://randomuser.me/api/portraits/men/102.jpg",
            rating: 4,
            title: "Good",
            comment: "Accurate time.",
            reviewDate: new Date('2023-07-10')
          },
          {
            id: "rev-fa003-6",
            productId: "fa003",
            UserName: "Hayden Baker",
            userImageUrl: "https://randomuser.me/api/portraits/men/103.jpg",
            rating: 3,
            title: "Average",
            comment: "Band is uncomfortable.",
            reviewDate: new Date('2023-08-18')
          }
        ]
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
        category: "Fashion",
        reviews: [
          {
            id: "rev-fa004-1",
            productId: "fa004",
            UserName: "Wendy Evans",
            userImageUrl: "https://randomuser.me/api/portraits/men/25.jpg",
            rating: 4,
            title: "Beautiful Scarf",
            comment: "Soft material and lovely patterns. Happy with purchase.",
            reviewDate: new Date('2023-01-10')
          },
          {
            id: "rev-fa004-2",
            productId: "fa004",
            UserName: "Xander Foster",
            userImageUrl: "https://randomuser.me/api/portraits/men/26.jpg",
            rating: 5,
            title: "Luxurious",
            comment: "Feels premium. Great addition to wardrobe.",
            reviewDate: new Date('2023-02-18')
          },
          {
            id: "rev-fa004-3",
            productId: "fa004",
            UserName: "Yara Gomez",
            userImageUrl: "https://randomuser.me/api/portraits/men/27.jpg",
            rating: 4,
            title: "Good Quality",
            comment: "Handcrafted feel. Satisfied with the buy.",
            reviewDate: new Date('2023-03-25')
          },
          {
            id: "rev-fa004-4",
            productId: "fa004",
            UserName: "Zoe Mitchell",
            userImageUrl: "https://randomuser.me/api/portraits/men/104.jpg",
            rating: 5,
            title: "Amazing",
            comment: "Soft and warm.",
            reviewDate: new Date('2023-05-02')
          },
          {
            id: "rev-fa004-5",
            productId: "fa004",
            UserName: "Aaron Perez",
            userImageUrl: "https://randomuser.me/api/portraits/men/105.jpg",
            rating: 4,
            title: "Nice",
            comment: "Good patterns.",
            reviewDate: new Date('2023-06-10')
          },
          {
            id: "rev-fa004-6",
            productId: "fa004",
            UserName: "Bailey Rivera",
            userImageUrl: "https://randomuser.me/api/portraits/men/106.jpg",
            rating: 3,
            title: "Okay",
            comment: "A bit thin.",
            reviewDate: new Date('2023-07-18')
          },
          {
            id: "rev-fa004-7",
            productId: "fa004",
            UserName: "Carter Simmons",
            userImageUrl: "https://randomuser.me/api/portraits/men/107.jpg",
            rating: 5,
            title: "Perfect",
            comment: "Love the design.",
            reviewDate: new Date('2023-08-26')
          }
        ]
      },
      {
      
        id: "fa005",
        name: "Nordic Leather Boots",
        description: "Durable handmade leather boots with reinforced soles.",
        price: 189.99,
        imageUrl: "https://images.unsplash.com/photo-1599141793311-710f09cc58ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 1.0,
        reviewCount: 377,
        inStock: false,
        category: "Fashion",
        reviews: [
          {
            id: "rev-fa005-1",
            productId: "fa005",
            UserName: "Zane Hughes",
            userImageUrl: "https://randomuser.me/api/portraits/men/28.jpg",
            rating: 1,
            title: "Not Durable",
            comment: "Leather cracked after a few wears. Disappointed.",
            reviewDate: new Date('2023-04-05')
          }
        ]
      },
      {
        id: "hl001",
        name: "ComforRest Memory Foam Pillow",
        description: "Ergonomic pillow designed for optimal neck support.",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1654801837473-302a16e1b96d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1400",
        rating: 2.8,
        reviewCount: 934,
        inStock: true,
        category: "Home & Living",
        reviews: [
          {
            id: "rev-hl001-1",
            productId: "hl001",
            UserName: "Cathy Kelly",
            userImageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
            rating: 3,
            title: "Okay Pillow",
            comment: "Decent support, but flattens over time.",
            reviewDate: new Date('2023-02-28')
          },
          {
            id: "rev-hl001-2",
            productId: "hl001",
            UserName: "David Lee",
            userImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 4,
            title: "Comfortable",
            comment: "Good for side sleepers. Improved my sleep.",
            reviewDate: new Date('2023-04-05')
          },
          {
            id: "rev-hl001-3",
            productId: "hl001",
            UserName: "Emma Martinez",
            userImageUrl: "https://randomuser.me/api/portraits/men/33.jpg",
            rating: 2,
            title: "Not Great",
            comment: "Memory foam is too soft. Neck pain persists.",
            reviewDate: new Date('2023-05-15')
          }
        ]
      },
      {
        id: "hl002",
        name: "Lumina Smart Lamp",
        description: "Adjustable brightness and color via mobile app.",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1695617508238-7b2b6c64e191?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=669",
        rating: 3.6,
        reviewCount: 564,
        inStock: true,
        category: "Home & Living",
        reviews: [
          {
            id: "rev-hl002-1",
            productId: "hl002",
            UserName: "Felix Nelson",
            userImageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
            rating: 4,
            title: "Bright Lamp",
            comment: "Adjustable brightness is useful. Good app control.",
            reviewDate: new Date('2023-03-10')
          },
          {
            id: "rev-hl002-2",
            productId: "hl002",
            UserName: "Gina Ortiz",
            userImageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
            rating: 3,
            title: "Decent",
            comment: "Works as expected, but setup was tricky.",
            reviewDate: new Date('2023-04-18')
          },
          {
            id: "rev-hl002-3",
            productId: "hl002",
            UserName: "Hugo Perez",
            userImageUrl: "https://randomuser.me/api/portraits/men/36.jpg",
            rating: 4,
            title: "Satisfied",
            comment: "Nice addition to my home office. Reliable.",
            reviewDate: new Date('2023-05-25')
          }
        ]
      },
      {
        id: "hl003",
        name: "Braun Coffee Maker",
        description: "Automatic coffee maker with built-in grinder.",
        price: 229.99,
        imageUrl: "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        rating: 1.7,
        reviewCount: 382,
        inStock: true,
        category: "Home & Living",
        reviews: [
          {
            id: "rev-hl003-1",
            productId: "hl003",
            UserName: "Iris Quinn",
            userImageUrl: "https://randomuser.me/api/portraits/men/37.jpg",
            rating: 2,
            title: "Average Coffee",
            comment: "Coffee tastes okay, but machine is noisy.",
            reviewDate: new Date('2023-01-20')
          },
          {
            id: "rev-hl003-2",
            productId: "hl003",
            UserName: "Jake Ramirez",
            userImageUrl: "https://randomuser.me/api/portraits/men/38.jpg",
            rating: 3,
            title: "Functional",
            comment: "Does the job, but cleaning is a hassle.",
            reviewDate: new Date('2023-02-25')
          },
          {
            id: "rev-hl003-3",
            productId: "hl003",
            UserName: "Kara Sanchez",
            userImageUrl: "https://randomuser.me/api/portraits/men/39.jpg",
            rating: 1,
            title: "Disappointed",
            comment: "Grinder broke after a month. Poor quality.",
            reviewDate: new Date('2023-04-02')
          }
        ]
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
        category: "Home & Living",
        reviews: [
          {
            id: "rev-hl004-1",
            productId: "hl004",
            UserName: "Liam Torres",
            userImageUrl: "https://randomuser.me/api/portraits/men/40.jpg",
            rating: 5,
            title: "Soft Rug",
            comment: "Eco-friendly and comfortable underfoot. Love it!",
            reviewDate: new Date('2023-03-05')
          },
          {
            id: "rev-hl004-2",
            productId: "hl004",
            UserName: "Maya Underwood",
            userImageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
            rating: 4,
            title: "Good Quality",
            comment: "Durable and easy to clean. Great purchase.",
            reviewDate: new Date('2023-04-12')
          },
          {
            id: "rev-hl004-3",
            productId: "hl004",
            UserName: "Nolan Vargas",
            userImageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
            rating: 5,
            title: "Highly Recommend",
            comment: "Beautiful design and sustainable. Perfect fit.",
            reviewDate: new Date('2023-05-20')
          }
        ]
      },
      {
        id: "hl005",
        name: "Serene Aroma Diffuser",
        description: "Ultrasonic diffuser with adjustable mist modes.",
        price: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1636410515418-bbec95c35053?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        rating: 2.6,
        reviewCount: 478,
        inStock: true,
        category: "Home & Living",
        reviews: [
          {
            id: "rev-hl005-1",
            productId: "hl005",
            UserName: "Olivia Wade",
            userImageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
            rating: 3,
            title: "Okay Diffuser",
            comment: "Works fine, but mist is not very strong.",
            reviewDate: new Date('2023-02-08')
          },
          {
            id: "rev-hl005-2",
            productId: "hl005",
            UserName: "Parker Xu",
            userImageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
            rating: 2,
            title: "Average",
            comment: "Decent for the price, but not impressive.",
            reviewDate: new Date('2023-03-15')
          },
          {
            id: "rev-hl005-3",
            productId: "hl005",
            UserName: "Quinn Yates",
            userImageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
            rating: 4,
            title: "Relaxing",
            comment: "Helps with aromatherapy. Good for relaxation.",
            reviewDate: new Date('2023-04-22')
          }
        ]
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
        category: "Beauty & Personal Care",
        reviews: [
          {
            id: "rev-bp001-1",
            productId: "bp001",
            UserName: "Riley Zhang",
            userImageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
            rating: 5,
            title: "Brightens Skin",
            comment: "Noticeable improvement in skin tone. Effective serum.",
            reviewDate: new Date('2023-01-15')
          },
          {
            id: "rev-bp001-2",
            productId: "bp001",
            UserName: "Sophia Alvarez",
            userImageUrl: "https://randomuser.me/api/portraits/men/47.jpg",
            rating: 5,
            title: "Amazing",
            comment: "Reduces dark spots effectively. Highly recommend.",
            reviewDate: new Date('2023-02-20')
          },
          {
            id: "rev-bp001-3",
            productId: "bp001",
            UserName: "Tyler Bennett",
            userImageUrl: "https://randomuser.me/api/portraits/men/48.jpg",
            rating: 4,
            title: "Good Product",
            comment: "Gentle on skin and works well. Satisfied.",
            reviewDate: new Date('2023-03-28')
          }
        ]
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
        category: "Beauty & Personal Care",
        reviews: [
          {
            id: "rev-bp002-1",
            productId: "bp002",
            UserName: "Uma Collins",
            userImageUrl: "https://randomuser.me/api/portraits/men/49.jpg",
            rating: 5,
            title: "Stronger Hair",
            comment: "Hair feels thicker and healthier after use.",
            reviewDate: new Date('2023-04-10')
          },
          {
            id: "rev-bp002-2",
            productId: "bp002",
            UserName: "Victor Diaz",
            userImageUrl: "https://randomuser.me/api/portraits/men/50.jpg",
            rating: 4,
            title: "Effective",
            comment: "Good for hair growth. Noticeable results.",
            reviewDate: new Date('2023-05-18')
          },
          {
            id: "rev-bp002-3",
            productId: "bp002",
            UserName: "Wendy Edwards",
            userImageUrl: "https://randomuser.me/api/portraits/men/51.jpg",
            rating: 5,
            title: "Love It",
            comment: "Best shampoo I've tried. Will repurchase.",
            reviewDate: new Date('2023-06-25')
          }
        ]
      },
      {
        id: "bp003",
        name: "PureSilk Body Lotion",
        description: "Deep moisturizing lotion enriched with shea butter.",
        price: 15.99,
        imageUrl: "https://images.unsplash.com/photo-1703174323653-0455deaf7f11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        rating: 3.8,
        reviewCount: 910,
        inStock: true,
        category: "Beauty & Personal Care",
        reviews: [
          {
            id: "rev-bp003-1",
            productId: "bp003",
            UserName: "Xander Flores",
            userImageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
            rating: 4,
            title: "Moisturizing",
            comment: "Absorbs quickly and leaves skin soft.",
            reviewDate: new Date('2023-02-05')
          },
          {
            id: "rev-bp003-2",
            productId: "bp003",
            UserName: "Yara Garcia",
            userImageUrl: "https://randomuser.me/api/portraits/men/53.jpg",
            rating: 3,
            title: "Okay",
            comment: "Decent lotion, but scent is strong.",
            reviewDate: new Date('2023-03-12')
          },
          {
            id: "rev-bp003-3",
            productId: "bp003",
            UserName: "Zane Hernandez",
            userImageUrl: "https://randomuser.me/api/portraits/men/54.jpg",
            rating: 4,
            title: "Good Buy",
            comment: "Affordable and effective. Keeps skin hydrated.",
            reviewDate: new Date('2023-04-20')
          }
        ]
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
        category: "Beauty & Personal Care",
        reviews: [
          {
            id: "rev-bp004-1",
            productId: "bp004",
            UserName: "Abby Ingram",
            userImageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
            rating: 5,
            title: "Luxurious Fragrance",
            comment: "Long-lasting and elegant scent. Love it!",
            reviewDate: new Date('2023-01-08')
          },
          {
            id: "rev-bp004-2",
            productId: "bp004",
            UserName: "Ben Jordan",
            userImageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
            rating: 5,
            title: "Perfect",
            comment: "Floral notes are beautiful. Highly recommend.",
            reviewDate: new Date('2023-02-15')
          },
          {
            id: "rev-bp004-3",
            productId: "bp004",
            UserName: "Cathy Kelly",
            userImageUrl: "https://randomuser.me/api/portraits/men/57.jpg",
            rating: 4,
            title: "Great Scent",
            comment: "Lasts all day. Good for special occasions.",
            reviewDate: new Date('2023-03-22')
          }
        ]
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
        category: "Beauty & Personal Care",
        reviews: [
          {
            id: "rev-bp005-1",
            productId: "bp005",
            UserName: "David Lee",
            userImageUrl: "https://randomuser.me/api/portraits/men/58.jpg",
            rating: 5,
            title: "Gentle Cleanser",
            comment: "Doesn't dry skin. Effective and mild.",
            reviewDate: new Date('2023-04-01')
          },
          {
            id: "rev-bp005-2",
            productId: "bp005",
            UserName: "Emma Martinez",
            userImageUrl: "https://randomuser.me/api/portraits/men/59.jpg",
            rating: 4,
            title: "Good for Skin",
            comment: "Suitable for sensitive skin. Cleans well.",
            reviewDate: new Date('2023-05-08')
          },
          {
            id: "rev-bp005-3",
            productId: "bp005",
            UserName: "Felix Nelson",
            userImageUrl: "https://randomuser.me/api/portraits/men/60.jpg",
            rating: 5,
            title: "Excellent",
            comment: "Best cleanser I've used. Keeps skin clear.",
            reviewDate: new Date('2023-06-15')
          }
        ]
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
        category: "Gaming & Accessories",
        reviews: [
          {
            id: "rev-ga001-1",
            productId: "ga001",
            UserName: "Gina Ortiz",
            userImageUrl: "https://randomuser.me/api/portraits/men/61.jpg",
            rating: 5,
            title: "Ergonomic Mouse",
            comment: "Comfortable for long gaming sessions. Precise tracking.",
            reviewDate: new Date('2023-02-10')
          },
          {
            id: "rev-ga001-2",
            productId: "ga001",
            UserName: "Hugo Perez",
            userImageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
            rating: 4,
            title: "Good Performance",
            comment: "RGB lights are cool. Adjustable DPI is useful.",
            reviewDate: new Date('2023-03-18')
          },
          {
            id: "rev-ga001-3",
            productId: "ga001",
            UserName: "Iris Quinn",
            userImageUrl: "https://randomuser.me/api/portraits/men/63.jpg",
            rating: 5,
            title: "Highly Recommend",
            comment: "Best mouse for gaming. Low latency.",
            reviewDate: new Date('2023-04-25')
          }
        ]
      },
      {
        id: "ga002",
        name: "StormKey Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches and aluminum frame.",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1558050032-8e05d4037d2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        rating: 5,
        reviewCount: 531,
        inStock: true,
        category: "Gaming & Accessories",
        reviews: [
          {
            id: "rev-ga002-1",
            productId: "ga002",
            UserName: "Jake Ramirez",
            userImageUrl: "https://randomuser.me/api/portraits/men/64.jpg",
            rating: 5,
            title: "Amazing Keyboard",
            comment: "Blue switches sound great. Aluminum build is sturdy.",
            reviewDate: new Date('2023-01-05')
          },
          {
            id: "rev-ga002-2",
            productId: "ga002",
            UserName: "Kara Sanchez",
            userImageUrl: "https://randomuser.me/api/portraits/men/65.jpg",
            rating: 5,
            title: "Perfect",
            comment: "RGB lighting is vibrant. Typing feels premium.",
            reviewDate: new Date('2023-02-12')
          },
          {
            id: "rev-ga002-3",
            productId: "ga002",
            UserName: "Liam Torres",
            userImageUrl: "https://randomuser.me/api/portraits/men/66.jpg",
            rating: 5,
            title: "Top Quality",
            comment: "Best mechanical keyboard. Highly satisfied.",
            reviewDate: new Date('2023-03-20')
          }
        ]
      },
      {
        id: "ga003",
        name: "CloudZone Gaming Chair",
        description: "Ergonomic gaming chair with adjustable lumbar and armrests.",
        price: 259.99,
        imageUrl: "https://images.unsplash.com/photo-1670946839270-cc4febd43b09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        rating: 5,
        reviewCount: 414,
        inStock: true,
        category: "Gaming & Accessories",
        reviews: [
          {
            id: "rev-ga003-1",
            productId: "ga003",
            UserName: "Maya Underwood",
            userImageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
            rating: 5,
            title: "Comfortable Chair",
            comment: "Ergonomic design. Great for long sessions.",
            reviewDate: new Date('2023-04-02')
          },
          {
            id: "rev-ga003-2",
            productId: "ga003",
            UserName: "Nolan Vargas",
            userImageUrl: "https://randomuser.me/api/portraits/men/68.jpg",
            rating: 5,
            title: "Excellent",
            comment: "Adjustable features are perfect. Love the lumbar support.",
            reviewDate: new Date('2023-05-10')
          },
          {
            id: "rev-ga003-3",
            productId: "ga003",
            UserName: "Olivia Wade",
            userImageUrl: "https://randomuser.me/api/portraits/men/69.jpg",
            rating: 5,
            title: "Best Chair",
            comment: "Comfortable and stylish. Worth every penny.",
            reviewDate: new Date('2023-06-18')
          }
        ]
      },
      {
        id: "ga004",
        name: "ProVision 4K Monitor",
        description: "27-inch 4K monitor with HDR and 144Hz refresh rate.",
        price: 499.99,
        imageUrl: "https://images.unsplash.com/photo-1680254811982-bdf4dabde3ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        rating: 3.8,
        reviewCount: 788,
        inStock: true,
        category: "Gaming & Accessories",
        reviews: [
          {
            id: "rev-ga004-1",
            productId: "ga004",
            UserName: "Parker Xu",
            userImageUrl: "https://randomuser.me/api/portraits/men/70.jpg",
            rating: 4,
            title: "Great Monitor",
            comment: "4K resolution is stunning. 144Hz is smooth.",
            reviewDate: new Date('2023-02-25')
          },
          {
            id: "rev-ga004-2",
            productId: "ga004",
            UserName: "Quinn Yates",
            userImageUrl: "https://randomuser.me/api/portraits/men/71.jpg",
            rating: 3,
            title: "Good but Heavy",
            comment: "HDR is good, but the monitor is quite heavy.",
            reviewDate: new Date('2023-04-05')
          },
          {
            id: "rev-ga004-3",
            productId: "ga004",
            UserName: "Riley Zhang",
            userImageUrl: "https://randomuser.me/api/portraits/men/72.jpg",
            rating: 4,
            title: "Satisfied",
            comment: "Excellent for gaming. Colors are vibrant.",
            reviewDate: new Date('2023-05-12')
          }
        ]
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
        category: "Gaming & Accessories",
        reviews: [
          {
            id: "rev-ga005-1",
            productId: "ga005",
            UserName: "Sophia Alvarez",
            userImageUrl: "https://randomuser.me/api/portraits/men/73.jpg",
            rating: 5,
            title: "Immersive Sound",
            comment: "Surround sound is amazing. Mic quality is clear.",
            reviewDate: new Date('2023-03-08')
          },
          {
            id: "rev-ga005-2",
            productId: "ga005",
            UserName: "Tyler Bennett",
            userImageUrl: "https://randomuser.me/api/portraits/men/74.jpg",
            rating: 5,
            title: "Perfect Headset",
            comment: "Noise-canceling works great. Comfortable fit.",
            reviewDate: new Date('2023-04-15')
          },
          {
            id: "rev-ga005-3",
            productId: "ga005",
            UserName: "Uma Collins",
            userImageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
            rating: 4,
            title: "Great for Gaming",
            comment: "Excellent audio. Good value for money.",
            reviewDate: new Date('2023-05-22')
          }
        ]
      }
        ],
        category:'All',
        wishlistItems:[],
        cartItems:[],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false
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

        loginModalHeader: () =>{
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: false,
            },
            width: '400px',
          });
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
          }else{
            router.navigate(['/products/All']);
          }
          snackbar.showSnackBarSucess('✅ User signed in successfully');
        },

        signUp : ({name, email, password, checkout, dialogId}: UserSignUp) => {
          const photo  = Math.floor(Math.random()*100)+1 ;
          patchState(store, {
            user: {
              id: 'user001',
              name: name,
              email: email,
              imageUrl: `https://randomuser.me/api/portraits/men/${photo}.jpg`
            }
          });
          matDialog.getDialogById(dialogId!)?.close();

          if(checkout){
            router.navigate(['/checkout']);
          }else{
            router.navigate(['/products/All']);
          }
          snackbar.showSnackBarSucess('✅ User Account create successfully');
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
        },
        showWriteReview: () =>{
          patchState(store, {writeReview:true});
        },

        hideWriteReview: () =>{
          patchState(store, {writeReview:false});
        },

        addReview: async ({title, comment, rating}:AddReviewParams) =>{
          patchState(store, { loading: true});
          const product = store.products().find((p)=>p.id ===store.selectedProductId());
          if(!product){
            patchState(store, {loading: false});
            return
          }
          const review: UserReview = {
            id: crypto.randomUUID(),
            title,
            comment,
            rating,
            productId:product.id,
            UserName:store.user()?.name || '',
            userImageUrl:store.user()?.imageUrl || '',
            reviewDate: new Date()
          }

          const updateProducts = produce(store.products(), (draft)=>{
            const index =draft.findIndex((p)=>p.id === product.id);
            draft[index].reviews.push(review);
            draft[index].rating = Math.round(
              draft[index].reviews.reduce((acc, r)=>acc + r.rating, 0)/
              draft[index].reviews.length * 10
            )/10;
            draft[index].reviewCount = draft[index].reviews.length;
          })
          await new Promise((resolve)=> setTimeout(resolve, 1000));
          patchState(store, {
            loading:false, products:updateProducts, writeReview:false
          });
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