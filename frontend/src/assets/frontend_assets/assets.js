import r1 from './r1.png'
import l1 from './l1.png'
import ic1 from './ic1.png'
import w1 from './w1.png'
import w2 from './w2.png'

import EQ1140 from './EQ1140.png'
import EQ1143 from './EQ1143.png'
import EQ1144 from './EQ1144.png'

import MSA from './MSA.png'
import SSA from './SSA.png'
import ASA from './ASA.png'
import ASB from './ASB.png'

import CM51 from './CM51.png'
import rpie from './rpie.png'


import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import uni_logo from './uni_logo.png'
import uni_logo1 from './uni_logo1.png'
import fund_icon from './fund.png'
import inventory_icon from './inventory.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    uni_logo,uni_logo1,
    fund_icon,
    inventory_icon
}

export const products = [
    
    {
        _id: "aaaaa",
        name: "IC Bases",
        description: "Form Factor: DIP - 0.1, Price	: Rs. 8.00",
        price: 100,
        quantity: 100,
        image: [ic1],
        category: "Consumables",
        subCategory: "IC Bases",
        sizes: ["10pin", "12pin", "14pin"],
        date: 1716634345448,
        available: true
    },
    {
        _id: "aaaab",
        name: "LEDs",
        description: "Datasheet URL	: [Not Available], Price	: Rs. 2.00",
        price: 200,
        quantity: 200,
        image: [l1],
        category: "Consumables",
        subCategory: "LEDs",
        sizes: ["Red", "Yellow", "Green", "IR", "Blue"],
        date: 1716621345448,
        available: true
    },
    {
        _id: "aaaac",
        name: "Resistors",
        description: "Resistor used to control the current flow",
        price: 220,
        quantity: 220,
        image: [r1],
        category: "Consumables",
        subCategory: "Resistors",
        sizes: ["220", "480", "1K", "1.5k","2k" ],
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Circuit Wires",
        description: "Datasheet URL	: [Not Available],Price	: Rs. 15.00",
        price: 110,
        quantity: 110,
        image: [w1],
        category: "Consumables",
        subCategory: "Wires",
        sizes: ["Red", "Black", "White","Orange"],
        date: 1716621345448,
        available: true
    },
    {
        _id: "aaaae",
        name: "Single-core wires",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 130,
        quantity: 130,
        image: [w2],
        category: "Consumables",
        subCategory: "Wires",
        sizes: ["Red", "Black", "Yellow"],
        date: 1716622345448,
        available: true
    },
    {
        _id: "aaaaf",
        name: "Impact Drill",
        description: "Input power: 650W, No-load speed: 0-2700rpm, Max. drilling capacity: 13mm, Variable speed control, Forward/Reverse switch, Hammer function",
        price: 140,
        image: [EQ1140],
        category: "Equipment",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "aaaag",
        name: "Mini Grinder",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 190,
        image: [EQ1143],
        category: "Equipment",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Heat Gun",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 140,
        image: [EQ1144],
        category: "Equipment",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "Assembly Station A",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: [ASA],
        category: "Stations",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621235448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "Measuring Station A",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 110,
        image: [MSA],
        category: "Stations",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716622235448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "Soldering station A",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 120,
        image: [SSA],
        category: "Stations",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716623345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "Arduino Shield",
        description: "boards that can be plugged on top of the Arduino PCB extending its capabilities",
        price: 150,
        image: [CM51],
        category: "Components",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716624445448,
        bestseller: false
    },
    
   
]